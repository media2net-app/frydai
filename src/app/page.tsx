import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { HomepageChromeProvider } from "@/components/layout/HomepageChromeContext";
import { HeroBlock } from "@/components/hero/HeroBlock";
import { FoundingNoticeBar } from "@/components/layout/FoundingNoticeBar";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { CreativesSection } from "@/components/sections/CreativesSection";
import { CommandCenterSection } from "@/components/sections/CommandCenterSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TalkToOperatorSection } from "@/components/sections/TalkToOperatorSection";
import { TransformationSection } from "@/components/sections/TransformationSection";

export default function HomePage() {
  return (
    <CheckoutProvider>
      <HomepageChromeProvider>
      <div className="min-h-screen overflow-x-clip bg-surface text-foreground">
        <FoundingNoticeBar />
        <SiteHeader withNotice />
        <HeroBlock />
        <CommandCenterSection />
        <CapabilitiesSection />
        <CreativesSection />
        <TalkToOperatorSection />
        <TransformationSection />
        <HowItWorksSection />
        <ResultsSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <SiteFooter />
        <ScrollToTopButton />
        <ThemeSwitcher />
      </div>
      </HomepageChromeProvider>
    </CheckoutProvider>
  );
}
