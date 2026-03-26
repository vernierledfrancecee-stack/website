import Link from "next/link";

interface Product {
  id: string;
  code: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

const products: Product[] = [
  {
    id: "led",
    code: "BAT-EQ-127",
    title: "LED Intérieur",
    description:
      "Remplacement de vos sources lumineuses par des LED haute performance. Économies jusqu'à -70%. Tous secteurs tertiaires, industriels et agricoles.",
    href: "/solutions#led",
    icon: "💡",
    category: "Éclairage",
  },
  {
    id: "pac-tertiaire",
    code: "BAT-TH-163",
    title: "PAC Tertiaire",
    description:
      "Remplacement chaudière gaz/fioul par PAC Air/Eau. Bureaux, santé, hôtels, commerces, logistique, collectivités.",
    href: "/solutions#pac-tertiaire",
    icon: "🏢",
    category: "Chauffage",
  },
  {
    id: "pac-residentiel",
    code: "BAR-TH-179",
    title: "PAC Résidentiel",
    description:
      "Remplacement chaufferie collective gaz/fioul. Copropriétés, résidences sociales, bailleurs, SCI.",
    href: "/solutions#pac-residentiel",
    icon: "🏠",
    category: "Chauffage collectif",
  },
  {
    id: "froid",
    code: "BAT-TH-134/145",
    title: "Régulation Froid",
    description:
      "Régulation HP/BP flottante pour installations frigorifiques. GMS, agroalimentaire, entrepôts. Économies jusqu'à -40%.",
    href: "/solutions#regulation-froid",
    icon: "❄️",
    category: "Froid commercial",
  },
  {
    id: "agri",
    code: "AGRI-108/117/119",
    title: "Agriculture & Serres",
    description:
      "VMC double flux, déshumidificateurs thermodynamiques et tubes thermiques pour serres maraîchères.",
    href: "/solutions#agri",
    icon: "🌿",
    category: "Agriculture",
  },
];

export default function ProductCards() {
  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#1a9e75]/10 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Nos solutions CEE
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-4">
            6 fiches CEE maîtrisées
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-2xl mx-auto text-lg">
            Nous intervenons sur les fiches à plus fort potentiel d&apos;économies pour
            vos bâtiments tertiaires, industriels et agricoles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#1a9e75]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-2xl shrink-0 group-hover:bg-[#1a9e75]/10 transition-colors">
                  {product.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-semibold px-2 py-0.5 rounded">
                      {product.code}
                    </span>
                    <span className="text-[#2c2c2a]/40 text-xs">{product.category}</span>
                  </div>
                  <h3 className="text-[#0d1e3a] font-bold text-lg mb-2 group-hover:text-[#1a9e75] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-[#1a9e75] text-sm font-semibold">
                En savoir plus
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}

          {/* Card Rénovation Globale — Coming Soon */}
          <Link
            href="/solutions#renov-globale"
            className="group bg-[#0d1e3a] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
              <span className="text-[#1a9e75] text-xs font-bold uppercase tracking-wider">
                Bientôt disponible
              </span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Rénovation Globale</h3>
            <p className="text-[#1a9e75] text-xs font-medium mb-3">
              Bouquet multi-postes tertiaire — jusqu&apos;à 60%
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              La fiche qui récompense l&apos;ambition énergétique globale. Confirmée ATEE fév. 2026.
            </p>
            <div className="flex items-center gap-1 text-[#1a9e75] text-sm font-semibold">
              Être alerté
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card CTA simulateur */}
          <Link
            href="/simulateur"
            className="group bg-gradient-to-br from-[#1a3460] to-[#0d2a50] rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
              <span className="text-[#1a9e75] text-xs font-semibold uppercase tracking-wide">
                Gratuit
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">
              Pas sûr de votre éligibilité ?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Notre simulateur intelligent détermine vos droits CEE en 2 minutes, sans engagement.
            </p>
            <div className="flex items-center gap-2 text-[#1a9e75] font-semibold text-sm">
              Démarrer le simulateur
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
