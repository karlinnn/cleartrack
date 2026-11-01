import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to frequently asked questions about document attestation, apostille certification, translation, timelines, and fees at ClearTrack.",
};

export default function FaqPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px 80px", width: "100%" }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.6 }}>
          <li><Link href="/" style={{ color: "var(--color-bottle)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">FAQ</li>
        </ol>
      </nav>

      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "20px", marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          Frequently asked questions
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.7, maxWidth: "58ch" }}>
          If your question is not answered here, please use the contact form or call our office directly.
        </p>
      </div>

      <FaqAccordion />

      <div style={{ borderTop: "1px solid var(--color-rule)", marginTop: "8px", paddingTop: "32px" }}>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.7, marginBottom: "20px" }}>
          Still have questions? Send them to us directly.
        </p>
        <Link
          href="/contact"
          style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }}
          className="btn-primary"
        >
          Contact us
        </Link>
      </div>

      <style>{`.btn-primary:hover { background-color: #163d35 !important; }`}</style>
    </div>
  );
}
