type Props = {
  label: string;
};

export function HeroAvailabilityBadge({ label }: Props) {
  return (
    <div className="availability-badge hero-glass-pill inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-xs font-semibold text-foreground transition-colors sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm">
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FDB022] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FDB022] shadow-[0_0_10px_#FDB022,0_0_20px_rgba(253,176,34,0.45)]" />
      </span>
      {label}
    </div>
  );
}
