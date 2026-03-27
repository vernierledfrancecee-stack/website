"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const typesClient = [
  { value: "", label: "Type d'organisation…" },
  { value: "groupe-immobilier", label: "Groupe immobilier / Foncière" },
  { value: "industrie-gms", label: "Groupe industriel / GMS" },
  { value: "collectivite", label: "Collectivité / Institution publique" },
  { value: "cooperative-agricole", label: "Coopérative / Groupe agricole" },
];

export default function MiniLeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({ type: "", telephone: "", surface: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect direct si formulaire vide
    if (!form.type && !form.telephone) {
      router.push("/simulateur");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.type,
          telephone: form.telephone,
          surface: form.surface,
          source: "mini-lead-form-cee",
          secteur: form.type,
        }),
      });
      setSent(true);
      // Redirect après 1.5s
      setTimeout(() => router.push("/simulateur"), 1500);
    } catch {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#0d1e3a] via-[#1a3460] to-[#0d2a50] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
            <span className="text-[#1a9e75] text-sm font-semibold">Gratuit · Sans engagement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Analysons votre potentiel CEE
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Première analyse confidentielle sous 24h. Aucun engagement.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-[#1a9e75]/20 border border-[#1a9e75]/40 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Demande enregistrée !</h3>
            <p className="text-white/60 text-sm">Redirection vers le simulateur…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Type de client */}
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#1a9e75] transition-colors appearance-none cursor-pointer"
            >
              {typesClient.map((t) => (
                <option key={t.value} value={t.value} className="bg-[#0d1e3a] text-white">
                  {t.label}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Téléphone */}
              <input
                type="tel"
                placeholder="Ligne directe / mobile pro"
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#1a9e75] transition-colors"
              />
              {/* Surface */}
              <input
                type="number"
                placeholder="Nb de sites approximatif"
                value={form.surface}
                onChange={(e) => setForm({ ...form, surface: e.target.value })}
                min="0"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#1a9e75] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a9e75] hover:bg-[#147a5b] active:scale-[0.98] disabled:opacity-60 text-white font-bold px-7 py-4 rounded-xl text-base transition-all shadow-xl hover:shadow-[#1a9e75]/30"
            >
              {loading ? "Envoi…" : "Demander une analyse de parc →"}
            </button>
          </form>
        )}

        <p className="text-center text-white/30 text-xs mt-5">
          Analyse confidentielle · Réponse sous 24h · 0 € de frais
        </p>
      </div>
    </section>
  );
}
