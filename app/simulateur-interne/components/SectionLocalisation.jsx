"use client";

import { getZoneGeo } from "../utils/ceeFormulas";

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

const TYPE_CLIENT_OPTIONS = [
  { value: "proprietaire_occupant", label: "Propriétaire Occupant" },
  { value: "proprietaire_bailleur", label: "Propriétaire Bailleur" },
  { value: "locataire",             label: "Locataire" },
  { value: "sci_morale",            label: "SCI / Personne morale" },
];

const EAU_CHAUDE_OPTIONS = [
  { value: "chauffe_eau_elec",       label: "Chauffe-eau électrique" },
  { value: "chauffe_eau_gaz",        label: "Chauffe-eau gaz" },
  { value: "ballon_thermodynamique", label: "Ballon thermodynamique" },
  { value: "chauffe_eau_solaire",    label: "Chauffe-eau solaire" },
  { value: "reseau_collectif",       label: "Réseau collectif" },
  { value: "autre",                  label: "Autre" },
];

const TYPE_COMPTEUR_OPTIONS = [
  { value: "monophase",   label: "Monophasé" },
  { value: "triphase",    label: "Triphasé" },
  { value: "linky",       label: "Linky" },
  { value: "ne_sait_pas", label: "Ne sait pas" },
];

const TYPE_RADIATEUR_OPTIONS = [
  { value: "fonte",                label: "Fonte" },
  { value: "acier",                label: "Acier" },
  { value: "aluminium",            label: "Aluminium" },
  { value: "planchers_chauffants", label: "Planchers chauffants" },
  { value: "convecteurs_elec",     label: "Convecteurs électriques" },
  { value: "autre",                label: "Autre" },
];

const POSE_PAR_OPTIONS = [
  { value: "nos_soins",    label: "Par nos soins" },
  { value: "partenaire",   label: "Partenaire" },
  { value: "sous_traitant",label: "Sous-traitant" },
];

const CHAUFFAGE_COLORS = {
  gaz: "#22c55e", gaz_condensation: "#22c55e",
  fioul: "#f97316", charbon: "#78716c",
  electricite: "#3b82f6", bois: "#a16207",
  autre: "#9ca3af",
};

function Err({ msg }) {
  return msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;
}

function SectionTitle({ children }) {
  return (
    <p className="text-xs font-semibold text-[#2c2c2a]/40 uppercase tracking-wide mt-2 mb-3">{children}</p>
  );
}

export default function SectionLocalisation({ st, set, errors, onSearchDPE }) {
  const zone = getZoneGeo(st.codePostal);

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

      {/* ─── Section Maison ─────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-4">
        <SectionTitle>Maison</SectionTitle>

        {/* Type de client */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Type de Client</label>
          <select className={CLS} value={st.statut_occupant}
            onChange={e => set({ statut_occupant: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {TYPE_CLIENT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Type de chauffage */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Type de chauffage <span className="text-[#1a9e75]">*</span>
          </label>
          <div className="relative">
            {st.chauffage_type && (
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: CHAUFFAGE_COLORS[st.chauffage_type] ?? "#9ca3af" }} />
            )}
            <select
              className={CLS + (errors.chauffage_type ? " !border-red-400" : "") + (st.chauffage_type ? " pl-8" : "")}
              value={st.chauffage_type} onChange={e => set({ chauffage_type: e.target.value })}>
              <option value="">— Sélectionner —</option>
              {CHAUFFAGE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <Err msg={errors.chauffage_type} />
        </div>

        {/* Emplacement du système de chauffage */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Emplacement du système de chauffage</label>
          <input className={CLS} placeholder="Ex : chaufferie commune, sous-sol, cellier…"
            value={st.emplacement_chauffage} onChange={e => set({ emplacement_chauffage: e.target.value })} />
        </div>

        {/* Eau chaude sanitaire */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Eau chaude sanitaire</label>
          <select className={CLS} value={st.eau_chaude} onChange={e => set({ eau_chaude: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {EAU_CHAUDE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Type de compteur */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Type de compteur</label>
          <select className={CLS} value={st.type_compteur} onChange={e => set({ type_compteur: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {TYPE_COMPTEUR_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Type de radiateur */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Type de radiateur</label>
          <select className={CLS} value={st.type_radiateur} onChange={e => set({ type_radiateur: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {TYPE_RADIATEUR_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Type bâtiment */}
        <div className="mb-4">
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

        {/* Hauteur sous plafond */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
            Hauteur sous plafond de la maison (m) <span className="text-[#1a9e75]">*</span>
          </label>
          <input type="number" min={1.8} max={6} step={0.1}
            className={CLS + (errors.hauteur_plafond ? " !border-red-400" : "")}
            placeholder="2.5" value={st.hauteur_plafond}
            onChange={e => set({ hauteur_plafond: e.target.value })} />
          <Err msg={errors.hauteur_plafond} />
        </div>

        {/* Surface + Année de construction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            <input type="number" min={1800} max={2024}
              className={CLS + (errors.annee_construction ? " !border-red-400" : "")}
              placeholder="1985" value={st.annee_construction}
              onChange={e => set({ annee_construction: e.target.value })} />
            <Err msg={errors.annee_construction} />
          </div>
        </div>

        {/* Années d'isolation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
              Année isolation des combles <span className="text-[#1a9e75]">*</span>
            </label>
            <input type="number" min={0} max={2024}
              className={CLS + (errors.annee_isolation_combles ? " !border-red-400" : "")}
              placeholder="0 si aucune" value={st.annee_isolation_combles}
              onChange={e => set({ annee_isolation_combles: e.target.value })} />
            <Err msg={errors.annee_isolation_combles} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">
              Année d'isolation des murs <span className="text-[#1a9e75]">*</span>
            </label>
            <input type="number" min={0} max={2024}
              className={CLS + (errors.annee_isolation_murs ? " !border-red-400" : "")}
              placeholder="0 si aucune" value={st.annee_isolation_murs}
              onChange={e => set({ annee_isolation_murs: e.target.value })} />
            <Err msg={errors.annee_isolation_murs} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Année d'isolation sous sol</label>
          <input type="number" min={0} max={2024} className={CLS}
            placeholder="0 si aucune" value={st.annee_isolation_sous_sol}
            onChange={e => set({ annee_isolation_sous_sol: e.target.value })} />
        </div>

        {/* DPE actuel */}
        <div className="mb-4">
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
      </div>

      {/* ─── Section Éligibilité ─────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-4">
        <SectionTitle>Éligibilité</SectionTitle>

        {/* Zone climatique (calculée automatiquement) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Zone</label>
          <div className={CLS + " bg-gray-50 text-[#0d1e3a] font-semibold cursor-default"}>
            {st.codePostal ? zone : "— Entrez un code postal —"}
          </div>
          <p className="text-xs text-[#2c2c2a]/40 mt-1">Calculée automatiquement depuis le code postal</p>
        </div>

        {/* Poser par */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1e3a] mb-1.5">Poser par</label>
          <select className={CLS} value={st.pose_par} onChange={e => set({ pose_par: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {POSE_PAR_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
