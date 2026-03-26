import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — LEDX Énergie",
  description: "Mentions légales, politique de confidentialité et conditions d'utilisation du site ledxenergie.com.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Mentions légales</h1>
          <p className="text-white/70">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-slate max-w-none">
          {/* ── 1. Éditeur ── */}
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">1. Éditeur du site</h2>
          <div className="bg-[#f8f9fa] rounded-xl p-5 mb-8 text-sm text-[#2c2c2a]/70 space-y-1">
            <p><strong className="text-[#0d1e3a]">Raison sociale :</strong> LEDX Énergie SAS</p>
            <p><strong className="text-[#0d1e3a]">Siège social :</strong> 25 rue de Ponthieu, 75008 Paris, France</p>
            <p><strong className="text-[#0d1e3a]">Email :</strong> contact@ledxenergie.com</p>
            <p><strong className="text-[#0d1e3a]">Téléphone :</strong> +33 1 59 39 25 71</p>
            <p><strong className="text-[#0d1e3a]">Certification OPQIBI :</strong> n°23 04 5139</p>
          </div>

          {/* ── 2. Hébergement ── */}
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">2. Hébergement</h2>
          <div className="bg-[#f8f9fa] rounded-xl p-5 mb-8 text-sm text-[#2c2c2a]/70 space-y-1">
            <p><strong className="text-[#0d1e3a]">Frontend :</strong> Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
            <p><strong className="text-[#0d1e3a]">Base de données :</strong> Railway (Railway Corp) — San Francisco, USA</p>
          </div>

          {/* ── 3. Propriété intellectuelle ── */}
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">3. Propriété intellectuelle</h2>
          <p className="text-[#2c2c2a]/70 mb-8 text-sm leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, images, graphiques, logo, icônes, sons, logiciels)
            est la propriété exclusive de LEDX Énergie SAS ou de ses partenaires.
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
            éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
            écrite préalable de LEDX Énergie SAS.
          </p>

          {/* ── 4. Données personnelles ── */}
          <h2 id="confidentialite" className="text-xl font-bold text-[#0d1e3a] mb-4">
            4. Politique de confidentialité
          </h2>
          <div className="space-y-4 mb-8 text-sm text-[#2c2c2a]/70 leading-relaxed">
            <h3 className="font-bold text-[#0d1e3a]">4.1 Responsable du traitement</h3>
            <p>
              LEDX Énergie SAS, 25 rue de Ponthieu, 75008 Paris.
              Contact DPO : <a href="mailto:rgpd@ledxenergie.com" className="text-[#1a9e75]">rgpd@ledxenergie.com</a>
            </p>

            <h3 className="font-bold text-[#0d1e3a]">4.2 Données collectées</h3>
            <p>
              Nous collectons les données suivantes via nos formulaires :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Informations d&apos;identification : nom, prénom, société, fonction</li>
              <li>Coordonnées : email, téléphone, adresse du site</li>
              <li>Données techniques : secteur d&apos;activité, surface, zone climatique, équipements</li>
              <li>Données de navigation : adresse IP, user agent (journaux de sécurité)</li>
            </ul>

            <h3 className="font-bold text-[#0d1e3a]">4.3 Finalités et bases légales</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Analyse d&apos;éligibilité CEE — base légale : consentement (Art. 6(1)(a) RGPD)</li>
              <li>Prise de contact commerciale — base légale : intérêt légitime (Art. 6(1)(f) RGPD)</li>
              <li>Gestion des dossiers clients — base légale : exécution du contrat (Art. 6(1)(b) RGPD)</li>
              <li>Sécurité et journaux d&apos;accès — base légale : obligation légale / intérêt légitime</li>
            </ul>

            <h3 className="font-bold text-[#0d1e3a]">4.4 Durée de conservation</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Leads non convertis : 3 ans à compter de la collecte</li>
              <li>Dossiers clients : durée de la relation commerciale + 5 ans (obligation légale)</li>
              <li>Journaux de sécurité : 1 an maximum</li>
              <li>Cookies : voir section 5</li>
            </ul>

            <h3 className="font-bold text-[#0d1e3a]">4.5 Vos droits</h3>
            <p>
              Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés,
              vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Droit d&apos;accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d&apos;opposition au traitement</li>
              <li>Droit à la limitation du traitement</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:rgpd@ledxenergie.com" className="text-[#1a9e75]">rgpd@ledxenergie.com</a>
            </p>
            <p>
              En cas de litige, vous pouvez saisir la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1a9e75]">
                www.cnil.fr
              </a>
            </p>

            <h3 className="font-bold text-[#0d1e3a]">4.6 Destinataires des données</h3>
            <p>Vos données peuvent être communiquées aux sous-traitants suivants :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Brevo (Sendinblue) — envoi d&apos;emails transactionnels — Union Européenne</li>
              <li>Monday.com — gestion de projet et suivi de dossier — Israël (décision d&apos;adéquation)</li>
              <li>Yousign — signatures électroniques — France</li>
              <li>Vercel — hébergement web — USA (clauses contractuelles types)</li>
              <li>Railway — base de données — USA (clauses contractuelles types)</li>
            </ul>
          </div>

          {/* ── 5. Cookies ── */}
          <h2 id="cookies" className="text-xl font-bold text-[#0d1e3a] mb-4">5. Politique de cookies</h2>
          <div className="space-y-3 mb-8 text-sm text-[#2c2c2a]/70">
            <p>
              Notre site utilise des cookies strictement nécessaires au fonctionnement
              (session d&apos;authentification, sécurité CSRF). Aucun cookie publicitaire ou de traçage
              tiers n&apos;est déposé sans votre consentement explicite.
            </p>
            <div className="bg-[#f8f9fa] rounded-xl p-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[#0d1e3a] font-semibold">
                    <th className="text-left py-1.5 pr-4">Cookie</th>
                    <th className="text-left py-1.5 pr-4">Finalité</th>
                    <th className="text-left py-1.5">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-1.5 pr-4 font-mono">__Host-next-auth.session-token</td>
                    <td className="py-1.5 pr-4">Session d&apos;authentification</td>
                    <td className="py-1.5">8 heures</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4 font-mono">next-auth.csrf-token</td>
                    <td className="py-1.5 pr-4">Protection CSRF</td>
                    <td className="py-1.5">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 6. Limitation de responsabilité ── */}
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">6. Limitation de responsabilité</h2>
          <p className="text-sm text-[#2c2c2a]/70 mb-8 leading-relaxed">
            Les informations présentes sur ce site sont fournies à titre informatif.
            Les résultats du simulateur CEE sont indicatifs et ne constituent pas un engagement contractuel.
            LEDX Énergie ne saurait être tenu responsable des erreurs ou omissions dans les contenus
            présentés. L&apos;éligibilité définitive est déterminée lors de la visite technique par nos experts.
          </p>

          {/* ── 7. Droit applicable ── */}
          <h2 className="text-xl font-bold text-[#0d1e3a] mb-4">7. Droit applicable</h2>
          <p className="text-sm text-[#2c2c2a]/70 mb-8">
            Les présentes mentions légales sont soumises au droit français.
            Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive
            des tribunaux français.
          </p>
        </div>
      </div>
    </div>
  );
}
