"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { designGoalLabel } from "@skills/ai-ui-ux/runtime/context";
import type { AuditRecordSummary, StoredAuditRecord } from "@skills/ai-ui-ux/runtime/db/types";
import { CursorPromptsPanel } from "./CursorPromptsPanel";
import { ProjectContextPanel } from "./ProjectContextPanel";

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  return "text-rose-500";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ScoreTrend({ history }: { history: AuditRecordSummary[] }) {
  if (history.length < 2) return null;
  const max = Math.max(...history.map((h) => h.overallScore), 100);

  return (
    <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-elevated p-5">
      <h3 className="text-sm font-semibold text-foreground">Score verloop</h3>
      <p className="mt-1 text-xs text-muted">Vergelijk scans na je design-aanpassingen</p>
      <div className="mt-4 flex h-32 items-end gap-2">
        {history.map((item) => (
          <div key={item.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <span className={`text-[10px] font-bold tabular-nums ${scoreColor(item.overallScore)}`}>
              {item.overallScore}
            </span>
            <div
              className="w-full rounded-t bg-violet-500/70 transition-all"
              style={{ height: `${(item.overallScore / max) * 100}%`, minHeight: 4 }}
              title={`${item.overallScore} — ${formatDate(item.createdAt)}`}
            />
            <span className="w-full truncate text-center text-[8px] text-muted">
              {new Date(item.createdAt).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UiUxReportsDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const [history, setHistory] = useState<AuditRecordSummary[]>([]);
  const [record, setRecord] = useState<StoredAuditRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    const res = await fetch("/api/ui-ux/reports");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Kon historie niet laden");
    setHistory(data.reports as AuditRecordSummary[]);
    return data.reports as AuditRecordSummary[];
  }, []);

  const loadRecord = useCallback(async (id: string) => {
    const res = await fetch(`/api/ui-ux/reports/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Rapport niet gevonden");
    setRecord(data.record as StoredAuditRecord);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const reports = await loadHistory();
        const id = selectedId ?? reports[0]?.id;
        if (id && !cancelled) {
          await loadRecord(id);
          if (!selectedId && id) {
            router.replace(`/dev/ui-ux?id=${id}`);
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Laden mislukt");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedId, loadHistory, loadRecord, router]);

  const currentIndex = record ? history.findIndex((h) => h.id === record.id) : -1;
  const previous =
    currentIndex >= 0 && currentIndex < history.length - 1
      ? history[currentIndex + 1]
      : undefined;
  const delta = previous ? record!.overallScore - previous.overallScore : null;
  const trendHistory = [...history].reverse().slice(-12);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <header className="border-b border-border-subtle bg-surface-elevated px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-violet-500">
              UI/UX Audit · dev
            </p>
            <h1 className="text-xl font-bold sm:text-2xl">Scan overzicht</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-full border border-border-subtle px-4 py-2 text-sm font-medium text-foreground hover:bg-fill-subtle"
            >
              ← Terug naar site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Historie</h2>
          <ul className="mt-3 max-h-[70vh] space-y-1 overflow-y-auto">
            {history.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/dev/ui-ux?id=${item.id}`}
                  className={`block rounded-xl border px-3 py-2.5 transition-colors ${
                    item.id === record?.id
                      ? "border-violet-500/40 bg-violet-500/10"
                      : "border-border-subtle bg-surface-elevated hover:border-violet-500/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-lg font-bold tabular-nums ${scoreColor(item.overallScore)}`}>
                      {item.overallScore}
                    </span>
                    <span className="text-[10px] text-muted">{item.theme}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted">{formatDate(item.createdAt)}</p>
                  <p className="text-[9px] text-muted">
                    {item.pathname}
                    {item.designGoal ? ` · ${designGoalLabel(item.designGoal as "new" | "redesign" | "rebrand")}` : ""}
                  </p>
                </Link>
              </li>
            ))}
            {history.length === 0 && !loading && (
              <li className="text-sm text-muted">Nog geen scans opgeslagen.</li>
            )}
          </ul>
        </aside>

        <main>
          {loading && <p className="text-muted">Rapport laden…</p>}
          {error && <p className="text-rose-500">{error}</p>}

          {!loading && (
            <div className={record ? "mb-6" : ""}>
              <ProjectContextPanel storedContext={record?.context} />
            </div>
          )}

          {record && !loading && (
            <>
              <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-6 sm:p-8">
                <div className="flex flex-wrap items-end gap-4">
                  <p className={`text-6xl font-bold tabular-nums ${scoreColor(record.overallScore)}`}>
                    {record.overallScore}
                  </p>
                  <div>
                    <p className="text-sm text-muted">Overall score / 100</p>
                    {delta != null && (
                      <p
                        className={`text-sm font-semibold ${
                          delta >= 0 ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {delta >= 0 ? "+" : ""}
                        {delta} t.o.v. vorige scan
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted">
                  {formatDate(record.createdAt)} · {record.pathname} · {record.theme} ·{" "}
                  {record.viewportWidth}×{record.viewportHeight} ·{" "}
                  {designGoalLabel(record.context.designGoal)}
                </p>
                {record.context.competitors.length > 0 && (
                  <p className="mt-2 text-xs text-muted">
                    Benchmark vs{" "}
                    {record.context.competitors.map((c) => c.name).join(", ")}
                  </p>
                )}
                {record.snapshot.codeContext && (
                  <p className="mt-2 text-xs text-muted">
                    Broncode scan: {record.snapshot.codeContext.componentFiles.length} components ·{" "}
                    {record.snapshot.codeContext.styleFiles.length} CSS
                    {record.snapshot.codeContext.copySource ? " · copy" : ""}
                  </p>
                )}
              </div>

              <ScoreTrend history={trendHistory} />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {record.report.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-2xl border border-border-subtle bg-surface-elevated p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{cat.label}</h3>
                      <span className={`text-2xl font-bold tabular-nums ${scoreColor(cat.score)}`}>
                        {cat.score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{cat.summary}</p>
                    <ul className="mt-3 space-y-1.5">
                      {cat.findings.map((f) => (
                        <li key={f} className="text-sm text-muted-strong">
                          · {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {record.report.quickWins.length > 0 && (
                <div className="mt-6 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5">
                  <h3 className="font-semibold text-violet-600 dark:text-violet-300">Quick wins</h3>
                  <ul className="mt-3 space-y-2">
                    {record.report.quickWins.map((w) => (
                      <li key={w} className="text-sm text-muted-strong">
                        → {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <CursorPromptsPanel
                reportId={record.id}
                cursorPrompts={record.report.cursorPrompts}
                generatedAt={record.report.cursorPromptsGeneratedAt}
                overallScore={record.overallScore}
                pathname={record.pathname}
                theme={record.theme}
                context={record.context}
                onGenerated={(prompts, at) => {
                  setRecord((prev) =>
                    prev
                      ? {
                          ...prev,
                          report: {
                            ...prev.report,
                            cursorPrompts: prompts,
                            cursorPromptsGeneratedAt: at,
                          },
                        }
                      : prev,
                  );
                }}
              />

              <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-elevated p-5">
                <h3 className="font-semibold text-foreground">Gescande secties ({record.snapshot.sections.length})</h3>
                <ul className="mt-3 space-y-2">
                  {record.snapshot.sections.map((s) => (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border-subtle bg-fill-subtle px-3 py-2 text-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-foreground">#{s.label}</span>
                        {s.contentSummary && (
                          <p className="mt-0.5 text-[10px] text-muted">{s.contentSummary}</p>
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted">
                        {s.rect.width}×{s.rect.height}px
                        {s.gapToNext != null ? ` · gap ${s.gapToNext}px` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
