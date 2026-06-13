import type { Metadata } from "next";
import Link from "next/link";
import LedxLogo from "@/components/LedxLogo";
import LeadEvent from "@/components/LeadEvent";

export const metadata: Metadata = {
  title: "Demande enregistrée | LEDX Énergie",
  description: "Votre demande CEE a bien été reçue. Nos experts vous répondront sous 24 heures ouvrées.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    n: "1",
    title: "Réception confirmée",
    desc: "Votre demande est transmise à notre équipe d'experts CEE.",
  },
  {
    n: "2",
    title: "Analyse de votre potentiel",
    desc: "Nous calculons les économies réalisables sur vos installations.",
  },
  {
    n: "3",
    title: "Réponse sous 24h ouvrées",
    desc: "Un expert vous rappelle avec une proposition chiffrée et gratuite.",
  },
];

export default function MerciPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-[calc(100vh-1px)] flex flex-col lg:flex-row">
      <LeadEvent />
      {/* ── Côté gauche : confirmation ── */}
      <div className="flex-1 bg-gradient-to-br from-[#0d1e3a] via-[#112545] to-[#0c2448] flex items-center justify-center px-8 py-16 lg:px-16">
        <div className="w-full max-w-lg">
          <div className="mb-10">
            <LedxLogo variant="light" size="md" />
          </div>

          {/* Checkmark animé */}
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full border border-[#1a9e75]/25 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-[#1a9e75]/15 border border-[#1a9e75]/30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#1a9e75]/30 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-[#1a9e75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Merci,<br />votre demande est enregistrée&nbsp;!
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Nos experts CEE ont bien reçu votre message et vous répondent sous{" "}
            <strong className="text-white/90 font-semibold">24 heures ouvrées</strong> avec une analyse personnalisée.
          </p>

          {/* Étapes */}
          <div className="space-y-5 mb-12">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1a9e75]/20 border border-[#1a9e75]/35 flex items-center justify-center shrink-0 text-[#1a9e75] text-sm font-bold">
                  {n}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-snug">{title}</div>
                  <div className="text-white/45 text-xs mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#1a9e75] hover:bg-[#147a5b] active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-[#1a9e75]/20"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/simulateur"
              className="inline-flex items-center justify-center gap-1.5 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Estimer mes économies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Côté droit : illustration ── */}
      <div className="lg:w-[52%] bg-[#edf7f2] flex items-center justify-center p-8 lg:p-12 min-h-[45vh] lg:min-h-0">
        <CityIllustration />
      </div>
    </div>
  );
}

function CityIllustration() {
  return (
    <svg
      viewBox="0 0 460 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md"
      aria-hidden="true"
    >
      {/* Lueur de fond */}
      <circle cx="230" cy="198" r="152" fill="#1a9e75" fillOpacity="0.08" />
      <circle cx="230" cy="198" r="108" fill="#1a9e75" fillOpacity="0.06" />

      {/* Bâtiment arrière gauche */}
      <rect x="12" y="232" width="52" height="163" rx="3" fill="#0d1e3a" fillOpacity="0.5" />
      <rect x="22" y="248" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.5" />
      <rect x="22" y="271" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="22" y="294" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.6" />
      <rect x="22" y="317" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.3" />

      {/* Bâtiment gauche */}
      <rect x="68" y="158" width="88" height="237" rx="3" fill="#112545" />
      <rect x="80" y="173" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.75" />
      <rect x="108" y="173" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.3" />
      <rect x="80" y="198" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.4" />
      <rect x="108" y="198" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.85" />
      <rect x="80" y="223" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="108" y="223" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="80" y="248" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="108" y="248" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.7" />
      <rect x="80" y="273" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.55" />
      <rect x="108" y="273" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="80" y="298" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.8" />
      <rect x="108" y="298" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.35" />
      <rect x="80" y="323" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.3" />
      <rect x="108" y="323" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.65" />

      {/* Bâtiment central (le plus grand) */}
      <rect x="162" y="76" width="136" height="319" rx="4" fill="#0d1e3a" />
      {/* Entrée */}
      <rect x="214" y="352" width="42" height="43" rx="2" fill="#1a2f55" />
      {/* Fenêtres — 4 colonnes × 9 rangées */}
      {/* rangée 1 */}
      <rect x="174" y="90" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="202" y="90" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.55" />
      <rect x="230" y="90" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="258" y="90" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.7" />
      {/* rangée 2 */}
      <rect x="174" y="116" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.6" />
      <rect x="202" y="116" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.95" />
      <rect x="230" y="116" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.15" />
      <rect x="258" y="116" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.8" />
      {/* rangée 3 */}
      <rect x="174" y="142" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.85" />
      <rect x="202" y="142" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.15" />
      <rect x="230" y="142" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.75" />
      <rect x="258" y="142" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.5" />
      {/* rangée 4 */}
      <rect x="174" y="168" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="202" y="168" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="230" y="168" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.65" />
      <rect x="258" y="168" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      {/* rangée 5 */}
      <rect x="174" y="194" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.8" />
      <rect x="202" y="194" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.4" />
      <rect x="230" y="194" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="258" y="194" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.15" />
      {/* rangée 6 */}
      <rect x="174" y="220" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.15" />
      <rect x="202" y="220" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.7" />
      <rect x="230" y="220" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="258" y="220" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.55" />
      {/* rangée 7 */}
      <rect x="174" y="246" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.6" />
      <rect x="202" y="246" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="230" y="246" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="258" y="246" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.8" />
      {/* rangée 8 */}
      <rect x="174" y="272" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="202" y="272" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.35" />
      <rect x="230" y="272" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.75" />
      <rect x="258" y="272" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      {/* rangée 9 */}
      <rect x="174" y="298" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.15" />
      <rect x="202" y="298" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.55" />
      <rect x="230" y="298" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="258" y="298" width="20" height="13" rx="2" fill="#1a9e75" fillOpacity="0.4" />

      {/* Bâtiment droit */}
      <rect x="306" y="165" width="88" height="230" rx="3" fill="#112545" />
      <rect x="318" y="180" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.3" />
      <rect x="346" y="180" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.85" />
      <rect x="318" y="205" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.8" />
      <rect x="346" y="205" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.25" />
      <rect x="318" y="230" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.15" />
      <rect x="346" y="230" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="318" y="255" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.7" />
      <rect x="346" y="255" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.4" />
      <rect x="318" y="280" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.9" />
      <rect x="346" y="280" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="318" y="305" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.55" />
      <rect x="346" y="305" width="16" height="11" rx="1.5" fill="#1a9e75" fillOpacity="0.8" />

      {/* Bâtiment arrière droit */}
      <rect x="398" y="238" width="50" height="157" rx="3" fill="#0d1e3a" fillOpacity="0.5" />
      <rect x="408" y="253" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.6" />
      <rect x="408" y="276" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.2" />
      <rect x="408" y="299" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.7" />
      <rect x="408" y="322" width="14" height="10" rx="1" fill="#1a9e75" fillOpacity="0.35" />

      {/* Sol */}
      <rect x="0" y="393" width="460" height="7" rx="3.5" fill="#0d1e3a" fillOpacity="0.12" />

      {/* Badge succès (flottant haut droite) */}
      <filter id="shadow-badge">
        <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
      </filter>
      <circle cx="388" cy="82" r="36" fill="white" filter="url(#shadow-badge)" />
      <circle cx="388" cy="82" r="30" fill="#1a9e75" />
      <path
        d="M375 82 L385 92 L402 68"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Badge stat "24h" */}
      <rect x="328" y="152" width="76" height="38" rx="9" fill="white" filter="url(#shadow-badge)" />
      <text x="341" y="169" fontFamily="Arial Black, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#0d1e3a">24h</text>
      <text x="341" y="182" fontFamily="Arial, sans-serif" fontSize="9" fill="#1a9e75" fontWeight="600">de réponse</text>

      {/* Badge stat "9 000+" */}
      <rect x="50" y="308" width="88" height="38" rx="9" fill="white" filter="url(#shadow-badge)" />
      <text x="62" y="325" fontFamily="Arial Black, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#0d1e3a">9 000+</text>
      <text x="62" y="338" fontFamily="Arial, sans-serif" fontSize="9" fill="#1a9e75" fontWeight="600">projets réalisés</text>

      {/* Étoiles / étincelles décoratives */}
      <circle cx="42" cy="172" r="3.5" fill="#1a9e75" fillOpacity="0.45" />
      <circle cx="30" cy="155" r="2" fill="#1a9e75" fillOpacity="0.3" />
      <circle cx="54" cy="148" r="2.5" fill="#1a9e75" fillOpacity="0.35" />
      <circle cx="438" cy="185" r="3" fill="#1a9e75" fillOpacity="0.4" />
      <circle cx="450" cy="168" r="2" fill="#1a9e75" fillOpacity="0.3" />

      {/* Arc décoratif */}
      <path
        d="M162 200 Q162 60 230 52 Q298 60 298 200"
        stroke="#1a9e75"
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.18"
        strokeDasharray="5 4"
      />
    </svg>
  );
}
