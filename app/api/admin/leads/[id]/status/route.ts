import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const VALID_STATUTS = [
  "NOUVEAU",
  "CONTACTE",
  "QUALIFIE",
  "DOSSIER_EN_COURS",
  "SIGNE",
  "PERDU",
] as const;

type ValidStatut = (typeof VALID_STATUTS)[number];

function isValidStatut(value: unknown): value is ValidStatut {
  return typeof value === "string" && (VALID_STATUTS as readonly string[]).includes(value);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const { statut } = body as Record<string, unknown>;

  if (!isValidStatut(statut)) {
    return NextResponse.json(
      {
        error: `Statut invalide. Valeurs acceptées : ${VALID_STATUTS.join(", ")}`,
      },
      { status: 422 }
    );
  }

  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: { statut },
      select: { id: true, statut: true },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (err) {
    console.error("[PATCH /api/admin/leads/[id]/status]", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
