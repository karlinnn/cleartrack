import type { Metadata } from "next";
import { Suspense } from "react";
import { getServices } from "@/lib/api";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a quote — ClearTrack",
  description:
    "Submit your document clearing requirements. Receive a confirmed quote with a fixed fee and a reference number within one business day.",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function QuotePage() {
  const posts = await getServices();
  const services = posts.map((p) => ({
    slug: p.slug,
    title: stripHtml(p.title.rendered),
  }));

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "64px 24px 80px",
        width: "100%",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid var(--color-rule)",
          paddingBottom: "24px",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--color-bottle)",
            marginBottom: "8px",
          }}
        >
          Request a quote
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-ink)",
            lineHeight: 1.08,
            marginBottom: "12px",
          }}
        >
          Tell us about your documents
        </h1>
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "var(--color-ink)",
            opacity: 0.72,
            maxWidth: "56ch",
          }}
        >
          Four short steps. We will confirm requirements, timeline, and fees
          within one business day. No commitment required at this stage.
        </p>
      </div>

      {/* Suspense boundary for useSearchParams inside QuoteForm */}
      <Suspense fallback={null}>
        <QuoteForm services={services} />
      </Suspense>
    </div>
  );
}
