import en from "../../messages/en.json";

export const copy = en;

export const site = {
  whopCheckout:
    process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL ??
    "https://whop.com/187n/frydai-operator/",
  whopPlanId:
    process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "plan_0Igkygqd73dh2",
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL ?? "/login",
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? "#demo",
} as const;
