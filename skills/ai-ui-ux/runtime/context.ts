import { auditProjectConfig } from "../project.config";
import type { AuditProjectContext, CompetitorRef } from "./types";

export const AUDIT_CONTEXT_STORAGE_KEY = "frydai-ui-ux-audit-context";

export type AuditContextOverrides = {
  competitors?: CompetitorRef[];
  designNotes?: string;
};

export function mergeAuditContext(
  base: AuditProjectContext,
  overrides?: AuditContextOverrides | null,
): AuditProjectContext {
  if (!overrides) return base;
  return {
    ...base,
    designNotes: overrides.designNotes?.trim() || base.designNotes,
    competitors:
      overrides.competitors && overrides.competitors.length > 0
        ? overrides.competitors
        : base.competitors,
  };
}

export function getDefaultAuditContext(): AuditProjectContext {
  return auditProjectConfig;
}

export function readContextOverrides(): AuditContextOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(AUDIT_CONTEXT_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AuditContextOverrides;
  } catch {
    return {};
  }
}

export function writeContextOverrides(overrides: AuditContextOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUDIT_CONTEXT_STORAGE_KEY, JSON.stringify(overrides));
}

export function resolveAuditContext(overrides?: AuditContextOverrides | null): AuditProjectContext {
  return mergeAuditContext(auditProjectConfig, overrides ?? readContextOverrides());
}

export function hasPositioningContext(context: AuditProjectContext): boolean {
  return (
    context.designGoal !== "new" ||
    Boolean(context.previousSiteUrl) ||
    context.competitors.length > 0
  );
}

export function designGoalLabel(goal: AuditProjectContext["designGoal"]): string {
  switch (goal) {
    case "new":
      return "Nieuw ontwerp";
    case "redesign":
      return "Redesign";
    case "rebrand":
      return "Rebranding";
  }
}
