import { NextRequest, NextResponse } from "next/server";
import { simulateurSchema } from "@/lib/validations";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { pushToCrm } from "@/lib/crm-webhook";

const submitSchema = simulateurSchema.extend({
  fichesCibles: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`simulateur:${ip}`, 5, 60_000);
  if (!rl.success) {
    return NextResponse.json(
      { message: "Trop de tentatives. Veuillez réessayer dans une minute." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    // Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Corps de requête invalide" }, { status: 400 });
    }

    // Prétraitement : convertir les chaînes vides en undefined (compatibilité Zod v4)
    const processedBody = typeof body === "object" && body !== null
      ? Object.fromEntries(
          Object.entries(body as Record<string, unknown>).map(([k, v]) => [k, v === "" ? undefined : v])
        )
      : body;

    // Validation Zod
    const parsed = submitSchema.safeParse(processedBody);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Sauvegarde en BDD (optionnelle si Prisma configuré)
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.lead.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email.toLowerCase(),
          telephone: data.telephone ?? null,
          societe: data.societe ?? null,
          fonction: data.fonction ?? null,
          siteAdresse: data.siteAdresse ?? null,
          secteur: data.secteur,
          energie: data.energie ?? null,
          surface: data.surface ?? null,
          zone: data.zone ?? null,
          eclairage: data.eclairage ?? null,
          fichesCibles: data.fichesCibles ?? [],
          donneesBrutes: JSON.parse(JSON.stringify(data)),
          consentement: data.consentement === true,
          consentementAt: new Date(),
          statut: "NOUVEAU",
        },
      });
    } catch (dbErr) {
      console.error("[Simulateur] DB error (non-blocking):", dbErr);
    }

    // Email via Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        await sendBrevoEmail(data);
      } catch (emailErr) {
        console.error("[Simulateur] Email error (non-blocking):", emailErr);
      }
    }

    // Webhook Monday.com (direct API)
    if (process.env.MONDAY_API_KEY && process.env.MONDAY_BOARD_LEADS) {
      try {
        await createMondayLead(data);
      } catch (mondayErr) {
        console.error("[Simulateur] Monday error (non-blocking):", mondayErr);
      }
    }

    // Webhook Make.com → Monday CRM (non-blocking)
    pushToCrm({
      type: "SIMULATEUR",
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone ?? "",
        societe: data.societe ?? "",
        fonction: data.fonction ?? "",
        secteur: data.secteur,
        surface: data.surface ?? null,
        zone: data.zone ?? "",
        energie: data.energie ?? "",
        fichesCibles: data.fichesCibles ?? [],
        siteAdresse: data.siteAdresse ?? "",
      },
    });

    return NextResponse.json({ success: true, fichesCibles: data.fichesCibles ?? [] });
  } catch (err) {
    console.error("[Simulateur] Unexpected error:", err);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

async function sendBrevoEmail(data: Record<string, unknown>) {
  const apiKey = process.env.BREVO_API_KEY!;
  const fromEmail = process.env.BREVO_FROM_EMAIL ?? "contact@ledxenergie.com";

  const fichesCibles = (data.fichesCibles as string[]) ?? [];
  const htmlContent = `
    <h2>Nouveau lead simulateur CEE</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <tr><td><strong>Nom</strong></td><td>${data.prenom} ${data.nom}</td></tr>
      <tr><td><strong>Société</strong></td><td>${data.societe ?? "—"}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${data.telephone ?? "—"}</td></tr>
      <tr><td><strong>Secteur</strong></td><td>${data.secteur}</td></tr>
      <tr><td><strong>Surface</strong></td><td>${data.surface ? `${data.surface} m²` : "—"}</td></tr>
      <tr><td><strong>Zone</strong></td><td>${data.zone ?? "—"}</td></tr>
      <tr><td><strong>Énergie chauffage</strong></td><td>${data.energie ?? "—"}</td></tr>
      <tr><td><strong>Fiches CEE identifiées</strong></td><td>${fichesCibles.length > 0 ? fichesCibles.join(", ") : "Analyse expert requise"}</td></tr>
      <tr><td><strong>Adresse site</strong></td><td>${data.siteAdresse ?? "—"}</td></tr>
      <tr><td><strong>Remarques</strong></td><td>${data.remarques ?? "—"}</td></tr>
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px">
      Soumis le ${new Date().toLocaleString("fr-FR")} — Source: Simulateur CEE ledxenergie.com
    </p>
  `;

  // Email interne
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "LEDX Énergie Simulateur", email: fromEmail },
      to: [{ email: "contact@ledxenergie.com", name: "LEDX Énergie" }],
      subject: `[Nouveau Lead CEE] ${data.prenom} ${data.nom} — ${data.secteur}`,
      htmlContent,
    }),
  });

  // Email de confirmation au prospect
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "LEDX Énergie", email: fromEmail },
      to: [{ email: data.email as string, name: `${data.prenom} ${data.nom}` }],
      subject: "Votre demande d'éligibilité CEE — LEDX Énergie",
      htmlContent: `
        <h2>Bonjour ${data.prenom},</h2>
        <p>Nous avons bien reçu votre demande d'analyse d'éligibilité CEE.</p>
        <p>Nos experts LEDX Énergie analyseront votre situation et vous contacteront
        sous <strong>24 heures ouvrées</strong>.</p>
        ${fichesCibles.length > 0 ? `
        <p>Fiches CEE identifiées par le simulateur : <strong>${fichesCibles.join(", ")}</strong></p>
        <p><em>Ces résultats sont indicatifs. Une visite technique gratuite confirmera votre éligibilité réglementaire.</em></p>
        ` : ""}
        <br>
        <p>Cordialement,<br>L'équipe LEDX Énergie<br>
        <a href="https://ledxenergie.com">ledxenergie.com</a> — 01 59 39 25 71</p>
      `,
    }),
  });
}

async function createMondayLead(data: Record<string, unknown>) {
  const boardId = process.env.MONDAY_BOARD_LEADS;
  const apiKey = process.env.MONDAY_API_KEY!;
  const fichesCibles = (data.fichesCibles as string[]) ?? [];

  const mutation = `
    mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }
  `;

  await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
      "API-Version": "2024-01",
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        boardId,
        itemName: `${data.prenom} ${data.nom} — ${data.secteur}`,
        columnValues: JSON.stringify({
          email: { email: data.email, text: data.email },
          text: data.telephone ?? "",
          text1: data.societe ?? "",
          text2: data.secteur,
          text3: fichesCibles.join(", "),
          status: { label: "Nouveau" },
        }),
      },
    }),
  });
}
