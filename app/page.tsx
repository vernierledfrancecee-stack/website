import type { Metadata } from "next";
import Link from "next/link";
import CounterSection from "@/components/home/CounterSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ProductCards from "@/components/home/ProductCards";
import HeroSlider from "@/components/home/HeroSlider";
import PourquoiGratuit from "@/components/home/PourquoiGratuit";
import TemoignagesSection from "@/components/home/TemoignagesSection";
import MiniLeadForm from "@/components/home/MiniLeadForm";

export const metadata: Metadata = {
  title: "LEDX Énergie — Éclairage LED & PAC 100% financés par les CEE",
  description:
    "Remplacez vos éclairages LED, pompes à chaleur, régulation froid — 100% financé par les Certificats d'Économies d'Énergie. 9 000+ professionnels équipés. 0 € avancé.",
};

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* ── HERO SLIDER ─────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── COMPTEURS ──────────────────────────────────────────────── */}
      <CounterSection />

      {/* ── POURQUOI C'EST GRATUIT ──────────────────────────────────── */}
      <PourquoiGratuit />

      {/* ── COMMENT ÇA MARCHE ──────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── PRODUITS ───────────────────────────────────────────────── */}
      <ProductCards />

      {/* ── TÉMOIGNAGES ────────────────────────────────────────────── */}
      <TemoignagesSection />

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
              <div key={secteur.label} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-3" role="img" aria-label={secteur.label}>{secteur.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{secteur.label}</div>
                <div className="text-white/50 text-xs">{secteur.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINI LEAD FORM ─────────────────────────────────────────── */}
      <MiniLeadForm />

      {/* ── CTA FINAL ──────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0d1e3a] mb-4">
            Simulateur d&apos;éligibilité CEE
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-xl mx-auto mb-8">
            5 questions · 2 minutes · Résultats immédiats
          </p>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 bg-[#0d1e3a] hover:bg-[#1a3460] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Démarrer le simulateur gratuit
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
