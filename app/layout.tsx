import type { Metadata } from "next";
import "./globals.css";

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
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Geist:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="paper-grain min-h-screen bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
