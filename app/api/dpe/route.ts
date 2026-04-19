import { NextRequest, NextResponse } from "next/server";

const ADEME_URL =
  "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines";

const FIELD_MAP: Record<string, string> = {
  "Gaz naturel": "gaz",
  "Gaz naturel condensation": "gaz_condensation",
  "Fioul domestique": "fioul",
  "Charbon": "charbon",
  "Bois – Bûches": "bois",
  "Électricité": "électricité",
  "Réseau de Chaleur Urbain (RCU)": "réseau_chaleur",
};

function normaliseChauffage(raw: string | null | undefined): string {
  if (!raw) return "";
  return FIELD_MAP[raw] ?? raw.toLowerCase();
}

function normaliseBati(raw: string | null | undefined): "maison" | "appartement" | "" {
  if (!raw) return "";
  const lower = raw.toLowerCase();
  if (lower.includes("maison")) return "maison";
  if (lower.includes("appartement")) return "appartement";
  return "";
}

const SELECT_FIELDS = [
  "etiquette_dpe",
  "surface_habitable_logement",
  "type_energie_principale_chauffage",
  "annee_construction",
  "type_batiment",
].join(",");

async function searchDPE(q: string): Promise<Record<string, unknown> | null> {
  const params = new URLSearchParams({ q, q_mode: "simple", size: "1", select: SELECT_FIELDS });
  const res = await fetch(`${ADEME_URL}?${params}`, {
    signal: AbortSignal.timeout(6000),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0] ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { adresse, codePostal, commune } = body as Record<string, string>;

    if (!codePostal) return NextResponse.json({ found: false });

    // Step 1: full address search
    const fullQuery = [adresse, codePostal, commune].filter(Boolean).join(" ").trim();
    let hit = fullQuery ? await searchDPE(fullQuery) : null;

    // Step 2: fallback to postal code + commune only
    if (!hit && (codePostal || commune)) {
      const fallbackQuery = [codePostal, commune].filter(Boolean).join(" ").trim();
      hit = await searchDPE(fallbackQuery);
    }

    if (!hit) return NextResponse.json({ found: false });

    return NextResponse.json({
      found: true,
      surface: hit.surface_habitable_logement ?? null,
      classe_energie: hit.etiquette_dpe ?? null,
      chauffage_type: normaliseChauffage(hit.type_energie_principale_chauffage as string),
      annee_construction: hit.annee_construction ?? null,
      type_bati: normaliseBati(hit.type_batiment as string),
    });
  } catch {
    return NextResponse.json({ found: false });
  }
}
