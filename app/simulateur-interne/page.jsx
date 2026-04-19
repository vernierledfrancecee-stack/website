"use client";
import { useState, useEffect, useMemo } from "react";
import { calculerEligibilite, etasParEmetteur } from "./utils/ceeFormulas";
import SectionLocalisation from "./components/SectionLocalisation";
import SectionRevenus     from "./components/SectionRevenus";
import SectionChauffage   from "./components/SectionChauffage";
import SectionPAC         from "./components/SectionPAC";
import SectionIsolation   from "./components/SectionIsolation";
import SectionResume      from "./components/SectionResume";

const INIT = {
  adresse:"", codePostal:"", commune:"",
  surface:"", classe_energie:"", chauffage_type:"", type_bati:"", annee_construction:"",
  dpe_loading:false, dpe_error:null, dpe_found:false,
  type_revenus:"standard", revenus:"",
  eligible_TH171:false, eligible_TH174:false,
  type_emetteur:"", ecs_inclus:false, etas:"126",
  acces_exterieur:false, surface_pac:"", type_application:"",
  murs_isoles:false, toiture_isolee:false, fenetres_recentes:false, annee_isolation:"",
};

function buildSteps(eligible_TH171, eligible_TH174) {
  const s = [
    { id:"localisation", label:"Localisation" },
    { id:"revenus",      label:"Revenus" },
  ];
  if (eligible_TH171) { s.push({ id:"chauffage", label:"Chauffage" }); s.push({ id:"pac", label:"PAC" }); }
  if (eligible_TH174) s.push({ id:"isolation", label:"Isolation" });
  s.push({ id:"resume", label:"Résumé" });
  return s;
}

function validate(id, st) {
  const e = {};
  if (id === "localisation") {
    if (!st.codePostal)     e.codePostal    = "Requis";
    if (!st.surface)        e.surface       = "Requis";
    if (!st.classe_energie) e.classe_energie = "Requis";
    if (!st.chauffage_type) e.chauffage_type = "Requis";
    if (!st.type_bati)      e.type_bati     = "Requis";
  }
  if (id === "chauffage" && !st.type_emetteur) e.type_emetteur = "Requis";
  if (id === "pac") {
    if (!st.surface_pac)    e.surface_pac    = "Requis";
    if (!st.type_application) e.type_application = "Requis";
  }
  return e;
}

export default function SimulateurInternePage() {
  const [st, setSt] = useState(INIT);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [pdfError, setPdfError] = useState(null);

  const set = (u) => setSt((p) => ({ ...p, ...u }));

  const steps = useMemo(
    () => buildSteps(st.eligible_TH171, st.eligible_TH174),
    [st.eligible_TH171, st.eligible_TH174]
  );
  const currentId = steps[step]?.id ?? "localisation";

  useEffect(() => { if (step >= steps.length) setStep(steps.length - 1); }, [steps.length, step]);

  useEffect(() => {
    const elig = calculerEligibilite(st);
    if (elig.eligible_TH171 !== st.eligible_TH171 || elig.eligible_TH174 !== st.eligible_TH174)
      set(elig);
    if (st.surface && !st.surface_pac) set({ surface_pac: st.surface });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.chauffage_type, st.annee_construction, st.classe_energie, st.surface]);

  useEffect(() => {
    if (st.type_emetteur) set(etasParEmetteur(st.type_emetteur));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.type_emetteur]);

  function handleNext() {
    const e = validate(currentId, st);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handlePrev() { setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function handleDPE() {
    if (!st.codePostal) { setErrors({ codePostal: "Entrez un code postal" }); return; }
    set({ dpe_loading: true, dpe_error: null });
    try {
      const r = await fetch("/api/dpe", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ adresse:st.adresse, codePostal:st.codePostal, commune:st.commune }),
        signal: AbortSignal.timeout(8000) });
      const d = await r.json();
      if (d.found) set({ dpe_found:true, dpe_loading:false, dpe_error:null,
        surface: d.surface?.toString() || st.surface,
        classe_energie: d.classe_energie || st.classe_energie,
        chauffage_type: d.chauffage_type || st.chauffage_type,
        annee_construction: d.annee_construction?.toString() || st.annee_construction,
        type_bati: d.type_bati || st.type_bati });
      else set({ dpe_found:false, dpe_loading:false, dpe_error:"DPE non trouvé, continuez manuellement" });
    } catch { set({ dpe_found:false, dpe_loading:false, dpe_error:"DPE non trouvé, continuez manuellement" }); }
  }

  function handlePrint() {
    try { window.print(); }
    catch (e) { console.error("PDF export:", e); setPdfError("Erreur export — essayez Ctrl+P."); }
  }

  const SECTIONS = { localisation:<SectionLocalisation st={st} set={set} errors={errors} onSearchDPE={handleDPE} />,
    revenus:<SectionRevenus st={st} set={set} />, chauffage:<SectionChauffage st={st} set={set} errors={errors} />,
    pac:<SectionPAC st={st} set={set} errors={errors} />, isolation:<SectionIsolation st={st} set={set} />,
    resume:<SectionResume st={st} onPrint={handlePrint} pdfError={pdfError} /> };

  const TITLES = { localisation:"Localisation du bien", revenus:"Profil revenus",
    chauffage:"Chauffage actuel", pac:"Infos PAC", isolation:"Isolation thermique", resume:"Plan d'action CEE" };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#f8f9fa] print:pt-0 print:bg-white">
      <style>{`@media print{.no-print{display:none!important}.print-show{display:block!important}}`}</style>

      <div className="bg-[#0d1e3a] py-10 no-print">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[#1a9e75] text-xs font-semibold uppercase tracking-widest mb-2">Outil interne LEDX</p>
          <h1 className="text-2xl font-bold text-white">Simulateur TH-171 + TH-174</h1>
          <p className="text-white/60 text-sm mt-1">PAC air/eau · Isolation thermique · Volumes CEE</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="max-w-2xl mx-auto px-4 pt-6 no-print">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1 shrink-0">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                i === step ? "bg-[#1a9e75] text-white" :
                i < step   ? "bg-[#1a9e75]/20 text-[#1a9e75]" : "bg-gray-100 text-gray-400"}`}>
                <span>{i < step ? "✓" : i + 1}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-4 h-px ${i < step ? "bg-[#1a9e75]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-1 no-print">{TITLES[currentId]}</h2>
          <p className="text-sm text-[#2c2c2a]/40 mb-6 no-print">{step + 1} / {steps.length}</p>
          {SECTIONS[currentId]}
          {currentId !== "resume" && (
            <div className="flex justify-between mt-8 no-print">
              {step > 0
                ? <button type="button" onClick={handlePrev} className="inline-flex items-center gap-2 border border-gray-200 text-[#2c2c2a]/70 hover:border-gray-300 font-medium px-6 py-3 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>Retour</button>
                : <div />}
              <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 bg-[#0d1e3a] hover:bg-[#1a3460] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
                Continuer<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}
          {currentId === "resume" && step > 0 && (
            <button type="button" onClick={handlePrev} className="mt-6 text-sm text-[#2c2c2a]/50 hover:text-[#0d1e3a] underline no-print">
              ← Modifier les données
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
