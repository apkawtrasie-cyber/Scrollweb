import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald, Anton } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Neon Craft | Andrzej Mich",
  description: "Redefiniuję interakcję. Cyfrowe wrażenia, które ożywają.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`
        ${geistSans.variable} ${geistMono.variable}
        ${oswald.variable} ${anton.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-text-main">
        {children}
      </body>
    </html>
  );
}
