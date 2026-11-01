"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Seal from "@/components/Seal";
import { STAGE_LABELS, Application, Stage } from "@/data/applications";
import { useToast } from "@/components/Toast";

const DEMO_REFS = ["CT-2026-0042", "CT-2026-0043", "CT-2026-0044", "CT-2026-0045"];
const TOTAL_STAGES = 6;
const FILL_DELAY_MS = 150; // stagger between stage fills

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface TrackClientProps {
  initialRef?: string;
}

export default function TrackClient({ initialRef }: TrackClientProps) {
  const [input, setInput] = useState(initialRef ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [app, setApp] = useState<Application | null>(null);
  const [sealKey, setSealKey] = useState(0);
  // How many stages have "filled in" via the stagger animation
  const [filledUpTo, setFilledUpTo] = useState(-1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const hasAutoSubmitted = useRef(false);
  const fillTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { showToast } = useToast();

  // Clear stagger timers on unmount
  useEffect(() => {
    return () => { fillTimers.current.forEach(clearTimeout); };
  }, []);

  const runFillAnimation = (stage: number) => {
    // Cancel any in-progress animation
    fillTimers.current.forEach(clearTimeout);
    fillTimers.current = [];
    setFilledUpTo(-1);

    // Stages 0..stage fill one by one, 150ms apart
    for (let i = 0; i <= stage; i++) {
      const t = setTimeout(() => {
        setFilledUpTo(i);
      }, i * FILL_DELAY_MS);
      fillTimers.current.push(t);
    }
  };

  const lookup = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError("");
    setApp(null);
    setFilledUpTo(-1);
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(ref.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
      } else {
        const result = json as Application;
        setApp(result);
        setSealKey((k) => k + 1);
        setTimeout(() => resultsRef.current?.focus(), 50);
        // Kick off stagger animation after a brief pause so DOM is painted
        setTimeout(() => runFillAnimation(result.stage), 80);
      }
    } catch {
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      lookup(initialRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    lookup(input);
  };

  const handleCopyRef = async () => {
    if (!app) return;
    try {
      await navigator.clipboard.writeText(app.reference);
      showToast(`Reference ${app.reference} copied.`);
    } catch {
      showToast("Unable to copy — please copy the reference manually.");
    }
  };

  return (
    <div className="ctk-wrap">
      {/* Search form */}
      <form className="ctk-form" onSubmit={handleSubmit} noValidate>
        <div className="ctk-input-row">
          <label className="ctk-label" htmlFor="track-ref">
            Reference number
          </label>
          <div className="ctk-input-group">
            <input
              id="track-ref"
              type="text"
              className="ctk-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="CT-2026-0000"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="ctk-btn ctk-btn--primary btn-press"
              disabled={loading || !input.trim()}
            >
              {loading ? "Checking…" : "Track"}
            </button>
          </div>
        </div>

        <div className="ctk-demo-refs">
          <span className="ctk-demo-label">Demo data:</span>
          {DEMO_REFS.map((r) => (
            <button
              key={r}
              type="button"
              className="ctk-demo-ref"
              onClick={() => {
                setInput(r);
                lookup(r);
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </form>

      {/* Error */}
      {error && (
        <p className="ctk-error" role="alert">
          {error}
        </p>
      )}

      {/* Results */}
      {app && (
        <div
          className="ctk-results"
          ref={resultsRef}
          tabIndex={-1}
          aria-label="Application details"
        >
          {/* Header */}
          <div className="ctk-result-header">
            <div className="ctk-result-meta">
              <p className="ctk-result-ref">{app.reference}</p>
              <p className="ctk-result-name">{app.firstName} — {app.service}</p>
            </div>
            <div className="ctk-result-actions">
              {/* Copy reference */}
              <button
                type="button"
                className="ctk-btn ctk-btn--secondary btn-press"
                onClick={handleCopyRef}
                aria-label={`Copy reference ${app.reference} to clipboard`}
              >
                Copy reference
              </button>
              {/* Print */}
              <button
                type="button"
                className="ctk-btn ctk-btn--secondary ctk-print-btn"
                onClick={() => window.print()}
              >
                Download summary
              </button>
            </div>
          </div>

          {/* Extra docs banner */}
          {app.extraDocsRequired && (
            <div className="ctk-banner ctk-banner--warn" role="alert">
              <strong>Action required:</strong> Additional documents are needed. Check your email for the secure upload link.
            </div>
          )}

          {/* Timeline */}
          <div className="ctk-timeline" aria-label="Application stages">
            {(Array.from({ length: TOTAL_STAGES }, (_, i) => i) as Stage[]).map((i) => {
              const isFilled = i <= filledUpTo;
              const isDone = i < app.stage;
              const isCurrent = i === app.stage;
              const isFuture = i > app.stage;

              // A stage is visually "done" only once the fill animation has reached it
              const showDone = isDone && isFilled;
              const showCurrent = isCurrent && isFilled;

              return (
                <div
                  key={i}
                  className={`ctk-stage${showDone ? " is-done" : showCurrent ? " is-current" : isFuture || !isFilled ? " is-future" : ""}`}
                  style={{ ["--stage-delay" as string]: `${i * FILL_DELAY_MS}ms` }}
                >
                  <div className="ctk-stage-marker">
                    {showCurrent ? (
                      <span
                        key={sealKey}
                        className="ctk-stage-seal"
                        aria-label="Current stage"
                      >
                        <Seal
                          stamp
                          size={44}
                          text="Current · Stage ·"
                        />
                      </span>
                    ) : (
                      <span
                        className="ctk-stage-dot"
                        aria-hidden="true"
                      >
                        {showDone ? "✓" : ""}
                      </span>
                    )}
                    {i < TOTAL_STAGES - 1 && <span className="ctk-stage-line" aria-hidden="true" />}
                  </div>
                  <div className="ctk-stage-body">
                    <p className="ctk-stage-label">{STAGE_LABELS[i]}</p>
                    {/* History entry for this stage */}
                    {app.history
                      .filter((h) => h.stage === i)
                      .map((h, hi) => (
                        <p key={hi} className="ctk-stage-time">
                          {formatDateTime(h.timestamp)}
                          {h.note && <> — {h.note}</>}
                        </p>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Officer remark */}
          {app.officerRemark && (
            <div className="ctk-remark">
              <p className="ctk-remark-label">Officer note</p>
              <p className="ctk-remark-text">{app.officerRemark}</p>
            </div>
          )}

          {/* Estimated date */}
          <div className="ctk-estimated">
            <span className="ctk-estimated-label">Estimated completion</span>
            <span className="ctk-estimated-date">{formatDate(app.estimatedDate)}</span>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .ctk-wrap { max-width: 600px; margin: 0 auto; }

        /* Form */
        .ctk-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .ctk-input-row { display: flex; flex-direction: column; gap: 0.4rem; }
        .ctk-label { font-size: 0.875rem; font-weight: 500; color: var(--color-ink); }
        .ctk-input-group { display: flex; gap: 0; }
        .ctk-input {
          flex: 1; padding: 0.6rem 0.75rem; border: 1px solid var(--color-rule);
          border-right: none; border-radius: 2px 0 0 2px;
          background: var(--color-paper); color: var(--color-ink);
          font-size: 1rem; font-family: inherit;
        }
        .ctk-input:focus {
          outline: 2px solid var(--color-bottle); outline-offset: 1px; border-color: var(--color-bottle);
        }
        .ctk-btn {
          padding: 0.6rem 1.25rem; border-radius: 2px; font-size: 0.9375rem;
          font-family: inherit; cursor: pointer; border: 1px solid transparent; white-space: nowrap;
        }
        .ctk-btn--primary {
          background: var(--color-bottle); color: var(--color-paper);
          border-color: var(--color-bottle); border-radius: 0 2px 2px 0;
        }
        .ctk-btn--primary:hover:not(:disabled) { opacity: 0.9; }
        .ctk-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .ctk-btn--secondary {
          background: var(--color-paper); color: var(--color-ink);
          border-color: var(--color-rule); border-radius: 2px;
        }
        .ctk-btn--secondary:hover { border-color: var(--color-bottle); color: var(--color-bottle); }

        /* Demo refs */
        .ctk-demo-refs { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.8125rem; }
        .ctk-demo-label { opacity: 0.6; color: var(--color-ink); }
        .ctk-demo-ref {
          background: none; border: 1px solid var(--color-rule); border-radius: 2px;
          padding: 0.15rem 0.5rem; font-size: 0.8rem; font-family: monospace;
          cursor: pointer; color: var(--color-ink);
        }
        .ctk-demo-ref:hover { border-color: var(--color-bottle); color: var(--color-bottle); }

        /* Error */
        .ctk-error {
          padding: 0.75rem; border-left: 3px solid var(--color-brass);
          font-size: 0.9rem; color: var(--color-ink); background: var(--color-paper);
          border-radius: 0 2px 2px 0; margin-bottom: 1.5rem;
        }

        /* Results */
        .ctk-results { outline: none; }
        .ctk-result-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap;
        }
        .ctk-result-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .ctk-result-ref { font-family: monospace; font-size: 1.1rem; font-weight: 600; margin: 0; }
        .ctk-result-name { font-size: 0.875rem; opacity: 0.7; margin: 0.25rem 0 0; }

        /* Banner */
        .ctk-banner {
          padding: 0.75rem 1rem; border-radius: 2px; font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        .ctk-banner--warn {
          border: 1px solid var(--color-brass); background: var(--color-paper);
          border-left: 4px solid var(--color-brass);
        }

        /* Timeline */
        .ctk-timeline { display: flex; flex-direction: column; margin-bottom: 1.75rem; }
        .ctk-stage { display: flex; gap: 1rem; }
        .ctk-stage-marker {
          display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 44px;
        }
        .ctk-stage-dot {
          width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--color-rule);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; background: var(--color-paper); flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .ctk-stage.is-done .ctk-stage-dot {
          background: var(--color-bottle); border-color: var(--color-bottle);
          color: var(--color-paper); font-weight: 700;
        }
        .ctk-stage.is-future .ctk-stage-dot { opacity: 0.35; }
        .ctk-stage-seal {
          display: block;
          animation: ctk-press-in 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes ctk-press-in {
          0% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-stage-seal { animation: none; }
          .ctk-stage-dot { transition: none; }
        }
        .ctk-stage-line {
          flex: 1; width: 2px; background: var(--color-rule);
          min-height: 28px; margin: 2px 0;
          transition: background 0.2s ease;
        }
        .ctk-stage.is-done .ctk-stage-line { background: var(--color-bottle); }
        @media (prefers-reduced-motion: reduce) {
          .ctk-stage-line { transition: none; }
        }
        .ctk-stage-body { padding-top: 6px; padding-bottom: 1.25rem; flex: 1; min-width: 0; }
        .ctk-stage-label {
          font-size: 0.9375rem; font-weight: 600; margin: 0 0 0.2rem;
          color: var(--color-ink);
          transition: opacity 0.2s ease;
        }
        .ctk-stage.is-future .ctk-stage-label { opacity: 0.4; }
        .ctk-stage-time { font-size: 0.78rem; color: var(--color-ink); opacity: 0.6; margin: 0; line-height: 1.5; }

        /* Remark */
        .ctk-remark {
          border: 1px solid var(--color-rule); border-radius: 2px; padding: 1rem;
          margin-bottom: 1.25rem;
        }
        .ctk-remark-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.6; margin: 0 0 0.4rem; }
        .ctk-remark-text { font-size: 0.9rem; line-height: 1.6; margin: 0; }

        /* Estimated */
        .ctk-estimated {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--color-rule); padding-top: 1rem;
          font-size: 0.875rem;
        }
        .ctk-estimated-label { opacity: 0.6; }
        .ctk-estimated-date { font-weight: 600; }

        /* Print */
        @media print {
          nav, header, footer, .ctk-form, .ctk-demo-refs, .ctk-error, .ctk-print-btn, .ctk-result-actions { display: none !important; }
          .ctk-results { margin: 0; padding: 0; }
          .ctk-stage-seal { animation: none !important; }
          body { background: white; color: black; }
        }
      `}</style>
    </div>
  );
}
