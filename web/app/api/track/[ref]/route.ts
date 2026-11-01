import { NextRequest, NextResponse } from "next/server";
import { applications } from "@/data/applications";

interface RouteContext {
  params: Promise<{ ref: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { ref } = await params;
  const application = applications.find((a) => a.reference === ref);

  if (!application) {
    return NextResponse.json(
      {
        error:
          "We could not find that reference. Check the format: CT-2026-0000.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(application);
}
