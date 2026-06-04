import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardRulesView } from "@/components/dashboard/DashboardRulesView";
import { copy } from "@/lib/copy";

export default function DashboardRulesPage() {
  const { rules } = copy.dashboard;
  return (
    <>
      <DashboardPageHeader title={rules.title} subtitle={rules.subtitle} />
      <DashboardRulesView />
    </>
  );
}
