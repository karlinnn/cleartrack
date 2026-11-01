import { cleanText, htmlToParagraphs } from "./text";

const WP =
  process.env.EXPO_PUBLIC_WP_API_URL ??
  "https://public-api.wordpress.com/wp/v2/sites/cleartrackdemo.wordpress.com";
const SITE = (process.env.EXPO_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string | null;
};

export type HistoryEntry = { stage: number; timestamp: string; note?: string };

export type Application = {
  reference: string;
  firstName: string;
  service: string;
  stage: number;
  history: HistoryEntry[];
  officerRemark: string;
  estimatedDate: string;
  extraDocsRequired?: boolean;
};

export const STAGE_LABELS = [
  "Submitted",
  "Documents under review",
  "Documents verified",
  "With the authority",
  "Ready for collection",
  "Delivered",
];

function needSite() {
  if (!SITE) {
    throw new Error(
      "Website address missing. Set EXPO_PUBLIC_SITE_URL in mobile/.env and restart Expo.",
    );
  }
}

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${WP}/posts?per_page=20&_embed=wp:featuredmedia`);
  if (!res.ok) throw new Error(`Could not load services (${res.status}).`);
  const posts = await res.json();
  return posts
    .filter((p: any) => p.slug !== "hello-world")
    .map((p: any) => ({
      slug: p.slug,
      title: cleanText(p.title.rendered),
      excerpt: cleanText(p.excerpt.rendered),
      body: htmlToParagraphs(p.content.rendered),
      image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    }));
}

export async function getApplication(reference: string): Promise<Application> {
  needSite();
  const res = await fetch(
    `${SITE}/api/track/${encodeURIComponent(reference.trim())}`,
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      json.error ?? "We could not find that reference. Check the format: CT-2026-0000.",
    );
  }
  return json as Application;
}

export async function submitQuote(
  data: Record<string, unknown>,
): Promise<{ reference?: string; errors?: Record<string, string> }> {
  needSite();
  const res = await fetch(`${SITE}/api/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, company: "" }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { errors: json.errors ?? { _: "Something went wrong." } };
  return { reference: json.reference };
}