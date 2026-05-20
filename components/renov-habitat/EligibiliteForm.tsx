"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Profil = "occupant" | "bailleur" | "copropriete" | "locataire";
type Chauffage = "gaz" | "fioul" | "electrique" | "autre";
type TypeLogement = "maison" | "appartement";
type Step = 1 | 2 | 3 | 4;
type Status = "idle" | "sending" | "error";

interface Answers {
  profil?: Profil;
  chauffage?: Chauffage;
  typeLogement?: TypeLogement;
  balcon?: boolean;
}

interface ContactFields {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  message: string;
}

const profilOptions: { value: Profil; label: string; icon: string }[] = [
  { value: "occupant",    label: "Propriétaire occupant",   icon: "🏠" },
  { value: "bailleur",   label: "Propriétaire bailleur",   icon: "🔑" },
  { value: "copropriete", label: "Copropriété / Syndic",    icon: "🏢" },
  { value: "locataire",  label: "Locataire",               icon: "🏡" },
];

const chauffageOptions: { value: Chauffage; label: string; icon: string; eligible: boolean }[] = [
  { value: "gaz",       label: "Gaz naturel",           icon: "🔥", eligible: true  },
  { value: "fioul",     label: "Fioul / Fuel",           icon: "🛢️", eligible: true  },
  { value: "electrique", label: "Électrique",            icon: "⚡", eligible: false },
  { value: "autre",     label: "Bois / Granulés / Autre", icon: "🌿", eligible: false },
];

// ─── Barre de progression ─────────────────────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const labels = ["Profil", "Chauffage", "Logement", "Contact"];
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
                <span
                  className={`text-[10px] sm:text-xs font-medium hidden sm:block ${
                    active ? "text-[#0d1e3a]" : done ? "text-[#1a9e75]" : "text-gray-400"
                  }`}
                >
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

// ─── Bouton retour ────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/70 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </button>
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
      <h3 className="font-bold text-[#0d1e3a] text-lg mb-2">Non éligible à ce dispositif</h3>
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
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showBalconQ, setShowBalconQ] = useState(false);
  const [nonEligible, setNonEligible] = useState<string | null>(null);
  const [fields, setFields] = useState<ContactFields>({
    prenom: "", nom: "", telephone: "", email: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const reset = () => {
    setStep(1);
    setAnswers({});
    setShowBalconQ(false);
    setNonEligible(null);
    setFields({ prenom: "", nom: "", telephone: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  // ── Étape 1 : Profil ──
  const handleProfil = (profil: Profil) => {
    setAnswers((a) => ({ ...a, profil }));
    setStep(2);
  };

  // ── Étape 2 : Chauffage ──
  const handleChauffage = (chauffage: Chauffage) => {
    const opt = chauffageOptions.find((o) => o.value === chauffage)!;
    if (!opt.eligible) {
      setNonEligible(
        "La prime PAC MaPrimeRénov' est réservée aux logements chauffés au gaz ou au fioul. Votre système de chauffage actuel n'ouvre pas droit à cette aide."
      );
      return;
    }
    setAnswers((a) => ({ ...a, chauffage }));
    setStep(3);
  };

  // ── Étape 3 : Type de logement ──
  const handleTypeLogement = (type: TypeLogement) => {
    setAnswers((a) => ({ ...a, typeLogement: type, balcon: undefined }));
    if (type === "maison") {
      setStep(4);
    } else {
      setShowBalconQ(true);
    }
  };

  // ── Étape 3b : Balcon (appartement seulement) ──
  const handleBalcon = (hasBalcon: boolean) => {
    if (!hasBalcon) {
      setNonEligible(
        "Un balcon ou une terrasse est indispensable pour installer l'unité extérieure de la pompe à chaleur en appartement."
      );
      return;
    }
    setAnswers((a) => ({ ...a, balcon: true }));
    setStep(4);
  };

  // ── Validation contact ──
  const validate = (): boolean => {
    const e: Partial<ContactFields> = {};
    if (!fields.prenom.trim() || fields.prenom.trim().length < 2)
      e.prenom = "Prénom requis (min. 2 caractères)";
    if (!fields.nom.trim() || fields.nom.trim().length < 2)
      e.nom = "Nom requis (min. 2 caractères)";
    if (!fields.telephone.trim() || !/^(\+33|0)[1-9](\d{8})$/.test(fields.telephone.trim()))
      e.telephone = "Numéro invalide (ex. 0612345678)";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      e.email = "Email invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const profilLabel = profilOptions.find((o) => o.value === answers.profil)?.label ?? "";
    const chauffageLabel = chauffageOptions.find((o) => o.value === answers.chauffage)?.label ?? "";
    const logementLabel = answers.typeLogement === "maison" ? "Maison" : "Appartement";

    const messageBody = [
      `Profil : ${profilLabel}`,
      `Chauffage : ${chauffageLabel}`,
      `Logement : ${logementLabel}`,
      answers.balcon ? "Balcon/terrasse : Oui" : "",
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
        router.push("/merci");
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

        {/* Carte */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-8">

          {/* ── Non éligible ── */}
          {nonEligible ? (
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
                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 text-left hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 transition-all duration-150 active:scale-[0.98]"
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-medium text-sm text-[#0d1e3a]">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 2 : Chauffage ── */}
              {step === 2 && (
                <div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-1">
                    Quel est votre chauffage actuel ?
                  </p>
                  <p className="text-xs text-[#2c2c2a]/50 mb-4">
                    La PAC remplace uniquement les chaudières gaz et fioul.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {chauffageOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleChauffage(opt.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 active:scale-[0.98] ${
                          opt.eligible
                            ? "border-gray-200 hover:border-[#1a9e75] hover:bg-[#1a9e75]/5"
                            : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <span className="font-medium text-sm text-[#0d1e3a] block">{opt.label}</span>
                          {opt.eligible && (
                            <span className="text-[10px] text-[#1a9e75] font-medium">Éligible PAC</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5">
                    <BackButton onClick={() => setStep(1)} />
                  </div>
                </div>
              )}

              {/* ── Étape 3 : Type de logement ── */}
              {step === 3 && !showBalconQ && (
                <div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-4">
                    Quel type de logement avez-vous ?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <button
                      onClick={() => handleTypeLogement("maison")}
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 text-left hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 transition-all duration-150 active:scale-[0.98]"
                    >
                      <span className="text-2xl">🏠</span>
                      <div>
                        <span className="font-medium text-sm text-[#0d1e3a] block">Maison individuelle</span>
                        <span className="text-[10px] text-[#1a9e75] font-medium">Toujours éligible</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleTypeLogement("appartement")}
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 text-left hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 transition-all duration-150 active:scale-[0.98]"
                    >
                      <span className="text-2xl">🏢</span>
                      <div>
                        <span className="font-medium text-sm text-[#0d1e3a] block">Appartement</span>
                        <span className="text-[10px] text-[#2c2c2a]/50">Balcon ou terrasse requis</span>
                      </div>
                    </button>
                  </div>
                  <BackButton onClick={() => setStep(2)} />
                </div>
              )}

              {/* ── Étape 3b : Balcon (appartement) ── */}
              {step === 3 && showBalconQ && (
                <div>
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
                    <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Pour les appartements, l&apos;unité extérieure de la PAC doit être placée sur un balcon ou une terrasse.
                    </p>
                  </div>
                  <p className="font-semibold text-[#0d1e3a] text-base sm:text-lg mb-4">
                    Votre appartement dispose-t-il d&apos;un balcon ou d&apos;une terrasse ?
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <button
                      onClick={() => handleBalcon(true)}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#1a9e75] hover:bg-[#1a9e75]/5 font-medium text-sm text-[#0d1e3a] transition-all duration-150 active:scale-[0.98]"
                    >
                      <svg className="w-5 h-5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Oui
                    </button>
                    <button
                      onClick={() => handleBalcon(false)}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 font-medium text-sm text-[#0d1e3a] transition-all duration-150 active:scale-[0.98]"
                    >
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Non
                    </button>
                  </div>
                  <BackButton
                    onClick={() => {
                      setShowBalconQ(false);
                      setAnswers((a) => ({ ...a, typeLogement: undefined }));
                    }}
                  />
                </div>
              )}

              {/* ── Étape 4 : Contact ── */}
              {step === 4 && (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Bandeau éligibilité */}
                  <div className="flex items-start gap-3 bg-[#1a9e75]/8 border border-[#1a9e75]/20 rounded-xl p-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#1a9e75]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#0d1e3a] text-sm">
                        Bonne nouvelle, vous êtes éligible à la PAC !
                      </p>
                      <p className="text-[#2c2c2a]/60 text-xs mt-0.5">
                        Jusqu&apos;à 9 000€ d&apos;aides · 60% d&apos;économies · Un expert vous rappelle sous 24h.
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

                  <div className="mt-4">
                    <BackButton
                      onClick={() => {
                        setShowBalconQ(answers.typeLogement === "appartement");
                        setStep(3);
                      }}
                    />
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
