import type { Metadata } from "next";
import { Baloo_2, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderLazy from "@/components/SessionProviderLazy";

const balooSans = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
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
      className={`${balooSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SessionProviderLazy>{children}</SessionProviderLazy>
      </body>
    </html>
  );
}
