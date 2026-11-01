import { NextRequest, NextResponse } from "next/server";
import { validateQuote } from "@/lib/validation";
import { makeReference } from "@/lib/reference";
import { applications } from "@/data/applications";
import { addApplication, addWorkingDays, submittedApplications } from "@/lib/store";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { errors: { _: "Invalid request body." } },
      { status: 400 },
    );
  }

  // Honeypot: if "company" is filled, silently accept
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateQuote(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Make sure the reference is unique
  const taken = new Set([
    ...applications.map((a) => a.reference),
    ...submittedApplications.map((a) => a.reference),
  ]);
  let reference = makeReference();
  for (let i = 0; i < 10 && taken.has(reference); i++) {
    reference = makeReference();
  }

  const now = new Date();
  const urgent = data.urgency === "urgent";
  const firstName = String(data.name ?? "").trim().split(/\s+/)[0] || "Customer";

  addApplication({
    reference,
    firstName,
    service: String(data.service ?? "Document service"),
    stage: 0,
    history: [
      {
        stage: 0,
        timestamp: now.toISOString(),
        note: "Request received and reference issued.",
      },
    ],
    officerRemark:
      "Thank you for your request. A member of our team will review it and contact you within one working day.",
    estimatedDate: addWorkingDays(now, urgent ? 3 : 7).toISOString().slice(0, 10),
  });

  // Log without sensitive contact details
  console.log("[quote]", {
    reference,
    service: data.service,
    country: data.country,
    urgency: data.urgency,
  });

  return NextResponse.json({ ok: true, reference });
}