import type { Metadata } from "next";
import Link from "next/link";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about ClearTrack's document clearing services: attestation, apostille, timelines, fees, and more.",
};

export default function FaqPage() {
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
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol
          style={{
            display: "flex",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "0.875rem",
            color: "var(--color-ink)",
            opacity: 0.6,
          }}
        >
          <li>
            <Link href="/" style={{ color: "var(--color-bottle)" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">FAQ</li>
        </ol>
      </nav>

      {/* Heading */}
      <div
        style={{
          borderBottom: "1px solid var(--color-rule)",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-ink)",
            lineHeight: 1.08,
            marginBottom: "10px",
          }}
        >
          Frequently asked questions
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-ink)",
            opacity: 0.7,
            maxWidth: "58ch",
          }}
        >
          Answers to common queries about our services, processes, and timelines.
          If your question is not listed, please{" "}
          <Link href="/contact" style={{ color: "var(--color-bottle)" }}>
            contact us
          </Link>
          .
        </p>
      </div>

      {/* Client: search + accordion */}
      <FaqClient />
    </div>
  );
}
