import Link from "next/link";

const timeline = [
  { year: "2020", label: "Lancement aides LED", active: false },
  { year: "2021–2024", label: "9 000+ projets réalisés", active: false },
  { year: "2025", label: "Fin du programme", active: false },
  { year: "2026", label: "Nouvelles aides disponibles", active: true },
];

export default function LedSocialProof() {
  return (
    <section className="bg-[#0d1e3a] py-16 sm:py-24 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#1a9e75]/8 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-amber-300 text-sm font-bold">Preuve de résultats</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 sm:mb-8">
          +9 000 sites équipés.
          <br />
          <span className="text-amber-400">Ils ont agi. Ils ont économisé.</span>
        </h2>

        <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
          Pendant plusieurs années, des milliers d'entreprises ont modernisé leur éclairage
          LED à 0 €, grâce aux Certificats d'Économies d'Énergie.{" "}
          <strong className="text-white">Ce programme est aujourd'hui terminé.</strong>
        </p>

        <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 sm:mb-14 max-w-2xl mx-auto">
          Ceux qui ont agi ont réalisé des économies massives. Les autres ont attendu.
        </p>

        {/* Timeline */}
        <div className="relative mb-10 sm:mb-14">
          {/* Ligne de connexion desktop */}
          <div className="hidden sm:block absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-white/10" />

          {/* Mobile : liste verticale */}
          <div className="sm:hidden flex flex-col gap-0 max-w-xs mx-auto">
            {timeline.map((t, idx) => (
              <div key={t.year} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    t.active ? "bg-[#1a9e75] border-[#1a9e75]" : "bg-[#0d1e3a] border-white/20"
                  }`}>
                    {t.active
                      ? <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      : <div className="w-2 h-2 rounded-full bg-white/25" />}
                  </div>
                  {idx < timeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-white/10 my-1" />
                  )}
                </div>
                <div className="pt-1 pb-4">
                  <div className={`text-sm font-bold ${t.active ? "text-[#1a9e75]" : "text-white/50"}`}>{t.year}</div>
                  <div className={`text-xs leading-snug ${t.active ? "text-white font-medium" : "text-white/35"}`}>{t.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop : grille horizontale */}
          <div className="hidden sm:grid grid-cols-4 gap-0">
            {timeline.map((t, idx) => (
              <div key={t.year} className="relative flex flex-col items-center">
                {idx < timeline.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-white/10" />
                )}
                {/* Dot */}
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-3 relative z-10 ${
                    t.active
                      ? "bg-[#1a9e75] border-[#1a9e75] shadow-lg shadow-[#1a9e75]/40"
                      : "bg-[#0d1e3a] border-white/20"
                  }`}
                >
                  {t.active ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/25" />
                  )}
                </div>
                <div
                  className={`text-sm font-bold mb-1 ${
                    t.active ? "text-[#1a9e75]" : "text-white/50"
                  }`}
                >
                  {t.year}
                </div>
                <div
                  className={`text-xs text-center leading-snug ${
                    t.active ? "text-white font-medium" : "text-white/35"
                  }`}
                >
                  {t.label}
                </div>
              </div>
            ))}
          </div>
          </div>

        {/* Punchline */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-8 py-5 sm:py-6 mb-8 sm:mb-10 max-w-2xl mx-auto">
          <p className="text-white/80 text-base sm:text-lg italic leading-relaxed mb-2">
            "Les aides fonctionnent par cycles.
            <br className="hidden sm:block" />
            Nous sommes au début d'un nouveau."
          </p>
        </div>

        {/* Encadré vert offres actuelles */}
        <div className="bg-[#1a9e75] rounded-2xl px-6 py-4 mb-8 sm:mb-10 max-w-xl mx-auto">
          <p className="text-white font-bold text-sm sm:text-base">
            Aujourd'hui : PAC · Froid · Agriculture · Rénovation globale
          </p>
        </div>

        <Link
          href="/simulateur"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 active:scale-95 text-[#0d1e3a] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg"
        >
          Voir les aides disponibles en 2026
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
