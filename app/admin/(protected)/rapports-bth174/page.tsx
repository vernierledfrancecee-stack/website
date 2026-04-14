import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { title: "Rapports BAR-TH-174" };

const NIVEAU_LABELS: Record<string, string> = {
  grand_precaire: "Grand précaire",
  precaire: "Précaire",
  standard: "Standard",
};

const NIVEAU_COLORS: Record<string, string> = {
  grand_precaire: "bg-red-900/40 text-red-300 border-red-800",
  precaire: "bg-orange-900/40 text-orange-300 border-orange-800",
  standard: "bg-blue-900/40 text-blue-300 border-blue-800",
};

export default async function RapportsBTH174Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const perPage = 25;

  const [total, rapports] = await Promise.all([
    prisma.rapportBTH174.count(),
    prisma.rapportBTH174.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        reference: true,
        nomBeneficiaire: true,
        adresse: true,
        eligible: true,
        scenarios: true,
        niveauPrecarite: true,
        operateur: true,
        createdAt: true,
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Rapports BAR-TH-174</h1>
          <p className="text-sm text-gray-400 mt-1">
            Historique des rapports générés via le simulateur interne B2C
          </p>
        </div>
        <div className="bg-[#1a3a6b] border border-gray-700 rounded-xl px-4 py-2 text-center">
          <div className="text-2xl font-bold text-white">{total}</div>
          <div className="text-xs text-gray-400">rapports</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Référence</th>
                <th className="px-4 py-3 text-left">Bénéficiaire</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Adresse</th>
                <th className="px-4 py-3 text-left">Éligibilité</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Précarité</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Opérateur</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {rapports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    Aucun rapport généré pour l&apos;instant.
                  </td>
                </tr>
              ) : (
                rapports.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#f0a500] bg-[#f0a500]/10 px-2 py-1 rounded">
                        {r.reference}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-white">{r.nomBeneficiaire || "—"}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-400 max-w-xs truncate">
                      {r.adresse || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.eligible ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-300 bg-green-900/40 border border-green-800 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          Éligible
                          {r.scenarios.length > 0 && (
                            <span className="text-green-400">· {r.scenarios.join("+")}</span>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 bg-red-900/40 border border-red-800 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          Non éligible
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                          NIVEAU_COLORS[r.niveauPrecarite] ?? "bg-gray-800 text-gray-400 border-gray-700"
                        }`}
                      >
                        {NIVEAU_LABELS[r.niveauPrecarite] ?? r.niveauPrecarite}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-400">
                      {r.operateur || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/rapports-bth174/${r.id}`}
                        className="text-xs font-medium text-[#f0a500] hover:text-[#f0a500]/80 transition-colors whitespace-nowrap"
                      >
                        Voir →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Page {page} / {totalPages} — {total} rapport{total > 1 ? "s" : ""}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}`}
                  className="px-3 py-1.5 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Précédent
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}`}
                  className="px-3 py-1.5 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
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
