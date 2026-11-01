"use client";

import { useState } from "react";

const SERVICES = [
  { id: "attestation",  label: "Document attestation",          standard: [5, 7], urgent: [2, 3] },
  { id: "apostille",    label: "Apostille certification",        standard: [3, 5], urgent: [1, 2] },
  { id: "translation",  label: "Translation and notarisation",   standard: [2, 4], urgent: [1, 2] },
  { id: "commercial",   label: "Commercial document clearing",   standard: [7, 10], urgent: [4, 5] },
] as const;

type ServiceId = typeof SERVICES[number]["id"];
type Speed = "standard" | "urgent";

const BLOCKS = 10;

function daysToBlocks(days: number, maxDays: number): number {
  return Math.round((days / maxDays) * BLOCKS);
}

export default function TimeEstimator() {
  const [serviceId, setServiceId] = useState<ServiceId>("attestation");
  const [speed, setSpeed] = useState<Speed>("standard");

  const service = SERVICES.find((s) => s.id === serviceId)!;
  const range = speed === "standard" ? service.standard : service.urgent;
  const maxPossible = 10; // commercial standard max
  const filledMin = daysToBlocks(range[0], maxPossible);
  const filledMax = daysToBlocks(range[1], maxPossible);

  return (
    <div className="te-wrap">
      <div className="te-controls">
        <div className="te-field">
          <label className="te-label" htmlFor="te-service">Service</label>
          <select
            id="te-service"
            className="te-select"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value as ServiceId)}
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="te-field">
          <span className="te-label" id="te-speed-label">Processing</span>
          <div className="te-toggle" role="group" aria-labelledby="te-speed-label">
            {(["standard", "urgent"] as Speed[]).map((s) => (
              <button
                key={s}
                type="button"
                className={`te-toggle-btn${speed === s ? " is-active" : ""} btn-press`}
                onClick={() => setSpeed(s)}
                aria-pressed={speed === s}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Block meter */}
      <div
        className="te-meter"
        role="img"
        aria-label={`Estimated ${range[0]} to ${range[1]} working days`}
      >
        {Array.from({ length: BLOCKS }, (_, i) => {
          const filled = i < filledMax;
          const strong = i < filledMin;
          return (
            <div
              key={i}
              className={`te-block${strong ? " is-strong" : filled ? " is-filled" : ""}`}
            />
          );
        })}
      </div>

      <p className="te-estimate" aria-live="polite" aria-atomic="true">
        Usually <strong>{range[0]} to {range[1]}</strong> working days.
        {speed === "urgent" && (
          <span className="te-urgent-note"> Subject to availability.</span>
        )}
      </p>

      <style>{`
        .te-wrap { max-width: 480px; }
        .te-controls { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px; }
        .te-field { display: flex; flex-direction: column; gap: 6px; }
        .te-label {
          font-size: 0.78rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-ink);
          opacity: 0.65;
        }
        .te-select {
          padding: 8px 10px;
          border: 1px solid var(--color-rule);
          border-radius: 2px;
          background: var(--color-paper);
          color: var(--color-ink);
          font-size: 0.9375rem;
          font-family: inherit;
          cursor: pointer;
        }
        .te-select:focus { outline: 2px solid var(--color-bottle); outline-offset: 1px; }
        .te-toggle { display: flex; }
        .te-toggle-btn {
          padding: 7px 16px;
          background: var(--color-paper);
          color: var(--color-ink);
          border: 1px solid var(--color-rule);
          font-size: 0.875rem;
          font-family: inherit;
          cursor: pointer;
          border-radius: 0;
        }
        .te-toggle-btn:first-child { border-radius: 2px 0 0 2px; }
        .te-toggle-btn:last-child  { border-radius: 0 2px 2px 0; border-left: none; }
        .te-toggle-btn.is-active {
          background: var(--color-bottle);
          color: var(--color-paper);
          border-color: var(--color-bottle);
          z-index: 1;
          box-shadow: none;
        }
        .te-toggle-btn.is-active:active { transform: none; }

        .te-meter {
          display: flex;
          gap: 5px;
          margin-bottom: 14px;
        }
        .te-block {
          flex: 1;
          height: 28px;
          border-radius: 2px;
          background: var(--color-rule);
          transition: background 0.12s ease;
        }
        .te-block.is-filled { background: #2d6b5e; }
        .te-block.is-strong { background: var(--color-bottle); }
        @media (prefers-reduced-motion: reduce) {
          .te-block { transition: none; }
        }

        .te-estimate {
          font-size: 0.9375rem;
          color: var(--color-ink);
          margin: 0;
        }
        .te-urgent-note { opacity: 0.6; font-size: 0.85rem; }
      `}</style>
    </div>
  );
}
