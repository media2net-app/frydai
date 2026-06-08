"use client";

import { buildMasterCursorPrompt } from "@skills/ai-ui-ux/runtime/scoring/buildMasterCursorPrompt";
import type { AuditProjectContext, CursorPrompt, CursorPromptPriority } from "@skills/ai-ui-ux/runtime/types";
import { useCallback, useMemo, useState } from "react";
import { CursorPromptsGenerationModal } from "./CursorPromptsGenerationModal";

const PRIORITY_STYLES: Record<CursorPromptPriority, string> = {
  critical: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  high: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  medium: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
};

const PRIORITY_LABELS: Record<CursorPromptPriority, string> = {
  critical: "Kritiek",
  high: "Hoog",
  medium: "Medium",
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold text-violet-600 transition-colors hover:bg-violet-500/20 dark:text-violet-300"
    >
      {copied ? "Gekopieerd ✓" : label}
    </button>
  );
}

function MasterPromptCard({ text, stepCount }: { text: string; stepCount: number }) {
  const [open, setOpen] = useState(true);

  return (
    <article className="rounded-2xl border-2 border-violet-500/35 bg-violet-500/8 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-violet-500">
            Master prompt · alles in 1x
          </p>
          <h4 className="mt-1 text-base font-bold text-foreground">
            Totaal prompt voor Cursor Agent
          </h4>
          <p className="mt-1 text-xs text-muted">
            {stepCount} stappen in volgorde (kritiek → hoog → medium). Plak in Cursor en laat
            stap voor stap implementeren.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <CopyButton text={text} label="Kopieer master prompt" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-[10px] font-medium text-muted hover:bg-fill-subtle"
          >
            {open ? "Inklappen" : "Uitklappen"}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-violet-500/20 px-4 pb-4 pt-3 sm:px-5">
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl border border-border-subtle bg-fill-subtle p-3 font-mono text-[11px] leading-relaxed text-foreground">
            {text}
          </pre>
        </div>
      )}
    </article>
  );
}

function PromptCard({ prompt, defaultOpen }: { prompt: CursorPrompt; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <article className="rounded-2xl border border-border-subtle bg-surface-elevated overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left hover:bg-fill-subtle"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${PRIORITY_STYLES[prompt.priority]}`}
            >
              {PRIORITY_LABELS[prompt.priority]}
            </span>
            {prompt.sectionId && (
              <span className="font-mono text-[10px] text-muted">#{prompt.sectionId}</span>
            )}
            <span className="text-[10px] text-muted">{prompt.category}</span>
          </div>
          <h4 className="mt-1.5 font-semibold text-foreground">{prompt.title}</h4>
          <p className="mt-1 text-xs text-muted">{prompt.estimatedImpact}</p>
        </div>
        <span className="shrink-0 text-muted">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-border-subtle px-4 pb-4 pt-3">
          {prompt.elements.length > 0 && (
            <p className="mb-3 text-xs text-muted">
              Elementen: {prompt.elements.join(" · ")}
            </p>
          )}
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-border-subtle bg-fill-subtle p-3 font-mono text-[11px] leading-relaxed text-foreground">
            {prompt.prompt}
          </pre>
          <div className="mt-3">
            <CopyButton text={prompt.prompt} label="Kopieer prompt naar Cursor" />
          </div>
        </div>
      )}
    </article>
  );
}

export function CursorPromptsPanel({
  reportId,
  cursorPrompts,
  generatedAt,
  overallScore,
  pathname,
  theme,
  context,
  onGenerated,
}: {
  reportId: string;
  cursorPrompts?: CursorPrompt[];
  generatedAt?: string;
  overallScore?: number;
  pathname?: string;
  theme?: string;
  context?: AuditProjectContext;
  onGenerated: (prompts: CursorPrompt[], at: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = useCallback(
    (prompts: CursorPrompt[], at: string) => {
      onGenerated(prompts, at);
    },
    [onGenerated],
  );

  const sorted = useMemo(
    () =>
      cursorPrompts
        ? [...cursorPrompts].sort((a, b) => {
            const order: Record<CursorPromptPriority, number> = {
              critical: 0,
              high: 1,
              medium: 2,
            };
            return order[a.priority] - order[b.priority];
          })
        : [],
    [cursorPrompts],
  );

  const masterPrompt = useMemo(() => {
    if (!sorted.length || overallScore == null || !pathname || !theme || !context) {
      return null;
    }
    return buildMasterCursorPrompt(sorted, {
      overallScore,
      pathname,
      theme,
      context,
    });
  }, [sorted, overallScore, pathname, theme, context]);

  return (
    <div className="mt-6 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-violet-700 dark:text-violet-200">
            Cursor prompts
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Gedetailleerde prompts voor Cursor Agent — per sectie en element, met enterprise-eisen
            (WCAG, themes, minimale diff, design system). Kopieer en plak in Cursor om te
            implementeren.
          </p>
          {generatedAt && (
            <p className="mt-2 text-[10px] text-muted">
              Gegenereerd: {new Date(generatedAt).toLocaleString("nl-NL")}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setModalOpen(true);
            }}
            disabled={modalOpen}
            className="rounded-xl border border-violet-500/40 bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            {modalOpen
              ? "AI genereert prompts…"
              : cursorPrompts?.length
                ? "Opnieuw genereren"
                : "Genereer Cursor prompts"}
          </button>
          {masterPrompt && <CopyButton text={masterPrompt} label="Kopieer master prompt" />}
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

      <CursorPromptsGenerationModal
        reportId={reportId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={handleComplete}
        onError={setError}
      />

      {sorted.length > 0 && (
        <div className="mt-5 space-y-3">
          {masterPrompt && <MasterPromptCard text={masterPrompt} stepCount={sorted.length} />}

          <p className="pt-2 text-xs font-medium text-muted">
            {sorted.length} losse prompts · gesorteerd op prioriteit
          </p>
          {sorted.map((p) => (
            <PromptCard key={p.id} prompt={p} defaultOpen={false} />
          ))}
        </div>
      )}

      {!sorted.length && !modalOpen && (
        <p className="mt-4 text-sm text-muted">
          Nog geen prompts. Klik op Genereer Cursor prompts om per element verbeter-instructies
          te krijgen op basis van dit rapport.
        </p>
      )}
    </div>
  );
}
