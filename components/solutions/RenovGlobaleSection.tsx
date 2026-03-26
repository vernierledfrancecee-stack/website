"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";

export default function RenovGlobaleSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="renov-globale"
        className="scroll-mt-24 bg-[#0d1e3a] rounded-2xl overflow-hidden relative"
      >
        {/* Texture grain subtle */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative p-8 lg:p-10">
          {/* Badge BIENTÔT DISPONIBLE */}
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-[#1a9e75]/20 border border-[#1a9e75]/40 rounded-full px-4 py-1.5">
              <span
                className="w-2 h-2 rounded-full bg-[#1a9e75]"
                style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
              />
              <span className="text-[#1a9e75] text-xs font-bold uppercase tracking-wider">
                Bientôt disponible
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Rénovation Globale — Bâtiment Tertiaire
          </h2>
          <p className="text-[#1a9e75] font-semibold text-sm mb-6">
            La fiche qui va tout changer pour le tertiaire
          </p>

          <div className="text-white/70 text-sm leading-relaxed mb-8 max-w-2xl">
            <p>
              Confirmée lors de la journée technique ATEE du 2 février 2026,
              cette nouvelle fiche CEE est actuellement en cours d&apos;élaboration
              par les pouvoirs publics. LEDX Énergie se prépare dès aujourd&apos;hui
              pour accompagner les premiers dossiers dès le jour de sa parution.
            </p>
            <p className="mt-3">
              Pour la première fois, le secteur tertiaire disposera d&apos;un
              dispositif de rénovation globale comparable au résidentiel —
              avec des primes calculées sur la performance énergétique
              globale atteinte, et non poste par poste.
            </p>
          </div>

          {/* Cards travaux pressentis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Enveloppe",
                desc: "Isolation toiture, murs, planchers, remplacement menuiseries, façades performantes",
                icon: "🧱",
              },
              {
                title: "Chauffage & Ventilation",
                desc: "Pompes à chaleur, chaudière biomasse, VMC simple/double flux, géothermie",
                icon: "♨️",
              },
              {
                title: "Éclairage & Froid",
                desc: "LED haute performance (BAT-EQ-127), systèmes frigorifiques haute efficacité",
                icon: "💡",
              },
              {
                title: "Régulation & Pilotage",
                desc: "GTB, destratification d'air, raccordement réseau de chaleur/froid",
                icon: "⚙️",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" role="img" aria-label={card.title}>{card.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{card.title}</div>
                    <div className="text-white/50 text-xs leading-relaxed">{card.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Encadré chiffre clé */}
          <div className="bg-[#1a9e75] rounded-xl p-5 mb-4">
            <div className="text-white font-bold text-xl mb-1">
              Jusqu&apos;à 60% des travaux financés
            </div>
            <div className="text-white/80 text-sm">
              Bouquet multi-postes, un bénéficiaire unique, compatible Décret Tertiaire
            </div>
          </div>

          {/* Encadré "Pourquoi agir maintenant" */}
          <div className="bg-white/5 border-l-4 border-white/30 rounded-r-xl p-5 mb-8">
            <div className="text-white font-semibold text-sm mb-2">
              Pourquoi agir maintenant ?
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Le montage d&apos;un dossier de rénovation globale demande 3 à 6 mois
              (audit, chiffrage, AMO). En commençant aujourd&apos;hui, vous serez prêt
              à déposer dès le premier jour de publication — et à bénéficier des meilleurs taux.
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
          >
            Être alerté dès la parution
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Note légale */}
          <p className="mt-6 text-white/30 text-xs leading-relaxed max-w-2xl">
            Fiche en cours d&apos;élaboration — source ATEE, journée technique du 2 février 2026.
            Aucune date officielle de parution n&apos;est confirmée à ce jour.
            Code officiel non encore attribué.
          </p>
        </div>
      </section>

      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="SOLUTIONS"
      />
    </>
  );
}
