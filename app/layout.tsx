import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "./components/StructuredData";
import { Analytics } from '@vercel/analytics/next';

// Self-host fonts via next/font — eliminates render-blocking <link> to
// fonts.googleapis.com, fixes LCP, and gives us automatic preloading.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-actual",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-actual",
  display: "swap",
});
const sans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-actual",
  display: "swap",
});

const SITE_URL = "https://yinyan.news";
const SITE_NAME = "yinyan.news";
const DESCRIPTION =
  "for every hard headline in the world, an equal-weight one that's hopeful. a slow, paired ledger of the world.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "yinyan.news — the world, in pairs",
    template: "%s · yinyan.news",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Corey Musa", url: "https://coreyscodecave.com" }],
  creator: "Corey Musa",
  publisher: "yinyan.news",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "yinyan.news — the world, in pairs",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "yinyan.news",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [
        { url: `${SITE_URL}/rss.xml`, title: "yinyan.news — paired daily" },
      ],
    },
  },
  themeColor: "#0a0908",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
    >
      <body className="paper-grain min-h-screen bg-paper text-ink">
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
