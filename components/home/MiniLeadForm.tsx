"use client";

import { useState } from "react";

export default function MiniLeadForm() {
  const [form, setForm] = useState({ nom: "", telephone: "", secteur: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.telephone) return;
    setLoading(true);
    try {
      await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "mini-lead-form" }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0d1e3a] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0d1e3a] to-[#1a3460] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#1a9e75]/10 blur-3xl pointer-events-none" />

          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#1a9e75]/20 border border-[#1a9e75]/40 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Demande reçue !</h3>
              <p className="text-white/60">Un expert LEDX vous rappelle sous 24h.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/30 rounded-full px-4 py-1.5 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#1a9e75] animate-pulse" />
                  <span className="text-[#1a9e75] text-sm font-semibold">Étude gratuite · Sans engagement</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Votre étude en 30 secondes
                </h2>
                <p className="text-white/60">
                  Laissez vos coordonnées — nos experts vous rappellent et analysent votre éligibilité CEE gratuitement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#1a9e75] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#1a9e75] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-60 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all whitespace-nowrap shadow-lg hover:shadow-[#1a9e75]/30"
                >
                  {loading ? "Envoi…" : "Être rappelé →"}
                </button>
              </form>

              <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-white/40">
                <span>✓ Aucun démarchage abusif</span>
                <span>✓ Données confidentielles</span>
                <span>✓ Réponse sous 24h</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
