"use client";

import { useState, useTransition } from "react";

const STATUTS = [
  { value: "NOUVEAU", label: "Nouveau", color: "text-blue-300" },
  { value: "CONTACTE", label: "Contacté", color: "text-yellow-300" },
  { value: "QUALIFIE", label: "Qualifié", color: "text-green-300" },
  { value: "DOSSIER_EN_COURS", label: "Dossier en cours", color: "text-orange-300" },
  { value: "SIGNE", label: "Signé", color: "text-emerald-300" },
  { value: "PERDU", label: "Perdu", color: "text-red-300" },
];

const STATUT_COLORS: Record<string, string> = {
  NOUVEAU: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  CONTACTE: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  QUALIFIE: "bg-green-500/20 text-green-300 border-green-500/30",
  DOSSIER_EN_COURS: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  SIGNE: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  PERDU: "bg-red-500/20 text-red-300 border-red-500/30",
};

interface LeadStatutSelectProps {
  leadId: string;
  currentStatut: string;
}

export default function LeadStatutSelect({ leadId, currentStatut }: LeadStatutSelectProps) {
  const [statut, setStatut] = useState(currentStatut);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleChange(newStatut: string) {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statut: newStatut }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data?.error ?? "Erreur lors de la mise à jour.");
          return;
        }
        setStatut(newStatut);
      } catch {
        setError("Erreur réseau.");
      }
    });
  }

  const colorClass = STATUT_COLORS[statut] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <div className="relative">
      <select
        value={statut}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className={`appearance-none pl-3 pr-7 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f0a500]/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all ${colorClass} bg-transparent`}
        style={{ backgroundImage: "none" }}
      >
        {STATUTS.map((s) => (
          <option key={s.value} value={s.value} className="bg-[#0d1e3a] text-white">
            {s.label}
          </option>
        ))}
      </select>
      {isPending && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2">
          <svg className="animate-spin w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
      {error && (
        <p className="absolute top-full left-0 mt-1 text-red-400 text-xs whitespace-nowrap z-10">
          {error}
        </p>
      )}
    </div>
  );
}
