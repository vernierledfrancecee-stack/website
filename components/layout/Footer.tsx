import Link from "next/link";
import LedxLogo from "@/components/LedxLogo";

const fichesLinks = [
  { href: "/solutions/pac-tertiaire", label: "PAC Tertiaire (BAT-TH-163)" },
  { href: "/solutions/pac-residentiel", label: "PAC Résidentiel (BAR-TH-179)" },
  { href: "/solutions/froid-commercial", label: "Régulation Froid (BAT-TH-134/145)" },
  { href: "/solutions/agriculture", label: "Agriculture Serres" },
];

const siteLinks = [
  { href: "/", label: "Accueil" },
  { href: "/simulateur", label: "Simulateur CEE" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1e3a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Colonne 1 — Identité */}
          <div className="lg:col-span-1">
            <LedxLogo variant="light" className="text-sm mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Développeur d&apos;opérations CEE — nous montons vos dossiers de A à Z.
              9 000+ projets réalisés partout en France.
            </p>
          </div>

          {/* Colonne 2 — Nos Fiches CEE */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Nos Fiches CEE
            </h3>
            <ul className="space-y-2">
              {fichesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#1a9e75] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#1a9e75] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33159392571"
                  className="flex items-start gap-2 text-white/60 hover:text-white text-sm transition-colors group"
                >
                  <svg className="w-4 h-4 mt-0.5 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  01 59 39 25 71
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@ledxenergie.com"
                  className="flex items-start gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <svg className="w-4 h-4 mt-0.5 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@ledxenergie.com
                </a>
              </li>
              <li>
                <address className="flex items-start gap-2 text-white/60 text-sm not-italic">
                  <svg className="w-4 h-4 mt-0.5 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  25 rue de Ponthieu<br />75008 Paris
                </address>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/simulateur"
                className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
              >
                Tester mon éligibilité CEE
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {new Date().getFullYear()} LEDX Énergie SAS — 25 rue de Ponthieu, 75008 Paris.
            Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Mentions légales
            </Link>
            <Link href="/mentions-legales#confidentialite" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales#cookies" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
