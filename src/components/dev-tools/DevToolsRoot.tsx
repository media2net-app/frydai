"use client";

import { AuditOverlayLayer } from "@skills/ai-ui-ux/runtime/overlays/AuditOverlayLayer";
import { UiUxAuditProvider } from "@skills/ai-ui-ux/runtime/panel/UiUxAuditProvider";
import { usePathname } from "next/navigation";
import { DevToolsRail } from "./DevToolsRail";

function DevToolsContent() {
  const pathname = usePathname();
  const hideOnOverview = pathname.startsWith("/dev/ui-ux");

  if (hideOnOverview) return null;

  return (
    <>
      <AuditOverlayLayer />
      <DevToolsRail />
    </>
  );
}

export function DevToolsRoot() {
  return (
    <UiUxAuditProvider>
      <DevToolsContent />
    </UiUxAuditProvider>
  );
}
