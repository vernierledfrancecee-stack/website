import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d1e3a",
};
import ConditionalShell from "@/components/layout/ConditionalShell";
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
        {/* ConditionalShell hides Navbar/Footer/widgets on standalone routes
            (/simulateur-interne, /admin) that are embedded or used as internal tools. */}
        <ConditionalShell>{children}</ConditionalShell>
        <PageTracker />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-PL953BDP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-PL953BDP');
          `}
        </Script>
      </body>
    </html>
  );
}
