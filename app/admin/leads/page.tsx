import { prisma } from "@/lib/prisma";
import LeadStatutSelect from "@/components/admin/LeadStatutSelect";
import LeadSyncButton from "@/components/admin/LeadSyncButton";
import Link from "next/link";

export const metadata = { title: "Leads simulateur" };

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

const PAGE_SIZE = 20;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [totalCount, leads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        societe: true,
        secteur: true,
        fichesCibles: true,
        statut: true,
        mondayItemId: true,
        createdAt: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads simulateur</h1>
          <p className="text-gray-400 text-sm mt-1">
            {totalCount.toLocaleString("fr-FR")} lead{totalCount !== 1 ? "s" : ""} au total
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {leads.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">Aucun lead enregistré.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Nom</th>
                  <th className="px-4 py-3 text-left font-medium">Société</th>
                  <th className="px-4 py-3 text-left font-medium">Secteur</th>
                  <th className="px-4 py-3 text-left font-medium">Fiches CEE</th>
                  <th className="px-4 py-3 text-left font-medium">Statut</th>
                  <th className="px-4 py-3 text-left font-medium">Monday</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">
                          {lead.prenom} {lead.nom}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">{lead.email}</p>
                        {lead.telephone && (
                          <p className="text-gray-500 text-xs">{lead.telephone}</p>
                        )}
                      </div>
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
                          {lead.fichesCibles.map((fiche) => (
                            <span
                              key={fiche}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[#1a3a6b] text-blue-200"
                            >
                              {fiche}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatutSelect leadId={lead.id} currentStatut={lead.statut} />
                    </td>
                    <td className="px-4 py-3">
                      <LeadSyncButton leadId={lead.id} hasMondayItem={!!lead.mondayItemId} />
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900/30">
            <p className="text-gray-400 text-sm">
              Page {page} sur {totalPages} —{" "}
              {Math.min(skip + 1, totalCount)}–{Math.min(skip + PAGE_SIZE, totalCount)} sur{" "}
              {totalCount.toLocaleString("fr-FR")}
            </p>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/leads?page=${page - 1}`}
                  className="px-3 py-1.5 rounded-lg bg-[#1a3a6b] hover:bg-[#1e4a8a] text-white text-xs font-medium transition-colors"
                >
                  ← Précédent
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/leads?page=${page + 1}`}
                  className="px-3 py-1.5 rounded-lg bg-[#1a3a6b] hover:bg-[#1e4a8a] text-white text-xs font-medium transition-colors"
                >
                  Suivant →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
