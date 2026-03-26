"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    id: "led",
    badge: "BAT-EQ-127 — Éclairage LED",
    title: "Remplacez vos éclairages",
    titleAccent: "100% financé,",
    titleEnd: "sans avance de trésorerie",
    subtitle: "Industrie, tertiaire, agriculture, entrepôts — LEDX Énergie gère l'étude, le matériel, la livraison et le dossier CEE. Vous ne payez rien.",
    checks: ["Industrie, tertiaire, agricole", "Étude + matériel + livraison inclus", "0 € reste à charge (CEE)"],
    cta: "Recevoir mon étude gratuite",
    accentColor: "from-amber-500/15",
  },
  {
    id: "pac",
    badge: "BAT-TH-163 — PAC Tertiaire",
    title: "Remplacez votre chaudière",
    titleAccent: "par une pompe à chaleur",
    titleEnd: "sans frais",
    subtitle: "Gaz ou fioul ? Passez à la PAC Air/Eau grâce aux CEE. Bureaux, EHPAD, hôtels, commerces, logistique — nous gérons tout le dossier.",
    checks: ["-50% sur votre facture chauffage", "Conforme Décret Tertiaire 2030", "Gaz ou fioul requis"],
    cta: "Voir si je suis éligible",
    accentColor: "from-blue-500/15",
  },
  {
    id: "agri",
    badge: "AGRI-TH-119 — Serres agricoles",
    title: "Optimisez vos serres",
    titleAccent: "agricoles",
    titleEnd: "gratuitement",
    subtitle: "VMC double flux, déshumidificateurs, tubes thermiques — LEDX finance vos équipements d'efficacité énergétique pour serres maraîchères.",
    checks: ["-35% sur votre facture énergie", "Serres maraîchères > 500 m²", "Dossier 100% pris en charge"],
    cta: "Obtenir mon devis à 0 €",
    accentColor: "from-[#1a9e75]/15",
  },
  {
    id: "froid",
    badge: "BAT-TH-134 — Froid commercial",
    title: "Régulation intelligente",
    titleAccent: "du froid commercial",
    titleEnd: "à coût zéro",
    subtitle: "Le froid peut peser 80% de votre facture électrique. La régulation HP/BP flottante réduit jusqu'à 40% votre consommation — zéro investissement pour vous.",
    checks: ["-40% consommation électrique", "ROI < 2 ans constaté", "GMS, entrepôts, agroalimentaire"],
    cta: "Obtenir mon devis à 0 €",
    accentColor: "from-cyan-500/15",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 500);
  }, [animating, current]);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0d1e3a] overflow-hidden min-h-[88vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-radial ${slide.accentColor} to-transparent blur-3xl transition-all duration-1000`} />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#1a3460]/60 blur-2xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge fiche */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
              <span className="text-[#1a9e75] text-sm font-semibold">9 000+ projets réalisés</span>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
              {slide.badge}
            </span>
          </div>

          {/* Heading */}
          <div className={`transition-all duration-500 ${animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              {slide.title}
              <br />
              <span className="text-[#1a9e75]">{slide.titleAccent}</span>
              <br />
              {slide.titleEnd}
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-2xl">
              {slide.subtitle}
            </p>

            {/* Checks */}
            <div className="flex flex-col gap-2 mb-10">
              {slide.checks.map((check) => (
                <div key={check} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#1a9e75]/20 border border-[#1a9e75]/40 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {check}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/simulateur"
                className="inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-[#1a9e75]/30 hover:shadow-xl"
              >
                {slide.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200"
              >
                Voir nos réalisations
              </Link>
            </div>

            {/* Micro-confiance */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sans engagement
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Réponse sous 24h
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Dispositif CEE officiel ADEME
              </div>
            </div>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="absolute bottom-8 left-4 sm:left-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${idx === current ? "w-8 h-2 bg-[#1a9e75]" : "w-2 h-2 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <div key={current} className="h-full bg-[#1a9e75]" style={{animation:"progress 6s linear forwards"}} />
        </div>
      </div>

      <style jsx>{`@keyframes progress { from{width:0%} to{width:100%} }`}</style>
    </section>
  );
}
