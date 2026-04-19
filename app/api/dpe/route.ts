import { NextRequest, NextResponse } from "next/server";

const ADEME_URL =
  "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines";

const FIELD_MAP: Record<string, string> = {
  "Gaz naturel": "gaz",
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { adresse, codePostal, commune } = body as Record<string, string>;

    const query = [adresse, codePostal, commune].filter(Boolean).join(" ").trim();
    if (!query) return NextResponse.json({ found: false });

    const params = new URLSearchParams({
      q: query,
      q_mode: "simple",
      size: "1",
      select: [
        "etiquette_dpe",
        "surface_habitable_logement",
        "type_energie_principale_chauffage",
        "annee_construction_dpe",
        "type_batiment",
      ].join(","),
    });

    const res = await fetch(`${ADEME_URL}?${params}`, {
      signal: AbortSignal.timeout(5000),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return NextResponse.json({ found: false });

    const data = await res.json();
    const hit = data.results?.[0];
    if (!hit) return NextResponse.json({ found: false });

    return NextResponse.json({
      found: true,
      surface: hit.surface_habitable_logement ?? null,
      classe_energie: hit.etiquette_dpe ?? null,
      chauffage_type: normaliseChauffage(hit.type_energie_principale_chauffage),
      annee_construction: hit.annee_construction_dpe ?? null,
      type_bati: normaliseBati(hit.type_batiment),
    });
  } catch {
    return NextResponse.json({ found: false });
  }
}
