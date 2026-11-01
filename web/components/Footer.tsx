import Link from "next/link";

const FOOTER_LINKS = {
  Services: [
    { href: "/services/document-attestation",        label: "Document attestation" },
    { href: "/services/apostille-certification",     label: "Apostille certification" },
    { href: "/services/translation-and-notarisation",label: "Translation and notarisation" },
    { href: "/services/commercial-document-clearing",label: "Commercial clearing" },
  ],
  Company: [
    { href: "/about",        label: "About" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/countries",    label: "Countries served" },
    { href: "/security",     label: "Security and confidentiality" },
  ],
  Support: [
    { href: "/faq",     label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/quote",   label: "Request a quote" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms",   label: "Terms of service" },
  ],
};

const SOCIALS = [
  { href: "https://linkedin.com/company/cleartrack", label: "LinkedIn" },
  { href: "https://twitter.com/cleartrack",          label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-bottle)", color: "var(--color-paper)", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 32px" }}>
        {/* Top row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, auto)", gap: "48px", alignItems: "start" }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-paper)", marginBottom: "8px" }}>
              ClearTrack
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-paper)", opacity: 0.75, maxWidth: "28ch", lineHeight: 1.6, marginBottom: "20px" }}>
              Document clearing done correctly, on time, every time.
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-paper)", opacity: 0.6, marginBottom: "4px" }}>
              <a href="mailto:enquiries@cleartrack.com" style={{ color: "var(--color-paper)", textDecoration: "none" }} className="footer-link">
                enquiries@cleartrack.com
              </a>
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-paper)", opacity: 0.6 }}>
              <a href="tel:+97142000000" style={{ color: "var(--color-paper)", textDecoration: "none" }} className="footer-link">
                +971 4 200 0000
              </a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-paper)", opacity: 0.5, marginBottom: "12px", letterSpacing: "0.04em" }}>
                {heading}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} style={{ fontSize: "0.875rem", color: "var(--color-paper)", opacity: 0.85, textDecoration: "none" }} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + bottom bar */}
        <div style={{ borderTop: "1px solid rgba(201,208,202,0.2)", marginTop: "40px", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "0.8125rem", opacity: 0.6, color: "var(--color-paper)" }}>
            &copy; {new Date().getFullYear()} ClearTrack. All rights reserved.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "16px" }}>
            {SOCIALS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8125rem", color: "var(--color-paper)", opacity: 0.6, textDecoration: "none" }}
                  className="footer-link"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .footer-link:hover { opacity: 1 !important; text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 400px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
