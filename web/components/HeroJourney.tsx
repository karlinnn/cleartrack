"use client";

import { useEffect, useRef, useState } from "react";

const STAMPS = [
  { label: "RECEIVED",  tilt: "-6deg",  status: "Received." },
  { label: "VERIFIED",  tilt: "5deg",   status: "Documents verified." },
  { label: "ATTESTED",  tilt: "-4deg",  status: "Attested by the authority." },
  { label: "DELIVERED", tilt: "7deg",   status: "Delivered to you." },
];

const DOC_DELAY    = 0;     // document slides in immediately
const STAMP_START  = 600;   // first stamp lands after doc is in (ms)
const STAMP_GAP    = 700;   // between stamps

export default function HeroJourney() {
  const [docIn,    setDocIn]    = useState(false);
  const [stampIdx, setStampIdx] = useState(-1);   // how many stamps have landed
  const [done,     setDone]     = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function run() {
    clearTimers();
    setDocIn(false);
    setStampIdx(-1);
    setDone(false);

    // Doc slides in
    timers.current.push(setTimeout(() => setDocIn(true), DOC_DELAY + 50));

    // Stamps land one by one
    STAMPS.forEach((_, i) => {
      timers.current.push(
        setTimeout(
          () => setStampIdx(i),
          STAMP_START + i * STAMP_GAP
        )
      );
    });

    // Mark done
    timers.current.push(
      setTimeout(
        () => setDone(true),
        STAMP_START + (STAMPS.length - 1) * STAMP_GAP + 400
      )
    );
  }

  useEffect(() => {
    run();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = stampIdx >= 0 ? STAMPS[stampIdx].status : "";

  return (
    <div className="hj-wrap" aria-label="Document clearing journey illustration">
      {/* Paper document */}
      <div className={`hj-doc${docIn ? " hj-doc--in" : ""}`} aria-hidden="true">
        {/* Header bar */}
        <div className="hj-doc-header" />
        {/* Ruled lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="hj-rule" style={{ width: i % 3 === 2 ? "55%" : "100%" }} />
        ))}
        {/* Stamps overlaid */}
        <div className="hj-stamps">
          {STAMPS.map((s, i) => (
            <div
              key={s.label}
              className={`hj-stamp${stampIdx >= i ? " hj-stamp--on" : ""}`}
              style={{ "--tilt": s.tilt } as React.CSSProperties}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="hj-progress"
        role="progressbar"
        aria-valuenow={stampIdx + 1}
        aria-valuemin={0}
        aria-valuemax={STAMPS.length}
        aria-label="Document progress"
      >
        {STAMPS.map((_, i) => (
          <div
            key={i}
            className={`hj-seg${stampIdx >= i ? " hj-seg--filled" : ""}`}
          />
        ))}
      </div>

      {/* Live status */}
      <p className="hj-status" aria-live="polite" aria-atomic="true">
        {status}
      </p>

      {/* Replay */}
      {done && (
        <button
          type="button"
          className="hj-replay btn-press"
          onClick={run}
          aria-label="Replay document journey animation"
        >
          Replay
        </button>
      )}

      <style>{`
        .hj-wrap {
          position: relative;
          width: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding-top: 8px;
        }

        /* ── Document ── */
        .hj-doc {
          width: 200px;
          background: #fff;
          border: 1px solid var(--color-rule);
          border-radius: 2px;
          padding: 20px 18px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          /* start off-screen right, invisible */
          transform: translateX(60px);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity  0.35s ease;
        }
        .hj-doc--in {
          transform: translateX(0);
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .hj-doc { transition: none; }
          .hj-doc--in { transform: translateX(0); opacity: 1; }
        }

        .hj-doc-header {
          height: 10px;
          background: var(--color-rule);
          border-radius: 1px;
          width: 60%;
          margin-bottom: 4px;
        }
        .hj-rule {
          height: 1px;
          background: var(--color-rule);
          border-radius: 1px;
        }

        /* ── Stamps ── */
        .hj-stamps {
          position: absolute;
          inset: 0;
          pointer-events: none;
          /* 2×2 grid inside doc */
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0;
          padding: 16px 12px;
        }
        .hj-stamp {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--color-brass);
          border: 1.5px solid var(--color-brass);
          border-radius: 50%;
          width: 56px;
          height: 56px;
          margin: auto;
          /* hidden until stamped */
          opacity: 0;
          transform: rotate(var(--tilt, 0deg)) scale(1.7);
          transition: none;
        }
        .hj-stamp--on {
          opacity: 1;
          transform: rotate(var(--tilt, 0deg)) scale(1);
          animation: hj-press 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes hj-press {
          0%   { transform: rotate(var(--tilt, 0deg)) scale(1.7); opacity: 0.8; }
          60%  { transform: rotate(var(--tilt, 0deg)) scale(0.94); opacity: 1; }
          100% { transform: rotate(var(--tilt, 0deg)) scale(1);   opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hj-stamp--on {
            animation: none;
            opacity: 1;
            transform: rotate(var(--tilt, 0deg)) scale(1);
          }
        }

        /* ── Progress ── */
        .hj-progress {
          display: flex;
          width: 200px;
          height: 4px;
          gap: 3px;
        }
        .hj-seg {
          flex: 1;
          background: var(--color-rule);
          border-radius: 1px;
          transition: background 0.2s ease;
        }
        .hj-seg--filled {
          background: var(--color-bottle);
        }
        @media (prefers-reduced-motion: reduce) {
          .hj-seg { transition: none; }
        }

        /* ── Status ── */
        .hj-status {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-ink);
          opacity: 0.7;
          text-align: center;
          min-height: 1.2em;
          letter-spacing: 0.02em;
        }

        /* ── Replay ── */
        .hj-replay {
          padding: 6px 18px;
          background: var(--color-paper);
          border: 1px solid var(--color-rule);
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          color: var(--color-ink);
          cursor: pointer;
        }
        .hj-replay:hover {
          border-color: var(--color-bottle);
          color: var(--color-bottle);
        }
      `}</style>
    </div>
  );
}
