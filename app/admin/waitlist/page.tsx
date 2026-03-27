import { prisma } from "@/lib/prisma";

export const metadata = { title: "Waitlist" };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminWaitlistPage() {
  const entries = await prisma.waitlistRenovGlobale.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Waitlist Rénovation Globale</h1>
        <p className="text-gray-400 text-sm mt-1">
          {entries.length.toLocaleString("fr-FR")} inscription{entries.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">Aucune inscription sur la waitlist.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Nom</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Société</th>
                  <th className="px-4 py-3 text-left font-medium">Surface</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Notifié</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{entry.nom}</p>
                        {entry.telephone && (
                          <p className="text-gray-500 text-xs mt-0.5">{entry.telephone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${entry.email}`}
                        className="text-[#f0a500] hover:text-[#f0b500] transition-colors"
                      >
                        {entry.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {entry.societe ?? <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {entry.surface ? (
                        <span>
                          {entry.surface.toLocaleString("fr-FR")} m²
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1a3a6b] text-blue-200 border border-blue-500/30">
                        {entry.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {entry.notifie ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                          Oui
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                          <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                          Non
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(entry.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
