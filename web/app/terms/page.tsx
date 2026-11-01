import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service — ClearTrack",
  description:
    "The terms and conditions governing the use of ClearTrack's document clearing, attestation, and translation services.",
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

export default function TermsPage() {
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
          Terms of service
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-ink)", opacity: 0.5 }}>
          Last updated: 1 November 2024
        </p>
      </div>

      <p style={S.p}>
        These terms govern your use of the document clearing, attestation, translation, and related services provided
        by ClearTrack Document Services (&ldquo;ClearTrack&rdquo;). By engaging our services, you agree to these
        terms.
      </p>

      <h2 style={S.h2}>1. Services</h2>
      <p style={S.p}>
        ClearTrack acts as an authorised intermediary between clients and government authorities, embassies, notary
        bodies, and translation professionals. We do not guarantee the outcome of any application, as final decisions
        rest with the relevant authority. We will, however, exercise all reasonable care and skill in preparing and
        submitting your documents.
      </p>

      <h2 style={S.h2}>2. Client obligations</h2>
      <p style={S.p}>
        You must ensure that all documents and information you provide are genuine, accurate, and complete. ClearTrack
        accepts no liability for delays, rejections, or additional costs arising from documents that are incomplete,
        incorrect, or fraudulent. You are responsible for obtaining and providing original documents where required.
      </p>

      <h2 style={S.h2}>3. Fees and payment</h2>
      <p style={S.p}>
        All fees are confirmed in writing on a proforma invoice prior to commencement of work. Service fees cover
        ClearTrack's processing and account management. Authority fees, embassy charges, and third-party courier costs
        are itemised separately and passed through at cost. Payment is due in full before we submit your file to the
        relevant authority.
      </p>
      <p style={S.p}>
        Fees are non-refundable once work has commenced, except where ClearTrack is unable to complete the service due
        to circumstances within our control.
      </p>

      <h2 style={S.h2}>4. Turnaround times</h2>
      <p style={S.p}>
        Estimated turnaround times are provided in good faith based on typical authority processing periods. ClearTrack
        is not liable for delays caused by authority backlogs, public holidays, or events outside our control. Express
        services are subject to authority availability and are confirmed at intake.
      </p>

      <h2 style={S.h2}>5. Confidentiality</h2>
      <p style={S.p}>
        ClearTrack treats all client documents and personal information as strictly confidential. Documents are
        disclosed only to the authorities necessary to complete your service. For full details, see our{" "}
        <a href="/privacy" style={{ color: "var(--color-bottle)" }}>privacy policy</a> and{" "}
        <a href="/security" style={{ color: "var(--color-bottle)" }}>security statement</a>.
      </p>

      <h2 style={S.h2}>6. Limitation of liability</h2>
      <p style={S.p}>
        To the maximum extent permitted by applicable law, ClearTrack's aggregate liability in respect of any claim
        arising from a service engagement is limited to the service fee paid for that engagement. We are not liable for
        indirect, consequential, or special losses.
      </p>

      <h2 style={S.h2}>7. Governing law</h2>
      <p style={{ ...S.p, marginBottom: 0 }}>
        These terms are governed by the laws of the United Arab Emirates. Any dispute shall be subject to the
        exclusive jurisdiction of the courts of Dubai, UAE. If you have questions about these terms, contact us at{" "}
        <a href="mailto:enquiries@cleartrack.com" style={{ color: "var(--color-bottle)" }}>enquiries@cleartrack.com</a>.
      </p>
    </div>
  );
}
