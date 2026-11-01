"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  FormEvent,
} from "react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { QuoteData } from "@/lib/validation";
import { useToast } from "@/components/Toast";

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const TOTAL_STEPS = 4;
const STORAGE_KEY = "ct_quote_draft";
const CATEGORIES = ["Personal", "Educational", "Commercial", "Legal"] as const;
const URGENCIES = [
  { value: "standard", label: "Standard" },
  { value: "urgent", label: "Urgent" },
] as const;
const STEP_LABELS = ["Service", "Documents", "Contact", "Review"] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function loadDraft(): QuoteData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteData) : {};
  } catch {
    return {};
  }
}

function saveDraft(data: QuoteData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function clearDraft(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Inline Seal (small, press-in animation)                             */
/* ------------------------------------------------------------------ */

function SuccessSeal() {
  return (
    <svg
      className="ct-seal-success"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="48" cy="48" r="46" stroke="var(--color-bottle)" strokeWidth="2" fill="none" />
      <circle cx="48" cy="48" r="38" stroke="var(--color-bottle)" strokeWidth="1" fill="none" />
      <text fontSize="7" fill="var(--color-bottle)" fontFamily="inherit">
        <textPath href="#ct-seal-path" startOffset="0%">
          CLEARTRACK · CONFIRMED · CLEARTRACK · CONFIRMED ·
        </textPath>
      </text>
      <defs>
        <path
          id="ct-seal-path"
          d="M48,48 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0"
        />
      </defs>
      {/* Compass star */}
      <g stroke="var(--color-bottle)" strokeWidth="1.5" fill="none">
        <line x1="48" y1="30" x2="48" y2="66" />
        <line x1="30" y1="48" x2="66" y2="48" />
        <line x1="36" y1="36" x2="60" y2="60" />
        <line x1="60" y1="36" x2="36" y2="60" />
      </g>
      <circle cx="48" cy="48" r="4" fill="var(--color-bottle)" />
      {/* Tick mark */}
      <polyline
        points="38,48 45,55 58,40"
        stroke="var(--color-bottle)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Field helpers                                                        */
/* ------------------------------------------------------------------ */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  const errId = error ? `${id}-err` : undefined;
  return (
    <div className="ct-field">
      <label className="ct-label" htmlFor={id}>
        {label}
      </label>
      {children(errId)}
      {error && (
        <p id={errId} className="ct-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Props                                                                */
/* ------------------------------------------------------------------ */

interface QuoteFormProps {
  services: string[];
  initialService?: string;
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

export default function QuoteForm({ services, initialService }: QuoteFormProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [success, setSuccess] = useState<{ reference: string } | null>(null);
  const { showToast } = useToast();

  const initialData: QuoteData = {
    ...loadDraft(),
    ...(initialService ? { service: initialService } : {}),
  };

  const { step, data, errors, setField, next, back, goTo } = useMultiStepForm({
    totalSteps: TOTAL_STEPS,
    initialData,
    onStepChange: () => {
      setTimeout(() => headingRef.current?.focus(), 50);
    },
  });

  /* Persist draft on every data change */
  useEffect(() => {
    saveDraft(data);
  }, [data]);

  /* ---------------------------------------------------------------- */
  /* Submit                                                             */
  /* ---------------------------------------------------------------- */

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setNetworkError("");
      setSubmitting(true);
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
          setNetworkError(
            json?.errors
              ? Object.values(json.errors as Record<string, string>).join(" ")
              : "Something went wrong. Please try again."
          );
        } else {
          clearDraft();
          setSuccess({ reference: json.reference as string });
        }
      } catch {
        setNetworkError(
          "Unable to reach the server. Please check your connection and try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [data]
  );

  /* ---------------------------------------------------------------- */
  /* Copy reference                                                     */
  /* ---------------------------------------------------------------- */

  const handleCopy = useCallback(() => {
    if (!success) return;
    navigator.clipboard.writeText(success.reference).then(() => {
      showToast("Copied");
    });
  }, [success, showToast]);

  /* ---------------------------------------------------------------- */
  /* Success screen                                                     */
  /* ---------------------------------------------------------------- */

  if (success) {
    return (
      <div className="ct-quote-success">
        <div className="ct-seal-wrap">
          <SuccessSeal />
        </div>
        <p className="ct-reference-label">Your reference</p>
        <p className="ct-reference-number">{success.reference}</p>
        <div className="ct-success-actions">
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={handleCopy}
          >
            Copy reference
          </button>
          <a
            href={`/track?ref=${encodeURIComponent(success.reference)}`}
            className="ct-btn ct-btn--primary"
          >
            Track this application
          </a>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Step indicator                                                     */
  /* ---------------------------------------------------------------- */

  const stepIndicator = (
    <nav className="ct-step-indicator" aria-label="Form progress">
      <ol className="ct-step-list">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <li
              key={n}
              className={`ct-step-item${active ? " is-active" : done ? " is-done" : ""}`}
            >
              <span className="ct-step-num" aria-hidden="true">
                {done ? "✓" : n}
              </span>
              <span className="ct-step-name">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  /* ---------------------------------------------------------------- */
  /* Step headings                                                      */
  /* ---------------------------------------------------------------- */

  const stepHeadings: Record<number, string> = {
    1: "Service details",
    2: "Document count and urgency",
    3: "Your contact information",
    4: "Review your request",
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                             */
  /* ---------------------------------------------------------------- */

  return (
    <div className="ct-quote-form-wrap">
      {stepIndicator}

      <form
        onSubmit={step === TOTAL_STEPS ? handleSubmit : (e) => e.preventDefault()}
        noValidate
        aria-label="Quote request form"
      >
        {/* Honeypot */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={(data.company as string) ?? ""}
            onChange={(e) => setField("company", e.target.value)}
          />
        </div>

        <h2
          className="ct-step-heading"
          ref={headingRef}
          tabIndex={-1}
        >
          {stepHeadings[step]}
        </h2>

        {/* ---- Step 1 ---- */}
        {step === 1 && (
          <div className="ct-step-fields">
            <Field id="service" label="Service" error={errors.service}>
              {(describedBy) => (
                <select
                  id="service"
                  name="service"
                  className="ct-select"
                  value={(data.service as string) ?? ""}
                  onChange={(e) => setField("service", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.service}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field id="category" label="Document category" error={errors.category}>
              {(describedBy) => (
                <select
                  id="category"
                  name="category"
                  className="ct-select"
                  value={(data.category as string) ?? ""}
                  onChange={(e) => setField("category", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.category}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field id="country" label="Country" error={errors.country}>
              {(describedBy) => (
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="ct-input"
                  placeholder="e.g. United Arab Emirates"
                  value={(data.country as string) ?? ""}
                  onChange={(e) => setField("country", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.country}
                />
              )}
            </Field>

            <Field id="purpose" label="Purpose" error={errors.purpose}>
              {(describedBy) => (
                <textarea
                  id="purpose"
                  name="purpose"
                  className="ct-textarea"
                  rows={3}
                  placeholder="Briefly describe why these documents are needed"
                  value={(data.purpose as string) ?? ""}
                  onChange={(e) => setField("purpose", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.purpose}
                />
              )}
            </Field>
          </div>
        )}

        {/* ---- Step 2 ---- */}
        {step === 2 && (
          <div className="ct-step-fields">
            <Field id="count" label="Number of documents" error={errors.count}>
              {(describedBy) => (
                <input
                  type="number"
                  id="count"
                  name="count"
                  className="ct-input"
                  min={1}
                  max={50}
                  placeholder="1–50"
                  value={(data.count as string) ?? ""}
                  onChange={(e) =>
                    setField("count", e.target.value === "" ? "" : Number(e.target.value))
                  }
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.count}
                />
              )}
            </Field>

            <Field id="urgency" label="Processing speed" error={errors.urgency}>
              {(describedBy) => (
                <div className="ct-radio-group" aria-describedby={describedBy}>
                  {URGENCIES.map(({ value, label }) => (
                    <label key={value} className="ct-radio-label">
                      <input
                        type="radio"
                        name="urgency"
                        value={value}
                        checked={data.urgency === value}
                        onChange={() => setField("urgency", value)}
                        className="ct-radio"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}
            </Field>
          </div>
        )}

        {/* ---- Step 3 ---- */}
        {step === 3 && (
          <div className="ct-step-fields">
            <p className="ct-notice">
              Do not include passport or ID numbers here. We will ask for documents securely after confirming.
            </p>

            <Field id="name" label="Full name" error={errors.name}>
              {(describedBy) => (
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="ct-input"
                  autoComplete="name"
                  value={(data.name as string) ?? ""}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.name}
                />
              )}
            </Field>

            <Field id="email" label="Email address" error={errors.email}>
              {(describedBy) => (
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="ct-input"
                  autoComplete="email"
                  value={(data.email as string) ?? ""}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.email}
                />
              )}
            </Field>

            <Field id="phone" label="Phone (optional)" error={errors.phone}>
              {(describedBy) => (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="ct-input"
                  autoComplete="tel"
                  value={(data.phone as string) ?? ""}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.phone}
                />
              )}
            </Field>
          </div>
        )}

        {/* ---- Step 4 – Review ---- */}
        {step === 4 && (
          <div className="ct-step-fields ct-review">
            <ReviewSection
              title="Service details"
              onEdit={() => goTo(1)}
              rows={[
                { label: "Service", value: data.service as string },
                { label: "Category", value: data.category as string },
                { label: "Country", value: data.country as string },
                { label: "Purpose", value: data.purpose as string },
              ]}
            />
            <ReviewSection
              title="Documents"
              onEdit={() => goTo(2)}
              rows={[
                { label: "Count", value: String(data.count ?? "") },
                { label: "Processing", value: data.urgency as string },
              ]}
            />
            <ReviewSection
              title="Contact"
              onEdit={() => goTo(3)}
              rows={[
                { label: "Name", value: data.name as string },
                { label: "Email", value: data.email as string },
                { label: "Phone", value: (data.phone as string) || "—" },
              ]}
            />

            {networkError && (
              <p className="ct-field-error" role="alert">
                {networkError}
              </p>
            )}
          </div>
        )}

        {/* ---- Navigation ---- */}
        <div className="ct-form-nav">
          {step > 1 && (
            <button
              type="button"
              className="ct-btn ct-btn--secondary"
              onClick={back}
              disabled={submitting}
            >
              Back
            </button>
          )}
          {step < TOTAL_STEPS && (
            <button
              type="button"
              className="ct-btn ct-btn--primary btn-press"
              onClick={next}
            >
              Next
            </button>
          )}
          {step === TOTAL_STEPS && (
            <button
              type="submit"
              className="ct-btn ct-btn--primary btn-press"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit request"}
            </button>
          )}
        </div>
      </form>

      <style>{`
        .ct-quote-form-wrap { max-width: 560px; margin: 0 auto; }

        /* Step indicator */
        .ct-step-list { display: flex; gap: 0; list-style: none; padding: 0; margin: 0 0 2rem; }
        .ct-step-item {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
          font-size: 0.75rem; color: var(--color-ink); opacity: 0.4;
          border-bottom: 2px solid var(--color-rule);
          padding-bottom: 0.5rem;
        }
        .ct-step-item.is-active { opacity: 1; border-color: var(--color-bottle); }
        .ct-step-item.is-done { opacity: 0.7; border-color: var(--color-brass); }
        .ct-step-num { font-weight: 600; font-size: 0.875rem; }

        /* Heading */
        .ct-step-heading { font-size: 1.25rem; margin: 0 0 1.5rem; outline: none; }

        /* Fields */
        .ct-step-fields { display: flex; flex-direction: column; gap: 1.25rem; }
        .ct-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .ct-label { font-size: 0.875rem; font-weight: 500; color: var(--color-ink); }
        .ct-input, .ct-select, .ct-textarea {
          padding: 0.6rem 0.75rem;
          border: 1px solid var(--color-rule);
          border-radius: 2px;
          background: var(--color-paper);
          color: var(--color-ink);
          font-size: 1rem;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          outline: 2px solid var(--color-bottle);
          outline-offset: 1px;
          border-color: var(--color-bottle);
        }
        .ct-input[aria-invalid="true"],
        .ct-select[aria-invalid="true"],
        .ct-textarea[aria-invalid="true"] {
          border-color: var(--color-brass);
        }
        .ct-textarea { resize: vertical; min-height: 80px; }
        .ct-field-error { font-size: 0.8rem; color: var(--color-brass); margin: 0; }

        /* Radio */
        .ct-radio-group { display: flex; gap: 1.5rem; }
        .ct-radio-label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; font-size: 0.9375rem; }
        .ct-radio { accent-color: var(--color-bottle); width: 1rem; height: 1rem; }

        /* Notice */
        .ct-notice {
          font-size: 0.85rem; padding: 0.75rem; border-left: 3px solid var(--color-brass);
          background: var(--color-paper); color: var(--color-ink); margin: 0;
          border-radius: 0 2px 2px 0;
        }

        /* Review */
        .ct-review-section { border: 1px solid var(--color-rule); border-radius: 2px; padding: 1rem; }
        .ct-review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .ct-review-title { font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .ct-edit-btn {
          background: none; border: 1px solid var(--color-rule); border-radius: 2px;
          padding: 0.2rem 0.6rem; font-size: 0.8rem; cursor: pointer; color: var(--color-ink);
        }
        .ct-edit-btn:hover { border-color: var(--color-bottle); color: var(--color-bottle); }
        .ct-review-row { display: flex; gap: 0.5rem; font-size: 0.875rem; margin-bottom: 0.3rem; }
        .ct-review-row-label { color: var(--color-ink); opacity: 0.6; min-width: 90px; }
        .ct-review-row-value { color: var(--color-ink); word-break: break-word; }

        /* Navigation */
        .ct-form-nav { display: flex; gap: 0.75rem; margin-top: 2rem; justify-content: flex-end; }
        .ct-btn {
          padding: 0.6rem 1.25rem; border-radius: 2px; font-size: 0.9375rem;
          font-family: inherit; cursor: pointer; border: 1px solid transparent;
        }
        .ct-btn--primary { background: var(--color-bottle); color: var(--color-paper); border-color: var(--color-bottle); }
        .ct-btn--primary:hover { opacity: 0.9; }
        .ct-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .ct-btn--secondary { background: var(--color-paper); color: var(--color-ink); border-color: var(--color-rule); }
        .ct-btn--secondary:hover { border-color: var(--color-bottle); color: var(--color-bottle); }
        .ct-btn--secondary:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Success */
        .ct-quote-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 1.25rem; padding: 2.5rem 1rem; text-align: center;
          max-width: 480px; margin: 0 auto;
        }
        .ct-seal-wrap {
          animation: ct-press-in 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes ct-press-in {
          0% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-seal-wrap { animation: none; }
        }
        .ct-reference-label { font-size: 0.8rem; opacity: 0.6; margin: 0; }
        .ct-reference-number {
          font-family: var(--font-serif, serif); font-size: 2rem;
          letter-spacing: 0.04em; margin: 0; color: var(--color-bottle);
        }
        .ct-success-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReviewSection                                                        */
/* ------------------------------------------------------------------ */

interface ReviewRow {
  label: string;
  value: string;
}

function ReviewSection({
  title,
  onEdit,
  rows,
}: {
  title: string;
  onEdit: () => void;
  rows: ReviewRow[];
}) {
  return (
    <div className="ct-review-section">
      <div className="ct-review-header">
        <span className="ct-review-title">{title}</span>
        <button type="button" className="ct-edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
      {rows.map(({ label, value }) => (
        <div key={label} className="ct-review-row">
          <span className="ct-review-row-label">{label}</span>
          <span className="ct-review-row-value">{value || "—"}</span>
        </div>
      ))}
    </div>
  );
}
