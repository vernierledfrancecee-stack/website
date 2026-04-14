"use client";

import { useState } from "react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// URL d'embed Monday.com — configurez via NEXT_PUBLIC_MONDAY_EMBED_URL dans .env
const MONDAY_EMBED_URL = process.env.NEXT_PUBLIC_MONDAY_EMBED_URL ?? "";

// ─── BARÈMES PRÉCARITÉ 2024 (classification uniquement — sans montants) ───────
const PLAFONDS = {
  A: [null,
    { gp: 23541, p: 35012 },
    { gp: 34551, p: 51387 },
    { gp: 41493, p: 61736 },
    { gp: 48447, p: 72082 },
    { gp: 55427, p: 82440 },
  ],
  BC: [null,
    { gp: 17173, p: 25537 },
    { gp: 25115, p: 37373 },
    { gp: 30252, p: 44993 },
    { gp: 35340, p: 52606 },
    { gp: 40428, p: 60216 },
  ],
};

// ─── LOGIQUE ÉLIGIBILITÉ ──────────────────────────────────────────────────────
function computeEligibility(d) {
  const blocages = [];
  const alertes  = [];

  if (d.typeBien !== "maison")
    blocages.push("Le logement doit être une maison individuelle (pas un appartement ni une copropriété).");
  // Locataire : pas de blocage — le proprio est le bénéficiaire CEE, le RFR du locataire détermine la précarité
  if (d.fenetresBoisSV === "oui")
    blocages.push("Présence de fenêtres bois simple vitrage → dossier non éligible BAR-TH-174.");
  if (d.btd === "oui" && ["pac_ae", "pac_aa"].includes(d.chauffage))
    blocages.push("BTD déjà réalisé + PAC A/E ou A/A : combinaison non éligible selon le CDC.");

  let scenarios = [];
  const avt2000 = d.anneeConstruction === "avant2000";
  const iteR    = d.iteIti === "oui";

  if (blocages.length === 0) {
    const ch = d.chauffage;
    if (!avt2000 || iteR) {
      if (["gaz", "gaz_cond", "granules", "elec", "bois"].includes(ch)) scenarios = ["SC1"];
      else if (ch) blocages.push("Chauffage incompatible avec ce profil (maison après 2000 ou ITE/ITI récente).");
    } else {
      if (["granules", "pac_ae", "pac_aa"].includes(ch)) scenarios = ["SC1", "SC2"];
      else if (ch) blocages.push(`Maison avant 2000 avec chauffage "${CHAUFFAGE_LABELS[ch] ?? ch}" : non éligible BAR-TH-174.`);
    }
  }

  const DPE_ORDER = ["A", "B", "C", "D", "E", "F", "G"];
  const idxI = DPE_ORDER.indexOf(d.dpeBefore);
  const idxC = DPE_ORDER.indexOf(d.dpeAfter);
  const sauts = idxI > -1 && idxC > -1 ? idxI - idxC : 0;
  if (d.dpeBefore && d.dpeAfter && sauts < 2)
    blocages.push(`DPE ${d.dpeBefore}→${d.dpeAfter} : ${sauts} saut(s) — minimum 2 requis.`);

  if (d.vmc === "non" && blocages.length === 0)
    alertes.push("VMC absente : son installation est obligatoire dans le bouquet de travaux.");

  // Classement précarité (classification uniquement, aucun montant)
  let niveauPrecarite = "standard";
  if (d.rfr && d.nbPersonnes && d.zone) {
    const grp = d.zone === "A" ? PLAFONDS.A : PLAFONDS.BC;
    const idx  = Math.min(parseInt(d.nbPersonnes), 5);
    const s    = grp[idx];
    if (s) {
      if (parseInt(d.rfr) <= s.gp) niveauPrecarite = "grand_precaire";
      else if (parseInt(d.rfr) <= s.p) niveauPrecarite = "precaire";
    }
  }

  const eligible = blocages.length === 0 && scenarios.length > 0;
  return { eligible, blocages, alertes, scenarios, niveauPrecarite, sauts };
}

// ─── RECOMMANDATIONS PAC (dossier non éligible BAR-TH-174) ───────────────────
function getPacRecommendations(d, blocages) {
  const recs = [];

  if (d.typeBien === "copro") {
    recs.push({
      fiche: "BAR-TH-179",
      titre: "PAC Collective — Copropriétés & Bailleurs",
      desc: "Remplacement de la chaufferie collective gaz/fioul par une pompe à chaleur. Éligible pour les copropriétés, résidences sociales et bailleurs disposant d'un chauffage collectif.",
    });
  }

  if (d.typeBien === "appartement") {
    recs.push({
      fiche: "BAR-TH-104",
      titre: "PAC Air/Eau Individuelle",
      desc: "Remplacement du chauffage existant par une PAC air/eau haute performance. Applicable aux logements individuels et aux appartements disposant d'un système de chauffage autonome.",
    });
  }

  const blocChauffage = blocages.some(b =>
    b.toLowerCase().includes("chauffage") || b.toLowerCase().includes("granulés") || b.toLowerCase().includes("pac")
  );
  if (blocChauffage && d.typeBien === "maison") {
    recs.push({
      fiche: "BAR-TH-104",
      titre: "PAC Air/Eau — Remplacement chaudière",
      desc: "Même hors périmètre BAR-TH-174, le remplacement d'une chaudière gaz ou fioul par une PAC air/eau reste éligible aux CEE via la fiche BAR-TH-104. À instruire séparément.",
    });
  }

  if (recs.length === 0) {
    recs.push({
      fiche: null,
      titre: "Audit personnalisé — Bureau d'études LEDX",
      desc: "Malgré la non-éligibilité BAR-TH-174, d'autres dispositifs CEE peuvent s'appliquer (isolation séparée, chauffe-eau thermodynamique, menuiseries). Transmettre ce dossier au bureau d'études pour analyse complémentaire.",
    });
  }

  return recs;
}

// ─── LIBELLÉS ─────────────────────────────────────────────────────────────────
const CHAUFFAGE_LABELS = {
  gaz:      "Gaz (chaudière standard)",
  gaz_cond: "Gaz condensation",
  granules: "Granulés / pellets",
  pac_ae:   "PAC air/eau",
  pac_aa:   "PAC air/air",
  elec:     "Électrique",
  bois:     "Bois",
  fioul:    "Fioul",
  reseau:   "Réseau de chaleur urbain",
};

const TYPE_BIEN_LABELS = {
  maison:      "Maison individuelle",
  appartement: "Appartement",
  copro:       "Copropriété",
};

const VMC_LABELS = {
  sf_auto:  "SF autoréglable",
  sf_hygro: "SF hygroréglable",
  df:       "Double flux",
};

const ISOLCOMBLES_LABELS = {
  aucune: "Aucune isolation",
  lt20:   "Isolation < 20 ans",
  gt20:   "Isolation ≥ 20 ans",
};

const ISOLSOL_LABELS = {
  aucune: "Aucune",
  lt20:   "< 20 ans",
  gt20:   "≥ 20 ans",
  na:     "Sans objet",
};

const NIVEAU_PRECARITE_LABELS = {
  grand_precaire: "Grand précaire",
  precaire:       "Précaire",
  standard:       "Standard",
};

// ─── ÉTAPES ───────────────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, title: "Bénéficiaire" },
  { num: 2, title: "Logement" },
  { num: 3, title: "Chauffage & DPE" },
  { num: 4, title: "Isolation & VMC" },
  { num: 5, title: "Rapport" },
];

// ─── ÉTAT INITIAL ─────────────────────────────────────────────────────────────
const INITIAL = {
  nom: "", prenom: "", statut: "particulier", email: "", tel: "",
  proprietaire: "", rfr: "", nbPersonnes: "2", zone: "BC",
  adresse: "", cp: "", ville: "", typeBien: "", anneeConstruction: "", surface: "", fenetresBoisSV: "",
  chauffage: "", btd: "", dpeBefore: "", dpeAfter: "",
  isolCombles: "", isolSousSol: "", iteIti: "", vmc: "", vmcType: "",
  apporteur: "", operateur: "",
  // Renseignés uniquement quand propriétaire = "non" (locataire)
  nomProprio: "", prenomProprio: "", telProprio: "", emailProprio: "",
};

// ─── RÉFÉRENCE DOSSIER ────────────────────────────────────────────────────────
function genRef() {
  return "REF-" + Date.now().toString(36).toUpperCase().slice(-6);
}

// ─── COMPOSANTS UI ────────────────────────────────────────────────────────────
const NAVY  = "#0B1D3A";
const GREEN = "#3EC878";

function RadioGroup({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
            value === o.v
              ? "border-green-500 bg-green-50 text-green-700 font-semibold"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#0B1D3A] mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", prefix }) {
  return (
    <div className={`flex items-center border rounded-lg overflow-hidden bg-white transition-all ${value ? "border-green-500" : "border-gray-200"}`}>
      {prefix && (
        <span className="px-3 text-gray-400 text-sm border-r border-gray-200 whitespace-nowrap py-2">{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
      />
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none bg-white transition-all ${
        value ? "border-green-500 text-gray-800" : "border-gray-200 text-gray-400"
      }`}
    >
      <option value="">{placeholder || "Sélectionner..."}</option>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function InlineAlert({ type, children }) {
  const styles = {
    error:   "bg-red-50 border-red-300 text-red-700",
    warning: "bg-orange-50 border-orange-300 text-orange-700",
    success: "bg-green-50 border-green-400 text-green-700",
  };
  return (
    <div className={`border rounded-lg px-4 py-3 text-sm font-medium mt-2 ${styles[type]}`}>
      {children}
    </div>
  );
}

// Rapport helpers
function RSection({ titre }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="text-xs font-bold text-[#0B1D3A] uppercase tracking-wider">{titre}</div>
      <div className="flex-1 h-px bg-[#0B1D3A]/10" />
    </div>
  );
}

function RRow({ label, value, highlight }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-400 text-xs w-32 sm:w-44 flex-shrink-0 leading-relaxed pt-0.5">{label}</span>
      <span className={`text-sm flex-1 min-w-0 break-words ${highlight ? "font-bold text-[#0B1D3A]" : "font-medium text-[#1a2a40]"}`}>
        {value}
      </span>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────
export default function SimulateurInterne() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState(INITIAL);
  const [ref]     = useState(genRef);

  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }));

  const dateRapport = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const result = step === 5 ? computeEligibility(d) : null;

  const canNext = () => {
    if (step === 1) {
      const base = d.nom && d.statut && d.proprietaire && d.rfr && d.nbPersonnes && d.zone;
      if (!base) return false;
      if (d.proprietaire === "non") return !!(d.nomProprio && d.prenomProprio);
      return true;
    }
    if (step === 2) return d.typeBien && d.anneeConstruction && d.surface && d.fenetresBoisSV && d.adresse;
    if (step === 3) return d.chauffage && d.dpeBefore && d.dpeAfter;
    if (step === 4) return d.isolCombles && d.vmc;
    return true;
  };

  const reset = () => { setD(INITIAL); setStep(1); };

  // ── CONTENU PAR ÉTAPE ───────────────────────────────────────────────────────
  const renderContent = () => {

    // ── ÉTAPE 1 : BÉNÉFICIAIRE ────────────────────────────────────────────────
    if (step === 1) return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nom" required>
            <TextInput value={d.nom} onChange={v => set("nom", v)} placeholder="DUPONT" />
          </Field>
          <Field label="Prénom" required>
            <TextInput value={d.prenom} onChange={v => set("prenom", v)} placeholder="Jean" />
          </Field>
        </div>

        <Field label="Statut juridique" required>
          <RadioGroup value={d.statut} onChange={v => set("statut", v)}
            options={[
              { v: "particulier", l: "Particulier" },
              { v: "sci",         l: "SCI" },
              { v: "sas",         l: "SAS" },
              { v: "sarl",        l: "SARL" },
            ]}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email">
            <TextInput value={d.email} onChange={v => set("email", v)} placeholder="jean@email.fr" />
          </Field>
          <Field label="Téléphone">
            <TextInput value={d.tel} onChange={v => set("tel", v)} placeholder="06 XX XX XX XX" />
          </Field>
        </div>

        <Field label="Statut vis-à-vis du logement" required>
          <RadioGroup value={d.proprietaire} onChange={v => set("proprietaire", v)}
            options={[
              { v: "occupant", l: "Proprio — occupant" },
              { v: "bailleur", l: "Proprio — bailleur" },
              { v: "non",      l: "Locataire" },
            ]}
          />
        </Field>

        {d.proprietaire === "non" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
            <p className="text-blue-800 text-xs font-semibold">
              Le bénéficiaire CEE sera le propriétaire du logement.
              Le RFR du locataire (occupant) détermine le niveau de précarité.
              Renseignez les coordonnées du propriétaire ci-dessous.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nom du propriétaire" required>
                <TextInput value={d.nomProprio} onChange={v => set("nomProprio", v)} placeholder="MARTIN" />
              </Field>
              <Field label="Prénom du propriétaire" required>
                <TextInput value={d.prenomProprio} onChange={v => set("prenomProprio", v)} placeholder="Pierre" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tél. propriétaire">
                <TextInput value={d.telProprio} onChange={v => set("telProprio", v)} placeholder="06 XX XX XX XX" />
              </Field>
              <Field label="Email propriétaire">
                <TextInput value={d.emailProprio} onChange={v => set("emailProprio", v)} placeholder="proprio@email.fr" />
              </Field>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Field label="RFR annuel (€)" required>
            <TextInput value={d.rfr} onChange={v => set("rfr", v)} prefix="€" placeholder="25 000" type="number" />
          </Field>
          <Field label="Personnes au foyer" required>
            <SelectInput value={d.nbPersonnes} onChange={v => set("nbPersonnes", v)}
              options={["1","2","3","4","5"].map(n => ({ v: n, l: n === "5" ? "5 ou +" : n }))}
            />
          </Field>
          <div className="col-span-2 sm:col-span-1">
            <Field label="Zone géographique" required>
              <SelectInput value={d.zone} onChange={v => set("zone", v)}
                options={[
                  { v: "A",  l: "Zone A (IDF, PACA…)" },
                  { v: "BC", l: "Zone B / C" },
                ]}
              />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-100">
          <Field label="Opérateur LEDX">
            <TextInput value={d.operateur} onChange={v => set("operateur", v)} placeholder="Votre prénom" />
          </Field>
          <Field label="Apporteur d'affaires">
            <TextInput value={d.apporteur} onChange={v => set("apporteur", v)} placeholder="Nom apporteur" />
          </Field>
        </div>
      </div>
    );

    // ── ÉTAPE 2 : LOGEMENT ────────────────────────────────────────────────────
    if (step === 2) return (
      <div className="space-y-4">
        <Field label="Type de bien" required>
          <RadioGroup value={d.typeBien} onChange={v => set("typeBien", v)}
            options={[
              { v: "maison",      l: "Maison individuelle" },
              { v: "appartement", l: "Appartement" },
              { v: "copro",       l: "Copropriété" },
            ]}
          />
          {d.typeBien && d.typeBien !== "maison" && (
            <InlineAlert type="error">
              BAR-TH-174 : maisons individuelles uniquement. Voir recommandation PAC à l'étape résultat.
            </InlineAlert>
          )}
        </Field>

        <Field label="Adresse du logement" required>
          <TextInput value={d.adresse} onChange={v => set("adresse", v)} placeholder="15 rue des Lilas" />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="Code postal">
            <TextInput value={d.cp} onChange={v => set("cp", v)} placeholder="75001" />
          </Field>
          <div className="col-span-2">
            <Field label="Ville">
              <TextInput value={d.ville} onChange={v => set("ville", v)} placeholder="Paris" />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Année de construction" required>
            <RadioGroup value={d.anneeConstruction} onChange={v => set("anneeConstruction", v)}
              options={[
                { v: "avant2000", l: "Avant 2000" },
                { v: "apres2000", l: "Après 2000" },
              ]}
            />
          </Field>
          <Field label="Surface habitable" required>
            <TextInput value={d.surface} onChange={v => set("surface", v)} prefix="m²" placeholder="120" type="number" />
          </Field>
        </div>

        <Field label="Fenêtres bois simple vitrage ?" required>
          <RadioGroup value={d.fenetresBoisSV} onChange={v => set("fenetresBoisSV", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui" }]}
          />
          {d.fenetresBoisSV === "oui" && (
            <InlineAlert type="error">
              Fenêtres bois simple vitrage = NON ÉLIGIBLE BAR-TH-174.
            </InlineAlert>
          )}
        </Field>
      </div>
    );

    // ── ÉTAPE 3 : CHAUFFAGE & DPE ─────────────────────────────────────────────
    if (step === 3) return (
      <div className="space-y-4">
        <Field label="Type de chauffage principal actuel" required>
          <SelectInput value={d.chauffage} onChange={v => set("chauffage", v)}
            placeholder="Sélectionner le chauffage"
            options={Object.entries(CHAUFFAGE_LABELS).map(([v, l]) => ({ v, l }))}
          />
        </Field>

        <Field label="BTD déjà réalisé dans les 5 dernières années ?" required>
          <RadioGroup value={d.btd} onChange={v => set("btd", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui" }]}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Field label="Classe DPE initiale" required>
            <RadioGroup value={d.dpeBefore} onChange={v => set("dpeBefore", v)}
              options={["A","B","C","D","E","F","G"].map(c => ({ v: c, l: c }))}
            />
          </Field>
          <Field label="Classe DPE cible (après travaux)" required>
            <RadioGroup value={d.dpeAfter} onChange={v => set("dpeAfter", v)}
              options={["A","B","C","D","E","F","G"].map(c => ({ v: c, l: c }))}
            />
          </Field>
        </div>

        {d.dpeBefore && d.dpeAfter && (() => {
          const cl = ["A","B","C","D","E","F","G"];
          const s  = cl.indexOf(d.dpeBefore) - cl.indexOf(d.dpeAfter);
          return s >= 2
            ? <InlineAlert type="success">✓ {s} sauts de classe — condition remplie</InlineAlert>
            : <InlineAlert type="error">✕ {s} saut(s) — minimum 2 requis</InlineAlert>;
        })()}
      </div>
    );

    // ── ÉTAPE 4 : ISOLATION & VMC ─────────────────────────────────────────────
    if (step === 4) return (
      <div className="space-y-4">
        <Field label="État isolation combles / toiture" required>
          <RadioGroup value={d.isolCombles} onChange={v => set("isolCombles", v)}
            options={Object.entries(ISOLCOMBLES_LABELS).map(([v, l]) => ({ v, l }))}
          />
        </Field>

        <Field label="État isolation sous-sol / plancher bas">
          <RadioGroup value={d.isolSousSol} onChange={v => set("isolSousSol", v)}
            options={Object.entries(ISOLSOL_LABELS).map(([v, l]) => ({ v, l }))}
          />
        </Field>

        <Field label="ITE/ITI murs réalisée il y a moins de 20 ans ?">
          <RadioGroup value={d.iteIti} onChange={v => set("iteIti", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui (< 20 ans)" }]}
          />
        </Field>

        <Field label="VMC existante dans le logement ?" required>
          <RadioGroup value={d.vmc} onChange={v => set("vmc", v)}
            options={[
              { v: "non", l: "Non (installation obligatoire)" },
              { v: "oui", l: "Oui" },
            ]}
          />
        </Field>

        {d.vmc === "oui" && (
          <Field label="Type de VMC existante">
            <RadioGroup value={d.vmcType} onChange={v => set("vmcType", v)}
              options={Object.entries(VMC_LABELS).map(([v, l]) => ({ v, l }))}
            />
          </Field>
        )}
      </div>
    );

    // ── ÉTAPE 5 : RAPPORT TECHNIQUE ───────────────────────────────────────────
    if (step === 5 && result) {
      const r        = result;
      const nomNiveau = NIVEAU_PRECARITE_LABELS[r.niveauPrecarite];
      const pacRecs  = !r.eligible ? getPacRecommendations(d, r.blocages) : [];
      const adresse  = [d.adresse, d.cp, d.ville].filter(Boolean).join(", ");

      return (
        <div className="space-y-5">

          {/* ── EN-TÊTE RAPPORT ── */}
          <div className="bg-[#0B1D3A] rounded-2xl p-4 sm:p-5 print:rounded-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[#3EC878] text-xs font-bold uppercase tracking-widest mb-1">
                  Rapport technique — Bureau d&apos;études
                </div>
                <div className="text-white text-xl sm:text-2xl font-black tracking-tight">LEDX ÉNERGIE</div>
                <div className="text-white/50 text-xs mt-1">
                  Fiche BAR-TH-174 · Rénovation Énergétique Globale
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white/40 text-xs uppercase tracking-wider">Dossier</div>
                <div className="text-white font-mono font-bold text-sm">{ref}</div>
                <div className="text-white/40 text-xs mt-1">{dateRapport}</div>
              </div>
            </div>
          </div>

          {/* ── VERDICT ── */}
          <div className={`flex items-center gap-4 p-5 rounded-xl border-2 ${
            r.eligible
              ? "bg-green-50 border-green-500"
              : "bg-red-50 border-red-400"
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-black flex-shrink-0 ${
              r.eligible ? "bg-green-500" : "bg-red-500"
            }`}>
              {r.eligible ? "✓" : "✕"}
            </div>
            <div>
              <div className={`text-xl font-black ${r.eligible ? "text-green-700" : "text-red-600"}`}>
                {r.eligible ? "DOSSIER ÉLIGIBLE — BAR-TH-174" : "DOSSIER NON ÉLIGIBLE — BAR-TH-174"}
              </div>
              <div className="text-sm text-gray-600 mt-0.5">
                {r.eligible
                  ? `Scénario${r.scenarios.length > 1 ? "s" : ""} applicable${r.scenarios.length > 1 ? "s" : ""} : ${r.scenarios.join(" + ")}`
                  : `${r.blocages.length} motif${r.blocages.length > 1 ? "s" : ""} de blocage identifié${r.blocages.length > 1 ? "s" : ""}`
                }
              </div>
            </div>
          </div>

          {/* ── MOTIFS DE BLOCAGE ── */}
          {r.blocages.length > 0 && (
            <div className="border border-red-200 rounded-xl p-4 bg-red-50">
              <div className="font-bold text-red-600 mb-3 text-xs uppercase tracking-wide">
                Motifs de non-éligibilité
              </div>
              {r.blocages.map((b, i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-700 mb-2 last:mb-0">
                  <span className="text-red-500 flex-shrink-0 font-bold">✕</span>
                  {b}
                </div>
              ))}
            </div>
          )}

          {/* ── POINTS D'ATTENTION ── */}
          {r.alertes.length > 0 && (
            <div className="border border-orange-200 rounded-xl p-4 bg-orange-50">
              <div className="font-bold text-orange-600 mb-3 text-xs uppercase tracking-wide">
                Points d&apos;attention
              </div>
              {r.alertes.map((a, i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-700 mb-2 last:mb-0">
                  <span className="text-orange-500 flex-shrink-0">⚠</span>
                  {a}
                </div>
              ))}
            </div>
          )}

          {/* ── CORPS DU RAPPORT ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">

            {/* 1. Bénéficiaire */}
            <div>
              <RSection titre="1 — Identification bénéficiaire" />
              {d.proprietaire === "non" ? (
                <>
                  <RRow label="Occupant (locataire)"  value={`${d.prenom} ${d.nom}`.trim()} />
                  {d.email && <RRow label="Email occupant"    value={d.email} />}
                  {d.tel   && <RRow label="Tél. occupant"     value={d.tel} />}
                  <RRow label="Propriétaire (bénéf. CEE)" value={`${d.prenomProprio} ${d.nomProprio}`.trim()} highlight />
                  {d.telProprio   && <RRow label="Tél. propriétaire"   value={d.telProprio} />}
                  {d.emailProprio && <RRow label="Email propriétaire"  value={d.emailProprio} />}
                  <RRow label="Statut juridique"  value={d.statut?.toUpperCase()} />
                </>
              ) : (
                <>
                  <RRow label="Nom & Prénom"     value={`${d.prenom} ${d.nom}`.trim()} highlight />
                  <RRow label="Statut juridique" value={d.statut?.toUpperCase()} />
                  <RRow label="Propriétaire"      value={d.proprietaire === "occupant" ? "Oui — occupant" : "Oui — bailleur"} />
                  {d.email && <RRow label="Email"      value={d.email} />}
                  {d.tel   && <RRow label="Téléphone"  value={d.tel} />}
                </>
              )}
            </div>

            {/* 2. Bien immobilier */}
            <div>
              <RSection titre="2 — Bien immobilier" />
              <RRow label="Adresse"               value={adresse || undefined} />
              <RRow label="Type de bien"           value={TYPE_BIEN_LABELS[d.typeBien] || d.typeBien} />
              <RRow label="Année de construction"  value={d.anneeConstruction === "avant2000" ? "Avant 2000" : "Après 2000"} />
              <RRow label="Surface habitable"      value={d.surface ? `${d.surface} m²` : undefined} />
              <RRow label="Fenêtres bois SV"       value={d.fenetresBoisSV === "oui" ? "Oui (critère bloquant)" : "Non"} />
            </div>

            {/* 3. Situation énergétique */}
            <div>
              <RSection titre="3 — Situation énergétique" />
              <RRow label="Chauffage principal"      value={CHAUFFAGE_LABELS[d.chauffage] || d.chauffage} />
              <RRow label="BTD réalisé (< 5 ans)"    value={d.btd === "oui" ? "Oui" : "Non"} />
              <RRow label="DPE initial"              value={d.dpeBefore || undefined} />
              <RRow label="DPE cible (après travaux)" value={d.dpeAfter || undefined} />
              {d.dpeBefore && d.dpeAfter && (
                <RRow
                  label="Sauts de classe"
                  value={`${r.sauts} saut${r.sauts > 1 ? "s" : ""} — ${r.sauts >= 2 ? "✓ conforme" : "✕ insuffisant (min. 2)"}`}
                  highlight={r.sauts >= 2}
                />
              )}
            </div>

            {/* 4. Isolation & Ventilation */}
            <div>
              <RSection titre="4 — Isolation & Ventilation" />
              <RRow label="Isolation combles / toiture" value={ISOLCOMBLES_LABELS[d.isolCombles] || d.isolCombles} />
              {d.isolSousSol && (
                <RRow label="Isolation sous-sol" value={ISOLSOL_LABELS[d.isolSousSol] || d.isolSousSol} />
              )}
              <RRow label="ITE/ITI murs (< 20 ans)" value={d.iteIti === "oui" ? "Oui" : "Non"} />
              <RRow
                label="VMC existante"
                value={
                  d.vmc === "oui"
                    ? `Oui${d.vmcType ? ` — ${VMC_LABELS[d.vmcType] || d.vmcType}` : ""}`
                    : "Non — installation obligatoire"
                }
              />
            </div>

            {/* 5. Profil précarité */}
            <div>
              <RSection titre="5 — Profil précarité CEE" />
              <RRow label="Niveau de précarité"  value={nomNiveau} highlight />
              <RRow label="Zone géographique"    value={d.zone === "A" ? "Zone A (IDF, Côte d'Azur, Genevois)" : "Zone B / C"} />
              <RRow label="Personnes au foyer"   value={d.nbPersonnes === "5" ? "5 ou plus" : d.nbPersonnes} />
            </div>

            {/* 6. Scénarios (si éligible) */}
            {r.eligible && r.scenarios.length > 0 && (
              <div>
                <RSection titre="6 — Scénarios applicables" />
                <div className="space-y-3 mt-2">
                  {r.scenarios.includes("SC1") && (
                    <div className="bg-[#0B1D3A] rounded-xl p-4">
                      <div className="text-[#3EC878] text-xs font-bold tracking-wider mb-1.5">SCÉNARIO 1</div>
                      <div className="text-white font-bold text-sm mb-2">
                        Bouquet complet : Combles + Sous-sol + BTD + VMC
                      </div>
                      {[
                        "Isolation des combles perdus ou rampants de toiture",
                        "Isolation du plancher bas / sous-sol",
                        "Ballon Thermodynamique Domestique (BTD)",
                        "Ventilation Mécanique Contrôlée (VMC)",
                      ].map(t => (
                        <div key={t} className="text-green-300 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                  {r.scenarios.includes("SC2") && (
                    <div className="bg-green-50 border border-green-400 rounded-xl p-4">
                      <div className="text-green-600 text-xs font-bold tracking-wider mb-1.5">SCÉNARIO 2</div>
                      <div className="text-[#0B1D3A] font-bold text-sm mb-2">
                        Bouquet allégé : Combles OU Sous-sol + BTD + 1 mur ITI + VMC
                      </div>
                      {[
                        "Isolation combles perdus OU plancher bas (au choix)",
                        "Ballon Thermodynamique Domestique (BTD)",
                        "1 mur en Isolation Thermique par l'Intérieur (ITI)",
                        "Ventilation Mécanique Contrôlée (VMC)",
                      ].map(t => (
                        <div key={t} className="text-green-700 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 7. Intervenants */}
            <div>
              <RSection titre={`${r.eligible ? "7" : "6"} — Intervenants`} />
              <RRow label="Opérateur LEDX"       value={d.operateur || "—"} />
              <RRow label="Apporteur d'affaires" value={d.apporteur || "—"} />
            </div>
          </div>

          {/* ── RECOMMANDATION PAC (dossier non éligible) ── */}
          {!r.eligible && pacRecs.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-base flex-shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-blue-900 text-sm">
                    Solutions alternatives — Pompe à Chaleur
                  </div>
                  <div className="text-xs text-blue-600">
                    Recommandation bureau d&apos;études LEDX
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {pacRecs.map((rec, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-blue-100">
                    {rec.fiche && (
                      <span className="inline-block text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded mb-2">
                        {rec.fiche}
                      </span>
                    )}
                    <div className="font-semibold text-[#0B1D3A] text-sm mb-1">{rec.titre}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{rec.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACTIONS ── */}
          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              onClick={reset}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#0B1D3A] text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-center"
            >
              ← Nouveau dossier
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl bg-[#0B1D3A] text-white text-sm font-semibold hover:bg-[#142952] transition-colors cursor-pointer text-center"
            >
              Imprimer / Exporter PDF
            </button>
          </div>

          {/* ── EMBED MONDAY.COM CRM ── */}
          {MONDAY_EMBED_URL && (
            <div className="print:hidden">
              <div className="border-t border-gray-200 pt-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  CRM — Monday.com
                </div>
                <iframe
                  src={MONDAY_EMBED_URL}
                  width="100%"
                  height="700"
                  title="Monday.com CRM"
                  className="rounded-xl border border-gray-200 block"
                  style={{ border: "none" }}
                  allowFullScreen
                />
              </div>
            </div>
          )}

        </div>
      );
    }

    return null;
  };

  // ── RENDU PRINCIPAL ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-2xl mx-auto print:max-w-none">

        {/* HEADER */}
        <div className="rounded-2xl p-5 mb-5 flex items-center justify-between print:hidden"
          style={{ background: NAVY }}>
          <div>
            <div className="text-xl font-black text-white">
              LEDX <span style={{ color: GREEN }}>Rénov&apos;Habitat</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              Simulateur BAR-TH-174 — Usage interne opérateurs
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold mb-1" style={{ color: GREEN }}>
              Étape {step}/5
            </div>
            <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%`, background: GREEN }}
              />
            </div>
          </div>
        </div>

        {/* STEPPER — masqué sur mobile (le header montre déjà étape X/5 + barre) */}
        <div className="hidden sm:flex bg-white rounded-xl p-3 mb-4 items-center overflow-x-auto print:hidden">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-shrink-0">
              <div
                onClick={() => step > s.num && setStep(s.num)}
                className={`flex items-center gap-2 ${step > s.num ? "cursor-pointer" : ""} ${step < s.num ? "opacity-40" : ""}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 transition-all ${
                  step > s.num ? "bg-green-500" : step === s.num ? "bg-[#0B1D3A]" : "bg-gray-300"
                }`}>
                  {step > s.num ? "✓" : s.num}
                </div>
                <span className={`text-xs whitespace-nowrap ${step === s.num ? "font-semibold text-[#0B1D3A]" : "text-gray-400"}`}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-gray-200 mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* TITRE ÉTAPE */}
        {step < 5 && (
          <div className="mb-4 print:hidden">
            <h2 className="text-lg font-black text-[#0B1D3A]">
              {["", "Bénéficiaire", "Logement", "Chauffage & DPE", "Isolation & VMC"][step]}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {[
                "",
                "Informations sur le demandeur et classement de précarité",
                "Caractéristiques du bien à rénover",
                "Système de chauffage et classes énergétiques DPE",
                "État de l'isolation et de la ventilation",
              ][step]}
            </p>
          </div>
        )}

        {/* CONTENU */}
        <div className={step < 5 ? "bg-white rounded-2xl border border-gray-100 p-6 mb-4" : "mb-4"}>
          {renderContent()}
        </div>

        {/* NAVIGATION */}
        {step < 5 && (
          <div className="flex justify-between gap-3 print:hidden">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`flex-1 sm:flex-none px-5 py-3 sm:py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                step === 1
                  ? "border-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-[#0B1D3A] hover:bg-gray-50 cursor-pointer"
              }`}
            >
              ← Précédent
            </button>
            <button
              onClick={() => setStep(s => Math.min(5, s + 1))}
              disabled={!canNext()}
              className={`flex-1 sm:flex-none px-7 py-3 sm:py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${
                canNext() ? "cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-50"
              }`}
              style={{ background: canNext() ? NAVY : "#9ca3af" }}
            >
              {step === 4 ? "Générer le rapport →" : "Suivant →"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
