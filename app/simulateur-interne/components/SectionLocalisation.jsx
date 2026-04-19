"use client";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const CLASSES_ENERGIE = ["A", "B", "C", "D", "E", "F", "G"];
const CHAUFFAGE_TYPES = ["gaz", "fioul", "charbon", "électricité", "bois", "autre"];

export default function SectionLocalisation({ st, set, errors, onSearchDPE }) {
  return (
    <div className="space-y-6">
      {/* Adresse */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Adresse</label>
          <input className={INPUT_CLS} placeholder="15 rue des Lilas" value={st.adresse}
            onChange={e => set({ adresse: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Code postal <span className="text-[#1a9e75]">*</span>
          </label>
          <input className={INPUT_CLS + (errors.codePostal ? " border-red-400" : "")}
            placeholder="75001" maxLength={5} value={st.codePostal}
            onChange={e => set({ codePostal: e.target.value })} />
          {errors.codePostal && <p className="text-xs text-red-500 mt-1">{errors.codePostal}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Commune</label>
        <input className={INPUT_CLS} placeholder="Paris" value={st.commune}
          onChange={e => set({ commune: e.target.value })} />
      </div>

      {/* DPE search */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={onSearchDPE} disabled={st.dpe_loading}
          className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          {st.dpe_loading ? "Recherche…" : "Chercher DPE"}
        </button>
        {st.dpe_found && (
          <span className="text-xs text-[#1a9e75] font-medium">✓ DPE trouvé — données pré-remplies</span>
        )}
        {st.dpe_error && (
          <span className="text-xs text-amber-600">{st.dpe_error}</span>
        )}
      </div>

      {/* Manual fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Surface chauffée (m²) <span className="text-[#1a9e75]">*</span>
          </label>
          <input type="number" min={1} className={INPUT_CLS + (errors.surface ? " border-red-400" : "")}
            placeholder="85" value={st.surface} onChange={e => set({ surface: e.target.value })} />
          {errors.surface && <p className="text-xs text-red-500 mt-1">{errors.surface}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Année de construction</label>
          <input type="number" min={1800} max={2024} className={INPUT_CLS}
            placeholder="1985" value={st.annee_construction}
            onChange={e => set({ annee_construction: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Classe énergie DPE <span className="text-[#1a9e75]">*</span>
          </label>
          <select className={INPUT_CLS + (errors.classe_energie ? " border-red-400" : "")}
            value={st.classe_energie} onChange={e => set({ classe_energie: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {CLASSES_ENERGIE.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.classe_energie && <p className="text-xs text-red-500 mt-1">{errors.classe_energie}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Chauffage actuel <span className="text-[#1a9e75]">*</span>
          </label>
          <select className={INPUT_CLS + (errors.chauffage_type ? " border-red-400" : "")}
            value={st.chauffage_type} onChange={e => set({ chauffage_type: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {CHAUFFAGE_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
          {errors.chauffage_type && <p className="text-xs text-red-500 mt-1">{errors.chauffage_type}</p>}
        </div>
      </div>

      {/* Type bâti */}
      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-2">
          Type de bâtiment <span className="text-[#1a9e75]">*</span>
        </label>
        <div className="flex gap-3">
          {["maison", "appartement"].map(v => (
            <button key={v} type="button" onClick={() => set({ type_bati: v })}
              className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                st.type_bati === v
                  ? "border-[#1a9e75] bg-[#1a9e75] text-white"
                  : "border-gray-200 text-[#2c2c2a]/70 hover:border-[#1a9e75]/40"
              }`}>
              {v === "maison" ? "Maison" : "Appartement"}
            </button>
          ))}
        </div>
        {errors.type_bati && <p className="text-xs text-red-500 mt-1">{errors.type_bati}</p>}
      </div>
    </div>
  );
}
