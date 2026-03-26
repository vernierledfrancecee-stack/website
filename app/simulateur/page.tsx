import type { Metadata } from "next";
import SimulateurForm from "@/components/simulateur/SimulateurForm";

export const metadata: Metadata = {
  title: "Simulateur CEE — Testez votre éligibilité gratuitement",
  description:
    "Testez votre éligibilité aux Certificats d'Économies d'Énergie en 2 minutes. LED, PAC, régulation froid, serres agricoles. Résultats immédiats, sans engagement.",
};

export default function SimulateurPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#1a9e75] text-sm font-semibold">Gratuit · 2 minutes · Sans engagement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Testez votre éligibilité CEE
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Répondez à quelques questions sur votre bâtiment et vos équipements.
            Notre simulateur identifie vos droits CEE et nos experts vous recontactent sous 24h.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SimulateurForm />
      </div>
    </div>
  );
}
