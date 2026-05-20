"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [step, setStep] = useState<"password" | "totp">("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = step === "password" ? { password } : { password, totp };

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({})) as Record<string, unknown>;

    if (res.ok && data.totp_required) {
      setStep("totp");
      setLoading(false);
      return;
    }

    if (res.ok && data.success) {
      router.push("/admin");
      router.refresh();
      return;
    }

    setError((data.message as string) ?? "Erreur de connexion");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#080e1f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#f0a500] mb-3">
            Opérateur CEE agréé
          </span>
          <h1 className="text-2xl font-bold text-white">LEDX Énergie</h1>
          <p className="text-sm text-gray-500 mt-1">Accès tableau de bord</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1e3a] border border-gray-800 rounded-2xl p-6 space-y-4"
        >
          {step === "password" ? (
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                Mot de passe admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#1a5cb0] focus:ring-1 focus:ring-[#1a5cb0] transition"
                placeholder="••••••••••"
                required
                autoFocus
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                Code d&apos;authentification (6 chiffres)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={totp}
                onChange={(e) => setTotp(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#1a5cb0] focus:ring-1 focus:ring-[#1a5cb0] transition tracking-[0.3em] text-center text-lg font-mono"
                placeholder="000000"
                required
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1.5 text-center">
                Ouvrez votre application d&apos;authentification
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a5cb0] hover:bg-[#1a4a9a] active:bg-[#153d82] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Vérification…" : step === "password" ? "Continuer →" : "Accéder →"}
          </button>

          {step === "totp" && (
            <button
              type="button"
              onClick={() => { setStep("password"); setTotp(""); setError(""); }}
              className="w-full text-xs text-gray-500 hover:text-gray-400 transition py-1"
            >
              ← Retour
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
