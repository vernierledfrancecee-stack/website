import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle, getArticlesSorted } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticlesSorted().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.titre} — LEDX ÉNERGIE`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const allArticles = getArticlesSorted();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const dateFormatted = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = article.contenu.split("\n\n");

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#0d1e3a] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/articles" className="text-[#2dc48d] text-sm hover:underline mb-6 inline-block">
            ← Tous les articles
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#1a9e75]/20 text-[#2dc48d] text-xs font-semibold px-3 py-1 rounded-full">
              {article.categorie}
            </span>
            <span className="text-white/40 text-sm">{article.tempsLecture} min de lecture</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/40 text-sm">{dateFormatted}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {article.titre}
          </h1>
          <p className="text-white/60 text-lg">{article.description}</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold text-[#0d1e3a] mt-10 mb-4">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="text-lg font-bold text-[#0d1e3a] mt-8 mb-3">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-[#2c2c2a]/70 my-4">
                  {items.map((item, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-[#0d1e3a]'>$1</strong>") }} />
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-[#2c2c2a]/70 leading-relaxed my-4"
                dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[#0d1e3a]'>$1</strong>") }}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0d1e3a] rounded-2xl border border-[#2dc48d]/30 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Vous souhaitez bénéficier des CEE ?</h3>
          <p className="text-white/60 mb-6">LEDX ÉNERGIE prend en charge votre dossier de A à Z. Aucune avance de fonds requise.</p>
          <Link href="/simulateur" className="inline-flex items-center gap-2 bg-[#2dc48d] hover:bg-[#1a9e75] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Tester mon éligibilité →
          </Link>
        </div>

        {/* Articles connexes */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-6">Articles connexes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group bg-[#0d1e3a] rounded-xl border border-white/10 hover:border-[#2dc48d]/40 transition-colors p-5">
                  <span className="text-xs text-[#2dc48d] font-semibold">{a.categorie}</span>
                  <h4 className="text-white font-semibold text-sm mt-2 group-hover:text-[#2dc48d] transition-colors">{a.titre}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
