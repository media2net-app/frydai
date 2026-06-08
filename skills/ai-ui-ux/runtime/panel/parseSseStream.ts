import type { LogLevel } from "../log/types";

export function parseSseBlock(block: string): { event: string; data: string } | null {
  const lines = block.split("\n");
  let event = "message";
  let data = "";
  for (const line of lines) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data += line.slice(5).trim();
  }
  if (!data) return null;
  return { event, data };
}

export async function consumeSseStream<T>(
  response: Response,
  handlers: {
    onLog?: (message: string, level: LogLevel) => void;
    onDone?: (payload: T) => void;
    onError?: (message: string) => void;
  },
): Promise<T> {
  if (!response.body) {
    throw new Error("Geen stream body ontvangen");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: T | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() ?? "";

    for (const block of blocks) {
      const parsed = parseSseBlock(block);
      if (!parsed) continue;

      const payload = JSON.parse(parsed.data) as Record<string, unknown>;

      if (parsed.event === "log" && handlers.onLog) {
        handlers.onLog(payload.message as string, (payload.level as LogLevel) ?? "info");
      }

      if (parsed.event === "done") {
        result = payload as T;
        handlers.onDone?.(payload as T);
      }

      if (parsed.event === "error") {
        const message = (payload.message as string) ?? "Onbekende fout";
        handlers.onError?.(message);
        throw new Error(message);
      }
    }
  }

  if (!result) {
    throw new Error("Stream eindigde zonder resultaat");
  }

  return result;
}
