"use client";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const EMETTEURS = [
  { id: "radiateurs", label: "Radiateurs", desc: "PAC haute température — ETAS ~126 %" },
  { id: "planchers",  label: "Planchers chauffants", desc: "PAC basse température — ETAS ~153 %" },
  { id: "mixte",      label: "Mixte", desc: "Combinaison radiateurs + plancher — ETAS ~126 %" },
];

export default function SectionChauffage({ st, set, errors }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Votre chauffage actuel ({st.chauffage_type}) est éligible TH-171 — PAC air/eau.
      </div>

      {/* Type émetteur */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-3">
          Type d'émetteurs de chauffage <span className="text-[#1a9e75]">*</span>
        </p>
        <div className="space-y-2">
          {EMETTEURS.map(({ id, label, desc }) => (
            <button key={id} type="button" onClick={() => set({ type_emetteur: id })}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                st.type_emetteur === id
                  ? "border-[#1a9e75] bg-[#1a9e75]/5"
                  : "border-gray-100 hover:border-[#1a9e75]/30"
              }`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                st.type_emetteur === id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"
              }`}>
                {st.type_emetteur === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <p className={`font-semibold text-sm ${st.type_emetteur === id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                  {label}
                </p>
                <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.type_emetteur && <p className="text-xs text-red-500 mt-1">{errors.type_emetteur}</p>}
      </div>

      {/* Chauffage seul / + ECS */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-2">La PAC couvrira :</p>
        <div className="flex gap-3">
          {[
            { val: false, label: "Chauffage seul" },
            { val: true,  label: "Chauffage + ECS" },
          ].map(({ val, label }) => (
            <button key={String(val)} type="button" onClick={() => set({ ecs_inclus: val })}
              className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                st.ecs_inclus === val
                  ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                  : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ETAS */}
      {st.type_emetteur && (
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            ETAS de la PAC (%)
            <span className="text-[#2c2c2a]/40 font-normal ml-1">— pré-rempli selon émetteurs</span>
          </label>
          <input type="number" min={100} max={300} className={INPUT_CLS}
            value={st.etas} onChange={e => set({ etas: e.target.value })} />
          <p className="text-xs text-[#2c2c2a]/40 mt-1">
            Efficacité saisonnière de la PAC (généralement 111–175 %). Modifiable si devis en main.
          </p>
        </div>
      )}
    </div>
  );
}
