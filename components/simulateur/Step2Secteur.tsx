"use client";

import { useState } from "react";
import type { FormState } from "./SimulateurForm";

interface Props {
  data: FormState;
  onUpdate: (d: Partial<FormState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const secteurs = [
  {
    id: "tertiaire-bureaux",
    label: "Bureaux / Services",
    description: "Tertiaire",
    icon: "🏢",
  },
  {
    id: "tertiaire-sante",
    label: "Santé / EHPAD",
    description: "Établissements de soin",
    icon: "🏥",
  },
  {
    id: "tertiaire-enseignement",
    label: "Enseignement",
    description: "Écoles, universités",
    icon: "🎓",
  },
  {
    id: "tertiaire-commerce",
    label: "Commerce / GMS",
    description: "Retail, supermarchés",
    icon: "🛒",
  },
  {
    id: "tertiaire-hotellerie",
    label: "Hôtellerie / Restauration",
    description: "Hôtels, restaurants",
    icon: "🏨",
  },
  {
    id: "tertiaire-logistique",
    label: "Logistique / Industrie",
    description: "Entrepôts, ateliers",
    icon: "🏭",
  },
  {
    id: "residentiel",
    label: "Résidentiel collectif",
    description: "Copropriétés, logements sociaux",
    icon: "🏠",
  },
  {
    id: "agricole",
    label: "Agriculture / Serres",
    description: "Serres maraîchères",
    icon: "🌿",
  },
  {
    id: "froid",
    label: "Froid commercial",
    description: "Agroalimentaire, surgélation",
    icon: "❄️",
  },
];

export default function Step2Secteur({ data, onUpdate, onNext, onPrev }: Props) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.secteur) {
      setError("Veuillez sélectionner votre secteur d'activité.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0d1e3a] mb-2">Secteur d&apos;activité</h2>
        <p className="text-[#2c2c2a]/60 text-sm">
          Sélectionnez le secteur qui correspond le mieux à votre activité principale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {secteurs.map((secteur) => {
          const isSelected = data.secteur === secteur.id;
          return (
            <button
              key={secteur.id}
              type="button"
              onClick={() => {
                onUpdate({ secteur: secteur.id as FormState["secteur"] });
                setError("");
              }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#1a9e75] bg-[#1a9e75]/5 shadow-sm"
                  : "border-gray-100 bg-white hover:border-[#1a9e75]/40 hover:bg-[#1a9e75]/5"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  isSelected ? "bg-[#1a9e75]/15" : "bg-gray-50"
                }`}
              >
                {secteur.icon}
              </div>
              <div>
                <div
                  className={`font-semibold text-sm ${
                    isSelected ? "text-[#1a9e75]" : "text-[#0d1e3a]"
                  }`}
                >
                  {secteur.label}
                </div>
                <div className="text-xs text-[#2c2c2a]/50 mt-0.5">{secteur.description}</div>
              </div>
              {isSelected && (
                <div className="ml-auto shrink-0">
                  <div className="w-5 h-5 rounded-full bg-[#1a9e75] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 border border-gray-200 text-[#2c2c2a]/70 hover:text-[#0d1e3a] hover:border-gray-300 font-medium px-6 py-3 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 bg-[#0d1e3a] hover:bg-[#1a3460] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Continuer
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
