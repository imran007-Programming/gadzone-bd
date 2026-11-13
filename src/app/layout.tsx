import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import SessionProviderLazy from "@/components/SessionProviderLazy";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GadZone BD — Gadgets in Bangladesh | Cash on Delivery",
  description: "Shop earbuds, smartwatches, power banks, chargers and more. Cash on Delivery across all 64 districts of Bangladesh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SessionProviderLazy>{children}</SessionProviderLazy>
      </body>
    </html>
  );
}
