"use client";

import { formatLogLine } from "../log/formatLogLine";
import type { ScanLogEntry, LogLevel } from "../log/types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/use-is-client";

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: "text-foreground/90",
  detail: "text-muted",
  success: "text-emerald-400",
  warn: "text-amber-400",
  stream: "text-violet-400",
  scan: "text-cyan-400",
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function LogLine({ entry }: { entry: ScanLogEntry }) {
  const line = formatLogLine(entry.message);
  if (!line) return null;

  return (
    <div
      className={`flex h-[18px] shrink-0 items-center gap-2 px-1 ${LEVEL_STYLES[entry.level]}`}
    >
      <span className="w-[3.1rem] shrink-0 tabular-nums text-[9px] leading-none text-muted/55">
        {formatTime(entry.ts)}
      </span>
      <span className="min-w-0 flex-1 truncate text-[10px] leading-none" title={line}>
        {line}
      </span>
    </div>
  );
}

export function ScanLogSidebar({
  open,
  logs,
  status,
  error,
}: {
  open: boolean;
  logs: ScanLogEntry[];
  status: "idle" | "scanning" | "done" | "error";
  error: string | null;
}) {
  const mounted = useIsClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!open || !el) return;
    el.scrollTop = el.scrollHeight;
  }, [logs, open]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <style>{`
        .ui-ux-scan-highlight {
          outline: 3px solid rgb(139 92 246 / 0.85) !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 0 6px rgb(139 92 246 / 0.15) !important;
          transition: outline 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>

      <aside
        className="fixed inset-y-0 left-0 z-[250] flex w-80 max-w-[calc(100vw-3rem)] flex-col overflow-hidden border-r border-violet-500/30 bg-[#0a0a12] shadow-2xl"
        data-ui-ux-audit-ignore
        aria-label="Scan log"
      >
        <header className="shrink-0 border-b border-violet-500/20 px-4 py-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-violet-400">
            Live scan log
          </p>
          <h2 className="text-sm font-bold text-foreground">Scan & score</h2>
          <p className="mt-0.5 text-[10px] leading-tight text-muted">
            DOM + broncode + AI audit
          </p>
        </header>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 font-mono"
        >
          <div className="flex flex-col">
            {logs.map((entry) => (
              <LogLine key={entry.id} entry={entry} />
            ))}
          </div>

          {status === "scanning" && (
            <div className="flex h-[18px] shrink-0 items-center gap-2 px-1 text-[10px] leading-none text-violet-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              Bezig…
            </div>
          )}

          {status === "done" && (
            <p className="h-[18px] shrink-0 px-1 text-[10px] leading-none text-emerald-400">
              ✓ Scan voltooid
            </p>
          )}

          {status === "error" && error && (
            <p className="min-h-[18px] shrink-0 px-1 text-[10px] leading-none text-amber-400">
              ✗ {formatLogLine(error)}
            </p>
          )}
        </div>

        <footer className="shrink-0 border-t border-violet-500/20 px-4 py-2 text-[9px] leading-tight text-muted">
          {logs.length} regels · {status === "scanning" ? "bezig" : status}
        </footer>
      </aside>
    </>,
    document.body,
  );
}
