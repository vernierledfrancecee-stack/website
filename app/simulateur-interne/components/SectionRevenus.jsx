"use client";

const CLS = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2c2c2a] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e75]/50 focus:border-[#1a9e75] transition-all";

function RadioGroup({ legend, required, options, value, onChange, error }) {
  return (
    <div>
      <p className="text-sm font-medium text-[#0d1e3a] mb-3">
        {legend}{required && <span className="text-[#1a9e75] ml-1">*</span>}
      </p>
      <div className="space-y-2">
        {options.map(({ v, label, desc }) => (
          <button key={v} type="button" onClick={() => onChange(v)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              value === v ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-100 hover:border-[#1a9e75]/30"}`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
              value === v ? "border-[#1a9e75] bg-[#1a9e75]" : "border-gray-300"}`}>
              {value === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div>
              <p className={`font-semibold text-sm ${value === v ? "text-[#1a9e75]" : "text-[#0d1e3a]"}`}>{label}</p>
              {desc && <p className="text-xs text-[#2c2c2a]/50 mt-0.5">{desc}</p>}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function SectionRevenus({ st, set, errors }) {
  return (
    <div className="space-y-6">
      <RadioGroup
        legend="Ce logement est-il la résidence principale ?"
        required
        value={st.residence_principale}
        onChange={v => set({ residence_principale: v })}
        error={errors.residence_principale}
        options={[
          { v: "oui", label: "Oui — résidence principale" },
          { v: "non", label: "Non — résidence secondaire / locatif", desc: "Certains dispositifs peuvent ne pas s'appliquer" },
        ]}
      />

      <RadioGroup
        legend="Type de propriétaire"
        required
        value={st.type_proprietaire}
        onChange={v => set({ type_proprietaire: v })}
        error={errors.type_proprietaire}
        options={[
          { v: "physique", label: "Personne physique (particulier)" },
          { v: "morale",   label: "SCI / SARL / SAS / LMNP / autre", desc: "Plafonds DPE différents pour TH-174 (toutes classes acceptées)" },
        ]}
      />

      <RadioGroup
        legend="Profil revenus du foyer"
        required
        value={st.type_revenus}
        onChange={v => set({ type_revenus: v })}
        error={errors.type_revenus}
        options={[
          { v: "standard",      label: "Standard", desc: "Revenus supérieurs aux plafonds MaPrimeRénov'" },
          { v: "precaire",      label: "Modeste (précaire)", desc: "Revenus inférieurs aux plafonds — couleur jaune/bleu" },
          { v: "grand_precaire",label: "Très modeste (grand précaire)", desc: "Tarif CEE maximal (13 €/MWh TH-174)" },
        ]}
      />

      <div>
        <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
          Revenus annuels du foyer (€)
          <span className="text-[#2c2c2a]/40 font-normal ml-1">(optionnel)</span>
        </label>
        <input type="number" min={0} className={CLS} placeholder="ex : 28 000"
          value={st.revenus} onChange={e => set({ revenus: e.target.value })} />
        <p className="text-xs text-[#2c2c2a]/40 mt-1">Non transmis à des tiers — utile pour affiner la bonification CEE</p>
      </div>
    </div>
  );
}
