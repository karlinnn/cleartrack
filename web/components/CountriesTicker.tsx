"use client";

const COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "United Kingdom",
  "Germany",
  "France",
  "United States",
  "Canada",
  "Australia",
  "India",
  "Pakistan",
  "Philippines",
  "Egypt",
  "Jordan",
];

// Build two copies for seamless loop
const LIST = [...COUNTRIES, ...COUNTRIES];

export default function CountriesTicker() {
  return (
    <div
      className="ctk-outer"
      aria-label="Countries we serve"
    >
      <div className="ctk-track">
        {/* Primary list */}
        <ul className="ctk-list" role="list">
          {COUNTRIES.map((c, i) => (
            <li key={`a-${i}`} className="ctk-item">
              {c}
            </li>
          ))}
        </ul>
        {/* Duplicate — aria-hidden for screen readers */}
        <ul className="ctk-list" role="list" aria-hidden="true">
          {COUNTRIES.map((c, i) => (
            <li key={`b-${i}`} className="ctk-item">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .ctk-outer {
          border-top: 1px solid var(--color-rule);
          border-bottom: 1px solid var(--color-rule);
          overflow: hidden;
          background: var(--color-paper);
          padding: 12px 0;
          /* pause on hover / focus */
          --ctk-play: running;
        }
        .ctk-outer:hover,
        .ctk-outer:focus-within {
          --ctk-play: paused;
        }

        .ctk-track {
          display: flex;
          width: max-content;
          animation: ctk-scroll 40s linear infinite;
          animation-play-state: var(--ctk-play);
        }
        @keyframes ctk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-track { animation: none; }
        }

        .ctk-list {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          align-items: center;
        }
        .ctk-item {
          padding: 0 28px;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          letter-spacing: 0.04em;
          color: var(--color-ink);
          opacity: 0.65;
          white-space: nowrap;
          border-right: 1px solid var(--color-rule);
        }
        .ctk-item:last-child {
          border-right: none;
        }
      `}</style>
    </div>
  );
}
