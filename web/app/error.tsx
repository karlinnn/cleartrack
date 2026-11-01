"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
      role="alert"
      aria-live="assertive"
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
        Notice
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          marginBottom: "16px",
          lineHeight: 1.1,
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--color-ink)",
          opacity: 0.75,
          maxWidth: "55ch",
          marginBottom: "32px",
        }}
      >
        We were unable to load this page. Please try again, or contact us if the
        problem continues.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          id="error-retry-btn"
          onClick={reset}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            fontWeight: 500,
            padding: "11px 22px",
            backgroundColor: "var(--color-bottle)",
            color: "var(--color-paper)",
            border: "1.5px solid var(--color-bottle)",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            fontWeight: 500,
            padding: "11px 22px",
            backgroundColor: "var(--color-paper)",
            color: "var(--color-bottle)",
            border: "1.5px solid var(--color-rule)",
            borderRadius: "2px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Return home
        </a>
      </div>
      {error.digest && (
        <p
          style={{
            marginTop: "24px",
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            opacity: 0.4,
            fontFamily: "monospace",
          }}
        >
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
