import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/api";
import Seal from "@/components/Seal";
import DocumentIllustration from "@/components/DocumentIllustration";
import ServiceCard from "@/components/ServiceCard";
import { WHY_US, WHO_WE_SERVE, COUNTRIES, TESTIMONIALS, FAQ } from "@/data/site";

export const metadata: Metadata = {
  title: "ClearTrack — Document Clearing",
  description:
    "ClearTrack handles document attestation, apostille certification, certified translation, and commercial clearing — correctly the first time.",
};

const S = {
  h2: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
    fontWeight: 700,
    color: "var(--color-ink)",
  } as React.CSSProperties,
  h2Light: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
    fontWeight: 700,
    color: "var(--color-paper)",
  } as React.CSSProperties,
  sectionWrap: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "64px 24px",
    width: "100%",
  } as React.CSSProperties,
};

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-paper)", borderBottom: "1px solid var(--color-rule)", padding: "72px 24px 64px" }}
        aria-labelledby="hero-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "64px", alignItems: "center" }} className="hero-grid">
          <div style={{ maxWidth: "540px" }}>
            <h1
              id="hero-heading"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.08, color: "var(--color-ink)", marginBottom: "20px", letterSpacing: "-0.02em" }}
            >
              Documents cleared correctly,<br />the first time.
            </h1>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.8, marginBottom: "36px", maxWidth: "55ch" }}>
              ClearTrack manages attestation, apostille, translation, and commercial document clearing from start to finish — with a fixed fee and a reference number tracking every step.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
              <Link href="/quote" id="cta-request-quote" style={{ display: "inline-block", backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none", border: "1.5px solid var(--color-bottle)" }} className="btn-primary">
                Request a quote
              </Link>
              <form id="track-form" action="/track" method="get" style={{ display: "flex" }} aria-label="Track your application">
                <label htmlFor="track-ref" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                  Application reference number
                </label>
                <input
                  id="track-ref"
                  name="ref"
                  type="text"
                  placeholder="Reference number"
                  autoComplete="off"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", padding: "11px 14px", border: "1.5px solid var(--color-rule)", borderRight: "none", borderRadius: "2px 0 0 2px", backgroundColor: "var(--color-paper)", color: "var(--color-ink)", width: "190px", outline: "none" }}
                />
                <button type="submit" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", padding: "11px 18px", backgroundColor: "var(--color-paper)", color: "var(--color-bottle)", border: "1.5px solid var(--color-rule)", borderRadius: "0 2px 2px 0", cursor: "pointer" }} className="btn-track">
                  Track application
                </button>
              </form>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }} aria-hidden="true">
            <DocumentIllustration width={220} height={280} />
            <div style={{ position: "absolute", bottom: "-20px", right: "-28px" }}>
              <Seal stamp size={160} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ledger ───────────────────────────────────────────── */}
      <section id="services" style={S.sectionWrap} aria-labelledby="services-heading">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--color-rule)", paddingBottom: "16px" }}>
          <h2 id="services-heading" style={S.h2}>Our services</h2>
          <Link href="/services" style={{ fontSize: "0.875rem", color: "var(--color-bottle)", textDecoration: "none" }} className="text-link">
            All services →
          </Link>
        </div>
        <div role="list" aria-label="Services">
          {services.slice(0, 4).map((post, i) => (
            <div key={post.id} role="listitem">
              <ServiceCard post={post} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Why choose ClearTrack ─────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-ink)", color: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }}
        aria-labelledby="why-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 id="why-heading" style={{ ...S.h2Light, marginBottom: "48px" }}>Why choose ClearTrack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0" }} className="why-grid">
            {WHY_US.map((item, i) => (
              <div
                key={item.title}
                style={{ borderLeft: i > 0 ? "1px solid rgba(201,208,202,0.2)" : "none", paddingLeft: i > 0 ? "32px" : "0", paddingRight: "32px" }}
              >
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-paper)", opacity: 0.75, lineHeight: 1.7, maxWidth: "32ch" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ ...S.sectionWrap, borderTop: "1px solid var(--color-rule)" }} aria-labelledby="how-heading">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px" }}>
          <h2 id="how-heading" style={S.h2}>How it works</h2>
          <Link href="/how-it-works" style={{ fontSize: "0.875rem", color: "var(--color-bottle)", textDecoration: "none" }} className="text-link">
            Full process →
          </Link>
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0" }} className="steps-grid">
          {[
            { n: "1", title: "Submit your documents", body: "Bring originals to our office or courier them to us with the reference form attached." },
            { n: "2", title: "We review them", body: "A clearing officer verifies each document against the requirements of the destination authority." },
            { n: "3", title: "We clear and attest", body: "We manage the submission, follow up with authorities, and collect the attested copies on your behalf." },
            { n: "4", title: "You collect them", body: "Receive your completed documents in person or by registered courier, with a full audit trail." },
          ].map((step, i) => (
            <li key={step.n} style={{ borderLeft: i > 0 ? "1px solid var(--color-rule)" : "none", paddingLeft: i > 0 ? "32px" : "0", paddingRight: "32px" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 700, color: "var(--color-brass)", lineHeight: 1, marginBottom: "14px" }} aria-hidden="true">
                {step.n}
              </p>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "8px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-ink)", opacity: 0.7, lineHeight: 1.7, maxWidth: "32ch" }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Who we serve ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }} aria-labelledby="who-heading">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 id="who-heading" style={{ ...S.h2, marginBottom: "40px" }}>Who we serve</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0", borderTop: "1px solid var(--color-rule)" }}>
            {WHO_WE_SERVE.map((item) => (
              <div key={item.title} style={{ borderRight: "1px solid var(--color-rule)", padding: "28px 24px 28px 0", marginRight: "24px" }} className="who-item">
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-ink)", opacity: 0.7, lineHeight: 1.7, maxWidth: "32ch" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Countries served ──────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }} aria-labelledby="countries-heading">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px" }}>
            <h2 id="countries-heading" style={S.h2}>Countries served</h2>
            <Link href="/countries" style={{ fontSize: "0.875rem", color: "var(--color-bottle)", textDecoration: "none" }} className="text-link">
              Full list →
            </Link>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "0", borderTop: "1px solid var(--color-rule)" }}>
            {COUNTRIES.slice(0, 8).map((c) => (
              <li key={c.code} style={{ borderBottom: "1px solid var(--color-rule)", borderRight: "1px solid var(--color-rule)", padding: "14px 20px", fontSize: "0.9rem", color: "var(--color-ink)", minWidth: "160px" }}>
                {c.name}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "12px", fontSize: "0.8125rem", color: "var(--color-ink)", opacity: 0.55 }}>
            And {COUNTRIES.length - 8} more — <Link href="/countries" style={{ color: "var(--color-bottle)" }}>see the full list</Link>.
          </p>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }} aria-labelledby="testimonials-heading">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 id="testimonials-heading" style={{ ...S.h2, marginBottom: "12px" }}>Client accounts</h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-ink)", opacity: 0.5, marginBottom: "40px", fontStyle: "italic" }}>
            The following are representative placeholder testimonials. Real accounts will replace them prior to launch.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", borderTop: "1px solid var(--color-rule)" }}>
            {TESTIMONIALS.map((t) => (
              <figure key={t.id} style={{ margin: 0, borderRight: "1px solid var(--color-rule)", padding: "32px 28px 32px 0", marginRight: "28px" }} className="testimonial-item">
                <blockquote style={{ margin: 0, padding: 0 }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.75, color: "var(--color-ink)", marginBottom: "20px" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption style={{ fontSize: "0.8125rem", color: "var(--color-ink)", opacity: 0.55, fontFamily: "var(--font-sans)" }}>
                  — {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ preview ───────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }} aria-labelledby="faq-heading">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px" }}>
            <h2 id="faq-heading" style={S.h2}>Frequently asked questions</h2>
            <Link href="/faq" style={{ fontSize: "0.875rem", color: "var(--color-bottle)", textDecoration: "none" }} className="text-link">
              All questions →
            </Link>
          </div>
          <dl style={{ margin: 0 }}>
            {FAQ.slice(0, 3).map((item) => (
              <div key={item.id} style={{ borderTop: "1px solid var(--color-rule)", padding: "20px 0" }}>
                <dt style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "8px" }}>
                  {item.question}
                </dt>
                <dd style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.7 }}>
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Contact strip ─────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{ backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", padding: "64px 24px" }}
        aria-labelledby="contact-strip-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <h2 id="contact-strip-heading" style={{ ...S.h2Light, marginBottom: "8px" }}>Ready to proceed?</h2>
            <p style={{ fontSize: "1rem", color: "var(--color-paper)", opacity: 0.8, maxWidth: "52ch", lineHeight: 1.6 }}>
              Send us your document details and we will confirm requirements, timeline, and fees within one business day.
            </p>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "inline-block", backgroundColor: "var(--color-paper)", color: "var(--color-bottle)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600, padding: "12px 24px", borderRadius: "2px", textDecoration: "none" }} className="btn-strip-primary">
              Request a quote
            </Link>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "transparent", color: "var(--color-paper)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px", borderRadius: "2px", textDecoration: "none", border: "1px solid rgba(201,208,202,0.5)" }} className="btn-strip-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .btn-primary:hover  { background-color: #163d35 !important; border-color: #163d35 !important; }
        .btn-track:hover    { background-color: #e8ebe7; }
        .btn-strip-primary:hover  { background-color: var(--color-rule) !important; }
        .btn-strip-secondary:hover { border-color: rgba(201,208,202,0.9) !important; }
        .text-link:hover    { text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > :last-child { display: none; }
        }
        @media (max-width: 500px) {
          .why-grid, .steps-grid { grid-template-columns: 1fr !important; }
          .why-grid > *, .steps-grid > li { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(201,208,202,0.2); padding-top: 24px !important; }
        }
      `}</style>
    </>
  );
}
