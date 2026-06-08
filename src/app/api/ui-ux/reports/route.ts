import { listAuditRecords } from "@skills/ai-ui-ux/runtime/db/store";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const reports = listAuditRecords(100);
  return NextResponse.json({ reports });
}
