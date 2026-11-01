"use client";

import { useState, useId } from "react";
import Seal from "@/components/Seal";

const MAX_STAMPS = 4;

const STATUS: Record<number, string> = {
  0: "Awaiting attestation.",
  1: "One seal applied. Progress is being made.",
  2: "Half attested. The officer is pleased.",
  3: "Nearly there. One more seal to go.",
  4: "Fully attested. Please stop, the paper has limits.",
};

interface StampPosition {
  x: number; // percent
  y: number; // percent
  r: number; // degrees tilt
  id: number;
}

export default function StampPad() {
  const [stamps, setStamps] = useState<StampPosition[]>([]);
  const [key, setKey] = useState(0);
  const uid = useId();

  const count = stamps.length;

  function addStamp() {
    if (count >= MAX_STAMPS) return;
    setStamps((prev) => [
      ...prev,
      {
        x: 18 + Math.random() * 60,
        y: 15 + Math.random() * 60,
        r: Math.random() * 24 - 12,
        id: Date.now(),
      },
    ]);
  }

  function reset() {
    setStamps([]);
    setKey((k) => k + 1);
  }

  return (
    <div className="sp-wrap" aria-label="Interactive stamp pad">
      {/* Paper document */}
      <div
        className="sp-paper"
        role="img"
        aria-label={`Document with ${count} of ${MAX_STAMPS} stamps applied`}
      >
        {/* Ruled lines */}
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="sp-rule" style={{ top: `${18 + i * 8}%` }} />
        ))}
        {/* Header bar */}
        <div className="sp-doc-header">
          <div className="sp-doc-title-bar" />
          <div className="sp-doc-subtitle-bar" />
        </div>

        {/* Stamps */}
        {stamps.map((s) => (
          <div
            key={`${uid}-${s.id}-${key}`}
            className="sp-stamp-pos"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              ["--r" as string]: `${s.r}deg`,
              animation: `stamp-mark 2s cubic-bezier(0.22,1,0.36,1) forwards`,
            }}
            aria-hidden="true"
          >
            <Seal size={72} text="CLEARED · " />
          </div>
        ))}
      </div>

      {/* Status */}
      <p className="sp-status" aria-live="polite" aria-atomic="true">
        {STATUS[count]}
      </p>

      {/* Controls */}
      <div className="sp-controls">
        <button
          type="button"
          className="sp-btn sp-btn--primary btn-press"
          onClick={addStamp}
          disabled={count >= MAX_STAMPS}
          aria-label="Stamp the document"
        >
          Stamp the document
        </button>
        {count > 0 && (
          <button
            type="button"
            className="sp-btn sp-btn--secondary"
            onClick={reset}
          >
            Start again
          </button>
        )}
      </div>

      <style>{`
        .sp-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          user-select: none;
        }
        .sp-paper {
          position: relative;
          width: 220px;
          height: 280px;
          background: var(--color-paper);
          border: 1px solid var(--color-rule);
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 3px 3px 0 var(--color-rule);
        }
        .sp-rule {
          position: absolute;
          left: 12%;
          right: 8%;
          height: 1px;
          background: var(--color-rule);
        }
        .sp-doc-header {
          position: absolute;
          top: 5%;
          left: 12%;
          right: 8%;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .sp-doc-title-bar {
          height: 10px;
          width: 60%;
          background: var(--color-rule);
          border-radius: 1px;
        }
        .sp-doc-subtitle-bar {
          height: 7px;
          width: 40%;
          background: var(--color-rule);
          border-radius: 1px;
          opacity: 0.6;
        }
        .sp-stamp-pos {
          position: absolute;
          transform: translate(-50%, -50%) rotate(var(--r, 0deg));
        }
        .sp-status {
          font-size: 0.875rem;
          color: var(--color-ink);
          opacity: 0.75;
          text-align: center;
          min-height: 1.4em;
          margin: 0;
        }
        .sp-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .sp-btn {
          padding: 9px 20px;
          border-radius: 2px;
          font-size: 0.875rem;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .sp-btn--primary {
          background: var(--color-bottle);
          color: var(--color-paper);
          border-color: var(--color-bottle);
        }
        .sp-btn--primary:hover:not(:disabled) { opacity: 0.9; }
        .sp-btn--primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .sp-btn--secondary {
          background: var(--color-paper);
          color: var(--color-ink);
          border-color: var(--color-rule);
        }
        .sp-btn--secondary:hover { border-color: var(--color-bottle); }
      `}</style>
    </div>
  );
}
