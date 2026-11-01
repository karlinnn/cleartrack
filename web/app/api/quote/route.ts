import { NextRequest, NextResponse } from "next/server";
import { validateQuote } from "@/lib/validation";
import { makeReference } from "@/lib/reference";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ errors: { _: "Invalid request body." } }, { status: 400 });
  }

  // Honeypot: if "company" field is filled, silently accept
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateQuote(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  console.log("[quote]", data);

  return NextResponse.json({ ok: true, reference: makeReference() });
}
