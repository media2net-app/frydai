"use client";

import { formatLogLine } from "@skills/ai-ui-ux/runtime/log/formatLogLine";
import type { LogLevel } from "@skills/ai-ui-ux/runtime/log/types";
import type { CursorPrompt } from "@skills/ai-ui-ux/runtime/types";
import { useCallback, useEffect, useRef, useState } from "react";

type LogEntry = {
  id: number;
  ts: string;
  message: string;
  level: LogLevel;
};

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: "text-foreground",
  detail: "text-muted",
  success: "text-emerald-500",
  warn: "text-amber-500",
  stream: "text-violet-500",
  scan: "text-cyan-500",
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function parseSseBlock(block: string): { event: string; data: string } | null {
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

export function CursorPromptsGenerationModal({
  reportId,
  open,
  onClose,
  onComplete,
  onError,
}: {
  reportId: string;
  open: boolean;
  onClose: () => void;
  onComplete: (prompts: CursorPrompt[], generatedAt: string) => void;
  onError?: (message: string) => void;
}) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<"running" | "done" | "error">("running");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);
  const startedRef = useRef(false);

  const appendLog = useCallback((message: string, level: LogLevel = "info") => {
    const line = formatLogLine(message);
    if (!line) return;
    logIdRef.current += 1;
    setLogs((prev) => [
      ...prev,
      {
        id: logIdRef.current,
        ts: new Date().toISOString(),
        message: line,
        level,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!open) {
      startedRef.current = false;
      return;
    }

    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs, open]);

  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;

    setLogs([]);
    setStatus("running");
    setError(null);
    logIdRef.current = 0;

    const run = async () => {
      try {
        const res = await fetch(`/api/ui-ux/reports/${reportId}/cursor-prompts?stream=1`, {
          method: "POST",
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error ?? `HTTP ${res.status}`);
        }

        if (!res.body) {
          throw new Error("Geen stream body ontvangen");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

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

            if (parsed.event === "log") {
              appendLog(
                payload.message as string,
                (payload.level as LogLevel) ?? "info",
              );
            }

            if (parsed.event === "done") {
              setStatus("done");
              onComplete(
                payload.cursorPrompts as CursorPrompt[],
                payload.generatedAt as string,
              );
            }

            if (parsed.event === "error") {
              throw new Error((payload.message as string) ?? "Onbekende fout");
            }
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Genereren mislukt";
        setError(msg);
        setStatus("error");
        appendLog(`FOUT: ${msg}`, "warn");
        onError?.(msg);
      }
    };

    void run();
  }, [open, reportId, appendLog, onComplete, onError]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Sluiten"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={status !== "running" ? onClose : undefined}
      />

      <div
        role="dialog"
        aria-labelledby="cursor-prompts-modal-title"
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-violet-500">
              AI generatie log
            </p>
            <h2 id="cursor-prompts-modal-title" className="text-lg font-bold text-foreground">
              Cursor prompts genereren
            </h2>
          </div>
          {status !== "running" && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border-subtle px-3 py-1.5 text-sm font-medium text-foreground hover:bg-fill-subtle"
            >
              Sluiten
            </button>
          )}
        </header>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#0d0d14] px-2 py-1 font-mono"
        >
          <div className="flex flex-col">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className={`flex h-[18px] shrink-0 items-center gap-2 px-1 ${LEVEL_STYLES[entry.level]}`}
              >
                <span className="w-[3.1rem] shrink-0 tabular-nums text-[9px] leading-none text-muted/55">
                  {formatTime(entry.ts)}
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-[10px] leading-none"
                  title={entry.message}
                >
                  {entry.message}
                </span>
              </div>
            ))}
          </div>
          {status === "running" && (
            <div className="mt-2 flex items-center gap-2 text-violet-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              Bezig…
            </div>
          )}
        </div>

        <footer className="border-t border-border-subtle px-5 py-3 text-xs text-muted">
          {status === "running" && "Live log van server + OpenAI stream"}
          {status === "done" && `${logs.length} logregels · generatie voltooid`}
          {status === "error" && (error ?? "Er ging iets mis")}
        </footer>
      </div>
    </div>
  );
}
