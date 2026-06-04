import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardAgentsView } from "@/components/dashboard/DashboardAgentsView";
import { copy } from "@/lib/copy";

export default function DashboardAgentsPage() {
  const { agents } = copy.dashboard;
  return (
    <>
      <DashboardPageHeader title={agents.title} subtitle={agents.subtitle} />
      <DashboardAgentsView />
    </>
  );
}
