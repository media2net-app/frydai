import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { site } from "@/lib/copy";
import "./globals.css";

const siteUrl = new URL(site.url);
const ogTitle = "Frydai — Your AI Operator for E-Commerce";
const ogDescription =
  "One subscription. Twenty-four-seven. Deploy your AI operator for e-commerce.";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: ogTitle,
  description:
    "One system that runs market research, ad creatives, landing pages and store ops 24/7 — and ships the work back in Telegram.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: "Frydai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Frydai — AI operator for e-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='frydai-theme',t=localStorage.getItem(k),a=['dark','light'];document.documentElement.dataset.theme=a.indexOf(t)>=0?t:'light';document.documentElement.style.colorScheme=document.documentElement.dataset.theme;}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
