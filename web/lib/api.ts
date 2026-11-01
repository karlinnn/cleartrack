/**
 * WordPress.com REST API client for ClearTrack.
 * Base URL comes from WP_API_BASE or NEXT_PUBLIC_WP_API_URL.
 * Only read (GET) operations are performed.
 */

const BASE =
  process.env.WP_API_BASE ??
  process.env.NEXT_PUBLIC_WP_API_URL ??
  "https://public-api.wordpress.com/wp/v2/sites/cleartrackdemo.wordpress.com";

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { width: number; height: number };
    }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: { width: number; height: number };
}

// --- Decode HTML entities from WordPress text -------------------------

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decode(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function normalize(p: WPPost): WPPost {
  return {
    ...p,
    title: { rendered: decode(p.title.rendered) },
    excerpt: { rendered: decode(p.excerpt.rendered) },
  };
}

// --- Generic fetch helper ---------------------------------------------

async function apiFetch<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

// --- Exports (do not rename these) ------------------------------------

/** Fetch all service posts for the list page. */
export async function getServices(): Promise<WPPost[]> {
  const posts = await apiFetch<WPPost[]>("/posts", {
    per_page: "20",
    _embed: "wp:featuredmedia,wp:term",
    status: "publish",
  }).catch((e) => {
    console.error("WordPress fetch failed:", e);
    return [] as WPPost[];
  });

  // Mock data is for local development only, never for production
  const list =
    posts.length > 0 || process.env.NODE_ENV === "production"
      ? posts
      : MOCK_SERVICES;

  return list.map(normalize);
}

/** Fetch a single service post by slug for the detail page. */
export async function getServiceBySlug(slug: string): Promise<WPPost | null> {
  const posts = await apiFetch<WPPost[]>("/posts", {
    slug,
    _embed: "wp:featuredmedia,wp:term",
    status: "publish",
  }).catch((e) => {
    console.error("WordPress fetch failed:", e);
    return [] as WPPost[];
  });

  const fromApi = posts.find((p) => p.slug === slug);
  if (fromApi) return normalize(fromApi);

  const fallback =
    process.env.NODE_ENV === "production"
      ? null
      : (MOCK_SERVICES.find((p) => p.slug === slug) ?? null);

  return fallback ? normalize(fallback) : null;
}

/** Fetch all service slugs (for generateStaticParams and the sitemap). */
export async function getServiceSlugs(): Promise<string[]> {
  const posts = await getServices();
  return posts.map((p) => p.slug);
}

// --- Development-only fallback mock data ------------------------------

const MOCK_SERVICES: WPPost[] = [
  {
    id: 1,
    slug: "document-attestation",
    title: { rendered: "Document Attestation" },
    excerpt: {
      rendered:
        "<p>Official attestation of personal, commercial, and educational documents for international use.</p>",
    },
    content: {
      rendered: `<p>Our document attestation service covers all categories of official paperwork: personal identity documents, academic certificates, commercial contracts, and power-of-attorney instruments.</p><p>Each document is handled by a licensed attestation officer. We coordinate with the relevant embassies, notary bodies, and government departments on your behalf.</p>`,
    },
    date: "2026-01-10T09:00:00",
    featured_media: 0,
  },
  {
    id: 2,
    slug: "apostille-certification",
    title: { rendered: "Apostille Certification" },
    excerpt: {
      rendered:
        "<p>Hague Convention apostille stamps for documents destined for member states.</p>",
    },
    content: {
      rendered: `<p>An apostille is a form of authentication issued under the Hague Convention of 1961. ClearTrack prepares and submits your documents to the designated competent authority.</p>`,
    },
    date: "2026-01-12T09:00:00",
    featured_media: 0,
  },
  {
    id: 3,
    slug: "translation-and-notarisation",
    title: { rendered: "Translation and Notarisation" },
    excerpt: {
      rendered:
        "<p>Certified translations verified by a commissioned notary, accepted by courts and government bodies.</p>",
    },
    content: {
      rendered: `<p>A certified translation is a sworn translation accompanied by a signed declaration from the translator confirming accuracy and completeness.</p>`,
    },
    date: "2026-01-15T09:00:00",
    featured_media: 0,
  },
  {
    id: 4,
    slug: "commercial-document-clearing",
    title: { rendered: "Commercial Document Clearing" },
    excerpt: {
      rendered:
        "<p>End-to-end clearing of trade licences, corporate registrations, and import/export permits.</p>",
    },
    content: {
      rendered: `<p>Commercial document clearing covers the preparation, verification and official processing of documents required to operate a business or import goods.</p>`,
    },
    date: "2026-01-18T09:00:00",
    featured_media: 0,
  },
];