import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Log | Darshil Modi",
  description:
    "Darshil Modi's mission log exploring AI, space, intelligent systems, and the technology of tomorrow.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  openGraph: {
    title: "Mission Log | Darshil Modi",
    description: "Darshil Modi's mission log exploring AI, space, intelligent systems, and the technology of tomorrow.",
    url: "https://darshilmodi.in",
    type: "website",
    images: [
      {
        url: "https://darshilmodi.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Darshil Modi - Mission Log"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission Log | Darshil Modi",
    description: "Exploring AI, space, and the technology of tomorrow.",
    images: ["https://darshilmodi.in/logo.png"]
  },
  verification: {
    google: "google432f68c0a6f1e6ca"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Darshil Modi",
    "url": "https://darshilmodi.in",
    "image": "https://darshilmodi.in/logo.png",
    "description": "A student exploring the future through intelligent systems, AI, and space technology.",
    "sameAs": [
      "https://github.com",
      "https://linkedin.com"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBWEEL01Y8"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HBWEEL01Y8');`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
