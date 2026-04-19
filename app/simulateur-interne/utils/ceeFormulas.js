export function getZoneGeo(codePostal = "") {
  const dept = parseInt(codePostal.slice(0, 2), 10);
  if (isNaN(dept)) return "H2";
  const H3 = [4, 5, 6, 11, 13, 20, 30, 34, 66, 83, 84];
  const H2 = [16, 17, 19, 23, 24, 31, 32, 33, 40, 44, 46, 47, 49,
    53, 56, 64, 65, 75, 77, 78, 79, 81, 82, 85, 86, 87, 91, 92, 93, 94, 95];
  if (H3.includes(dept)) return "H3";
  if (H2.includes(dept)) return "H2";
  return "H1";
}

export function calcTH171({ type_bati, etas, surface, codePostal }) {
  const etasNum = parseFloat(etas) || 126;
  const surf = parseFloat(surface) || 0;
  const zone = getZoneGeo(codePostal);
  const fz = { H1: 1.2, H2: 1.0, H3: 0.7 }[zone] ?? 1.0;
  const fs = surf < 70 ? 0.5 : surf < 90 ? 0.7 : 1.0;
  const base = type_bati === "appartement"
    ? (etasNum > 140 ? 58900 : 48700)
    : (etasNum > 140 ? 109200 : 90900);
  return Math.round(base * fs * fz * 5);
}

export function calcTH174({ classe_energie }) {
  const forfaits = { C: 8000, D: 12000, E: 16000, F: 20000, G: 25000 };
  return forfaits[(classe_energie || "").toUpperCase()] ?? 0;
}

export function etasParEmetteur(type_emetteur) {
  if (type_emetteur === "planchers") return { etas: "153", type_application: "basse" };
  if (type_emetteur === "radiateurs") return { etas: "126", type_application: "haute" };
  return { etas: "126", type_application: "moyenne" };
}

const FOSSILE = ["gaz", "gaz_condensation", "fioul", "charbon"];

export function evaluateEligibilite(d) {
  const annee = parseInt(d.annee_construction, 10);
  const ancienBati = !isNaN(annee) && new Date().getFullYear() - annee > 2;
  const classe = (d.classe_energie || "").toUpperCase();

  // ── TH-171 ──────────────────────────────────────────────────
  const th171B = [], th171W = [];
  if (!FOSSILE.includes(d.chauffage_type))
    th171B.push("Chauffage non éligible — doit être gaz, fioul ou charbon");
  if (!ancienBati) th171B.push("Bâtiment < 2 ans — non éligible");
  if (d.residence_principale !== "oui") th171B.push("Doit être une résidence principale");
  if (d.type_proprietaire === "morale") th171B.push("Propriétaire personne morale — non éligible TH-171");
  if (d.pac_installee === "oui") th171B.push("PAC déjà installée — remplacement non éligible");
  if (d.usage_pac === "ecs_seul") th171B.push("Usage ECS seul non éligible — doit inclure le chauffage");

  if (!d.thermostat || d.thermostat === "absent_basique")
    th171W.push("Thermostat absent/basique → classe IV à prévoir dans le devis");
  if (d.acces_exterieur === "non")
    th171W.push("Accès groupe extérieur limité → à confirmer lors de la visite technique");
  if (d.type_emetteur === "planchers")
    th171W.push("Planchers chauffants → PAC basse température requise (ETAS > 140 %)");

  // ── TH-174 ──────────────────────────────────────────────────
  const th174B = [], th174W = [];
  if (d.type_bati !== "maison") th174B.push("TH-174 réservé aux maisons individuelles");
  if (!ancienBati) th174B.push("Bâtiment < 2 ans — non éligible");
  if (d.residence_principale !== "oui") th174B.push("Doit être une résidence principale");

  if (d.type_proprietaire === "physique" && !["C", "D"].includes(classe))
    th174B.push(`DPE ${classe || "?"} non éligible pour un particulier (requis C ou D uniquement)`);

  const nbGestes = ["geste_combles", "geste_sous_sol", "geste_murs", "geste_fenetres"].filter(k => d[k]).length;
  if (nbGestes < 2)
    th174B.push(`Minimum 2 gestes d'isolation requis (${nbGestes} sélectionné${nbGestes > 1 ? "s" : ""})`);

  if (d.fenetres_bois_sv === "oui")
    th174B.push("Fenêtres bois simple vitrage → dossier non éligible TH-174");

  if (d.vmc === "non") th174W.push("VMC absente → installation obligatoire dans le bouquet de travaux");
  if (!isNaN(annee) && annee < 2000 && d.isolation_anterieure === "aucune")
    th174W.push("Maison avant 2000 sans isolation → audit énergétique + BTD requis");

  const scenario = th174B.length === 0
    ? (!isNaN(annee) && annee < 2000 ? "SC1 ou SC2 (à déterminer lors de l'audit)" : "SC1")
    : null;

  return {
    th171: { eligible: th171B.length === 0, blocages: th171B, warnings: th171W },
    th174: { eligible: th174B.length === 0, blocages: th174B, warnings: th174W, scenario },
    eligible_TH171: th171B.length === 0,
    eligible_TH174: th174B.length === 0,
  };
}

const TARIFS_MWH = {
  th171: { standard: 7.4, precaire: 7.4, grand_precaire: 7.4 },
  th174: { standard: 7.4, precaire: 10.0, grand_precaire: 13.0 },
};

export function calcRevenu(volume_kwh, type_revenus, fiche) {
  const tarif = TARIFS_MWH[fiche]?.[type_revenus] ?? 7.4;
  return Math.round(volume_kwh * tarif / 1000);
}

export function fmtKwh(n) {
  return n ? `${n.toLocaleString("fr-FR")} kWh cumac` : "0 kWh cumac";
}

export function fmtEur(n) {
  return n ? `${n.toLocaleString("fr-FR")} €` : "0 €";
}
