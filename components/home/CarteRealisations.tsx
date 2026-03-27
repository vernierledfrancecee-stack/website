const sectors = [
  {
    label: "Tertiaire & Industrie",
    icon: "🏢",
    items: [
      "PAC air/eau & air/air",
      "Optimisation froid commercial",
      "Rénovation globale bâtiments",
    ],
    count: "6 200+",
    unit: "sites",
    color: "text-[#1a9e75]",
    bg: "bg-[#1a9e75]/10",
    border: "border-[#1a9e75]/20",
  },
  {
    label: "Agriculture",
    icon: "🌱",
    items: [
      "VMC double flux (AGRI-TH-119)",
      "Déshumidificateur (AGRI-TH-117)",
      "Tube thermique (AGRI-108)",
    ],
    count: "1 400+",
    unit: "exploitations",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-amber-400/20",
  },
  {
    label: "Résidentiel collectif",
    icon: "🏘️",
    items: [
      "PAC résidentiel (BAR-TH-179)",
      "Isolation & chauffage",
      "Copropriétés & bailleurs",
    ],
    count: "1 400+",
    unit: "immeubles",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-400/20",
  },
];

// Dots recalculés depuis les vraies coordonnées GPS
// France métropolitaine : lat 42.3°N–51.1°N, lon -4.8°E–8.2°E
// SVG viewBox 0-100 : x = 16 + (lon+4.8)/13*64 ; y = 3 + (51.1-lat)/8.8*81
const dots = [
  { x: 55, y: 8  }, // Lille        50.6°N  3.1°E
  { x: 76, y: 24 }, // Strasbourg   48.6°N  7.75°E
  { x: 51, y: 22 }, // Paris        48.9°N  2.35°E
  { x: 60, y: 18 }, // Reims        49.3°N  4.03°E
  { x: 38, y: 19 }, // Caen         49.2°N -0.37°E
  { x: 31, y: 28 }, // Rennes       48.1°N -1.68°E
  { x: 41, y: 29 }, // Le Mans      48.0°N  0.20°E
  { x: 65, y: 35 }, // Dijon        47.3°N  5.04°E
  { x: 32, y: 37 }, // Nantes       47.2°N -1.55°E
  { x: 46, y: 49 }, // Limoges      45.8°N  1.26°E
  { x: 55, y: 49 }, // Clermont-Fd  45.8°N  3.08°E
  { x: 64, y: 49 }, // Lyon         45.75°N 4.85°E
  { x: 68, y: 54 }, // Grenoble     45.2°N  5.72°E
  { x: 37, y: 57 }, // Bordeaux     44.8°N -0.58°E
  { x: 47, y: 69 }, // Toulouse     43.6°N  1.44°E
  { x: 59, y: 69 }, // Montpellier  43.6°N  3.88°E
  { x: 66, y: 67 }, // Marseille    43.3°N  5.4°E
  { x: 72, y: 65 }, // Nice         43.7°N  7.27°E
  { x: 32, y: 70 }, // Bayonne      43.5°N -1.47°E
  { x: 54, y: 77 }, // Perpignan    42.7°N  2.9°E
];

export default function CarteRealisations() {
  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1a9e75]/10 border border-[#1a9e75]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e75] animate-pulse inline-block" />
            <span className="text-[#1a9e75] text-sm font-semibold">Présence nationale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1e3a] leading-tight mb-4">
            Nos réalisations en France
          </h2>
          <p className="text-[#2c2c2a]/60 text-base sm:text-lg max-w-xl mx-auto">
            Présents dans toute la France depuis 2020
          </p>
        </div>

        {/* Map + sectors layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 sm:mb-16">
          {/* France Map SVG */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto drop-shadow-sm"
                aria-label="Carte de France avec points de réalisations"
              >
                {/* France simplified outline */}
                <path
                  d="M38 5 L48 3 L58 6 L68 10 L76 18 L80 26 L78 34 L74 38 L76 44 L74 52 L70 58 L68 64 L64 70 L60 76 L55 80 L50 84 L44 82 L38 78 L32 74 L26 68 L20 62 L18 54 L16 46 L18 38 L16 30 L20 22 L26 14 L32 8 Z"
                  fill="#e8f0f8"
                  stroke="#c5d4e8"
                  strokeWidth="1"
                />
                {/* Corsica */}
                <path
                  d="M74 72 L76 70 L78 72 L77 76 L75 76 Z"
                  fill="#e8f0f8"
                  stroke="#c5d4e8"
                  strokeWidth="0.8"
                />
                {/* Realization dots */}
                {dots.map((dot, i) => (
                  <g key={i}>
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="2.2"
                      fill="#1a9e75"
                      opacity="0.85"
                    />
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="3.8"
                      fill="#1a9e75"
                      opacity="0.18"
                    />
                  </g>
                ))}
              </svg>
              {/* Legend */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a9e75] inline-block" />
                <span className="text-xs text-[#2c2c2a]/50">Zone d'intervention</span>
              </div>
            </div>
          </div>

          {/* 3 sector cards — horizontal scroll on mobile, grid on desktop */}
          <div>
            {/* Mobile: horizontal scroll */}
            <div className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2">
              {sectors.map((s) => (
                <div
                  key={s.label}
                  className={`${s.bg} border ${s.border} rounded-2xl p-5 w-[72vw] shrink-0 snap-center`}
                >
                  <span className="text-2xl mb-3 block">{s.icon}</span>
                  <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.count}</div>
                  <div className="text-[#2c2c2a]/50 text-xs mb-3">{s.unit}</div>
                  <div className="font-semibold text-[#0d1e3a] text-sm mb-3">{s.label}</div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[#2c2c2a]/60">
                        <span className={`${s.color} font-bold shrink-0`}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4">
              {sectors.map((s) => (
                <div
                  key={s.label}
                  className={`${s.bg} border ${s.border} rounded-2xl p-5`}
                >
                  <span className="text-2xl mb-3 block">{s.icon}</span>
                  <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.count}</div>
                  <div className="text-[#2c2c2a]/50 text-xs mb-3">{s.unit}</div>
                  <div className="font-semibold text-[#0d1e3a] text-sm mb-3">{s.label}</div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[#2c2c2a]/60">
                        <span className={`${s.color} font-bold shrink-0`}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "9 000+", label: "projets réalisés" },
            { value: "80+", label: "départements couverts" },
            { value: "0 €", label: "d'avance demandée" },
            { value: "depuis 2020", label: "en activité" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-4 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#0d1e3a]">{s.value}</div>
              <div className="text-[#2c2c2a]/50 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
