import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a quote — ClearTrack",
  description:
    "Get a quote for document clearing, attestation and legalisation services. Fill in the form and we will respond within one business day.",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function QuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialService =
    typeof params.service === "string" ? params.service : undefined;

  const rawServices = await getServices();
  const services = rawServices.map((s: { title?: string; name?: string } | string) => {
    if (typeof s === "string") return stripHtml(s);
    const raw = s.title ?? s.name ?? "";
    return stripHtml(raw);
  }).filter(Boolean);

  return (
    <main className="ct-page">
      <div className="ct-container">
        <header className="ct-page-header">
          <h1 className="ct-page-title">Request a quote</h1>
          <p className="ct-page-intro">
            Tell us about your documents and we will send you a detailed quote
            within one business day. No commitment required.
          </p>
        </header>
        <QuoteForm services={services} initialService={initialService} />
      </div>
    </main>
  );
}
