import type { Metadata } from "next";
import { Libre_Caslon_Text, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import StampAnywhere from "@/components/StampAnywhere";
import { ToastProvider } from "@/components/Toast";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caslon",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClearTrack — Document Clearing",
    template: "%s | ClearTrack",
  },
  description:
    "ClearTrack handles attestation, apostille, translation, and commercial document clearing — correctly the first time.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleartrack.com"),
  openGraph: {
    siteName: "ClearTrack",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caslon.variable} ${publicSans.variable}`}
    >
      <body>
        <ToastProvider>
          <ScrollBar />
          <StampAnywhere />
          <Header />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
