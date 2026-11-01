import type { Metadata } from "next";
import Link from "next/link";
import Seal from "@/components/Seal";

export const metadata: Metadata = {
  title: "About ClearTrack",
  description:
    "ClearTrack is a licensed document clearing agency based in Dubai, handling attestation, apostille, translation, and commercial clearing on behalf of individuals and corporations.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px 80px", width: "100%" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.6 }}>
          <li><Link href="/" style={{ color: "var(--color-bottle)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">About</li>
        </ol>
      </nav>

      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "20px", marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
            About ClearTrack
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.7, maxWidth: "58ch" }}>
            A licensed document clearing agency, based in Dubai.
          </p>
        </div>
        <div aria-hidden="true" style={{ flexShrink: 0 }}>
          <Seal size={100} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {[
          {
            heading: "Who we are",
            body: [
              "ClearTrack is a document clearing agency registered in the United Arab Emirates. We act as an authorised intermediary between individuals, corporations, law firms, and the government departments, embassies, and notary bodies that authenticate official documents.",
              "Our officers hold direct accreditation with the relevant UAE federal and emirate-level authorities, and maintain working relationships with embassy attestation desks across the GCC and beyond.",
            ],
          },
          {
            heading: "What we believe",
            body: [
              "Documents are instruments of consequence. A birth certificate attested for the wrong country, a translation certified by an unrecognised body, or a trade licence submitted without a required counter-stamp can delay a life event by weeks or derail a commercial transaction entirely.",
              "We believe that a document clearing service should be accountable for accuracy, transparent about fees, and efficient without being opaque. Every file we accept receives a fixed fee, a reference number, and a responsible officer.",
            ],
          },
          {
            heading: "Our scope",
            body: [
              "We handle personal documents (birth, marriage, degree, and identity records), commercial documents (trade licences, memoranda of association, certificates of origin), and legal instruments (power of attorney, court orders, affidavits) for authorities in the UAE, GCC, and internationally.",
              "Translation and notarisation services are delivered through our network of sworn translators and licensed notaries, covering more than forty language pairs.",
            ],
          },
          {
            heading: "Location",
            body: [
              "Our office is in Dubai. Documents may be submitted in person or by courier using the reference form. Cleared documents are returned by registered courier or collected at the office.",
            ],
          },
        ].map((section) => (
          <section key={section.heading} style={{ borderTop: "1px solid var(--color-rule)", padding: "32px 0" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "16px" }}>
              {section.heading}
            </h2>
            {section.body.map((para, i) => (
              <p key={i} style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, marginBottom: "16px", maxWidth: "62ch" }}>
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div style={{ marginTop: "8px", paddingTop: "32px", borderTop: "1px solid var(--color-rule)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link href="/quote" style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }} className="btn-primary">
          Request a quote
        </Link>
        <Link href="/contact" style={{ display: "inline-block", backgroundColor: "var(--color-paper)", color: "var(--color-bottle)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none", border: "1px solid var(--color-rule)" }} className="btn-secondary">
          Contact us
        </Link>
      </div>

      <style>{`
        .btn-primary:hover  { background-color: #163d35 !important; }
        .btn-secondary:hover { background-color: #e8ebe7 !important; }
      `}</style>
    </div>
  );
}
