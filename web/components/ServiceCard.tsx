import Link from "next/link";
import Image from "next/image";
import type { WPPost } from "@/lib/api";
import { cleanText } from "@/lib/text";

interface ServiceCardProps {
  post: WPPost;
  priority?: boolean;
}

export default function ServiceCard({ post, priority = false }: ServiceCardProps) {
  const title   = cleanText(post.title.rendered);
  const excerpt = cleanText(post.excerpt.rendered);
  const href    = `/services/${post.slug}`;

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const imgSrc = media?.source_url ?? null;
  const imgAlt = media?.alt_text   ?? title;

  return (
    <article
      className="ledger-row"
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "24px",
        padding: "24px 0",
        borderBottom: "1px solid var(--color-rule)",
        alignItems: "start",
      }}
    >
      {/* Square image crop or placeholder */}
      <div
        style={{
          width: "80px",
          height: "80px",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "var(--color-rule)",
          position: "relative",
        }}
        aria-hidden={!imgSrc}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="80px"
            style={{ objectFit: "cover" }}
            priority={priority}
          />
        ) : (
          /* Flat paper-tone placeholder with ruled lines */
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <rect width="80" height="80" fill="#E8EBE7" />
            {[20, 30, 40, 50, 60].map((y) => (
              <line key={y} x1="12" y1={y} x2="68" y2={y} stroke="#C9D0CA" strokeWidth="1" />
            ))}
          </svg>
        )}
      </div>

      {/* Text */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.125rem",
            fontWeight: 700,
            marginBottom: "6px",
            color: "var(--color-ink)",
          }}
        >
          <Link
            href={href}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            className="service-title-link"
          >
            {title}
          </Link>
        </h3>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-ink)",
            opacity: 0.75,
            lineHeight: 1.65,
            maxWidth: "60ch",
          }}
        >
          {excerpt}
        </p>
        <Link
          href={href}
          style={{
            display: "inline-block",
            marginTop: "10px",
            fontSize: "0.875rem",
            color: "var(--color-bottle)",
            textDecoration: "none",
          }}
          className="service-read-link"
          aria-label={`Read about ${title}`}
        >
          Read about this service
        </Link>
      </div>

      <style>{`
        .service-title-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .service-read-link:hover  { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </article>
  );
}
