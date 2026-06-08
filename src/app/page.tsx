import dynamic from "next/dynamic";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { HomepageChromeProvider } from "@/components/layout/HomepageChromeContext";
import { HeroBlock } from "@/components/hero/HeroBlock";
import { FoundingNoticeBar } from "@/components/layout/FoundingNoticeBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const CommandCenterSection = dynamic(
  () =>
    import("@/components/sections/CommandCenterSection").then((m) => ({
      default: m.CommandCenterSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="70vh" /> },
);

const CapabilitiesSection = dynamic(
  () =>
    import("@/components/sections/CapabilitiesSection").then((m) => ({
      default: m.CapabilitiesSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="60vh" /> },
);

const IntegrationsSection = dynamic(
  () =>
    import("@/components/sections/IntegrationsSection").then((m) => ({
      default: m.IntegrationsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="55vh" /> },
);

const CreativesSection = dynamic(
  () =>
    import("@/components/sections/CreativesSection").then((m) => ({
      default: m.CreativesSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="45vh" /> },
);

const TalkToOperatorSection = dynamic(
  () =>
    import("@/components/sections/TalkToOperatorSection").then((m) => ({
      default: m.TalkToOperatorSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="50vh" /> },
);

const TransformationSection = dynamic(
  () =>
    import("@/components/sections/TransformationSection").then((m) => ({
      default: m.TransformationSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="45vh" /> },
);

const HowItWorksSection = dynamic(
  () =>
    import("@/components/sections/HowItWorksSection").then((m) => ({
      default: m.HowItWorksSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="55vh" /> },
);

const ResultsSection = dynamic(
  () =>
    import("@/components/sections/ResultsSection").then((m) => ({
      default: m.ResultsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="40vh" /> },
);

const PricingSection = dynamic(
  () =>
    import("@/components/sections/PricingSection").then((m) => ({
      default: m.PricingSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="50vh" /> },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="40vh" /> },
);

const FaqSection = dynamic(
  () =>
    import("@/components/sections/FaqSection").then((m) => ({
      default: m.FaqSection,
    })),
  { loading: () => <SectionPlaceholder minHeight="45vh" /> },
);

const ScrollToTopButton = dynamic(() =>
  import("@/components/layout/ScrollToTopButton").then((m) => ({
    default: m.ScrollToTopButton,
  })),
);

export default function HomePage() {
  return (
    <CheckoutProvider>
      <HomepageChromeProvider>
        <div className="min-h-screen overflow-x-clip bg-surface text-foreground">
          <FoundingNoticeBar />
          <SiteHeader />
          <HeroBlock />
          <CommandCenterSection />
          <CapabilitiesSection />
          <IntegrationsSection />
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
        </div>
      </HomepageChromeProvider>
    </CheckoutProvider>
  );
}
