"use client";

import Link from "next/link";
import { useState } from "react";
import Seal from "@/components/Seal";

export default function NotFound() {
  const [stamped, setStamped] = useState(false);

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
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
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

      {/* Stamp this page */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        <button
          id="not-found-stamp"
          type="button"
          className="btn-press nf-stamp-btn"
          onClick={() => setStamped(true)}
          aria-label="Stamp this page as Not Found"
          style={{
            padding: "10px 20px",
            border: "1.5px solid var(--color-rule)",
            borderRadius: "2px",
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          Stamp this page
        </button>

        {stamped && (
          <div
            aria-label="Not Found seal"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
          >
            <span key={String(stamped)} className="nf-seal-wrapper">
              <Seal
                stamp
                size={120}
                text="NOT FOUND · 404 ·"
              />
            </span>
          </div>
        )}
      </div>

      <style>{`
        .btn-primary:hover { background-color: #163d35; border-color: #163d35; }
        .nf-stamp-btn:hover { border-color: var(--color-bottle); color: var(--color-bottle); }
        .nf-seal-wrapper {
          display: block;
          animation: ctk-press-in 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes ctk-press-in {
          0% { transform: scale(1.18); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf-seal-wrapper { animation: none; }
        }
      `}</style>
    </div>
  );
}
