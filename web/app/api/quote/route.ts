import { NextRequest, NextResponse } from "next/server";

interface QuotePayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  company?: string; // honeypot
}

interface FieldErrors {
  [field: string]: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-(]{7,20}[\d)]$/;

function validate(body: QuotePayload): FieldErrors {
  const errors: FieldErrors = {};

  const name = (body.name ?? "").trim();
  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const email = (body.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = (body.phone ?? "").trim();
  if (phone.length > 0 && !PHONE_RE.test(phone)) {
    errors.phone = "Enter a valid phone number or leave blank.";
  }

  const service = (body.service ?? "").trim();
  if (!service) {
    errors.service = "Please select a service.";
  }

  const message = (body.message ?? "").trim();
  if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export async function POST(req: NextRequest) {
  let body: QuotePayload;

  try {
    body = (await req.json()) as QuotePayload;
  } catch {
    return NextResponse.json(
      { errors: { _form: "Invalid request body." } },
      { status: 400 }
    );
  }

  // Honeypot: if "company" is filled, silently succeed
  if ((body.company ?? "").trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Log and return success
  console.log("[quote]", {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: (body.phone ?? "").trim() || undefined,
    service: body.service.trim(),
    message: body.message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
