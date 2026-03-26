import type { SimulateurFormData } from "./validations";

export interface FicheEligible {
  code: string;
  nom: string;
  description: string;
  categorie: "led" | "pac-tertiaire" | "pac-residentiel" | "froid" | "agricole";
}

export interface RenovGlobaleEligible {
  eligible: true;
  nom: string;
  description: string;
}

const SECTEURS_TERTIAIRES = [
  "tertiaire-bureaux",
  "tertiaire-sante",
  "tertiaire-enseignement",
  "tertiaire-commerce",
  "tertiaire-hotellerie",
  "tertiaire-logistique",
];

const SECTEURS_FROID = [
  "froid",
  "tertiaire-commerce",
  "tertiaire-hotellerie",
  "tertiaire-logistique",
];

function getAnneeActuelle() {
  return new Date().getFullYear();
}

function getBatimentAge(anneeConstruction?: number): number {
  if (!anneeConstruction) return 99;
  return getAnneeActuelle() - anneeConstruction;
}

function getSurfaceMinPacTertiaire(
  secteur: string,
  zone: string
): number {
  const seuils: Record<string, Record<string, number>> = {
    "tertiaire-sante": { H1: 1200, H2: 1400, H3: 2500 },
    "tertiaire-bureaux": { H1: 1200, H2: 1400, H3: 2500 },
    "tertiaire-enseignement": { H1: 2500, H2: 3500, H3: 5000 },
    "tertiaire-commerce": { H1: 2500, H2: 3500, H3: 5000 },
  };
  const defaultSeuils: Record<string, number> = { H1: 3000, H2: 3500, H3: 6000 };
  return seuils[secteur]?.[zone] ?? defaultSeuils[zone] ?? 3000;
}

export function calculerEligibilite(
  data: Partial<SimulateurFormData>
): FicheEligible[] {
  const fiches: FicheEligible[] = [];
  const secteur = data.secteur ?? "";
  const age = getBatimentAge(data.anneeConstruction);
  const zone = data.zone ?? "H1";
  const surface = data.surface ?? 0;
  const energie = data.energie ?? "";
  const eclairage = data.eclairage ?? "";

  // ── RÈGLE LED (BAT-EQ-127) ──────────────────────────────────────────
  const secteursLed = [
    ...SECTEURS_TERTIAIRES,
    "residentiel",
    "froid",
    "agricole",
    "tertiaire-logistique",
  ];
  if (eclairage !== "led" && eclairage !== "" && secteursLed.includes(secteur)) {
    fiches.push({
      code: "BAT-EQ-127",
      nom: "Rénovation de l'éclairage aux LED",
      description:
        "Remplacement de vos luminaires existants par des LED haute performance. Économies jusqu'à -70% sur votre facture éclairage. Prise en charge complète à 0 €.",
      categorie: "led",
    });
  }

  // ── RÈGLE PAC TERTIAIRE (BAT-TH-163) ────────────────────────────────
  if (
    SECTEURS_TERTIAIRES.includes(secteur) &&
    (energie === "gaz" || energie === "fioul") &&
    age > 2 &&
    surface > 0
  ) {
    const surfaceMin = getSurfaceMinPacTertiaire(secteur, zone);
    if (surface >= surfaceMin) {
      fiches.push({
        code: "BAT-TH-163",
        nom: "Pompe à Chaleur Air/Eau — Secteur Tertiaire",
        description:
          "Remplacement de votre chaudière gaz/fioul par une PAC Air/Eau. Jusqu'à -50% sur votre facture de chauffage. Éligible Décret Tertiaire.",
        categorie: "pac-tertiaire",
      });
    }
  }

  // ── RÈGLE PAC RÉSIDENTIEL (BAR-TH-179) ──────────────────────────────
  if (
    secteur === "residentiel" &&
    (energie === "gaz" || energie === "fioul") &&
    data.chauffageCollectif === "oui" &&
    age > 2
  ) {
    fiches.push({
      code: "BAR-TH-179",
      nom: "Pompe à Chaleur Collective — Résidentiel",
      description:
        "Remplacement de la chaufferie collective gaz/fioul par une PAC. Idéal pour copropriétés, résidences sociales et bailleurs. Bonification Coup de Pouce 2026.",
      categorie: "pac-residentiel",
    });
  }

  // ── RÈGLE RÉGULATION FROID (BAT-TH-134 / BAT-TH-145) ───────────────
  const puissanceFroid =
    (data.froidPositifPuissance ?? 0) + (data.froidNegatifPuissance ?? 0);
  if (
    SECTEURS_FROID.includes(secteur) &&
    (data.regulationExistante === "non" ||
      data.regulationExistante === "inconnu") &&
    puissanceFroid > 0
  ) {
    fiches.push({
      code: "BAT-TH-134",
      nom: "Régulation HP/BP Flottante — Froid Commercial",
      description:
        "Système de régulation automatique haute pression / basse pression. Économies jusqu'à -40% sur votre consommation frigorifique. ROI < 2 ans.",
      categorie: "froid",
    });
    fiches.push({
      code: "BAT-TH-145",
      nom: "Optimisation des températures de condensation",
      description:
        "Régulation dynamique des températures de condensation selon charge thermique et température extérieure.",
      categorie: "froid",
    });
  }

  // ── RÈGLE AGRI VMC (AGRI-TH-119) ────────────────────────────────────
  const serresVmc = ["Multichapelle", "Tunnel"];
  if (
    secteur === "agricole" &&
    serresVmc.includes(data.typeSerre ?? "") &&
    (data.surfaceSerres ?? 0) > 0
  ) {
    fiches.push({
      code: "AGRI-TH-119",
      nom: "VMC Double Flux — Serres Maraîchères",
      description:
        "Ventilation mécanique contrôlée double flux pour serres. Gestion optimale de l'humidité, température et CO2. Jusqu'à -35% sur la facture énergétique.",
      categorie: "agricole",
    });
  }

  // ── RÈGLE AGRI DÉSHUMIDIFICATEUR (AGRI-TH-117) ──────────────────────
  if (secteur === "agricole" && (data.surfaceSerres ?? 0) > 500) {
    fiches.push({
      code: "AGRI-TH-117",
      nom: "Déshumidificateur Thermodynamique — Serres",
      description:
        "Contrôle hygrométrique pour serres maraîchères. Structure acier galvanisé EPOXY. Rendement R≥2. Jusqu'à -35% d'économies énergétiques.",
      categorie: "agricole",
    });
  }

  // ── RÈGLE AGRI TUBE THERMIQUE (AGRI-108) ────────────────────────────
  const serresTube = ["Multichapelle", "Tunnel"];
  if (
    secteur === "agricole" &&
    serresTube.includes(data.typeSerre ?? "")
  ) {
    fiches.push({
      code: "AGRI-108",
      nom: "Tube Thermique — Stockage Passif Serres",
      description:
        "Stockage thermique passif jour/nuit. Gaine souple noire remplie d'eau. 100% passif, aucune énergie. Réduction besoins chauffage -50%, rendements +30%.",
      categorie: "agricole",
    });
  }

  return fiches;
}

// ── RÈGLE RÉNOVATION GLOBALE (coming soon) ──────────────────────────────────
export function calculerRenovGlobale(
  data: Partial<SimulateurFormData>,
  fichesIdentifiees: FicheEligible[]
): boolean {
  const secteur = data.secteur ?? "";
  const surface = data.surface ?? 0;

  const estTertiaire = SECTEURS_TERTIAIRES.includes(secteur);
  if (!estTertiaire) return false;

  const auMoins2Fiches = fichesIdentifiees.length >= 2;
  const surfaceGrande = surface >= 1000;

  return auMoins2Fiches || surfaceGrande;
}
