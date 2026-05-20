import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { pushToCrm } from "@/lib/crm-webhook";

const waitlistSchema = z.object({
  nom: z.string().min(2).max(50).regex(/^[a-zA-ZÀ-ÿ\s\-']+$/),
  email: z.string().email().max(254).toLowerCase(),
  societe: z.string().max(100).optional(),
  surface: z.number().positive().max(500000).optional(),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/)
    .optional()
    .or(z.literal("")),
  source: z
    .enum(["SIMULATEUR", "SOLUTIONS", "ACCUEIL"])
    .default("SOLUTIONS"),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`waitlist:${ip}`, 3, 60_000);
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
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Corps invalide" }, { status: 400 });
    }

    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Sauvegarde BDD
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.waitlistRenovGlobale.create({
        data: {
          nom: data.nom,
          email: data.email,
          societe: data.societe ?? null,
          surface: data.surface ?? null,
          telephone: data.telephone || null,
          source: data.source,
        },
      });
    } catch (dbErr) {
      console.error("[Waitlist] DB error (non-blocking):", dbErr);
    }

    // Emails Brevo
    if (process.env.BREVO_API_KEY) {
      const apiKey = process.env.BREVO_API_KEY;
      const fromEmail = process.env.BREVO_FROM_EMAIL ?? "contact@ledxenergie.com";

      // Email interne
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "LEDX Énergie Waitlist", email: fromEmail },
          to: [{ email: "contact@ledxenergie.com", name: "LEDX Énergie" }],
          subject: `[Waitlist Rénovation Globale] ${data.nom} — ${data.societe ?? "Particulier"}`,
          htmlContent: `
            <h2>Nouvelle inscription — Waitlist Rénovation Globale Tertiaire</h2>
            <table cellpadding="8" style="border-collapse:collapse;width:100%">
              <tr><td><strong>Nom</strong></td><td>${data.nom}</td></tr>
              <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
              <tr><td><strong>Société</strong></td><td>${data.societe ?? "—"}</td></tr>
              <tr><td><strong>Surface</strong></td><td>${data.surface ? `${data.surface} m²` : "—"}</td></tr>
              <tr><td><strong>Source</strong></td><td>${data.source}</td></tr>
            </table>
            <p style="color:#666;font-size:12px">Tag Monday : RENOV_GLOBALE_WAITLIST</p>
          `,
        }),
      }).catch((e) => console.error("Email interne:", e));

      // Email confirmation prospect
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "LEDX Énergie", email: fromEmail },
          to: [{ email: data.email, name: data.nom }],
          subject: "LEDX Énergie — Vous serez alerté en priorité",
          htmlContent: `
            <h2>Bonjour ${data.nom},</h2>
            <p>Votre inscription sur la liste d'attente pour la fiche
            <strong>Rénovation Globale Tertiaire</strong> est confirmée.</p>
            <p>Nous préparons dès maintenant les premiers dossiers.
            Vous recevrez un email dès que la fiche sera officiellement publiée
            par le PNCEE/DGEC — et nos experts vous contacteront en priorité.</p>
            <br>
            <p><em>Fiche confirmée lors de la journée technique ATEE du 2 février 2026.
            Date de parution non encore officielle.</em></p>
            <br>
            <p>Cordialement,<br>L'équipe LEDX Énergie<br>
            contact@ledxenergie.com — 01 59 39 25 71</p>
          `,
        }),
      }).catch((e) => console.error("Email confirmation:", e));
    }

    // Monday.com tag
    if (process.env.MONDAY_API_KEY && process.env.MONDAY_BOARD_LEADS) {
      try {
        await fetch("https://api.monday.com/v2", {
          method: "POST",
          headers: {
            Authorization: process.env.MONDAY_API_KEY,
            "Content-Type": "application/json",
            "API-Version": "2024-01",
          },
          body: JSON.stringify({
            query: `
              mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
                create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) { id }
              }
            `,
            variables: {
              boardId: process.env.MONDAY_BOARD_LEADS,
              itemName: `[RENOV GLOBALE] ${data.nom} — ${data.societe ?? ""}`,
              columnValues: JSON.stringify({
                email: { email: data.email, text: data.email },
                status: { label: "RENOV_GLOBALE_WAITLIST" },
              }),
            },
          }),
        });
      } catch (e) {
        console.error("Monday error:", e);
      }
    }

    // Webhook Make.com → Monday CRM (non-blocking)
    pushToCrm({
      type: "WAITLIST",
      data: {
        nom: data.nom,
        email: data.email,
        societe: data.societe ?? "",
        telephone: data.telephone ?? "",
        surface: data.surface ?? null,
        source: data.source,
        tag: "RENOV_GLOBALE_WAITLIST",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Waitlist] Error:", err);
    return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
  }
}
