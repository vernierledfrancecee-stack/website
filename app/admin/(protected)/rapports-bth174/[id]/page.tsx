import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExportButton from "./ExportButton";

export const metadata = { title: "Rapport BAR-TH-174" };

// ─── Libellés (miroir de page.jsx) ────────────────────────────────────────────
const CHAUFFAGE_LABELS: Record<string, string> = {
  gaz: "Gaz (chaudière standard)",
  gaz_cond: "Gaz condensation",
  granules: "Granulés / pellets",
  pac_ae: "PAC air/eau",
  pac_aa: "PAC air/air",
  elec: "Électrique",
  bois: "Bois",
  fioul: "Fioul",
  reseau: "Réseau de chaleur urbain",
};

const TYPE_BIEN_LABELS: Record<string, string> = {
  maison: "Maison individuelle",
  appartement: "Appartement",
  copro: "Copropriété",
};

const VMC_LABELS: Record<string, string> = {
  sf_auto: "SF autoréglable",
  sf_hygro: "SF hygroréglable",
  df: "Double flux",
};

const ISOLCOMBLES_LABELS: Record<string, string> = {
  aucune: "Aucune isolation",
  lt20: "Isolation < 20 ans",
  gt20: "Isolation ≥ 20 ans",
};

const ISOLSOL_LABELS: Record<string, string> = {
  aucune: "Aucune",
  lt20: "< 20 ans",
  gt20: "≥ 20 ans",
  na: "Sans objet",
};

const NIVEAU_PRECARITE_LABELS: Record<string, string> = {
  grand_precaire: "Grand précaire",
  precaire: "Précaire",
  standard: "Standard",
};

const NIVEAU_COLORS: Record<string, string> = {
  grand_precaire: "bg-red-100 text-red-700 border-red-200",
  precaire: "bg-orange-100 text-orange-700 border-orange-200",
  standard: "bg-blue-100 text-blue-700 border-blue-200",
};

// ─── Composants rapport ────────────────────────────────────────────────────────
function RSection({ titre }: { titre: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="text-xs font-bold text-[#0B1D3A] uppercase tracking-wider">{titre}</div>
      <div className="flex-1 h-px bg-[#0B1D3A]/10" />
    </div>
  );
}

function RRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
}) {
  if (!value && value !== "0") return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-400 text-xs w-44 flex-shrink-0 leading-relaxed pt-0.5">{label}</span>
      <span
        className={`text-sm flex-1 min-w-0 break-words ${
          highlight ? "font-bold text-[#0B1D3A]" : "font-medium text-[#1a2a40]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function RapportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rapport = await prisma.rapportBTH174.findUnique({ where: { id } });
  if (!rapport) notFound();

  const d = rapport.donneesJson as Record<string, string>;
  const eligible = rapport.eligible;
  const scenarios = rapport.scenarios;
  const niveauPrecarite = rapport.niveauPrecarite;
  const sauts = rapport.sauts;

  const nomNiveau = NIVEAU_PRECARITE_LABELS[niveauPrecarite] ?? niveauPrecarite;
  const adresse = [d.adresse, d.cp, d.ville].filter(Boolean).join(", ");
  const dateRapport = new Date(rapport.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
        }
      `}</style>

      <div className="space-y-6">
        {/* Admin nav header */}
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/rapports-bth174"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              ← Rapports BTH174
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-white font-mono text-sm">{rapport.reference}</span>
          </div>
          <ExportButton />
        </div>

        {/* Rapport complet */}
        <div className="space-y-5 max-w-3xl">

          {/* En-tête */}
          <div className="bg-[#0B1D3A] rounded-2xl p-5 print:rounded-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[#3EC878] text-xs font-bold uppercase tracking-widest mb-1">
                  Rapport technique — Bureau d&apos;études
                </div>
                <div className="text-white text-2xl font-black tracking-tight">LEDX ÉNERGIE</div>
                <div className="text-white/50 text-xs mt-1">
                  Fiche BAR-TH-174 · Rénovation Énergétique Globale
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white/40 text-xs uppercase tracking-wider">Dossier</div>
                <div className="text-white font-mono font-bold text-sm">{rapport.reference}</div>
                <div className="text-white/40 text-xs mt-1">{dateRapport}</div>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div
            className={`flex items-center gap-4 p-5 rounded-xl border-2 ${
              eligible ? "bg-green-50 border-green-500" : "bg-red-50 border-red-400"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-black flex-shrink-0 ${
                eligible ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {eligible ? "✓" : "✕"}
            </div>
            <div>
              <div className={`text-xl font-black ${eligible ? "text-green-700" : "text-red-600"}`}>
                {eligible ? "DOSSIER ÉLIGIBLE — BAR-TH-174" : "DOSSIER NON ÉLIGIBLE — BAR-TH-174"}
              </div>
              <div className="text-sm text-gray-600 mt-0.5">
                {eligible
                  ? `Scénario${scenarios.length > 1 ? "s" : ""} applicable${
                      scenarios.length > 1 ? "s" : ""
                    } : ${scenarios.join(" + ")}`
                  : `Motifs de blocage enregistrés dans le rapport`}
              </div>
            </div>
          </div>

          {/* Corps du rapport */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">

            {/* 1. Bénéficiaire */}
            <div>
              <RSection titre="1 — Identification bénéficiaire" />
              {d.proprietaire === "non" ? (
                <>
                  <RRow label="Occupant (locataire)" value={`${d.prenom ?? ""} ${d.nom ?? ""}`.trim() || null} />
                  {d.email && <RRow label="Email occupant" value={d.email} />}
                  {d.tel && <RRow label="Tél. occupant" value={d.tel} />}
                  <RRow
                    label="Propriétaire (bénéf. CEE)"
                    value={`${d.prenomProprio ?? ""} ${d.nomProprio ?? ""}`.trim() || null}
                    highlight
                  />
                  {d.telProprio && <RRow label="Tél. propriétaire" value={d.telProprio} />}
                  {d.emailProprio && <RRow label="Email propriétaire" value={d.emailProprio} />}
                  <RRow label="Statut juridique" value={d.statut?.toUpperCase()} />
                </>
              ) : (
                <>
                  <RRow
                    label="Nom & Prénom"
                    value={`${d.prenom ?? ""} ${d.nom ?? ""}`.trim() || null}
                    highlight
                  />
                  <RRow label="Statut juridique" value={d.statut?.toUpperCase()} />
                  <RRow
                    label="Propriétaire"
                    value={d.proprietaire === "occupant" ? "Oui — occupant" : "Oui — bailleur"}
                  />
                  {d.email && <RRow label="Email" value={d.email} />}
                  {d.tel && <RRow label="Téléphone" value={d.tel} />}
                </>
              )}
            </div>

            {/* 2. Bien immobilier */}
            <div>
              <RSection titre="2 — Bien immobilier" />
              <RRow label="Adresse" value={adresse || null} />
              <RRow label="Type de bien" value={TYPE_BIEN_LABELS[d.typeBien] ?? d.typeBien} />
              <RRow
                label="Année de construction"
                value={d.anneeConstruction === "avant2000" ? "Avant 2000" : "Après 2000"}
              />
              <RRow label="Surface habitable" value={d.surface ? `${d.surface} m²` : null} />
              <RRow
                label="Fenêtres bois SV"
                value={d.fenetresBoisSV === "oui" ? "Oui (critère bloquant)" : "Non"}
              />
            </div>

            {/* 3. Situation énergétique */}
            <div>
              <RSection titre="3 — Situation énergétique" />
              <RRow label="Chauffage principal" value={CHAUFFAGE_LABELS[d.chauffage] ?? d.chauffage} />
              <RRow label="BTD réalisé (< 5 ans)" value={d.btd === "oui" ? "Oui" : "Non"} />
              <RRow label="DPE initial" value={d.dpeBefore || null} />
              <RRow label="DPE cible (après travaux)" value={d.dpeAfter || null} />
              {d.dpeBefore && d.dpeAfter && (
                <RRow
                  label="Sauts de classe"
                  value={`${sauts} saut${sauts > 1 ? "s" : ""} — ${
                    sauts >= 2 ? "✓ conforme" : "✕ insuffisant (min. 2)"
                  }`}
                  highlight={sauts >= 2}
                />
              )}
            </div>

            {/* 4. Isolation & Ventilation */}
            <div>
              <RSection titre="4 — Isolation & Ventilation" />
              <RRow
                label="Isolation combles / toiture"
                value={ISOLCOMBLES_LABELS[d.isolCombles] ?? d.isolCombles}
              />
              {d.isolSousSol && (
                <RRow label="Isolation sous-sol" value={ISOLSOL_LABELS[d.isolSousSol] ?? d.isolSousSol} />
              )}
              <RRow label="ITE/ITI murs (< 20 ans)" value={d.iteIti === "oui" ? "Oui" : "Non"} />
              <RRow
                label="VMC existante"
                value={
                  d.vmc === "oui"
                    ? `Oui${d.vmcType ? ` — ${VMC_LABELS[d.vmcType] ?? d.vmcType}` : ""}`
                    : "Non — installation obligatoire"
                }
              />
            </div>

            {/* 5. Profil précarité */}
            <div>
              <RSection titre="5 — Profil précarité CEE" />
              <RRow label="Niveau de précarité" value={nomNiveau} highlight />
              <RRow
                label="Zone géographique"
                value={
                  d.zone === "A"
                    ? "Zone A (IDF, Côte d'Azur, Genevois)"
                    : "Zone B / C"
                }
              />
              <RRow
                label="Personnes au foyer"
                value={d.nbPersonnes === "5" ? "5 ou plus" : d.nbPersonnes}
              />
              <div className="mt-2">
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${
                    NIVEAU_COLORS[niveauPrecarite] ?? "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {nomNiveau}
                </span>
              </div>
            </div>

            {/* 6. Scénarios (si éligible) */}
            {eligible && scenarios.length > 0 && (
              <div>
                <RSection titre="6 — Scénarios applicables" />
                <div className="space-y-3 mt-2">
                  {scenarios.includes("SC1") && (
                    <div className="bg-[#0B1D3A] rounded-xl p-4">
                      <div className="text-[#3EC878] text-xs font-bold tracking-wider mb-1.5">SCÉNARIO 1</div>
                      <div className="text-white font-bold text-sm mb-2">
                        Bouquet complet : Combles + Sous-sol + BTD + VMC
                      </div>
                      {[
                        "Isolation des combles perdus ou rampants de toiture",
                        "Isolation du plancher bas / sous-sol",
                        "Ballon Thermodynamique Domestique (BTD)",
                        "Ventilation Mécanique Contrôlée (VMC)",
                      ].map((t) => (
                        <div key={t} className="text-green-300 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                  {scenarios.includes("SC2") && (
                    <div className="bg-green-50 border border-green-400 rounded-xl p-4">
                      <div className="text-green-600 text-xs font-bold tracking-wider mb-1.5">SCÉNARIO 2</div>
                      <div className="text-[#0B1D3A] font-bold text-sm mb-2">
                        Bouquet allégé : Combles OU Sous-sol + BTD + 1 mur ITI + VMC
                      </div>
                      {[
                        "Isolation combles perdus OU plancher bas (au choix)",
                        "Ballon Thermodynamique Domestique (BTD)",
                        "1 mur en Isolation Thermique par l'Intérieur (ITI)",
                        "Ventilation Mécanique Contrôlée (VMC)",
                      ].map((t) => (
                        <div key={t} className="text-green-700 text-xs mb-1">▸ {t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Intervenants */}
            <div>
              <RSection titre={`${eligible ? "7" : "6"} — Intervenants`} />
              <RRow label="Opérateur LEDX" value={d.operateur || "—"} />
              <RRow label="Apporteur d'affaires" value={d.apporteur || "—"} />
            </div>
          </div>

          {/* Pied de rapport */}
          <div className="text-center text-xs text-gray-400 py-2 print:hidden">
            Rapport généré le {dateRapport} · Réf. {rapport.reference} · LEDX Énergie
          </div>
        </div>
      </div>
    </>
  );
}
