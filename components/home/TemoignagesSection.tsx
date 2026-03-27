const temoignages = [
  {
    nom: "Directeur technique",
    societe: "Entrepôt logistique — Rhône-Alpes",
    secteur: "LED",
    texte: "On était sceptiques — une offre à 0€ ça paraît impossible. Mais LEDX a géré tout le dossier, les 420 luminaires ont été remplacés et on économise 68% sur notre facture. Zéro avance de notre part.",
    note: 5,
  },
  {
    nom: "Gérant",
    societe: "GMS — Occitanie",
    secteur: "Froid",
    texte: "Le froid représentait 75% de notre consommation. Après installation de la régulation, on est à -38%. Le retour sur investissement était à 0€ pour nous — ça change tout.",
    note: 5,
  },
  {
    nom: "Responsable patrimoine",
    societe: "Résidence sociale — Normandie",
    secteur: "PAC",
    texte: "58 logements en chauffage collectif gaz. Le passage en PAC semblait inaccessible financièrement. LEDX a tout monté. Nos locataires ont un chauffage plus propre, et la copropriété n'a rien déboursé.",
    note: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TemoignagesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-[#0d1e3a]/8 text-[#0d1e3a] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Ils nous font confiance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-3">
            9 000+ professionnels accompagnés
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-xl mx-auto text-sm sm:text-base">
            Industrie, tertiaire, agriculture — voici ce qu&apos;ils disent.
          </p>
        </div>

        {/* Mobile : scroll horizontal snappé */}
        <div className="sm:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {temoignages.map((t) => (
            <div
              key={t.societe}
              className="snap-start shrink-0 w-[85vw] bg-[#f8f9fa] rounded-2xl p-5 border border-gray-100 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <Stars count={t.note} />
                <span className="text-xs font-semibold text-[#1a9e75] bg-[#1a9e75]/10 px-2.5 py-1 rounded-full">
                  {t.secteur}
                </span>
              </div>
              <p className="text-[#2c2c2a]/70 text-sm leading-relaxed flex-1 mb-4 italic">
                &ldquo;{t.texte}&rdquo;
              </p>
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-[#0d1e3a] text-sm">{t.nom}</p>
                <p className="text-[#2c2c2a]/50 text-xs">{t.societe}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop : grille */}
        <div className="hidden sm:grid grid-cols-3 gap-6">
          {temoignages.map((t) => (
            <div key={t.societe} className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.note} />
                <span className="text-xs font-semibold text-[#1a9e75] bg-[#1a9e75]/10 px-2.5 py-1 rounded-full">
                  {t.secteur}
                </span>
              </div>
              <p className="text-[#2c2c2a]/70 text-sm leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t.texte}&rdquo;
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-[#0d1e3a] text-sm">{t.nom}</p>
                <p className="text-[#2c2c2a]/50 text-xs">{t.societe}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 sm:gap-8 py-6 sm:py-8 border-t border-gray-100">
          {[
            { value: "9 000+", label: "sites équipés" },
            { value: "100%", label: "dossiers pris en charge" },
            { value: "0 €", label: "avancé par nos clients" },
            { value: "24h", label: "délai de réponse" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#0d1e3a]">{s.value}</div>
              <div className="text-xs text-[#2c2c2a]/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
