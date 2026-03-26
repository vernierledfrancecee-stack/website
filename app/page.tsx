import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import CounterSection from "@/components/home/CounterSection";
import ChoixParProfil from "@/components/home/ChoixParProfil";
import PacHero from "@/components/home/PacHero";
import FroidSection from "@/components/home/FroidSection";
import AgriSection from "@/components/home/AgriSection";
import LedSocialProof from "@/components/home/LedSocialProof";
import PourquoiGratuit from "@/components/home/PourquoiGratuit";
import TemoignagesSection from "@/components/home/TemoignagesSection";
import MiniLeadForm from "@/components/home/MiniLeadForm";

export const metadata: Metadata = {
  title: "LEDX Énergie — Financez vos projets énergétiques à 0 €",
  description:
    "LEDX monte vos dossiers CEE de A à Z — PAC, froid commercial, serres agricoles, rénovation globale. 9 000+ projets réalisés en France. 0 € d'avance.",
};

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── COMPTEURS ──────────────────────────────────────────────── */}
      <CounterSection />

      {/* ── CHOIX PAR PROFIL ──────────────────────────────────────── */}
      <ChoixParProfil />

      {/* ── PAC — PRODUIT PHARE ───────────────────────────────────── */}
      <PacHero />

      {/* ── FROID COMMERCIAL ──────────────────────────────────────── */}
      <FroidSection />

      {/* ── AGRICULTURE ───────────────────────────────────────────── */}
      <AgriSection />

      {/* ── LED — PREUVE SOCIALE ──────────────────────────────────── */}
      <LedSocialProof />

      {/* ── POURQUOI CES AIDES EXISTENT ───────────────────────────── */}
      <PourquoiGratuit />

      {/* ── TÉMOIGNAGES ────────────────────────────────────────────── */}
      <TemoignagesSection />

      {/* ── CTA GLOBAL ─────────────────────────────────────────────── */}
      <MiniLeadForm />
    </div>
  );
}
