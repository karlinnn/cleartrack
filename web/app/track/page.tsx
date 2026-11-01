import type { Metadata } from "next";
import { Suspense } from "react";
import TrackClient from "./TrackClient";

export const metadata: Metadata = {
  title: "Track your application — ClearTrack",
  description:
    "Enter your ClearTrack reference number to see the current stage, activity log, officer remarks, and estimated completion date.",
};

export default function TrackPage() {
  return (
    <div
      style={{
        maxWidth: "1000px",
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
          Application tracking
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
          Track your application
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
          Enter the reference number from your confirmation email to see the
          current status of your file.
        </p>
      </div>

      <Suspense fallback={null}>
        <TrackClient />
      </Suspense>
    </div>
  );
}
