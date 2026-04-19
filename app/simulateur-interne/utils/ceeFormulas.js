// Zone H1/H2/H3 from French postal code (first 2 digits)
export function getZoneGeo(codePostal = "") {
  const dept = parseInt(codePostal.slice(0, 2), 10);
  if (isNaN(dept)) return "H2";

  const H3 = [4, 5, 6, 11, 13, 20, 30, 34, 66, 83, 84];
  const H2 = [
    16, 17, 19, 23, 24, 31, 32, 33, 40, 44, 46, 47, 49,
    53, 56, 64, 65, 75, 77, 78, 79, 81, 82, 85, 86, 87,
    91, 92, 93, 94, 95,
  ];

  if (H3.includes(dept)) return "H3";
  if (H2.includes(dept)) return "H2";
  return "H1";
}

// TH-171 (PAC air/eau) – kWh cumac × bonus ×5
export function calcTH171({ type_bati, etas, surface, codePostal }) {
  const etasNum = parseFloat(etas) || 126;
  const surf = parseFloat(surface) || 0;
  const zone = getZoneGeo(codePostal);

  const facteurZone = { H1: 1.2, H2: 1.0, H3: 0.7 }[zone] ?? 1.0;
  const facteurSurface = surf < 70 ? 0.5 : surf < 90 ? 0.7 : 1.0;

  let base;
  if (type_bati === "appartement") {
    base = etasNum > 140 ? 58900 : 48700;
  } else {
    // maison (default)
    base = etasNum > 140 ? 109200 : 90900;
  }

  return Math.round(base * facteurSurface * facteurZone * 5);
}

// TH-174 (isolation) – forfait selon classe DPE actuelle
export function calcTH174({ classe_energie }) {
  const forfaits = { D: 12000, E: 16000, F: 20000, G: 25000 };
  return forfaits[(classe_energie || "").toUpperCase()] ?? 0;
}

// Eligibility checks
export function calculerEligibilite({ chauffage_type, annee_construction, classe_energie }) {
  const fossile = /fioul|fuel|gaz|charbon/i.test(chauffage_type || "");
  const annee = parseInt(annee_construction, 10);
  const ancienBati = !isNaN(annee) && new Date().getFullYear() - annee > 2;

  return {
    eligible_TH171: fossile && ancienBati,
    eligible_TH174: /^[defg]$/i.test((classe_energie || "").trim()),
  };
}

// ETAS default per emitter type (PAC HT vs BT)
export function etasParEmetteur(type_emetteur) {
  if (type_emetteur === "planchers") return { etas: "153", type_application: "basse" };
  if (type_emetteur === "radiateurs") return { etas: "126", type_application: "haute" };
  return { etas: "126", type_application: "moyenne" };
}

// Format kWh for display
export function fmtKwh(n) {
  if (!n || n === 0) return "0 kWh cumac";
  return `${n.toLocaleString("fr-FR")} kWh cumac`;
}
