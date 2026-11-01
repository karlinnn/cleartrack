import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import HeroJourney from "@/components/HeroJourney";
import HowItWorksLine from "@/components/HowItWorksLine";
import CountriesTicker from "@/components/CountriesTicker";
import TimeEstimator from "@/components/TimeEstimator";

export const metadata: Metadata = {
  title: "ClearTrack — Document Clearing",
  description:
    "ClearTrack handles document attestation, apostille certification, certified translation, and commercial clearing — correctly the first time.",
};

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        data-hero
        style={{
          backgroundColor: "var(--color-paper)",
          borderBottom: "1px solid var(--color-rule)",
          padding: "72px 24px 64px",
        }}
        aria-labelledby="hero-heading"
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "64px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — copy */}
          <div style={{ maxWidth: "540px" }}>
            {/*
              Headline: each line wrapped in a clip + sliding span.
              Stagger: line 1 at 0ms, line 2 at 120ms.
              Stamps begin at ~600ms so headline finishes first.
            */}
            <h1
              id="hero-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                color: "var(--color-ink)",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="hero-line-clip">
                <span
                  className="hero-line-text"
                  style={{ animationDelay: "0ms" }}
                >
                  Documents cleared correctly,
                </span>
              </span>
              <span className="hero-line-clip">
                <span
                  className="hero-line-text"
                  style={{ animationDelay: "120ms" }}
                >
                  the first time.
                </span>
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "var(--color-ink)",
                opacity: 0.8,
                marginBottom: "36px",
                maxWidth: "55ch",
              }}
            >
              ClearTrack manages attestation, apostille, translation, and
              commercial document clearing from start to finish.
            </p>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Link
                href="/#contact"
                id="cta-request-quote"
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
                className="btn-primary btn-press"
              >
                Request a quote
              </Link>

              <form
                id="track-form"
                action="/track"
                method="get"
                style={{ display: "flex", gap: "0" }}
                aria-label="Track your application"
              >
                <label
                  htmlFor="track-ref"
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                  }}
                >
                  Application reference number
                </label>
                <input
                  id="track-ref"
                  name="ref"
                  type="text"
                  placeholder="Reference number"
                  autoComplete="off"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    padding: "11px 14px",
                    border: "1.5px solid var(--color-rule)",
                    borderRight: "none",
                    borderRadius: "2px 0 0 2px",
                    backgroundColor: "var(--color-paper)",
                    color: "var(--color-ink)",
                    width: "190px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    padding: "11px 18px",
                    backgroundColor: "var(--color-paper)",
                    color: "var(--color-bottle)",
                    border: "1.5px solid var(--color-rule)",
                    borderRadius: "0 2px 2px 0",
                    cursor: "pointer",
                  }}
                  className="btn-track"
                >
                  Track application
                </button>
              </form>
            </div>
          </div>

          {/* Right — animated document journey */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <HeroJourney />
          </div>
        </div>
      </section>

      {/* ── Countries ticker ───────────────────────────────────────────── */}
      <CountriesTicker />

      {/* ── Services ledger ───────────────────────────────────────────── */}
      <section
        id="services"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px",
          width: "100%",
        }}
        aria-labelledby="services-heading"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid var(--color-rule)",
            paddingBottom: "16px",
            marginBottom: "0",
          }}
        >
          <h2
            id="services-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--color-ink)",
            }}
          >
            Our services
          </h2>
          <Link
            href="/services"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-bottle)",
              textDecoration: "none",
            }}
            className="all-services-link"
          >
            All services
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

      {/* ── Time estimator ────────────────────────────────────────────── */}
      <section
        id="time-estimator"
        style={{
          backgroundColor: "var(--color-paper)",
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
          padding: "72px 24px",
        }}
        aria-labelledby="estimator-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            id="estimator-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--color-ink)",
              marginBottom: "8px",
            }}
          >
            How long will it take?
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-ink)",
              opacity: 0.7,
              marginBottom: "28px",
              maxWidth: "55ch",
            }}
          >
            Select a service and processing speed to see a typical timeline.
          </p>
          <TimeEstimator />
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{
          backgroundColor: "var(--color-ink)",
          color: "var(--color-paper)",
          padding: "72px 24px",
          borderTop: "1px solid var(--color-rule)",
        }}
        aria-labelledby="how-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            id="how-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--color-paper)",
              marginBottom: "48px",
            }}
          >
            How it works
          </h2>
          {/* Scroll-driven line + steps */}
          <HowItWorksLine />
        </div>
      </section>

      {/* ── Contact / CTA ─────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          backgroundColor: "var(--color-paper)",
          borderTop: "1px solid var(--color-rule)",
          padding: "72px 24px",
        }}
        aria-labelledby="contact-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--color-ink)",
              marginBottom: "12px",
            }}
          >
            Ready to proceed?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-ink)",
              opacity: 0.75,
              maxWidth: "55ch",
              marginBottom: "28px",
            }}
          >
            Send us your document details and we will confirm requirements,
            timeline, and fees within one business day.
          </p>
          <Link
            href="mailto:enquiries@cleartrack.com"
            id="cta-contact"
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
            className="btn-primary btn-press"
          >
            Request a quote
          </Link>
        </div>
      </section>

      {/* ── Scoped hover styles ───────────────────────────────────────── */}
      <style>{`
        .btn-primary:hover {
          background-color: #163d35;
          border-color: #163d35;
        }
        .btn-track:hover {
          background-color: #e8ebe7;
        }
        .all-services-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 720px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > :last-child {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
