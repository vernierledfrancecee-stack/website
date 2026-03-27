import Link from "next/link";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="relative bg-[#0d1e3a] overflow-hidden sm:min-h-screen sm:flex sm:flex-col sm:justify-center">
      {/* Photo de fond */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1e3a]/90 via-[#0d1e3a]/75 to-[#1a3460]/80" />
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#1a9e75]/15 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:py-28">
        {/* Surtitre */}
        <div className="mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-2 text-[#1a9e75] text-sm sm:text-base font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a9e75] animate-pulse" />
            Certificats d'Économies d'Énergie — 2026
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-5 sm:mb-6 max-w-4xl">
          Financez vos projets énergétiques
          <br />
          <span className="text-[#1a9e75]">jusqu'à 0 € de reste à charge</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-base sm:text-xl text-white/65 leading-relaxed max-w-2xl mb-3 sm:mb-4">
          PAC, optimisation froid, rénovation globale, agriculture — LEDX monte vos
          dossiers CEE et vous accompagne jusqu'aux certificats.
        </p>

        {/* Précision légale */}
        <p className="text-xs text-[#1a9e75]/70 mb-8 sm:mb-10">
          Selon éligibilité et conditions réglementaires en vigueur
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16">
          <Link
            href="/simulateur"
            className="inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] active:scale-95 text-white font-bold px-7 sm:px-9 py-4 sm:py-5 rounded-xl text-base sm:text-lg transition-all duration-200 shadow-xl hover:shadow-[#1a9e75]/30"
          >
            Tester mon éligibilité
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/8 active:scale-95 border border-white/30 hover:border-white/50 text-white font-semibold px-7 sm:px-9 py-4 sm:py-5 rounded-xl text-base sm:text-lg transition-all duration-200"
          >
            Nos solutions
          </Link>
        </div>

        {/* Étapes process */}
        <div className="bg-white/6 border border-white/10 rounded-2xl px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            {[
              { n: "1", label: "Étude gratuite en 48 h" },
              { n: "2", label: "Dossier CEE monté par LEDX" },
              { n: "3", label: "Certificats versés, 0 € d'avance" },
            ].map((step, idx) => (
              <span key={step.n} className="flex items-center">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1a9e75] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{step.n}</span>
                  <span className="text-white/70 text-xs font-medium">{step.label}</span>
                </span>
                {idx < 2 && <span className="hidden sm:inline mx-4 text-white/20">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de défilement visuelle */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs hidden sm:block">Défiler</span>
        <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
