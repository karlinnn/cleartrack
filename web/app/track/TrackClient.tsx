"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Seal from "@/components/Seal";
import { APPLICATIONS, STAGES, type Application } from "@/data/applications";

/* ── helpers ────────────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

const S = {
  input: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--color-ink)",
    backgroundColor: "var(--color-paper)",
    border: "1px solid var(--color-rule)",
    borderRadius: "2px 0 0 2px",
    padding: "10px 14px",
    outline: "none",
    width: "220px",
  } as React.CSSProperties,
};

/* ── Timeline ───────────────────────────────────────────────────────────── */

function Timeline({ app }: { app: Application }) {
  const currentSealRef = useRef<SVGSVGElement>(null);

  return (
    <ol
      style={{ listStyle: "none", margin: "0 0 40px 0", padding: 0 }}
      aria-label="Application stages"
    >
      {STAGES.map((stage, i) => {
        const done = i < app.stageIndex;
        const active = i === app.stageIndex;
        const future = i > app.stageIndex;
        return (
          <li
            key={stage}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              paddingBottom: i < STAGES.length - 1 ? "0" : "0",
              position: "relative",
            }}
            aria-current={active ? "step" : undefined}
          >
            {/* Connector line */}
            {i < STAGES.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "19px",
                  top: "40px",
                  bottom: "0",
                  width: "1px",
                  backgroundColor: done
                    ? "var(--color-bottle)"
                    : "var(--color-rule)",
                  height: "32px",
                }}
                aria-hidden="true"
              />
            )}

            {/* Stage marker */}
            <div
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden="true"
            >
              {active ? (
                <Seal
                  stamp
                  size={40}
                  text=""
                  className="track-seal"
                />
              ) : done ? (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-bottle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5l4 4 8-8"
                      stroke="#F1F3EF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-rule)",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            </div>

            {/* Stage label */}
            <div style={{ paddingTop: "8px", paddingBottom: "32px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  fontWeight: active ? 600 : 400,
                  color: future
                    ? "var(--color-ink)"
                    : "var(--color-ink)",
                  opacity: future ? 0.4 : 1,
                  marginBottom: "2px",
                }}
              >
                {stage}
              </p>
              {active && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    color: "var(--color-bottle)",
                    fontWeight: 500,
                  }}
                >
                  Current stage
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Main client component ──────────────────────────────────────────────── */

const DEMO_REFS = APPLICATIONS.map((a) => a.reference);

export default function TrackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [refInput, setRefInput] = useState(searchParams.get("ref") ?? "");
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState("");

  async function lookup(ref: string) {
    if (!ref.trim()) return;
    setLoading(true);
    setNotFound(false);
    setApp(null);
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(ref.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setNotFound(true);
        setNotFoundMsg(json.error ?? "Reference not found.");
      } else {
        setApp(json as Application);
      }
    } catch {
      setNotFound(true);
      setNotFoundMsg("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Auto-lookup on mount if ?ref= present
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) lookup(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.replace(`/track?ref=${encodeURIComponent(refInput.trim())}`, { scroll: false });
    lookup(refInput);
  }

  return (
    <div>
      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        aria-label="Track your application"
        style={{ marginBottom: "40px" }}
      >
        <label
          htmlFor="track-ref-input"
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            color: "var(--color-ink)",
            marginBottom: "8px",
          }}
        >
          Reference number
        </label>
        <div style={{ display: "flex" }}>
          <input
            id="track-ref-input"
            type="text"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            placeholder="CT-2026-0042"
            autoComplete="off"
            style={S.input}
            className="track-input"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--color-paper)",
              backgroundColor: "var(--color-bottle)",
              border: "1.5px solid var(--color-bottle)",
              borderRadius: "0 2px 2px 0",
              padding: "10px 22px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.65 : 1,
            }}
            className="track-btn"
          >
            {loading ? "Looking up…" : "Track"}
          </button>
        </div>
      </form>

      {/* Demo references note */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-ink)",
          opacity: 0.5,
          marginBottom: app || notFound ? "40px" : "0",
          lineHeight: 1.6,
        }}
      >
        Demo data — try:{" "}
        {DEMO_REFS.map((ref, i) => (
          <span key={ref}>
            <button
              type="button"
              onClick={() => {
                setRefInput(ref);
                lookup(ref);
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                color: "var(--color-bottle)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {ref}
            </button>
            {i < DEMO_REFS.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>

      {/* Not found */}
      {notFound && (
        <div
          role="alert"
          style={{
            border: "1px solid var(--color-rule)",
            borderRadius: "2px",
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              color: "var(--color-ink)",
              lineHeight: 1.65,
            }}
          >
            {notFoundMsg}
          </p>
        </div>
      )}

      {/* Result */}
      {app && (
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
              borderBottom: "1px solid var(--color-rule)",
              paddingBottom: "24px",
              marginBottom: "32px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.25rem, 3vw, 1.625rem)",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  marginBottom: "4px",
                }}
              >
                {app.reference}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--color-ink)",
                  opacity: 0.6,
                }}
              >
                {app.firstName} · {app.service}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-ink)",
                  opacity: 0.45,
                  marginBottom: "2px",
                }}
              >
                Estimated completion
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                }}
              >
                {app.estimatedDate}
              </p>
            </div>
          </div>

          {/* Additional documents flag */}
          {app.additionalDocumentsRequired && (
            <div
              style={{
                border: "1px solid var(--color-brass)",
                borderRadius: "2px",
                padding: "14px 18px",
                marginBottom: "28px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
              role="alert"
            >
              <span
                style={{ color: "var(--color-brass)", fontSize: "1.125rem", lineHeight: 1 }}
                aria-hidden="true"
              >
                ⚠
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.6,
                }}
              >
                <strong>Additional documents required.</strong> Please contact us
                to confirm what is needed before we can proceed.
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "48px",
              alignItems: "start",
            }}
            className="track-grid"
          >
            {/* Timeline */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  marginBottom: "24px",
                }}
              >
                Progress
              </h2>
              <Timeline app={app} />
            </div>

            {/* Sidebar — history + remarks */}
            <aside>
              {/* Officer remark */}
              <div
                style={{
                  borderLeft: "2px solid var(--color-brass)",
                  paddingLeft: "16px",
                  marginBottom: "28px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    color: "var(--color-ink)",
                    opacity: 0.45,
                    marginBottom: "6px",
                  }}
                >
                  Officer remark
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.9375rem",
                    color: "var(--color-ink)",
                    lineHeight: 1.65,
                  }}
                >
                  {app.officerRemark}
                </p>
              </div>

              {/* History log */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    color: "var(--color-ink)",
                    opacity: 0.45,
                    marginBottom: "12px",
                  }}
                >
                  Activity log
                </h3>
                <ol
                  style={{ listStyle: "none", margin: 0, padding: 0 }}
                  aria-label="Activity history"
                >
                  {[...app.history].reverse().map((entry, i) => (
                    <li
                      key={i}
                      style={{
                        borderTop: "1px solid var(--color-rule)",
                        padding: "10px 0",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          color: "var(--color-ink)",
                          opacity: 0.45,
                          marginBottom: "3px",
                        }}
                      >
                        {formatDate(entry.date)}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.875rem",
                          color: "var(--color-ink)",
                          lineHeight: 1.55,
                        }}
                      >
                        {entry.note}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>

          {/* Download / print */}
          <div
            style={{
              borderTop: "1px solid var(--color-rule)",
              marginTop: "8px",
              paddingTop: "24px",
            }}
          >
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-ink)",
                backgroundColor: "transparent",
                border: "1px solid var(--color-rule)",
                borderRadius: "2px",
                padding: "9px 20px",
                cursor: "pointer",
              }}
              className="print-btn"
            >
              Download summary
            </button>
          </div>
        </div>
      )}

      <style>{`
        .track-input:focus { border-color: var(--color-bottle); box-shadow: 0 0 0 2px rgba(31,77,67,0.14); }
        .track-btn:hover:not(:disabled) { background-color: #163d35 !important; border-color: #163d35 !important; }
        .print-btn:hover { background-color: #e8ebe7; }
        @media (max-width: 720px) { .track-grid { grid-template-columns: 1fr !important; } }
        @media print {
          header, footer, form, .print-btn, p[style*="Demo data"] { display: none !important; }
          body { color: #000; background: #fff; }
          .track-grid { display: block !important; }
        }
      `}</style>
    </div>
  );
}
