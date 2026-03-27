export type SolutionSlug =
  | "pac-tertiaire"
  | "pac-residentiel"
  | "froid-commercial"
  | "agriculture"
  | "renov-globale";

export type SolutionData = {
  slug: SolutionSlug;
  name: string;
  fiches: string[];
  emoji: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  cardBg: string;
  hero: {
    title: string;
    titleAccent: string;
    desc: string;
    stats: { value: string; label: string }[];
  };
  process: { n: string; title: string; desc: string }[];
  eligibility: string[];
  sectors: string[];
  faq: { q: string; a: string }[];
  cta: string;
  ctaStyle: string;
  comingSoon?: boolean;
};

export const solutions: SolutionData[] = [
  {
    slug: "pac-tertiaire",
    name: "Pompe à Chaleur — Tertiaire",
    fiches: ["BAT-TH-163"],
    emoji: "🏢",
    tag: "Produit phare 2026",
    tagColor: "text-[#1a9e75] bg-[#1a9e75]/10 border-[#1a9e75]/25",
    accentColor: "#1a9e75",
    cardBg: "from-[#0d1e3a] to-[#1a3460]",
    hero: {
      title: "Remplacez votre chaudière gaz ou fioul.",
      titleAccent: "Payez 0 €.",
      desc: "La pompe à chaleur Air/Eau est le levier d'économie le plus puissant pour les bâtiments tertiaires. LEDX monte votre dossier CEE de A à Z — vous ne payez rien, votre installateur RGE réalise les travaux.",
      stats: [
        { value: "-50%", label: "sur la facture chauffage" },
        { value: "Jusqu'à 90%", label: "du projet financé" },
        { value: "0 €", label: "d'avance trésorerie" },
      ],
    },
    process: [
      { n: "01", title: "Étude de faisabilité", desc: "LEDX analyse votre installation actuelle, votre surface et votre zone climatique (H1/H2/H3) pour valider l'éligibilité et estimer le montant CEE." },
      { n: "02", title: "Constitution du dossier", desc: "Nous collectons et montons l'intégralité des pièces administratives : attestation sur l'honneur, facture, fiches techniques PAC. Dossier déposé sous 48h." },
      { n: "03", title: "Travaux par installateur RGE", desc: "Un de nos partenaires installateurs certifiés RGE intervient pour la dépose de la chaudière existante et l'installation de la PAC. Zéro démarche de votre côté." },
      { n: "04", title: "Versement de la prime", desc: "Dès validation du dossier par l'obligé CEE, la prime est versée directement en déduction de votre facture travaux. Délai moyen : 3 à 6 semaines." },
    ],
    eligibility: [
      "Chauffage actuel au gaz naturel ou fioul (OBLIGATOIRE)",
      "Bâtiment existant depuis plus de 2 ans",
      "Dépose d'au moins une chaudière existante requise",
      "La PAC doit couvrir ≥ 41% des besoins en chaleur",
      "Surface minimale : 1 200 m² (bureaux/santé H1) à 6 000 m² (logistique H3)",
    ],
    sectors: ["🏢 Bureaux", "🏥 Santé", "🏨 Hôtels", "🏪 Commerces", "🏗️ Logistique", "🏠 Copropriétés"],
    faq: [
      { q: "Qui installe la pompe à chaleur ?", a: "L'installation est réalisée par un artisan certifié RGE (Reconnu Garant de l'Environnement) partenaire de LEDX. Vous n'avez aucune démarche à faire pour trouver un installateur." },
      { q: "Combien de temps prennent les travaux ?", a: "L'installation d'une PAC tertiaire prend généralement 2 à 5 jours selon la surface du bâtiment. LEDX planifie les travaux pour minimiser l'interruption d'activité." },
      { q: "Quand reçoit-on la prime CEE ?", a: "La prime est déduite directement de la facture travaux une fois le dossier validé. Délai moyen de validation : 3 à 6 semaines après dépôt du dossier complet." },
      { q: "La PAC fonctionne-t-elle avec mon réseau hydraulique existant ?", a: "Dans la grande majorité des cas, oui. Notre équipe technique vérifie lors de l'étude de faisabilité la compatibilité avec vos émetteurs (radiateurs, plancher chauffant, ventilo-convecteurs)." },
      { q: "Faut-il garder la chaudière en backup ?", a: "Non. La réglementation impose la dépose de la chaudière existante. La PAC couvre 100% du besoin de chauffage (base + appoint électrique intégré)." },
    ],
    cta: "Tester mon éligibilité PAC",
    ctaStyle: "bg-[#1a9e75] hover:bg-[#147a5b]",
  },
  {
    slug: "pac-residentiel",
    name: "PAC Collective — Résidentiel",
    fiches: ["BAR-TH-179"],
    emoji: "🏘️",
    tag: "Coup de Pouce 2026",
    tagColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    accentColor: "#4f46e5",
    cardBg: "from-[#0d1e3a] to-[#1e1b4b]",
    hero: {
      title: "Votre copropriété peut passer à la PAC.",
      titleAccent: "Sans débourser un centime.",
      desc: "Remplacement de la chaufferie collective gaz ou fioul par une PAC collective haute performance. LEDX monte le dossier CEE, gère les démarches syndicales et coordonne l'installateur RGE.",
      stats: [
        { value: "-60%", label: "sur la facture chauffage" },
        { value: "Coup de Pouce", label: "prime boostée 2026" },
        { value: "0 €", label: "reste à charge visé" },
      ],
    },
    process: [
      { n: "01", title: "Audit de la chaufferie collective", desc: "Analyse du réseau hydraulique collectif, de la puissance installée, du nombre de logements et des émetteurs pour valider l'éligibilité BAR-TH-179." },
      { n: "02", title: "Dossier CEE + accompagnement syndic", desc: "LEDX monte le dossier et accompagne le syndic dans la présentation en AG de copropriété. Nous fournissons tous les documents nécessaires au vote." },
      { n: "03", title: "Installation par partenaire RGE", desc: "Remplacement de la chaufferie par l'équipe RGE partenaire. Intervention en sous-sol ou local technique, sans toucher aux logements." },
      { n: "04", title: "Prime déduite de la facture", desc: "La prime CEE (majorée Coup de Pouce) est déduite directement de la facture. Les copropriétaires ne paient généralement rien." },
    ],
    eligibility: [
      "Immeuble collectif de plus de 2 ans",
      "Réseau hydraulique collectif existant (eau chaude)",
      "Remplacement chaudière gaz ou fioul uniquement",
      "Aucune PAC déjà installée sur le réseau collectif",
      "Vote en AG requis (LEDX vous accompagne)",
    ],
    sectors: ["🏠 Copropriétés", "🏢 Bailleurs sociaux (HLM)", "🏦 SCI monopropriété", "🎓 Résidences étudiantes", "👴 Résidences senior"],
    faq: [
      { q: "Faut-il un vote en AG pour lancer le projet ?", a: "Oui, un vote en assemblée générale à la majorité de l'article 25 est requis. LEDX vous fournit tous les documents de présentation pour faciliter ce vote." },
      { q: "Les locataires sont-ils impactés pendant les travaux ?", a: "Non. Les travaux se déroulent exclusivement dans les parties communes (chaufferie). Aucune intervention dans les logements n'est nécessaire." },
      { q: "Quel est le montant de la prime Coup de Pouce ?", a: "Le montant varie selon la surface chauffée et la zone climatique. Pour un immeuble de 20 logements, la prime est typiquement de 25 000 à 80 000 €." },
      { q: "La PAC peut-elle aussi faire la climatisation ?", a: "Selon le modèle choisi, oui. Les PAC réversibles peuvent assurer le rafraîchissement en été, réduisant encore davantage les dépenses énergétiques." },
    ],
    cta: "Étudier notre copropriété",
    ctaStyle: "bg-indigo-700 hover:bg-indigo-800",
  },
  {
    slug: "froid-commercial",
    name: "Régulation Froid Commercial",
    fiches: ["BAT-TH-134", "BAT-TH-145"],
    emoji: "❄️",
    tag: "Froid commercial",
    tagColor: "text-cyan-700 bg-cyan-50 border-cyan-200",
    accentColor: "#0891b2",
    cardBg: "from-[#0d1e3a] to-[#0a2040]",
    hero: {
      title: "Votre installation froid consomme 40% de trop.",
      titleAccent: "Les CEE la financent.",
      desc: "Le froid représente jusqu'à 80% de la facture énergétique en GMS et entrepôts frigorifiques. La régulation HP/BP flottante réduit cette consommation jusqu'à 40% — sans changer vos équipements.",
      stats: [
        { value: "-40%", label: "de consommation froid" },
        { value: "< 2 ans", label: "retour sur investissement" },
        { value: "0 €", label: "d'avance" },
      ],
    },
    process: [
      { n: "01", title: "Audit de l'installation frigorifique", desc: "Analyse de votre centrale frigorifique : puissance, configuration HP/BP, température extérieure de conception, schéma de principe. Diagnostic envoyé sous 48h." },
      { n: "02", title: "Dimensionnement du système de régulation", desc: "Calcul des paramètres de régulation optimaux selon votre configuration. Sélection de l'automate central et des capteurs (NTC IP67, protocoles RS485/TCP-IP)." },
      { n: "03", title: "Installation sans arrêt de l'activité", desc: "Nos techniciens certifiés interviennent en dehors des heures d'ouverture. L'installation de la régulation HP/BP ne nécessite pas d'arrêt de la chaîne du froid." },
      { n: "04", title: "Mise en service et monitoring", desc: "Paramétrage en conditions réelles, vérification des économies, remise du rapport de mise en service. Monitoring à distance disponible pour suivi continu." },
    ],
    eligibility: [
      "Installation frigorifique existante > 40 kW",
      "Bâtiment à usage commercial, industriel ou logistique",
      "Système avec au moins une centrale frigorifique",
      "Pas de régulation HP/BP déjà installée",
      "Bâtiment existant depuis plus de 2 ans",
    ],
    sectors: ["🏪 GMS / Supermarchés", "🏭 Entrepôts frigorifiques", "🥩 Agroalimentaire", "🚛 Plateformes logistiques", "🏨 Hôtellerie-restauration"],
    faq: [
      { q: "Faut-il arrêter la chaîne du froid pour l'installation ?", a: "Non. Nos techniciens interviennent en dehors des heures d'ouverture. L'installation de la régulation n'interrompt pas votre chaîne du froid." },
      { q: "Quels équipements sont compatibles ?", a: "La régulation HP/BP est compatible avec la quasi-totalité des centrales frigorifiques du marché (Carrier, Bitzer, Copeland, Danfoss…). Notre audit valide la compatibilité en amont." },
      { q: "Les économies sont-elles garanties ?", a: "LEDX s'engage sur une réduction d'au moins 25% de la consommation frigorifique (typiquement 35-40%). Un rapport de monitoring est fourni après la première année." },
      { q: "La fiche BAT-TH-134 et BAT-TH-145, c'est quoi la différence ?", a: "BAT-TH-134 concerne la régulation pour les installations de froid négatif (congélation), BAT-TH-145 pour le froid positif (réfrigération 0-8°C). LEDX dépose les deux fiches simultanément lorsque les deux sont présentes." },
    ],
    cta: "Auditer mon installation froid",
    ctaStyle: "bg-cyan-700 hover:bg-cyan-800",
  },
  {
    slug: "agriculture",
    name: "Optimisation Énergétique Agricole",
    fiches: ["AGRI-TH-119", "AGRI-TH-117", "AGRI-108"],
    emoji: "🌱",
    tag: "Agriculture",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
    accentColor: "#d97706",
    cardBg: "from-[#0d1e3a] to-[#1a2e10]",
    hero: {
      title: "Des subventions massives pour vos serres",
      titleAccent: "et bâtiments agricoles.",
      desc: "LEDX est l'un des rares opérateurs CEE spécialisés dans l'agriculture. 3 fiches opérationnelles, des solutions éprouvées sur le terrain — VMC double flux, déshumidificateur thermodynamique, tube thermique passif.",
      stats: [
        { value: "-35%", label: "d'énergie en serre" },
        { value: "3 fiches", label: "CEE agricoles" },
        { value: "0 €", label: "reste à charge" },
      ],
    },
    process: [
      { n: "01", title: "Diagnostic de la serre", desc: "Analyse des besoins énergétiques, surface de la serre, type de cultures et système de chauffage actuel. Identification des fiches éligibles (une ou plusieurs)." },
      { n: "02", title: "Sélection des équipements", desc: "Selon la configuration, LEDX sélectionne la combinaison optimale : VMC double flux Enerton, déshumidificateur PE-D, ou tubes thermiques TM5012." },
      { n: "03", title: "Dossier CEE multi-fiches", desc: "LEDX monte simultanément les dossiers pour toutes les fiches éligibles. Un seul interlocuteur, un seul process, plusieurs primes cumulables." },
      { n: "04", title: "Installation coordonnée", desc: "Intervention de nos équipes techniques spécialisées serres, en intersaison pour limiter l'impact sur les cultures. Mise en service avec formation du personnel." },
    ],
    eligibility: [
      "Exploitation agricole avec serre chauffée ≥ 500 m² (AGRI-TH-117/119)",
      "Serre de type multichapelle ou tunnel",
      "Chauffage existant (gaz, fioul, biomasse)",
      "Bâtiment agricole existant depuis plus de 2 ans",
      "Exploitant individuel, GAEC, EARL, coopérative agricole",
    ],
    sectors: ["🌿 Serres maraîchères", "🌸 Horticulture", "🍅 Cultures sous abri", "🐄 Bâtiments d'élevage", "🌾 Coopératives agricoles"],
    faq: [
      { q: "Peut-on cumuler plusieurs fiches agricoles ?", a: "Oui, les fiches AGRI-TH-119, AGRI-TH-117 et AGRI-108 sont cumulables sur un même site. LEDX dépose tous les dossiers simultanément pour maximiser le montant total de la prime." },
      { q: "Les travaux perturbent-ils les cultures ?", a: "Non. Nos équipes interviennent en intersaison ou en périphérie de la serre. L'installation du tube thermique notamment est 100% passive et ne requiert aucune intervention sur le système de chauffage." },
      { q: "Les coopératives agricoles sont-elles éligibles ?", a: "Oui, les coopératives, GAEC et EARL sont pleinement éligibles aux fiches CEE agricoles. LEDX a l'habitude de travailler avec des structures multi-sites." },
      { q: "Quel est le délai entre la signature et le versement de la prime ?", a: "Environ 6 à 10 semaines entre la signature de l'accord de financement et le versement de la prime. Les travaux ne peuvent débuter qu'après signature." },
    ],
    cta: "Voir les aides pour mon exploitation",
    ctaStyle: "bg-amber-600 hover:bg-amber-700",
  },
  {
    slug: "renov-globale",
    name: "Rénovation Globale Tertiaire",
    fiches: ["BAT-EN-109"],
    emoji: "⚡",
    tag: "En développement",
    tagColor: "text-orange-700 bg-orange-50 border-orange-200",
    accentColor: "#ea580c",
    cardBg: "from-[#0d1e3a] to-[#3b1a05]",
    comingSoon: true,
    hero: {
      title: "Rénovez votre bâtiment de A à Z.",
      titleAccent: "Un seul dossier, plusieurs primes.",
      desc: "La Rénovation Globale Tertiaire permet de cumuler isolation, remplacement de chauffage et ventilation dans un seul dossier CEE. La fiche BAT-EN-109 finance jusqu'à 70% des travaux globaux.",
      stats: [
        { value: "Jusqu'à 70%", label: "du projet financé" },
        { value: "Multi-postes", label: "isolation + chauffage + ventilation" },
        { value: "0 €", label: "d'avance" },
      ],
    },
    process: [
      { n: "01", title: "Audit énergétique réglementaire", desc: "Réalisation d'un audit énergétique complet par un bureau d'études certifié. Base obligatoire pour le dépôt de la fiche BAT-EN-109." },
      { n: "02", title: "Plan de travaux global", desc: "Définition du programme de travaux avec objectif de réduction de 40% minimum de la consommation d'énergie primaire." },
      { n: "03", title: "Coordination des corps de métier", desc: "LEDX coordonne isolation, remplacement de chauffage, VMC et régulation. Un seul chef de projet pour tout le chantier." },
      { n: "04", title: "Dossier CEE et prime globale", desc: "Un seul dossier CEE pour l'ensemble des travaux. Prime versée après réception du chantier et contrôle des économies réalisées." },
    ],
    eligibility: [
      "Bâtiment tertiaire existant depuis plus de 2 ans",
      "Objectif de réduction d'énergie primaire ≥ 40%",
      "Audit énergétique réglementaire obligatoire en amont",
      "Travaux de rénovation sur au moins 2 postes (enveloppe + équipements)",
      "Surface plancher ≥ 1 000 m²",
    ],
    sectors: ["🏢 Bureaux", "🏥 Santé", "🏫 Enseignement", "🏨 Hôtellerie", "🏭 Industrie tertiaire"],
    faq: [
      { q: "Quelle est la différence avec une rénovation classique ?", a: "La rénovation globale impose un objectif chiffré de -40% d'énergie primaire, validé par un audit. En échange, la prime CEE est beaucoup plus importante et couvre plusieurs postes." },
      { q: "L'audit énergétique est-il payant ?", a: "L'audit est financé dans le cadre du dossier CEE global. LEDX coordonne sa réalisation via un bureau d'études partenaire sans coût supplémentaire pour vous." },
      { q: "Combien de temps durent les travaux de rénovation globale ?", a: "Selon la superficie, de 2 à 8 mois. LEDX planifie les interventions pour maintenir l'activité du bâtiment en cours de chantier." },
    ],
    cta: "Être contacté pour la rénovation globale",
    ctaStyle: "bg-orange-600 hover:bg-orange-700",
  },
];

export function getSolution(slug: string): SolutionData | undefined {
  return solutions.find((s) => s.slug === slug);
}
