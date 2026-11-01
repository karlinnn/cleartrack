import type { Metadata } from "next";
import TrackClient from "@/components/TrackClient";

export const metadata: Metadata = {
  title: "Track your application — ClearTrack",
  description:
    "Enter your reference number to see the live status of your document clearing application.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TrackPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const ref = typeof params.ref === "string" ? params.ref : undefined;

  return (
    <main className="ct-page">
      <div className="ct-container">
        <header className="ct-page-header">
          <h1 className="ct-page-title">Track your application</h1>
          <p className="ct-page-intro">
            Enter your reference number below to check the current status of your
            document clearing request.
          </p>
        </header>
        <TrackClient initialRef={ref} />
      </div>
    </main>
  );
}
