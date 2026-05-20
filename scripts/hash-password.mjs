#!/usr/bin/env node
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\n✓ Hash bcrypt généré (cost=12):");
console.log(hash);
console.log("\n→ Colle cette valeur comme ADMIN_PASSWORD sur Vercel.");
