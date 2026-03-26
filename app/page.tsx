import type { Metadata } from "next";
import Link from "next/link";
import CounterSection from "@/components/home/CounterSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ProductCards from "@/components/home/ProductCards";
import HeroSlider from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: "LEDX Énergie — Financez vos projets d'efficacité énergétique à 0 €",
  description:
    "LEDX Énergie monte vos dossiers CEE de A à Z. LED, pompes à chaleur, serres agricoles, froid commercial. 9 000+ réalisations. Présent partout en France.",
};

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* ── HERO SLIDER ─────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── COMPTEURS ──────────────────────────────────────────────── */}
      <CounterSection />

      {/* ── PRODUITS ───────────────────────────────────────────────── */}
      <ProductCards />

      {/* ── COMMENT ÇA MARCHE ──────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── SECTEURS ───────────────────────────────────────────────── */}
      <section className="bg-[#0d1e3a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nos clients</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Industrie, tertiaire, agriculture, résidentiel collectif —
              nous intervenons dans tous les secteurs éligibles aux CEE.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Industrie & Logistique", icon: "🏭", desc: "Entrepôts, ateliers, plateformes" },
              { label: "Tertiaire", icon: "🏢", desc: "Bureaux, santé, hôtellerie, commerce" },
              { label: "Agriculture", icon: "🌿", desc: "Serres maraîchères, exploitations" },
              { label: "Résidentiel collectif", icon: "🏠", desc: "Copropriétés, logements sociaux" },
            ].map((secteur) => (
              <div
                key={secteur.label}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-3" role="img" aria-label={secteur.label}>{secteur.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{secteur.label}</div>
                <div className="text-white/50 text-xs">{secteur.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0d1e3a] to-[#1a3460] rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#1a9e75]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-[#1a9e75] text-sm font-semibold">
                  Simulateur gratuit — 2 minutes
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Votre projet en 2 minutes
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Répondez à 5 questions pour connaître vos droits CEE.
                Nos experts analysent votre situation et reviennent vers vous sous 24h.
              </p>
              <Link
                href="/simulateur"
                className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Démarrer le simulateur
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
