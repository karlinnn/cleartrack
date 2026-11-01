"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Seal from "@/components/Seal";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  type FieldErrors,
} from "@/lib/validation";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface QuoteFormData extends Record<string, unknown> {
  service: string;
  documentCategory: string;
  destinationCountry: string;
  purpose: string;
  documentCount: string;
  urgency: "standard" | "urgent" | "";
  name: string;
  email: string;
  phone: string;
  company: string; // honeypot
}

const INITIAL: QuoteFormData = {
  service: "",
  documentCategory: "",
  destinationCountry: "",
  purpose: "",
  documentCount: "",
  urgency: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

const DOC_CATEGORIES = [
  "Personal (birth/marriage/death certificate)",
  "Educational (degree, transcript, diploma)",
  "Commercial (trade licence, company registration)",
  "Legal (power of attorney, affidavit, court order)",
  "Medical",
  "Other",
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const S = {
  label: {
    display: "block",
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    color: "var(--color-ink)",
    marginBottom: "6px",
  } as React.CSSProperties,
  input: {
    display: "block",
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--color-ink)",
    backgroundColor: "var(--color-paper)",
    border: "1px solid var(--color-rule)",
    borderRadius: "2px",
    padding: "10px 12px",
    outline: "none",
  } as React.CSSProperties,
  select: {
    display: "block",
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--color-ink)",
    backgroundColor: "var(--color-paper)",
    border: "1px solid var(--color-rule)",
    borderRadius: "2px",
    padding: "10px 12px",
    outline: "none",
    appearance: "none" as const,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2310231F' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "36px",
  } as React.CSSProperties,
  error: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.8125rem",
    color: "#b91c1c",
    marginTop: "4px",
  } as React.CSSProperties,
  field: { marginBottom: "20px" } as React.CSSProperties,
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" style={S.error}>
      {msg}
    </p>
  );
}

/* ── Step indicator ─────────────────────────────────────────────────────── */

const STEP_LABELS = ["Service & document", "Quantity & urgency", "Your details", "Review"];

function StepIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Form progress" style={{ marginBottom: "40px" }}>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          gap: "0",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li
              key={label}
              style={{
                flex: 1,
                borderBottom: active
                  ? "2px solid var(--color-bottle)"
                  : done
                  ? "2px solid var(--color-brass)"
                  : "2px solid transparent",
                paddingBottom: "12px",
                paddingRight: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: active
                    ? "var(--color-bottle)"
                    : done
                    ? "var(--color-brass)"
                    : "var(--color-ink)",
                  opacity: done || active ? 1 : 0.45,
                  display: "block",
                }}
                aria-current={active ? "step" : undefined}
              >
                {i + 1}. {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Confirmation screen ─────────────────────────────────────────────────── */

function Confirmation({
  reference,
  onReset,
}: {
  reference: string;
  onReset: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  function copyRef() {
    navigator.clipboard.writeText(reference).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ textAlign: "center", padding: "40px 0 20px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
        <Seal stamp size={140} text="ClearTrack · Confirmed ·" />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          marginBottom: "8px",
        }}
      >
        Enquiry received
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          color: "var(--color-ink)",
          opacity: 0.7,
          marginBottom: "28px",
          maxWidth: "48ch",
          margin: "0 auto 28px",
          lineHeight: 1.65,
        }}
      >
        We will review your details and respond within one business day. Keep your
        reference number — you can track progress at any time.
      </p>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 700,
          color: "var(--color-bottle)",
          letterSpacing: "0.04em",
          marginBottom: "16px",
        }}
        aria-label={`Your reference number is ${reference}`}
      >
        {reference}
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}
      >
        <button
          type="button"
          onClick={copyRef}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-bottle)",
            backgroundColor: "var(--color-paper)",
            border: "1px solid var(--color-rule)",
            borderRadius: "2px",
            padding: "9px 20px",
            cursor: "pointer",
          }}
          className="copy-btn"
        >
          {copied ? "Copied \u2713" : "Copy reference"}
        </button>
        <a
          href={`/track?ref=${encodeURIComponent(reference)}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-paper)",
            backgroundColor: "var(--color-bottle)",
            border: "1px solid var(--color-bottle)",
            borderRadius: "2px",
            padding: "9px 20px",
            textDecoration: "none",
          }}
          className="track-btn"
        >
          Track application
        </a>
      </div>
      <button
        type="button"
        onClick={onReset}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-ink)",
          opacity: 0.5,
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        Submit another enquiry
      </button>
      <style>{`
        .copy-btn:hover { background-color: #e8ebe7 !important; }
        .track-btn:hover { background-color: #163d35 !important; border-color: #163d35 !important; }
      `}</style>
    </div>
  );
}

/* ── Main form ──────────────────────────────────────────────────────────── */

interface QuoteFormProps {
  services: Array<{ slug: string; title: string }>;
  preselectedService?: string;
}

export default function QuoteForm({ services, preselectedService }: QuoteFormProps) {
  const params = useSearchParams();
  const serviceParam = preselectedService ?? params.get("service") ?? "";

  const initial = { ...INITIAL, service: serviceParam || INITIAL.service };
  const { step, data, update, next, back, goTo, reset, clearDraft } =
    useMultiStepForm<QuoteFormData>(initial, 4);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  // Focus step heading when step changes
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // Preselect service from URL on mount
  useEffect(() => {
    if (serviceParam && !data.service) {
      update({ service: serviceParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validate(s: number): boolean {
    let e: FieldErrors = {};
    if (s === 0) e = validateStep1(data);
    if (s === 1) e = validateStep2(data);
    if (s === 2) e = validateStep3(data);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate(step)) next();
  }

  async function handleSubmit() {
    if (!validate(2)) {
      goTo(2);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setSubmitError("Please correct the errors above.");
        setSubmitting(false);
        return;
      }
      clearDraft();
      setReference(json.reference);
    } catch {
      setSubmitError("A network error occurred. Please try again.");
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <Confirmation
        reference={reference}
        onReset={() => {
          setReference(null);
          reset(initial);
        }}
      />
    );
  }

  const stepHeadings = [
    "Step 1 — Service and document",
    "Step 2 — Quantity and urgency",
    "Step 3 — Your details",
    "Step 4 — Review your request",
  ];

  return (
    <div>
      <StepIndicator current={step} />

      {/* Visually hidden heading per step — receives focus for screen readers */}
      <h2
        ref={headingRef}
        tabIndex={-1}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "var(--color-ink)",
          marginBottom: "28px",
          outline: "none",
        }}
      >
        {stepHeadings[step]}
      </h2>

      {/* ── STEP 1 ─────────────────────────────────── */}
      {step === 0 && (
        <div>
          <div style={S.field}>
            <label htmlFor="qs-service" style={S.label}>
              Service <span aria-hidden="true">*</span>
            </label>
            <select
              id="qs-service"
              value={data.service}
              onChange={(e) => update({ service: e.target.value })}
              style={S.select}
              className="ct-input"
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <FieldError msg={errors.service} />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-doccat" style={S.label}>
              Document category <span aria-hidden="true">*</span>
            </label>
            <select
              id="qs-doccat"
              value={data.documentCategory}
              onChange={(e) => update({ documentCategory: e.target.value })}
              style={S.select}
              className="ct-input"
            >
              <option value="">Select a category…</option>
              {DOC_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <FieldError msg={errors.documentCategory} />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-country" style={S.label}>
              Destination country <span aria-hidden="true">*</span>
            </label>
            <input
              id="qs-country"
              type="text"
              value={data.destinationCountry}
              onChange={(e) => update({ destinationCountry: e.target.value })}
              placeholder="e.g. United Kingdom"
              style={S.input}
              className="ct-input"
            />
            <FieldError msg={errors.destinationCountry} />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-purpose" style={S.label}>
              Purpose <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="qs-purpose"
              rows={3}
              value={data.purpose}
              onChange={(e) => update({ purpose: e.target.value })}
              placeholder="e.g. Visa application for dependent spouse"
              style={{ ...S.input, resize: "vertical" }}
              className="ct-input"
            />
            <FieldError msg={errors.purpose} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              color: "var(--color-ink)",
              opacity: 0.55,
              borderLeft: "2px solid var(--color-rule)",
              paddingLeft: "12px",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            Do not include passport or ID numbers here. We will ask for documents
            securely after confirming.
          </p>
        </div>
      )}

      {/* ── STEP 2 ─────────────────────────────────── */}
      {step === 1 && (
        <div>
          <div style={S.field}>
            <label htmlFor="qs-count" style={S.label}>
              Number of documents <span aria-hidden="true">*</span>
            </label>
            <input
              id="qs-count"
              type="number"
              min={1}
              max={999}
              value={data.documentCount}
              onChange={(e) => update({ documentCount: e.target.value })}
              style={{ ...S.input, width: "140px" }}
              className="ct-input"
            />
            <FieldError msg={errors.documentCount} />
          </div>

          <fieldset
            style={{
              border: "none",
              padding: 0,
              margin: "0 0 24px 0",
            }}
          >
            <legend style={{ ...S.label, marginBottom: "12px" }}>
              Processing speed <span aria-hidden="true">*</span>
            </legend>
            {(
              [
                {
                  value: "standard",
                  label: "Standard",
                  sub: "5–7 working days",
                },
                {
                  value: "urgent",
                  label: "Urgent",
                  sub: "2–3 working days, subject to authority availability",
                },
              ] as const
            ).map(({ value, label, sub }) => (
              <label
                key={value}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px 16px",
                  border: `1px solid ${data.urgency === value ? "var(--color-bottle)" : "var(--color-rule)"}`,
                  borderRadius: "2px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    data.urgency === value
                      ? "rgba(31,77,67,0.04)"
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={value}
                  checked={data.urgency === value}
                  onChange={() => update({ urgency: value })}
                  style={{ marginTop: "2px", accentColor: "var(--color-bottle)" }}
                />
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      color: "var(--color-ink)",
                      opacity: 0.6,
                    }}
                  >
                    {sub}
                  </span>
                </span>
              </label>
            ))}
            <FieldError msg={errors.urgency} />
          </fieldset>
        </div>
      )}

      {/* ── STEP 3 ─────────────────────────────────── */}
      {step === 2 && (
        <div>
          {/* Honeypot — hidden from real users */}
          <div style={{ position: "absolute", left: "-9999px", overflow: "hidden" }} aria-hidden="true">
            <label htmlFor="qs-company">Company</label>
            <input
              id="qs-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.company}
              onChange={(e) => update({ company: e.target.value })}
            />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-name" style={S.label}>
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="qs-name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => update({ name: e.target.value })}
              style={S.input}
              className="ct-input"
            />
            <FieldError msg={errors.name} />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-email" style={S.label}>
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id="qs-email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              style={S.input}
              className="ct-input"
            />
            <FieldError msg={errors.email} />
          </div>

          <div style={S.field}>
            <label htmlFor="qs-phone" style={S.label}>
              Phone number <span style={{ opacity: 0.5 }}>(optional)</span>
            </label>
            <input
              id="qs-phone"
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="+971 50 000 0000"
              style={S.input}
              className="ct-input"
            />
            <FieldError msg={errors.phone} />
          </div>
        </div>
      )}

      {/* ── STEP 4 — Review ────────────────────────── */}
      {step === 3 && (
        <div>
          {[
            {
              stepIndex: 0,
              heading: "Service and document",
              rows: [
                {
                  label: "Service",
                  value:
                    services.find((s) => s.slug === data.service)?.title ||
                    data.service ||
                    "—",
                },
                { label: "Category", value: data.documentCategory || "—" },
                { label: "Destination", value: data.destinationCountry || "—" },
                { label: "Purpose", value: data.purpose || "—" },
              ],
            },
            {
              stepIndex: 1,
              heading: "Quantity and urgency",
              rows: [
                { label: "Documents", value: data.documentCount || "—" },
                { label: "Speed", value: data.urgency || "—" },
              ],
            },
            {
              stepIndex: 2,
              heading: "Your details",
              rows: [
                { label: "Name", value: data.name || "—" },
                { label: "Email", value: data.email || "—" },
                { label: "Phone", value: data.phone || "(not provided)" },
              ],
            },
          ].map(({ stepIndex, heading, rows }) => (
            <div
              key={heading}
              style={{
                border: "1px solid var(--color-rule)",
                borderRadius: "2px",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--color-rule)",
                  backgroundColor: "rgba(201,208,202,0.18)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                  }}
                >
                  {heading}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    goTo(stepIndex);
                  }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    color: "var(--color-bottle)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px 0",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Edit
                </button>
              </div>
              <dl style={{ margin: 0, padding: "12px 16px" }}>
                {rows.map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "140px 1fr",
                      gap: "8px",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(201,208,202,0.4)",
                    }}
                    className="review-row"
                  >
                    <dt
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "var(--color-ink)",
                        opacity: 0.55,
                      }}
                    >
                      {label}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        color: "var(--color-ink)",
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {submitError && (
            <p role="alert" style={{ ...S.error, marginBottom: "16px" }}>
              {submitError}
            </p>
          )}
        </div>
      )}

      {/* ── Navigation ─────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
          paddingTop: "24px",
          borderTop: "1px solid var(--color-rule)",
        }}
      >
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            color: "var(--color-ink)",
            background: "none",
            border: "1px solid var(--color-rule)",
            borderRadius: "2px",
            padding: "10px 22px",
            cursor: step === 0 ? "not-allowed" : "pointer",
            opacity: step === 0 ? 0.3 : 1,
          }}
          className="nav-back"
        >
          Back
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--color-paper)",
              backgroundColor: "var(--color-bottle)",
              border: "1.5px solid var(--color-bottle)",
              borderRadius: "2px",
              padding: "10px 28px",
              cursor: "pointer",
            }}
            className="nav-next"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--color-paper)",
              backgroundColor: "var(--color-bottle)",
              border: "1.5px solid var(--color-bottle)",
              borderRadius: "2px",
              padding: "10px 28px",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.65 : 1,
            }}
            className="nav-submit"
          >
            {submitting ? "Submitting…" : "Submit enquiry"}
          </button>
        )}
      </div>

      <style>{`
        .ct-input:focus { border-color: var(--color-bottle); box-shadow: 0 0 0 2px rgba(31,77,67,0.14); }
        .nav-next:hover, .nav-submit:hover:not(:disabled) { background-color: #163d35 !important; border-color: #163d35 !important; }
        .nav-back:hover:not(:disabled) { background-color: #e8ebe7; }
        @media (max-width: 500px) {
          .review-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
