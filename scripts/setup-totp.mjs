/**
 * Génère un secret TOTP pour l'admin et affiche le QR code à scanner.
 *
 * Usage:
 *   node scripts/setup-totp.mjs
 *
 * Ensuite :
 *   1. Ajoute ADMIN_TOTP_SECRET=<secret> dans Vercel
 *   2. Scanne le QR code dans Google Authenticator / Authy / 1Password
 */
import { authenticator } from "otplib";

const secret = authenticator.generateSecret(); // 20 bytes, base32
const otpauthUrl = authenticator.keyuri("admin", "LEDX Énergie", secret);

// Build a QR code link via a public renderer (no external call needed at runtime)
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(otpauthUrl)}`;

console.log("\n╔══════════════════════════════════════════════╗");
console.log("║       LEDX Admin — Configuration TOTP       ║");
console.log("╚══════════════════════════════════════════════╝\n");
console.log("1. Ajoute cette variable sur Vercel (Settings → Environment Variables):");
console.log(`\n   ADMIN_TOTP_SECRET=${secret}\n`);
console.log("2. Scanne ce QR code dans ton application TOTP");
console.log("   (Google Authenticator, Authy, 1Password, Bitwarden…):\n");
console.log(`   ${qrUrl}\n`);
console.log("3. Ou entre le secret manuellement dans l'app:");
console.log(`   Secret : ${secret}`);
console.log(`   Compte : LEDX Énergie — admin\n`);
console.log("→ Le login admin demandera ensuite un code à 6 chiffres");
console.log("  après la vérification du mot de passe.\n");
