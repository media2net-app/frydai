import type { Metadata } from "next";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { ViktorLandingPage } from "@/components/viktor/ViktorLandingPage";

export const metadata: Metadata = {
  title: "Frydai — Viktor style preview",
  description: "Compare Frydai content in a Viktor-inspired landing page layout.",
  robots: { index: false, follow: false },
};

export default function ViktorPreviewPage() {
  return (
    <CheckoutProvider>
      <ViktorLandingPage />
    </CheckoutProvider>
  );
}
