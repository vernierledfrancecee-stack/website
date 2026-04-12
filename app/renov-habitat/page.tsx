import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LEDX Rénov'Habitat — Rénovation énergétique d'ampleur financée par les CEE",
  description:
    "Rénovez votre maison individuelle et financez vos travaux grâce aux Certificats d'Économies d'Énergie. LEDX Rénov'Habitat vous accompagne de A à Z.",
};

const avantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Zéro démarche administrative",
    desc: "Nous montons votre dossier CEE de A à Z, depuis l'audit initial jusqu'au dépôt final auprès de l'organisme accrédité.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Installateurs RGE certifiés",
    desc: "Réseau de partenaires qualifiés sur toute la France, rigoureusement sélectionnés pour leur expertise et leur certification RGE.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Financement via les CEE",
    desc: "Vos travaux financés par le dispositif des Certificats d'Économies d'Énergie. Aucune avance de fonds demandée.",
  },
];

const profiles = [
  {
    title: "Propriétaire occupant",
    desc: "Résidence principale",
  },
  {
    title: "Propriétaire bailleur",
    desc: "Logement loué",
  },
  {
    title: "SCI / SARL / LMNP / SCPI",
    desc: "Personnes morales",
  },
  {
    title: "Bailleurs sociaux",
    desc: "Parc social HLM",
  },
];

const criteres = [
  "Maison individuelle achevée depuis plus de 2 ans",
  "Résidence principale uniquement",
  "Classe énergétique C, D, E, F ou G",
  "Minimum 2 gestes d'isolation sur l'enveloppe",
  "Gain minimum de 2 classes énergétiques (DPE)",
  "Travaux réalisés par entreprises RGE certifiées",
];

const travaux = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Isolation des combles perdus",
    desc: "Insufflation ou soufflage de laine minérale ou biosourcée en combles non aménageables.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    title: "Isolation des rampants de toiture",
    desc: "Isolation thermique des rampants et plafonds de combles aménagés ou aménageables.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: "Isolation des murs",
    desc: "Isolation par l'intérieur (ITI) ou par l'extérieur (ITE) des murs donnant sur l'extérieur.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Isolation des planchers bas",
    desc: "Isolation des planchers séparant les locaux chauffés des sous-sols, caves ou vides sanitaires.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Remplacement des fenêtres",
    desc: "Pose de fenêtres double vitrage performantes (Uw ≤ 1,3 W/m².K) en remplacement des simples vitrages.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Audit énergétique réglementaire",
    desc: "Un auditeur certifié réalise le diagnostic complet de votre logement avant tout démarrage des travaux.",
  },
  {
    num: "02",
    title: "Signature des documents avant travaux",
    desc: "Devis détaillés, attestations sur l'honneur et engagements contractuels signés conformément à la réglementation CEE.",
  },
  {
    num: "03",
    title: "Réalisation des travaux par nos partenaires RGE",
    desc: "Nos artisans certifiés RGE réalisent les travaux d'isolation sous notre coordination.",
  },
  {
    num: "04",
    title: "Constitution et dépôt du dossier CEE",
    desc: "Nos équipes montent l'intégralité du dossier réglementaire et le déposent auprès de l'organisme accrédité.",
  },
  {
    num: "05",
    title: "Contrôle COFRAC et valorisation",
    desc: "Visite de contrôle par un organisme COFRAC, puis émission et valorisation des Certificats d'Économies d'Énergie.",
  },
];

export default function RenovHabitatPage() {
  return (
    <div className="pt-16 lg:pt-20">

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-[#0d1e3a] overflow-hidden min-h-[92svh] flex flex-col justify-center">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80"
          alt="Belle maison individuelle rénovée"
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e3a]/70 via-[#0d1e3a]/40 to-[#0d1e3a]/85" />

        <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-8 py-20 sm:py-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/40 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e75] shrink-0" />
            Fiche BAR-TH-174 · Mandataire agréé
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6 max-w-3xl">
            Votre maison rénovée,{" "}
            <span className="text-[#1a9e75]">financée par les CEE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            LEDX Rénov&apos;Habitat vous accompagne de A à Z dans votre
            rénovation énergétique d&apos;ampleur
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95"
            >
              Vérifier mon éligibilité
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#pourquoi"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group"
            >
              En savoir plus
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. POURQUOI LEDX RÉNOV'HABITAT ───────────────────────── */}
      <section id="pourquoi" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Notre valeur ajoutée
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a]">
              Pourquoi LEDX Rénov&apos;Habitat ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {avantages.map((item) => (
              <div
                key={item.title}
                className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a9e75]/10 flex items-center justify-center text-[#1a9e75] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1e3a] text-lg mb-2">{item.title}</h3>
                  <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUI PEUT EN BÉNÉFICIER ─────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Éligibilité
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a]">
              Êtes-vous éligible ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {profiles.map((profile) => (
              <div
                key={profile.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-[#1a9e75]/30 hover:shadow-md transition-all duration-200"
              >
                {/* House icon */}
                <div className="w-12 h-12 rounded-xl bg-[#0d1e3a]/5 flex items-center justify-center text-[#0d1e3a]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#0d1e3a] mb-1">{profile.title}</div>
                  <div className="text-sm text-[#2c2c2a]/55 mb-3">{profile.desc}</div>
                  <span className="inline-block bg-[#1a9e75]/10 text-[#1a9e75] text-xs font-semibold px-3 py-1 rounded-full border border-[#1a9e75]/20">
                    Éligible
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#2c2c2a]/50">
            ⚠️ Résidences secondaires et logements classés A/B non éligibles
          </p>
        </div>
      </section>

      {/* ── 4. CRITÈRES D'ÉLIGIBILITÉ ─────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Conditions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a]">
              Les conditions à remplir
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {criteres.map((critere) => (
              <div
                key={critere}
                className="flex items-start gap-3 bg-[#f8f9fa] border border-gray-100 rounded-xl p-4"
              >
                <div className="w-6 h-6 rounded-full bg-[#1a9e75]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#2c2c2a]/80 text-sm leading-relaxed">{critere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TRAVAUX ÉLIGIBLES ──────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Travaux pris en charge
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a]">
              Quels travaux sont pris en charge ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {travaux.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#1a9e75]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a9e75]/10 flex items-center justify-center text-[#1a9e75] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1e3a] mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            {/* Last card spans 2 columns on lg to balance the 5-item grid */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 6. NOTRE PROCESSUS ────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Méthodologie
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a]">
              Notre processus
            </h2>
            <p className="text-[#2c2c2a]/60 mt-3 text-sm sm:text-base">
              De l&apos;audit à la valorisation, LEDX Rénov&apos;Habitat orchestre chaque étape pour vous.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gray-100" aria-hidden="true" />

            <div className="space-y-4">
              {processSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-5">
                  {/* Step number */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0d1e3a] text-white font-bold text-sm flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                    {step.num}
                  </div>
                  {/* Step content */}
                  <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl p-5 flex-1 min-w-0">
                    <div className="font-bold text-[#0d1e3a] mb-1">{step.title}</div>
                    <div className="text-sm text-[#2c2c2a]/60 leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINALE ─────────────────────────────────────────── */}
      <section className="bg-[#0d1e3a] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Sans engagement
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à rénover votre maison ?
          </h2>
          <p className="text-white/60 text-base sm:text-lg mb-10">
            Réponse sous 24h — Sans engagement
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95"
          >
            Demander mon étude d&apos;éligibilité
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
