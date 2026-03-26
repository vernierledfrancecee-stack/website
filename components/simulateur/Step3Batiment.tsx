"use client";

import type { FormState } from "./SimulateurForm";

interface Props {
  data: FormState;
  onUpdate: (d: Partial<FormState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const zones = [
  { id: "H1", label: "Zone H1 — Nord", desc: "Hauts-de-France, Grand Est, Normandie, Bretagne, Centre-Val de Loire, Bourgogne-Franche-Comté, Auvergne" },
  { id: "H2", label: "Zone H2 — Centre", desc: "Île-de-France, Pays de la Loire, Nouvelle-Aquitaine (nord), Occitanie (nord)" },
  { id: "H3", label: "Zone H3 — Sud", desc: "PACA, Occitanie (Méditerranée), Corse" },
];

export default function Step3Batiment({ data, onUpdate, onNext, onPrev }: Props) {
  const isResidentiel = data.secteur === "residentiel";
  const isAgricole = data.secteur === "agricole";

  const numInput = (
    name: keyof FormState,
    label: string,
    unit: string,
    required = false,
    min?: number,
    max?: number,
    placeholder = ""
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
        {label} {required && <span className="text-[#1a9e75]">*</span>}
        {unit && <span className="text-[#2c2c2a]/40 font-normal ml-1">({unit})</span>}
      </label>
      <input
        id={name}
        type="number"
        value={(data[name] as number) ?? ""}
        onChange={(e) =>
          onUpdate({ [name]: e.target.value ? parseFloat(e.target.value) : undefined })
        }
        min={min}
        max={max}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
      />
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0d1e3a] mb-2">Votre bâtiment</h2>
        <p className="text-[#2c2c2a]/60 text-sm">
          Ces informations permettent de calculer précisément votre éligibilité selon les seuils réglementaires.
        </p>
      </div>

      <div className="space-y-6">
        {/* Informations générales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {numInput("anneeConstruction", "Année de construction", "", false, 1800, new Date().getFullYear(), "ex: 1985")}
          {numInput("surface", "Surface totale chauffée", "m²", false, 1, 500000, "ex: 2500")}
        </div>

        {numInput("nombreEtages", "Nombre d'étages", "", false, 1, 100, "ex: 3")}

        {/* Zone climatique */}
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-3">
            Zone climatique
          </label>
          <div className="space-y-2">
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => onUpdate({ zone: zone.id as "H1" | "H2" | "H3" })}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  data.zone === zone.id
                    ? "border-[#1a9e75] bg-[#1a9e75]/5"
                    : "border-gray-100 hover:border-[#1a9e75]/30"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    data.zone === zone.id
                      ? "border-[#1a9e75] bg-[#1a9e75]"
                      : "border-gray-300"
                  }`}
                >
                  {data.zone === zone.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${data.zone === zone.id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                    {zone.label}
                  </div>
                  <div className="text-xs text-[#2c2c2a]/50 mt-0.5">{zone.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Champs conditionnels résidentiel */}
        {isResidentiel && (
          <div className="border border-[#1a9e75]/20 rounded-xl p-5 bg-[#1a9e75]/5">
            <h3 className="text-sm font-semibold text-[#0d1e3a] mb-4">
              Informations résidentiel
            </h3>
            <div className="space-y-4">
              {numInput("nombreLogements", "Nombre de logements", "", false, 1, 10000, "ex: 48")}
              <div>
                <label className="block text-sm font-medium text-[#0d1e3a] mb-2">
                  Réseau de chauffage collectif à eau chaude ?
                </label>
                <div className="flex gap-3">
                  {["oui", "non"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onUpdate({ chauffageCollectif: val as "oui" | "non" })}
                      className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all capitalize ${
                        data.chauffageCollectif === val
                          ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                          : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Champs conditionnels agricole */}
        {isAgricole && (
          <div className="border border-[#1a9e75]/20 rounded-xl p-5 bg-[#1a9e75]/5">
            <h3 className="text-sm font-semibold text-[#0d1e3a] mb-4">
              Informations serres maraîchères
            </h3>
            <div className="space-y-4">
              {numInput("surfaceSerres", "Surface serres maraîchères", "m²", false, 1, 100000, "ex: 5000")}

              <div>
                <label className="block text-sm font-medium text-[#0d1e3a] mb-2">
                  Type de serre
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Multichapelle", "Tunnel", "Photovoltaïque", "Autre"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onUpdate({ typeSerre: type as FormState["typeSerre"] })}
                      className={`py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        data.typeSerre === type
                          ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                          : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="productionPrincipale" className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
                  Production principale
                </label>
                <input
                  id="productionPrincipale"
                  type="text"
                  value={data.productionPrincipale ?? ""}
                  onChange={(e) => onUpdate({ productionPrincipale: e.target.value })}
                  placeholder="ex: Tomates, salades, fraises..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all"
                />
              </div>

              {numInput("hauteurCheneau", "Hauteur sous chéneau", "m", false, 0.5, 30, "ex: 4.5")}
            </div>
          </div>
        )}
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
