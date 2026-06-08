"use client";

import { UiUxAuditSwitcher } from "@skills/ai-ui-ux/runtime/panel/UiUxAuditSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { cx } from "@/lib/cx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/use-is-client";
import { DEV_TOOLS_RAIL_STORAGE_KEY, DEV_TOOLS_Z_CLASS } from "./constants";
function readRailExpanded(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(DEV_TOOLS_RAIL_STORAGE_KEY) !== "0";
  } catch {
    return true;
  }
}

function DevToolsRailContent() {
  const [expanded, setExpanded] = useState(readRailExpanded);

  const toggleExpanded = () => {
    setExpanded((prev) => {
      const next = !prev;
      window.localStorage.setItem(DEV_TOOLS_RAIL_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <>
      <div
        className={`pointer-events-auto fixed bottom-3 right-3 ${DEV_TOOLS_Z_CLASS} flex max-w-[calc(100vw-1.5rem)] flex-col gap-2 sm:hidden`}
        data-ui-ux-audit-ignore
      >
        <ThemeSwitcher mobileOnly />
        <UiUxAuditSwitcher />
      </div>

      <aside
        className={cx(
          `pointer-events-none fixed right-0 top-1/2 ${DEV_TOOLS_Z_CLASS} hidden -translate-y-1/2 sm:flex`,
          "items-stretch",
        )}
        data-ui-ux-audit-ignore
        aria-label="Development tools"
      >
        <div
          className={cx(
            "pointer-events-auto mr-0 flex max-h-[calc(100dvh-2rem)] w-[11rem] flex-col gap-4 overflow-y-auto rounded-l-2xl border border-r-0 border-border-subtle bg-surface/95 p-3 shadow-[-8px_8px_32px_rgba(0,0,0,0.14)] backdrop-blur-md transition-[transform,opacity] duration-300 ease-out",
            expanded ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0",
          )}
        >
          <ThemeSwitcher desktopOnly />
          <div className="h-px bg-border-subtle" aria-hidden />
          <UiUxAuditSwitcher />
        </div>

        <button
          type="button"
          onClick={toggleExpanded}
          className={cx(
            "pointer-events-auto shrink-0 rounded-l-md bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.45)] transition-all hover:bg-violet-500",
            expanded ? "w-2" : "w-2.5",
            "min-h-[5.5rem] self-center",
          )}
          aria-label={expanded ? "Dev tools inklappen" : "Dev tools uitklappen"}
          aria-expanded={expanded}
          title={expanded ? "Inklappen" : "Uitklappen"}
        />
      </aside>
    </>
  );
}

/** Portaal naar body zodat z-index boven audit-overlays blijft (niet gevangen in page stacking context). */
export function DevToolsRail() {
  const mounted = useIsClient();

  if (!mounted) return null;

  return createPortal(<DevToolsRailContent />, document.body);
}
