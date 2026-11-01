import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — ClearTrack",
  description:
    "How ClearTrack collects, uses, stores, and protects your personal data in connection with our document clearing services.",
};

const S = {
  wrap: {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "64px 24px 80px",
  } as React.CSSProperties,
  h2: {
    fontFamily: "var(--font-serif)",
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "var(--color-ink)",
    marginBottom: "12px",
    marginTop: "40px",
  } as React.CSSProperties,
  p: {
    fontSize: "0.9375rem",
    lineHeight: 1.75,
    color: "var(--color-ink)",
    opacity: 0.82,
    marginBottom: "16px",
  } as React.CSSProperties,
};

export default function PrivacyPage() {
  return (
    <div style={S.wrap}>
      <div style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "24px", marginBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-bottle)", marginBottom: "8px" }}>
          Legal
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
          Privacy policy
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.5 }}>
          Last updated: 1 November 2024
        </p>
      </div>

      <p style={S.p}>
        ClearTrack Document Services (&ldquo;ClearTrack&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to
        protecting the privacy of individuals who use our document clearing services or visit our website. This policy
        explains what personal information we collect, why we collect it, and how we use and protect it.
      </p>

      <h2 style={S.h2}>Information we collect</h2>
      <p style={S.p}>
        When you request a quote, submit documents, or contact us, we collect personal information including your full
        name, email address, telephone number, and postal address. We also collect document-related information
        necessary to process your clearing request, such as passport numbers, document types, and issuing authorities.
      </p>
      <p style={S.p}>
        When you visit our website, we may collect standard server log data including your IP address, browser type,
        and pages visited. We do not use third-party tracking cookies.
      </p>

      <h2 style={S.h2}>How we use your information</h2>
      <p style={S.p}>
        We use your information solely to provide the document clearing services you have requested, to communicate
        with you about the status of your file, and to comply with our legal obligations. We do not sell, rent, or
        share your personal information with third parties for marketing purposes.
      </p>
      <p style={S.p}>
        We may share information with government authorities, notary bodies, and embassies strictly as required to
        complete the attestation or clearing service. Where third-party couriers are used, only the name and delivery
        address necessary for delivery will be shared.
      </p>

      <h2 style={S.h2}>Data retention</h2>
      <p style={S.p}>
        Client records are retained for a minimum of five years in accordance with applicable commercial and anti-money
        laundering regulations in the United Arab Emirates. After this period, records are securely destroyed.
      </p>

      <h2 style={S.h2}>Security</h2>
      <p style={S.p}>
        All personal data is stored on encrypted servers located within the UAE or in jurisdictions with adequate data
        protection standards. Access to client records is restricted to authorised staff who require the data to
        perform their duties. For further details, see our{" "}
        <a href="/security" style={{ color: "var(--color-bottle)" }}>security and confidentiality statement</a>.
      </p>

      <h2 style={S.h2}>Your rights</h2>
      <p style={S.p}>
        You have the right to request a copy of the personal information we hold about you, to request correction of
        inaccurate data, and to request deletion of data that is no longer required for a legitimate purpose. To
        exercise these rights, contact us at{" "}
        <a href="mailto:privacy@cleartrack.com" style={{ color: "var(--color-bottle)" }}>privacy@cleartrack.com</a>.
      </p>

      <h2 style={S.h2}>Changes to this policy</h2>
      <p style={S.p}>
        We may update this policy from time to time. Material changes will be notified by a prominent notice on this
        page and, where appropriate, by email. Continued use of our services after such changes constitutes acceptance
        of the revised policy.
      </p>

      <h2 style={S.h2}>Contact</h2>
      <p style={{ ...S.p, marginBottom: 0 }}>
        For privacy-related enquiries, contact us at{" "}
        <a href="mailto:privacy@cleartrack.com" style={{ color: "var(--color-bottle)" }}>privacy@cleartrack.com</a>{" "}
        or write to ClearTrack Document Services, Suite 401, Business Bay Tower, Dubai, UAE.
      </p>
    </div>
  );
}
