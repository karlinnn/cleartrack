import type { MetadataRoute } from "next";
import { getServiceSlugs } from "@/lib/api";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const STATIC_ROUTES = [
  "/",
  "/services",
  "/quote",
  "/track",
  "/how-it-works",
  "/about",
  "/countries",
  "/faq",
  "/security",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getServiceSlugs().catch(() => [] as string[]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries];
}
