"use client";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const APPLICATIONS = [
  { id: "haute",   label: "Haute température",   desc: "Radiateurs existants — eau > 50 °C" },
  { id: "moyenne", label: "Moyenne température",  desc: "Ventilo-convecteurs — eau 35–50 °C" },
  { id: "basse",   label: "Basse température",    desc: "Planchers chauffants — eau < 35 °C" },
];

export default function SectionPAC({ st, set, errors }) {
  return (
    <div className="space-y-6">

      {/* Accès groupe extérieur */}
      <div className="rounded-xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-[#0d1e3a] mb-3">
          Accès pour le groupe extérieur (espace ≥ 30 cm autour)
        </p>
        <div className="flex gap-3">
          {[
            { val: true,  label: "Oui" },
            { val: false, label: "Non / À vérifier" },
          ].map(({ val, label }) => (
            <button key={String(val)} type="button" onClick={() => set({ acces_exterieur: val })}
              className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                st.acces_exterieur === val
                  ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                  : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {!st.acces_exterieur && st.acces_exterieur !== "" && (
          <p className="text-xs text-amber-600 mt-2">
            À évaluer lors de la visite technique — peut limiter l'installation.
          </p>
        )}
      </div>

      {/* Surface PAC */}
      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Surface chauffée par la PAC (m²) <span className="text-[#1a9e75]">*</span>
        </label>
        <input type="number" min={1} className={INPUT_CLS + (errors.surface_pac ? " border-red-400" : "")}
          placeholder="85" value={st.surface_pac} onChange={e => set({ surface_pac: e.target.value })} />
        {errors.surface_pac && <p className="text-xs text-red-500 mt-1">{errors.surface_pac}</p>}
        {st.surface && st.surface_pac === st.surface && (
          <p className="text-xs text-[#1a9e75] mt-1">Pré-rempli depuis le DPE / Section 1.</p>
        )}
      </div>

      {/* Type d'application */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-3">
          Type d'application <span className="text-[#1a9e75]">*</span>
        </p>
        <div className="space-y-2">
          {APPLICATIONS.map(({ id, label, desc }) => (
            <button key={id} type="button" onClick={() => set({ type_application: id })}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                st.type_application === id
                  ? "border-[#1a9e75] bg-[#1a9e75]/5"
                  : "border-gray-100 hover:border-[#1a9e75]/30"
              }`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                st.type_application === id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"
              }`}>
                {st.type_application === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <p className={`font-semibold text-sm ${st.type_application === id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                  {label}
                </p>
                <p className="text-xs text-[#2c2c2a]/50">{desc}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.type_application && <p className="text-xs text-red-500 mt-1">{errors.type_application}</p>}
      </div>
    </div>
  );
}
