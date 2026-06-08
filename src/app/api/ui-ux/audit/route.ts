import { resolveAuditContext } from "@skills/ai-ui-ux/runtime/context";
import { runAudit } from "@skills/ai-ui-ux/runtime/scoring/runAudit";
import type { AuditRequestBody } from "@skills/ai-ui-ux/runtime/types";
import { NextResponse } from "next/server";

function sseEncode(event: string, data: object): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "UI/UX audit only available in development" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const isWrapped =
    typeof body === "object" &&
    body !== null &&
    "snapshot" in body &&
    (body as AuditRequestBody).snapshot;

  const snapshot = isWrapped
    ? (body as AuditRequestBody).snapshot
    : (body as AuditRequestBody["snapshot"]);
  const context =
    isWrapped && (body as AuditRequestBody).context
      ? (body as AuditRequestBody).context!
      : resolveAuditContext();

  const stream = new URL(request.url).searchParams.get("stream") === "1";

  if (stream) {
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        const log = (
          message: string,
          level: "info" | "detail" | "success" | "warn" | "stream" | "scan" = "info",
        ) => {
          controller.enqueue(
            encoder.encode(
              sseEncode("log", { message, level, ts: new Date().toISOString() }),
            ),
          );
        };

        try {
          const result = await runAudit(snapshot, context, log);
          controller.enqueue(encoder.encode(sseEncode("done", result)));
        } catch (e) {
          const message = e instanceof Error ? e.message : "Audit mislukt";
          controller.enqueue(encoder.encode(sseEncode("error", { message })));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  try {
    const result = await runAudit(snapshot, context, () => {});
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Audit mislukt" },
      { status: 502 },
    );
  }
}
