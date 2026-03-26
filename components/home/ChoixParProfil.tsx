const profils = [
  {
    icon: (
      <svg className="w-10 h-10 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "Une entreprise ou collectivité",
    desc: "Bureaux, santé, hôtellerie, commerces, logistique",
    anchor: "#section-tertiaire",
    badge: "Tertiaire",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    label: "Une industrie ou GMS",
    desc: "Froid commercial, agroalimentaire, entrepôts frigorifiques",
    anchor: "#section-froid",
    badge: "Industrie & Froid",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Une exploitation agricole",
    desc: "Serres maraîchères, bâtiments agricoles, équipements",
    anchor: "#section-agri",
    badge: "Agriculture",
  },
];

export default function ChoixParProfil() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-3">
            Vous êtes ?
          </h2>
          <p className="text-[#2c2c2a]/55 max-w-lg mx-auto text-sm sm:text-base">
            Chaque profil a ses propres aides CEE disponibles.
            Sélectionnez le vôtre pour accéder à votre section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {profils.map((p) => (
            <a
              key={p.label}
              href={p.anchor}
              className="group bg-[#f8f9fa] border border-gray-100 rounded-2xl p-6 sm:p-8 hover:border-[#1a9e75]/40 hover:shadow-lg hover:bg-white transition-all duration-300 active:scale-[0.98] text-center"
            >
              {/* Badge */}
              <div className="inline-block text-xs font-semibold text-[#1a9e75] bg-[#1a9e75]/10 px-3 py-1 rounded-full mb-5">
                {p.badge}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                {p.icon}
              </div>

              {/* Label */}
              <h3 className="text-[#0d1e3a] font-bold text-base sm:text-lg mb-2 group-hover:text-[#1a9e75] transition-colors">
                {p.label}
              </h3>

              <p className="text-[#2c2c2a]/55 text-sm leading-relaxed mb-5">
                {p.desc}
              </p>

              {/* CTA */}
              <div className="inline-flex items-center gap-1.5 text-[#1a9e75] font-semibold text-sm group-hover:gap-2.5 transition-all">
                Voir mes aides
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
