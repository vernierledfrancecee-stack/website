import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord — Espace Client LEDX Énergie",
  robots: { index: false, follow: false },
};

const statutLabels: Record<string, string> = {
  EN_COURS: "En cours",
  DOSSIER_CONSTITUE: "Dossier constitué",
  DEPOSE: "Déposé",
  EN_CONTROLE: "En contrôle",
  VALIDE: "Validé",
  CERTIFIE: "Certifié",
};

const statutColors: Record<string, string> = {
  EN_COURS: "bg-yellow-100 text-yellow-800",
  DOSSIER_CONSTITUE: "bg-blue-100 text-blue-800",
  DEPOSE: "bg-purple-100 text-purple-800",
  EN_CONTROLE: "bg-orange-100 text-orange-800",
  VALIDE: "bg-[#1a9e75]/20 text-[#1a9e75]",
  CERTIFIE: "bg-[#0d1e3a]/10 text-[#0d1e3a]",
};

const statutOrder = [
  "EN_COURS",
  "DOSSIER_CONSTITUE",
  "DEPOSE",
  "EN_CONTROLE",
  "VALIDE",
  "CERTIFIE",
];

// Exemple de données statiques (à remplacer par les données réelles via API)
const exampleDossiers = [
  {
    id: "1",
    reference: "LEDX-2024-001",
    ficheCode: "BAT-TH-163",
    siteAdresse: "12 avenue de la République, 75011 Paris",
    statut: "EN_CONTROLE",
    surface: 3200,
    secteur: "tertiaire-bureaux",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    reference: "LEDX-2024-002",
    ficheCode: "BAT-EQ-127",
    siteAdresse: "45 rue Michelet, 69006 Lyon",
    statut: "VALIDE",
    surface: 8500,
    secteur: "tertiaire-logistique",
    createdAt: "2024-01-20",
  },
];

function StatutBadge({ statut }: { statut: string }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
        statutColors[statut] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {statutLabels[statut] ?? statut}
    </span>
  );
}

function ProgressTimeline({ statut }: { statut: string }) {
  const currentIndex = statutOrder.indexOf(statut);

  return (
    <div className="flex items-center gap-1 mt-3">
      {statutOrder.map((s, idx) => (
        <div key={s} className="flex items-center gap-1 flex-1">
          <div
            className={`h-1.5 flex-1 rounded-full transition-all ${
              idx <= currentIndex ? "bg-[#1a9e75]" : "bg-gray-200"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#f8f9fa]">
      <div className="bg-[#0d1e3a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Mes Dossiers CEE</h1>
              <p className="text-white/60 text-sm mt-1">
                Suivez l&apos;avancement de vos dossiers en temps réel.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-[#1a9e75]" />
              <span className="text-white text-sm font-medium">Connecté</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Résumé */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Dossiers actifs", value: "2", color: "text-[#0d1e3a]" },
            { label: "En contrôle", value: "1", color: "text-orange-600" },
            { label: "Validés", value: "1", color: "text-[#1a9e75]" },
            { label: "Certifiés", value: "0", color: "text-[#0d1e3a]" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</div>
              <div className="text-xs text-[#2c2c2a]/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Liste des dossiers */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0d1e3a]">Tous mes dossiers</h2>

          {exampleDossiers.map((dossier) => (
            <div
              key={dossier.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm hover:border-gray-200 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block bg-[#0d1e3a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
                      {dossier.ficheCode}
                    </span>
                    <StatutBadge statut={dossier.statut} />
                  </div>
                  <div className="font-semibold text-[#0d1e3a] mb-0.5">{dossier.reference}</div>
                  <div className="text-sm text-[#2c2c2a]/60 mb-0.5">{dossier.siteAdresse}</div>
                  {dossier.surface && (
                    <div className="text-xs text-[#2c2c2a]/50">
                      {dossier.surface.toLocaleString("fr-FR")} m² · {dossier.secteur}
                    </div>
                  )}

                  {/* Timeline de progression */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-[#2c2c2a]/50 mb-1.5">
                      <span>Avancement</span>
                      <span className="font-medium text-[#0d1e3a]">
                        Étape {statutOrder.indexOf(dossier.statut) + 1}/6
                      </span>
                    </div>
                    <ProgressTimeline statut={dossier.statut} />
                    <div className="flex justify-between text-xs text-[#2c2c2a]/40 mt-1">
                      <span>En cours</span>
                      <span>Certifié</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={`/client/dossier/${dossier.id}`}
                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#0d1e3a] text-[#0d1e3a] font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Voir le détail
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {exampleDossiers.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4" role="img" aria-label="Dossier">📁</div>
              <h3 className="font-bold text-[#0d1e3a] mb-2">Aucun dossier pour le moment</h3>
              <p className="text-sm text-[#2c2c2a]/60 mb-4">
                Vos dossiers CEE apparaîtront ici dès leur ouverture.
              </p>
              <a
                href="/simulateur"
                className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Tester mon éligibilité
              </a>
            </div>
          )}
        </div>

        {/* Note sync Monday */}
        <div className="mt-6 bg-[#f8f9fa] border border-gray-100 rounded-xl px-5 py-3 flex items-center gap-2 text-xs text-[#2c2c2a]/50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Statuts synchronisés automatiquement depuis notre système de gestion.
        </div>
      </div>
    </div>
  );
}
