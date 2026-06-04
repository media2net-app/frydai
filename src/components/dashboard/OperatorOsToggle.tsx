"use client";

import { useDashboardOperator } from "@/components/dashboard/DashboardOperatorProvider";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

export function OperatorOsToggle() {
  const { osEnabled, setOsEnabled } = useDashboardOperator();
  const { os: t } = copy.dashboard;

  return (
    <div className="mx-2 mt-2 rounded-lg border border-white/10 bg-[#0c0c14] py-2 pl-3 pr-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <span
            className={cx(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              osEnabled ? "bg-emerald-400" : "bg-white/30",
            )}
            aria-hidden
          />
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-white/50">
            {t.label}
          </span>
        </span>

        <div
          className="grid shrink-0 grid-cols-2 gap-px rounded-md border border-white/10 bg-[#08080f] p-px"
          role="group"
          aria-label={t.label}
        >
          <button
            type="button"
            onClick={() => setOsEnabled(true)}
            aria-pressed={osEnabled}
            className={cx(
              "min-w-[2.25rem] rounded-[5px] px-2 py-1 text-[11px] font-bold tracking-wide transition-all",
              osEnabled
                ? "bg-emerald-600 text-white"
                : "text-white/40 hover:text-white/55",
            )}
          >
            {t.on}
          </button>
          <button
            type="button"
            onClick={() => setOsEnabled(false)}
            aria-pressed={!osEnabled}
            className={cx(
              "min-w-[2.25rem] rounded-[5px] px-2 py-1 text-[11px] font-bold tracking-wide transition-all",
              !osEnabled
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/55",
            )}
          >
            {t.off}
          </button>
        </div>
      </div>
    </div>
  );
}
