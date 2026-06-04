import { DashboardCommandCenter } from "@/components/dashboard/overview/DashboardCommandCenter";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardStatCards } from "@/components/dashboard/DashboardStatCards";
import { copy } from "@/lib/copy";

export default function DashboardOverviewPage() {
  const { overview } = copy.dashboard;

  return (
    <div className="flex flex-col">
      <DashboardPageHeader
        title={overview.title}
        welcome={overview.welcome}
        subtitle={overview.subtitle}
      />
      <DashboardStatCards />
      <DashboardCommandCenter />
    </div>
  );
}
