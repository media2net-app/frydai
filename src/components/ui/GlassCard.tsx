import { cx } from "@/lib/cx";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
