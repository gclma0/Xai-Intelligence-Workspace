import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Xai - Intelligence Workspace",
  description: "Interactive product experience showing raw data becoming structured intelligence, insight, and AI automation."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
