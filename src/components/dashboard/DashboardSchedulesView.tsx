"use client";

import { useState } from "react";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { DASHBOARD_SCHEDULES } from "@/lib/dashboard/schedules-data";

export function DashboardSchedulesView() {
  const t = copy.dashboard.schedules;
  const [schedules, setSchedules] = useState(DASHBOARD_SCHEDULES);

  function toggle(id: string) {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
      {schedules.map((schedule) => (
        <DashboardPanel key={schedule.id} className="flex flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-white">{schedule.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{schedule.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/40">
                <span className="rounded-md bg-white/[0.04] px-2 py-0.5">{schedule.frequency}</span>
                <span className="rounded-md bg-white/[0.04] px-2 py-0.5">{schedule.time}</span>
                <span className="rounded-md bg-white/[0.04] px-2 py-0.5">{schedule.channel}</span>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={schedule.enabled}
              onClick={() => toggle(schedule.id)}
              className={cx(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                schedule.enabled ? "bg-violet-600" : "bg-white/15",
              )}
            >
              <span
                className={cx(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  schedule.enabled ? "left-[1.35rem]" : "left-0.5",
                )}
              />
            </button>
          </div>
          <span
            className={cx(
              "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
              schedule.enabled
                ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-300"
                : "border-white/15 bg-white/[0.04] text-white/45",
            )}
          >
            <span
              className={cx(
                "h-1.5 w-1.5 rounded-full",
                schedule.enabled ? "bg-emerald-400" : "bg-white/35",
              )}
              aria-hidden
            />
            {schedule.enabled ? t.enabled : t.disabled}
          </span>
        </DashboardPanel>
      ))}
    </div>
  );
}
