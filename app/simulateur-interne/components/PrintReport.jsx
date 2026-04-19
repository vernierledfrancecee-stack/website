"use client";
import { evaluateEligibilite, calcTH171, calcTH174, calcRevenu, getZoneGeo, fmtKwh, fmtEur } from "../utils/ceeFormulas";

const STATUT_LABELS = { proprietaire_occupant: "Propriétaire occupant", locataire: "Locataire", proprietaire_bailleur: "Propriétaire bailleur", autre: "Autre / SCI / Indivision" };
const PROPRIETAIRE_LABELS = { physique: "Personne physique", morale: "SCI / SARL / autre" };
const REVENUS_LABELS = { standard: "Standard", precaire: "Modeste (précaire)", grand_precaire: "Très modeste (grand précaire)" };
const EMETTEUR_LABELS = { radiateurs: "Radiateurs classiques", planchers: "Planchers chauffants", mixte: "Mixte (radiateurs + planchers)" };
const THERMOSTAT_LABELS = { absent_basique: "Absent ou basique (Classe I-III)", classe_iv_plus: "Classe IV ou supérieure", ne_sait_pas: "Ne sait pas" };
const APPLICATION_LABELS = { haute: "Haute température (>50°C)", moyenne: "Moyenne température (35-50°C)", basse: "Basse température (<35°C)" };

function Row({ label, value }) {
  if (!value) return null;
  return (
    <tr>
      <td style={{ padding: "4px 8px", color: "#555", width: "45%", borderBottom: "1px solid #eee", fontSize: 12 }}>{label}</td>
      <td style={{ padding: "4px 8px", fontWeight: 600, color: "#0d1e3a", borderBottom: "1px solid #eee", fontSize: 12 }}>{value}</td>
    </tr>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ background: "#0d1e3a", color: "white", padding: "5px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: "4px 4px 0 0" }}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", borderTop: "none" }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function PrintReport({ st }) {
  const res = evaluateEligibilite(st);
  const vol171 = res.eligible_TH171 ? calcTH171(st) : 0;
  const vol174 = res.eligible_TH174 ? calcTH174(st) : 0;
  const rev171 = calcRevenu(vol171, st.type_revenus, "th171");
  const rev174 = calcRevenu(vol174, st.type_revenus, "th174");
  const zone = getZoneGeo(st.codePostal);
  const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const gestes = [
    st.geste_combles && "Combles / Toiture",
    st.geste_sous_sol && "Sous-sol / Plancher bas",
    st.geste_murs && "Murs (intérieur ou extérieur)",
    st.geste_fenetres && "Fenêtres / Menuiseries",
  ].filter(Boolean).join(", ");

  return (
    <div id="print-report" style={{ display: "none", fontFamily: "Arial, sans-serif", color: "#0d1e3a", maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <style>{`
        @media print {
          #print-report { display: block !important; }
          body > *:not(#__next) { display: none !important; }
          #__next > *:not(#print-report) { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20, borderBottom: "3px solid #1a9e75", paddingBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0d1e3a" }}>LEDX Énergie — Simulateur CEE</div>
        <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>TH-171 PAC air/eau · TH-174 Isolation thermique</div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Rapport du {date}</div>
      </div>

      {/* Bilan éligibilité */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        {[
          { label: "TH-171 — PAC air/eau", fiche: res.th171, vol: vol171, rev: rev171, color: "#1a9e75" },
          { label: "TH-174 — Isolation", fiche: res.th174, vol: vol174, rev: rev174, color: "#3b82f6" },
        ].map(({ label, fiche, vol, rev, color }) => (
          <div key={label} style={{ flex: 1, border: `2px solid ${fiche.eligible ? color : "#e5e7eb"}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: fiche.eligible ? color : "#f3f4f6", padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: fiche.eligible ? "white" : "#666" }}>{label}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: fiche.eligible ? "white" : "#ef4444" }}>{fiche.eligible ? "✅ ÉLIGIBLE" : "❌ NON ÉLIGIBLE"}</span>
            </div>
            <div style={{ padding: "8px 10px", fontSize: 11 }}>
              {fiche.eligible ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: "#f9f9f9", padding: 6, borderRadius: 4, textAlign: "center" }}>
                    <div style={{ color: "#888", fontSize: 10 }}>Volume CEE</div>
                    <div style={{ fontWeight: 700, color }}>{fmtKwh(vol)}</div>
                  </div>
                  <div style={{ flex: 1, background: "#f9f9f9", padding: 6, borderRadius: 4, textAlign: "center" }}>
                    <div style={{ color: "#888", fontSize: 10 }}>Estimation brute</div>
                    <div style={{ fontWeight: 700, color: "#0d1e3a" }}>{fmtEur(rev)}</div>
                  </div>
                </div>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 14, color: "#dc2626", fontSize: 10 }}>
                  {fiche.blocages.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {fiche.warnings?.length > 0 && (
                <div style={{ marginTop: 6, padding: "4px 6px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 4 }}>
                  {fiche.warnings.map((w, i) => (
                    <div key={i} style={{ fontSize: 10, color: "#92400e" }}>⚠️ {w}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Client */}
      <Section title="Coordonnées client">
        <Row label="Nom" value={[st.prenom, st.nom].filter(Boolean).join(" ")} />
        <Row label="Email" value={st.email} />
        <Row label="Téléphone" value={st.tel} />
        <Row label="Statut" value={STATUT_LABELS[st.statut_occupant]} />
      </Section>

      {/* Logement */}
      <Section title="Logement">
        <Row label="Adresse" value={[st.adresse, st.codePostal, st.commune].filter(Boolean).join(", ")} />
        <Row label="Type de bâtiment" value={st.type_bati} />
        <Row label="Surface" value={st.surface ? `${st.surface} m²` : null} />
        <Row label="Année de construction" value={st.annee_construction} />
        <Row label="Classe DPE" value={st.classe_energie ? `${st.classe_energie} → objectif B` : null} />
        <Row label="Chauffage actuel" value={st.chauffage_type} />
        <Row label="Zone climatique" value={zone} />
      </Section>

      {/* Profil */}
      <Section title="Profil & revenus">
        <Row label="Résidence principale" value={st.residence_principale === "oui" ? "Oui" : st.residence_principale === "non" ? "Non" : null} />
        <Row label="Type propriétaire" value={PROPRIETAIRE_LABELS[st.type_proprietaire]} />
        <Row label="Profil revenus" value={REVENUS_LABELS[st.type_revenus]} />
        <Row label="Revenus annuels" value={st.revenus ? `${Number(st.revenus).toLocaleString("fr-FR")} €` : null} />
      </Section>

      {/* TH-171 */}
      {st.eligible_TH171 && (
        <>
          <Section title="Chauffage actuel (TH-171)">
            <Row label="PAC déjà installée" value={st.pac_installee === "oui" ? "Oui" : st.pac_installee === "non" ? "Non" : null} />
            <Row label="Usage PAC" value={st.usage_pac === "chauffage_seul" ? "Chauffage seul" : st.usage_pac === "chauffage_ecs" ? "Chauffage + Eau chaude" : null} />
            <Row label="Émetteurs" value={EMETTEUR_LABELS[st.type_emetteur]} />
            <Row label="ETAS" value={st.etas ? `${st.etas} %` : null} />
            <Row label="Thermostat" value={THERMOSTAT_LABELS[st.thermostat]} />
          </Section>
          <Section title="Infos PAC (TH-171)">
            <Row label="Accès extérieur ≥ 30 cm" value={st.acces_exterieur === "oui" ? "Oui" : st.acces_exterieur === "non" ? "Non" : null} />
            <Row label="Surface PAC" value={st.surface_pac ? `${st.surface_pac} m²` : null} />
            <Row label="Type application" value={APPLICATION_LABELS[st.type_application]} />
          </Section>
        </>
      )}

      {/* TH-174 */}
      {st.eligible_TH174 && (
        <Section title="Isolation thermique (TH-174)">
          <Row label="Gestes sélectionnés" value={gestes || null} />
          <Row label="Fenêtres actuelles" value={st.fenetres_bois_sv === "oui" ? "Bois simple vitrage" : st.fenetres_bois_sv === "non" ? "PVC / Alu / Récentes" : null} />
          <Row label="VMC présente" value={st.vmc === "oui" ? "Oui" : st.vmc === "non" ? "Non" : st.vmc === "ne_sait_pas" ? "Ne sait pas" : null} />
          <Row label="Isolation antérieure" value={st.isolation_anterieure} />
          <Row label="Année isolation" value={st.annee_isolation_anterieure} />
        </Section>
      )}

      {/* Plan d'action */}
      {(res.eligible_TH171 || res.eligible_TH174) && (
        <div style={{ background: "#0d1e3a", color: "white", borderRadius: 8, padding: "12px 16px", marginTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Prochaines étapes</div>
          {res.eligible_TH171 && res.eligible_TH174 && (
            <>
              <div style={{ fontSize: 11, marginBottom: 4 }}>→ Phase 1 : Audit PAC + devis RGE (TH-171 prioritaire — bonus ×5)</div>
              <div style={{ fontSize: 11 }}>→ Phase 2 : Audit isolation + devis isolation (TH-174)</div>
            </>
          )}
          {res.eligible_TH171 && !res.eligible_TH174 && <div style={{ fontSize: 11 }}>→ Audit PAC + devis RGE</div>}
          {!res.eligible_TH171 && res.eligible_TH174 && <div style={{ fontSize: 11 }}>→ Audit énergétique + devis isolation</div>}
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 10, color: "#999", textAlign: "center", borderTop: "1px solid #eee", paddingTop: 8 }}>
        Document interne LEDX — à joindre dans Monday.com · {date}
      </div>
    </div>
  );
}
