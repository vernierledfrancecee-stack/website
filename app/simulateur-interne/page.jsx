"use client";

import { useState } from "react";

// ─── BARÈMES PRÉCARITÉ 2024 ──────────────────────────────────────
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

const TARIFS = { standard: 7.2, precaire: 7.2, grand_precaire: 13 };

function getKwhBase(surface) {
  const s = parseInt(surface) || 0;
  if (s < 70)  return 180000;
  if (s < 100) return 270000;
  if (s < 130) return 360000;
  if (s < 160) return 468000;
  return 540000;
}

function computeEligibility(d) {
  const blocages = [];
  const alertes  = [];

  if (d.typeBien !== "maison")      blocages.push("Le logement doit être une maison individuelle (pas un appartement ni une copropriété).");
  if (d.proprietaire === "non")     blocages.push("Le bénéficiaire doit être propriétaire (occupant ou bailleur) — un locataire n'est pas éligible.");
  if (d.fenetresBoisSV === "oui")   blocages.push("Présence de fenêtres bois simple vitrage → dossier non éligible BAR-TH-174.");
  if (d.btd === "oui" && ["pac_ae","pac_aa"].includes(d.chauffage))
    blocages.push("BTD déjà réalisé + PAC A/E ou A/A : combinaison non éligible selon le CDC.");

  let scenarios = [];
  const avt2000 = d.anneeConstruction === "avant2000";
  const iteR    = d.iteIti === "oui";

  if (blocages.length === 0) {
    const ch = d.chauffage;
    if (!avt2000 || iteR) {
      if (["gaz","gaz_cond","granules","elec","bois"].includes(ch)) scenarios = ["SC1"];
      else if (ch) blocages.push("Chauffage incompatible avec ce profil de logement (maison après 2000 ou ITE/ITI récente).");
    } else {
      if (["granules","pac_ae","pac_aa"].includes(ch)) scenarios = ["SC1","SC2"];
      else if (ch) blocages.push(`Maison avant 2000 avec chauffage "${ch}" : non éligible BAR-TH-174.`);
    }
  }

  const cl = ["A","B","C","D","E","F","G"];
  const idxI = cl.indexOf(d.dpeBefore);
  const idxC = cl.indexOf(d.dpeAfter);
  const sauts = (idxI > -1 && idxC > -1) ? idxI - idxC : 0;
  if (d.dpeBefore && d.dpeAfter && sauts < 2)
    blocages.push(`DPE ${d.dpeBefore}→${d.dpeAfter} : ${sauts} saut(s) seulement. Minimum 2 obligatoires.`);

  if (d.vmc === "non" && blocages.length === 0)
    alertes.push("VMC absente : son installation est obligatoire dans le bouquet de travaux.");

  // Précarité
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

  const kwhBase    = getKwhBase(d.surface);
  const coeff      = niveauPrecarite === "grand_precaire" ? 2 : 1;
  const kwhTotal   = kwhBase * coeff;
  const tarif      = TARIFS[niveauPrecarite];
  const montantBrut = Math.round((kwhTotal / 1000) * tarif);
  const margeNette = niveauPrecarite === "grand_precaire"
    ? { min: 5000, max: 7000 }
    : { min: 1500, max: 3000 };

  const eligible = blocages.length === 0 && scenarios.length > 0;
  return { eligible, blocages, alertes, scenarios, niveauPrecarite, kwhBase, kwhTotal, tarif, montantBrut, margeNette, sauts };
}

// ─── COMPOSANTS UI ───────────────────────────────────────────────
const NAVY  = "#0B1D3A";
const GREEN = "#3EC878";

function RadioGroup({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.v} type="button" onClick={() => onChange(o.v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
            value === o.v
              ? "border-green-500 bg-green-50 text-green-700 font-semibold"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
          }`}>
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
      {prefix && <span className="px-3 text-gray-400 text-sm border-r border-gray-200 whitespace-nowrap py-2">{prefix}</span>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400" />
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none bg-white transition-all ${value ? "border-green-500 text-gray-800" : "border-gray-200 text-gray-400"}`}>
      <option value="">{placeholder || "Sélectionner..."}</option>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function Alert({ type, children }) {
  const styles = {
    error:   "bg-red-50 border-red-400 text-red-700",
    warning: "bg-orange-50 border-orange-400 text-orange-700",
    success: "bg-green-50 border-green-500 text-green-700",
  };
  return (
    <div className={`border rounded-lg px-4 py-3 text-sm font-medium ${styles[type]}`}>
      {children}
    </div>
  );
}

// ─── ÉTAPES ─────────────────────────────────────────────────────
const STEPS = [
  { num: 1, title: "Bénéficiaire" },
  { num: 2, title: "Logement" },
  { num: 3, title: "Chauffage & DPE" },
  { num: 4, title: "Isolation & VMC" },
  { num: 5, title: "Résultat" },
];

const INITIAL = {
  nom: "", prenom: "", statut: "particulier", email: "", tel: "",
  proprietaire: "", rfr: "", nbPersonnes: "2", zone: "BC",
  adresse: "", cp: "", ville: "", typeBien: "", anneeConstruction: "", surface: "", fenetresBoisSV: "",
  chauffage: "", btd: "", dpeBefore: "", dpeAfter: "",
  isolCombles: "", isolSousSol: "", iteIti: "", vmc: "", vmcType: "",
  apporteur: "", operateur: "",
};

export default function SimulateurInterne() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState(INITIAL);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const result = step === 5 ? computeEligibility(d) : null;

  const canNext = () => {
    if (step === 1) return d.nom && d.statut && d.proprietaire && d.rfr && d.nbPersonnes && d.zone;
    if (step === 2) return d.typeBien && d.anneeConstruction && d.surface && d.fenetresBoisSV && d.adresse;
    if (step === 3) return d.chauffage && d.dpeBefore && d.dpeAfter;
    if (step === 4) return d.isolCombles && d.vmc;
    return true;
  };

  const reset = () => { setD(INITIAL); setStep(1); };

  const CHAUFFAGE_LABELS = {
    gaz: "Gaz standard", gaz_cond: "Gaz condensation", granules: "Granulés/pellets",
    pac_ae: "PAC air/eau", pac_aa: "PAC air/air", elec: "Électrique",
    bois: "Bois", fioul: "Fioul", reseau: "Réseau de chaleur",
  };

  // ── STEP CONTENT ──────────────────────────────────────────────
  const renderContent = () => {
    if (step === 1) return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nom" required><TextInput value={d.nom} onChange={v => set("nom", v)} placeholder="DUPONT" /></Field>
          <Field label="Prénom" required><TextInput value={d.prenom} onChange={v => set("prenom", v)} placeholder="Jean" /></Field>
        </div>
        <Field label="Statut juridique" required>
          <RadioGroup value={d.statut} onChange={v => set("statut", v)}
            options={[{ v: "particulier", l: "Particulier" }, { v: "sci", l: "SCI" }, { v: "sas", l: "SAS" }, { v: "sarl", l: "SARL" }]} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email"><TextInput value={d.email} onChange={v => set("email", v)} placeholder="jean@email.fr" /></Field>
          <Field label="Téléphone"><TextInput value={d.tel} onChange={v => set("tel", v)} placeholder="06 XX XX XX XX" /></Field>
        </div>
        <Field label="Propriétaire du logement ?" required>
          <RadioGroup value={d.proprietaire} onChange={v => set("proprietaire", v)}
            options={[{ v: "occupant", l: "Oui — occupant" }, { v: "bailleur", l: "Oui — bailleur" }, { v: "non", l: "Non (locataire)" }]} />
          {d.proprietaire === "non" && <Alert type="error">⚠ Un locataire ne peut pas être bénéficiaire BAR-TH-174.</Alert>}
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Field label="RFR (€/an)" required><TextInput value={d.rfr} onChange={v => set("rfr", v)} prefix="€" placeholder="25000" type="number" /></Field>
          </div>
          <Field label="Personnes foyer" required>
            <SelectInput value={d.nbPersonnes} onChange={v => set("nbPersonnes", v)}
              options={["1","2","3","4","5"].map(n => ({ v: n, l: n === "5" ? "5+" : n }))} />
          </Field>
          <Field label="Zone" required>
            <SelectInput value={d.zone} onChange={v => set("zone", v)}
              options={[{ v: "A", l: "Zone A (IDF…)" }, { v: "BC", l: "Zone B/C" }]} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Apporteur d'affaires"><TextInput value={d.apporteur} onChange={v => set("apporteur", v)} placeholder="Nom apporteur" /></Field>
          <Field label="Opérateur LEDX"><TextInput value={d.operateur} onChange={v => set("operateur", v)} placeholder="Votre prénom" /></Field>
        </div>
      </div>
    );

    if (step === 2) return (
      <div className="space-y-4">
        <Field label="Type de bien" required>
          <RadioGroup value={d.typeBien} onChange={v => set("typeBien", v)}
            options={[{ v: "maison", l: "Maison individuelle" }, { v: "appartement", l: "Appartement" }, { v: "copro", l: "Copropriété" }]} />
          {d.typeBien && d.typeBien !== "maison" && <Alert type="error">⚠ BAR-TH-174 : maisons individuelles uniquement.</Alert>}
        </Field>
        <Field label="Adresse du logement" required>
          <TextInput value={d.adresse} onChange={v => set("adresse", v)} placeholder="15 rue des Lilas" />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Code postal"><TextInput value={d.cp} onChange={v => set("cp", v)} placeholder="75001" /></Field>
          <div className="col-span-2"><Field label="Ville"><TextInput value={d.ville} onChange={v => set("ville", v)} placeholder="Paris" /></Field></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Année de construction" required>
            <RadioGroup value={d.anneeConstruction} onChange={v => set("anneeConstruction", v)}
              options={[{ v: "avant2000", l: "Avant 2000" }, { v: "apres2000", l: "Après 2000" }]} />
          </Field>
          <Field label="Surface habitable" required>
            <TextInput value={d.surface} onChange={v => set("surface", v)} prefix="m²" placeholder="120" type="number" />
          </Field>
        </div>
        <Field label="Fenêtres bois simple vitrage ?" required>
          <RadioGroup value={d.fenetresBoisSV} onChange={v => set("fenetresBoisSV", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui" }]} />
          {d.fenetresBoisSV === "oui" && <Alert type="error">⚠ Fenêtres bois simple vitrage = NON ÉLIGIBLE BAR-TH-174.</Alert>}
        </Field>
      </div>
    );

    if (step === 3) return (
      <div className="space-y-4">
        <Field label="Type de chauffage principal actuel" required>
          <SelectInput value={d.chauffage} onChange={v => set("chauffage", v)} placeholder="Sélectionner le chauffage"
            options={[
              { v: "gaz", l: "Gaz (chaudière standard)" }, { v: "gaz_cond", l: "Gaz condensation" },
              { v: "granules", l: "Granulés / pellets" }, { v: "pac_ae", l: "PAC air/eau" },
              { v: "pac_aa", l: "PAC air/air" }, { v: "elec", l: "Électrique" },
              { v: "bois", l: "Bois" }, { v: "fioul", l: "Fioul" },
              { v: "reseau", l: "Réseau de chaleur urbain" },
            ]} />
        </Field>
        <Field label="BTD déjà réalisé dans les 5 dernières années ?" required>
          <RadioGroup value={d.btd} onChange={v => set("btd", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui" }]} />
        </Field>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Classe DPE initiale" required>
            <RadioGroup value={d.dpeBefore} onChange={v => set("dpeBefore", v)}
              options={["A","B","C","D","E","F","G"].map(c => ({ v: c, l: c }))} />
          </Field>
          <Field label="Classe DPE cible (après travaux)" required>
            <RadioGroup value={d.dpeAfter} onChange={v => set("dpeAfter", v)}
              options={["A","B","C","D","E","F","G"].map(c => ({ v: c, l: c }))} />
            {d.dpeBefore && d.dpeAfter && (() => {
              const cl = ["A","B","C","D","E","F","G"];
              const s = cl.indexOf(d.dpeBefore) - cl.indexOf(d.dpeAfter);
              return s >= 2
                ? <Alert type="success">✓ {s} sauts de classe — condition remplie</Alert>
                : <Alert type="error">⚠ {s} saut(s) — minimum 2 requis</Alert>;
            })()}
          </Field>
        </div>
      </div>
    );

    if (step === 4) return (
      <div className="space-y-4">
        <Field label="État isolation combles / toiture" required>
          <RadioGroup value={d.isolCombles} onChange={v => set("isolCombles", v)}
            options={[{ v: "aucune", l: "Aucune isolation" }, { v: "lt20", l: "Isolation < 20 ans" }, { v: "gt20", l: "Isolation ≥ 20 ans" }]} />
        </Field>
        <Field label="État isolation sous-sol / plancher bas">
          <RadioGroup value={d.isolSousSol} onChange={v => set("isolSousSol", v)}
            options={[{ v: "aucune", l: "Aucune" }, { v: "lt20", l: "< 20 ans" }, { v: "gt20", l: "≥ 20 ans" }, { v: "na", l: "Sans objet" }]} />
        </Field>
        <Field label="ITE/ITI murs réalisée il y a moins de 20 ans ?">
          <RadioGroup value={d.iteIti} onChange={v => set("iteIti", v)}
            options={[{ v: "non", l: "Non" }, { v: "oui", l: "Oui (< 20 ans)" }]} />
        </Field>
        <Field label="VMC existante dans le logement ?" required>
          <RadioGroup value={d.vmc} onChange={v => set("vmc", v)}
            options={[{ v: "non", l: "Non (installation obligatoire)" }, { v: "oui", l: "Oui" }]} />
        </Field>
        {d.vmc === "oui" && (
          <Field label="Type de VMC existante">
            <RadioGroup value={d.vmcType} onChange={v => set("vmcType", v)}
              options={[{ v: "sf_auto", l: "SF autoréglable" }, { v: "sf_hygro", l: "SF hygroréglable" }, { v: "df", l: "Double flux" }]} />
          </Field>
        )}
      </div>
    );

    if (step === 5 && result) {
      const r = result;
      const nomNiveau = r.niveauPrecarite === "grand_precaire" ? "Grand précaire" : r.niveauPrecarite === "precaire" ? "Précaire" : "Standard";
      return (
        <div className="space-y-4">
          {/* VERDICT */}
          <div className={`flex items-center gap-4 p-5 rounded-xl border-2 ${r.eligible ? "bg-green-50 border-green-500" : "bg-red-50 border-red-400"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-black flex-shrink-0 ${r.eligible ? "bg-green-500" : "bg-red-500"}`}>
              {r.eligible ? "✓" : "✕"}
            </div>
            <div>
              <div className={`text-xl font-black ${r.eligible ? "text-green-700" : "text-red-600"}`}>
                {r.eligible ? "DOSSIER ÉLIGIBLE" : "DOSSIER NON ÉLIGIBLE"}
              </div>
              <div className="text-sm text-gray-600 mt-0.5">
                {r.eligible
                  ? `Scénario${r.scenarios.length > 1 ? "s" : ""} applicable${r.scenarios.length > 1 ? "s" : ""} : ${r.scenarios.join(" ou ")}`
                  : "Voir les motifs de blocage ci-dessous"}
              </div>
            </div>
          </div>

          {/* BLOCAGES */}
          {r.blocages.length > 0 && (
            <div className="border border-red-300 rounded-xl p-4 bg-red-50">
              <div className="font-bold text-red-600 mb-3 text-sm">Motifs de non-éligibilité</div>
              {r.blocages.map((b, i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-700 mb-2">
                  <span className="text-red-500 flex-shrink-0">✕</span>{b}
                </div>
              ))}
            </div>
          )}

          {/* ALERTES */}
          {r.alertes.length > 0 && (
            <div className="border border-orange-300 rounded-xl p-4 bg-orange-50">
              <div className="font-bold text-orange-600 mb-3 text-sm">Points d'attention</div>
              {r.alertes.map((a, i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-700 mb-2">
                  <span className="text-orange-500 flex-shrink-0">⚠</span>{a}
                </div>
              ))}
            </div>
          )}

          {r.eligible && (
            <>
              {/* SCÉNARIOS */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="font-bold text-[#0B1D3A] mb-3 text-sm">Scénario(s) applicable(s)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {r.scenarios.includes("SC1") && (
                    <div className="bg-[#0B1D3A] rounded-xl p-4">
                      <div className="text-[#3EC878] text-xs font-bold tracking-wider mb-1">SCÉNARIO 1</div>
                      <div className="text-white font-bold text-sm mb-3">Combles ET sous-sol + BTD + VMC</div>
                      {["Isolation combles","Isolation sous-sol","BTD","VMC"].map(t => (
                        <div key={t} className="text-green-300 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                  {r.scenarios.includes("SC2") && (
                    <div className="bg-green-50 border border-green-400 rounded-xl p-4">
                      <div className="text-green-600 text-xs font-bold tracking-wider mb-1">SCÉNARIO 2</div>
                      <div className="text-[#0B1D3A] font-bold text-sm mb-3">Combles OU sous-sol + BTD + 1 mur ITI + VMC</div>
                      {["Isolation combles ou sous-sol","BTD","1 mur ITI","VMC"].map(t => (
                        <div key={t} className="text-green-700 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* VALORISATION */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="font-bold text-[#0B1D3A] mb-3 text-sm">Précarité & Valorisation CEE</div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { label: "Niveau précarité", value: nomNiveau, color: r.niveauPrecarite === "grand_precaire" ? "text-green-600" : r.niveauPrecarite === "precaire" ? "text-orange-500" : "text-gray-500" },
                    { label: "kWh cumac estimés", value: r.kwhTotal.toLocaleString("fr-FR"), color: "text-[#0B1D3A]" },
                    { label: "Valorisation brute", value: r.montantBrut.toLocaleString("fr-FR") + " €", color: "text-[#0B1D3A]" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">{label}</div>
                      <div className={`text-lg font-black ${color}`}>{value}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Marge nette LEDX estimée (Isolidarité)</div>
                    <div className="text-2xl font-black text-green-700">
                      {r.margeNette.min.toLocaleString("fr-FR")} – {r.margeNette.max.toLocaleString("fr-FR")} €
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Tarif appliqué</div>
                    <div className="text-sm font-bold text-[#0B1D3A]">{r.tarif} €/MWh cumac</div>
                    <div className="text-xs text-gray-400">Coeff ×{r.niveauPrecarite === "grand_precaire" ? "2" : "1"}</div>
                  </div>
                </div>
              </div>

              {/* RÉCAP */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="font-bold text-[#0B1D3A] mb-3 text-sm">Récapitulatif dossier</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                  {[
                    ["Bénéficiaire", `${d.prenom} ${d.nom}`.trim() || "—"],
                    ["Statut", d.statut.toUpperCase()],
                    ["Adresse", [d.adresse, d.cp, d.ville].filter(Boolean).join(", ") || "—"],
                    ["Surface", d.surface ? `${d.surface} m²` : "—"],
                    ["Construction", d.anneeConstruction === "avant2000" ? "Avant 2000" : "Après 2000"],
                    ["Chauffage", CHAUFFAGE_LABELS[d.chauffage] || d.chauffage],
                    ["DPE", `${d.dpeBefore} → ${d.dpeAfter} (${r.sauts} sauts)`],
                    ["VMC", d.vmc === "oui" ? `Oui${d.vmcType ? " (" + d.vmcType + ")" : ""}` : "Non — à installer"],
                    ["Opérateur", d.operateur || "—"],
                    ["Apporteur", d.apporteur || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-2 py-1 border-b border-gray-50">
                      <span className="text-gray-400 w-28 flex-shrink-0">{k}</span>
                      <span className="font-semibold text-[#0B1D3A]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3 flex-wrap pt-1">
            <button onClick={reset}
              className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-[#0B1D3A] text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
              ← Nouveau dossier
            </button>
            {r.eligible && (
              <button onClick={() => window.print()}
                className="px-5 py-2.5 rounded-lg bg-[#0B1D3A] text-white text-sm font-semibold hover:bg-[#142952] transition-colors cursor-pointer">
                ⬇ Imprimer / PDF
              </button>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  // ── RENDER PRINCIPAL ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="rounded-2xl p-5 mb-5 flex items-center justify-between" style={{ background: NAVY }}>
          <div>
            <div className="text-xl font-black text-white">
              LEDX <span style={{ color: GREEN }}>Rénov&apos;Habitat</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">Simulateur éligibilité BAR-TH-174 — Opérateur interne</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold mb-1" style={{ color: GREEN }}>Étape {step}/5</div>
            <div className="w-28 h-1.5 bg-white/10 rounded-full">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%`, background: GREEN }} />
            </div>
          </div>
        </div>

        {/* STEPPER */}
        <div className="bg-white rounded-xl p-3 mb-4 flex items-center overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-shrink-0">
              <div
                onClick={() => step > s.num && setStep(s.num)}
                className={`flex items-center gap-2 ${step > s.num ? "cursor-pointer" : ""} ${step < s.num ? "opacity-40" : ""}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 transition-all ${step > s.num ? "bg-green-500" : step === s.num ? "bg-[#0B1D3A]" : "bg-gray-300"}`}>
                  {step > s.num ? "✓" : s.num}
                </div>
                <span className={`text-xs whitespace-nowrap ${step === s.num ? "font-semibold text-[#0B1D3A]" : "text-gray-400"}`}>{s.title}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-gray-200 mx-2 flex-shrink-0" />}
            </div>
          ))}
        </div>

        {/* TITRE ÉTAPE */}
        {step < 5 && (
          <div className="mb-4">
            <h2 className="text-lg font-black text-[#0B1D3A]">
              {["","Bénéficiaire","Logement","Chauffage & DPE","Isolation & VMC"][step]}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {["","Informations sur le demandeur et son niveau de précarité","Caractéristiques du bien à rénover","Système de chauffage et classes énergétiques","État de l'isolation et de la ventilation"][step]}
            </p>
          </div>
        )}

        {/* CONTENU */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          {renderContent()}
        </div>

        {/* NAVIGATION */}
        {step < 5 && (
          <div className="flex justify-between">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${step === 1 ? "border-gray-100 text-gray-300 cursor-not-allowed" : "border-gray-300 text-[#0B1D3A] hover:bg-gray-50 cursor-pointer"}`}>
              ← Précédent
            </button>
            <button onClick={() => setStep(s => Math.min(5, s + 1))} disabled={!canNext()}
              className={`px-7 py-2.5 rounded-lg text-sm font-bold text-white transition-colors ${canNext() ? "cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-50"}`}
              style={{ background: canNext() ? NAVY : "#9ca3af" }}>
              {step === 4 ? "Calculer l'éligibilité →" : "Suivant →"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
