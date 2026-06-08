"use client";

import Link from "next/link";
import { useUiUxAudit } from "./UiUxAuditProvider";

export function AuditReportPanel() {
  const { enabled, scanning, error } = useUiUxAudit();

  if (!enabled) return null;

  return (
    <div
      className="mt-2 rounded-xl border border-border-subtle bg-surface-elevated/95 p-2.5 text-left shadow-lg backdrop-blur-sm"
      data-ui-ux-audit-ignore
    >
      {scanning && (
        <p className="text-[10px] text-muted">
          Scannen… live log links. Pagina scrollt per sectie.
        </p>
      )}
      {error && (
        <p className="text-[10px] leading-relaxed text-rose-500">{error}</p>
      )}
      {!scanning && !error && (
        <p className="text-[10px] text-muted">
          Na scan opent automatisch het{" "}
          <Link href="/dev/ui-ux" className="font-semibold text-violet-500 hover:underline">
            scan overzicht
          </Link>
          .
        </p>
      )}
    </div>
  );
}
