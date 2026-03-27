"use client";

import { useState, useTransition } from "react";

interface LeadSyncButtonProps {
  leadId: string;
  hasMondayItem: boolean;
}

export default function LeadSyncButton({ leadId, hasMondayItem }: LeadSyncButtonProps) {
  const [synced, setSynced] = useState(hasMondayItem);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}/sync`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data?.error ?? "Erreur lors de la synchronisation.");
          return;
        }
        setSynced(true);
      } catch {
        setError("Erreur réseau.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${synced ? "bg-emerald-400" : "bg-gray-600"}`}
        title={synced ? "Synchronisé avec Monday" : "Non synchronisé"}
      />
      {!synced && (
        <button
          onClick={handleSync}
          disabled={isPending}
          className="text-xs text-[#f0a500] hover:text-[#f0b500] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Synchroniser avec Monday"
        >
          {isPending ? (
            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Sync"
          )}
        </button>
      )}
      {error && (
        <span className="text-red-400 text-xs" title={error}>!</span>
      )}
    </div>
  );
}
