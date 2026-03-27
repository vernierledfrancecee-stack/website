"use client";

import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: "pac",
    tab: "Tertiaire & PAC",
    emoji: "🏢",
    badge: "PRODUIT PHARE 2026",
    badgeColor: "text-[#1a9e75] bg-[#1a9e75]/10 border-[#1a9e75]/25",
    accentColor: "text-[#1a9e75]",
    title: "Remplacez votre chaudière gaz ou fioul.",
    titleAccent: "Payez 0 €.",
    desc: "La pompe à chaleur Air/Eau est le levier d'économie le plus puissant pour les bâtiments tertiaires et résidentiels collectifs. Les CEE financent jusqu'à l'intégralité du projet.",
    bullets: [
      "Jusqu'à -50% sur votre facture de chauffage",
      "Conformité Décret Tertiaire anticipée",
      "DPE amélioré, valeur du patrimoine préservée",
      "0 € d'avance — LEDX porte le financement",
    ],
    cta: "Vérifier mon éligibilité PAC",
    ctaStyle: "bg-[#1a9e75] hover:bg-[#147a5b] shadow-[#1a9e75]/25",
    pills: ["BAT-TH-163 · Tertiaire", "BAR-TH-179 · Résidentiel"],
    cardTitle: "Résultats observés",
    cardAccent: "text-[#1a9e75]",
    cardBg: "from-[#0d1e3a] to-[#1a3460]",
    stats: [
      { value: "-50% à -70%", label: "sur la facture chauffage" },
      { value: "Jusqu'à 90%", label: "du projet financé par les CEE" },
      { value: "0 €", label: "d'avance pour votre trésorerie" },
    ],
    tags: ["🏢 Bureaux", "🏥 Santé", "🏨 Hôtels", "🏪 Commerces", "🏗️ Logistique", "🏠 Copropriétés"],
    tagLabel: "Profils éligibles",
  },
  {
    id: "froid",
    tab: "Froid commercial",
    emoji: "❄️",
    badge: "BAT-TH-134 · BAT-TH-145",
    badgeColor: "text-cyan-600 bg-cyan-50 border-cyan-200",
    accentColor: "text-[#1a9e75]",
    title: "Votre installation frigorifique consomme trop.",
    titleAccent: "Les CEE la financent.",
    desc: "Le froid représente jusqu'à 80% de la facture énergétique d'un commerce ou d'un entrepôt. La régulation HP/BP flottante réduit cette consommation jusqu'à 40% — et les CEE couvrent l'intégralité du projet.",
    bullets: [
      "-40% sur la consommation froid",
      "Retour sur investissement < 2 ans",
      "Aucune interruption d'activité",
      "0 € d'avance pour votre trésorerie",
    ],
    cta: "Étudier mon installation",
    ctaStyle: "bg-[#0d1e3a] hover:bg-[#1a3460]",
    pills: ["BAT-TH-134 · Régulation HP/BP", "BAT-TH-145 · Optimisation froid"],
    cardTitle: "Secteurs concernés",
    cardAccent: "text-cyan-400",
    cardBg: "from-[#0d1e3a] to-[#0a2040]",
    stats: [
      { value: "-40%", label: "de consommation froid" },
      { value: "< 2 ans", label: "de retour sur investissement" },
      { value: "0 €", label: "d'avance pour le client" },
    ],
    tags: ["🏪 GMS", "🏭 Entrepôts frigo", "🥩 Agroalimentaire", "🏨 Hôtellerie", "🚛 Logistique"],
    tagLabel: "Secteurs concernés",
  },
  {
    id: "agri",
    tab: "Agriculture",
    emoji: "🌱",
    badge: "3 fiches agricoles",
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    accentColor: "text-[#1a9e75]",
    title: "Des subventions massives pour vos serres",
    titleAccent: "et bâtiments agricoles.",
    desc: "LEDX est l'un des rares opérateurs CEE spécialisés en agriculture. 3 fiches opérationnelles, des solutions éprouvées sur le terrain, 0 € de reste à charge.",
    bullets: [
      "VMC Double Flux — AGRI-TH-119",
      "Déshumidificateur thermodynamique — AGRI-TH-117",
      "Tube thermique passif — AGRI-108",
      "-35% d'économies d'énergie en serre",
    ],
    cta: "Voir les aides agricoles",
    ctaStyle: "bg-[#1a9e75] hover:bg-[#147a5b] shadow-[#1a9e75]/25",
    pills: ["AGRI-TH-119", "AGRI-TH-117", "AGRI-108"],
    cardTitle: "Résultats agricoles",
    cardAccent: "text-amber-400",
    cardBg: "from-[#0d1e3a] to-[#1a2e10]",
    stats: [
      { value: "-35%", label: "d'énergie en serre" },
      { value: "3 fiches", label: "CEE agricoles" },
      { value: "0 €", label: "reste à charge" },
    ],
    tags: ["🌿 Serres maraîchères", "🐄 Élevage", "🌾 Grandes cultures", "🏗️ Bâtiments agri"],
    tagLabel: "Exploitations éligibles",
  },
];

export default function ProduitsSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-2">
            Nos solutions CEE
          </h2>
          <p className="text-[#2c2c2a]/55 text-sm sm:text-base">
            Choisissez votre secteur pour découvrir les aides disponibles
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center mb-8 sm:mb-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 border ${
                active === i
                  ? "bg-[#0d1e3a] text-white border-[#0d1e3a] shadow-lg"
                  : "bg-white text-[#2c2c2a]/60 border-gray-200 hover:border-[#0d1e3a]/30 hover:text-[#0d1e3a]"
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.tab}</span>
            </button>
          ))}
        </div>

        {/* Slide content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-center">
          {/* Text — 60% */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 border rounded-full px-3.5 py-1 mb-5 text-xs font-bold ${slide.badgeColor}`}>
              {slide.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] leading-tight mb-4">
              {slide.title}
              <br />
              <span className={slide.accentColor}>{slide.titleAccent}</span>
            </h3>

            <p className="text-[#2c2c2a]/60 text-sm sm:text-base leading-relaxed mb-6">
              {slide.desc}
            </p>

            {/* Bullets */}
            <ul className="space-y-2.5 mb-7">
              {slide.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[#2c2c2a]/75 text-sm">
                  <div className="w-4 h-4 rounded-full bg-[#1a9e75]/15 border border-[#1a9e75]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="/simulateur"
              className={`inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg active:scale-95 ${slide.ctaStyle}`}
            >
              {slide.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-[#2c2c2a]/30 text-xs mt-2.5">Étude gratuite · Sans engagement</p>
          </div>

          {/* Card — 40% */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br ${slide.cardBg} rounded-2xl p-6 sm:p-7`}>
              <div className={`${slide.cardAccent} text-xs font-bold uppercase tracking-widest mb-4`}>
                {slide.cardTitle}
              </div>
              <div className="space-y-3 mb-6">
                {slide.stats.map((s) => (
                  <div key={s.label} className="bg-white/6 border border-white/10 rounded-xl px-4 py-3">
                    <div className="text-lg sm:text-xl font-bold text-white">{s.value}</div>
                    <div className="text-white/45 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/35 text-xs mb-2.5">{slide.tagLabel}</div>
                <div className="flex flex-wrap gap-1.5">
                  {slide.tags.map((t) => (
                    <span key={t} className="text-xs text-white/55 bg-white/8 border border-white/10 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-6 bg-[#0d1e3a]" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
