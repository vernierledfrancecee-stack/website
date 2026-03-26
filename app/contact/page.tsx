import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — LEDX Énergie",
  description:
    "Contactez LEDX Énergie pour vos projets CEE. 25 rue de Ponthieu, 75008 Paris. Tél : 01 59 39 25 71. Email : contact@ledxenergie.com.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Une question sur vos droits CEE ? Un projet à étudier ? Nos experts répondent sous 24 heures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-6">Envoyer un message</h2>
            <ContactForm />
          </div>

          {/* Coordonnées */}
          <div>
            <h2 className="text-xl font-bold text-[#0d1e3a] mb-6">Nos coordonnées</h2>
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Téléphone",
                  value: "01 59 39 25 71",
                  href: "tel:+33159392571",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: "contact@ledxenergie.com",
                  href: "mailto:contact@ledxenergie.com",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Adresse",
                  value: "25 rue de Ponthieu\n75008 Paris",
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center shrink-0 text-[#1a9e75]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#2c2c2a]/50 mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-[#0d1e3a] hover:text-[#1a9e75] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <address className="font-semibold text-[#0d1e3a] not-italic whitespace-pre-line">
                        {item.value}
                      </address>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f8f9fa] rounded-2xl p-6">
              <h3 className="font-bold text-[#0d1e3a] mb-2">Réponse garantie sous 24h</h3>
              <p className="text-sm text-[#2c2c2a]/60 mb-4">
                Nos experts CEE analysent votre demande et reviennent vers vous le jour ouvré suivant.
              </p>
              <div className="flex items-center gap-2 text-[#1a9e75] text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Aucun engagement · Analyse gratuite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
