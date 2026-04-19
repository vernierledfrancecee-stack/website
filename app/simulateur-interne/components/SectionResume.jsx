"use client";
import { evaluateEligibilite, calcTH171, calcTH174, calcRevenu, getZoneGeo, fmtKwh, fmtEur } from "../utils/ceeFormulas";

function Badge({ ok }) {
  return ok
    ? <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1a9e75] bg-[#1a9e75]/10 px-2.5 py-1 rounded-full">✅ ÉLIGIBLE</span>
    : <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">❌ NON ÉLIGIBLE</span>;
}

function FicheCard({ title, result, volume, revenu, color = "#1a9e75" }) {
  return (
    <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: color }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: `${color}12` }}>
        <p className="font-bold text-[#0d1e3a] text-sm">{title}</p>
        <Badge ok={result.eligible} />
      </div>
      <div className="px-5 py-4 space-y-3">
        {result.eligible ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <p className="text-xs text-[#2c2c2a]/50 mb-1">Volume CEE estimé</p>
                <p className="text-sm font-bold" style={{ color }}>{fmtKwh(volume)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <p className="text-xs text-[#2c2c2a]/50 mb-1">Estimation brute</p>
                <p className="text-sm font-bold text-[#0d1e3a]">{fmtEur(revenu)}</p>
              </div>
            </div>
            {result.scenario && (
              <p className="text-xs text-[#2c2c2a]/60">📋 Scénario : <strong>{result.scenario}</strong></p>
            )}
          </>
        ) : (
          <ul className="space-y-1">
            {result.blocages.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                <span className="shrink-0 mt-0.5">→</span>{b}
              </li>
            ))}
          </ul>
        )}
        {result.warnings.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 space-y-1">
            {result.warnings.map((w, i) => (
              <p key={i} className="text-xs text-amber-700">⚠️ {w}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return value ? (
    <div className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-[#2c2c2a]/60">{label}</span>
      <span className="text-sm font-medium text-[#0d1e3a]">{value}</span>
    </div>
  ) : null;
}

const PROPRIETAIRE_LABELS = { physique: "Personne physique", morale: "SCI / SARL / autre" };
const REVENUS_LABELS = { standard: "Standard", precaire: "Modeste", grand_precaire: "Très modeste" };
const STATUT_LABELS = { proprietaire_occupant: "Propriétaire occupant", locataire: "Locataire", proprietaire_bailleur: "Propriétaire bailleur", autre: "Autre / SCI / Indivision" };

export default function SectionResume({ st, onPrint, pdfError }) {
  const res = evaluateEligibilite(st);
  const vol171 = res.eligible_TH171 ? calcTH171(st) : 0;
  const vol174 = res.eligible_TH174 ? calcTH174(st) : 0;
  const rev171 = calcRevenu(vol171, st.type_revenus, "th171");
  const rev174 = calcRevenu(vol174, st.type_revenus, "th174");
  const zone   = getZoneGeo(st.codePostal);
  const date   = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const both   = res.eligible_TH171 && res.eligible_TH174;

  return (
    <div className="space-y-6">
      {/* Récap client */}
      <div className="rounded-xl border border-gray-100 bg-white p-5">
        <p className="text-xs font-semibold text-[#2c2c2a]/40 uppercase tracking-wide mb-3">📍 Récapitulatif client</p>
        <InfoRow label="Nom" value={[st.prenom, st.nom].filter(Boolean).join(" ")} />
        <InfoRow label="Email" value={st.email} />
        <InfoRow label="Téléphone" value={st.tel} />
        <InfoRow label="Statut" value={STATUT_LABELS[st.statut_occupant]} />
        <InfoRow label="Adresse" value={[st.adresse, st.codePostal, st.commune].filter(Boolean).join(", ")} />
        <InfoRow label="Type" value={st.type_bati} />
        <InfoRow label="Surface" value={st.surface ? `${st.surface} m²` : null} />
        <InfoRow label="DPE actuel" value={st.classe_energie ? `${st.classe_energie} → objectif B` : null} />
        <InfoRow label="Chauffage" value={st.chauffage_type} />
        <InfoRow label="Zone climatique" value={zone} />
        <InfoRow label="Propriétaire" value={PROPRIETAIRE_LABELS[st.type_proprietaire]} />
        <InfoRow label="Revenus" value={REVENUS_LABELS[st.type_revenus]} />
        <InfoRow label="Résidence principale" value={st.residence_principale === "oui" ? "Oui" : st.residence_principale === "non" ? "Non" : null} />
        <InfoRow label="Date simulation" value={date} />
      </div>

      {/* TH-171 */}
      <FicheCard title="TH-171 — Pompe à Chaleur air/eau" result={res.th171} volume={vol171} revenu={rev171} />

      {/* TH-174 */}
      <FicheCard title="TH-174 — Isolation thermique" result={res.th174} volume={vol174} revenu={rev174} color="#3b82f6" />

      {/* Plan d'action */}
      {(res.eligible_TH171 || res.eligible_TH174) && (
        <div className="rounded-xl bg-[#0d1e3a] p-5 text-white space-y-2">
          <p className="text-sm font-bold mb-3">🎯 Prochaines étapes</p>
          {both && (
            <>
              <p className="text-sm">→ <strong>Phase 1 :</strong> Audit PAC + devis RGE (TH-171 prioritaire — bonus ×5)</p>
              <p className="text-sm">→ <strong>Phase 2 :</strong> Audit isolation + devis isolation (TH-174)</p>
            </>
          )}
          {res.eligible_TH171 && !res.eligible_TH174 && <p className="text-sm">→ Audit PAC + devis RGE</p>}
          {!res.eligible_TH171 && res.eligible_TH174 && <p className="text-sm">→ Audit énergétique + devis isolation</p>}
        </div>
      )}

      {/* Export */}
      <div>
        <button type="button" onClick={onPrint}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
          📥 Télécharger le rapport PDF
        </button>
        {pdfError && <p className="text-xs text-red-500 mt-2 text-center">{pdfError}</p>}
        <p className="text-xs text-[#2c2c2a]/40 text-center mt-2">Impression navigateur — à joindre dans Monday.com</p>
      </div>
    </div>
  );
}
