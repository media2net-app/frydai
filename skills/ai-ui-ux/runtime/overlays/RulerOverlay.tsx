"use client";

import { useEffect, useState } from "react";

export function RulerOverlay() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: Math.round(e.clientX + window.scrollX),
        y: Math.round(e.clientY + window.scrollY),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[201] h-5 border-b border-violet-500/30 bg-violet-950/80 font-mono text-[9px] text-violet-200"
        aria-hidden
      >
        <div
          className="absolute top-0 h-full w-px bg-violet-400/60"
          style={{ left: pos.x - window.scrollX }}
        />
        <span className="absolute left-2 top-0.5">x:{pos.x}px</span>
      </div>
      <div
        className="pointer-events-none fixed bottom-0 left-0 top-5 z-[201] w-5 border-r border-violet-500/30 bg-violet-950/80 font-mono text-[9px] text-violet-200"
        aria-hidden
      >
        <div
          className="absolute left-0 w-full h-px bg-violet-400/60"
          style={{ top: pos.y - window.scrollY }}
        />
        <span
          className="absolute left-0.5 whitespace-nowrap"
          style={{ top: Math.max(8, pos.y - window.scrollY - 8) }}
        >
          y:{pos.y}
        </span>
      </div>
      <div
        className="pointer-events-none fixed z-[201] rounded bg-violet-600 px-1.5 py-0.5 font-mono text-[10px] text-white shadow"
        style={{
          left: pos.x - window.scrollX + 12,
          top: pos.y - window.scrollY + 12,
        }}
        aria-hidden
      >
        {pos.x} × {pos.y}
      </div>
    </>
  );
}
