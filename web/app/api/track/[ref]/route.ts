import { NextRequest, NextResponse } from "next/server";
import { applications } from "@/data/applications";
import { submittedApplications } from "@/lib/store";

interface RouteContext {
  params: Promise<{ ref: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { ref } = await params;
  const wanted = decodeURIComponent(ref).trim().toUpperCase();

  const application = [...applications, ...submittedApplications].find(
    (a) => a.reference.toUpperCase() === wanted,
  );

  if (!application) {
    return NextResponse.json(
      {
        error:
          "We could not find that reference. Check the format: CT-2026-0000.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(application);
}