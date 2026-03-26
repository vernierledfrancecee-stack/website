"use client";

import { useState } from "react";

interface Realisation {
  id: string;
  titre: string;
  secteur: string;
  fiche: string;
  categorie: "led" | "pac-tertiaire" | "pac-residentiel" | "froid" | "agricole";
  description: string;
  localisation?: string;
  details?: string[];
}

const realisations: Realisation[] = [
  {
    id: "1",
    titre: "PAC 120 kW — Site tertiaire",
    secteur: "Tertiaire",
    fiche: "BAT-TH-163",
    categorie: "pac-tertiaire",
    description:
      "Remplacement d'une chaufferie gaz par cascade de 4 PAC Air/Eau de 30 kW. 2 réseaux aérothermes indépendants. Surface couverte : 4 200 m².",
    localisation: "Île-de-France",
    details: ["4 × PAC 30 kW en cascade", "2 réseaux aérothermes", "4 200 m² couverts", "Zone H2"],
  },
  {
    id: "2",
    titre: "PAC 64 kW — Immeuble tertiaire",
    secteur: "Tertiaire",
    fiche: "BAT-TH-163",
    categorie: "pac-tertiaire",
    description:
      "Installation de 4 PAC T-CAP série M de 16 kW en remplacement chaudière fioul. Chauffage + ECS. Secteur santé.",
    localisation: "Grand Est",
    details: ["4 × T-CAP 16 kW", "Chauffage + ECS", "Remplacement fioul", "Secteur santé"],
  },
  {
    id: "3",
    titre: "PAC 60 kW — Centre commercial",
    secteur: "Tertiaire",
    fiche: "BAT-TH-163",
    categorie: "pac-tertiaire",
    description:
      "2 BIG TCAP 30 kW en remplacement d'une chaudière gaz. Galerie commerciale de 3 100 m² en zone H1.",
    localisation: "Hauts-de-France",
    details: ["2 × BIG TCAP 30 kW", "3 100 m²", "Zone H1", "Galerie commerciale"],
  },
  {
    id: "4",
    titre: "Résidence 38 appartements",
    secteur: "Résidentiel collectif",
    fiche: "BAR-TH-179",
    categorie: "pac-residentiel",
    description:
      "Remplacement chaufferie collective gaz pour copropriété de 38 logements. PAC All-in-one 3 kW et 5 kW.",
    localisation: "Bretagne",
    details: ["38 logements", "PAC All-in-one 3 kW & 5 kW", "Remplacement gaz collectif"],
  },
  {
    id: "5",
    titre: "Résidence 58 logements",
    secteur: "Résidentiel collectif",
    fiche: "BAR-TH-179",
    categorie: "pac-residentiel",
    description:
      "3 BIG TCAP en installation collective pour résidence sociale de 58 logements. Réseaux ECS rénovés.",
    localisation: "Normandie",
    details: ["58 logements", "3 × BIG TCAP", "Réseaux ECS", "Bailleur social"],
  },
  {
    id: "6",
    titre: "Régulation froid — GMS",
    secteur: "Commerce GMS",
    fiche: "BAT-TH-134 / BAT-TH-145",
    categorie: "froid",
    description:
      "Régulation HP/BP flottante sur 12 unités frigorifiques. Économies annuelles de 38% constatées. Automate RS485.",
    localisation: "Occitanie",
    details: ["12 unités frigorifiques", "-38% consommation", "Automate RS485", "Capteurs NTC IP67"],
  },
  {
    id: "7",
    titre: "Serres maraîchères — VMC double flux",
    secteur: "Agriculture",
    fiche: "AGRI-TH-119",
    categorie: "agricole",
    description:
      "Installation VMC double flux Enerton sur serres multichapelles de 8 500 m². Gestion climatique centralisée.",
    localisation: "Pays de la Loire",
    details: ["8 500 m² serres", "VMC Enerton", "Multichapelle", "Gestion climatique centralisée"],
  },
  {
    id: "8",
    titre: "Serres — Déshumidificateur thermodynamique",
    secteur: "Agriculture",
    fiche: "AGRI-TH-117",
    categorie: "agricole",
    description:
      "6 déshumidificateurs PE-D520 installés sur serres tomate de 6 200 m². Économies chauffage -32%.",
    localisation: "Centre-Val de Loire",
    details: ["6 × PE-D520", "6 200 m² serres", "Production tomates", "R = 2,4"],
  },
  {
    id: "9",
    titre: "Entrepôt logistique — LED",
    secteur: "Logistique",
    fiche: "BAT-EQ-127",
    categorie: "led",
    description:
      "Remplacement de 420 luminaires néon par LED haute baie dans entrepôt de 12 000 m². Économies -68%.",
    localisation: "Rhône-Alpes",
    details: ["420 luminaires LED", "12 000 m²", "-68% consommation", "Haute baie"],
  },
];

const filtres = [
  { id: "tous", label: "Tous" },
  { id: "led", label: "LED" },
  { id: "pac-tertiaire", label: "PAC Tertiaire" },
  { id: "pac-residentiel", label: "PAC Résidentiel" },
  { id: "froid", label: "Froid" },
  { id: "agricole", label: "Agricole" },
];

const categorieColors: Record<string, string> = {
  led: "bg-amber-100 text-amber-800",
  "pac-tertiaire": "bg-blue-100 text-blue-800",
  "pac-residentiel": "bg-indigo-100 text-indigo-800",
  froid: "bg-cyan-100 text-cyan-800",
  agricole: "bg-[#1a9e75]/20 text-[#1a9e75]",
};

const categorieIcons: Record<string, string> = {
  led: "💡",
  "pac-tertiaire": "🏢",
  "pac-residentiel": "🏠",
  froid: "❄️",
  agricole: "🌿",
};

export default function RealisationsGallery() {
  const [filtre, setFiltre] = useState("tous");

  const filtered =
    filtre === "tous"
      ? realisations
      : realisations.filter((r) => r.categorie === filtre);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filtres.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltre(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filtre === f.id
                ? "bg-[#0d1e3a] text-white shadow-sm"
                : "bg-white border border-gray-200 text-[#2c2c2a]/70 hover:border-[#0d1e3a]/30 hover:text-[#0d1e3a]"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#2c2c2a]/50 self-center">
          {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
          >
            {/* Header coloré */}
            <div className={`h-3 ${
              r.categorie === "led" ? "bg-amber-400" :
              r.categorie === "pac-tertiaire" ? "bg-blue-500" :
              r.categorie === "pac-residentiel" ? "bg-indigo-500" :
              r.categorie === "froid" ? "bg-cyan-500" :
              "bg-[#1a9e75]"
            }`} />

            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="text-2xl">{categorieIcons[r.categorie]}</div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categorieColors[r.categorie]}`}>
                  {r.fiche}
                </span>
              </div>

              <h3 className="font-bold text-[#0d1e3a] text-lg mb-1">{r.titre}</h3>
              <p className="text-xs text-[#2c2c2a]/50 mb-3">
                {r.secteur}{r.localisation ? ` — ${r.localisation}` : ""}
              </p>
              <p className="text-sm text-[#2c2c2a]/70 leading-relaxed mb-4">{r.description}</p>

              {r.details && (
                <div className="flex flex-wrap gap-1.5">
                  {r.details.map((d) => (
                    <span key={d} className="text-xs bg-[#f8f9fa] border border-gray-100 text-[#2c2c2a]/60 px-2.5 py-1 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-12 bg-[#f8f9fa] border border-gray-100 rounded-2xl p-6 text-center">
        <p className="text-sm text-[#2c2c2a]/60">
          Ces réalisations ne représentent qu&apos;un échantillon de nos 9 000+ projets.
          Les noms des clients et adresses précises sont omis par souci de confidentialité.
        </p>
      </div>
    </div>
  );
}
