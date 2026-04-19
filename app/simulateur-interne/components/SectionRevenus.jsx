"use client";

const REVENUS = [
  {
    id: "standard",
    label: "Ménage standard",
    desc: "Revenus supérieurs aux plafonds MaPrimeRénov'",
  },
  {
    id: "precaire",
    label: "Ménage modeste (précaire)",
    desc: "Revenus inférieurs aux plafonds MaPrimeRénov' – couleur jaune/bleu",
  },
  {
    id: "grand_precaire",
    label: "Ménage très modeste (grand précaire)",
    desc: "Revenus très bas – couleur rose/violet – bonification CEE maximale",
  },
];

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

export default function SectionRevenus({ st, set }) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {REVENUS.map(({ id, label, desc }) => (
          <button key={id} type="button" onClick={() => set({ type_revenus: id })}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              st.type_revenus === id
                ? "border-[#1a9e75] bg-[#1a9e75]/5"
                : "border-gray-100 hover:border-[#1a9e75]/30"
            }`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
              st.type_revenus === id ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"
            }`}>
              {st.type_revenus === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div>
              <p className={`font-semibold text-sm ${st.type_revenus === id ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>
                {label}
              </p>
              <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Revenus annuels du foyer (€)
          <span className="text-[#2c2c2a]/40 font-normal ml-1">(optionnel)</span>
        </label>
        <input type="number" min={0} className={INPUT_CLS} placeholder="ex : 28 000"
          value={st.revenus} onChange={e => set({ revenus: e.target.value })} />
        <p className="text-xs text-[#2c2c2a]/40 mt-1">
          Utilisé pour affiner les aides futures. Non transmis à des tiers.
        </p>
      </div>
    </div>
  );
}
