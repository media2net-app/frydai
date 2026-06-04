export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-0 flex-1 flex-col overflow-hidden bg-[#08080f]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_40%,rgba(124,58,237,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(45,212,191,0.08),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(99,102,241,0.08),transparent_50%)]"
        aria-hidden
      />
      {children}
    </section>
  );
}
