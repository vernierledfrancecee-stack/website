import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions, getSolution, type SolutionSlug } from "@/lib/solutions-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.name} — LEDX Énergie`,
    description: s.hero.desc,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  return (
    <div className="pt-16 lg:pt-20">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className={`bg-gradient-to-br ${s.cardBg} py-14 sm:py-20`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/solutions" className="hover:text-white/70 transition-colors">Nos solutions</Link>
            <span>/</span>
            <span className="text-white/70">{s.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {s.fiches.map((f) => (
                  <span key={f} className="text-xs font-mono font-bold bg-white/10 text-white/80 border border-white/15 px-2.5 py-1 rounded">
                    {f}
                  </span>
                ))}
                {s.comingSoon && (
                  <span className="text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 px-2.5 py-1 rounded-full">
                    En développement
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
                {s.hero.title}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: s.accentColor }}>
                {s.hero.titleAccent}
              </h2>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
                {s.hero.desc}
              </p>

              <Link
                href="/simulateur"
                className={`inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-lg active:scale-95 ${s.ctaStyle}`}
              >
                {s.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-white/30 text-xs mt-2">Étude gratuite · Sans engagement</p>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-1 gap-3">
              {s.hero.stats.map((st) => (
                <div key={st.label} className="bg-white/6 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-5">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{st.value}</div>
                  <div className="text-white/45 text-sm">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <div className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a] mb-8 sm:mb-10">
            Comment ça se passe ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {s.process.map((step) => (
              <div key={step.n} className="bg-[#f8f9fa] rounded-2xl p-6">
                <div className="text-4xl font-black mb-3" style={{ color: s.accentColor + "30" }}>
                  {step.n}
                </div>
                <h3 className="font-bold text-[#0d1e3a] mb-2">{step.title}</h3>
                <p className="text-[#2c2c2a]/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ÉLIGIBILITÉ + SECTEURS ────────────────────────────── */}
      <div className="bg-[#f8f9fa] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Conditions */}
            <div>
              <h2 className="text-2xl font-bold text-[#0d1e3a] mb-6">Conditions d'éligibilité</h2>
              <ul className="space-y-3">
                {s.eligibility.map((cond) => (
                  <li key={cond} className="flex items-start gap-3 text-sm text-[#2c2c2a]/70">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white border border-gray-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: s.accentColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {cond}
                  </li>
                ))}
              </ul>
            </div>

            {/* Secteurs */}
            <div>
              <h2 className="text-2xl font-bold text-[#0d1e3a] mb-6">Secteurs concernés</h2>
              <div className="flex flex-wrap gap-2">
                {s.sectors.map((sec) => (
                  <span key={sec} className="bg-white border border-gray-200 text-[#2c2c2a]/70 text-sm font-medium px-4 py-2 rounded-full">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <div className="bg-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1e3a] mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {s.faq.map((item) => (
              <div key={item.q} className="border border-gray-100 rounded-2xl p-5 sm:p-6">
                <h3 className="font-bold text-[#0d1e3a] mb-2 text-sm sm:text-base">{item.q}</h3>
                <p className="text-[#2c2c2a]/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <div className="bg-[#0d1e3a] py-14 sm:py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-4xl mb-4 block">{s.emoji}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Prêt à lancer votre projet ?
          </h2>
          <p className="text-white/55 text-sm sm:text-base mb-7">
            Étude gratuite en 48h · Sans engagement · Dossier 100% géré par LEDX
          </p>
          <Link
            href="/simulateur"
            className={`inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95 ${s.ctaStyle}`}
          >
            {s.cta}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="mt-6">
            <Link href="/solutions" className="text-white/35 text-xs hover:text-white/60 transition-colors">
              ← Voir toutes les solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
