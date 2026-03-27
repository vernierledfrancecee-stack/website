const steps = [
  {
    number: "01",
    title: "Audit gratuit",
    description: "Nos experts analysent vos installations sans frais ni engagement.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "bg-[#0d1e3a]",
  },
  {
    number: "02",
    title: "Étude d'éligibilité",
    description: "Vérification de votre éligibilité CEE selon votre secteur et équipements.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-[#1a9e75]",
  },
  {
    number: "03",
    title: "Devis à 0 €",
    description: "Nous montons le dossier et coordonnons l'installation. Aucune avance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
    color: "bg-[#0d1e3a]",
  },
  {
    number: "04",
    title: "Installation RGE",
    description: "Nos partenaires certifiés RGE réalisent les travaux selon les standards CEE.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-[#1a9e75]",
  },
  {
    number: "05",
    title: "Certificats obtenus",
    description: "LEDX gère le dossier, le contrôle COFRAC et l'obtention des certificats.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: "bg-[#0d1e3a]",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block bg-[#0d1e3a]/10 text-[#0d1e3a] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Notre méthode
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a] mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-[#2c2c2a]/60 max-w-xl mx-auto text-sm sm:text-base">
            LEDX orchestre chaque étape, de l'audit initial jusqu'aux certificats.
          </p>
        </div>

        {/* Mobile : liste verticale avec connecteurs */}
        <div className="lg:hidden space-y-0 max-w-md mx-auto">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex gap-4">
              {/* Colonne icône + connecteur */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center shrink-0 z-10`}>
                  {step.icon}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 my-1 min-h-[2rem]" />
                )}
              </div>
              {/* Contenu */}
              <div className="pb-6 pt-1 flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold text-[#2c2c2a]/35 mb-0.5">
                  Étape {step.number}
                </div>
                <h3 className="text-[#0d1e3a] font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-[#2c2c2a]/60 text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop : grille horizontale */}
        <div className="hidden lg:block relative">
          <div className="absolute top-9 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#0d1e3a] via-[#1a9e75] to-[#0d1e3a] opacity-20" />
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div key={step.number} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center relative z-10`}>
                    {step.icon}
                  </div>
                </div>
                <div className={`text-xs font-mono font-bold mb-2 ${idx % 2 === 0 ? "text-[#0d1e3a]" : "text-[#1a9e75]"}`}>
                  Étape {step.number}
                </div>
                <h3 className="text-[#0d1e3a] font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-[#2c2c2a]/60 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
