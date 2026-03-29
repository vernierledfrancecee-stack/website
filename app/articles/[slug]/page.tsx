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
    title: `${article.titre} — LEDX \u00c9NERGIE`,
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
    <div className="pt-16 lg:pt-20 bg-white">

      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <div className="relative bg-[#0d1e3a] overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1a9e75]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tous les articles
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#1a9e75] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {article.categorie}
            </span>
            <span className="text-white/30 text-xs">\u00b7</span>
            <span className="text-white/50 text-sm">{dateFormatted}</span>
            <span className="text-white/30 text-xs">\u00b7</span>
            <span className="text-white/50 text-sm flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.tempsLecture} min de lecture
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {article.titre}
          </h1>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl border-l-2 border-[#1a9e75] pl-4">
            {article.description}
          </p>
        </div>
      </div>

      {/* \u2500\u2500 Thin accent bar \u2500\u2500 */}
      <div className="h-1 bg-gradient-to-r from-[#1a9e75] via-[#2dc48d] to-transparent" />

      {/* \u2500\u2500 Content \u2500\u2500 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">

          {/* Main content */}
          <article className="min-w-0">
            <div className="space-y-0">
              {paragraphs.map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl sm:text-3xl font-bold text-[#0d1e3a] mt-12 mb-5 pb-3 border-b border-gray-100"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-xl font-bold text-[#0d1e3a] mt-8 mb-4 flex items-center gap-2"
                    >
                      <span className="w-1 h-5 bg-[#1a9e75] rounded-full inline-block flex-shrink-0" />
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="my-5 space-y-3">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[#2c2c2a]/75 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1a9e75] flex-shrink-0" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace("- ", "")
                                .replace(/\*\*(.*?)\*\*/g, "<strong class='text-[#0d1e3a] font-semibold'>$1</strong>"),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-[#2c2c2a]/75 leading-relaxed my-5 text-[1.05rem]"
                    dangerouslySetInnerHTML={{
                      __html: block.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='text-[#0d1e3a] font-semibold'>$1</strong>"
                      ),
                    }}
                  />
                );
              })}
            </div>

            {/* CTA inline */}
            <div className="mt-16 rounded-2xl overflow-hidden">
              <div className="bg-[#0d1e3a] p-8 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#1a9e75]/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 bg-[#1a9e75]/20 border border-[#1a9e75]/30 text-[#2dc48d] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2dc48d]" />
                    Gratuit \u00b7 Sans engagement
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Calculez votre prime CEE en 2 minutes
                  </h3>
                  <p className="text-white/55 mb-6 max-w-md">
                    LEDX \u00c9NERGIE monte votre dossier de A \u00e0 Z. Aucune avance de fonds, r\u00e9ponse sous 24h.
                  </p>
                  <Link
                    href="/simulateur"
                    className="inline-flex items-center gap-2 bg-[#1a9e75] hover:bg-[#147a5b] text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#1a9e75]/20"
                  >
                    Tester mon \u00e9ligibilit\u00e9
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Article info card */}
              <div className="bg-[#f8f9fa] rounded-2xl p-5 border border-gray-100">
                <p className="text-xs font-semibold text-[#2c2c2a]/40 uppercase tracking-wider mb-4">\u00c0 propos</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2a]/40">Publi\u00e9 le</p>
                      <p className="text-sm font-medium text-[#0d1e3a]">{dateFormatted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2a]/40">Lecture</p>
                      <p className="text-sm font-medium text-[#0d1e3a]">{article.tempsLecture} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1a9e75]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#1a9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2a]/40">Cat\u00e9gorie</p>
                      <p className="text-sm font-medium text-[#0d1e3a]">{article.categorie}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini CTA */}
              <div className="bg-[#0d1e3a] rounded-2xl p-5 text-center">
                <div className="w-10 h-10 bg-[#1a9e75]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#2dc48d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm mb-1">Simulateur CEE</p>
                <p className="text-white/50 text-xs mb-4">Calculez votre prime en 2 min</p>
                <Link
                  href="/simulateur"
                  className="block w-full bg-[#1a9e75] hover:bg-[#147a5b] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                >
                  Tester gratuitement \u2192
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-[#0d1e3a] mb-6">Articles connexes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group bg-white border border-gray-100 hover:border-[#1a9e75]/40 rounded-2xl p-5 hover:shadow-md transition-all"
                >
                  <span className="inline-block bg-[#1a9e75]/10 text-[#1a9e75] text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    {a.categorie}
                  </span>
                  <h4 className="text-[#0d1e3a] font-semibold text-sm leading-snug group-hover:text-[#1a9e75] transition-colors">
                    {a.titre}
                  </h4>
                  <p className="text-[#2c2c2a]/50 text-xs mt-2 line-clamp-2">{a.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-[#1a9e75] text-xs font-medium">
                    Lire l&apos;article
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
