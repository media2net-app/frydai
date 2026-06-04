import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { DASHBOARD_REPORTS } from "@/lib/dashboard/reports-data";

const STATUS_LABELS = {
  ready: "ready",
  generating: "generating",
  scheduled: "scheduled",
} as const;

export function DashboardReportsView() {
  const t = copy.dashboard.reports;

  return (
    <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
      {DASHBOARD_REPORTS.map((report) => {
        const statusKey = STATUS_LABELS[report.status];
        const statusLabel = t[statusKey];

        return (
          <DashboardPanel key={report.id} className="flex flex-col p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                {report.type}
              </span>
              <span
                className={cx(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                  report.status === "ready" && "border-emerald-500/25 text-emerald-300",
                  report.status === "generating" && "border-amber-500/25 text-amber-300",
                  report.status === "scheduled" && "border-white/15 text-white/40",
                )}
              >
                {statusLabel}
              </span>
            </div>
            <h3 className="mt-2 font-semibold text-white">{report.title}</h3>
            <p className="mt-1 text-xs text-white/45">
              {report.date}
              {report.size ? ` · ${report.size}` : ""}
            </p>
            {report.status === "ready" ? (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10"
                >
                  {t.open}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                >
                  {t.download}
                </button>
              </div>
            ) : null}
          </DashboardPanel>
        );
      })}
    </div>
  );
}
