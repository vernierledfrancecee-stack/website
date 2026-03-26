import Link from "next/link";

const stats = [
  { value: "-40%", label: "de consommation froid" },
  { value: "< 2 ans", label: "de retour sur investissement" },
  { value: "0 €", label: "d'avance pour le client" },
];

const cibles = [
  "GMS",
  "Entrepôts frigorifiques",
  "Agroalimentaire",
  "Hôtellerie",
  "Plateformes logistiques",
];

export default function FroidSection() {
  return (
    <section id="section-froid" className="bg-[#f8f9fa] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Visuel — 40% (à gauche sur desktop) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-[#0d1e3a] rounded-3xl p-7 sm:p-8">
              {/* Icône */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                BAT-TH-134 · BAT-TH-145
              </div>

              <h3 className="text-white font-bold text-lg sm:text-xl mb-3">
                Régulation HP/BP flottante
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Optimisation automatique des pressions de condensation et
                d'évaporation selon la température extérieure.
              </p>

              {/* Chiffres */}
              <div className="space-y-3">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-white/55 text-xs">{s.label}</span>
                    <span className="text-white font-bold text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Texte — 60% (à droite sur desktop) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="inline-block text-xs font-semibold text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full mb-5">
              Froid commercial
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0d1e3a] leading-tight mb-5">
              Votre installation frigorifique consomme trop.
              <br />
              <span className="text-[#1a9e75]">Les CEE la financent.</span>
            </h2>

            <p className="text-[#2c2c2a]/65 text-base sm:text-lg leading-relaxed mb-6">
              Le froid représente jusqu'à{" "}
              <strong className="text-[#0d1e3a]">80% de la facture énergétique</strong> d'un
              commerce ou d'un entrepôt frigorifique. La régulation HP/BP flottante réduit
              cette consommation jusqu'à 40% — et les CEE couvrent l'intégralité du projet.
            </p>

            {/* Cibles */}
            <div className="mb-7">
              <div className="text-[#2c2c2a]/45 text-xs font-semibold uppercase tracking-wider mb-3">
                Secteurs concernés
              </div>
              <div className="flex flex-wrap gap-2">
                {cibles.map((c) => (
                  <span
                    key={c}
                    className="text-sm text-[#0d1e3a] font-medium bg-white border border-gray-200 rounded-full px-4 py-1.5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/simulateur"
              className="inline-flex items-center justify-center gap-2 bg-[#0d1e3a] hover:bg-[#1a3460] active:scale-95 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg"
            >
              Étudier mon installation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-[#2c2c2a]/35 text-xs mt-3">
              Étude gratuite · Sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
