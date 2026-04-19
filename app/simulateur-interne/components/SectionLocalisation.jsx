"use client";

const CLS = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const CLASSES_DPE = ["A", "B", "C", "D", "E", "F", "G"];
const CHAUFFAGE_OPTIONS = [
  { value: "gaz",             label: "Gaz naturel" },
  { value: "gaz_condensation",label: "Gaz condensation" },
  { value: "fioul",           label: "Fioul" },
  { value: "charbon",         label: "Charbon" },
  { value: "electricite",     label: "Électricité" },
  { value: "bois",            label: "Bois / Granulés" },
  { value: "autre",           label: "Autre" },
];

function Err({ msg }) {
  return msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;
}

export default function SectionLocalisation({ st, set, errors, onSearchDPE }) {
  return (
    <div className="space-y-5">
      {/* Adresse */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Adresse</label>
          <input className={CLS} placeholder="15 rue des Lilas" value={st.adresse}
            onChange={e => set({ adresse: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Code postal <span className="text-[#1a9e75]">*</span>
          </label>
          <input className={CLS + (errors.codePostal ? " !border-red-400" : "")} placeholder="75001"
            maxLength={5} value={st.codePostal} onChange={e => set({ codePostal: e.target.value })} />
          <Err msg={errors.codePostal} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Commune <span className="text-[#1a9e75]">*</span>
        </label>
        <input className={CLS + (errors.commune ? " !border-red-400" : "")} placeholder="Paris"
          value={st.commune} onChange={e => set({ commune: e.target.value })} />
        <Err msg={errors.commune} />
      </div>

      {/* DPE search */}
      <div className="flex items-center gap-3 flex-wrap">
        <button type="button" onClick={onSearchDPE} disabled={st.dpe_loading}
          className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          🔍 {st.dpe_loading ? "Recherche…" : "Chercher DPE"}
        </button>
        {st.dpe_found && <span className="text-xs text-[#1a9e75] font-medium">✓ DPE trouvé — données pré-remplies</span>}
        {st.dpe_error && <span className="text-xs text-amber-600">{st.dpe_error}</span>}
      </div>

      {/* Type bâtiment */}
      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-2">
          Type de logement <span className="text-[#1a9e75]">*</span>
        </label>
        <div className="flex gap-3">
          {[{ v: "maison", l: "🏠 Maison individuelle" }, { v: "appartement", l: "🏢 Appartement" }].map(({ v, l }) => (
            <button key={v} type="button" onClick={() => set({ type_bati: v })}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                st.type_bati === v ? "border-[#1a9e75] bg-[#1a9e75] text-white" : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"}`}>
              {l}
            </button>
          ))}
        </div>
        <Err msg={errors.type_bati} />
      </div>

      {/* Surface + Année */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Surface habitable (m²) <span className="text-[#1a9e75]">*</span>
          </label>
          <input type="number" min={1} className={CLS + (errors.surface ? " !border-red-400" : "")}
            placeholder="85" value={st.surface} onChange={e => set({ surface: e.target.value })} />
          <Err msg={errors.surface} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Année de construction <span className="text-[#1a9e75]">*</span>
          </label>
          <input type="number" min={1800} max={2024} className={CLS + (errors.annee_construction ? " !border-red-400" : "")}
            placeholder="1985" value={st.annee_construction} onChange={e => set({ annee_construction: e.target.value })} />
          <Err msg={errors.annee_construction} />
        </div>
      </div>

      {/* DPE + Chauffage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            DPE actuel <span className="text-[#1a9e75]">*</span>
          </label>
          <div className="flex gap-1.5">
            {CLASSES_DPE.map(c => (
              <button key={c} type="button" onClick={() => set({ classe_energie: c })}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${
                  st.classe_energie === c ? "border-[#1a9e75] bg-[#1a9e75] text-white" : "border-gray-200 text-[#2c2c2a]/60 hover:border-[#1a9e75]/40"}`}>
                {c}
              </button>
            ))}
          </div>
          <Err msg={errors.classe_energie} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Chauffage actuel <span className="text-[#1a9e75]">*</span>
          </label>
          <select className={CLS + (errors.chauffage_type ? " !border-red-400" : "")}
            value={st.chauffage_type} onChange={e => set({ chauffage_type: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {CHAUFFAGE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <Err msg={errors.chauffage_type} />
        </div>
      </div>
    </div>
  );
}
