import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardReportsView } from "@/components/dashboard/DashboardReportsView";
import { copy } from "@/lib/copy";

export default function DashboardReportsPage() {
  const { reports } = copy.dashboard;
  return (
    <>
      <DashboardPageHeader title={reports.title} subtitle={reports.subtitle} />
      <DashboardReportsView />
    </>
  );
}
