import Link from "next/link";
import Image from "next/image";

const profils = [
  {
    label: "Patrimoine tertiaire & collectivités",
    desc: "Bureaux, établissements de santé, hôtellerie, enseignement, logistique grand compte",
    href: "/solutions/pac-tertiaire",
    badge: "Tertiaire",
    photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=75",
    alt: "Bâtiment tertiaire",
  },
  {
    label: "Industrie & Grande Distribution",
    desc: "Groupes industriels, chaînes GMS, agroalimentaire, plateformes logistiques",
    href: "/solutions/froid-commercial",
    badge: "Industrie & GMS",
    photo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=75",
    alt: "Site industriel",
  },
  {
    label: "Coopératives & groupes agricoles",
    desc: "Coopératives, groupes d'exploitation, serres de production, structures multi-sites",
    href: "/solutions/agriculture",
    badge: "Agriculture",
    photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=75",
    alt: "Exploitation agricole",
  },
];

export default function ChoixParProfil() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <p className="text-[#1a9e75] text-sm font-semibold uppercase tracking-widest mb-3">Votre secteur</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1e3a]">
            LEDX opère sur quels types de projets ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {profils.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1a9e75]/40 hover:shadow-xl transition-all duration-300 active:scale-[0.98] min-h-[220px] sm:min-h-[260px] flex flex-col justify-end"
            >
              <Image
                src={p.photo}
                alt={p.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e3a]/92 via-[#0d1e3a]/45 to-transparent" />

              <div className="relative z-10 p-5 sm:p-6">
                <span className="inline-block text-xs font-semibold text-[#1a9e75] bg-[#1a9e75]/20 border border-[#1a9e75]/30 px-3 py-1 rounded-full mb-3">
                  {p.badge}
                </span>
                <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 leading-tight">
                  {p.label}
                </h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[#1a9e75] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Voir les solutions
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
