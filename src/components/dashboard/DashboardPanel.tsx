import { cx } from "@/lib/cx";

type DashboardPanelProps = {
  className?: string;
  children: React.ReactNode;
};

/** Shared surface — matches command center / operator UI */
export function DashboardPanel({ className, children }: DashboardPanelProps) {
  return (
    <div
      className={cx(
        "rounded-xl border border-white/10 bg-[#06060c]/80",
        className,
      )}
    >
      {children}
    </div>
  );
}
