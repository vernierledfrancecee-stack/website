import { z } from "zod";

export const simulateurSchema = z.object({
  // Étape 1 — Coordonnées
  nom: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Nom invalide"),
  prenom: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Prénom invalide"),
  societe: z.string().min(2).max(100).optional().or(z.literal("")),
  fonction: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email().max(254).toLowerCase(),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal("")),
  siteAdresse: z.string().max(200).optional().or(z.literal("")),
  siret: z
    .string()
    .regex(/^\d{14}$/, "SIRET invalide (14 chiffres)")
    .optional()
    .or(z.literal("")),
  consentement: z.literal(true, {
    error: "Vous devez accepter les conditions",
  }),

  // Étape 2 — Secteur
  secteur: z.enum([
    "tertiaire-bureaux",
    "tertiaire-sante",
    "tertiaire-enseignement",
    "tertiaire-commerce",
    "tertiaire-hotellerie",
    "tertiaire-logistique",
    "residentiel",
    "agricole",
    "froid",
  ]),

  // Étape 3 — Bâtiment
  anneeConstruction: z
    .number()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  surface: z.number().positive().max(500000).optional(),
  zone: z.enum(["H1", "H2", "H3"]).optional(),
  nombreEtages: z.number().min(1).max(100).optional(),
  nombreLogements: z.number().positive().max(10000).optional(),
  chauffageCollectif: z.enum(["oui", "non"]).optional(),
  surfaceSerres: z.number().positive().max(100000).optional(),
  typeSerre: z
    .enum(["Multichapelle", "Tunnel", "Photovoltaïque", "Autre"])
    .optional(),
  productionPrincipale: z.string().max(200).optional().or(z.literal("")),
  hauteurCheneau: z.number().positive().max(30).optional(),

  // Étape 4 — Équipements
  eclairage: z.enum(["led", "mixte", "non-led", "inconnu"]).optional(),
  nombreLuminaires: z.number().positive().max(100000).optional(),
  typeLocal: z
    .enum(["open space", "entrepôt", "atelier", "parking", "autre"])
    .optional(),
  energie: z
    .enum(["gaz", "fioul", "elec", "reseau-chaleur", "autre"])
    .optional(),
  puissanceChaudiere: z.number().positive().max(10000).optional(),
  anneeChaudiere: z.number().min(1950).max(new Date().getFullYear()).optional(),
  typeEmetteurs: z
    .enum(["radiateurs", "plancher chauffant", "ventilo-convecteurs", "autre"])
    .optional(),
  ecsIncluse: z.enum(["oui", "non"]).optional(),
  plusieursChaudieres: z.enum(["oui", "non"]).optional(),
  froidPositifUnites: z.number().min(0).max(1000).optional(),
  froidPositifPuissance: z.number().min(0).max(10000).optional(),
  froidNegatifUnites: z.number().min(0).max(1000).optional(),
  froidNegatifPuissance: z.number().min(0).max(10000).optional(),
  marqueCompresseurs: z.string().max(100).optional().or(z.literal("")),
  emplacementUnites: z
    .enum(["toit", "arrière", "local tech", "autre"])
    .optional(),
  regulationExistante: z.enum(["oui", "non", "inconnu"]).optional(),
  dernierEntretien: z.number().min(2000).max(new Date().getFullYear()).optional(),
  alimentationElec: z.enum(["monophase", "triphase"]).optional(),
  puissanceSouscrite: z.number().positive().max(10000).optional(),
  remarques: z.string().max(2000).optional().or(z.literal("")),
});

export type SimulateurFormData = z.infer<typeof simulateurSchema>;

export const contactSchema = z.object({
  nom: z.string().min(2).max(50).regex(/^[a-zA-ZÀ-ÿ\s\-']+$/),
  prenom: z.string().min(2).max(50).regex(/^[a-zA-ZÀ-ÿ\s\-']+$/),
  email: z.string().email().max(254),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/)
    .optional()
    .or(z.literal("")),
  societe: z.string().max(100).optional().or(z.literal("")),
  secteur: z.string().max(100).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email().max(254).toLowerCase(),
  password: z.string().min(8).max(128),
  totpCode: z.string().length(6).optional().or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
