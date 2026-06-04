import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { DASHBOARD_STATS } from "@/lib/dashboard/stats";

export function DashboardStatCards() {
  const { overview } = copy.dashboard;

  const items = [
    { label: overview.stats.activeTasks, value: String(DASHBOARD_STATS.activeTasks) },
    {
      label: overview.stats.skillsEnabled,
      value: `${DASHBOARD_STATS.skillsEnabled}/${DASHBOARD_STATS.skillsTotal}`,
    },
    {
      label: overview.stats.connectors,
      value: `${DASHBOARD_STATS.connectorsLive}/${DASHBOARD_STATS.connectorsTotal}`,
    },
    { label: overview.stats.reportsWeek, value: String(DASHBOARD_STATS.reportsWeek) },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <DashboardPanel key={item.label} className="p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-white/45">{item.label}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-white sm:text-3xl">
            {item.value}
          </p>
        </DashboardPanel>
      ))}
    </div>
  );
}
