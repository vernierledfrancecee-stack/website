import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
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
      return NextResponse.json({ message: "Corps de requête invalide" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;

    if (process.env.BREVO_API_KEY) {
      const apiKey = process.env.BREVO_API_KEY;
      const fromEmail = process.env.BREVO_FROM_EMAIL ?? "contact@ledxenergie.com";

      const htmlContent = `
        <h2>Nouveau message de contact</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Nom</strong></td><td>${data.prenom} ${data.nom}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Téléphone</strong></td><td>${data.telephone ?? "—"}</td></tr>
          <tr><td><strong>Société</strong></td><td>${data.societe ?? "—"}</td></tr>
          <tr><td><strong>Secteur</strong></td><td>${data.secteur ?? "—"}</td></tr>
          <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
        </table>
        <p style="color:#666;font-size:12px">Reçu le ${new Date().toLocaleString("fr-FR")}</p>
      `;

      // Email interne
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "LEDX Énergie Contact", email: fromEmail },
          to: [{ email: "contact@ledxenergie.com", name: "LEDX Énergie" }],
          replyTo: { email: data.email, name: `${data.prenom} ${data.nom}` },
          subject: `[Contact] ${data.prenom} ${data.nom} — ${data.societe ?? "Particulier"}`,
          htmlContent,
        }),
      }).catch((e) => console.error("Email interne error:", e));

      // Confirmation au contact
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "LEDX Énergie", email: fromEmail },
          to: [{ email: data.email, name: `${data.prenom} ${data.nom}` }],
          subject: "Votre message a bien été reçu — LEDX Énergie",
          htmlContent: `
            <h2>Bonjour ${data.prenom},</h2>
            <p>Nous avons bien reçu votre message et vous répondrons sous 24 heures ouvrées.</p>
            <p>Cordialement,<br>L'équipe LEDX Énergie<br>01 59 39 25 71</p>
          `,
        }),
      }).catch((e) => console.error("Email confirmation error:", e));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
  }
}
