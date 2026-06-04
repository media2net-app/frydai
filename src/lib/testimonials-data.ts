export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  metric?: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "I cancelled three freelancers in week one. Frydai ships competitor intel every morning before I wake up — that alone paid for the subscription.",
    author: "Marcus V.",
    role: "DTC supplements · Shopify",
    metric: "−3 freelancers",
    initials: "MV",
  },
  {
    id: "2",
    quote:
      "We went from four static ads a month to daily hook variants. Telegram approvals take seconds; Meta gets fresh creative without a agency retainer.",
    author: "Sofia K.",
    role: "Beauty brand · Meta ads",
    metric: "28 creatives / mo",
    initials: "SK",
  },
  {
    id: "3",
    quote:
      "Store listings, SEO tweaks, and price alerts run without me chasing a VA. It feels like hiring an ops lead — except it never sleeps.",
    author: "James R.",
    role: "Home goods · multi-SKU",
    metric: "24/7 ops",
    initials: "JR",
  },
];
