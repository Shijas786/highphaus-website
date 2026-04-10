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
  metadataBase: new URL('https://highphaus.agency'),
  title: "HIGHPHAUS ",
  description: "A typography-driven digital agency designing brands that lead globally. Built for performance and precision.",
  alternates: {
    canonical: '/',
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
    title: "HIGHPHAUS ",
    description: "A typography-driven digital agency designing brands that lead globally.",
    url: 'https://highphaus.agency',
    siteName: 'HIGHPHAUS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HIGHPHAUS ",
    description: "Designing brands that lead globally.",
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`} suppressHydrationWarning>
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
