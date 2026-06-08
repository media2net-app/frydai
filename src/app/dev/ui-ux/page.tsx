import { UiUxReportsDashboard } from "@/app/dev/ui-ux/UiUxReportsDashboard";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function UiUxReportsPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-surface p-8 text-muted">Laden…</div>}>
      <UiUxReportsDashboard />
    </Suspense>
  );
}
