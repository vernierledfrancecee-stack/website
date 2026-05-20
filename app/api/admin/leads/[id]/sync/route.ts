import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const MONDAY_API_URL = "https://api.monday.com/v2";

async function createMondayItem(lead: {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  societe: string | null;
  secteur: string;
  fichesCibles: string[];
  statut: string;
}): Promise<string> {
  const apiKey = process.env.MONDAY_API_KEY;
  const boardId = process.env.MONDAY_BOARD_LEADS;

  if (!apiKey || !boardId) {
    throw new Error("MONDAY_API_KEY ou MONDAY_BOARD_LEADS non configuré.");
  }

  const itemName = `${lead.prenom} ${lead.nom}${lead.societe ? ` — ${lead.societe}` : ""}`;

  const columnValues: Record<string, unknown> = {
    email: { email: lead.email, text: lead.email },
    text: lead.societe ?? "",
    text1: lead.secteur,
    text2: lead.fichesCibles.join(", "),
    status: { label: lead.statut },
  };

  if (lead.telephone) {
    columnValues.phone = { phone: lead.telephone, countryShortName: "FR" };
  }

  const mutation = `
    mutation {
      create_item(
        board_id: ${boardId},
        item_name: ${JSON.stringify(itemName)},
        column_values: ${JSON.stringify(JSON.stringify(columnValues))}
      ) {
        id
      }
    }
  `;

  const res = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      "API-Version": "2024-01",
    },
    body: JSON.stringify({ query: mutation }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Erreur API Monday: ${res.status} — ${text}`);
  }

  const json = (await res.json()) as {
    data?: { create_item?: { id?: string } };
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(`Erreur GraphQL Monday: ${json.errors.map((e) => e.message).join(", ")}`);
  }

  const itemId = json.data?.create_item?.id;
  if (!itemId) {
    throw new Error("Monday n'a pas retourné d'identifiant d'item.");
  }

  return itemId;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = _req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        societe: true,
        secteur: true,
        fichesCibles: true,
        statut: true,
        mondayItemId: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });
    }

    if (lead.mondayItemId) {
      return NextResponse.json({
        success: true,
        mondayItemId: lead.mondayItemId,
        message: "Déjà synchronisé.",
      });
    }

    const mondayItemId = await createMondayItem(lead);

    await prisma.lead.update({
      where: { id },
      data: { mondayItemId },
    });

    return NextResponse.json({ success: true, mondayItemId });
  } catch (err) {
    console.error("[POST /api/admin/leads/[id]/sync]", err);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
