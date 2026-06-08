import { generateCursorPrompts } from "@skills/ai-ui-ux/runtime/scoring/generateCursorPrompts";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

function sseEncode(event: string, data: object): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request, context: RouteContext) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "UI/UX audit only available in development" }, { status: 403 });
  }

  const { id } = await context.params;
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
              sseEncode("log", {
                message,
                level,
                ts: new Date().toISOString(),
              }),
            ),
          );
        };

        try {
          const result = await generateCursorPrompts(id, log);
          controller.enqueue(encoder.encode(sseEncode("done", result)));
        } catch (e) {
          const message = e instanceof Error ? e.message : "Genereren mislukt";
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
    const logs: string[] = [];
    const result = await generateCursorPrompts(id, (message) => {
      logs.push(message);
    });
    return NextResponse.json({ ...result, logs });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Genereren mislukt" },
      { status: 502 },
    );
  }
}
