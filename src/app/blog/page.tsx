import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/blog-store";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CtaBand } from "@/components/lanterne/blocks";
import { Eclaire } from "@/components/lanterne/ui";
import { CONTACT, SITE_NAME, SITE_URL, pageSocialMetadata } from "@/lib/site";

export const revalidate = 3600;

const title = "Blog : conseils web pour artisans et TPE";
const description =
  "Conseils, guides et ressources pour aider les artisans et TPE françaises à comprendre le web, le SEO et la création de site internet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  ...pageSocialMetadata({ path: "/blog", title, description }),
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `Blog ${SITE_NAME}`,
  description:
    "Conseils et ressources pour artisans et TPE françaises sur la création de site web et le SEO.",
  url: `${SITE_URL}/blog`,
  author: {
    "@type": "Person",
    name: CONTACT.responsable,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
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

      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[1120px]">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-[15px] text-gris">
            <ol className="m-0 flex list-none items-center gap-2 p-0">
              <li>
                <Link href="/" className="text-gris underline">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Blog</li>
            </ol>
          </nav>

          <h1 className="m-0 text-[36px] font-extrabold leading-[1.06] tracking-titre sm:text-[52px]">
            Le <Eclaire>blog</Eclaire>.
          </h1>
          <p className="mt-4 max-w-[680px] text-[18px] text-gris sm:mt-5 sm:text-[20px]">
            Conseils concrets pour aider les artisans et TPE à mieux
            comprendre le web, le référencement naturel et la création de
            site internet.
          </p>

          {articles.length === 0 ? (
            <p className="mt-12 text-gris">Les premiers articles arrivent bientôt.</p>
          ) : (
            <>
              {categories.length > 1 && (
                <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className="rounded border border-beige bg-blanc px-3 py-1 text-[15px] text-gris"
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}

              {featured && (
                <div className="mt-8 sm:mt-10">
                  <ArticleCard article={featured} featured />
                </div>
              )}

              {rest.length > 0 && (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand avant="creme" />
    </>
  );
}
