import { HeroGlobeBackground } from "@/components/hero/HeroGlobeBackground";
import { cx } from "@/lib/cx";

export function HeroSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id="hero"
      className={cx("hero-root relative flex min-h-0 flex-1 flex-col overflow-x-clip overflow-y-visible", className)}
    >
      <HeroGlobeBackground />
      <div className="hero-glow hero-glow-primary" aria-hidden />
      <div className="hero-glow hero-glow-teal" aria-hidden />
      <div className="hero-glow hero-glow-accent" aria-hidden />
      {children}
    </section>
  );
}
