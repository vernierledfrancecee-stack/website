import type { Metadata } from "next";
import Link from "next/link";
import RenovGlobaleSection from "@/components/solutions/RenovGlobaleSection";

export const metadata: Metadata = {
  title: "Nos Solutions CEE — PAC, Régulation Froid, Agriculture, Rénovation Globale",
  description:
    "Découvrez les fiches CEE maîtrisées par LEDX Énergie : BAT-TH-163 PAC tertiaire, BAR-TH-179 PAC résidentiel, BAT-TH-134/145 froid, AGRI-108/117/119 serres, Rénovation Globale Tertiaire.",
};

const navSections = [
  { id: "pac-tertiaire", label: "PAC Tertiaire" },
  { id: "pac-residentiel", label: "PAC Résidentiel" },
  { id: "regulation-froid", label: "Régulation Froid" },
  { id: "agri", label: "Agriculture Serres" },
  { id: "renov-globale", label: "⚡ Rénovation Globale" },
];

export default function SolutionsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            5 fiches CEE + Rénovation Globale
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nos dossiers CEE
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            LEDX monte vos dossiers CEE de A à Z sur les fiches à plus fort potentiel d&apos;économies —
            PAC, froid commercial, agriculture, rénovation globale.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex gap-12">
          {/* Navigation latérale sticky */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-[#2c2c2a]/50 uppercase tracking-wider mb-3 px-3">
                Nos fiches CEE
              </p>
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 text-sm text-[#2c2c2a]/70 hover:text-[#1a9e75] hover:bg-[#1a9e75]/5 rounded-lg transition-colors"
                >
                  {section.label}
                </a>
              ))}
              <div className="pt-4">
                <Link
                  href="/simulateur"
                  className="block text-center bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Tester mon éligibilité
                </Link>
              </div>
            </div>
          </aside>

          {/* Contenu */}
          <main className="flex-1 space-y-20">
            {/* ── PAC TERTIAIRE ─────────────────────────────────── */}
            <section id="pac-tertiaire" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">🏢</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">BAT-TH-163</span>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">Valable jusqu&apos;au 31/12/2030</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0d1e3a]">Pompe à Chaleur Air/Eau — Tertiaire</h2>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-[#2c2c2a]/70 mb-6">
                <p>
                  Remplacement de votre chaudière gaz ou fioul par une Pompe à Chaleur Air/Eau haute performance.
                  Solution idéale pour les bâtiments tertiaires : bureaux, santé, hôtellerie, commerce, logistique.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-amber-800 text-sm mb-2">Conditions clés d&apos;éligibilité</h3>
                <ul className="space-y-1.5 text-sm text-amber-700">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>Chauffage actuel au <strong>gaz naturel ou fioul OBLIGATOIRE</strong></li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>Bâtiment existant depuis <strong>plus de 2 ans</strong></li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>Dépose d&apos;au moins une chaudière existante requise</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>La PAC doit couvrir <strong>≥ 41% des besoins en chaleur</strong></li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>Surface minimale selon secteur et zone climatique (H1/H2/H3)</li>
                </ul>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-5 mb-4">
                <h3 className="font-bold text-[#0d1e3a] text-sm mb-3">Surfaces minimales selon zone climatique</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-[#2c2c2a]/60 font-medium">Secteur</th>
                        <th className="text-center py-2 px-3 text-[#2c2c2a]/60 font-medium">Zone H1</th>
                        <th className="text-center py-2 px-3 text-[#2c2c2a]/60 font-medium">Zone H2</th>
                        <th className="text-center py-2 px-3 text-[#2c2c2a]/60 font-medium">Zone H3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { s: "Bureaux / Santé", h1: "1 200 m²", h2: "1 400 m²", h3: "2 500 m²" },
                        { s: "Enseignement / Commerce", h1: "2 500 m²", h2: "3 500 m²", h3: "5 000 m²" },
                        { s: "Hôtellerie / Logistique", h1: "3 000 m²", h2: "3 500 m²", h3: "6 000 m²" },
                      ].map((row) => (
                        <tr key={row.s}>
                          <td className="py-2 px-3 text-[#0d1e3a] font-medium">{row.s}</td>
                          <td className="py-2 px-3 text-center text-[#2c2c2a]/70">{row.h1}</td>
                          <td className="py-2 px-3 text-center text-[#2c2c2a]/70">{row.h2}</td>
                          <td className="py-2 px-3 text-center text-[#2c2c2a]/70">{row.h3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Réduction facture chauffage", value: "-50%" },
                  { label: "Conformité Décret Tertiaire", value: "✓" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                    <div className="text-xs text-blue-600/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PAC RÉSIDENTIEL ───────────────────────────────── */}
            <section id="pac-residentiel" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">🏠</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">BAR-TH-179</span>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded">Coup de Pouce 2026</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0d1e3a]">Pompe à Chaleur Collective — Résidentiel</h2>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-[#2c2c2a]/70 mb-6">
                <p>
                  Remplacement de la chaufferie collective gaz ou fioul par une Pompe à Chaleur collective.
                  Solution idéale pour les copropriétés, résidences sociales, bailleurs sociaux et SCI.
                </p>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-5 mb-6">
                <h3 className="font-bold text-[#0d1e3a] text-sm mb-3">Conditions d&apos;éligibilité</h3>
                <ul className="space-y-1.5 text-sm text-[#2c2c2a]/70">
                  {[
                    "Immeuble collectif de plus de 2 ans",
                    "Réseau hydraulique collectif existant (eau chaude)",
                    "Remplacement chaudière gaz ou fioul uniquement",
                    "Pas de PAC déjà installée sur le réseau collectif",
                  ].map((cond) => (
                    <li key={cond} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#1a9e75] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {cond}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <h3 className="font-bold text-indigo-800 text-sm mb-1">Cibles prioritaires</h3>
                <p className="text-sm text-indigo-700">
                  Copropriétés · Résidences sociales (HLM) · Bailleurs · SCI monopropriété ·
                  Résidences senior · Cités universitaires · Monastères
                </p>
              </div>
            </section>

            {/* ── RÉGULATION FROID ──────────────────────────────── */}
            <section id="regulation-froid" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-2xl">❄️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">BAT-TH-134</span>
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">BAT-TH-145</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0d1e3a]">Régulation HP/BP Flottante — Froid Commercial</h2>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-[#2c2c2a]/70 mb-6">
                <p>
                  Système de régulation automatique haute pression / basse pression pour installations
                  frigorifiques. Le froid représente 30 à 80% de la facture énergétique en grande distribution
                  et agroalimentaire.
                </p>
                <p>
                  <strong className="text-[#0d1e3a]">Fonctionnement :</strong> automate central avec capteurs intelligents,
                  ajustement dynamique selon température extérieure et charge thermique. Protocoles RS485 + TCP/IP,
                  capteurs NTC IP67, gestion jusqu&apos;à 8 étages de ventilation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Économies énergétiques", value: "-40%" },
                  { label: "Retour sur investissement", value: "< 2 ans" },
                  { label: "Secteurs couverts", value: "GMS, Agro, Logistique" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-cyan-700 mb-1">{stat.value}</div>
                    <div className="text-xs text-cyan-600/70">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-5">
                <h3 className="font-bold text-[#0d1e3a] text-sm mb-2">Secteurs prioritaires</h3>
                <div className="flex flex-wrap gap-2">
                  {["GMS / Supermarchés", "Entrepôts frigorifiques", "Agroalimentaire", "Plateformes logistiques", "Hôtellerie-restauration"].map((s) => (
                    <span key={s} className="text-xs bg-white border border-cyan-200 text-cyan-700 px-3 py-1.5 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── AGRICULTURE ───────────────────────────────────── */}
            <section id="agri" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1a9e75]/15 flex items-center justify-center text-2xl">🌿</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {["AGRI-TH-119", "AGRI-TH-117", "AGRI-108"].map((code) => (
                      <span key={code} className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
                        {code}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0d1e3a]">Optimisation Énergétique des Serres Agricoles</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* AGRI-TH-119 */}
                <div className="border border-[#1a9e75]/20 rounded-xl overflow-hidden">
                  <div className="bg-[#1a9e75]/10 px-5 py-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#1a9e75] text-white px-2 py-0.5 rounded">AGRI-TH-119</span>
                    <span className="font-bold text-[#0d1e3a] text-sm">VMC Double Flux — Serres Maraîchères</span>
                  </div>
                  <div className="p-5 text-sm text-[#2c2c2a]/70 space-y-2">
                    <p>
                      Ventilation mécanique contrôlée double flux pour serres. Gestion optimale de
                      l&apos;humidité, température et CO2. Ordinateur de gestion climatique inclus.
                    </p>
                    <p><strong className="text-[#0d1e3a]">Marque installateur :</strong> Enerton — leader européen VMC serres.</p>
                    <p><strong className="text-[#0d1e3a]">Économies :</strong> jusqu&apos;à -35% sur la facture énergétique des serres chauffées.</p>
                    <p><strong className="text-[#0d1e3a]">Types de serres :</strong> Multichapelle, Tunnel.</p>
                  </div>
                </div>

                {/* AGRI-TH-117 */}
                <div className="border border-[#1a9e75]/20 rounded-xl overflow-hidden">
                  <div className="bg-[#1a9e75]/10 px-5 py-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#1a9e75] text-white px-2 py-0.5 rounded">AGRI-TH-117</span>
                    <span className="font-bold text-[#0d1e3a] text-sm">Déshumidificateur Thermodynamique</span>
                  </div>
                  <div className="p-5 text-sm text-[#2c2c2a]/70 space-y-2">
                    <p>
                      Contrôle hygrométrique pour serres maraîchères de plus de 500 m².
                      Structure acier galvanisé EPOXY, installation flexible (sol / chariot / suspendu).
                    </p>
                    <p>
                      <strong className="text-[#0d1e3a]">Modèles disponibles :</strong>{" "}
                      PE-D160, PE-D240, PE-D360, PE-D520, PE-D750, PE-D980
                    </p>
                    <p><strong className="text-[#0d1e3a]">Rendement :</strong> R ≥ 2 | Économies : jusqu&apos;à -35%.</p>
                  </div>
                </div>

                {/* AGRI-108 */}
                <div className="border border-[#1a9e75]/20 rounded-xl overflow-hidden">
                  <div className="bg-[#1a9e75]/10 px-5 py-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#1a9e75] text-white px-2 py-0.5 rounded">AGRI-108</span>
                    <span className="font-bold text-[#0d1e3a] text-sm">Tube Thermique — Stockage Passif</span>
                  </div>
                  <div className="p-5 text-sm text-[#2c2c2a]/70 space-y-2">
                    <p>
                      Stockage thermique passif jour/nuit pour serres. Gaine souple noire remplie d&apos;eau,
                      100% passif — aucune énergie requise.
                    </p>
                    <p>
                      <strong className="text-[#0d1e3a]">Modèle TM5012 :</strong>{" "}
                      Ø300mm — 70,2L/ml — 70kg/ml. Rouleaux de 50 ou 100m.
                    </p>
                    <p>
                      <strong className="text-[#0d1e3a]">Résultats :</strong>{" "}
                      Réduction besoins chauffage -50% | Rendements cultures +30%.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── RÉNOVATION GLOBALE — COMING SOON ─────────────── */}
            <RenovGlobaleSection />
          </main>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0d1e3a] py-16 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Quelle fiche CEE correspond à votre situation ?
          </h2>
          <p className="text-white/60 mb-6">
            Notre simulateur identifie vos fiches éligibles en 2 minutes.
          </p>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all"
          >
            Tester mon éligibilité gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}
