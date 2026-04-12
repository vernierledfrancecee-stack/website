"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Profil = "occupant" | "bailleur" | "societe" | "locataire";
type Classe = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type Surface = "moins60" | "60-90" | "90-130" | "plus130";

interface Answers {
  profil?: Profil;
  classe?: Classe;
  surface?: Surface;
}

interface ContactFields {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  message: string;
}

type Step = 1 | 2 | 3 | 4;
type Status = "idle" | "sending" | "success" | "error";

// ─── Données des options ──────────────────────────────────────────────────────

const profilOptions: { value: Profil; label: string; icon: string; eligible: boolean }[] = [
  { value: "occupant", label: "Propriétaire occupant", icon: "🏠", eligible: true },
  { value: "bailleur", label: "Propriétaire bailleur", icon: "🔑", eligible: true },
  { value: "societe",  label: "SCI / Société (LMNP, SCPI…)", icon: "🏢", eligible: true },
  { value: "locataire", label: "Locataire", icon: "❌", eligible: false },
];

const classeOptions: { value: Classe; label: string; color: string; textColor: string; eligible: boolean }[] = [
  { value: "A", label: "A", color: "#e5e7eb", textColor: "#6b7280", eligible: false },
  { value: "B", label: "B", color: "#e5e7eb", textColor: "#6b7280", eligible: false },
  { value: "C", label: "C", color: "#fed7aa", textColor: "#c2410c", eligible: true },
  { value: "D", label: "D", color: "#fdba74", textColor: "#c2410c", eligible: true },
  { value: "E", label: "E", color: "#fca5a5", textColor: "#b91c1c", eligible: true },
  { value: "F", label: "F", color: "#f87171", textColor: "#991b1b", eligible: true },
  { value: "G", label: "G", color: "#dc2626", textColor: "#ffffff", eligible: true },
];

const surfaceOptions: { value: Surface; label: string }[] = [
  { value: "moins60",  label: "Moins de 60 m²" },
  { value: "60-90",   label: "60 à 90 m²" },
  { value: "90-130",  label: "90 à 130 m²" },
  { value: "plus130", label: "Plus de 130 m²" },
];

// ─── Barre de progression ─────────────────────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const labels = ["Profil", "DPE", "Surface", "Contact"];
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-0">
        {labels.map((label, i) => {
          const n = (i + 1) as Step;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    done
                      ? "bg-[#1a9e75] text-white"
                      : active
                      ? "bg-[#0d1e3a] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {done ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    n
                  )}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium hidden sm:block ${active ? "text-[#0d1e3a]" : done ? "text-[#1a9e75]" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
              {i < labels.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 sm:mx-2 transition-colors ${done ? "bg-[#1a9e75]" : "bg-gray-100"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Message non éligible ─────────────────────────────────────────────────────

function NonEligible({ reason, onBack }: { reason: string; onBack: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="font-bold text-[#0d1e3a] text-lg mb-2">Non éligible</h3>
      <p className="text-[#2c2c2a]/60 text-sm mb-6 max-w-xs mx-auto">{reason}</p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-[#1a9e75] font-medium hover:text-[#147a5b] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Recommencer
      </button>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function EligibiliteForm() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [nonEligible, setNonEligible] = useState<string | null>(null);
  const [fields, setFields] = useState<ContactFields>({ prenom: "", nom: "", telephone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactFields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const reset = () => {
    setStep(1);
    setAnswers({});
    setNonEligible(null);
    setFields({ prenom: "", nom: "", telephone: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  // ── Étape 1 : Profil ──
  const handleProfil = (profil: Profil) => {
    const opt = profilOptions.find((o) => o.value === profil)!;
    if (!opt.eligible) {
      setNonEligible("Les locataires ne peuvent pas bénéficier des CEE. Rapprochez-vous de votre propriétaire.");
      return;
    }
    setAnswers((a) => ({ ...a, profil }));
    setStep(2);
  };

  // ── Étape 2 : Classe DPE ──
  const handleClasse = (classe: Classe) => {
    const opt = classeOptions.find((o) => o.value === classe)!;
    if (!opt.eligible) {
      setNonEligible("Votre logement est déjà bien classé (A ou B). Il ne répond pas aux critères de la fiche BAR-TH-174.");
      return;
    }
    setAnswers((a) => ({ ...a, classe }));
    setStep(3);
  };

  // ── Étape 3 : Surface ──
  const handleSurface = (surface: Surface) => {
    setAnswers((a) => ({ ...a, surface }));
    setStep(4);
  };

  // ── Étape 4 : Validation formulaire contact ──
  const validate = (): boolean => {
    const e: Partial<ContactFields> = {};
    if (!fields.prenom.trim() || fields.prenom.trim().length < 2) e.prenom = "Prénom requis (min. 2 caractères)";
    if (!fields.nom.trim() || fields.nom.trim().length < 2) e.nom = "Nom requis (min. 2 caractères)";
    if (!fields.telephone.trim() || !/^(\+33|0)[1-9](\d{8})$/.test(fields.telephone.trim())) e.telephone = "Numéro invalide (ex. 0612345678)";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) e.email = "Email invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const profilLabel = profilOptions.find((o) => o.value === answers.profil)?.label ?? "";
    const surfaceLabel = surfaceOptions.find((o) => o.value === answers.surface)?.label ?? "";
    const messageBody = [
      `Profil : ${profilLabel}`,
      `Classe DPE : ${answers.classe}`,
      `Surface : ${surfaceLabel}`,
      fields.message ? `\nMessage : ${fields.message}` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: fields.prenom.trim(),
          nom: fields.nom.trim(),
          email: fields.email.trim().toLowerCase(),
          telephone: fields.telephone.trim(),
          societe: "",
          secteur: "residentiel",
          message: messageBody,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof ContactFields) =>
    `w-full px-4 py-3 rounded-xl border text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75]"
    }`;

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <section className="bg-white py-10 sm:py-14 border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-[#1a9e75]/10 border border-[#1a9e75]/20 text-[#1a9e75] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Vérification gratuite
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d1e3a]">
            Vérifiez votre éligibilité en 2 minutes
          </h2>
          <p className="text-[#2c2c2a]/55 text-sm mt-2">
            Sans engagement · Réponse sous 24h
          </p>
        </div>

        {/* Carte formulaire */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-8">

          {/* Succès global */}
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#1a9e75]/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0d1e3a] text-xl mb-2">
                Merci {fields.prenom.trim()} !
              </h3>
              <p className="text-[#2c2c2a]/60 text-sm mb-6 max-w-xs mx-auto">
                Notre équipe LEDX Rénov&apos;Habitat vous contacte sous 24h pour votre étude gratuite.
              </p>
              <button
                onClick={reset}
                className="text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/70 transition-colors"
              >
                Nouvelle simulation
              </button>
            </div>
          ) : nonEligible ? (
            <NonEligible reason={nonEligible} onBack={reset} />
          ) : (
            <>
              <ProgressBar step={step} />

              {/* ── Étape 1 : Profil ── */}
              {step === 1 && (
                <div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-4">
                    Quel est votre profil ?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profilOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleProfil(opt.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                          opt.eligible
                            ? "border-gray-200 hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 active:scale-[0.98]"
                            : "border-gray-100 bg-gray-50 hover:border-red-200 hover:bg-red-50/60 active:scale-[0.98]"
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className={`font-medium text-sm ${opt.eligible ? "text-[#0d1e3a]" : "text-gray-400"}`}>
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 2 : Classe DPE ── */}
              {step === 2 && (
                <div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-4">
                    Quelle est la classe énergétique de votre bien ?
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-4">
                    {classeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleClasse(opt.value)}
                        className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border border-gray-100 hover:border-[#1a9e75]/40 hover:shadow-sm transition-all duration-150 active:scale-95"
                      >
                        <span
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg"
                          style={{ backgroundColor: opt.color, color: opt.textColor }}
                        >
                          {opt.label}
                        </span>
                        {!opt.eligible && (
                          <span className="text-[9px] text-gray-400 hidden sm:block">Non éligible</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#2c2c2a]/45 text-center">
                    Classes A et B : déjà performantes, non éligibles BAR-TH-174
                  </p>
                  <div className="mt-5 flex justify-start">
                    <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/70 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                  </div>
                </div>
              )}

              {/* ── Étape 3 : Surface ── */}
              {step === 3 && (
                <div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-4">
                    Quelle est la surface habitable ?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {surfaceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSurface(opt.value)}
                        className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 font-medium text-sm text-[#0d1e3a] transition-all duration-150 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-start">
                    <button onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/70 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                  </div>
                </div>
              )}

              {/* ── Étape 4 : Contact ── */}
              {step === 4 && (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Bandeau de confirmation éligibilité */}
                  <div className="flex items-start gap-3 bg-[#1a9e75]/8 border border-[#1a9e75]/20 rounded-xl p-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#1a9e75]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#0d1e3a] text-sm">
                        Bonne nouvelle, votre bien est éligible !
                      </p>
                      <p className="text-[#2c2c2a]/60 text-xs mt-0.5">
                        Un expert LEDX Rénov&apos;Habitat vous contacte sous 24h pour votre étude gratuite.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label htmlFor="prenom" className="block text-xs font-medium text-[#2c2c2a]/60 mb-1.5">
                        Prénom <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="prenom"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Jean"
                        value={fields.prenom}
                        onChange={(e) => setFields((f) => ({ ...f, prenom: e.target.value }))}
                        className={inputClass("prenom")}
                      />
                      {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-xs font-medium text-[#2c2c2a]/60 mb-1.5">
                        Nom <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="nom"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Dupont"
                        value={fields.nom}
                        onChange={(e) => setFields((f) => ({ ...f, nom: e.target.value }))}
                        className={inputClass("nom")}
                      />
                      {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label htmlFor="telephone" className="block text-xs font-medium text-[#2c2c2a]/60 mb-1.5">
                        Téléphone <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="telephone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="0612345678"
                        value={fields.telephone}
                        onChange={(e) => setFields((f) => ({ ...f, telephone: e.target.value }))}
                        className={inputClass("telephone")}
                      />
                      {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[#2c2c2a]/60 mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jean@exemple.fr"
                        value={fields.email}
                        onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="message" className="block text-xs font-medium text-[#2c2c2a]/60 mb-1.5">
                      Informations complémentaires <span className="text-[#2c2c2a]/35">(optionnel)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Décrivez votre projet, vos questions…"
                      value={fields.message}
                      onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 mb-4 text-center">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all active:scale-[0.98]"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Recevoir mon étude d&apos;éligibilité gratuite
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#2c2c2a]/35 mt-3">
                    Sans engagement · Réponse sous 24h
                  </p>

                  <div className="mt-4 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/70 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
