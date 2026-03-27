"use client";

import { useState } from "react";
import type { FormState } from "./SimulateurForm";
import type { FicheEligible } from "@/lib/eligibilite";
import { calculerRenovGlobale } from "@/lib/eligibilite";
import WaitlistModal from "@/components/solutions/WaitlistModal";

interface Props {
  data: FormState;
  fiches: FicheEligible[];
  onPrev: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string;
}

const categorieColors: Record<FicheEligible["categorie"], { bg: string; text: string; border: string }> = {
  led: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "pac-tertiaire": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "pac-residentiel": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  froid: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  agricole: { bg: "bg-[#1a9e75]/10", text: "text-[#1a9e75]", border: "border-[#1a9e75]/20" },
};

const solutionsLinks: Record<string, string> = {
  "BAT-EQ-127": "/solutions",
  "BAT-TH-163": "/solutions/pac-tertiaire",
  "BAR-TH-179": "/solutions/pac-residentiel",
  "BAT-TH-134": "/solutions/froid-commercial",
  "BAT-TH-145": "/solutions/froid-commercial",
  "AGRI-TH-119": "/solutions/agriculture",
  "AGRI-TH-117": "/solutions/agriculture",
  "AGRI-108": "/solutions/agriculture",
};

export default function Step5Resultats({
  data,
  fiches,
  onPrev,
  onSubmit,
  submitting,
  submitError,
}: Props) {
  const hasResults = fiches.length > 0;
  const showRenovGlobale = calculerRenovGlobale(data, fiches);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              hasResults ? "bg-[#1a9e75]/20" : "bg-amber-100"
            }`}
          >
            <svg
              className={`w-5 h-5 ${hasResults ? "text-[#1a9e75]" : "text-amber-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {hasResults ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#0d1e3a]">Résultats d&apos;éligibilité</h2>
        </div>
        <p className="text-[#2c2c2a]/60 text-sm">
          Analyse basée sur les informations renseignées pour {data.prenom} {data.nom}
          {data.societe ? ` — ${data.societe}` : ""}.
        </p>
      </div>

      {/* Avertissement */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-amber-700 text-sm">
          Ces résultats sont <strong>indicatifs</strong>. Une visite technique gratuite confirmera votre
          éligibilité réglementaire. Aucun montant n&apos;est garanti à ce stade.
        </p>
      </div>

      {hasResults ? (
        <div className="space-y-4 mb-8">
          <p className="text-sm font-semibold text-[#0d1e3a]">
            {fiches.length} fiche{fiches.length > 1 ? "s" : ""} CEE identifiée{fiches.length > 1 ? "s" : ""} :
          </p>
          {fiches.map((fiche) => {
            const colors = categorieColors[fiche.categorie];
            return (
              <div
                key={fiche.code}
                className={`border rounded-xl p-5 ${colors.border} ${colors.bg}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block text-xs font-mono font-bold px-2.5 py-1 rounded ${colors.text} border ${colors.border}`}
                      >
                        {fiche.code}
                      </span>
                      <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#0d1e3a] mb-1">{fiche.nom}</h3>
                    <p className="text-sm text-[#2c2c2a]/70 leading-relaxed">
                      {fiche.description}
                    </p>
                  </div>
                  <a
                    href={solutionsLinks[fiche.code] ?? "/solutions"}
                    className={`shrink-0 text-xs font-medium ${colors.text} hover:underline`}
                  >
                    En savoir plus →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center mb-8">
          <div className="text-4xl mb-3" role="img" aria-label="Loupe">🔍</div>
          <h3 className="font-bold text-[#0d1e3a] mb-2">Analyse personnalisée requise</h3>
          <p className="text-sm text-[#2c2c2a]/60">
            Nos experts analyseront votre situation en détail.
            Certaines configurations nécessitent une visite technique pour confirmer l&apos;éligibilité.
          </p>
        </div>
      )}

      {/* ── BLOC RÉNOVATION GLOBALE (coming soon) ── */}
      {showRenovGlobale && (
        <div className="bg-[#0d1e3a] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-[#1a9e75]"
              style={{ animation: "pulse 2s infinite" }}
            />
            <span className="text-[#1a9e75] text-xs font-bold uppercase tracking-wider">
              Bientôt disponible
            </span>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">
            Rénovation Globale Tertiaire
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Votre bâtiment pourrait être éligible à la future fiche de rénovation globale
            tertiaire, en cours de parution. Cette fiche permettra de financer jusqu&apos;à
            60% d&apos;un bouquet de travaux multi-postes. LEDX prépare dès maintenant les
            premiers dossiers.
          </p>
          <button
            type="button"
            onClick={() => setWaitlistOpen(true)}
            className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            M&apos;inscrire sur la liste d&apos;attente →
          </button>
        </div>
      )}

      {/* CTA contact expert */}
      <div className="bg-gradient-to-br from-[#0d1e3a] to-[#1a3460] rounded-2xl p-6 text-center">
        <h3 className="text-white font-bold text-lg mb-2">
          Je souhaite être contacté par un expert LEDX
        </h3>
        <p className="text-white/70 text-sm mb-6">
          Nos experts CEE analysent votre dossier et vous rappellent sous 24h ouvrées.
          Aucun engagement, aucun frais.
        </p>

        {submitError && (
          <div className="bg-red-500/20 border border-red-400 rounded-lg px-4 py-2 mb-4">
            <p className="text-red-200 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              Demander un contact gratuit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      <div className="flex justify-start mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 border border-gray-200 text-[#2c2c2a]/70 hover:text-[#0d1e3a] hover:border-gray-300 font-medium px-6 py-3 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Modifier mes réponses
        </button>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        source="SIMULATEUR"
      />
    </div>
  );
}
