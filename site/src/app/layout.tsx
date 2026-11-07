import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguagePicker from "@/components/LanguagePicker";
import HowToOrderNudge from "@/components/HowToOrderNudge";
import MotifDefs from "@/components/MotifDefs";
import MotionInit from "@/components/MotionInit";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Beto | Handmade Shoes, Sri Lanka",
  description: "One maker's craft, in every pair. Browse Beto's shoes and inquire via WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSinhala.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), var(--font-sinhala), sans-serif" }}
      >
        <MotifDefs />
        <MotionInit />
        <LanguageProvider>
          <LanguagePicker />
          {children}
          <HowToOrderNudge />
        </LanguageProvider>
      </body>
    </html>
  );
}
