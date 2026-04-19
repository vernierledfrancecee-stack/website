"use client";

const CLS = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const GESTES = [
  { key: "geste_combles",   label: "Combles / Toiture",          desc: "Isolation des combles perdus ou de la toiture-terrasse" },
  { key: "geste_sous_sol",  label: "Sous-sol / Plancher bas",     desc: "Isolation du plancher bas sur vide sanitaire ou sous-sol" },
  { key: "geste_murs",      label: "Murs (intérieur ou extérieur)", desc: "ITE ou ITI — isolation des parois verticales" },
  { key: "geste_fenetres",  label: "Fenêtres / Menuiseries",      desc: "Remplacement double ou triple vitrage" },
];

function RadioLine({ options, value, onChange, error }) {
  return (
    <div>
      <div className="flex gap-3 flex-wrap">
        {options.map(({ v, l }) => (
          <button key={v} type="button" onClick={() => onChange(v)}
            className={`flex-1 min-w-[100px] py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
              value === v ? "border-[#1a9e75] bg-[#1a9e75] text-white" : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"}`}>
            {l}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function SectionIsolation({ st, set, errors }) {
  const nbGestes = GESTES.filter(g => st[g.key]).length;

  return (
    <div className="space-y-6">
      {(() => {
        const ok = ["C","D"].includes(st.classe_energie?.toUpperCase()) || st.type_proprietaire === "morale";
        return (
          <div className={`rounded-xl border px-4 py-3 text-sm ${ok ? "border-blue-200 bg-blue-50 text-blue-800" : "border-red-200 bg-red-50 text-red-700"}`}>
            DPE <strong>{st.classe_energie}</strong> —{" "}
            {st.type_proprietaire === "morale"
              ? "SCI/SARL : toutes classes DPE acceptées pour TH-174."
              : ok
                ? "éligible TH-174. Objectif : atteindre la classe B après travaux."
                : "non éligible TH-174 pour un particulier — seules les classes C et D sont acceptées."}
          </div>
        );
      })()}

      {/* Gestes isolation */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-1">
          Travaux d'isolation envisagés <span className="text-[#1a9e75]">*</span>
          <span className="text-[#2c2c2a]/40 font-normal ml-1">(minimum 2 requis)</span>
        </p>
        <p className={`text-xs mb-3 font-medium ${nbGestes >= 2 ? "text-[#1a9e75]" : "text-amber-600"}`}>
          {nbGestes} geste{nbGestes > 1 ? "s" : ""} sélectionné{nbGestes > 1 ? "s" : ""} {nbGestes >= 2 ? "✓" : "— sélectionnez au moins 2"}
        </p>
        <div className="space-y-2">
          {GESTES.map(({ key, label, desc }) => (
            <button key={key} type="button" onClick={() => set({ [key]: !st[key] })}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                st[key] ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-100 hover:border-[#1a9e75]/20"}`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                st[key] ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"}`}>
                {st[key] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>}
              </div>
              <div>
                <p className={`font-semibold text-sm ${st[key] ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>{label}</p>
                <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.gestes && <p className="text-xs text-red-500 mt-1">{errors.gestes}</p>}
      </div>

      {/* Fenêtres bois SV */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-2">
          Fenêtres actuelles <span className="text-[#1a9e75]">*</span>
        </p>
        <RadioLine value={st.fenetres_bois_sv} onChange={v => set({ fenetres_bois_sv: v })}
          error={errors.fenetres_bois_sv}
          options={[{ v: "non", l: "PVC / Alu / Récentes" }, { v: "oui", l: "🚫 Bois simple vitrage" }]} />
        {st.fenetres_bois_sv === "oui" && (
          <p className="text-xs text-red-600 mt-2">Fenêtres bois simple vitrage → dossier non éligible TH-174 en l'état</p>
        )}
      </div>

      {/* VMC */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-2">
          Ventilation (VMC) présente ? <span className="text-[#1a9e75]">*</span>
        </p>
        <RadioLine value={st.vmc} onChange={v => set({ vmc: v })} error={errors.vmc}
          options={[{ v: "oui", l: "Oui" }, { v: "non", l: "Non" }, { v: "ne_sait_pas", l: "Ne sait pas" }]} />
        {st.vmc === "non" && <p className="text-xs text-amber-600 mt-2">⚠️ VMC absente → installation obligatoire dans le scénario</p>}
      </div>

      {/* Isolation antérieure */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-2">
          Isolation antérieure ? <span className="text-[#1a9e75]">*</span>
        </p>
        <RadioLine value={st.isolation_anterieure} onChange={v => set({ isolation_anterieure: v })}
          error={errors.isolation_anterieure}
          options={[{ v: "aucune", l: "Aucune" }, { v: "partielle", l: "Partielle" }, { v: "globale", l: "Globale" }]} />
        {st.isolation_anterieure && st.isolation_anterieure !== "aucune" && (
          <div className="mt-2">
            <label className="block text-xs text-[#2c2c2a]/60 mb-1">Année approximative</label>
            <input type="number" min={1980} max={2024} className={CLS} placeholder="ex : 2015"
              value={st.annee_isolation_anterieure} onChange={e => set({ annee_isolation_anterieure: e.target.value })} />
          </div>
        )}
      </div>
    </div>
  );
}
