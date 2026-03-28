import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesSorted } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles CEE & Efficacité Énergétique — LEDX ÉNERGIE",
  description: "Guides, conseils et actualités sur les Certificats d'Économies d'Énergie (CEE), la rénovation énergétique et le financement des travaux à 0 €.",
};

const categoryColors: Record<string, string> = {
  CEE: "bg-[#1a9e75]/20 text-[#2dc48d]",
  PAC: "bg-blue-500/20 text-blue-400",
  Rénovation: "bg-orange-500/20 text-orange-400",
  Éclairage: "bg-yellow-500/20 text-yellow-400",
  Froid: "bg-cyan-500/20 text-cyan-400",
  Agriculture: "bg-green-500/20 text-green-400",
  Financement: "bg-purple-500/20 text-purple-400",
  Isolation: "bg-red-500/20 text-red-400",
};

export default function ArticlesPage() {
  const articles = getArticlesSorted();
  const [featured, ...rest] = articles;

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#1a9e75] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Ressources & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Articles & Actualités</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Tout savoir sur les CEE, la rénovation énergétique et le financement de vos travaux à 0 €.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article en vedette */}
        <Link href={`/articles/${featured.slug}`} className="block mb-16 group">
          <div className="bg-[#0d1e3a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#2dc48d]/40 transition-colors">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.categorie] || "bg-white/10 text-white/70"}`}>
                  {featured.categorie}
                </span>
                <span className="text-white/40 text-sm">{featured.tempsLecture} min de lecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#2dc48d] transition-colors">
                {featured.titre}
              </h2>
              <p className="text-white/60 text-lg mb-6 max-w-3xl">{featured.description}</p>
              <span className="text-[#2dc48d] font-semibold">Lire l'article →</span>
            </div>
          </div>
        </Link>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group">
              <div className="h-full bg-[#0d1e3a] rounded-xl border border-white/10 hover:border-[#2dc48d]/40 transition-colors p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.categorie] || "bg-white/10 text-white/70"}`}>
                    {article.categorie}
                  </span>
                  <span className="text-white/40 text-xs">{article.tempsLecture} min</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#2dc48d] transition-colors flex-1">
                  {article.titre}
                </h3>
                <p className="text-white/50 text-sm line-clamp-3 mb-4">{article.description}</p>
                <span className="text-[#2dc48d] text-sm font-semibold">Lire →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
