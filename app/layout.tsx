import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d1e3a",
};
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAgent from "@/components/ChatAgent";
import PageTracker from "@/components/PageTracker";

export const metadata: Metadata = {
  title: {
    default: "LEDX Énergie — Certificats d'Économies d'Énergie (CEE)",
    template: "%s | LEDX Énergie",
  },
  description:
    "LEDX Énergie monte vos dossiers CEE de A à Z — LED, pompes à chaleur, serres agricoles, froid commercial. 9 000+ projets réalisés en France. Financement à 0 €.",
  keywords: [
    "CEE",
    "certificats économies énergie",
    "LED énergie",
    "pompe à chaleur CEE",
    "BAT-EQ-127",
    "BAT-TH-163",
    "BAR-TH-179",
    "dossier CEE",
    "efficacité énergétique",
    "LEDX énergie",
  ],
  authors: [{ name: "LEDX Énergie" }],
  creator: "LEDX Énergie",
  publisher: "LEDX Énergie",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ledxenergie.com",
    siteName: "LEDX Énergie",
    title: "LEDX Énergie — Financez vos projets d'efficacité énergétique à 0 €",
    description:
      "LEDX Énergie monte vos dossiers CEE de A à Z — LED, pompes à chaleur, serres agricoles, froid commercial. 9 000+ projets en France.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ledxenergie.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatAgent />
        <PageTracker />
      </body>
    </html>
  );
}
