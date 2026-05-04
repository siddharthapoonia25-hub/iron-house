import type { Metadata } from "next";
import { Fraunces, Italiana, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-italiana",
  weight: "400",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Iron House — Mumbai's Boutique Gym in Bandra West",
  description:
    "Boxing, strength training, yoga, HIIT, Pilates. Premium boutique gym in Bandra West Mumbai. Book your free trial.",
  openGraph: {
    title: "Iron House — Mumbai's Boutique Gym in Bandra West",
    description:
      "Boxing, strength training, yoga, HIIT, Pilates. Premium boutique gym in Bandra West Mumbai. Book your free trial.",
    type: "website",
    locale: "en_IN",
    siteName: "Iron House",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${italiana.variable} ${manrope.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <SmoothScroll />
        <CustomCursor />
        <PageLoader />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
