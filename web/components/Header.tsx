"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/services",      label: "Services" },
  { href: "/how-it-works",  label: "How it works" },
  { href: "/about",         label: "About" },
  { href: "/countries",     label: "Countries" },
  { href: "/contact",       label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header style={{ backgroundColor: "var(--color-paper)", borderBottom: "1px solid var(--color-rule)", position: "relative", zIndex: 100 }}>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          overflow: "hidden",
          padding: "4px 8px",
          backgroundColor: "var(--color-bottle)",
          color: "var(--color-paper)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          zIndex: 9999,
        }}
        className="skip-link"
      >
        Skip to main content
      </a>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        {/* Wordmark */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em", textDecoration: "none" }}
          aria-label="ClearTrack — home"
        >
          ClearTrack
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="desktop-nav">
          <ul style={{ display: "flex", gap: "28px", listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-bottle)", textDecoration: "none" }}
                  className={`nav-link${pathname === href ? " nav-link--active" : ""}`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/quote"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-paper)", backgroundColor: "var(--color-bottle)", padding: "6px 16px", borderRadius: "2px", textDecoration: "none", border: "1px solid var(--color-bottle)" }}
                className="nav-cta"
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="burger"
          style={{ background: "none", border: "1px solid var(--color-rule)", borderRadius: "2px", padding: "6px 10px", cursor: "pointer", display: "none", flexDirection: "column", gap: "4px" }}
        >
          <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "var(--color-ink)" }} />
          <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "var(--color-ink)" }} />
          <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "var(--color-ink)" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          style={{ backgroundColor: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", padding: "16px 24px 24px" }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0" }}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} style={{ borderBottom: "1px solid var(--color-rule)" }}>
                <Link
                  href={href}
                  style={{ display: "block", padding: "14px 0", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-bottle)", textDecoration: "none" }}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: "16px" }}>
              <Link
                href="/quote"
                style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-paper)", backgroundColor: "var(--color-bottle)", padding: "10px 24px", borderRadius: "2px", textDecoration: "none" }}
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <style>{`
        .skip-link:focus { left: 8px; top: 8px; }
        .nav-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .nav-link--active { color: var(--color-ink) !important; font-weight: 600; }
        .nav-cta:hover { background-color: #163d35 !important; border-color: #163d35 !important; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
