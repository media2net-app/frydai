import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSkillsView } from "@/components/dashboard/DashboardSkillsView";
import { copy } from "@/lib/copy";

export default function DashboardSkillsPage() {
  const { skills } = copy.dashboard;

  return (
    <>
      <DashboardPageHeader title={skills.title} subtitle={skills.subtitle} />
      <DashboardSkillsView />
    </>
  );
}
