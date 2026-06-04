import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frydai — Your AI Operator for E-Commerce",
  description:
    "One system that runs market research, ad creatives, landing pages and store ops 24/7 — and ships the work back in Telegram.",
  openGraph: {
    title: "Frydai — Your AI Operator for E-Commerce",
    description:
      "One subscription. Twenty-four-seven. Deploy your AI operator for e-commerce.",
    url: "https://frydai.ai",
    siteName: "Frydai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
