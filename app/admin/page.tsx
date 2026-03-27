import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard" };

const STATUT_COLORS: Record<string, string> = {
  NOUVEAU: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  CONTACTE: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  QUALIFIE: "bg-green-500/20 text-green-300 border-green-500/30",
  DOSSIER_EN_COURS: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  SIGNE: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  PERDU: "bg-red-500/20 text-red-300 border-red-500/30",
};

const STATUT_LABELS: Record<string, string> = {
  NOUVEAU: "Nouveau",
  CONTACTE: "Contacté",
  QUALIFIE: "Qualifié",
  DOSSIER_EN_COURS: "Dossier en cours",
  SIGNE: "Signé",
  PERDU: "Perdu",
};

const SECTEUR_LABELS: Record<string, string> = {
  "tertiaire-bureaux": "Bureaux",
  "tertiaire-sante": "Santé",
  "tertiaire-enseignement": "Enseignement",
  "tertiaire-commerce": "Commerce",
  "tertiaire-hotellerie": "Hôtellerie",
  "tertiaire-logistique": "Logistique",
  residentiel: "Résidentiel",
  agricole: "Agricole",
  froid: "Froid commercial",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Start of week (Monday)
  const dayOfWeek = now.getDay();
  const daysFromMonday = (dayOfWeek + 6) % 7;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    totalLeads,
    leadsThisMonth,
    leadsThisWeek,
    waitlistCount,
    leadsBySecteurRaw,
    leadsByStatutRaw,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.waitlistRenovGlobale.count(),
    prisma.lead.groupBy({ by: ["secteur"], _count: { secteur: true }, orderBy: { _count: { secteur: "desc" } } }),
    prisma.lead.groupBy({ by: ["statut"], _count: { statut: true }, orderBy: { _count: { statut: "desc" } } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        nom: true,
        prenom: true,
        societe: true,
        secteur: true,
        statut: true,
        mondayItemId: true,
        createdAt: true,
        fichesCibles: true,
      },
    }),
  ]);

  const maxSecteurCount = leadsBySecteurRaw[0]?._count.secteur ?? 1;

  const statCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Ce mois",
      value: leadsThisMonth,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Cette semaine",
      value: leadsThisWeek,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: "Waitlist",
      value: waitlistCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Vue d&apos;ensemble de l&apos;activité LEDX Énergie
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-5 flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1a3a6b] flex items-center justify-center text-[#f0a500]">
              {card.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-[#f0a500] mt-0.5">
                {card.value.toLocaleString("fr-FR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Leads par secteur */}
        <div className="xl:col-span-2 bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold text-base mb-5">
            Leads par secteur
          </h2>
          {leadsBySecteurRaw.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune donnée disponible.</p>
          ) : (
            <div className="space-y-3">
              {leadsBySecteurRaw.map((item) => {
                const label = SECTEUR_LABELS[item.secteur] ?? item.secteur;
                const count = item._count.secteur;
                const pct = Math.round((count / maxSecteurCount) * 100);
                return (
                  <div key={item.secteur}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">{label}</span>
                      <span className="text-[#f0a500] text-sm font-semibold">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#1a3a6b] to-[#f0a500]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Leads par statut */}
        <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold text-base mb-5">
            Leads par statut
          </h2>
          {leadsByStatutRaw.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune donnée disponible.</p>
          ) : (
            <div className="space-y-2.5">
              {leadsByStatutRaw.map((item) => {
                const label = STATUT_LABELS[item.statut] ?? item.statut;
                const colorClass = STATUT_COLORS[item.statut] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30";
                return (
                  <div key={item.statut} className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}
                    >
                      {label}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {item._count.statut}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-white font-semibold text-base">
            5 derniers leads
          </h2>
        </div>
        <div className="overflow-x-auto">
          {recentLeads.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">Aucun lead enregistré.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Nom</th>
                  <th className="px-4 py-3 text-left font-medium">Société</th>
                  <th className="px-4 py-3 text-left font-medium">Secteur</th>
                  <th className="px-4 py-3 text-left font-medium">Fiches CEE</th>
                  <th className="px-4 py-3 text-left font-medium">Statut</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {recentLeads.map((lead) => {
                  const colorClass =
                    STATUT_COLORS[lead.statut] ??
                    "bg-gray-500/20 text-gray-300 border-gray-500/30";
                  const statutLabel =
                    STATUT_LABELS[lead.statut] ?? lead.statut;
                  return (
                    <tr key={lead.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">
                        {lead.prenom} {lead.nom}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {lead.societe ?? <span className="text-gray-600">—</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {SECTEUR_LABELS[lead.secteur] ?? lead.secteur}
                      </td>
                      <td className="px-4 py-3">
                        {lead.fichesCibles.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {lead.fichesCibles.slice(0, 2).map((fiche) => (
                              <span
                                key={fiche}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[#1a3a6b] text-blue-200"
                              >
                                {fiche}
                              </span>
                            ))}
                            {lead.fichesCibles.length > 2 && (
                              <span className="text-gray-500 text-xs">
                                +{lead.fichesCibles.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}
                        >
                          {statutLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
