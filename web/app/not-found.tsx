import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-bottle)",
          letterSpacing: "0.06em",
          marginBottom: "12px",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          lineHeight: 1.08,
          marginBottom: "16px",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--color-ink)",
          opacity: 0.75,
          maxWidth: "52ch",
          marginBottom: "32px",
        }}
      >
        The page you requested does not exist or has been moved. Return to the
        home page or browse our services.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link
          href="/"
          id="not-found-home"
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
          Return home
        </Link>
        <Link
          href="/services"
          id="not-found-services"
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
        >
          Browse services
        </Link>
      </div>
      <style>{`
        .btn-primary:hover { background-color: #163d35; border-color: #163d35; }
      `}</style>
    </div>
  );
}
