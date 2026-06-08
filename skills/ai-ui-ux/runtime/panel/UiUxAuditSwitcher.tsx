"use client";

import Link from "next/link";
import { AuditReportPanel } from "./AuditReportPanel";
import { useUiUxAudit } from "./UiUxAuditProvider";

const OVERLAY_TOGGLES = [
  { key: "grid" as const, label: "Grid" },
  { key: "rulers" as const, label: "Rulers" },
  { key: "sections" as const, label: "Secties" },
  { key: "measure" as const, label: "Metingen" },
];

function ToggleButton({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2 py-1 text-[9px] font-semibold transition-all ${
        active
          ? "border-violet-500/40 bg-violet-500/15 text-foreground"
          : "border-border-subtle bg-surface-elevated/80 text-muted hover:border-violet-500/25"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function UiUxAuditSwitcher() {
  const { enabled, setEnabled, overlays, setOverlay, runScan, scanning } = useUiUxAudit();

  return (
    <>
      {/* Mobile */}
      <div
        className="pointer-events-auto fixed bottom-3 right-3 z-[400] flex max-w-[calc(100vw-1.5rem)] flex-col gap-1.5 sm:hidden"
        data-ui-ux-audit-ignore
        role="group"
        aria-label="UI/UX audit"
      >
        <ToggleButton active={enabled} onClick={() => setEnabled(!enabled)} className="w-full">
          UI/UX {enabled ? "Aan" : "Uit"}
        </ToggleButton>
        {enabled && (
          <>
            <div className="flex flex-wrap gap-1">
              {OVERLAY_TOGGLES.map((t) => (
                <ToggleButton
                  key={t.key}
                  active={overlays[t.key]}
                  onClick={() => setOverlay(t.key, !overlays[t.key])}
                >
                  {t.label}
                </ToggleButton>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void runScan()}
              disabled={scanning}
              className="rounded-lg border border-violet-500/40 bg-violet-600 px-2 py-1.5 text-[10px] font-bold text-white disabled:opacity-50"
            >
              {scanning ? "…" : "Scan & score"}
            </button>
            <Link
              href="/dev/ui-ux"
              className="rounded-lg border border-border-subtle bg-surface-elevated/80 px-2 py-1 text-center text-[9px] font-semibold text-violet-500 hover:border-violet-500/25"
            >
              Scan overzicht
            </Link>
            <AuditReportPanel />
          </>
        )}
      </div>

      {/* Desktop */}
      <div
        className="hidden w-[11rem] flex-col gap-1.5 sm:flex"
        data-ui-ux-audit-ignore
        role="group"
        aria-label="UI/UX audit"
      >
        <p className="text-center text-[9px] font-bold uppercase tracking-wider text-muted">
          UI/UX
        </p>
        <ToggleButton active={enabled} onClick={() => setEnabled(!enabled)} className="w-full">
          {enabled ? "Aan" : "Uit"}
        </ToggleButton>
        {enabled && (
          <>
            <div className="grid grid-cols-2 gap-1">
              {OVERLAY_TOGGLES.map((t) => (
                <ToggleButton
                  key={t.key}
                  active={overlays[t.key]}
                  onClick={() => setOverlay(t.key, !overlays[t.key])}
                >
                  {t.label}
                </ToggleButton>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void runScan()}
              disabled={scanning}
              className="w-full rounded-xl border border-violet-500/40 bg-violet-600 px-2 py-2 text-[10px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {scanning ? "Scannen…" : "Scan & score"}
            </button>
            <Link
              href="/dev/ui-ux"
              className="w-full rounded-lg border border-border-subtle bg-surface-elevated/80 px-2 py-1.5 text-center text-[9px] font-semibold text-violet-500 transition-colors hover:border-violet-500/25"
            >
              Scan overzicht
            </Link>
            <AuditReportPanel />
          </>
        )}
      </div>
    </>
  );
}
