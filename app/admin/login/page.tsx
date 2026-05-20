"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Step = "password" | "totp";

export default function AdminLoginPage() {
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const totpRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (step === "totp") totpRef.current?.focus();
  }, [step]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body: Record<string, string> = { password };
    if (step === "totp") body.totpCode = totpCode.replace(/\s/g, "");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && data.requireTotp) {
      setStep("totp");
      setLoading(false);
      return;
    }

    setError(data.message ?? "Erreur de connexion");
    if (step === "totp") setTotpCode("");
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Code TOTP
                </label>
                <button
                  type="button"
                  onClick={() => { setStep("password"); setError(""); setTotpCode(""); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition"
                >
                  ← Retour
                </button>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                <svg className="w-4 h-4 text-[#1a9e75] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Mot de passe vérifié. Entre le code à 6 chiffres de ton application TOTP.
              </div>
              <input
                ref={totpRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={7}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/[^0-9 ]/g, ""))}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-gray-700 focus:outline-none focus:border-[#1a5cb0] focus:ring-1 focus:ring-[#1a5cb0] transition"
                placeholder="000000"
                autoComplete="one-time-code"
                required
              />
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
            {loading
              ? step === "totp" ? "Vérification…" : "Connexion…"
              : step === "totp" ? "Vérifier le code →" : "Accéder →"}
          </button>
        </form>
      </div>
    </div>
  );
}
