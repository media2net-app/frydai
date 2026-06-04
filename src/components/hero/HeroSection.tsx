export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="hero"
      className="hero-root relative flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="hero-glow hero-glow-primary" aria-hidden />
      <div className="hero-glow hero-glow-teal" aria-hidden />
      <div className="hero-glow hero-glow-accent" aria-hidden />
      {children}
    </section>
  );
}
