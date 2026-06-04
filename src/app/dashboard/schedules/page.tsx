import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSchedulesView } from "@/components/dashboard/DashboardSchedulesView";
import { copy } from "@/lib/copy";

export default function DashboardSchedulesPage() {
  const { schedules } = copy.dashboard;
  return (
    <>
      <DashboardPageHeader title={schedules.title} subtitle={schedules.subtitle} />
      <DashboardSchedulesView />
    </>
  );
}
