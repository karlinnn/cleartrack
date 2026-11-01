import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/api";
import ServicesClient from "@/components/ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Browse all document clearing services offered by ClearTrack: attestation, apostille, certified translation, and commercial clearing.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "56px 24px 80px",
        width: "100%",
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <ol
          style={{
            display: "flex",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "0.875rem",
            color: "var(--color-ink)",
            opacity: 0.6,
          }}
        >
          <li>
            <Link href="/" style={{ color: "var(--color-bottle)" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Services</li>
        </ol>
      </nav>

      {/* Heading */}
      <div
        style={{
          borderBottom: "1px solid var(--color-rule)",
          paddingBottom: "20px",
          marginBottom: "0",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-ink)",
            lineHeight: 1.08,
            marginBottom: "10px",
          }}
        >
          Services
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-ink)",
            opacity: 0.7,
            maxWidth: "58ch",
          }}
        >
          We handle every stage of document clearing, from initial review through
          to attested delivery. Select a service for full details.
        </p>
      </div>

      {/* Client wrapper: search, chips, filtered list */}
      <ServicesClient services={services} />
    </div>
  );
}
