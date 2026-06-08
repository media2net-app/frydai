"use client";

type Props = {
  label: string;
};

export function HeroFoundingPill({ label }: Props) {
  return (
    <div className="hero-founding-pill hero-glass-pill inline-flex w-fit max-w-full shrink-0 items-center rounded-full border border-border-subtle px-3.5 py-1.5 text-xs font-medium text-muted-strong sm:px-4 sm:py-2 sm:text-sm">
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
