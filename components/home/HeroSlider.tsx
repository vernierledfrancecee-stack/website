"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    id: "led",
    badge: "BAT-EQ-127",
    title: "Financez vos projets",
    titleAccent: "d'efficacité énergétique",
    titleEnd: "à 0 €",
    subtitle:
      "LEDX Énergie monte vos dossiers CEE de A à Z — LED, pompes à chaleur, serres agricoles, froid commercial. Vous ne payez rien, nous orchestrons tout.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="50" r="28" stroke="#1a9e75" strokeWidth="3" strokeOpacity="0.6"/>
        <circle cx="60" cy="50" r="18" fill="#1a9e75" fillOpacity="0.15"/>
        <path d="M60 28v6M60 66v6M38 50h6M76 50h6M44 34l4 4M72 62l4 4M44 66l4-4M72 38l4-4" stroke="#1a9e75" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7"/>
        <path d="M53 46a8 8 0 0114 0c0 4-2 7-4 9v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4c-2-2-4-5-4-9z" fill="#1a9e75" fillOpacity="0.8"/>
        <rect x="55" y="60" width="10" height="3" rx="1" fill="#1a9e75" fillOpacity="0.5"/>
        <circle cx="60" cy="50" r="40" stroke="#1a9e75" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4"/>
        <circle cx="60" cy="50" r="52" stroke="#1a9e75" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="4 4"/>
      </svg>
    ),
    facts: ["-70% sur la facture", "50 000h de durée de vie", "Tous secteurs"],
    accentColor: "from-amber-500/20",
  },
  {
    id: "pac",
    badge: "BAT-TH-163",
    title: "Remplacez votre chaudière",
    titleAccent: "par une pompe à chaleur",
    titleEnd: "sans frais",
    subtitle:
      "Gaz ou fioul ? Passez à la PAC Air/Eau grâce aux CEE. Bureaux, EHPAD, hôtels, commerces, logistique — nous gérons tout le dossier.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <rect x="30" y="55" width="60" height="40" rx="4" stroke="#1a9e75" strokeWidth="2.5" strokeOpacity="0.6"/>
        <rect x="38" y="25" width="44" height="30" rx="4" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.4"/>
        <path d="M30 55L38 25M90 55L82 25" stroke="#1a9e75" strokeWidth="1.5" strokeOpacity="0.3"/>
        <circle cx="60" cy="75" r="12" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.7"/>
        <path d="M60 63v4M60 83v4M48 75h4M68 75h4" stroke="#1a9e75" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M52 67l3 3M65 79l3 3M52 83l3-3M65 71l3-3" stroke="#1a9e75" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
        <circle cx="60" cy="75" r="5" fill="#1a9e75" fillOpacity="0.6"/>
        <path d="M45 40h30M45 47h20" stroke="#1a9e75" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3"/>
        <circle cx="60" cy="75" r="30" stroke="#1a9e75" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3 5"/>
      </svg>
    ),
    facts: ["-50% facture chauffage", "Secteur tertiaire", "Gaz ou fioul requis"],
    accentColor: "from-blue-500/20",
  },
  {
    id: "agri",
    badge: "AGRI-TH-119",
    title: "Optimisez vos serres",
    titleAccent: "agricoles",
    titleEnd: "gratuitement",
    subtitle:
      "VMC double flux, déshumidificateurs thermodynamiques, tubes thermiques — LEDX Énergie finance vos équipements d'efficacité énergétique pour serres maraîchères.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <path d="M20 80 L60 30 L100 80 Z" stroke="#1a9e75" strokeWidth="2.5" strokeOpacity="0.5" fill="none"/>
        <path d="M35 80 L60 45 L85 80" stroke="#1a9e75" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
        <line x1="20" y1="80" x2="100" y2="80" stroke="#1a9e75" strokeWidth="2.5" strokeOpacity="0.5"/>
        <rect x="48" y="65" width="24" height="15" rx="1" stroke="#1a9e75" strokeWidth="1.5" strokeOpacity="0.4"/>
        <path d="M60 30 Q70 50 60 65 Q50 50 60 30z" fill="#1a9e75" fillOpacity="0.3"/>
        <path d="M60 45 Q55 55 60 65" stroke="#1a9e75" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <circle cx="60" cy="30" r="4" fill="#1a9e75" fillOpacity="0.6"/>
        <path d="M30 95h60" stroke="#1a9e75" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3"/>
        <path d="M35 88h50" stroke="#1a9e75" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"/>
      </svg>
    ),
    facts: ["-35% facture énergie", "Serres maraîchères", "Surface > 500 m²"],
    accentColor: "from-[#1a9e75]/20",
  },
  {
    id: "froid",
    badge: "BAT-TH-134",
    title: "Régulation intelligente",
    titleAccent: "du froid commercial",
    titleEnd: "à coût zéro",
    subtitle:
      "Le froid peut peser 80% de votre facture électrique. La régulation HP/BP flottante réduit jusqu'à 40% votre consommation — zéro investissement pour vous.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="35" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.4"/>
        <line x1="60" y1="25" x2="60" y2="95" stroke="#1a9e75" strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="25" y1="60" x2="95" y2="60" stroke="#1a9e75" strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="35" y1="35" x2="85" y2="85" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round"/>
        <line x1="85" y1="35" x2="35" y2="85" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round"/>
        <path d="M60 25l-5 8h10l-5-8zM60 95l5-8H55l5 8z" fill="#1a9e75" fillOpacity="0.5"/>
        <path d="M25 60l8 5v-10l-8 5zM95 60l-8-5v10l8-5z" fill="#1a9e75" fillOpacity="0.5"/>
        <circle cx="60" cy="60" r="10" fill="#1a9e75" fillOpacity="0.2" stroke="#1a9e75" strokeWidth="2" strokeOpacity="0.6"/>
        <circle cx="60" cy="60" r="4" fill="#1a9e75" fillOpacity="0.8"/>
        <circle cx="60" cy="25" r="3" fill="#1a9e75" fillOpacity="0.4"/>
        <circle cx="60" cy="95" r="3" fill="#1a9e75" fillOpacity="0.4"/>
        <circle cx="25" cy="60" r="3" fill="#1a9e75" fillOpacity="0.4"/>
        <circle cx="95" cy="60" r="3" fill="#1a9e75" fillOpacity="0.4"/>
      </svg>
    ),
    facts: ["-40% consommation", "GMS, entrepôts, agroalim.", "ROI < 2 ans"],
    accentColor: "from-cyan-500/20",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating, current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0d1e3a] overflow-hidden min-h-[92vh] flex items-center">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-radial ${slide.accentColor} to-transparent blur-3xl transition-all duration-1000`} />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#1a3460]/60 blur-2xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div
            className={`transition-all duration-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
                <span className="text-[#1a9e75] text-sm font-semibold">
                  9 000+ projets réalisés en France
                </span>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
                {slide.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              {slide.title}
              <br />
              <span className="text-[#1a9e75]">{slide.titleAccent}</span>
              <br />
              {slide.titleEnd}
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/simulateur"
                className="inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-[#1a9e75]/30 hover:shadow-xl"
              >
                Tester mon éligibilité
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

            {/* Facts */}
            <div className="flex flex-wrap gap-3">
              {slide.facts.map((fact) => (
                <div key={fact} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70">
                  <svg className="w-4 h-4 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {fact}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Icon visual */}
          <div
            className={`hidden lg:flex items-center justify-center transition-all duration-700 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#1a9e75]/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-[#1a9e75]/15 animate-[spin_20s_linear_infinite_reverse]" />
              {/* Glow */}
              <div className="absolute inset-8 rounded-full bg-[#1a9e75]/5 blur-xl" />
              {/* Icon */}
              <div className="absolute inset-12">
                {slide.icon}
              </div>
            </div>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? "w-8 h-2.5 bg-[#1a9e75]"
                    : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Slide labels */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-white/40">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(idx)}
                className={`transition-colors ${
                  idx === current ? "text-[#1a9e75] font-semibold" : "hover:text-white/60"
                }`}
              >
                {s.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <div
            key={current}
            className="h-full bg-[#1a9e75]"
            style={{ animation: "progress 5s linear forwards" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  );
}
