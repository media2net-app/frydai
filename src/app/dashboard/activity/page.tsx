import { DashboardActivityView } from "@/components/dashboard/DashboardActivityView";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { copy } from "@/lib/copy";

export default function DashboardActivityPage() {
  const { activity } = copy.dashboard;

  return (
    <>
      <DashboardPageHeader title={activity.title} subtitle={activity.subtitle} />
      <DashboardActivityView />
    </>
  );
}
