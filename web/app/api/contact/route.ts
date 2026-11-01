import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, subject, message } = body as ContactPayload;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 422 });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
  }
  if (!subject?.trim()) {
    return NextResponse.json({ error: "Subject is required." }, { status: 422 });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });
  }

  // In production, send an email here (e.g. via Resend, SendGrid, or SMTP).
  // For now we log to server console and acknowledge receipt.
  console.log("[contact] enquiry received", {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    messageLength: message.trim().length,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    { ok: true, message: "Enquiry received. We will respond within one business day." },
    { status: 200 },
  );
}
