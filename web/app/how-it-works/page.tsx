import type { Metadata } from "next";
import Link from "next/link";
import { HOW_IT_WORKS } from "@/data/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A step-by-step explanation of how ClearTrack handles your document clearing from submission to attested delivery.",
};

export default function HowItWorksPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px 80px", width: "100%" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.6 }}>
          <li><Link href="/" style={{ color: "var(--color-bottle)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">How it works</li>
        </ol>
      </nav>

      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "20px", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          How it works
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.7, maxWidth: "58ch" }}>
          ClearTrack manages every step so that your documents reach the destination authority in the correct form, on the stated date. Here is the process.
        </p>
      </div>

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {HOW_IT_WORKS.map((step) => (
          <li key={step.n} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "24px", borderTop: "1px solid var(--color-rule)", padding: "32px 0" }}>
            <div>
              <span
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", border: "1px solid var(--color-brass)", fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-brass)" }}
                aria-hidden="true"
              >
                {step.n}
              </span>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "10px" }}>
                {step.title}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, maxWidth: "58ch" }}>
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Extended notes */}
      <section style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "40px", marginTop: "8px" }} aria-labelledby="notes-heading">
        <h2 id="notes-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "16px" }}>
          Notes on timing and couriering
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, marginBottom: "16px", maxWidth: "60ch" }}>
          Express processing (two to three working days) is available for most attestation and apostille services, subject to authority availability at the time of intake. Express fees are confirmed before submission.
        </p>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, marginBottom: "32px", maxWidth: "60ch" }}>
          If you are sending documents from outside the UAE, please contact us before dispatch. Some document types require pre-verification before they are accepted at authority counters, and our team will advise on packaging and labelling requirements.
        </p>
        <Link
          href="/quote"
          style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }}
          className="btn-primary"
        >
          Request a quote
        </Link>
      </section>

      <style>{`.btn-primary:hover { background-color: #163d35 !important; }`}</style>
    </div>
  );
}
