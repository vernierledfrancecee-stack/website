import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos — LEDX Énergie, développeur d'opérations CEE",
  description:
    "Fondée en 2018, LEDX Énergie est un développeur d'opérations CEE présent partout en France. 9 000+ réalisations. 25 rue de Ponthieu, Paris 8e.",
};

const processSteps = [
  { step: "Prospection", desc: "Identification des sites et bâtiments éligibles" },
  { step: "Éligibilité", desc: "Vérification réglementaire selon les fiches CEE" },
  { step: "Dimensionnement", desc: "Étude technique et sizing des équipements" },
  { step: "Devis 0 €", desc: "Proposition sans avance de fonds pour le client" },
  { step: "Dossier admin/technique", desc: "Constitution complète du dossier CEE" },
  { step: "Contrôle conformité", desc: "Vérification du cahier des charges ADEME" },
  { step: "Partenaire", desc: "Sélection et coordination de l'installateur RGE" },
  { step: "Installation", desc: "Supervision des travaux et réception" },
  { step: "Photos & COFRAC", desc: "Documentation finale et contrôle accrédité" },
];

export default function AProposPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Depuis 2018
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">À Propos de LEDX Énergie</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Nous sommes développeur d&apos;opérations CEE — nous n&apos;installons pas,
            nous orchestrons tout le processus de A à Z.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Notre métier */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0d1e3a] mb-6">Notre métier</h2>
          <div className="prose prose-slate max-w-none text-[#2c2c2a]/70">
            <p className="text-lg leading-relaxed mb-4">
              LEDX Énergie est un <strong className="text-[#0d1e3a]">développeur d&apos;opérations CEE</strong> (Certificats
              d&apos;Économies d&apos;Énergie) B2B. Fondée en 2018 et présente partout en France,
              notre société intervient auprès des entreprises, collectivités, bailleurs et exploitants
              agricoles pour leur permettre de financer leurs projets d&apos;efficacité énergétique
              sans avance de fonds.
            </p>
            <p className="leading-relaxed mb-4">
              Contrairement à un installateur, LEDX Énergie ne réalise pas les travaux elle-même.
              Notre valeur ajoutée est l&apos;<strong className="text-[#0d1e3a]">orchestration complète</strong> du processus CEE :
              de l&apos;identification des gisements d&apos;économies jusqu&apos;à l&apos;obtention des certificats,
              en passant par la constitution du dossier réglementaire et la coordination des partenaires certifiés RGE.
            </p>
            <p className="leading-relaxed">
              Avec <strong className="text-[#0d1e3a]">9 000+ réalisations depuis 2023</strong>, LEDX Énergie est
              l&apos;un des leaders français du marché CEE en milieu tertiaire, industriel et agricole.
            </p>
          </div>
        </section>

        {/* Chiffres clés */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2018", label: "Année de création" },
              { value: "9 000+", label: "Réalisations depuis 2023" },
              { value: "6", label: "Fiches CEE maîtrisées" },
              { value: "0 €", label: "Avance de fonds demandée" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#f8f9fa] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-[#0d1e3a] mb-1">{stat.value}</div>
                <div className="text-xs text-[#2c2c2a]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Notre processus */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0d1e3a] mb-6">Le processus LEDX</h2>
          <p className="text-[#2c2c2a]/60 mb-8">
            De la prospection initiale à l&apos;obtention des certificats CEE, voici les 9 étapes
            que LEDX Énergie orchestre pour vous.
          </p>
          <div className="space-y-3">
            {processSteps.map((item, idx) => (
              <div key={item.step} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-[#0d1e3a] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-[#0d1e3a]">{item.step}</div>
                  <div className="text-sm text-[#2c2c2a]/60">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-[#0d1e3a] mb-6">Nous contacter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="tel:+33159392571"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-[#1a9e75]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#2c2c2a]/50 mb-0.5">Téléphone</div>
                <div className="font-semibold text-[#0d1e3a] text-sm">01 59 39 25 71</div>
              </div>
            </a>
            <a
              href="mailto:contact@ledxenergie.com"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-[#1a9e75]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#2c2c2a]/50 mb-0.5">Email</div>
                <div className="font-semibold text-[#0d1e3a] text-sm">contact@ledxenergie.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#2c2c2a]/50 mb-0.5">Adresse</div>
                <div className="font-semibold text-[#0d1e3a] text-sm">25 rue de Ponthieu<br />75008 Paris</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Nous envoyer un message
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
