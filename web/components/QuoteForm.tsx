"use client";

import { useState, useId } from "react";

interface FieldErrors {
  [field: string]: string;
}

interface QuoteFormProps {
  services: string[];
}

type FormState = "idle" | "loading" | "success" | "network-error";

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px 12px",
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "var(--color-ink)",
  backgroundColor: "#fff",
  border: "1px solid var(--color-rule)",
  borderRadius: "2px",
  outline: "none",
  lineHeight: 1.5,
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#9B1C1C",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "var(--color-ink)",
  marginBottom: "6px",
};

const errorTextStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  color: "#9B1C1C",
  marginTop: "4px",
};

const fieldWrapStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

export default function QuoteForm({ services }: QuoteFormProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const errId = (field: string) => `${uid}-${field}-err`;

  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setMessage("");
    setCompany("");
    setFieldErrors({});
    setFormState("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setFieldErrors({});

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message, company }),
      });

      if (res.ok) {
        setFormState("success");
        return;
      }

      if (res.status === 400) {
        const json = (await res.json()) as { errors: FieldErrors };
        setFieldErrors(json.errors ?? {});
        setFormState("idle");
        return;
      }

      setFormState("network-error");
    } catch {
      setFormState("network-error");
    }
  }

  if (formState === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: "40px 32px",
          border: "1px solid var(--color-rule)",
          borderRadius: "2px",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            color: "var(--color-bottle)",
            marginBottom: "8px",
          }}
        >
          Request received
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            color: "var(--color-ink)",
            marginBottom: "28px",
          }}
        >
          We'll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={resetForm}
          style={{
            padding: "10px 24px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-paper)",
            backgroundColor: "var(--color-bottle)",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: "#fff",
        border: "1px solid var(--color-rule)",
        borderRadius: "2px",
        padding: "32px",
      }}
    >
      {/* Honeypot — visually hidden */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {formState === "network-error" && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            marginBottom: "24px",
            border: "1px solid #9B1C1C",
            borderRadius: "2px",
            backgroundColor: "#FEF2F2",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            color: "#9B1C1C",
          }}
        >
          Something went wrong. Please check your connection and try again.
        </div>
      )}

      {/* Name */}
      <div style={fieldWrapStyle}>
        <label htmlFor={id("name")} style={labelStyle}>
          Full name
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={fieldErrors.name ? errId("name") : undefined}
          aria-invalid={!!fieldErrors.name}
          style={fieldErrors.name ? inputErrorStyle : inputStyle}
        />
        {fieldErrors.name && (
          <span id={errId("name")} role="alert" style={errorTextStyle}>
            {fieldErrors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div style={fieldWrapStyle}>
        <label htmlFor={id("email")} style={labelStyle}>
          Email address
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={fieldErrors.email ? errId("email") : undefined}
          aria-invalid={!!fieldErrors.email}
          style={fieldErrors.email ? inputErrorStyle : inputStyle}
        />
        {fieldErrors.email && (
          <span id={errId("email")} role="alert" style={errorTextStyle}>
            {fieldErrors.email}
          </span>
        )}
      </div>

      {/* Phone (optional) */}
      <div style={fieldWrapStyle}>
        <label htmlFor={id("phone")} style={labelStyle}>
          Phone number{" "}
          <span style={{ fontWeight: 400, color: "#6B7280" }}>(optional)</span>
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-describedby={fieldErrors.phone ? errId("phone") : undefined}
          aria-invalid={!!fieldErrors.phone}
          style={fieldErrors.phone ? inputErrorStyle : inputStyle}
        />
        {fieldErrors.phone && (
          <span id={errId("phone")} role="alert" style={errorTextStyle}>
            {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* Service */}
      <div style={fieldWrapStyle}>
        <label htmlFor={id("service")} style={labelStyle}>
          Service required
        </label>
        <select
          id={id("service")}
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-describedby={fieldErrors.service ? errId("service") : undefined}
          aria-invalid={!!fieldErrors.service}
          style={fieldErrors.service ? inputErrorStyle : inputStyle}
        >
          <option value="">— Select a service —</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {fieldErrors.service && (
          <span id={errId("service")} role="alert" style={errorTextStyle}>
            {fieldErrors.service}
          </span>
        )}
      </div>

      {/* Message */}
      <div style={fieldWrapStyle}>
        <label htmlFor={id("message")} style={labelStyle}>
          Message
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-describedby={fieldErrors.message ? errId("message") : undefined}
          aria-invalid={!!fieldErrors.message}
          style={{
            ...(fieldErrors.message ? inputErrorStyle : inputStyle),
            resize: "vertical",
          }}
        />
        {fieldErrors.message && (
          <span id={errId("message")} role="alert" style={errorTextStyle}>
            {fieldErrors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={formState === "loading"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 28px",
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "var(--color-paper)",
          backgroundColor: formState === "loading" ? "var(--color-rule)" : "var(--color-bottle)",
          border: "none",
          borderRadius: "2px",
          cursor: formState === "loading" ? "not-allowed" : "pointer",
          transition: "background-color 0.15s",
        }}
        aria-disabled={formState === "loading"}
      >
        {formState === "loading" ? (
          <>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                border: "2px solid var(--color-paper)",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "ct-spin 0.7s linear infinite",
              }}
            />
            Sending…
          </>
        ) : (
          "Submit request"
        )}
      </button>

      <style>{`
        @keyframes ct-spin {
          to { transform: rotate(360deg); }
        }
        button[type="submit"]:focus-visible {
          outline: 2px solid var(--color-brass);
          outline-offset: 2px;
        }
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 2px solid var(--color-brass);
          outline-offset: 0;
          border-color: var(--color-brass);
        }
      `}</style>
    </form>
  );
}
