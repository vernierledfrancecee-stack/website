"use client";

import { useState } from "react";
import type { SimulateurFormData } from "@/lib/validations";
import { calculerEligibilite } from "@/lib/eligibilite";
import Step1Coordonnees from "./Step1Coordonnees";
import Step2Secteur from "./Step2Secteur";
import Step3Batiment from "./Step3Batiment";
import Step4Equipements from "./Step4Equipements";
import Step5Resultats from "./Step5Resultats";
import SimulateurStepper from "./SimulateurStepper";

export type FormState = Partial<SimulateurFormData>;

const TOTAL_STEPS = 5;

export default function SimulateurForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateData = (data: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fiches = calculerEligibilite(formData);

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const normalizedData = {
        ...formData,
        telephone: formData.telephone?.replace(/[\s.\-()]/g, "") || undefined,
        fichesCibles: fiches.map((f) => f.code),
      };
      const res = await fetch("/api/simulateur/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Erreur lors de l'envoi");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#1a9e75]/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#0d1e3a] mb-3">Demande envoyée !</h2>
        <p className="text-[#2c2c2a]/60 max-w-md mx-auto">
          Nos experts LEDX Énergie analyseront votre situation et vous contacteront
          sous 24 heures ouvrées. Vérifiez votre boîte email.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SimulateurStepper currentStep={step} totalSteps={TOTAL_STEPS} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {step === 1 && (
          <Step1Coordonnees
            data={formData}
            onUpdate={updateData}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step2Secteur
            data={formData}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Batiment
            data={formData}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 4 && (
          <Step4Equipements
            data={formData}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 5 && (
          <Step5Resultats
            data={formData}
            fiches={fiches}
            onPrev={prevStep}
            onSubmit={handleFinalSubmit}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </div>
  );
}
