"use client";

import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

interface FormData {
  nom: string;
  email: string;
  societe: string;
  surface: string;
  telephone: string;
}

export default function WaitlistModal({ isOpen, onClose, source = "SOLUTIONS" }: Props) {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
    societe: "",
    surface: "",
    telephone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.email.trim()) {
      setError("Nom et email requis.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email invalide.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/waitlist/renov-globale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          societe: formData.societe || undefined,
          surface: formData.surface ? parseFloat(formData.surface) : undefined,
          telephone: formData.telephone || undefined,
          source,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#1a9e75]/10 text-[#1a9e75] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#1a9e75]"
                  style={{ animation: "pulse 2s infinite" }}
                />
                Bientôt disponible
              </div>
              <h2 id="waitlist-modal-title" className="text-xl font-bold text-[#0d1e3a]">
                Rénovation Globale Tertiaire
              </h2>
              <p className="text-sm text-[#2c2c2a]/60 mt-1">
                Être alerté en priorité dès la parution officielle.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#1a9e75]/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0d1e3a] text-lg mb-2">Inscription confirmée !</h3>
              <p className="text-sm text-[#2c2c2a]/60 mb-4">
                Vous recevrez un email dès que la fiche Rénovation Globale Tertiaire
                sera officiellement publiée. LEDX Énergie vous contactera en priorité.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#1a9e75] font-medium hover:underline"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wl-nom" className="block text-xs font-medium text-[#0d1e3a] mb-1">
                    Nom <span className="text-[#1a9e75]">*</span>
                  </label>
                  <input
                    id="wl-nom"
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData((p) => ({ ...p, nom: e.target.value }))}
                    placeholder="Dupont"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/40 focus:border-[#1a9e75]"
                  />
                </div>
                <div>
                  <label htmlFor="wl-tel" className="block text-xs font-medium text-[#0d1e3a] mb-1">
                    Téléphone
                  </label>
                  <input
                    id="wl-tel"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData((p) => ({ ...p, telephone: e.target.value }))}
                    placeholder="0612345678"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/40 focus:border-[#1a9e75]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="wl-email" className="block text-xs font-medium text-[#0d1e3a] mb-1">
                  Email professionnel <span className="text-[#1a9e75]">*</span>
                </label>
                <input
                  id="wl-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="contact@entreprise.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/40 focus:border-[#1a9e75]"
                  autoComplete="email"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wl-societe" className="block text-xs font-medium text-[#0d1e3a] mb-1">
                    Société
                  </label>
                  <input
                    id="wl-societe"
                    type="text"
                    value={formData.societe}
                    onChange={(e) => setFormData((p) => ({ ...p, societe: e.target.value }))}
                    placeholder="Mon Entreprise"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/40 focus:border-[#1a9e75]"
                  />
                </div>
                <div>
                  <label htmlFor="wl-surface" className="block text-xs font-medium text-[#0d1e3a] mb-1">
                    Surface bâtiment (m²)
                  </label>
                  <input
                    id="wl-surface"
                    type="number"
                    value={formData.surface}
                    onChange={(e) => setFormData((p) => ({ ...p, surface: e.target.value }))}
                    placeholder="ex: 3500"
                    min={0}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/40 focus:border-[#1a9e75]"
                  />
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-lg p-3 text-xs text-[#2c2c2a]/60">
                Je souhaite être contacté en priorité dès que la fiche Rénovation Globale
                Tertiaire sera officiellement publiée par le PNCEE/DGEC.
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Inscription en cours...
                  </>
                ) : (
                  "M'inscrire sur la liste d'attente"
                )}
              </button>

              <p className="text-xs text-center text-[#2c2c2a]/40">
                Sans engagement. Données confidentielles.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
