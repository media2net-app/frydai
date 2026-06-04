import { cx } from "@/lib/cx";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div
      className={cx(
        "glass-card rounded-2xl border border-border-subtle bg-glass shadow-[0_8px_32px_var(--theme-glass-shadow)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
