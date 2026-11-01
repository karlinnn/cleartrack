import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us — ClearTrack",
  description:
    "Get in touch with ClearTrack's team. Send us a message and we will respond within one business day.",
};

export default function ContactPage() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 24px 80px",
      }}
    >
      {/* Page header */}
      <div
        style={{
          borderBottom: "1px solid var(--color-rule)",
          paddingBottom: "24px",
          marginBottom: "48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--color-bottle)",
            marginBottom: "8px",
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--color-ink)",
            lineHeight: 1.08,
            marginBottom: "12px",
          }}
        >
          Get in touch
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-ink)",
            opacity: 0.75,
            maxWidth: "56ch",
            marginTop: "12px",
          }}
        >
          Send us a message and a member of the team will respond within one
          business day. For document submissions, please use the{" "}
          <Link href="/quote" style={{ color: "var(--color-bottle)" }}>
            quote request form
          </Link>
          .
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "64px",
          alignItems: "start",
        }}
        className="contact-layout"
      >
        {/* Form (client component) */}
        <ContactForm />

        {/* Sidebar */}
        <aside aria-label="Office contact details">
          <div
            style={{
              borderLeft: "1px solid var(--color-rule)",
              paddingLeft: "28px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--color-ink)",
                marginBottom: "20px",
              }}
            >
              Office details
            </h2>
            <dl
              style={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {(
                [
                  {
                    term: "Address",
                    detail:
                      "ClearTrack Document Services\nSuite 401, Business Bay Tower\nDubai, United Arab Emirates",
                  },
                  {
                    term: "Email",
                    detail: "enquiries@cleartrack.com",
                    href: "mailto:enquiries@cleartrack.com",
                  },
                  {
                    term: "Telephone",
                    detail: "+971 4 200 0000",
                    href: "tel:+97142000000",
                  },
                  {
                    term: "Office hours",
                    detail: "Sunday – Thursday\n08:30 – 17:30 (GST)",
                  },
                ] as Array<{ term: string; detail: string; href?: string }>
              ).map(({ term, detail, href }) => (
                <div key={term}>
                  <dt
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      color: "var(--color-ink)",
                      opacity: 0.5,
                      marginBottom: "4px",
                    }}
                  >
                    {term}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.65,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {href ? (
                      <a
                        href={href}
                        style={{ color: "var(--color-bottle)" }}
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
