import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RenovHabitatLogo from "@/components/RenovHabitatLogo";
import EligibiliteForm from "@/components/renov-habitat/EligibiliteForm";

export const metadata: Metadata = {
  title: "LEDX Rénov'Habitat — Pompe à Chaleur financée par MaPrimeRénov'",
  description:
    "Remplacez votre chaudière gaz ou fioul par une pompe à chaleur. Jusqu'à 9 000€ d'aides. Maison ou appartement avec balcon. LEDX Rénov'Habitat gère votre dossier MaPrimeRénov' et CEE de A à Z.",
};

const avantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Diagnostic et devis personnalisé",
    desc: "Notre expert se déplace gratuitement chez vous pour évaluer votre installation, calculer les aides auxquelles vous avez droit et vous proposer la PAC adaptée.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Installation garantie RGE",
    desc: "Nos techniciens certifiés QualiPAC installent votre pompe à chaleur clé en main, partout en France. Garantie constructeur et suivi S.A.V inclus.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Obtention de vos aides",
    desc: "Nous vérifions votre éligibilité, constituons votre dossier MaPrimeRénov' et CEE Coup de Pouce, et déduisons les aides directement de votre facture.",
  },
];

const pacFeatures = [
  {
    title: "Peu invasive, sans gros travaux",
    desc: "La PAC s'intègre facilement à tout type de logement. Aucun percement majeur, aucune modification du réseau existant dans la plupart des cas.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Chaleur homogène et confort durable",
    desc: "Eau chaude continue et ajustement automatique selon la température extérieure. Confort optimal tout au long de l'année.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Durée de vie 15 à 20 ans",
    desc: "Entretien minimal et performances durables. La PAC représente un investissement pérenne pour votre logement.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const profiles = [
  { title: "Propriétaire occupant", desc: "Maison ou appartement" },
  { title: "Propriétaire bailleur", desc: "Logement mis en location" },
  { title: "Copropriété", desc: "Chaufferie collective" },
  { title: "Locataire", desc: "Via votre propriétaire" },
];

const criteres = [
  "Chauffage actuel au gaz naturel ou au fioul",
  "Maison individuelle ou appartement",
  "Appartement : balcon ou terrasse indispensable pour l'unité extérieure",
  "Logement achevé depuis plus de 2 ans",
  "Revenu fiscal de référence selon plafonds MaPrimeRénov' 2026",
  "Installation par un technicien RGE QualiPAC certifié",
];

type PlafondRow = { nb: string; bleu: string; jaune: string; violet: string; rose: string };

const plafondsIdf: PlafondRow[] = [
  { nb: "1", bleu: "≤ 24 031 €", jaune: "≤ 29 253 €", violet: "≤ 40 851 €", rose: "> 40 851 €" },
  { nb: "2", bleu: "≤ 35 270 €", jaune: "≤ 42 933 €", violet: "≤ 60 051 €", rose: "> 60 051 €" },
  { nb: "3", bleu: "≤ 42 357 €", jaune: "≤ 51 564 €", violet: "≤ 71 846 €", rose: "> 71 846 €" },
  { nb: "4", bleu: "≤ 49 455 €", jaune: "≤ 60 208 €", violet: "≤ 84 562 €", rose: "> 84 562 €" },
  { nb: "5", bleu: "≤ 56 580 €", jaune: "≤ 68 877 €", violet: "≤ 96 817 €", rose: "> 96 817 €" },
  { nb: "Par pers. supp.", bleu: "+ 7 116 €", jaune: "+ 8 663 €", violet: "+ 12 257 €", rose: "+ 12 257 €" },
];

const plafondsHorsIdf: PlafondRow[] = [
  { nb: "1", bleu: "≤ 17 363 €", jaune: "≤ 22 259 €", violet: "≤ 31 185 €", rose: "> 31 185 €" },
  { nb: "2", bleu: "≤ 25 393 €", jaune: "≤ 32 553 €", violet: "≤ 45 842 €", rose: "> 45 842 €" },
  { nb: "3", bleu: "≤ 30 540 €", jaune: "≤ 39 148 €", violet: "≤ 55 196 €", rose: "> 55 196 €" },
  { nb: "4", bleu: "≤ 35 676 €", jaune: "≤ 45 735 €", violet: "≤ 64 550 €", rose: "> 64 550 €" },
  { nb: "5", bleu: "≤ 40 835 €", jaune: "≤ 52 348 €", violet: "≤ 73 907 €", rose: "> 73 907 €" },
  { nb: "Par pers. supp.", bleu: "+ 5 151 €", jaune: "+ 6 598 €", violet: "+ 9 357 €", rose: "+ 9 357 €" },
];

function PlafondTable({ rows, title }: { rows: PlafondRow[]; title: string }) {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-bold text-[#0d1e3a] mb-3 sm:mb-4">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-xs sm:text-sm border-collapse min-w-[540px]">
          <thead>
            <tr>
              <th className="bg-[#0d1e3a] text-white px-3 py-3 text-left font-semibold align-bottom leading-tight w-36">
                Nombre de personnes<br />composant le ménage<br />(foyer fiscal)
              </th>
              <th className="bg-[#1565c0] text-white px-3 py-3 text-center font-semibold">
                Profil bleu<br /><span className="font-normal text-blue-200">(très modeste)</span>
              </th>
              <th className="bg-[#d97706] text-white px-3 py-3 text-center font-semibold">
                Profil jaune<br /><span className="font-normal text-amber-100">(modeste)</span>
              </th>
              <th className="bg-[#7e22ce] text-white px-3 py-3 text-center font-semibold">
                Profil violet<br /><span className="font-normal text-purple-200">(intermédiaire)</span>
              </th>
              <th className="bg-[#db2777] text-white px-3 py-3 text-center font-semibold">
                Profil rose<br /><span className="font-normal text-pink-200">(aisé)</span>
              </th>
            </tr>
            <tr>
              <td colSpan={5} className="bg-[#0d1e3a]/8 text-center text-[10px] sm:text-xs text-[#2c2c2a]/55 py-2 italic border-b border-gray-100">
                Revenu fiscal de référence (RFR) — Mon RFR est indiqué sur mon avis d&apos;imposition
              </td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.nb} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                <td className="px-3 py-2.5 font-medium text-[#0d1e3a] border-b border-gray-100">{row.nb}</td>
                <td className="px-3 py-2.5 text-center font-semibold text-[#1565c0] border-b border-gray-100">{row.bleu}</td>
                <td className="px-3 py-2.5 text-center font-semibold text-[#b45309] border-b border-gray-100">{row.jaune}</td>
                <td className="px-3 py-2.5 text-center font-semibold text-[#7e22ce] border-b border-gray-100">{row.violet}</td>
                <td className="px-3 py-2.5 text-center font-semibold text-[#db2777] border-b border-gray-100">{row.rose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const travaux = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "PAC Air/Eau",
    desc: "Remplacement de votre chaudière gaz ou fioul. Couvre 100% des besoins en chauffage et en eau chaude sanitaire via circuit hydraulique.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.902-6H7a4 4 0 00-4 4z" />
      </svg>
    ),
    title: "PAC Air/Air",
    desc: "Climatisation réversible : chauffe en hiver, rafraîchit en été. Idéale pour les appartements disposant d'un balcon ou d'une terrasse.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "PAC Hybride Air/Eau",
    desc: "Couplage PAC + chaudière existante. Solution idéale pour les logements moins bien isolés ou en transition énergétique progressive.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Ballon thermodynamique",
    desc: "Production d'eau chaude sanitaire via technologie PAC. Économies jusqu'à -70% sur la consommation d'eau chaude.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    title: "Dépose ancienne chaudière",
    desc: "Désinstallation et évacuation conformes de votre ancienne chaudière gaz ou fioul, incluses dans la prestation globale.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Contactez-nous",
    desc: "Prenez contact avec un expert LEDX. Nous vous rappelons sous 24h pour établir une première estimation gratuite et personnalisée selon votre logement et vos aides disponibles.",
  },
  {
    num: "02",
    title: "Visite technique à domicile",
    desc: "Un spécialiste certifié se déplace chez vous pour évaluer vos besoins, les spécificités techniques de votre bien et dimensionner la PAC adaptée.",
  },
  {
    num: "03",
    title: "Obtention de vos aides",
    desc: "Nous vérifions votre éligibilité, constituons votre dossier MaPrimeRénov' et CEE, et déduisons directement les aides de votre devis. Aucune avance de fonds.",
  },
  {
    num: "04",
    title: "Installation clé en main",
    desc: "Installation de votre nouvelle pompe à chaleur par des techniciens qualifiés RGE, avec mise en service, réglages et remise des documents de garantie.",
  },
];

export default function RenovHabitatPage() {
  return (
    <div className="pt-16 lg:pt-20">

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-[#0d1e3a] overflow-hidden min-h-[88svh] flex flex-col justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Maison individuelle rénovée — LEDX Rénov'Habitat"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e3a]/70 via-[#0d1e3a]/40 to-[#0d1e3a]/85" />

        <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-10 lg:px-8 py-14 sm:py-28">
          <div className="mb-6 sm:mb-10">
            <RenovHabitatLogo variant="light" size="md" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/40 text-[#1a9e75] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e75] shrink-0" />
            MaPrimeRénov&apos; · CEE Coup de Pouce · Installateur agréé
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6 max-w-3xl">
            Remplacez votre chaudière par une PAC,{" "}
            <span className="text-[#1a9e75]">financée jusqu&apos;à 100%</span>
          </h1>

          <p className="text-white/60 text-sm sm:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed">
            Gaz ou fioul — maison ou appartement avec balcon.
            LEDX Rénov&apos;Habitat gère votre dossier de A à Z.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-7 sm:mb-10">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5">
              <span className="text-[#1a9e75] font-bold text-lg sm:text-xl">9 000€</span>
              <span className="text-white/60 text-xs sm:text-sm">d&apos;aides max.</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5">
              <span className="text-[#1a9e75] font-bold text-lg sm:text-xl">60%</span>
              <span className="text-white/60 text-xs sm:text-sm">d&apos;économies sur vos factures</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#eligibilite"
              className="inline-flex items-center justify-center gap-2.5 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-7 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95"
            >
              Vérifier mon éligibilité
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#pourquoi"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group py-1"
            >
              En savoir plus
              <svg className="w-4 h-4 shrink-0 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE D'ÉLIGIBILITÉ ──────────────────────────────── */}
      <div id="eligibilite">
        <EligibiliteForm />
      </div>

      {/* ── 2. ATOUTS DE LA PAC ───────────────────────────────────── */}
      <section id="pourquoi" className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Pourquoi la PAC ?
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Transformez l&apos;air en énergie durable
            </h2>
            <p className="text-[#2c2c2a]/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Nos systèmes air/eau captent l&apos;énergie naturelle de l&apos;air extérieur pour produire une chaleur homogène, efficace et économique tout au long de l&apos;année.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {pacFeatures.map((item) => (
              <div
                key={item.title}
                className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-5 sm:p-7 flex flex-row sm:flex-col gap-4"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1a9e75]/10 flex items-center justify-center text-[#1a9e75] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1e3a] text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Avantages LEDX ── */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-block bg-[#0d1e3a]/5 border border-[#0d1e3a]/10 text-[#0d1e3a] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Notre valeur ajoutée
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0d1e3a]">
              Pourquoi LEDX Rénov&apos;Habitat ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {avantages.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-7 flex flex-row sm:flex-col gap-4 shadow-sm"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1a9e75]/10 flex items-center justify-center text-[#1a9e75] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1e3a] text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUI PEUT EN BÉNÉFICIER ─────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Éligibilité
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Êtes-vous éligible à la PAC ?
            </h2>
            <p className="text-[#2c2c2a]/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              La pompe à chaleur est éligible à MaPrimeRénov&apos; pour les logements chauffés au gaz ou au fioul. Le montant de l&apos;aide dépend de votre profil de revenus.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {profiles.map((profile) => (
              <div
                key={profile.title}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center gap-3 sm:gap-4 hover:border-[#1a9e75]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0d1e3a]/5 flex items-center justify-center text-[#0d1e3a]">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#0d1e3a] text-sm sm:text-base mb-0.5 sm:mb-1">{profile.title}</div>
                  <div className="text-xs sm:text-sm text-[#2c2c2a]/55 mb-2 sm:mb-3">{profile.desc}</div>
                  <span className="inline-block bg-[#1a9e75]/10 text-[#1a9e75] text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border border-[#1a9e75]/20">
                    Éligible
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-[#2c2c2a]/50">
            ⚠️ Chauffage électrique, bois ou granulés : non éligible PAC MaPrimeRénov&apos;
          </p>
        </div>
      </section>

      {/* ── 4. CONDITIONS D'ÉLIGIBILITÉ ───────────────────────────── */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Conditions
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Les conditions à remplir
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {criteres.map((critere) => (
              <div
                key={critere}
                className="flex items-start gap-3 bg-[#f8f9fa] border border-gray-100 rounded-xl p-3.5 sm:p-4"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a9e75]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#2c2c2a]/80 text-xs sm:text-sm leading-relaxed">{critere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PLAFONDS DE RESSOURCES 2026 ────────────────────────── */}
      <section className="bg-[#f8f9fa] py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              MaPrimeRénov&apos; 2026
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Plafonds de ressources 2026
            </h2>
            <p className="text-[#2c2c2a]/60 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Le montant de l&apos;aide dépend de votre revenu fiscal de référence (RFR) indiqué sur votre avis d&apos;imposition. Plus vos revenus sont modestes, plus l&apos;aide est élevée — jusqu&apos;à 9 000€ pour les ménages très modestes.
            </p>
          </div>

          {/* Légende */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10">
            {[
              { label: "Très modeste", color: "#1565c0", bg: "#eff6ff" },
              { label: "Modeste", color: "#b45309", bg: "#fffbeb" },
              { label: "Intermédiaire", color: "#7e22ce", bg: "#faf5ff" },
              { label: "Aisé", color: "#db2777", bg: "#fdf2f8" },
            ].map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ color: p.color, backgroundColor: p.bg, borderColor: p.color + "40" }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.label}
              </span>
            ))}
          </div>

          <div className="space-y-8 sm:space-y-12">
            <PlafondTable rows={plafondsIdf} title="En Île-de-France" />
            <PlafondTable rows={plafondsHorsIdf} title="Hors Île-de-France" />
          </div>

          <p className="text-center text-xs text-[#2c2c2a]/45 mt-6">
            Source : ANAH — Plafonds de ressources applicables en 2026. Données indicatives, sous réserve de modifications réglementaires.
          </p>
        </div>
      </section>

      {/* ── 6. TRAVAUX ÉLIGIBLES ──────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Travaux pris en charge
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Quels travaux sont couverts ?
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {travaux.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 hover:border-[#1a9e75]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#1a9e75]/10 flex items-center justify-center text-[#1a9e75] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1e3a] text-sm sm:text-base mb-1 sm:mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#2c2c2a]/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. NOTRE PROCESSUS ────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Installation
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d1e3a]">
              Comment ça se passe ?
            </h2>
            <p className="text-[#2c2c2a]/60 mt-2 sm:mt-3 text-xs sm:text-base">
              Un accompagnement sur mesure du début à la fin, avec un interlocuteur unique.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[23px] sm:left-[27px] top-10 bottom-10 w-px bg-gray-100" aria-hidden="true" />

            <div className="space-y-3 sm:space-y-4">
              {processSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-3 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#0d1e3a] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                    {step.num}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-3.5 sm:p-5 flex-1 min-w-0">
                    <div className="font-bold text-[#0d1e3a] text-sm sm:text-base mb-0.5 sm:mb-1">{step.title}</div>
                    <div className="text-xs sm:text-sm text-[#2c2c2a]/60 leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA FINALE ─────────────────────────────────────────── */}
      <section className="bg-[#0d1e3a] py-14 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            Sans engagement
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Prêt à passer à la pompe à chaleur ?
          </h2>
          <p className="text-white/60 text-sm sm:text-lg mb-8 sm:mb-10">
            Étude gratuite — Réponse sous 24h — Jusqu&apos;à 9 000€ d&apos;aides
          </p>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95"
          >
            Demander mon étude gratuite
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
