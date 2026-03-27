export const metadata = { title: "Contacts" };

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Contacts</h1>
        <p className="text-gray-400 text-sm mt-1">
          Messages reçus via le formulaire de contact
        </p>
      </div>

      <div className="bg-[#0d1e3a] border border-gray-800 rounded-xl p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-[#1a3a6b] flex items-center justify-center">
            <svg className="w-7 h-7 text-[#f0a500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-300 font-medium">Section contacts</p>
          <p className="text-gray-500 text-sm max-w-sm">
            Les messages de contact sont actuellement envoyés par email via Brevo.
            Intégrez un modèle de stockage en base de données pour afficher les contacts ici.
          </p>
        </div>
      </div>
    </div>
  );
}
