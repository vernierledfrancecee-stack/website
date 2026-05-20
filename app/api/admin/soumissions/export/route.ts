import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const ISO_DATE_RE = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
  if (from && !ISO_DATE_RE.test(from)) {
    return NextResponse.json({ message: "Paramètre 'from' invalide (attendu YYYY-MM-DD)" }, { status: 400 });
  }
  if (to && !ISO_DATE_RE.test(to)) {
    return NextResponse.json({ message: "Paramètre 'to' invalide (attendu YYYY-MM-DD)" }, { status: 400 });
  }

  const fromDate = from ? new Date(from + "T00:00:00") : undefined;
  const toDate = to ? new Date(to + "T23:59:59") : undefined;

  const dateFilter =
    fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {};

  const { prisma } = await import("@/lib/prisma");

  const [leads, contacts, waitlist] = await Promise.all([
    prisma.lead.findMany({ where: dateFilter, orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ where: dateFilter, orderBy: { createdAt: "desc" } }),
    prisma.waitlistRenovGlobale.findMany({ where: dateFilter, orderBy: { createdAt: "desc" } }),
  ]);

  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  const header = [
    "Source", "Nom", "Prénom", "Email", "Téléphone",
    "Société", "Secteur", "Détail", "Date",
  ]
    .map(escape)
    .join(",");

  const rows: string[] = [header];

  for (const l of leads) {
    rows.push(
      [
        "Simulateur CEE",
        l.nom, l.prenom, l.email,
        l.telephone ?? "",
        l.societe ?? "",
        l.secteur,
        l.fichesCibles.join(" | "),
        new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(l.createdAt),
      ]
        .map(escape)
        .join(",")
    );
  }

  for (const c of contacts) {
    rows.push(
      [
        "Formulaire contact",
        c.nom, c.prenom, c.email,
        c.telephone ?? "",
        c.societe ?? "",
        c.secteur ?? "",
        c.message.slice(0, 120),
        new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(c.createdAt),
      ]
        .map(escape)
        .join(",")
    );
  }

  for (const w of waitlist) {
    rows.push(
      [
        "Rénovation globale",
        w.nom, "", w.email,
        w.telephone ?? "",
        w.societe ?? "",
        "",
        w.surface ? `${w.surface} m²` : w.source,
        new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(w.createdAt),
      ]
        .map(escape)
        .join(",")
    );
  }

  const csv = "\uFEFF" + rows.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="soumissions-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
