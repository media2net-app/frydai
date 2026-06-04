import Link from "next/link";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy, site } from "@/lib/copy";

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.06] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

function ToggleRow({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-4 last:border-0">
      <span className="text-sm text-white/80">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 rounded-full ${on ? "bg-violet-600" : "bg-white/15"}`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "left-[1.35rem]" : "left-0.5"
          }`}
        />
      </span>
    </div>
  );
}

export function DashboardSettingsView() {
  const { settings: t } = copy.dashboard;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <DashboardPanel className="p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-white">{t.operator}</h2>
          <div className="mt-2">
            <SettingRow label={t.operatorName} value={t.operatorNameValue} />
            <SettingRow label={t.timezone} value={t.timezoneValue} />
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-white">{t.notifications}</h2>
          <div className="mt-2">
            <ToggleRow label={t.notifyTelegram} on />
            <ToggleRow label={t.notifyEmail} on={false} />
            <ToggleRow label={t.notifyProactive} on />
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-4 sm:p-6 lg:col-span-2 2xl:col-span-1">
          <h2 className="text-sm font-semibold text-white">{t.billing}</h2>
          <p className="mt-2 text-sm text-white/55">{t.billingPlan}</p>
          <a
            href={site.whopCheckout}
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t.billingCta}
          </a>
        </DashboardPanel>
      </div>

      <p className="text-xs text-white/40">
        {t.demoNote}{" "}
        <Link href="/" className="text-violet-300/90 hover:text-violet-200">
          ← Homepage
        </Link>
      </p>
    </div>
  );
}
