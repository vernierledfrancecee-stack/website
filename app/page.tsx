import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import CounterSection from "@/components/home/CounterSection";
import ChoixParProfil from "@/components/home/ChoixParProfil";
import ProduitsSlider from "@/components/home/ProduitsSlider";
import LedSocialProof from "@/components/home/LedSocialProof";
import PourquoiGratuit from "@/components/home/PourquoiGratuit";
import CarteRealisations from "@/components/home/CarteRealisations";
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

      {/* ── PRODUITS CEE — SLIDER ─────────────────────────────────── */}
      <ProduitsSlider />

      {/* ── LED — PREUVE SOCIALE ──────────────────────────────────── */}
      <LedSocialProof />

      {/* ── POURQUOI CES AIDES EXISTENT ───────────────────────────── */}
      <PourquoiGratuit />

      {/* ── RÉALISATIONS EN FRANCE ─────────────────────────────────── */}
      <CarteRealisations />

      {/* ── CTA GLOBAL ─────────────────────────────────────────────── */}
      <MiniLeadForm />
    </div>
  );
}
