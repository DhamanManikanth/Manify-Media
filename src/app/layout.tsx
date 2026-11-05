import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import ScrollProgress from "@/components/scroll/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manify Media | Premium AI Video Production & Digital Reveals",
  description:
    "We engineer high-impact AI commercial video, digital animations, and cinematic reveals at lower cost and faster speed.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-white overflow-x-hidden selection:bg-[#F00016] selection:text-white">
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
