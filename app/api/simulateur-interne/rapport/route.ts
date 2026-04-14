import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const {
    reference,
    donneesJson,
    eligible,
    scenarios,
    niveauPrecarite,
    sauts,
    nomBeneficiaire,
    adresse,
    operateur,
  } = body as Record<string, unknown>;

  if (
    !reference ||
    typeof reference !== "string" ||
    !donneesJson ||
    typeof eligible !== "boolean" ||
    !Array.isArray(scenarios) ||
    typeof niveauPrecarite !== "string"
  ) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 422 });
  }

  try {
    // Upsert: if the same reference is saved twice (e.g. user navigates back), overwrite
    const rapport = await prisma.rapportBTH174.upsert({
      where: { reference: reference as string },
      create: {
        reference: reference as string,
        donneesJson,
        eligible: eligible as boolean,
        scenarios: scenarios as string[],
        niveauPrecarite: niveauPrecarite as string,
        sauts: typeof sauts === "number" ? sauts : 0,
        nomBeneficiaire: typeof nomBeneficiaire === "string" ? nomBeneficiaire : "",
        adresse: typeof adresse === "string" ? adresse : null,
        operateur: typeof operateur === "string" ? operateur : null,
      },
      update: {
        donneesJson,
        eligible: eligible as boolean,
        scenarios: scenarios as string[],
        niveauPrecarite: niveauPrecarite as string,
        sauts: typeof sauts === "number" ? sauts : 0,
        nomBeneficiaire: typeof nomBeneficiaire === "string" ? nomBeneficiaire : "",
        adresse: typeof adresse === "string" ? adresse : null,
        operateur: typeof operateur === "string" ? operateur : null,
      },
      select: { id: true, reference: true, createdAt: true },
    });

    return NextResponse.json({ success: true, rapport });
  } catch (err) {
    console.error("[POST /api/simulateur-interne/rapport]", err);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
