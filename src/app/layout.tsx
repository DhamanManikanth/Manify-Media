import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manify Media | Websites That Sell. AI Videos That Captivate.",
  description: "We build premium digital experiences and cutting-edge AI video campaigns designed to scale your brand and multiply your revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-white overflow-x-hidden selection:bg-red-500 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
