import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { getServices } from "@/lib/api";
import { cleanText } from "@/lib/text";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us which document service you need and we will send you a quote.",
};

interface PageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function QuotePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const posts = (await getServices()).filter((p) => p.slug !== "hello-world");

  const titles = posts.map((p) => cleanText(p.title.rendered));

  // ?service=<slug> preselects that service by its title
  const match = posts.find((p) => p.slug === sp.service);
  const initialService = match ? cleanText(match.title.rendered) : undefined;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-4xl text-[#10231F]">Request a quote</h1>
      <p className="mt-3 mb-10 max-w-prose text-[#10231F]">
        Tell us what you need cleared. We reply within one working day.
      </p>
      <QuoteForm services={titles} initialService={initialService} />
    </main>
  );
}