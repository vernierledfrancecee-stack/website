import Link from "next/link";

const benefices = [
  "Jusqu'à -50% sur votre facture de chauffage",
  "Conformité Décret Tertiaire anticipée",
  "DPE amélioré, valeur du patrimoine préservée",
  "0 € d'avance — LEDX porte le financement",
];

export default function PacHero() {
  return (
    <section id="section-tertiaire" className="bg-white py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Texte — 60% */}
          <div className="lg:col-span-3">
            {/* Badge produit phare */}
            <div className="inline-flex items-center gap-2 bg-[#1a9e75]/15 border border-[#1a9e75]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
              <span className="text-[#1a9e75] text-sm font-bold">PRODUIT PHARE 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1e3a] leading-tight mb-5">
              Remplacez votre chaudière gaz ou fioul.
              <br />
              <span className="text-[#1a9e75]">Payez 0 €.</span>
            </h2>

            <p className="text-[#2c2c2a]/65 text-base sm:text-lg leading-relaxed mb-7">
              La pompe à chaleur Air/Eau est aujourd'hui le levier d'économie le plus
              puissant pour les bâtiments tertiaires et résidentiels collectifs. Les CEE
              financent jusqu'à l'intégralité du projet.
            </p>

            {/* Bénéfices */}
            <ul className="space-y-3 mb-8">
              {benefices.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[#2c2c2a]/80 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-[#1a9e75]/15 border border-[#1a9e75]/35 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {b}
                </li>
              ))}
            </ul>

            {/* Pills fiches */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/solutions#pac-tertiaire"
                className="inline-flex items-center gap-1.5 bg-[#0d1e3a]/8 hover:bg-[#0d1e3a]/15 text-[#0d1e3a] text-xs font-bold px-3.5 py-2 rounded-full transition-colors"
              >
                BAT-TH-163 · Tertiaire
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/solutions#pac-residentiel"
                className="inline-flex items-center gap-1.5 bg-[#0d1e3a]/8 hover:bg-[#0d1e3a]/15 text-[#0d1e3a] text-xs font-bold px-3.5 py-2 rounded-full transition-colors"
              >
                BAR-TH-179 · Résidentiel collectif
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <Link
              href="/simulateur"
              className="inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] active:scale-95 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-[#1a9e75]/25"
            >
              Vérifier mon éligibilité PAC
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-[#2c2c2a]/35 text-xs mt-3">
              Étude gratuite · Sans engagement · Réponse sous 24h
            </p>
          </div>

          {/* Visuel — 40% */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#0d1e3a] to-[#1a3460] rounded-3xl p-7 sm:p-8">
              {/* Stats clés */}
              <div className="text-[#1a9e75] text-xs font-bold uppercase tracking-widest mb-5">
                Résultats observés
              </div>
              <div className="space-y-4 mb-7">
                {[
                  { value: "-50% à -70%", label: "sur la facture chauffage" },
                  { value: "Jusqu'à 90%", label: "du projet financé par les CEE" },
                  { value: "0 €", label: "d'avance pour votre trésorerie" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/6 border border-white/10 rounded-xl px-5 py-4">
                    <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Profils éligibles */}
              <div className="border-t border-white/10 pt-5">
                <div className="text-white/40 text-xs mb-3">Profils éligibles</div>
                <div className="flex flex-wrap gap-2">
                  {["🏢 Bureaux", "🏥 Santé", "🏨 Hôtels", "🏪 Commerces", "🏗️ Logistique", "🏠 Copropriétés"].map((tag) => (
                    <span key={tag} className="text-xs text-white/60 bg-white/8 border border-white/10 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
