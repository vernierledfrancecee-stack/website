import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import SoumissionsToolbar from "@/components/admin/SoumissionsToolbar";

export const metadata = { title: "Toutes les soumissions" };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const SOURCE_STYLES = {
  SIMULATEUR: { label: "Simulateur CEE", bg: "bg-[#f0a500]/20", text: "text-[#f0a500]", border: "border-[#f0a500]/30" },
  CONTACT: { label: "Formulaire contact", bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-500/30" },
  WAITLIST: { label: "Rénovation globale", bg: "bg-[#2dc48d]/20", text: "text-[#2dc48d]", border: "border-[#2dc48d]/30" },
};

const DETAIL_HREF = {
  SIMULATEUR: (id: string) => `/admin/soumissions/simulateur/${id}`,
  CONTACT: (id: string) => `/admin/soumissions/contact/${id}`,
  WAITLIST: (id: string) => `/admin/soumissions/waitlist/${id}`,
};

export default async function SoumissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;

  const fromDate = from ? new Date(from + "T00:00:00") : undefined;
  const toDate = to ? new Date(to + "T23:59:59") : undefined;

  const dateFilter =
    fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {};

  const [leads, contacts, waitlist] = await Promise.all([
    prisma.lead.findMany({
      where: dateFilter,
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true, societe: true, secteur: true, createdAt: true },
    }),
    prisma.contactMessage.findMany({
      where: dateFilter,
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true, societe: true, secteur: true, message: true, createdAt: true },
    }),
    prisma.waitlistRenovGlobale.findMany({
      where: dateFilter,
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, email: true, telephone: true, societe: true, surface: true, source: true, createdAt: true },
    }),
  ]);

  type Entry =
    | { type: "SIMULATEUR"; id: string; nom: string; prenom: string; email: string; telephone?: string | null; societe?: string | null; detail: string; createdAt: Date }
    | { type: "CONTACT"; id: string; nom: string; prenom: string; email: string; telephone?: string | null; societe?: string | null; detail: string; createdAt: Date }
    | { type: "WAITLIST"; id: string; nom: string; prenom: string; email: string; telephone?: string | null; societe?: string | null; detail: string; createdAt: Date };

  const all: Entry[] = [
    ...leads.map((l) => ({
      type: "SIMULATEUR" as const,
      id: l.id,
      nom: l.nom,
      prenom: l.prenom,
      email: l.email,
      telephone: l.telephone,
      societe: l.societe,
      detail: l.secteur,
      createdAt: l.createdAt,
    })),
    ...contacts.map((c) => ({
      type: "CONTACT" as const,
      id: c.id,
      nom: c.nom,
      prenom: c.prenom,
      email: c.email,
      telephone: c.telephone,
      societe: c.societe,
      detail: c.message.slice(0, 80) + (c.message.length > 80 ? "…" : ""),
      createdAt: c.createdAt,
    })),
    ...waitlist.map((w) => ({
      type: "WAITLIST" as const,
      id: w.id,
      nom: w.nom,
      prenom: "",
      email: w.email,
      telephone: w.telephone,
      societe: w.societe,
      detail: w.surface ? `${w.surface} m²` : w.source,
      createdAt: w.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const total = all.length;
  const countByType = {
    SIMULATEUR: leads.length,
    CONTACT: contacts.length,
    WAITLIST: waitlist.length,
  };

  const isFiltered = !!(from || to);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Toutes les soumissions</h1>
        <p className="text-gray-400 text-sm mt-1">
          {total} soumission{total !== 1 ? "s" : ""}
          {isFiltered && (
            <span className="ml-2 text-[#f0a500] text-xs">(filtrées par date)</span>
          )}
        </p>
      </div>

      {/* Toolbar : filtre date + export */}
      <Suspense fallback={null}>
        <SoumissionsToolbar />
      </Suspense>

      {/* Compteurs par type */}
      <div className="grid grid-cols-3 gap-4">
        {(["SIMULATEUR", "CONTACT", "WAITLIST"] as const).map((type) => {
          const s = SOURCE_STYLES[type];
          return (
            <div key={type} className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                {s.label}
              </span>
              <span className="text-2xl font-bold text-white ml-auto">{countByType[type]}</span>
            </div>
          );
        })}
      </div>

      {/* Table unifiée */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {all.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">
              {isFiltered ? "Aucune soumission sur cette période." : "Aucune soumission enregistrée."}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Nom</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Société</th>
                  <th className="px-4 py-3 text-left font-medium">Détail</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Fiche</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {all.map((entry) => {
                  const s = SOURCE_STYLES[entry.type];
                  const href = DETAIL_HREF[entry.type](entry.id);
                  return (
                    <tr key={`${entry.type}-${entry.id}`} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{entry.prenom} {entry.nom}</p>
                        {entry.telephone && <p className="text-gray-500 text-xs">{entry.telephone}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{entry.email}</td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{entry.societe ?? <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs max-w-[200px] truncate">{entry.detail}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(entry.createdAt)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Voir
                        </Link>
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
