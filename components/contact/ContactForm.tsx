"use client";

import { useState } from "react";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  secteur: string;
  message: string;
}

const initialData: FormData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  societe: "",
  secteur: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!formData.nom.trim()) errs.nom = "Nom requis";
    if (!formData.prenom.trim()) errs.prenom = "Prénom requis";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Email invalide";
    if (formData.message.trim().length < 10)
      errs.message = "Message trop court (10 caractères minimum)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
      setFormData(initialData);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#1a9e75]/10 border border-[#1a9e75]/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#1a9e75]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-[#0d1e3a] text-xl mb-2">Message envoyé !</h3>
        <p className="text-[#2c2c2a]/60 text-sm">
          Nos experts vous répondront sous 24 heures ouvrées.
        </p>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Nom <span className="text-[#1a9e75]">*</span>
          </label>
          <input
            id="nom"
            type="text"
            value={formData.nom}
            onChange={(e) => update("nom", e.target.value)}
            placeholder="Dupont"
            className={inputClass("nom")}
          />
          {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Prénom <span className="text-[#1a9e75]">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            value={formData.prenom}
            onChange={(e) => update("prenom", e.target.value)}
            placeholder="Marie"
            className={inputClass("prenom")}
          />
          {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Email <span className="text-[#1a9e75]">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="contact@entreprise.com"
          className={inputClass("email")}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Téléphone
          </label>
          <input
            id="telephone"
            type="tel"
            value={formData.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            placeholder="0612345678"
            className={inputClass("telephone")}
          />
        </div>
        <div>
          <label htmlFor="societe" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Société
          </label>
          <input
            id="societe"
            type="text"
            value={formData.societe}
            onChange={(e) => update("societe", e.target.value)}
            placeholder="Mon Entreprise SAS"
            className={inputClass("societe")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="secteur" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Secteur d&apos;activité
        </label>
        <select
          id="secteur"
          value={formData.secteur}
          onChange={(e) => update("secteur", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
        >
          <option value="">Sélectionner...</option>
          <option value="tertiaire-bureaux">Bureaux / Services</option>
          <option value="tertiaire-sante">Santé / EHPAD</option>
          <option value="tertiaire-enseignement">Enseignement</option>
          <option value="tertiaire-commerce">Commerce / GMS</option>
          <option value="tertiaire-hotellerie">Hôtellerie / Restauration</option>
          <option value="tertiaire-logistique">Logistique / Industrie</option>
          <option value="residentiel">Résidentiel collectif</option>
          <option value="agricole">Agriculture / Serres</option>
          <option value="froid">Froid commercial</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Message <span className="text-[#1a9e75]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Décrivez votre projet ou vos questions..."
          maxLength={2000}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all"
      >
        {status === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </button>
    </form>
  );
}
