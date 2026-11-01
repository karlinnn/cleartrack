"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { n: 1, title: "Submit your documents",  body: "Bring originals to our office or courier them to us with the reference form attached. We accept all standard document types and will advise on certified copies where originals cannot be released." },
  { n: 2, title: "We review them",          body: "A clearing officer verifies each document against the requirements of the destination authority. Any gaps are flagged to you immediately — no surprises later in the process." },
  { n: 3, title: "We clear and attest",     body: "We manage the submission, follow up with authorities, and collect the attested copies on your behalf. You can track progress in real time using your reference number." },
  { n: 4, title: "You collect them",         body: "Receive your completed documents in person or by registered courier, with a full audit trail and attestation cover sheet included." },
];

// How many px each step block is, approximately
const STEP_HEIGHT = 80;

export default function HowItWorksLine() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 fill fraction

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Attach scroll listener once visible
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    function onScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      // start filling when top of section enters bottom of viewport
      // finish when bottom of section leaves top of viewport
      const total = rect.height + viewH;
      const done  = viewH - rect.top;
      const frac  = Math.min(1, Math.max(0, done / total));
      setProgress(frac);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // How many steps are "lit" based on progress
  // Line spans across all steps; divide equally
  const litCount = Math.floor(progress * STEPS.length + 0.1);

  return (
    <div ref={sectionRef} className="hiwl-wrap">
      {/* The vertical drawing line */}
      <div className="hiwl-track" aria-hidden="true">
        <div
          ref={lineRef}
          className="hiwl-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Steps */}
      <ol className="hiwl-list" aria-label="How it works">
        {STEPS.map((step, i) => {
          const lit = i < litCount;
          return (
            <li key={step.n} className={`hiwl-item${lit ? " hiwl-item--lit" : ""}`}>
              <span className="hiwl-num" aria-hidden="true">{step.n}</span>
              <div className="hiwl-body">
                <h3 className="hiwl-title">{step.title}</h3>
                <p className="hiwl-detail">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <style>{`
        .hiwl-wrap {
          position: relative;
          display: flex;
          gap: 0;
          max-width: 640px;
        }

        /* ── Vertical line ── */
        .hiwl-track {
          position: absolute;
          left: 15px;
          top: 16px;
          bottom: 16px;
          width: 2px;
          background: rgba(201,208,202,0.2);
          border-radius: 1px;
          overflow: hidden;
        }
        .hiwl-fill {
          width: 100%;
          background: var(--color-brass);
          border-radius: 1px;
          transition: height 0.1s linear;
        }
        @media (prefers-reduced-motion: reduce) {
          .hiwl-fill { transition: none; height: 100% !important; }
        }

        /* ── Steps ── */
        .hiwl-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-left: 40px;
          width: 100%;
        }
        .hiwl-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 0 0 36px;
          position: relative;
        }
        .hiwl-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1.5px solid rgba(201,208,202,0.35);
          border-radius: 50%;
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: rgba(201,208,202,0.5);
          flex-shrink: 0;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .hiwl-item--lit .hiwl-num {
          color: var(--color-brass);
          border-color: var(--color-brass);
        }
        .hiwl-title {
          font-family: var(--font-serif);
          font-size: 1.0625rem;
          font-weight: 700;
          color: rgba(241,243,239,0.5);
          margin: 0 0 8px;
          transition: color 0.3s ease;
        }
        .hiwl-item--lit .hiwl-title {
          color: var(--color-paper);
        }
        .hiwl-detail {
          font-size: 0.9rem;
          color: var(--color-paper);
          opacity: 0.6;
          line-height: 1.7;
          max-width: 48ch;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .hiwl-num, .hiwl-title { transition: none; }
          .hiwl-num { color: var(--color-brass); border-color: var(--color-brass); }
          .hiwl-item--lit .hiwl-num { color: var(--color-brass); border-color: var(--color-brass); }
          .hiwl-title { color: var(--color-paper); }
        }
      `}</style>
    </div>
  );
}
