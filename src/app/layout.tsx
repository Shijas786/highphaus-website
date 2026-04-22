import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { HUDProvider } from "@/context/HUDContext";
import HUD from "@/components/HUD";
import Cursor from "@/components/Cursor";
import ArchitecturalGrid from "@/components/ArchitecturalGrid";
import Script from "next/script";
import TopLoader from "@/components/TopLoader";
import { Suspense } from 'react';

// Unified Single Font Strategy (Premium Sans-Serif)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.highphaus.com"),

  title: {
    default: "HighPhaus | Digital Marketing & Web Development Agency",
    template: "%s | HighPhaus"
  },

  description:
    "HighPhaus is a high-performance digital agency specializing in SEO-driven web development, data-backed paid ads, and brand scaling systems.",

  alternates: {
    canonical: "https://www.highphaus.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "HighPhaus | Digital Agency for Scaling Founders",
    description: "Build growth systems that convert. SEO, Paid Ads, Branding and High-performance Web Development.",
    url: "https://www.highphaus.com",
    siteName: "HighPhaus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HighPhaus Digital Agency - Build to Scale"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "HighPhaus Digital Agency",
    description: "SEO, Paid Ads, Branding and High-performance Growth Systems.",
    images: ["/og-image.png"],
    creator: "@highphaus"
  },

  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Advanced Schema Markup (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.highphaus.com/#organization",
                "name": "HighPhaus",
                "url": "https://www.highphaus.com",
                "logo": "https://www.highphaus.com/favicon.png",
                "sameAs": [
                  "https://x.com/highphaus",
                  "https://www.instagram.com/highphaus",
                  "https://www.linkedin.com/in/highphaus"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://www.highphaus.com/#localbusiness",
                "name": "HighPhaus Digital Agency",
                "image": "https://www.highphaus.com/og-image.png",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kallara",
                  "addressLocality": "Trivandrum",
                  "addressRegion": "Kerala",
                  "postalCode": "695608",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 8.7512,
                  "longitude": 76.9412
                },
                "url": "https://www.highphaus.com",
                "telephone": "+917034206108",
                "priceRange": "$$"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Web Development & SEO",
                "provider": { "@id": "https://www.highphaus.com/#organization" },
                "description": "High-performance Next.js development and SEO strategies for scaling brands."
              }
            ]),
          }}
        />
      </head>
      <body 
        className="antialiased bg-hp-black selection:bg-hp-white selection:text-hp-black font-sans text-hp-white relative overflow-x-hidden"
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
        suppressHydrationWarning
      >
        <Script
          id="meta-mask-fix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && 
                   (event.reason.includes?.('MetaMask') || 
                    event.reason.message?.includes?.('MetaMask') ||
                    event.reason.toString?.().includes('MetaMask'))) {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
        <HUDProvider>
          <Suspense fallback={null}>
            <TopLoader />
          </Suspense>
          <ArchitecturalGrid />
          <HUD />
          <div className="relative w-full max-w-[100vw] overflow-x-clip">
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </div>
        </HUDProvider>
      </body>
    </html>
  );
}
