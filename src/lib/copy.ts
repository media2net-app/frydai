import en from "../../messages/en.json";

export const copy = en;

export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://frydai-nine.vercel.app",
  whopCheckout:
    process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL ??
    "https://whop.com/187n/frydai-operator/",
  whopPlanId:
    process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "plan_0Igkygqd73dh2",
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? "#demo",
} as const;
