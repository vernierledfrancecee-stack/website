import { prisma } from "@/lib/prisma";

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

export default async function SoumissionsPage() {
  const [leads, contacts, waitlist] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true, societe: true, secteur: true, createdAt: true },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true, societe: true, secteur: true, message: true, createdAt: true },
    }),
    prisma.waitlistRenovGlobale.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, email: true, telephone: true, societe: true, surface: true, source: true, createdAt: true },
    }),
  ]);

  type Entry = {
    type: "SIMULATEUR" | "CONTACT" | "WAITLIST";
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string | null;
    societe?: string | null;
    detail: string;
    createdAt: Date;
  };

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
      detail: c.message.slice(0, 80) + (c.message.length > 80 ? "\u2026" : ""),
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
      detail: w.surface ? `${w.surface} m\u00b2` : w.source,
      createdAt: w.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const total = all.length;
  const countByType = {
    SIMULATEUR: leads.length,
    CONTACT: contacts.length,
    WAITLIST: waitlist.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Toutes les soumissions</h1>
        <p className="text-gray-400 text-sm mt-1">{total} soumission{total !== 1 ? "s" : ""} au total</p>
      </div>

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

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {all.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">Aucune soumission enregistrée.</p>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {all.map((entry) => {
                  const s = SOURCE_STYLES[entry.type];
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
