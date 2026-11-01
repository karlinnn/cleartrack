"use client";

import { useState } from "react";

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
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("server");
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("We could not send your message. Please try again or email us directly.");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ padding: "32px", border: "1px solid var(--color-rule)", borderRadius: "2px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "12px" }}>
          Message received
        </h2>
        <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-ink)", opacity: 0.75 }}>
          Thank you. We will review your enquiry and respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="contact-form-row">
        <div>
          <label htmlFor="contact-name" style={S.label}>Full name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" style={S.input} className="ct-input" />
        </div>
        <div>
          <label htmlFor="contact-email" style={S.label}>Email address <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" style={S.input} className="ct-input" />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="contact-subject" style={S.label}>Subject <span aria-hidden="true">*</span></label>
        <input id="contact-subject" name="subject" type="text" required style={S.input} className="ct-input" />
      </div>
      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="contact-message" style={S.label}>Message <span aria-hidden="true">*</span></label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          style={{ ...S.input, display: "block", resize: "vertical", minHeight: "160px" }}
          className="ct-input"
        />
      </div>
      {status === "error" && (
        <p role="alert" style={{ fontSize: "0.875rem", color: "#b91c1c", marginBottom: "16px" }}>{errorMsg}</p>
      )}
      <button
        type="submit"
        id="contact-submit"
        disabled={status === "sending"}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          fontWeight: 500,
          color: "var(--color-paper)",
          backgroundColor: "var(--color-bottle)",
          border: "1.5px solid var(--color-bottle)",
          borderRadius: "2px",
          padding: "12px 28px",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          opacity: status === "sending" ? 0.65 : 1,
        }}
        className="ct-submit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <style>{`
        .ct-input:focus { border-color: var(--color-bottle); box-shadow: 0 0 0 2px rgba(31,77,67,0.15); }
        .ct-submit:hover:not(:disabled) { background-color: #163d35 !important; border-color: #163d35 !important; }
        @media (max-width: 540px) { .contact-form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}
