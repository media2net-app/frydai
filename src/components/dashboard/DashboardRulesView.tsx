"use client";

import { useMemo, useState } from "react";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import {
  DASHBOARD_RULES,
  RULE_CATEGORIES,
  type DashboardRule,
  type RuleCategory,
} from "@/lib/dashboard/rules-data";

export function DashboardRulesView() {
  const t = copy.dashboard.rules;
  const [rules, setRules] = useState(DASHBOARD_RULES);
  const activeCount = rules.filter((r) => r.enabled).length;

  const byCategory = useMemo(() => {
    const map = new Map<RuleCategory, DashboardRule[]>();
    for (const cat of RULE_CATEGORIES) map.set(cat, []);
    for (const rule of rules) map.get(rule.category)?.push(rule);
    return RULE_CATEGORIES.map((cat) => ({ category: cat, items: map.get(cat) ?? [] }));
  }, [rules]);

  function toggle(id: string) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  }

  return (
    <div className="space-y-6">
      <DashboardPanel className="p-4 sm:p-5">
        <p className="text-sm text-white/55">{t.countLabel.replace("{count}", String(activeCount))}</p>
      </DashboardPanel>
      {byCategory.map(({ category, items }) => (
        <section key={category}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">{category}</h2>
          <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {items.map((rule) => (
              <DashboardPanel key={rule.id} className="flex flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{rule.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{rule.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={rule.enabled}
                    onClick={() => toggle(rule.id)}
                    className={cx(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      rule.enabled ? "bg-violet-600" : "bg-white/15",
                    )}
                  >
                    <span
                      className={cx(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        rule.enabled ? "left-[1.35rem]" : "left-0.5",
                      )}
                    />
                  </button>
                </div>
                <span
                  className={cx(
                    "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    rule.enabled
                      ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-300"
                      : "border-white/15 bg-white/[0.04] text-white/45",
                  )}
                >
                  <span
                    className={cx(
                      "h-1.5 w-1.5 rounded-full",
                      rule.enabled ? "bg-emerald-400" : "bg-white/35",
                    )}
                    aria-hidden
                  />
                  {rule.enabled ? t.enabled : t.disabled}
                </span>
              </DashboardPanel>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
