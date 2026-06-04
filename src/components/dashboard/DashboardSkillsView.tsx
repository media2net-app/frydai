"use client";

import { useMemo, useState } from "react";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import {
  DASHBOARD_SKILLS,
  SKILL_CATEGORIES,
  countEnabledSkills,
  type DashboardSkill,
  type SkillCategory,
} from "@/lib/dashboard/skills-data";

export function DashboardSkillsView() {
  const { skills: t } = copy.dashboard;
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState(DASHBOARD_SKILLS);

  const enabledCount = countEnabledSkills(skills);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    );
  }, [skills, query]);

  const byCategory = useMemo(() => {
    const map = new Map<SkillCategory, DashboardSkill[]>();
    for (const cat of SKILL_CATEGORIES) map.set(cat, []);
    for (const skill of filtered) {
      map.get(skill.category)?.push(skill);
    }
    return SKILL_CATEGORIES.map((cat) => ({ category: cat, items: map.get(cat) ?? [] })).filter(
      (g) => g.items.length > 0,
    );
  }, [filtered]);

  function toggleSkill(id: string) {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPanel className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-sm text-white/55">
          {t.countLabel.replace("{count}", String(enabledCount))}
        </p>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-lg border border-white/10 bg-[#0c0c14] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none ring-violet-500/40 focus:ring-2 sm:max-w-md lg:max-w-lg"
        />
      </DashboardPanel>

      {byCategory.map(({ category, items }) => (
        <section key={category}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {items.map((skill) => (
              <DashboardPanel key={skill.id} className="flex flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      {skill.isNew ? (
                        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                          {t.weeklyDrop}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{skill.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={skill.enabled}
                    onClick={() => toggleSkill(skill.id)}
                    className={cx(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      skill.enabled ? "bg-violet-600" : "bg-white/15",
                    )}
                  >
                    <span
                      className={cx(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        skill.enabled ? "left-[1.35rem]" : "left-0.5",
                      )}
                    />
                  </button>
                </div>
                <span
                  className={cx(
                    "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    skill.enabled
                      ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-300"
                      : "border-white/15 bg-white/[0.04] text-white/45",
                  )}
                >
                  <span
                    className={cx(
                      "h-1.5 w-1.5 rounded-full",
                      skill.enabled ? "bg-emerald-400" : "bg-white/35",
                    )}
                    aria-hidden
                  />
                  {skill.enabled ? t.enabled : t.disabled}
                </span>
              </DashboardPanel>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
