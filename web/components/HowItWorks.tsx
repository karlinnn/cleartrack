"use client";

import { useState, useId } from "react";
import Seal from "@/components/Seal";

const STEPS = [
  {
    n: 1,
    title: "Submit your documents",
    body: "Bring originals to our office or courier them to us with the reference form attached. We accept all standard document types and will advise on certified copies where originals cannot be released.",
  },
  {
    n: 2,
    title: "We review them",
    body: "A clearing officer verifies each document against the requirements of the destination authority. Any gaps are flagged to you immediately — no surprises later in the process.",
  },
  {
    n: 3,
    title: "We clear and attest",
    body: "We manage the submission, follow up with authorities, and collect the attested copies on your behalf. You can track progress in real time using your reference number.",
  },
  {
    n: 4,
    title: "You collect them",
    body: "Receive your completed documents in person or by registered courier, with a full audit trail and attestation cover sheet included.",
  },
];

export default function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [sealKeys, setSealKeys] = useState<Record<number, number>>({});
  const uid = useId();

  function toggle(n: number) {
    const isOpening = open !== n;
    setOpen(isOpening ? n : null);
    if (isOpening) {
      setVisited((prev) => new Set(prev).add(n));
      setSealKeys((prev) => ({ ...prev, [n]: (prev[n] ?? 0) + 1 }));
    }
  }

  const visitedCount = visited.size;

  return (
    <div className="hiw-wrap">
      <div
        className="hiw-progress"
        aria-live="polite"
        aria-atomic="true"
      >
        {visitedCount === 0
          ? "Click a step to explore how we work."
          : visitedCount === STEPS.length
          ? `${visitedCount} of ${STEPS.length} steps explored. You're ready to proceed.`
          : `${visitedCount} of ${STEPS.length} steps explored.`}
      </div>

      <ol className="hiw-list" aria-label="How it works">
        {STEPS.map((step) => {
          const isOpen = open === step.n;
          const isDone = visited.has(step.n);
          const contentId = `${uid}-step-${step.n}-content`;

          return (
            <li key={step.n} className={`hiw-item${isDone ? " is-visited" : ""}`}>
              <button
                type="button"
                className="hiw-row"
                onClick={() => toggle(step.n)}
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span className="hiw-num" aria-hidden="true">
                  {isDone ? "✓" : step.n}
                </span>
                <span className="hiw-title">{step.title}</span>
                <span className="hiw-chevron" aria-hidden="true">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && (
                <div id={contentId} className="hiw-body">
                  <div className="hiw-body-inner">
                    <p className="hiw-detail">{step.body}</p>
                  </div>
                  <div
                    className="hiw-seal"
                    key={sealKeys[step.n]}
                    aria-hidden="true"
                  >
                    <Seal
                      stamp
                      size={64}
                      text="ClearTrack · Step ·"
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <style>{`
        .hiw-wrap { max-width: 760px; }
        .hiw-progress {
          font-size: 0.8125rem;
          color: var(--color-paper);
          opacity: 0.6;
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }
        .hiw-list { list-style: none; padding: 0; margin: 0; }
        .hiw-item {
          border-bottom: 1px solid rgba(201, 208, 202, 0.18);
        }
        .hiw-item.is-visited .hiw-num {
          background: var(--color-brass);
          color: var(--color-ink);
        }
        .hiw-row {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 18px 0;
          text-align: left;
          color: var(--color-paper);
          font-family: inherit;
        }
        .hiw-row:hover .hiw-title { opacity: 1; }
        .hiw-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--color-brass);
          border-radius: 50%;
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-brass);
          flex-shrink: 0;
          transition: background 0.15s ease, color 0.15s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hiw-num { transition: none; }
        }
        .hiw-title {
          flex: 1;
          font-family: var(--font-serif);
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--color-paper);
          opacity: 0.85;
        }
        .hiw-chevron {
          font-size: 0.65rem;
          color: var(--color-brass);
          opacity: 0.8;
        }
        .hiw-body {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 0 0 20px 48px;
        }
        .hiw-body-inner { flex: 1; }
        .hiw-detail {
          font-size: 0.9375rem;
          color: var(--color-paper);
          opacity: 0.75;
          line-height: 1.7;
          max-width: 52ch;
          margin: 0;
        }
        .hiw-seal { flex-shrink: 0; }
      `}</style>
    </div>
  );
}
