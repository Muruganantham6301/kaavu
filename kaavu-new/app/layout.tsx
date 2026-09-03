import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "KAAVU | Premium Event Venue in Bangalore",
  description:
    "Celebrate your special moments at KAAVU — a premium event venue surrounded by nature. Perfect for intimate gatherings to grand celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Light mode favicon */}
        <link
          rel="icon"
          href="/images/kaavu-logo-black.png"
          media="(prefers-color-scheme: light)"
        />
        {/* Dark mode favicon */}
        <link
          rel="icon"
          href="/images/kaavu-logo-white.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
