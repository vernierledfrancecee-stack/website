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

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    totalLeads,
    leadsThisMonth,
    leadsThisWeek,
    waitlistCount,
    leadsBySecteurRaw,
    leadsByStatutRaw,
    recentLeads,
    // Visites
    visitesToday,
    visitesThisWeek,
    visitesThisMonth,
    recentVisites,
    topPages,
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
      select: { id: true, nom: true, prenom: true, societe: true, secteur: true, statut: true, mondayItemId: true, createdAt: true, fichesCibles: true },
    }),
    // PAGE_VIEW counts
    prisma.auditLog.count({ where: { action: "PAGE_VIEW", createdAt: { gte: startOfToday } } }),
    prisma.auditLog.count({ where: { action: "PAGE_VIEW", createdAt: { gte: startOfWeek } } }),
    prisma.auditLog.count({ where: { action: "PAGE_VIEW", createdAt: { gte: startOfMonth } } }),
    prisma.auditLog.findMany({
      where: { action: "PAGE_VIEW" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, ipAddress: true, userAgent: true, details: true, createdAt: true },
    }),
    // Top pages — raw groupBy on JSON field not supported by Prisma, so we fetch recent and group in JS
    prisma.auditLog.findMany({
      where: { action: "PAGE_VIEW", createdAt: { gte: startOfMonth } },
      select: { details: true },
    }),
  ]);

  const maxSecteurCount = leadsBySecteurRaw[0]?._count.secteur ?? 1;

  // Group top pages in JS
  const pageCount: Record<string, number> = {};
  for (const v of topPages) {
    const path = (v.details as Record<string, unknown>)?.path as string | undefined;
    if (path) pageCount[path] = (pageCount[path] ?? 0) + 1;
  }
  const topPagesSorted = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxPageCount = topPagesSorted[0]?.[1] ?? 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Vue d&apos;ensemble de l&apos;activité LEDX Énergie</p>
      </div>

      {/* ── VISITES ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Visites du site</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Aujourd'hui", value: visitesToday },
            { label: "Cette semaine", value: visitesThisWeek },
            { label: "Ce mois", value: visitesThisMonth },
          ].map((c) => (
            <div key={c.label} className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a3a6b] flex items-center justify-center text-[#2dc48d]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{c.label}</p>
                <p className="text-3xl font-bold text-[#2dc48d] mt-0.5">{c.value.toLocaleString("fr-FR")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEADS ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Leads & formulaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: totalLeads },
            { label: "Ce mois", value: leadsThisMonth },
            { label: "Cette semaine", value: leadsThisWeek },
            { label: "Waitlist réno", value: waitlistCount },
          ].map((c) => (
            <div key={c.label} className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a3a6b] flex items-center justify-center text-[#f0a500]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{c.label}</p>
                <p className="text-3xl font-bold text-[#f0a500] mt-0.5">{c.value.toLocaleString("fr-FR")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top pages */}
        <div className="xl:col-span-2 bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold text-base mb-5">Pages les plus visitées — ce mois</h2>
          {topPagesSorted.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune visite enregistrée.</p>
          ) : (
            <div className="space-y-3">
              {topPagesSorted.map(([path, count]) => (
                <div key={path}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm font-mono truncate max-w-[75%]">{path}</span>
                    <span className="text-[#2dc48d] text-sm font-semibold shrink-0">{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-[#2dc48d]" style={{ width: `${Math.round((count / maxPageCount) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads par statut */}
        <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold text-base mb-5">Leads par statut</h2>
          {leadsByStatutRaw.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune donnée.</p>
          ) : (
            <div className="space-y-2.5">
              {leadsByStatutRaw.map((item) => (
                <div key={item.statut} className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUT_COLORS[item.statut] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                    {STATUT_LABELS[item.statut] ?? item.statut}
                  </span>
                  <span className="text-white font-semibold text-sm">{item._count.statut}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── LEADS PAR SECTEUR ── */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-white font-semibold text-base mb-5">Leads par secteur</h2>
        {leadsBySecteurRaw.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune donnée.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {leadsBySecteurRaw.map((item) => {
              const pct = Math.round((item._count.secteur / maxSecteurCount) * 100);
              return (
                <div key={item.secteur}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">{SECTEUR_LABELS[item.secteur] ?? item.secteur}</span>
                    <span className="text-[#f0a500] text-sm font-semibold">{item._count.secteur}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#1a3a6b] to-[#f0a500]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── BOTTOM ROW : derniers leads + dernières visites ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 5 derniers leads */}
        <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold text-base">5 derniers leads</h2>
          </div>
          <div className="overflow-x-auto">
            {recentLeads.length === 0 ? (
              <p className="text-gray-500 text-sm p-6">Aucun lead.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-medium">Nom</th>
                    <th className="px-4 py-3 text-left font-medium">Secteur</th>
                    <th className="px-4 py-3 text-left font-medium">Statut</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{lead.prenom} {lead.nom}</p>
                        {lead.societe && <p className="text-gray-500 text-xs">{lead.societe}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{SECTEUR_LABELS[lead.secteur] ?? lead.secteur}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUT_COLORS[lead.statut] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                          {STATUT_LABELS[lead.statut] ?? lead.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* 10 dernières visites */}
        <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold text-base">10 dernières visites</h2>
          </div>
          <div className="overflow-x-auto">
            {recentVisites.length === 0 ? (
              <p className="text-gray-500 text-sm p-6">Aucune visite enregistrée.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-medium">Page</th>
                    <th className="px-4 py-3 text-left font-medium">IP</th>
                    <th className="px-4 py-3 text-left font-medium">Heure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {recentVisites.map((v) => {
                    const details = v.details as Record<string, unknown> | null;
                    const path = (details?.path as string) ?? "—";
                    const ip = v.ipAddress ?? "—";
                    return (
                      <tr key={v.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="px-4 py-3 text-gray-300 font-mono text-xs truncate max-w-[180px]">{path}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">
                          {ip.length > 15 ? ip.slice(0, 15) + "…" : ip}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDateTime(v.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
