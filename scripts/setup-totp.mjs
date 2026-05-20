#!/usr/bin/env node
import { authenticator } from "otplib";
import qrcode from "qrcode";

const secret = authenticator.generateSecret();
const otpauthUrl = authenticator.keyuri("admin", "LEDX Énergie", secret);

console.log(`\nADMIN_TOTP_SECRET=${secret}`);
console.log(`\nQR Code URL:`);
console.log(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`);

try {
  const terminal = await qrcode.toString(otpauthUrl, { type: "terminal", small: true });
  console.log("\nQR Code (terminal):");
  console.log(terminal);
} catch {
  // terminal rendering is optional
}

console.log("→ Scanne le QR code dans Google Authenticator, Authy, 1Password ou Bitwarden.");
console.log("→ Ajoute ADMIN_TOTP_SECRET sur Vercel, puis redéploie.");
