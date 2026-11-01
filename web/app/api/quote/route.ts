import { NextRequest, NextResponse } from "next/server";
import { validateAll } from "@/lib/validation";

function generateReference(): string {
  const year = new Date().getFullYear();
  const digits = String(Math.floor(Math.random() * 9000) + 1000);
  return `CT-${year}-${digits}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const payload = body as Record<string, string>;

  // Honeypot check
  if (payload.company) {
    // Silent reject — looks like success to the bot
    return NextResponse.json({ ok: true, reference: "CT-0000-0000" });
  }

  const errors = validateAll({
    service: payload.service ?? "",
    documentCategory: payload.documentCategory ?? "",
    destinationCountry: payload.destinationCountry ?? "",
    purpose: payload.purpose ?? "",
    documentCount: payload.documentCount ?? "",
    urgency: (payload.urgency as "standard" | "urgent" | "") ?? "",
    name: payload.name ?? "",
    email: payload.email ?? "",
    phone: payload.phone ?? "",
  });

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const reference = generateReference();

  console.log("[quote] new enquiry", {
    reference,
    service: payload.service,
    documentCategory: payload.documentCategory,
    destinationCountry: payload.destinationCountry,
    purpose: payload.purpose,
    documentCount: payload.documentCount,
    urgency: payload.urgency,
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "(not provided)",
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, reference }, { status: 200 });
}
