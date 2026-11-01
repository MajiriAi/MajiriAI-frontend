import type { Metadata } from "next";
import "./globals.css";
import { Fraunces } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Blue Ocean — Build. Grow. Scale.",
  description:
    "Blue Ocean is your AI-powered business partner that helps founders plan smarter, build faster, and grow systematically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={fraunces.variable}>{children}</body>
    </html>
  );
}
