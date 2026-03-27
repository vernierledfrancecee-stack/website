import Link from "next/link";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="relative bg-[#0d1e3a] overflow-hidden min-h-[100svh] flex flex-col justify-center">
      {/* Photo de fond */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        className="object-cover opacity-[0.18]"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e3a]/60 via-transparent to-[#0d1e3a]/80" />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-8 pt-6 pb-16 sm:py-28">

        {/* Credential badge */}
        <div className="flex items-center gap-2.5 mb-10 sm:mb-12">
          <div className="w-1 h-4 bg-[#1a9e75] rounded-full" />
          <span className="text-white/50 text-xs sm:text-sm font-medium tracking-widest uppercase">
            Opérateur CEE agréé · 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-7 sm:mb-8 max-w-3xl">
          Vos travaux énergétiques.
          <br />
          <span className="text-[#1a9e75]">Financés à 0 €.</span>
        </h1>

        {/* Sous-titre — une ligne, sobre */}
        <p className="text-white/50 text-base sm:text-lg max-w-xl mb-10 sm:mb-12 leading-relaxed">
          LEDX constitue vos dossiers CEE de A à Z —
          PAC, froid commercial, agriculture, rénovation globale.
        </p>

        {/* CTA unique */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-3 bg-[#1a9e75] hover:bg-[#147a5b] active:scale-95 text-white font-semibold px-7 py-4 rounded-xl text-base transition-all duration-200"
          >
            Demander une analyse gratuite
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <span className="text-white/25 text-xs">
            Réponse sous 24h · Sans engagement
          </span>
        </div>

        {/* Stats — épurées, pas dans un box */}
        <div className="flex items-center gap-8 sm:gap-14 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/10">
          {[
            { value: "9 000+", label: "projets réalisés" },
            { value: "80+", label: "départements" },
            { value: "2020", label: "fondé en" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
