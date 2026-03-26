import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/client/LoginForm";

export const metadata: Metadata = {
  title: "Espace Client — Connexion",
  description: "Accédez à votre espace client LEDX Énergie pour suivre vos dossiers CEE.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#f8f9fa] flex items-center">
      <div className="w-full max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#1a9e75] flex items-center justify-center font-bold text-white text-sm">
              L
            </div>
            <span className="text-[#0d1e3a] font-bold text-lg">LEDX Énergie</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0d1e3a] mb-2">Espace Client</h1>
          <p className="text-[#2c2c2a]/60 text-sm">
            Connectez-vous pour suivre vos dossiers CEE.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-[#2c2c2a]/50 mt-6">
          Pas encore de compte ?{" "}
          <a href="mailto:contact@ledxenergie.com" className="text-[#1a9e75] hover:underline">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
}
