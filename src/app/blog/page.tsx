import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/blog-store";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CTAButton } from "@/components/CTAButton";
import { SectionWrapper } from "@/components/SectionWrapper";
import { WaveDivider } from "@/components/WaveDivider";

export const revalidate = 3600;

const SITE_URL = "https://creation-sites-godino.fr";

export const metadata: Metadata = {
  title: "Blog — Conseils création de site web pour artisans & TPE",
  description:
    "Conseils, guides et ressources pour aider les artisans et TPE françaises à comprendre le web, le SEO et la création de site internet.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog GODINO — Conseils web pour artisans et TPE",
    description:
      "Conseils, guides et ressources pour aider les artisans et TPE françaises à comprendre le web, le SEO et la création de site internet.",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog GODINO — Conseils création de site web",
  description:
    "Conseils et ressources pour artisans et TPE françaises sur la création de site web et le SEO.",
  url: `${SITE_URL}/blog`,
  author: {
    "@type": "Person",
    name: "Pierre Godino",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "GODINO Pierre — Création de sites web",
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(74,124,111,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol
                className="flex items-center gap-2 text-sm text-textMuted"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                <li
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemProp="itemListElement"
                >
                  <Link
                    href="/"
                    className="hover:text-accent transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">Accueil</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li aria-hidden="true" className="text-mid">
                  /
                </li>
                <li
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemProp="itemListElement"
                  className="text-warmDark font-medium"
                >
                  <span itemProp="name">Blog</span>
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent2/10 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-6">
                Ressources & Conseils
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                Le Blog
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Conseils concrets pour aider les artisans et TPE à mieux
                comprendre le web, le référencement naturel et la création de
                site internet.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container">
          {articles.length === 0 ? (
            <SectionWrapper>
              <div className="text-center py-20">
                <p className="text-textMuted text-lg">
                  Les premiers articles arrivent bientôt.
                </p>
              </div>
            </SectionWrapper>
          ) : (
            <>
              {/* Categories filter */}
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-10 pt-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-mid text-textMuted text-sm font-medium rounded-full px-4 py-1.5 cursor-default"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Featured article */}
              {featured && (
                <div className="mb-10">
                  <ArticleCard article={featured} featured />
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <WaveDivider fillColor="#E8DDD0" />
      <section className="bg-mid py-16 md:py-20">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-4">
                Prêt à lancer votre site ?
              </h2>
              <p className="text-textMuted mb-8 leading-relaxed">
                Livré en 7 jours ouvrés, clés en main. Vous ne touchez à rien.
              </p>
              <CTAButton href="/contact" variant="primary" size="lg">
                Démarrer mon projet
              </CTAButton>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
