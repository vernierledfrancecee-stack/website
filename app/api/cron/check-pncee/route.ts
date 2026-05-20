import { NextRequest, NextResponse } from "next/server";

const URLS_TO_CHECK = [
  "https://www.ecologie.gouv.fr/politiques/certificats-deconomies-denergie",
  "https://www.ecologie.gouv.fr/politiques/certificats-economies-energie",
];

const KEYWORDS = [
  "BAT-RG",
  "rénovation globale tertiaire",
  "renovation globale tertiaire",
  "rénovation globale bâtiment tertiaire",
];

export async function GET(req: NextRequest) {
  // Vérification sécurité Vercel Cron (toujours active, y compris en preview)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const results: { url: string; found: boolean; keyword?: string }[] = [];

  for (const url of URLS_TO_CHECK) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "LEDX-Energie-Bot/1.0 (+https://ledxenergie.com)",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        results.push({ url, found: false });
        continue;
      }

      const html = await res.text();
      const htmlLower = html.toLowerCase();

      const foundKeyword = KEYWORDS.find((kw) =>
        htmlLower.includes(kw.toLowerCase())
      );

      results.push({ url, found: !!foundKeyword, keyword: foundKeyword });

      if (foundKeyword) {
        // Alerte email immédiate
        if (process.env.BREVO_API_KEY) {
          await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": process.env.BREVO_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: {
                name: "LEDX ALERTE CRON",
                email: process.env.BREVO_FROM_EMAIL ?? "contact@ledxenergie.com",
              },
              to: [{ email: "contact@ledxenergie.com", name: "LEDX Énergie" }],
              subject: `🚨 ALERTE : Fiche rénovation globale tertiaire détectée sur ${url}`,
              htmlContent: `
                <h2 style="color:red">ALERTE PNCEE — Vérification urgente requise</h2>
                <p>Le cron de surveillance a détecté le mot-clé
                <strong>"${foundKeyword}"</strong> sur la page :</p>
                <p><a href="${url}">${url}</a></p>
                <p><strong>Action requise :</strong> Vérifier manuellement si la fiche
                Rénovation Globale Tertiaire a été officiellement publiée.</p>
                <p>Si confirmé : notifier tous les inscrits waitlist via le dashboard admin.</p>
                <br>
                <p style="color:#666;font-size:12px">
                Détection automatique le ${new Date().toLocaleString("fr-FR")}.
                La vérification humaine reste obligatoire.
                </p>
              `,
            }),
          }).catch((e) => console.error("Alert email error:", e));
        }

        // AuditLog
        try {
          const { prisma } = await import("@/lib/prisma");
          await prisma.auditLog.create({
            data: {
              action: "PNCEE_CHECK",
              ipAddress: "cron",
              userAgent: "vercel-cron",
              details: { found: true, url, keyword: foundKeyword },
            },
          });
        } catch (e) {
          console.error("AuditLog error:", e);
        }
      }
    } catch (err) {
      console.error(`[PNCEE Check] Error fetching ${url}:`, err);
      results.push({ url, found: false });
    }
  }

  // Log résultat (sans alerte si rien trouvé)
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.auditLog.create({
      data: {
        action: "PNCEE_CHECK",
        ipAddress: "cron",
        userAgent: "vercel-cron",
        details: { found: false, results },
      },
    });
  } catch {
    // Non-blocking
  }

  return NextResponse.json({ success: true, results });
}
