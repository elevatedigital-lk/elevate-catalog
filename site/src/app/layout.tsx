import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguagePicker from "@/components/LanguagePicker";
import HowToOrderNudge from "@/components/HowToOrderNudge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Beto | Shoe Catalog",
  description: "Browse Beto's shoe collection and inquire via WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSinhala.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-geist-sans), var(--font-sinhala), sans-serif" }}
      >
        <LanguageProvider>
          <LanguagePicker />
          {children}
          <HowToOrderNudge />
        </LanguageProvider>
      </body>
    </html>
  );
}
