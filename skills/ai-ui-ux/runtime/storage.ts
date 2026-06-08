import type { OverlayFlags } from "./types";

export const UI_UX_AUDIT_STORAGE_KEY = "frydai-ui-ux-audit";

export type StoredUiUxAuditPrefs = {
  enabled: boolean;
  overlays: OverlayFlags;
};

export const DEFAULT_OVERLAYS: OverlayFlags = {
  grid: true,
  rulers: false,
  sections: true,
  measure: false,
};

export const DEFAULT_STORED_PREFS: StoredUiUxAuditPrefs = {
  enabled: false,
  overlays: DEFAULT_OVERLAYS,
};

export function readStoredPrefs(): StoredUiUxAuditPrefs {
  if (typeof window === "undefined") return DEFAULT_STORED_PREFS;
  try {
    const raw = window.localStorage.getItem(UI_UX_AUDIT_STORAGE_KEY);
    if (!raw) return DEFAULT_STORED_PREFS;
    const parsed = JSON.parse(raw) as Partial<StoredUiUxAuditPrefs>;
    return {
      enabled: Boolean(parsed.enabled),
      overlays: { ...DEFAULT_OVERLAYS, ...parsed.overlays },
    };
  } catch {
    return DEFAULT_STORED_PREFS;
  }
}

export function writeStoredPrefs(prefs: StoredUiUxAuditPrefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_UX_AUDIT_STORAGE_KEY, JSON.stringify(prefs));
}
