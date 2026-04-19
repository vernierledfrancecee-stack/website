"use client";
import { calcTH171, calcTH174, getZoneGeo, fmtKwh } from "../utils/ceeFormulas";

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-[#2c2c2a]/60">{label}</span>
      <span className="text-sm font-medium text-[#0d1e3a]">{value || "—"}</span>
    </div>
  );
}

function VolumeCard({ title, volume, color = "#1a9e75", phase, badge }) {
  return (
    <div className={`rounded-xl border-2 p-5`} style={{ borderColor: color }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-[#0d1e3a]">{title}</p>
        {badge && <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: color }}>{badge}</span>}
      </div>
      {phase && <p className="text-xs text-[#2c2c2a]/50 mb-2">{phase}</p>}
      <p className="text-xl font-bold" style={{ color }}>{fmtKwh(volume)}</p>
    </div>
  );
}

export default function SectionResume({ st, onPrint, pdfError }) {
  const { eligible_TH171, eligible_TH174 } = st;
  const vol171 = eligible_TH171 ? calcTH171(st) : 0;
  const vol174 = eligible_TH174 ? calcTH174(st) : 0;
  const zone = getZoneGeo(st.codePostal);
  const date = new Date().toLocaleDateString("fr-FR");
  const neither = !eligible_TH171 && !eligible_TH174;

  return (
    <div className="space-y-6">
      {/* Éligibilité */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "TH-171 — PAC air/eau", ok: eligible_TH171 },
          { label: "TH-174 — Isolation",   ok: eligible_TH174 },
        ].map(({ label, ok }) => (
          <div key={label} className={`rounded-xl p-4 border-2 ${ok ? "border-[#1a9e75] bg-[#1a9e75]/5" : "border-gray-200 bg-gray-50"}`}>
            <p className={`text-xs font-bold mb-1 ${ok ? "text-[#1a9e75]" : "text-gray-400"}`}>
              {ok ? "✓ ÉLIGIBLE" : "✗ Non éligible"}
            </p>
            <p className="text-sm font-medium text-[#0d1e3a]">{label}</p>
          </div>
        ))}
      </div>

      {neither && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
          Aucune éligibilité détectée avec les données actuelles. Vérifiez la classe DPE et le type de chauffage.
        </div>
      )}

      {/* Volumes CEE */}
      {(eligible_TH171 || eligible_TH174) && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#0d1e3a]">Volumes CEE estimés</p>
          {eligible_TH171 && eligible_TH174 && (
            <>
              <VolumeCard title="PAC air/eau (TH-171)" volume={vol171} badge="×5" phase="Phase 1 — Priorité" />
              <VolumeCard title="Isolation (TH-174)" volume={vol174} color="#3b82f6" phase="Phase 2" />
            </>
          )}
          {eligible_TH171 && !eligible_TH174 && (
            <VolumeCard title="PAC air/eau (TH-171)" volume={vol171} badge="×5" phase="Phase 1 unique" />
          )}
          {!eligible_TH171 && eligible_TH174 && (
            <VolumeCard title="Isolation (TH-174)" volume={vol174} color="#3b82f6" phase="Phase 1 unique" />
          )}
          <p className="text-xs text-[#2c2c2a]/40">Zone climatique : {zone} · Surface : {st.surface || "?"}m²</p>
        </div>
      )}

      {/* Récap données */}
      <div className="rounded-xl border border-gray-100 bg-white p-5">
        <p className="text-sm font-semibold text-[#0d1e3a] mb-3">Récapitulatif</p>
        <InfoRow label="Adresse" value={[st.adresse, st.codePostal, st.commune].filter(Boolean).join(", ")} />
        <InfoRow label="Type bâtiment" value={st.type_bati} />
        <InfoRow label="Surface" value={st.surface ? `${st.surface} m²` : null} />
        <InfoRow label="Classe DPE" value={st.classe_energie} />
        <InfoRow label="Chauffage actuel" value={st.chauffage_type} />
        <InfoRow label="Profil revenus" value={{ standard: "Standard", precaire: "Modeste", grand_precaire: "Très modeste" }[st.type_revenus]} />
        {eligible_TH171 && <InfoRow label="Émetteurs" value={st.type_emetteur} />}
        {eligible_TH171 && <InfoRow label="ETAS PAC" value={st.etas ? `${st.etas} %` : null} />}
        {eligible_TH171 && <InfoRow label="Application" value={st.type_application} />}
        <InfoRow label="Date simulation" value={date} />
      </div>

      {/* Export PDF */}
      <div>
        <button type="button" onClick={onPrint}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#0d1e3a] hover:bg-[#1a3460] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
          </svg>
          Télécharger le rapport PDF
        </button>
        {pdfError && <p className="text-xs text-red-500 mt-2 text-center">{pdfError}</p>}
        <p className="text-xs text-[#2c2c2a]/40 text-center mt-2">
          Utilise l'impression navigateur — à joindre dans Monday.com
        </p>
      </div>
    </div>
  );
}
