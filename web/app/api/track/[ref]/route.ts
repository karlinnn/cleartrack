import { NextRequest, NextResponse } from "next/server";
import { APPLICATIONS } from "@/data/applications";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> },
) {
  const { ref } = await params;
  const app = APPLICATIONS.find(
    (a) => a.reference.toLowerCase() === ref.toLowerCase(),
  );
  if (!app) {
    return NextResponse.json(
      {
        error: `We could not find reference ${ref}. Check the format: CT-2026-0000.`,
      },
      { status: 404 },
    );
  }
  return NextResponse.json(app);
}
