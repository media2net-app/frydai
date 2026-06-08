"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/use-is-client";
import { useUiUxAudit } from "../panel/UiUxAuditProvider";
import { GridOverlay } from "./GridOverlay";
import { MeasureOverlay } from "./MeasureOverlay";
import { RulerOverlay } from "./RulerOverlay";
import { SectionOutlineOverlay } from "./SectionOutlineOverlay";

export function AuditOverlayLayer() {
  const { enabled, overlays, snapshot } = useUiUxAudit();
  const mounted = useIsClient();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const update = () => {
      setDocHeight(document.documentElement.scrollHeight);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [enabled]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <>
      {overlays.grid && (
        <div className="pointer-events-none fixed inset-0 z-[200]" data-ui-ux-audit-ignore>
          <GridOverlay />
        </div>
      )}
      {overlays.rulers && (
        <div className="pointer-events-none fixed inset-0 z-[201]" data-ui-ux-audit-ignore>
          <RulerOverlay />
        </div>
      )}
      {overlays.sections && snapshot?.sections && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-[200] w-full"
          style={{ height: docHeight }}
          data-ui-ux-audit-ignore
        >
          <SectionOutlineOverlay sections={snapshot.sections} interactive={enabled} />
        </div>
      )}
      {overlays.measure && (
        <div className="pointer-events-none fixed inset-0 z-[202]" data-ui-ux-audit-ignore>
          <MeasureOverlay />
        </div>
      )}
    </>,
    document.body,
  );
}
