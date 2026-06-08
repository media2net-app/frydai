import { CommandCenterIntro } from "@/components/hero/CommandCenterIntro";
import { HeroUspRail } from "@/components/hero/HeroUspRail";
import { CommandCenterBoard } from "@/components/sections/CommandCenterBoard";

export function CommandCenterSection() {
  return (
    <section
      id="demo"
      className="command-center-section hero-demo-overlap scroll-mt-20 border-t-0 pb-16 sm:pb-24 md:pb-28"
    >
      <div className="hero-demo-usp-slot">
        <HeroUspRail variant="demo-top" />
      </div>
      <div className="relative z-10 px-[60px]">
        <CommandCenterIntro />
      </div>
      <div className="command-center-board-wrap relative z-20 mx-auto max-w-7xl px-[60px]">
        <CommandCenterBoard />
      </div>
    </section>
  );
}
