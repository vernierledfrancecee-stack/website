"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SoumissionsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const [exporting, setExporting] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    router.push(`/admin/soumissions?${params.toString()}`);
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    router.push("/admin/soumissions");
  };

  const handleExport = async (all: boolean) => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (!all) {
        if (from) params.set("from", from);
        if (to) params.set("to", to);
      }
      const res = await fetch(`/api/admin/soumissions/export?${params.toString()}`);
      if (!res.ok) throw new Error("Export échoué");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const suffix = all ? "integral" : "filtre";
      a.download = `soumissions-${suffix}-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0d1e3a] border border-gray-800 rounded-xl">
      {/* Filtre date */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-medium">Période :</span>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-[#0a1628] border border-gray-700 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0a500] transition-colors"
        />
        <span className="text-xs text-gray-500">→</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="bg-[#0a1628] border border-gray-700 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0a500] transition-colors"
        />
        <button
          onClick={handleFilter}
          className="bg-[#1a3a6b] hover:bg-[#1a4a8b] text-white text-xs px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Filtrer
        </button>
        {(from || to) && (
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-300 text-xs px-3 py-2 rounded-lg transition-colors"
          >
            ✕ Réinitialiser
          </button>
        )}
      </div>

      {/* Boutons export */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => handleExport(false)}
          disabled={exporting}
          title="Exporter les résultats filtrés par date"
          className="flex items-center gap-1.5 bg-[#f0a500]/10 hover:bg-[#f0a500]/20 border border-[#f0a500]/30 text-[#f0a500] text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {exporting ? "Export…" : "Exporter (filtré)"}
        </button>
        <button
          onClick={() => handleExport(true)}
          disabled={exporting}
          title="Exporter toutes les soumissions"
          className="flex items-center gap-1.5 bg-[#2dc48d]/10 hover:bg-[#2dc48d]/20 border border-[#2dc48d]/30 text-[#2dc48d] text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {exporting ? "Export…" : "Exporter tout"}
        </button>
      </div>
    </div>
  );
}
