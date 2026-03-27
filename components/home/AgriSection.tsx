import Link from "next/link";

const solutions = [
  {
    fiche: "AGRI-TH-119",
    titre: "VMC Double Flux",
    desc: "Gestion humidité et température — serres maraîchères. Renouvellement d'air optimisé sans déperdition thermique.",
    icon: "🌬️",
  },
  {
    fiche: "AGRI-TH-117",
    titre: "Déshumidificateur thermodynamique",
    desc: "Contrôle hygrométrique précis — jusqu'à 35% d'économies sur la consommation énergétique des serres.",
    icon: "💧",
  },
  {
    fiche: "AGRI-108",
    titre: "Tube thermique",
    desc: "Stockage thermique passif — 0 énergie électrique, 0 maintenance. Transfert de calories naturel entre le sol et l'air.",
    icon: "♨️",
  },
];

export default function AgriSection() {
  return (
    <section id="section-agri" className="bg-white py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-block text-xs font-semibold text-[#1a9e75] bg-[#1a9e75]/10 px-3 py-1 rounded-full mb-5">
            Agriculture
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0d1e3a] leading-tight mb-4">
                Des subventions massives pour vos serres
                <br className="hidden sm:block" />
                <span className="text-[#1a9e75]"> et bâtiments agricoles</span>
              </h2>
              <p className="text-[#2c2c2a]/65 text-base sm:text-lg leading-relaxed">
                LEDX est l'un des rares opérateurs CEE spécialisés dans l'optimisation
                énergétique agricole. 3 fiches opérationnelles, des solutions éprouvées sur
                le terrain.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "3", label: "fiches agricoles" },
                { value: "-35%", label: "économies en serre" },
                { value: "0€", label: "reste à charge" },
              ].map((s) => (
                <div key={s.label} className="bg-[#f8f9fa] border border-gray-100 rounded-xl px-3 py-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#1a9e75]">{s.value}</div>
                  <div className="text-[#2c2c2a]/50 text-xs mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 solutions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {solutions.map((s) => (
            <div
              key={s.fiche}
              className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-6 sm:p-7 hover:border-[#1a9e75]/30 hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <div className="text-[#1a9e75] text-xs font-mono font-bold mb-2">{s.fiche}</div>
              <h3 className="text-[#0d1e3a] font-bold text-base sm:text-lg mb-3">{s.titre}</h3>
              <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/simulateur"
            className="inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] active:scale-95 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-[#1a9e75]/25"
          >
            Voir les aides agricoles disponibles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="text-[#2c2c2a]/35 text-xs mt-3">Étude gratuite · Sans engagement</p>
        </div>
      </div>
    </section>
  );
}
