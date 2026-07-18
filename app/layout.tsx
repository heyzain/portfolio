import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Zain Ali — Full-Stack Developer",
  description:
    "Portfolio of Zain Ali, a self-taught full-stack developer building practical, real-world web apps.",
  authors: [{ name: "Zain Ali" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Zain Ali — Full-Stack Developer",
    description: "Self-taught developer, four shipped projects, told as a journey in seven sections.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter+Tight:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&display=swap"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
