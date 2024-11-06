import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Analytics from "@/components/analytics";
import { Suspense } from "react";
import NavBar from "@/components/shared/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "Meeting Manifesto - The best way to plan productive cost saving meetings",
  description:
    "Meeting Manifesto is the best way to schedule (or not) meetings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KQ38QKSK" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
      <Suspense fallback={<div>Loading...</div>}>
        <Analytics />
      </Suspense>
    </html>
  );
}
