import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a quote — ClearTrack",
  description:
    "Tell us about your document-clearing requirements and we will respond within one business day.",
};

/** Strip HTML tags from a string (runs on the server, no DOM needed). */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function QuotePage() {
  const services = await getServices();
  const serviceNames = services.map((s) => stripHtml(s.title.rendered));

  return (
    <main
      style={{
        flex: 1,
        maxWidth: "680px",
        width: "100%",
        margin: "0 auto",
        padding: "60px 24px 80px",
      }}
    >
      <header style={{ marginBottom: "36px" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            color: "var(--color-ink)",
            marginBottom: "12px",
          }}
        >
          Request a quote
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "var(--color-ink)",
            maxWidth: "60ch",
            lineHeight: 1.7,
          }}
        >
          Complete the form below and a ClearTrack adviser will respond within
          one business day.
        </p>
      </header>

      <QuoteForm services={serviceNames} />
    </main>
  );
}
