"use client";
import Link from "next/link";

export default function ServicesError({
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
        padding: "64px 24px",
      }}
      role="alert"
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          marginBottom: "12px",
        }}
      >
        Unable to load services
      </h1>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          maxWidth: "52ch",
          marginBottom: "28px",
          opacity: 0.75,
        }}
      >
        The services list could not be retrieved. Please retry or{" "}
        <Link href="/#contact" style={{ color: "var(--color-bottle)" }}>
          contact us
        </Link>{" "}
        directly.
      </p>
      <button
        id="services-retry-btn"
        onClick={reset}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          padding: "11px 22px",
          backgroundColor: "var(--color-bottle)",
          color: "var(--color-paper)",
          border: "none",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
