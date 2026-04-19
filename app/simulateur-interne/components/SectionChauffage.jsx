"use client";

const CLS = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

function BinaryToggle({ label, required, valueYes = "oui", valueNo = "non", value, onChange, error, labelYes = "Oui", labelNo = "Non" }) {
  return (
    <div>
      <p className="text-sm font-medium text-[#0d1e3a] mb-2">
        {label}{required && <span className="text-[#1a9e75] ml-1">*</span>}
      </p>
      <div className="flex gap-3">
        {[{ v: valueYes, l: labelYes }, { v: valueNo, l: labelNo }].map(({ v, l }) => (
          <button key={v} type="button" onClick={() => onChange(v)}
            className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
              value === v ? "border-[#1a9e75] bg-[#1a9e75] text-white" : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"}`}>
            {l}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const EMETTEURS = [
  { id: "radiateurs", label: "Radiateurs classiques",         desc: "PAC haute température — ETAS ~126 %" },
  { id: "planchers",  label: "Planchers chauffants",          desc: "PAC basse température — ETAS ~153 %" },
  { id: "mixte",      label: "Mixte (radiateurs + planchers)",desc: "ETAS ~126 %, PAC polyvalente" },
];

const THERMOSTATS = [
  { id: "absent_basique",  label: "Absent ou basique", desc: "Classe I, II ou III — à remplacer dans le dossier" },
  { id: "classe_iv_plus",  label: "Classe IV ou supérieure", desc: "Thermostat programmable connecté" },
  { id: "ne_sait_pas",     label: "Ne sait pas" },
];

export default function SectionChauffage({ st, set, errors }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Chauffage actuel : <strong>{st.chauffage_type}</strong> → potentiellement éligible TH-171 (PAC air/eau)
      </div>

      <BinaryToggle label="Y a-t-il déjà une PAC installée ?" required
        value={st.pac_installee} onChange={v => set({ pac_installee: v })}
        error={errors.pac_installee} />

      {st.pac_installee === "non" && (
        <>
          <div>
            <p className="text-sm font-medium text-[#0d1e3a] mb-3">
              La PAC couvrira <span className="text-[#1a9e75]">*</span>
            </p>
            <div className="flex gap-3 flex-wrap">
              {[{ v: "chauffage_seul", l: "Chauffage seul" }, { v: "chauffage_ecs", l: "Chauffage + Eau chaude" }].map(({ v, l }) => (
                <button key={v} type="button" onClick={() => set({ usage_pac: v })}
                  className={`flex-1 min-w-[140px] py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    st.usage_pac === v ? "border-[#1a9e75] bg-[#1a9e75] text-white" : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"}`}>
                  {l}
                </button>
              ))}
            </div>
            {errors.usage_pac && <p className="text-xs text-red-500 mt-1">{errors.usage_pac}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-[#0d1e3a] mb-3">
              Type d'émetteurs <span className="text-[#1a9e75]">*</span>
            </p>
            <div className="space-y-2">
              {EMETTEURS.map(({ id, label, desc }) => (
                <button key={id} type="button" onClick={() => set({ type_emetteur: id })}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    st.type_emetteur === id ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-100 hover:border-[#1a9e75]/30"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    st.type_emetteur === id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"}`}>
                    {st.type_emetteur === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${st.type_emetteur === id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>{label}</p>
                    <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.type_emetteur && <p className="text-xs text-red-500 mt-1">{errors.type_emetteur}</p>}
          </div>

          {st.type_emetteur && (
            <div>
              <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
                ETAS de la PAC (%) — pré-rempli, modifiable si devis en main
              </label>
              <input type="number" min={100} max={300} className={CLS}
                value={st.etas} onChange={e => set({ etas: e.target.value })} />
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-[#0d1e3a] mb-3">
              Thermostat actuel <span className="text-[#1a9e75]">*</span>
            </p>
            <div className="space-y-2">
              {THERMOSTATS.map(({ id, label, desc }) => (
                <button key={id} type="button" onClick={() => set({ thermostat: id })}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    st.thermostat === id ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-100 hover:border-[#1a9e75]/30"}`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    st.thermostat === id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"}`}>
                    {st.thermostat === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${st.thermostat === id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>{label}</p>
                    {desc && <p className="text-xs text-[#2c2c2a]/50">{desc}</p>}
                  </div>
                </button>
              ))}
            </div>
            {errors.thermostat && <p className="text-xs text-red-500 mt-1">{errors.thermostat}</p>}
          </div>
        </>
      )}

      {st.pac_installee === "oui" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ❌ PAC déjà installée → non éligible TH-171 (remplacement uniquement)
        </div>
      )}
    </div>
  );
}
