import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security and confidentiality",
  description:
    "How ClearTrack handles your documents and personal data: what we collect, how documents are stored and transmitted, and what we never request.",
};

const SECTION = (heading: string, children: React.ReactNode) => (
  <section style={{ borderTop: "1px solid var(--color-rule)", padding: "32px 0" }}>
    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "16px" }}>
      {heading}
    </h2>
    {children}
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, maxWidth: "62ch", marginBottom: "14px" }}>
    {children}
  </p>
);

export default function SecurityPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px 80px", width: "100%" }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.6 }}>
          <li><Link href="/" style={{ color: "var(--color-bottle)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Security and confidentiality</li>
        </ol>
      </nav>

      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "20px", marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          Security and confidentiality
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.7, maxWidth: "58ch" }}>
          Document clearing requires you to entrust us with sensitive originals. This page explains exactly how we handle them.
        </p>
      </div>

      {SECTION("What we collect", <>
        <P>To process your documents we require: your full legal name, contact email address, phone number, and the physical documents themselves. For commercial clients we will also require company registration details relevant to the filing.</P>
        <P>We retain a scanned copy of each document we process for a period of 12 months from the date of collection, after which scans are deleted from our systems. Physical originals are returned as part of the standard service.</P>
      </>)}

      {SECTION("What we never ask for in forms", <>
        <P>ClearTrack will never request passwords, PINs, banking credentials, or full payment card numbers through any web form, email, or telephone call. Our online quotation and contact forms collect contact details and document descriptions only.</P>
        <P>If you receive any communication purporting to be from ClearTrack requesting financial credentials, please contact our office immediately by telephone to verify.</P>
        <ul style={{ paddingLeft: "20px", marginBottom: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Online banking passwords or PINs", "Full debit or credit card numbers", "UAE Pass or national ID verification codes", "Copies of documents beyond those required for the clearing service"].map((item) => (
            <li key={item} style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      </>)}

      {SECTION("How documents are handled", <>
        <P>Physical originals are stored in a locked records room within our Dubai office during processing and are handled only by accredited clearing officers. Documents are not copied beyond what is required by the clearing process.</P>
        <P>When couriered to or from clients, we use established registered courier services with tracking. You receive the tracking reference as part of your file update. We do not ship originals via regular post.</P>
        <P>At authority counters, documents are submitted by our officers in person. We do not use third-party runners for document submission at embassies or government departments.</P>
      </>)}

      {SECTION("Data security", <>
        <P>Client records are stored on systems accessible only to accredited ClearTrack staff. File references are generated per-client and do not expose personal data if intercepted. We do not sell, share, or transfer client data to any third party except where required by the clearing process (for example, submitting a name and document type to a government authority).</P>
        <P>Our website is served over HTTPS. The quotation and contact forms transmit data directly to our servers without third-party analytics or marketing pixels on form submission pages.</P>
      </>)}

      {SECTION("Questions", <>
        <P>If you have a question about how we handle a specific document or data point, please contact us before submitting your file. We will confirm our handling procedure in writing.</P>
        <Link href="/contact" style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }} className="btn-primary">
          Contact us
        </Link>
      </>)}

      <style>{`.btn-primary:hover { background-color: #163d35 !important; }`}</style>
    </div>
  );
}
