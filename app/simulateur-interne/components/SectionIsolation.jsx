"use client";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

const TRAVAUX = [
  { key: "murs_isoles",       label: "Murs isolés",         desc: "ITE ou ITI déjà réalisée" },
  { key: "toiture_isolee",    label: "Toiture isolée",      desc: "Combles ou toiture-terrasse" },
  { key: "fenetres_recentes", label: "Fenêtres récentes",   desc: "Double/triple vitrage ≤ 10 ans" },
];

export default function SectionIsolation({ st, set }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Classe DPE <strong>{st.classe_energie}</strong> → éligible TH-174 (isolation thermique).
        L'objectif est d'atteindre la classe B après travaux.
      </div>

      {/* État actuel de l'isolation */}
      <div>
        <p className="text-sm font-medium text-[#0d1e3a] mb-3">
          Travaux d'isolation déjà réalisés sur ce logement :
        </p>
        <div className="space-y-3">
          {TRAVAUX.map(({ key, label, desc }) => (
            <button key={key} type="button" onClick={() => set({ [key]: !st[key] })}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                st[key] ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-100 hover:border-[#1a9e75]/20"
              }`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                st[key] ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"
              }`}>
                {st[key] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-semibold text-sm ${st[key] ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>{label}</p>
                <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Année dernière isolation */}
      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Année de la dernière rénovation énergétique
          <span className="text-[#2c2c2a]/40 font-normal ml-1">(optionnel)</span>
        </label>
        <input type="number" min={1980} max={new Date().getFullYear()} className={INPUT_CLS}
          placeholder="ex : 2018" value={st.annee_isolation}
          onChange={e => set({ annee_isolation: e.target.value })} />
      </div>
    </div>
  );
}
