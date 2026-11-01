"use client";

import { useState } from "react";
import { FAQ } from "@/data/site";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <dl style={{ margin: 0 }}>
      {FAQ.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} style={{ borderTop: "1px solid var(--color-rule)" }}>
            <dt>
              <button
                type="button"
                id={`${item.id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => toggle(item.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)" }}>
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--color-rule)",
                    borderRadius: "2px",
                    color: "var(--color-bottle)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    transition: "transform 0.15s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
            </dt>
            <dd
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-btn`}
              hidden={!isOpen}
              style={{ margin: 0, padding: isOpen ? "0 0 20px" : "0" }}
            >
              <p style={{ fontSize: "0.9375rem", color: "var(--color-ink)", opacity: 0.75, lineHeight: 1.75, maxWidth: "60ch" }}>
                {item.answer}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
