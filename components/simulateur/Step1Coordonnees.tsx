"use client";

import { useState } from "react";
import type { FormState } from "./SimulateurForm";

interface Props {
  data: FormState;
  onUpdate: (d: Partial<FormState>) => void;
  onNext: () => void;
}

export default function Step1Coordonnees({ data, onUpdate, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.nom?.trim() || data.nom.trim().length < 2) errs.nom = "Nom requis (2 caractères min.)";
    if (!data.prenom?.trim() || data.prenom.trim().length < 2) errs.prenom = "Prénom requis";
    if (!data.email?.trim()) errs.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Email invalide";
    if (!data.consentement) errs.consentement = "Vous devez accepter la politique de confidentialité";
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  const field = (name: keyof FormState, label: string, type = "text", required = false, placeholder = "") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
        {label} {required && <span className="text-[#1a9e75]">*</span>}
      </label>
      <input
        id={name}
        type={type}
        value={(data[name] as string) ?? ""}
        onChange={(e) => onUpdate({ [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 transition-all ${
          errors[name] ? "border-red-400 focus:ring-red-300" : "border-gray-200 focus:border-[#1a9e75]"
        }`}
        autoComplete={type === "email" ? "email" : "on"}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0d1e3a] mb-2">Vos coordonnées</h2>
        <p className="text-[#2c2c2a]/60 text-sm">
          Ces informations permettent à nos experts de vous recontacter avec une analyse personnalisée.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field("nom", "Nom", "text", true, "Dupont")}
          {field("prenom", "Prénom", "text", true, "Marie")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field("societe", "Société / Organisation", "text", false, "Mon Entreprise SAS")}
          {field("fonction", "Fonction", "text", false, "Directeur technique")}
        </div>
        {field("email", "Adresse email", "email", true, "contact@monentreprise.com")}
        {field("telephone", "Téléphone", "tel", false, "0612345678")}
        {field("siteAdresse", "Adresse du site concerné", "text", false, "12 rue de la Paix, 75001 Paris")}

        <div>
          <label htmlFor="siret" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            SIRET <span className="text-[#2c2c2a]/40 font-normal">(optionnel)</span>
          </label>
          <input
            id="siret"
            type="text"
            value={(data.siret as string) ?? ""}
            onChange={(e) => onUpdate({ siret: e.target.value.replace(/\D/g, "").slice(0, 14) })}
            placeholder="12345678901234"
            maxLength={14}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
          />
        </div>

        {/* Consentement RGPD */}
        <div className={`border rounded-xl p-4 ${errors.consentement ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.consentement === true}
              onChange={(e) => onUpdate({ consentement: e.target.checked ? true : undefined })}
              className="mt-0.5 w-4 h-4 accent-[#1a9e75] rounded"
            />
            <span className="text-xs text-[#2c2c2a]/70 leading-relaxed">
              J&apos;accepte que mes données soient utilisées pour analyser mon éligibilité CEE
              et être recontacté par LEDX Énergie. Données collectées par LEDX Énergie,
              25 rue de Ponthieu 75008 Paris. Conservation : 3 ans. Droits :{" "}
              <a href="mailto:rgpd@ledxenergie.com" className="text-[#1a9e75] underline">
                rgpd@ledxenergie.com
              </a>
              .{" "}
              <a href="/mentions-legales#confidentialite" className="text-[#1a9e75] underline">
                Politique de confidentialité
              </a>
            </span>
          </label>
          {errors.consentement && <p className="mt-2 text-xs text-red-500">{errors.consentement}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-8">
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
