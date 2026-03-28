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

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await prisma.contactMessage.findUnique({ where: { id } });
  if (!contact) notFound();

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
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-blue-500/20 text-blue-300 border-blue-500/30">
          Formulaire contact
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">{contact.prenom} {contact.nom}</h1>
        <p className="text-gray-400 text-sm mt-1">Soumis le {formatDate(contact.createdAt)}</p>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Coordonnées</h2>
        <dl>
          <Row label="Nom" value={`${contact.prenom} ${contact.nom}`} />
          <Row label="Email" value={<a href={`mailto:${contact.email}`} className="text-blue-300 hover:underline">{contact.email}</a>} />
          <Row label="Téléphone" value={contact.telephone && <a href={`tel:${contact.telephone}`} className="text-blue-300 hover:underline">{contact.telephone}</a>} />
          <Row label="Société" value={contact.societe} />
          <Row label="Secteur" value={contact.secteur} />
        </dl>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Message</h2>
        <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Métadonnées</h2>
        <dl>
          <Row label="ID" value={<span className="font-mono text-xs text-gray-500">{contact.id}</span>} />
        </dl>
      </div>
    </div>
  );
}
