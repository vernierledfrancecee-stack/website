/**
 * Génère un hash bcrypt pour ADMIN_PASSWORD.
 *
 * Usage:
 *   node scripts/hash-password.mjs <mon-mot-de-passe>
 *
 * Copie ensuite le résultat comme valeur de ADMIN_PASSWORD dans Vercel.
 */
import { hashSync } from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <mot-de-passe>");
  process.exit(1);
}
if (password.length > 128) {
  console.error("Mot de passe trop long (max 128 caractères).");
  process.exit(1);
}

const hash = hashSync(password, 12); // cost 12 ≈ 250ms — bon équilibre sécurité/perf

console.log("\n✓ Hash bcrypt généré (cost=12):");
console.log(hash);
console.log("\n→ Colle cette valeur comme ADMIN_PASSWORD sur Vercel.");
console.log("  Le login détectera automatiquement le format bcrypt ($2b$...).\n");
