import Link from "next/link";

const blocs = [
  {
    num: "01",
    titre: "La loi oblige les fournisseurs d'énergie",
    texte:
      "En France, les fournisseurs d'énergie (EDF, Engie, TotalEnergies…) ont l'obligation légale de financer des économies d'énergie. S'ils ne le font pas, ils paient des pénalités. Résultat : ils préfèrent financer VOS travaux.",
    icon: "⚖️",
  },
  {
    num: "02",
    titre: "C'est un système gagnant-gagnant",
    texte:
      "Vous réalisez des économies d'énergie durables. L'État atteint ses objectifs climatiques. Les fournisseurs évitent les amendes. LEDX monte votre dossier CEE — vous bénéficiez de la prime.",
    icon: "🤝",
  },
  {
    num: "03",
    titre: "Pourquoi agir maintenant",
    texte:
      "Les montants des primes évoluent chaque année. Les fiches les plus avantageuses ont une durée de vie limitée. La rénovation globale tertiaire arrive — les premiers dossiers déposés seront les mieux dotés.",
    icon: "⏳",
  },
];

const objections = [
  {
    q: "C'est trop beau pour être vrai ?",
    a: "Non — c'est un dispositif d'État obligatoire depuis 2006. Plus de 9 000 projets ont déjà été financés via LEDX. Les CEE sont encadrés par l'ADEME et la DGEC.",
  },
  {
    q: "Il y a des frais cachés ?",
    a: "Zéro. Ni frais de dossier, ni participation aux travaux, ni remboursement différé. Les CEE couvrent l'intégralité du projet.",
  },
  {
    q: "Pourquoi LEDX fait ça gratuitement ?",
    a: "LEDX est rémunéré par la valeur des certificats CEE générés — et non par vous. Nous sommes un opérateur CEE agréé, notre modèle économique repose sur les certificats, pas sur vos honoraires.",
  },
  {
    q: "Ça engage à quoi ?",
    a: "Rien. L'étude d'éligibilité est gratuite et sans engagement. Vous décidez de continuer ou non après avoir reçu notre analyse.",
  },
];

export default function PourquoiGratuit() {
  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-[#1a9e75]/12 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Transparence totale
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-4">
            Pourquoi l'État finance vos travaux ?
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-2xl mx-auto text-sm sm:text-base">
            Beaucoup de professionnels pensent qu'il y a un piège. Il n'y en a pas.
            Voici la réalité du dispositif CEE.
          </p>
        </div>

        {/* 3 blocs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {blocs.map((b) => (
            <div key={b.titre} className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0d1e3a] text-white text-xs font-bold flex items-center justify-center">
                {b.num}
              </div>
              <span className="text-3xl mb-4 block">{b.icon}</span>
              <h3 className="font-bold text-[#0d1e3a] text-base sm:text-lg mb-3">{b.titre}</h3>
              <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{b.texte}</p>
            </div>
          ))}
        </div>

        {/* Objections */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-[#0d1e3a] text-center mb-7 sm:mb-8">
            Ils pensaient que c'était une arnaque…
          </h3>
          <div className="space-y-4">
            {objections.map((obj) => (
              <div key={obj.q} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ?
                  </div>
                  <div>
                    <p className="font-semibold text-[#0d1e3a] text-sm sm:text-base mb-2">{obj.q}</p>
                    <p className="text-[#2c2c2a]/65 text-sm leading-relaxed">{obj.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] active:scale-95 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Voir si mon projet est éligible
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-[#2c2c2a]/40 text-xs mt-3">Sans engagement · Réponse sous 24h</p>
          </div>
        </div>
      </div>
    </section>
  );
}
