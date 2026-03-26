import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — LEDX Énergie",
  description: "Mentions légales et politique de confidentialité du site ledxenergie.com.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Mentions légales</h1>
          <p className="text-white/70">Dernière mise à jour : mars 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-10 text-sm text-[#2c2c2a]/70 leading-relaxed">

          {/* 1. Éditeur */}
          <section>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">1. Éditeur du site</h2>
            <div className="bg-[#f8f9fa] rounded-xl p-5 space-y-1">
              <p><strong className="text-[#0d1e3a]">Raison sociale :</strong> LEDX Énergie SAS</p>
              <p><strong className="text-[#0d1e3a]">Siège social :</strong> 25 rue de Ponthieu, 75008 Paris, France</p>
              <p><strong className="text-[#0d1e3a]">Email :</strong> contact@ledxenergie.com</p>
              <p><strong className="text-[#0d1e3a]">Téléphone :</strong> +33 1 59 39 25 71</p>
            </div>
          </section>

          {/* 2. Hébergement */}
          <section>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">2. Hébergement</h2>
            <p>
              Ce site est hébergé par des prestataires professionnels situés en Europe et aux États-Unis,
              offrant des garanties de sécurité et de disponibilité conformes aux standards du secteur.
            </p>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphiques, logo, icônes, logiciels)
              est la propriété exclusive de LEDX Énergie SAS ou de ses partenaires.
              Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable
              de LEDX Énergie SAS est interdite.
            </p>
          </section>

          {/* 4. Données personnelles */}
          <section id="confidentialite">
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-6">4. Données personnelles</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-[#0d1e3a] mb-2">Responsable du traitement</h3>
                <p>
                  LEDX Énergie SAS — 25 rue de Ponthieu, 75008 Paris.
                  Pour toute demande relative à vos données :{" "}
                  <a href="mailto:contact@ledxenergie.com" className="text-[#1a9e75] hover:underline">
                    contact@ledxenergie.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#0d1e3a] mb-2">Données collectées</h3>
                <p>
                  Dans le cadre de nos formulaires (simulateur d&apos;éligibilité, prise de contact),
                  nous collectons des informations professionnelles : nom, prénom, société, email,
                  téléphone, et données relatives au projet (secteur, surface, équipements).
                  Ces données sont utilisées exclusivement pour analyser votre éligibilité CEE
                  et vous recontacter.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#0d1e3a] mb-2">Conservation</h3>
                <p>
                  Vos données sont conservées le temps nécessaire à la gestion de votre dossier,
                  et au maximum conformément aux obligations légales applicables.
                  Elles ne sont jamais revendues à des tiers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#0d1e3a] mb-2">Vos droits</h3>
                <p>
                  Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit
                  d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition concernant vos données.
                  Pour exercer ces droits, écrivez-nous à{" "}
                  <a href="mailto:contact@ledxenergie.com" className="text-[#1a9e75] hover:underline">
                    contact@ledxenergie.com
                  </a>.
                  En cas de difficulté, vous pouvez saisir la{" "}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1a9e75] hover:underline">
                    CNIL
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Cookies */}
          <section id="cookies">
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement
              (maintien de session pour l&apos;espace client, sécurité). Aucun cookie publicitaire
              ou de traçage tiers n&apos;est déposé.
            </p>
          </section>

          {/* 6. Limitation de responsabilité */}
          <section>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">6. Limitation de responsabilité</h2>
            <p>
              Les informations présentes sur ce site sont fournies à titre indicatif.
              Les résultats du simulateur CEE ne constituent pas un engagement contractuel.
              L&apos;éligibilité définitive est déterminée lors de l&apos;étude technique par nos équipes.
            </p>
          </section>

          {/* 7. Droit applicable */}
          <section>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français.
              Tout litige sera soumis à la compétence exclusive des tribunaux français.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
