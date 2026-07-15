import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "@/components/site-nav";
import { VisitorTracker } from "@/components/visitor-tracker";
import { personalInfo, resume, socialLinks } from "@/lib/portfolio-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://darshilmodi.in"),
  title: {
    default: "Darshil Modi | AI/ML-Focused Software Engineer",
    template: "%s | Darshil Modi"
  },
  description:
    "Portfolio of Darshil Modi, a B.Tech CSE (AI & ML) student building intelligent systems, multi-agent AI applications, and full-stack software products.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Darshil Modi | AI/ML-Focused Software Engineer",
    description:
      "B.Tech CSE (AI & ML) student building intelligent systems, multi-agent AI applications, and full-stack software products.",
    url: "https://darshilmodi.in",
    siteName: "Darshil Modi Portfolio",
    type: "profile",
    images: [{ url: "/logo.png", width: 1200, height: 1200, alt: "Darshil Modi" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshil Modi | AI/ML-Focused Software Engineer",
    description: "Applied AI, multi-agent systems, and full-stack product engineering.",
    images: ["/logo.png"]
  },
  verification: { google: "google432f68c0a6f1e6ca" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Darshil Modi Portfolio",
    url: personalInfo.siteUrl,
    mainEntity: {
      "@type": "Person",
      name: personalInfo.name,
      url: personalInfo.siteUrl,
      image: `${personalInfo.siteUrl}/darshil-photo.jpg`,
      jobTitle: personalInfo.role,
      address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "India" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Adani University" },
      sameAs: socialLinks.map((link) => link.href)
    }
  };

  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HBWEEL01Y8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-HBWEEL01Y8');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <VisitorTracker />
        <SiteNav />
        {children}
        <footer className="site-footer">
          <div>
            <strong>Darshil Modi</strong>
            <p>AI/ML-focused software engineer · Ahmedabad, India · <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></p>
          </div>
          <nav aria-label="Footer links">
            {socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
            <span>Discord: @{personalInfo.discord}</span>
            <a href={resume.url} target="_blank" rel="noopener noreferrer">Résumé</a>
          </nav>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
