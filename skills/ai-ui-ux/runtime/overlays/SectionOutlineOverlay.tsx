"use client";

import type { SectionSnapshot } from "../types";

const COLORS = [
  "rgba(124, 58, 237, 0.85)",
  "rgba(45, 212, 191, 0.85)",
  "rgba(236, 72, 153, 0.85)",
  "rgba(99, 102, 241, 0.85)",
  "rgba(251, 191, 36, 0.9)",
];

type Props = {
  sections: SectionSnapshot[];
  onSelect?: (id: string) => void;
  /** Alleen visueel, geen klik-vlakken over de sidebar */
  interactive?: boolean;
};

export function SectionOutlineOverlay({ sections, onSelect, interactive = true }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        const color = COLORS[i % COLORS.length];
        const { rect } = section;
        const label = (
          <span
            className="absolute left-0 top-0 max-w-[min(100%,280px)] truncate px-1.5 py-0.5 font-mono text-[10px] font-bold text-white"
            style={{ backgroundColor: color }}
          >
            #{section.label} · {rect.width}×{rect.height}
            {section.gapToNext != null ? ` · gap ${section.gapToNext}px` : ""}
          </span>
        );
        const style = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderColor: color,
        };

        if (!interactive) {
          return (
            <div
              key={section.id}
              className="pointer-events-none absolute border-2 bg-transparent"
              style={style}
              title={`${section.label} — ${rect.width}×${rect.height}px`}
            >
              {label}
            </div>
          );
        }

        return (
          <button
            key={section.id}
            type="button"
            className="pointer-events-auto absolute border-2 bg-transparent transition-colors hover:bg-violet-500/5"
            style={style}
            onClick={() => {
              const el = document.getElementById(section.id);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
              onSelect?.(section.id);
            }}
            title={`${section.label} — ${rect.width}×${rect.height}px`}
          >
            {label}
          </button>
        );
      })}
    </>
  );
}
