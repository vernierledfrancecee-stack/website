"use client";

import type { FormState } from "./SimulateurForm";

interface Props {
  data: FormState;
  onUpdate: (d: Partial<FormState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const eclairageOptions = [
  { id: "led", label: "Déjà en LED complète", desc: "100% de votre éclairage est en LED" },
  { id: "mixte", label: "Mixte (partiellement LED)", desc: "Une partie est encore en ancien éclairage" },
  { id: "non-led", label: "Néon / Fluo / Halogène", desc: "Pas de LED actuellement" },
  { id: "inconnu", label: "Je ne sais pas", desc: "Incertain sur le type d'éclairage" },
];

const energieOptions = [
  { id: "gaz", label: "Gaz naturel", badge: "Éligible PAC" },
  { id: "fioul", label: "Fioul", badge: "Éligible PAC" },
  { id: "elec", label: "Électricité", badge: null },
  { id: "reseau-chaleur", label: "Réseau de chaleur", badge: "Vérification RCU" },
  { id: "autre", label: "Autre / Ne sais pas", badge: null },
];

export default function Step4Equipements({ data, onUpdate, onNext, onPrev }: Props) {
  const secteur = data.secteur ?? "";
  const secteursTertiaires = [
    "tertiaire-bureaux",
    "tertiaire-sante",
    "tertiaire-enseignement",
    "tertiaire-commerce",
    "tertiaire-hotellerie",
    "tertiaire-logistique",
    "residentiel",
  ];
  const secteursFroid = ["froid", "tertiaire-commerce", "tertiaire-hotellerie", "tertiaire-logistique"];

  const showChauffage = secteursTertiaires.includes(secteur);
  const showFroid = secteursFroid.includes(secteur);
  const showLedNombre = data.eclairage && data.eclairage !== "led";
  const showChauffageDetail = data.energie === "gaz" || data.energie === "fioul";

  const numInput = (name: keyof FormState, label: string, unit = "", placeholder = "") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
        {label} {unit && <span className="text-[#2c2c2a]/40 font-normal">({unit})</span>}
      </label>
      <input
        id={name}
        type="number"
        value={(data[name] as number) ?? ""}
        onChange={(e) =>
          onUpdate({ [name]: e.target.value ? parseFloat(e.target.value) : undefined })
        }
        placeholder={placeholder}
        min={0}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
      />
    </div>
  );

  const radioGroup = (
    name: keyof FormState,
    label: string,
    options: { id: string; label: string }[]
  ) => (
    <div>
      <label className="block text-sm font-medium text-[#0d1e3a] mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onUpdate({ [name]: opt.id as never })}
            className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
              data[name] === opt.id
                ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0d1e3a] mb-2">Vos équipements</h2>
        <p className="text-[#2c2c2a]/60 text-sm">
          Décrivez vos installations actuelles pour identifier les optimisations possibles.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section A — Éclairage */}
        <div>
          <h3 className="text-base font-bold text-[#0d1e3a] mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#0d1e3a] text-white text-xs flex items-center justify-center font-bold">A</span>
            Éclairage intérieur actuel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {eclairageOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onUpdate({ eclairage: opt.id as FormState["eclairage"] })}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  data.eclairage === opt.id
                    ? "border-[#1a9e75] bg-[#1a9e75]/5"
                    : "border-gray-100 hover:border-[#1a9e75]/30"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    data.eclairage === opt.id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"
                  }`}
                >
                  {data.eclairage === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className={`font-medium text-sm ${data.eclairage === opt.id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                    {opt.label}
                  </div>
                  <div className="text-xs text-[#2c2c2a]/50">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {showLedNombre && (
            <div className="bg-[#f8f9fa] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {numInput("nombreLuminaires", "Nombre approximatif de luminaires", "", "ex: 150")}
                <div>
                  <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Type de local</label>
                  <select
                    value={data.typeLocal ?? ""}
                    onChange={(e) => onUpdate({ typeLocal: e.target.value as FormState["typeLocal"] })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="open space">Open space / Bureau</option>
                    <option value="entrepôt">Entrepôt / Hangar</option>
                    <option value="atelier">Atelier / Production</option>
                    <option value="parking">Parking / Sous-sol</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section B — Chauffage */}
        {showChauffage && (
          <div>
            <h3 className="text-base font-bold text-[#0d1e3a] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#1a9e75] text-white text-xs flex items-center justify-center font-bold">B</span>
              Chauffage actuel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              {energieOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdate({ energie: opt.id as FormState["energie"] })}
                  className={`relative flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all ${
                    data.energie === opt.id
                      ? "border-[#1a9e75] bg-[#1a9e75]/5"
                      : "border-gray-100 hover:border-[#1a9e75]/30"
                  }`}
                >
                  <div className={`font-medium text-sm mb-1 ${data.energie === opt.id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                    {opt.label}
                  </div>
                  {opt.badge && (
                    <span className="text-xs bg-[#1a9e75]/20 text-[#1a9e75] px-2 py-0.5 rounded-full font-medium">
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {showChauffageDetail && (
              <div className="bg-[#f8f9fa] rounded-xl p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {numInput("puissanceChaudiere", "Puissance chaudière actuelle", "kW", "ex: 120")}
                  {numInput("anneeChaudiere", "Année d'installation chaudière", "", "ex: 2005")}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {radioGroup("ecsIncluse", "Production ECS incluse ?", [
                    { id: "oui", label: "Oui" },
                    { id: "non", label: "Non" },
                  ])}
                  {radioGroup("plusieursChaudieres", "Plusieurs chaudières ?", [
                    { id: "oui", label: "Oui" },
                    { id: "non", label: "Non" },
                  ])}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0d1e3a] mb-2">Type d&apos;émetteurs</label>
                  <div className="flex flex-wrap gap-2">
                    {["radiateurs", "plancher chauffant", "ventilo-convecteurs", "autre"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => onUpdate({ typeEmetteurs: t as FormState["typeEmetteurs"] })}
                        className={`py-1.5 px-3 rounded-lg border text-sm transition-all capitalize ${
                          data.typeEmetteurs === t
                            ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                            : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section C — Froid commercial */}
        {showFroid && (
          <div>
            <h3 className="text-base font-bold text-[#0d1e3a] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#0d1e3a] text-white text-xs flex items-center justify-center font-bold">C</span>
              Équipements frigorifiques
            </h3>
            <div className="bg-[#f8f9fa] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {numInput("froidPositifUnites", "Froid positif — nb d'unités", "", "ex: 8")}
                {numInput("froidPositifPuissance", "Froid positif — puissance compresseurs", "kW", "ex: 120")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {numInput("froidNegatifUnites", "Froid négatif — nb d'unités", "", "ex: 4")}
                {numInput("froidNegatifPuissance", "Froid négatif — puissance compresseurs", "kW", "ex: 60")}
              </div>
              <div>
                <label htmlFor="marqueCompresseurs" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
                  Marque principale
                </label>
                <input
                  id="marqueCompresseurs"
                  type="text"
                  value={data.marqueCompresseurs ?? ""}
                  onChange={(e) => onUpdate({ marqueCompresseurs: e.target.value })}
                  placeholder="ex: Carrier, Danfoss, Copeland..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {radioGroup("regulationExistante", "Régulation automatique existante ?", [
                  { id: "oui", label: "Oui" },
                  { id: "non", label: "Non" },
                  { id: "inconnu", label: "Ne sais pas" },
                ])}
                {numInput("dernierEntretien", "Dernier entretien (année)", "", "ex: 2022")}
              </div>
            </div>
          </div>
        )}

        {/* Section D — Électrique */}
        <div>
          <h3 className="text-base font-bold text-[#0d1e3a] mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#0d1e3a] text-white text-xs flex items-center justify-center font-bold">D</span>
            Installation électrique
          </h3>
          <div className="bg-[#f8f9fa] rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0d1e3a] mb-2">Type d&apos;alimentation</label>
                <div className="flex gap-2">
                  {["monophase", "triphase"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onUpdate({ alimentationElec: t as FormState["alimentationElec"] })}
                      className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all capitalize ${
                        data.alimentationElec === t
                          ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                          : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
                      }`}
                    >
                      {t === "monophase" ? "Monophasé" : "Triphasé"}
                    </button>
                  ))}
                </div>
              </div>
              {numInput("puissanceSouscrite", "Puissance souscrite", "kVA", "ex: 36")}
            </div>
          </div>
        </div>

        {/* Remarques */}
        <div>
          <label htmlFor="remarques" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Remarques libres <span className="text-[#2c2c2a]/40 font-normal">(optionnel)</span>
          </label>
          <textarea
            id="remarques"
            value={data.remarques ?? ""}
            onChange={(e) => onUpdate({ remarques: e.target.value })}
            rows={3}
            maxLength={2000}
            placeholder="Précisions sur votre situation, projets en cours, contraintes particulières..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all resize-none"
          />
          <p className="text-xs text-[#2c2c2a]/40 mt-1 text-right">{(data.remarques ?? "").length}/2000</p>
        </div>
      </div>

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
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Voir mes résultats
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
