"use client";

import { useState, useRef, useEffect } from "react";

type Role = "bot" | "user";
type StepId =
  | "start" | "menu" | "cee_explication" | "cout" | "eligibilite_secteur"
  | "eligibilite_froid" | "eligibilite_eclairage" | "eligibilite_chauffage" | "lead_prenom"
  | "lead_telephone" | "lead_secteur_libre" | "done" | "autre_question" | "autre_reponse";

interface Message {
  role: Role;
  text: string;
}

interface Step {
  bot: string[];
  options?: { label: string; next: StepId; value?: string }[];
  input?: { type: "text" | "tel"; placeholder: string; next: StepId; key: string };
}

const FLOW: Record<StepId, Step> = {
  start: {
    bot: ["Bonjour ! 👋 Je suis l'assistant LEDX Énergie.", "Comment puis-je vous aider ?"],
    options: [
      { label: "Suis-je éligible aux CEE ?", next: "eligibilite_secteur" },
      { label: "C'est quoi les CEE ?", next: "cee_explication" },
      { label: "Combien ça coûte ?", next: "cout" },
      { label: "Être rappelé par un expert", next: "lead_prenom" },
      { label: "Autre question", next: "autre_question" },
    ],
  },
  menu: {
    bot: ["Autre chose que je peux faire pour vous ?"],
    options: [
      { label: "Suis-je éligible aux CEE ?", next: "eligibilite_secteur" },
      { label: "C'est quoi les CEE ?", next: "cee_explication" },
      { label: "Être rappelé par un expert", next: "lead_prenom" },
    ],
  },
  cee_explication: {
    bot: [
      "Les CEE (Certificats d'Économies d'Énergie) obligent les fournisseurs d'énergie — EDF, Total, Engie… — à financer des travaux d'efficacité énergétique chez leurs clients professionnels.",
      "LEDX monte votre dossier CEE de A à Z et vous accompagne jusqu'aux certificats. Nos partenaires RGE réalisent les travaux. Résultat : 0 € à débourser de votre côté. Dispositif légal encadré par l'ADEME depuis 2006.",
      "Vous voulez savoir si votre site est éligible ?",
    ],
    options: [
      { label: "Oui, tester mon éligibilité", next: "eligibilite_secteur" },
      { label: "Être rappelé par un expert", next: "lead_prenom" },
      { label: "Autre question", next: "menu" },
    ],
  },
  cout: {
    bot: [
      "Le projet est 100% financé par les CEE — vous ne payez rien. 🎯",
      "Ni frais de dossier, ni participation aux travaux, ni remboursement différé. LEDX est rémunérée sur la valeur des certificats générés par votre projet — et non par vous.",
      "Voulez-vous vérifier votre éligibilité ?",
    ],
    options: [
      { label: "Oui, vérifier mon éligibilité", next: "eligibilite_secteur" },
      { label: "Être rappelé pour en savoir plus", next: "lead_prenom" },
      { label: "Autre question", next: "menu" },
    ],
  },
  eligibilite_secteur: {
    bot: ["Quel est votre secteur d'activité ?"],
    options: [
      { label: "🏢 Entreprise / Tertiaire (bureaux, santé, hôtel…)", next: "eligibilite_chauffage", value: "tertiaire" },
      { label: "🏭 Industrie / GMS / Entrepôt frigorifique", next: "eligibilite_froid", value: "industrie" },
      { label: "🌿 Agriculture / Serres maraîchères", next: "lead_prenom", value: "agricole" },
      { label: "🏠 Copropriété / Résidentiel collectif", next: "eligibilite_chauffage", value: "residentiel" },
    ],
  },
  eligibilite_froid: {
    bot: ["Avez-vous des installations frigorifiques (chambres froides, vitrines réfrigérées, entrepôts froid) ?"],
    options: [
      { label: "Oui, je gère des installations froid", next: "lead_prenom", value: "froid-oui" },
      { label: "Non, pas d'installations froid", next: "eligibilite_chauffage", value: "froid-non" },
    ],
  },
  eligibilite_eclairage: {
    bot: ["Votre éclairage actuel est-il déjà en LED ?"],
    options: [
      { label: "Non / Partiellement (néons, halogènes…)", next: "lead_prenom", value: "non-led" },
      { label: "Oui, entièrement en LED", next: "eligibilite_chauffage", value: "led" },
    ],
  },
  eligibilite_chauffage: {
    bot: ["Votre chauffage fonctionne au gaz ou au fioul ?"],
    options: [
      { label: "Oui, gaz ou fioul", next: "lead_prenom", value: "gaz-fioul" },
      { label: "Non (électrique, réseau chaleur…)", next: "lead_prenom", value: "autre" },
    ],
  },
  lead_prenom: {
    bot: [
      "Parfait ! 🎉 Votre profil correspond à nos critères d'éligibilité CEE.",
      "Un expert LEDX peut analyser votre situation gratuitement et sans engagement.",
      "Pour vous recontacter — quel est votre prénom ?",
    ],
    input: { type: "text", placeholder: "Votre prénom…", next: "lead_telephone", key: "prenom" },
  },
  lead_telephone: {
    bot: ["Et votre numéro de téléphone ?"],
    input: { type: "tel", placeholder: "06 XX XX XX XX", next: "lead_secteur_libre", key: "telephone" },
  },
  lead_secteur_libre: {
    bot: ["Votre secteur d'activité ? (optionnel — appuyez sur Entrée pour passer)"],
    input: { type: "text", placeholder: "Ex : entrepôt logistique, EHPAD, serre tomate…", next: "done", key: "secteur" },
  },
  done: {
    bot: [
      "✅ C'est noté ! Un expert LEDX vous contacte sous 24h.",
      "En attendant, vous pouvez utiliser notre simulateur pour découvrir vos fiches CEE éligibles.",
      "À très bientôt !",
    ],
    options: [
      { label: "Aller au simulateur →", next: "done" },
    ],
  },
  autre_question: {
    bot: ["Posez votre question, je fais de mon mieux pour vous répondre 👇"],
    input: { type: "text", placeholder: "Votre question…", next: "autre_reponse", key: "question" },
  },
  autre_reponse: {
    bot: [
      "Merci pour votre question ! Pour une réponse précise et personnalisée, un expert LEDX peut vous rappeler gratuitement.",
      "Quel est votre prénom ?",
    ],
    input: { type: "text", placeholder: "Votre prénom…", next: "lead_telephone", key: "prenom" },
  },
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-[#1a9e75]/60"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<StepId>("start");
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const [notif, setNotif] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Open → start conversation
  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      startStep("start");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Notification badge disappears after 5s
  useEffect(() => {
    const t = setTimeout(() => setNotif(false), 12000);
    return () => clearTimeout(t);
  }, []);

  function startStep(id: StepId, extraMessages?: Message[]) {
    const s = FLOW[id];
    setStep(id);
    setTyping(true);

    const botLines = s.bot;
    let delay = 0;

    const accumulated: Message[] = [...(extraMessages ?? messages)];

    botLines.forEach((line, idx) => {
      setTimeout(() => {
        accumulated.push({ role: "bot", text: line });
        setMessages([...accumulated]);
        if (idx === botLines.length - 1) setTyping(false);
      }, delay);
      delay += 900 + line.length * 12;
    });
  }

  function handleOption(label: string, next: StepId) {
    const newMessages: Message[] = [...messages, { role: "user", text: label }];
    setMessages(newMessages);

    if (next === "done" && label.includes("simulateur")) {
      window.location.href = "/simulateur";
      return;
    }

    setTimeout(() => startStep(next, newMessages), 400);
  }

  async function handleInput(e: React.FormEvent) {
    e.preventDefault();
    const val = inputVal.trim();
    if (!val && step !== "lead_secteur_libre") return;

    const currentStep = FLOW[step];
    if (!currentStep.input) return;

    const newLeadData = { ...leadData, [currentStep.input.key]: val };
    setLeadData(newLeadData);
    setInputVal("");

    const newMessages: Message[] = val
      ? [...messages, { role: "user", text: val }]
      : messages;
    setMessages(newMessages);

    const next = currentStep.input.next;

    // Submit when done
    if (next === "done") {
      try {
        await fetch("/api/contact/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newLeadData, source: "chat-agent" }),
        });
      } catch {
        // silent fail
      }
    }

    setTimeout(() => startStep(next, newMessages), 400);
  }

  const currentStep = FLOW[step];
  const isDone = step === "done";

  return (
    <>
      {/* Bouton flottant */}
      <div className="fixed z-50 flex flex-col items-end gap-3" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)", right: "1.5rem" }}>
        {/* Bulle de notification — masquée sur mobile */}
        {!open && notif && (
          <div className="hidden sm:block bg-white text-[#0d1e3a] text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-sm shadow-lg border border-gray-100 max-w-[220px] animate-[slideIn_0.4s_ease-out]">
            💬 Un expert LEDX vous répond !
          </div>
        )}

        <button
          onClick={() => { setOpen(!open); setNotif(false); }}
          aria-label={open ? "Fermer le chat" : "Ouvrir le chat LEDX"}
          className="w-14 h-14 rounded-full bg-[#0d1e3a] hover:bg-[#1a3460] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
        >
          {!open ? (
            <>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {notif && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1a9e75] border-2 border-white animate-pulse" />
              )}
            </>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Fenêtre de chat */}
      {open && (
        <div className="fixed z-50 w-[90vw] sm:w-[350px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-[slideIn_0.3s_ease-out]" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)", right: "1rem", left: "auto" }}>
          {/* Header */}
          <div className="bg-[#0d1e3a] px-4 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1a9e75] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Assistant LEDX Énergie</p>
              <p className="text-[#1a9e75] text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e75] inline-block" />
                En ligne · Répond sous 24h
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px] max-h-[45vh] sm:max-h-[400px] bg-[#f8f9fa]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#0d1e3a] flex items-center justify-center mr-2 shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white text-[#2c2c2a] rounded-tl-sm shadow-sm border border-gray-100"
                      : "bg-[#0d1e3a] text-white rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-[#0d1e3a] flex items-center justify-center mr-2 shrink-0">
                  <svg className="w-3 h-3 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Actions */}
          {!typing && (
            <div className="p-3 bg-white border-t border-gray-100">
              {currentStep.options && !isDone && (
                <div className="flex flex-col gap-1.5">
                  {currentStep.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOption(opt.label, opt.next)}
                      className="text-left text-sm px-3.5 py-2.5 rounded-xl border border-[#0d1e3a]/15 text-[#0d1e3a] hover:bg-[#0d1e3a] hover:text-white hover:border-[#0d1e3a] transition-all duration-150 font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {currentStep.input && !isDone && (
                <form onSubmit={handleInput} className="flex gap-2">
                  <input
                    type={currentStep.input.type}
                    placeholder={currentStep.input.placeholder}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    autoFocus
                    className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0d1e3a] text-[#2c2c2a] placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-xl bg-[#0d1e3a] hover:bg-[#1a3460] flex items-center justify-center transition-colors shrink-0"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              )}

              {isDone && (
                <a
                  href="/simulateur"
                  className="flex items-center justify-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors w-full"
                >
                  Démarrer le simulateur →
                </a>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40%            { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
