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
  photo?: string; // chemin vers /public/realisations/
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
  {
    id: "10",
    titre: "PAC Air/Eau — Résidence collective",
    secteur: "Résidentiel collectif",
    fiche: "BAR-TH-179",
    categorie: "pac-residentiel",
    description:
      "Installation de 3 unités PAC Air/Eau en remplacement d'une chaufferie collective gaz. Résidence en cours de livraison, chauffage et eau chaude sanitaire couverts.",
    localisation: "Île-de-France",
    details: ["3 unités PAC extérieures", "Chauffage + ECS", "Remplacement gaz collectif", "Livraison neuf"],
    photo: "/realisations/pac/pac-residentiel-collective.jpg",
  },
  {
    id: "11",
    titre: "Entrepôt frigorifique alimentaire",
    secteur: "Agroalimentaire",
    fiche: "BAT-TH-134",
    categorie: "froid",
    description:
      "Optimisation du système de froid positif dans un entrepôt agroalimentaire à Mouriès. Éclairage LED intégré et régulation HP/BP flottante.",
    localisation: "Provence-Alpes-Côte d'Azur",
    details: ["Froid positif", "Régulation HP/BP", "LED haute baie", "Agroalimentaire"],
    photo: "/realisations/froid/entrepot-frigorifique-mouries.jpg",
  },
  {
    id: "12",
    titre: "Entrepôt industriel — LED haute baie",
    secteur: "Industrie",
    fiche: "BAT-EQ-127",
    categorie: "led",
    description:
      "Remplacement de l'éclairage d'un entrepôt industriel de stockage acier par des luminaires LED haute baie. Économies d'énergie de 65%. Pont roulant 12,5 t.",
    localisation: "Normandie",
    details: ["LED haute baie", "Pont roulant 12,5 t", "-65% consommation", "Stockage acier"],
    photo: "/realisations/led/entrepot-led-industriel-1.jpg",
  },
  {
    id: "13",
    titre: "Atelier de production — LED",
    secteur: "Industrie",
    fiche: "BAT-EQ-127",
    categorie: "led",
    description:
      "Rénovation complète de l'éclairage d'un atelier industriel. LED haute baie sur l'ensemble des nefs. Uniformité d'éclairement optimisée pour la sécurité opérateurs.",
    localisation: "Normandie",
    details: ["LED haute baie", "Atelier production", "Uniformité éclairement", "Sécurité opérateurs"],
    photo: "/realisations/led/entrepot-led-industriel-2.jpg",
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
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Visuel */}
            {r.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.photo}
                alt={r.titre}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className={`h-48 flex items-center justify-center relative overflow-hidden ${
                r.categorie === "led"
                  ? "bg-gradient-to-br from-amber-950 to-amber-900"
                  : r.categorie === "pac-tertiaire"
                  ? "bg-gradient-to-br from-[#0d1e3a] to-[#1a3460]"
                  : r.categorie === "pac-residentiel"
                  ? "bg-gradient-to-br from-indigo-950 to-indigo-900"
                  : r.categorie === "froid"
                  ? "bg-gradient-to-br from-cyan-950 to-cyan-900"
                  : "bg-gradient-to-br from-[#0d2e20] to-[#0d1e3a]"
              }`}>
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-10"
                  style={{backgroundImage:"linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",backgroundSize:"24px 24px"}}
                />
                {/* Big icon */}
                <span className="text-7xl relative z-10 drop-shadow-2xl opacity-80" role="img" aria-label={r.secteur}>
                  {categorieIcons[r.categorie]}
                </span>
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Localisation overlay */}
                {r.localisation && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                    <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white/80 text-xs font-medium">{r.localisation}</span>
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs text-[#2c2c2a]/50 font-medium">{r.secteur}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categorieColors[r.categorie]}`}>
                  {r.fiche}
                </span>
              </div>

              <h3 className="font-bold text-[#0d1e3a] text-lg mb-2">{r.titre}</h3>
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
