/**
 * WordPress.com REST API client for ClearTrack.
 * Base URL defaults to the env var WP_API_BASE; falls back to a public demo site.
 * Only read (GET) operations are performed.
 */

const BASE = process.env.WP_API_BASE ?? "https://public-api.wordpress.com/wp/v2/sites/cleartrack.wordpress.com";

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

// ─── Generic fetch helper ─────────────────────────────────────────────

async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

// ─── Exports (do not rename these) ────────────────────────────────────

/** Fetch all service posts (category: services) for the list page. */
export async function getServices(): Promise<WPPost[]> {
  const posts = await apiFetch<WPPost[]>("/posts", {
    per_page: "20",
    _embed: "wp:featuredmedia,wp:term",
    status: "publish",
  }).catch(() => [] as WPPost[]);
  // Fall back to mock data when the live API returns nothing
  return posts.length > 0 ? posts : MOCK_SERVICES;
}

/** Fetch a single service post by slug for the detail page. */
export async function getServiceBySlug(slug: string): Promise<WPPost | null> {
  const posts = await apiFetch<WPPost[]>("/posts", {
    slug,
    _embed: "wp:featuredmedia,wp:term",
    status: "publish",
  }).catch(() => [] as WPPost[]);
  // Try live API result first, then fall back to mock data
  const fromApi = posts.find((p) => p.slug === slug);
  if (fromApi) return fromApi;
  return MOCK_SERVICES.find((p) => p.slug === slug) ?? null;
}

/** Fetch all service slugs (for generateStaticParams). */
export async function getServiceSlugs(): Promise<string[]> {
  const posts = await getServices();
  return posts.map((p) => p.slug);
}

// ─── Development / fallback mock data ─────────────────────────────────

const MOCK_SERVICES: WPPost[] = [
  {
    id: 1,
    slug: "document-attestation",
    title: { rendered: "Document Attestation" },
    excerpt: { rendered: "<p>Official attestation of personal, commercial, and educational documents for international use.</p>" },
    content: { rendered: `<p>Our document attestation service covers all categories of official paperwork — personal identity documents, academic certificates, commercial contracts, and power-of-attorney instruments.</p><p>Each document is handled by a licensed attestation officer. We coordinate with the relevant embassies, notary bodies, and government departments on your behalf, so you receive a correctly attested document without the procedural burden.</p><h3>What we attest</h3><ul><li>Birth, marriage, and death certificates</li><li>Educational diplomas and transcripts</li><li>Commercial registration documents</li><li>Power of attorney and affidavits</li></ul><h3>Timeline</h3><p>Standard service: 5–7 working days. Express service: 2–3 working days, subject to availability.</p>` },
    date: "2026-01-10T09:00:00",
    featured_media: 0,
  },
  {
    id: 2,
    slug: "apostille-certification",
    title: { rendered: "Apostille Certification" },
    excerpt: { rendered: "<p>Hague Convention apostille stamps for documents destined for member states.</p>" },
    content: { rendered: `<p>An apostille is a form of authentication issued under the Hague Convention of 1961. It is the internationally recognised method for certifying public documents for use in the 120-plus member countries.</p><p>ClearTrack prepares and submits your documents to the designated competent authority in the issuing country and ensures the apostille stamp is correctly affixed before returning the complete set to you.</p><h3>Eligible documents</h3><ul><li>Court orders and legal judgments</li><li>Government-issued identity records</li><li>Notarised contracts</li><li>Academic credentials</li></ul><h3>Timeline</h3><p>Standard service: 3–5 working days.</p>` },
    date: "2026-01-12T09:00:00",
    featured_media: 0,
  },
  {
    id: 3,
    slug: "translation-and-notarisation",
    title: { rendered: "Translation and Notarisation" },
    excerpt: { rendered: "<p>Certified translations verified by a commissioned notary, accepted by courts and government bodies.</p>" },
    content: { rendered: `<p>A certified translation is a sworn translation accompanied by a signed declaration from the translator confirming accuracy and completeness. When further authenticated by a notary public, the document is accepted by courts, immigration authorities, and financial institutions worldwide.</p><p>Our network of subject-specialist translators covers legal, medical, commercial, and academic domains in more than forty language pairs.</p><h3>Process</h3><ol><li>Submit your original document</li><li>Translation is completed by a specialist sworn translator</li><li>Notary reviews and certifies the translation</li><li>Certified copy is returned with an attestation cover sheet</li></ol>` },
    date: "2026-01-15T09:00:00",
    featured_media: 0,
  },
  {
    id: 4,
    slug: "commercial-document-clearing",
    title: { rendered: "Commercial Document Clearing" },
    excerpt: { rendered: "<p>End-to-end clearing of trade licences, corporate registrations, and import/export permits.</p>" },
    content: { rendered: `<p>Commercial document clearing encompasses the preparation, verification, and official processing of all documents required to operate a business, import goods, or establish a corporate entity in a new jurisdiction.</p><p>ClearTrack manages the sequence of filings, tracks submission status at each authority, and keeps you informed at each stage through your client portal reference number.</p><h3>Typical documents</h3><ul><li>Trade licence applications and renewals</li><li>Chamber of commerce attestation</li><li>Certificate of origin</li><li>Import/export permit processing</li><li>Corporate resolution notarisation</li></ul>` },
    date: "2026-01-18T09:00:00",
    featured_media: 0,
  },
];
