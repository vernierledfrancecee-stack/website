import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "Nos Solutions CEE — LEDX Énergie",
  description:
    "PAC tertiaire, froid commercial, agriculture, rénovation globale. LEDX monte vos dossiers CEE de A à Z. 0 € d'avance.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            5 fiches CEE opérationnelles
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nos solutions CEE
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            LEDX monte vos dossiers CEE de A à Z sur les fiches à plus fort potentiel d'économies.
          </p>
        </div>
      </div>

      {/* Grid produits */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Emoji + tag */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{s.emoji}</span>
                <span className={`text-xs font-semibold border rounded-full px-2.5 py-1 ${s.tagColor}`}>
                  {s.tag}
                </span>
              </div>

              {/* Fiches */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.fiches.map((f) => (
                  <span key={f} className="text-xs font-mono font-bold bg-[#0d1e3a]/8 text-[#0d1e3a] px-2 py-0.5 rounded">
                    {f}
                  </span>
                ))}
              </div>

              <h2 className="text-[#0d1e3a] font-bold text-lg mb-2 leading-snug">{s.name}</h2>
              <p className="text-[#2c2c2a]/55 text-sm leading-relaxed flex-1">{s.hero.desc.slice(0, 110)}…</p>

              {/* Stats rapides */}
              <div className="grid grid-cols-3 gap-2 mt-4 mb-5">
                {s.hero.stats.map((st) => (
                  <div key={st.label} className="bg-[#f8f9fa] rounded-xl p-2 text-center">
                    <div className="text-sm font-bold text-[#0d1e3a] leading-tight">{st.value}</div>
                    <div className="text-[10px] text-[#2c2c2a]/40 mt-0.5 leading-tight">{st.label}</div>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a9e75] group-hover:gap-2.5 transition-all">
                Voir la solution
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f8f9fa] border-t border-gray-100 py-14">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0d1e3a] mb-3">
            Quelle solution correspond à votre situation ?
          </h2>
          <p className="text-[#2c2c2a]/55 text-sm mb-6">
            Notre simulateur identifie vos fiches éligibles en 2 minutes.
          </p>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            Tester mon éligibilité gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}
