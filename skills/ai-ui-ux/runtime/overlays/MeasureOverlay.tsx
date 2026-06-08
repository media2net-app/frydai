"use client";

import { useEffect, useState } from "react";

type MeasureInfo = {
  tag: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

export function MeasureOverlay() {
  const [info, setInfo] = useState<MeasureInfo | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target.closest("[data-ui-ux-audit-ignore]")) {
        setInfo(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setInfo({
        tag: target.tagName.toLowerCase(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: Math.round(rect.left + window.scrollX),
        y: Math.round(rect.top + window.scrollY),
      });
    };
    document.addEventListener("mousemove", onMove, true);
    return () => document.removeEventListener("mousemove", onMove, true);
  }, []);

  if (!info) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[202] -translate-x-1/2 rounded-lg border border-violet-500/40 bg-violet-950/90 px-3 py-2 font-mono text-[11px] text-violet-100 shadow-lg"
      data-ui-ux-audit-ignore
    >
      <span className="text-violet-300">&lt;{info.tag}&gt;</span>{" "}
      {info.width}×{info.height}px @ ({info.x}, {info.y})
    </div>
  );
}
