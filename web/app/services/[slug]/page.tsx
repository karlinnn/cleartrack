import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs } from "@/lib/api";
import Seal from "@/components/Seal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getServiceBySlug(slug);
  if (!post) return { title: "Service not found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  const media   = post._embedded?.["wp:featuredmedia"]?.[0];
  const imgUrl  = media?.source_url ?? null;
  const imgW    = media?.media_details?.width  ?? 1200;
  const imgH    = media?.media_details?.height ?? 630;

  return {
    title: post.title.rendered,
    description: excerpt,
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
    openGraph: {
      title: post.title.rendered,
      description: excerpt,
      url: `${siteUrl}/services/${slug}`,
      ...(imgUrl
        ? { images: [{ url: imgUrl, width: imgW, height: imgH, alt: post.title.rendered }] }
        : {}),
    },
  };
}

/** Sanitise HTML from the CMS: allow only a safe subset of elements. */
function sanitiseContent(html: string): string {
  // Strip <script>, <style>, on* attributes, and javascript: hrefs.
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\bhref\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getServiceBySlug(slug);

  if (!post) notFound();

  const title       = post.title.rendered;
  const media       = post._embedded?.["wp:featuredmedia"]?.[0];
  const imgSrc      = media?.source_url ?? null;
  const imgAlt      = media?.alt_text   ?? title;
  const safeContent = sanitiseContent(post.content.rendered);

  const dateStr = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "56px 24px 80px",
        width: "100%",
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "36px" }}>
        <ol
          style={{
            display: "flex",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "0.875rem",
            opacity: 0.6,
          }}
        >
          <li>
            <Link href="/" style={{ color: "var(--color-bottle)" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/services" style={{ color: "var(--color-bottle)" }}>
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-ink)" }}>
            {title}
          </li>
        </ol>
      </nav>

      {/* Document column + seal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "48px",
          alignItems: "start",
        }}
        className="detail-grid"
      >
        {/* Left: document-like column */}
        <article
          style={{
            maxWidth: "65ch",
          }}
          aria-labelledby="service-title"
        >
          {/* Header rule */}
          <div
            style={{
              borderBottom: "1px solid var(--color-rule)",
              paddingBottom: "20px",
              marginBottom: "28px",
            }}
          >
            <h1
              id="service-title"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--color-ink)",
                lineHeight: 1.08,
                marginBottom: "8px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-ink)",
                opacity: 0.45,
                fontFamily: "var(--font-sans)",
              }}
            >
              Published {dateStr}
            </p>
          </div>

          {/* Featured image */}
          {imgSrc && (
            <div
              style={{
                width: "100%",
                aspectRatio: "16/7",
                overflow: "hidden",
                position: "relative",
                marginBottom: "32px",
                borderBottom: "1px solid var(--color-rule)",
                paddingBottom: "0",
              }}
            >
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="(min-width: 900px) 65ch, 100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Body content — rendered safely from CMS */}
          <div
            id="service-content"
            style={{
              lineHeight: 1.75,
              fontSize: "1rem",
              color: "var(--color-ink)",
            }}
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />

          {/* Footer rule + CTA */}
          <div
            style={{
              borderTop: "1px solid var(--color-rule)",
              marginTop: "48px",
              paddingTop: "32px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/#contact"
              id="detail-quote-btn"
              style={{
                display: "inline-block",
                backgroundColor: "var(--color-bottle)",
                color: "var(--color-paper)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: "2px",
                textDecoration: "none",
                border: "1.5px solid var(--color-bottle)",
              }}
              className="btn-primary"
            >
              Request a quote
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-block",
                backgroundColor: "var(--color-paper)",
                color: "var(--color-bottle)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: "2px",
                textDecoration: "none",
                border: "1.5px solid var(--color-rule)",
              }}
              className="btn-secondary"
            >
              All services
            </Link>
          </div>
        </article>

        {/* Right: seal — stamped beside the title */}
        <aside
          style={{ paddingTop: "4px" }}
          aria-label="ClearTrack verification seal"
        >
          <Seal size={140} />
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.75rem",
              color: "var(--color-ink)",
              opacity: 0.45,
              maxWidth: "12ch",
              lineHeight: 1.5,
              fontFamily: "var(--font-sans)",
            }}
          >
            Official clearing service
          </p>
        </aside>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────── */}
      <style>{`
        .wp-content h2,
        .wp-content h3 {
          font-family: var(--font-serif);
          color: var(--color-ink);
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .wp-content h2 { font-size: 1.375rem; }
        .wp-content h3 { font-size: 1.125rem; }
        .wp-content p  { margin-bottom: 16px; }
        .wp-content ul,
        .wp-content ol {
          padding-left: 20px;
          margin-bottom: 16px;
        }
        .wp-content li { margin-bottom: 6px; }
        .wp-content a  { color: var(--color-bottle); }
        .btn-primary:hover  { background-color: #163d35; border-color: #163d35; }
        .btn-secondary:hover { background-color: #E8EBE7; }
        @media (max-width: 640px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-grid > aside {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
