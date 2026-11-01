"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { FAQ_ITEMS, FaqItem } from "@/data/faq";

function Accordion({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const headingId = `${item.id}-heading`;
  const panelId = `${item.id}-panel`;

  return (
    <div
      className="faq-item ledger-row"
      style={{
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          id={headingId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            gap: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "var(--font-serif)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-ink)",
            lineHeight: 1.4,
          }}
        >
          <span>{item.question}</span>
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-bottle)",
              transition: "transform 0.18s ease",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              fontSize: "1.25rem",
              lineHeight: 1,
            }}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        style={{
          paddingBottom: isOpen ? "18px" : "0",
        }}
      >
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            color: "var(--color-ink)",
            opacity: 0.85,
            maxWidth: "70ch",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqClient() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const searchId = useId();
  const total = FAQ_ITEMS.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) =>
      `${item.question} ${item.answer}`.toLowerCase().includes(q)
    );
  }, [query]);

  const shown = filtered.length;

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      {/* Search */}
      <div
        style={{
          marginTop: "24px",
          marginBottom: "0",
        }}
      >
        <label
          htmlFor={searchId}
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
            opacity: 0.6,
            marginBottom: "6px",
          }}
        >
          Search questions
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenId(null);
          }}
          placeholder="Type a keyword…"
          autoComplete="off"
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "0.55rem 0.75rem",
            border: "1px solid var(--color-rule)",
            borderRadius: "2px",
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            fontSize: "0.9375rem",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Count */}
      <p
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: "0.8125rem",
          color: "var(--color-ink)",
          opacity: 0.6,
          padding: "12px 0",
          borderBottom: "1px solid var(--color-rule)",
          marginTop: "14px",
        }}
      >
        {shown === total
          ? `Showing all ${total} questions`
          : `${shown} of ${total} questions`}
      </p>

      {/* Accordion list */}
      {filtered.length === 0 ? (
        <div
          style={{
            padding: "56px 0 40px",
            textAlign: "center",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-ink)",
              marginBottom: "10px",
            }}
          >
            No questions match your search.
          </p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-ink)",
              opacity: 0.7,
              marginBottom: "24px",
            }}
          >
            Try a different keyword, or reach our team directly for a precise answer.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "var(--color-bottle)",
              color: "var(--color-paper)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              borderRadius: "2px",
              border: "1px solid var(--color-bottle)",
              textDecoration: "none",
            }}
          >
            Contact us
          </Link>
        </div>
      ) : (
        <div role="list" aria-label="Frequently asked questions">
          {filtered.map((item) => (
            <div key={item.id} role="listitem">
              <Accordion
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            </div>
          ))}
        </div>
      )}

      <style>{`
        input[type="search"]:focus {
          outline: 2px solid var(--color-bottle);
          outline-offset: 1px;
          border-color: var(--color-bottle);
        }
        .faq-item button:focus-visible {
          outline: 2px solid var(--color-brass);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-item button span[aria-hidden] { transition: none; }
        }
      `}</style>
    </div>
  );
}
