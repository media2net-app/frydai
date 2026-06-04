import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSettingsView } from "@/components/dashboard/DashboardSettingsView";
import { copy } from "@/lib/copy";

export default function DashboardSettingsPage() {
  const { settings } = copy.dashboard;

  return (
    <>
      <DashboardPageHeader title={settings.title} subtitle={settings.subtitle} />
      <DashboardSettingsView />
    </>
  );
}
