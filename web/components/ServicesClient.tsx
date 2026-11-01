"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import type { WPPost } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import { cleanText } from "@/lib/text";

const CATEGORIES = ["All", "Attestation", "Apostille", "Translation", "Commercial"];

function postMatchesCategory(post: WPPost, cat: string): boolean {
  if (cat === "All") return true;
  const text = `${cleanText(post.title.rendered)} ${cleanText(post.excerpt.rendered)}`.toLowerCase();
  return text.includes(cat.toLowerCase());
}

export default function ServicesClient({ services }: { services: WPPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCat = postMatchesCategory(s, activeCategory);
      if (!matchesCat) return false;
      if (!q) return true;
      const text = `${cleanText(s.title.rendered)} ${cleanText(s.excerpt.rendered)}`.toLowerCase();
      return text.includes(q);
    });
  }, [services, query, activeCategory]);

  const total = services.length;
  const shown = filtered.length;

  return (
    <div>
      {/* Search + chips toolbar */}
      <div
        style={{
          borderBottom: "1px solid var(--color-rule)",
          padding: "20px 0 20px",
          marginBottom: "0",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Search input */}
        <div style={{ position: "relative", maxWidth: "400px" }}>
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
            Filter services
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or keyword…"
            autoComplete="off"
            style={{
              width: "100%",
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

        {/* Category chips */}
        <div
          role="group"
          aria-label="Filter by category"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {CATEGORIES.map((cat) => {
            const pressed = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "5px 14px",
                  border: `1px solid ${pressed ? "var(--color-bottle)" : "var(--color-rule)"}`,
                  borderRadius: "2px",
                  background: pressed ? "var(--color-bottle)" : "var(--color-paper)",
                  color: pressed ? "var(--color-paper)" : "var(--color-ink)",
                  fontSize: "0.8125rem",
                  fontFamily: "inherit",
                  fontWeight: pressed ? 600 : 400,
                  cursor: "pointer",
                  transition: "background 0.1s, border-color 0.1s, color 0.1s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
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
          marginBottom: "0",
        }}
      >
        {shown === total
          ? `Showing all ${total} service${total !== 1 ? "s" : ""}`
          : `${shown} of ${total} service${total !== 1 ? "s" : ""}`}
      </p>

      {/* Results */}
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
            No matching services found.
          </p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-ink)",
              opacity: 0.7,
              marginBottom: "24px",
            }}
          >
            Adjust your search or category filter, or contact us to discuss a
            bespoke clearing requirement.
          </p>
          <Link
            href="/quote"
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
            Request a quote
          </Link>
        </div>
      ) : (
        <div role="list" aria-label="Filtered services">
          {filtered.map((post, i) => (
            <div key={post.id} role="listitem">
              <ServiceCard post={post} priority={i === 0} />
            </div>
          ))}
        </div>
      )}

      <style>{`
        input[type="search"]::-webkit-search-cancel-button { cursor: pointer; }
        input[type="search"]:focus {
          outline: 2px solid var(--color-bottle);
          outline-offset: 1px;
          border-color: var(--color-bottle);
        }
        @media (prefers-reduced-motion: reduce) {
          button[aria-pressed] { transition: none; }
        }
      `}</style>
    </div>
  );
}
