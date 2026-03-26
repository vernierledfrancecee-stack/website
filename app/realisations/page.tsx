import type { Metadata } from "next";
import RealisationsGallery from "@/components/realisations/RealisationsGallery";

export const metadata: Metadata = {
  title: "Nos Réalisations CEE — 9 000+ projets en France",
  description:
    "Découvrez les réalisations LEDX Énergie : PAC tertiaires, résidentiels collectifs, rénovations LED, serres agricoles. 9 000+ projets menés à bien partout en France.",
};

export default function RealisationsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            9 000+ projets réalisés
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nos Réalisations</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Quelques exemples parmi les milliers de projets CEE coordonnés par LEDX Énergie
            depuis 2023 partout en France.
          </p>
        </div>
      </div>
      <RealisationsGallery />
    </div>
  );
}
