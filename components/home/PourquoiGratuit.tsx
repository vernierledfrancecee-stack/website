import Link from "next/link";

const etapes = [
  {
    emoji: "🏭",
    title: "Les pollueurs financent",
    text: "Les fournisseurs d'énergie (EDF, TotalEnergies…) sont obligés par l'État de financer des travaux d'économies d'énergie chez leurs clients professionnels.",
  },
  {
    emoji: "📋",
    title: "Un dispositif légal depuis 2006",
    text: "Le programme CEE (Certificats d'Économies d'Énergie) est encadré par l'ADEME. Ce n'est pas une subvention — c'est une obligation légale des énergéticiens.",
  },
  {
    emoji: "🔄",
    title: "LEDX fait le lien",
    text: "Nous montons votre dossier, coordonnons l'installation et obtenons les certificats en votre nom. La prime CEE couvre 100% du projet. Vous ne payez rien.",
  },
];

const objections = [
  {
    q: "C'est trop beau pour être vrai ?",
    a: "Non — c'est un dispositif d'État obligatoire depuis 2006. Plus de 9 000 professionnels ont déjà bénéficié de cette aide via LEDX Énergie.",
  },
  {
    q: "Il y a des frais cachés ?",
    a: "Zéro. Ni frais de dossier, ni participation aux travaux, ni remboursement différé. Le financement CEE couvre l'intégralité du projet.",
  },
  {
    q: "Pourquoi LEDX le fait gratuitement ?",
    a: "LEDX est rémunéré par la valeur des certificats CEE générés par votre projet — et non par vous. C'est notre modèle économique.",
  },
  {
    q: "Ça engage à quoi ?",
    a: "Rien. L'étude d'éligibilité est gratuite et sans engagement. Vous décidez de continuer ou non après avoir reçu notre analyse.",
  },
];

export default function PourquoiGratuit() {
  return (
    <section className="bg-[#f8f9fa] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1a9e75]/15 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Transparence totale
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-4">
            Pourquoi c&apos;est vraiment gratuit ?
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-2xl mx-auto">
            Beaucoup de professionnels pensent qu&apos;il y a un piège. Il n&apos;y en a pas.
            Voici la réalité du dispositif CEE en 3 points.
          </p>
        </div>

        {/* 3 étapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {etapes.map((e, idx) => (
            <div key={e.title} className="bg-white rounded-2xl p-7 border border-gray-100 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0d1e3a] text-white text-sm font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <div className="text-4xl mb-4">{e.emoji}</div>
              <h3 className="font-bold text-[#0d1e3a] text-lg mb-3">{e.title}</h3>
              <p className="text-[#2c2c2a]/65 text-sm leading-relaxed">{e.text}</p>
            </div>
          ))}
        </div>

        {/* Objections / FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#0d1e3a] text-center mb-8">
            Ils pensaient que c&apos;était une arnaque…
          </h3>
          <div className="space-y-4">
            {objections.map((obj) => (
              <div key={obj.q} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ?
                  </div>
                  <div>
                    <p className="font-semibold text-[#0d1e3a] mb-2">{obj.q}</p>
                    <p className="text-[#2c2c2a]/65 text-sm leading-relaxed">{obj.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Voir si je suis éligible
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
