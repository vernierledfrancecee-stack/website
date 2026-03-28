import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(date);
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex gap-4 py-3 border-b border-gray-800/50 last:border-0">
      <dt className="w-48 shrink-0 text-xs text-gray-500 font-medium pt-0.5">{label}</dt>
      <dd className="text-sm text-gray-200 flex-1">{value}</dd>
    </div>
  );
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/soumissions"
          className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-[#f0a500]/20 text-[#f0a500] border-[#f0a500]/30">
          Simulateur CEE
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">{lead.prenom} {lead.nom}</h1>
        <p className="text-gray-400 text-sm mt-1">Soumis le {formatDate(lead.createdAt)}</p>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Coordonnées</h2>
        <dl>
          <Row label="Nom" value={`${lead.prenom} ${lead.nom}`} />
          <Row label="Email" value={<a href={`mailto:${lead.email}`} className="text-[#f0a500] hover:underline">{lead.email}</a>} />
          <Row label="Téléphone" value={lead.telephone && <a href={`tel:${lead.telephone}`} className="text-[#f0a500] hover:underline">{lead.telephone}</a>} />
          <Row label="Société" value={lead.societe} />
          <Row label="Fonction" value={lead.fonction} />
          <Row label="Adresse du site" value={lead.siteAdresse} />
        </dl>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Bâtiment & Secteur</h2>
        <dl>
          <Row label="Secteur" value={lead.secteur} />
          <Row label="Surface" value={lead.surface ? `${lead.surface} m²` : null} />
          <Row label="Zone climatique" value={lead.zone} />
          <Row label="Énergie" value={lead.energie} />
          <Row label="Éclairage" value={lead.eclairage} />
        </dl>
      </div>

      {lead.fichesCibles.length > 0 && (
        <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Fiches CEE identifiées</h2>
          <div className="flex flex-wrap gap-2">
            {lead.fichesCibles.map((f) => (
              <span key={f} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a3a6b] text-[#f0a500] border border-[#f0a500]/20">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Métadonnées</h2>
        <dl>
          <Row label="Statut" value={lead.statut} />
          <Row label="Consentement" value={lead.consentement ? "Oui" : "Non"} />
          <Row label="Consentement le" value={lead.consentementAt ? formatDate(lead.consentementAt) : null} />
          <Row label="ID" value={<span className="font-mono text-xs text-gray-500">{lead.id}</span>} />
        </dl>
      </div>
    </div>
  );
}
