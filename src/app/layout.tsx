import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { HUDProvider } from "@/context/HUDContext";
import HUD from "@/components/HUD";
import Cursor from "@/components/Cursor";
import ArchitecturalGrid from "@/components/ArchitecturalGrid";
import Script from "next/script";

// Unified Single Font Strategy (Premium Sans-Serif)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HIGHPHAUS | Global Digital Products & Experiences",
  description: "A typography-driven digital agency designing brands that lead globally. Built for performance and precision.",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
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
          <ArchitecturalGrid />
          <HUD />
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
