import { DashboardConnectorsView } from "@/components/dashboard/DashboardConnectorsView";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { copy } from "@/lib/copy";

export default function DashboardConnectorsPage() {
  const { connectors } = copy.dashboard;

  return (
    <>
      <DashboardPageHeader title={connectors.title} subtitle={connectors.subtitle} />
      <DashboardConnectorsView />
    </>
  );
}
