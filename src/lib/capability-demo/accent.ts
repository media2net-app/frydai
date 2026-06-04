import type { CapabilityId } from "@/lib/capabilities-data";

export type DemoAccent = "violet" | "fuchsia" | "teal" | "amber" | "indigo" | "cyan";

export const CAPABILITY_ACCENT: Record<CapabilityId, DemoAccent> = {
  research: "violet",
  adCreative: "fuchsia",
  landingPages: "teal",
  storeManagement: "amber",
  marketing: "indigo",
  more: "cyan",
};

const ACCENT_STYLES: Record<
  DemoAccent,
  {
    iconBorder: string;
    iconBg: string;
    iconText: string;
    activeCard: string;
    activeBadge: string;
    activeDot: string;
    skillBorder: string;
    skillBg: string;
    progressBar: string;
  }
> = {
  violet: {
    iconBorder: "border-violet-500/30",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-300",
    activeCard: "border-violet-400/45 bg-violet-500/10 shadow-[0_0_24px_rgba(124,58,237,0.15)]",
    activeBadge: "bg-violet-500/20 text-violet-200",
    activeDot: "bg-violet-400",
    skillBorder: "rgba(167, 139, 250, 0.45)",
    skillBg: "rgba(124, 58, 237, 0.15)",
    progressBar: "from-violet-500 to-indigo-400",
  },
  fuchsia: {
    iconBorder: "border-fuchsia-500/30",
    iconBg: "bg-fuchsia-500/10",
    iconText: "text-fuchsia-300",
    activeCard: "border-fuchsia-400/45 bg-fuchsia-500/10 shadow-[0_0_24px_rgba(217,70,239,0.15)]",
    activeBadge: "bg-fuchsia-500/20 text-fuchsia-200",
    activeDot: "bg-fuchsia-400",
    skillBorder: "rgba(232, 121, 249, 0.45)",
    skillBg: "rgba(217, 70, 239, 0.15)",
    progressBar: "from-fuchsia-500 to-violet-400",
  },
  teal: {
    iconBorder: "border-teal-500/30",
    iconBg: "bg-teal-500/10",
    iconText: "text-teal-300",
    activeCard: "border-teal-400/45 bg-teal-500/10 shadow-[0_0_24px_rgba(20,184,166,0.15)]",
    activeBadge: "bg-teal-500/20 text-teal-200",
    activeDot: "bg-teal-400",
    skillBorder: "rgba(45, 212, 191, 0.45)",
    skillBg: "rgba(20, 184, 166, 0.15)",
    progressBar: "from-teal-500 to-cyan-400",
  },
  amber: {
    iconBorder: "border-amber-500/30",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-300",
    activeCard: "border-amber-400/45 bg-amber-500/10 shadow-[0_0_24px_rgba(245,158,11,0.15)]",
    activeBadge: "bg-amber-500/20 text-amber-200",
    activeDot: "bg-amber-400",
    skillBorder: "rgba(251, 191, 36, 0.45)",
    skillBg: "rgba(245, 158, 11, 0.15)",
    progressBar: "from-amber-500 to-orange-400",
  },
  indigo: {
    iconBorder: "border-indigo-500/30",
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-300",
    activeCard: "border-indigo-400/45 bg-indigo-500/10 shadow-[0_0_24px_rgba(99,102,241,0.15)]",
    activeBadge: "bg-indigo-500/20 text-indigo-200",
    activeDot: "bg-indigo-400",
    skillBorder: "rgba(129, 140, 248, 0.45)",
    skillBg: "rgba(99, 102, 241, 0.15)",
    progressBar: "from-indigo-500 to-blue-400",
  },
  cyan: {
    iconBorder: "border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
    iconText: "text-cyan-300",
    activeCard: "border-cyan-400/45 bg-cyan-500/10 shadow-[0_0_24px_rgba(6,182,212,0.15)]",
    activeBadge: "bg-cyan-500/20 text-cyan-200",
    activeDot: "bg-cyan-400",
    skillBorder: "rgba(34, 211, 238, 0.45)",
    skillBg: "rgba(6, 182, 212, 0.15)",
    progressBar: "from-cyan-500 to-violet-400",
  },
};

export function getAccentStyles(capabilityId: CapabilityId) {
  return ACCENT_STYLES[CAPABILITY_ACCENT[capabilityId]];
}
