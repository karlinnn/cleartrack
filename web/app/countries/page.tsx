import type { Metadata } from "next";
import Link from "next/link";
import { COUNTRIES } from "@/data/site";

export const metadata: Metadata = {
  title: "Countries served",
  description:
    "ClearTrack handles document attestation and apostille certification for authorities in the UAE, GCC, and internationally across more than twelve countries.",
};

export default function CountriesPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 24px 80px", width: "100%" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.6 }}>
          <li><Link href="/" style={{ color: "var(--color-bottle)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Countries served</li>
        </ol>
      </nav>

      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "20px", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          Countries served
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.7, maxWidth: "58ch" }}>
          ClearTrack processes documents for authorities in all countries listed below. If your destination country is not shown, contact us — requirements for additional jurisdictions are assessed on a case-by-case basis.
        </p>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", borderTop: "1px solid var(--color-rule)", borderLeft: "1px solid var(--color-rule)" }} role="list" aria-label="Countries served">
        {COUNTRIES.map((c) => (
          <li
            key={c.code}
            role="listitem"
            style={{ borderBottom: "1px solid var(--color-rule)", borderRight: "1px solid var(--color-rule)", padding: "18px 20px", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span aria-hidden="true" style={{ fontSize: "1.25rem" }}>
              {/* Country flag emoji via regional indicator letters */}
              {c.code.toUpperCase().split("").map((ch) => String.fromCodePoint(ch.charCodeAt(0) - 65 + 0x1F1E6)).join("")}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-ink)" }}>
              {c.name}
            </span>
          </li>
        ))}
      </ul>

      <section style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "40px", marginTop: "40px" }} aria-labelledby="apostille-note">
        <h2 id="apostille-note" style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          Apostille and Hague Convention countries
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, maxWidth: "62ch", marginBottom: "16px" }}>
          Apostille certification under the Hague Convention of 1961 is accepted by all 120-plus member states. Documents destined for non-member countries require a full embassy attestation chain. Our officers will advise on the correct procedure at intake.
        </p>
        <Link href="/quote" style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }} className="btn-primary">
          Request a quote
        </Link>
      </section>

      <style>{`.btn-primary:hover { background-color: #163d35 !important; }`}</style>
    </div>
  );
}
