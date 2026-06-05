import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script"; // 1. Import the Next.js Script component
import "./globals.css";
import BackToTop from "@/components/BackToTop";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Avinterra Expeditions — Explore Kenya & the world.",
  description:
    "Avinterra Expeditions crafts cinematic safaris, coastal escapes and international getaways for curious travellers. From Maasai Mara to Mykonos.",
  keywords: ["Kenya safari", "tours Kenya", "Maasai Mara", "travel packages", "Avinterra"],
  openGraph: {
    title: "Avinterra Expeditions",
    description: "Cinematic safaris, coastal escapes, and international getaways.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80&auto=format&fit=crop"
        />
      </head>
      <body>
        <Script id="theme-initializer" strategy="beforeInteractive" src="/theme-init.js" />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}