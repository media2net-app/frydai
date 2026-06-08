"use client";

import {
  designGoalLabel,
  getDefaultAuditContext,
  readContextOverrides,
  resolveAuditContext,
  writeContextOverrides,
} from "@skills/ai-ui-ux/runtime/context";
import type { AuditProjectContext, CompetitorRef } from "@skills/ai-ui-ux/runtime/types";
import { useCallback, useState } from "react";

function emptyCompetitor(): CompetitorRef {
  return { name: "", url: "" };
}

export function ProjectContextPanel({
  storedContext,
}: {
  storedContext?: AuditProjectContext | null;
}) {
  const base = getDefaultAuditContext();
  const active = storedContext ?? resolveAuditContext();

  const [competitors, setCompetitors] = useState<CompetitorRef[]>(() => {
    const overrides = readContextOverrides();
    if (overrides.competitors?.length) return overrides.competitors;
    return active.competitors;
  });
  const [saved, setSaved] = useState(false);

  const persistToStorage = useCallback((next: CompetitorRef[]) => {
    const cleaned = next.filter((c) => c.name.trim() && c.url.trim());
    writeContextOverrides(cleaned.length ? { competitors: cleaned } : {});
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }, []);

  const updateCompetitor = (index: number, patch: Partial<CompetitorRef>) => {
    setCompetitors((prev) => {
      const next = prev.map((c, i) => (i === index ? { ...c, ...patch } : c));
      persistToStorage(next);
      return next;
    });
  };

  const addCompetitor = () => {
    setCompetitors((prev) => [...prev, emptyCompetitor()]);
  };

  const removeCompetitor = (index: number) => {
    setCompetitors((prev) => {
      const next = prev.filter((_, i) => i !== index);
      persistToStorage(next);
      return next;
    });
  };

  const resetCompetitors = () => {
    setCompetitors(base.competitors);
    writeContextOverrides({});
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-5">
      <h3 className="font-semibold text-foreground">Projectcontext</h3>
      <p className="mt-1 text-xs text-muted">
        De AI gebruikt dit om rebranding/redesign en concurrenten te beoordelen. Basis staat in{" "}
        <code className="text-[10px]">skills/ai-ui-ux/project.config.ts</code>.
      </p>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-muted">Doel</dt>
          <dd className="font-medium text-foreground">{designGoalLabel(active.designGoal)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted">Product</dt>
          <dd className="text-foreground">{active.productName}</dd>
        </div>
        {active.previousSiteUrl && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-muted">Vorige site</dt>
            <dd>
              <a
                href={active.previousSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-violet-500 hover:underline"
              >
                {active.previousSiteUrl}
              </a>
            </dd>
          </div>
        )}
        {active.designNotes && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-muted">Notities</dt>
            <dd className="text-muted-strong">{active.designNotes}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 border-t border-border-subtle pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground">Concurrenten</h4>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addCompetitor}
              className="rounded-lg border border-violet-500/30 px-2.5 py-1 text-[10px] font-semibold text-violet-500 hover:bg-violet-500/10"
            >
              + Toevoegen
            </button>
            <button
              type="button"
              onClick={resetCompetitors}
              className="rounded-lg border border-border-subtle px-2.5 py-1 text-[10px] font-medium text-muted hover:bg-fill-subtle"
            >
              Reset
            </button>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted">
          Opgeslagen lokaal voor volgende scans. Standaard voor Frydai: ecomclaw.co.
        </p>

        <ul className="mt-3 space-y-2">
          {competitors.map((c, index) => (
            <li
              key={`${c.url}-${index}`}
              className="grid gap-2 rounded-xl border border-border-subtle bg-fill-subtle p-3 sm:grid-cols-[1fr_1.2fr_1fr_auto]"
            >
              <input
                type="text"
                placeholder="Naam"
                value={c.name}
                onChange={(e) => updateCompetitor(index, { name: e.target.value })}
                className="rounded-lg border border-border-subtle bg-surface px-2 py-1.5 text-xs text-foreground"
              />
              <input
                type="url"
                placeholder="https://..."
                value={c.url}
                onChange={(e) => updateCompetitor(index, { url: e.target.value })}
                className="rounded-lg border border-border-subtle bg-surface px-2 py-1.5 text-xs text-foreground"
              />
              <input
                type="text"
                placeholder="Notities (optioneel)"
                value={c.notes ?? ""}
                onChange={(e) => updateCompetitor(index, { notes: e.target.value })}
                className="rounded-lg border border-border-subtle bg-surface px-2 py-1.5 text-xs text-foreground"
              />
              <button
                type="button"
                onClick={() => removeCompetitor(index)}
                className="rounded-lg px-2 py-1 text-[10px] font-medium text-rose-500 hover:bg-rose-500/10"
              >
                Verwijder
              </button>
            </li>
          ))}
        </ul>
        {saved && <p className="mt-2 text-[10px] font-medium text-emerald-500">Opgeslagen voor volgende scan</p>}
      </div>
    </div>
  );
}
