import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ButtonLink, Eclaire, SectionTitle } from '@/components/lanterne/ui'
import { CtaBand, PriceCard, RealisationCard } from '@/components/lanterne/blocks'
import { Wave } from '@/components/lanterne/Wave'
import { ArticleCard } from '@/components/blog/ArticleCard'
import {
  cityDescription,
  cityTitle,
  getCityPageBySlug,
  getPublishedCityPages,
} from '@/data/cities'
import { getRealisation } from '@/data/realisations'
import { testimonials } from '@/data/testimonials'
import { TARIF } from '@/data/tarif'
import { getArticleBySlug } from '@/lib/blog-store'
import { GOOGLE_REVIEWS, SITE_URL, pageSocialMetadata } from '@/lib/site'
import type { Article } from '@/types/blog'

export const revalidate = 3600

interface Props {
  params: { ville: string }
}

export function generateStaticParams() {
  return getPublishedCityPages().map((c) => ({ ville: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityPageBySlug(params.ville)
  if (!city || !city.published) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } }
  }
  const title = cityTitle(city)
  const description = cityDescription(city, TARIF.mensuel)
  const path = `/creation-site-internet/${city.slug}`
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    ...pageSocialMetadata({ path, title, description }),
  }
}

async function loadArticles(slugs: string[] = []): Promise<Article[]> {
  const found = await Promise.all(
    slugs.map((s) => getArticleBySlug(s).catch(() => null)),
  )
  return found.filter((a): a is Article => !!a && a.status === 'published')
}

export default async function CityPage({ params }: Props) {
  const city = getCityPageBySlug(params.ville)
  if (!city || !city.published) notFound()

  const realisation = city.realisation ? getRealisation(city.realisation) : undefined
  const avis = city.testimonial ? testimonials.find((t) => t.id === city.testimonial) : undefined
  const articles = await loadArticles(city.articles)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: cityTitle(city),
        item: `${SITE_URL}/creation-site-internet/${city.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-[1120px]">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-[15px] text-gris">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <Link href="/" className="text-gris underline">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{city.name}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-start gap-12">
            <div className="min-w-0 flex-[1_1_480px]">
              <h1 className="m-0 text-[36px] font-extrabold leading-[1.06] tracking-titre sm:text-[52px]">
                Création de site internet à <Eclaire>{city.name}</Eclaire>.
              </h1>
              <p className="mt-4 text-[18px] text-gris sm:mt-5 sm:text-[20px]">
                Je crée des sites pour les entreprises de {city.name}.
              </p>
              {city.intro ? (
                <p className="mt-4">{city.intro}</p>
              ) : (
                <p className="mt-4 rounded-md border-2 border-dashed border-orange bg-eclaire p-4 font-semibold">
                  TODO : texte d&apos;introduction pour {city.name}, à valider.
                </p>
              )}
              <ButtonLink href="/contact" bloc fleche className="mt-7">
                Demander mon site
              </ButtonLink>
            </div>
            <div className="flex w-full justify-center sm:w-auto sm:flex-[1_1_380px]">
              <PriceCard />
            </div>
          </div>
        </div>
      </section>

      {(realisation || avis) && (
        <>
          <Wave top="creme" bottom="blanc" sens="a" />
          <section className="bg-blanc px-4 py-14 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-[1120px]">
              <SectionTitle
                title={
                  <>
                    Un site créé à <Eclaire>{city.name}</Eclaire>.
                  </>
                }
              />
              <div className="mt-7 grid gap-5 sm:mt-12 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:items-start">
                {realisation && <RealisationCard r={realisation} lien />}
                {avis && (
                  <figure className="m-0 flex flex-col gap-[14px] rounded-md border border-beige bg-creme p-[22px] sm:gap-[18px] sm:p-7">
                    <a
                      href={GOOGLE_REVIEWS.url}
                      className="text-[15px] font-semibold text-orange"
                    >
                      5/5 sur Google
                    </a>
                    <blockquote className="m-0 whitespace-pre-line">{avis.text}</blockquote>
                    <figcaption className="border-t border-beige pt-3 text-[15px] sm:pt-4">
                      <strong className="font-semibold">{avis.name}</strong>
                      <br />
                      <span className="text-gris">{avis.context}</span>
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>
          </section>
          <Wave top="blanc" bottom="creme" sens="b" />
        </>
      )}

      {articles.length > 0 && (
        <section className="px-4 py-14 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[1120px]">
            <SectionTitle title="À lire sur le blog." />
            <div className="mt-7 grid gap-5 sm:mt-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 pb-14 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-[1120px] text-[17px]">
          <p>
            <Link href="/offre" className="inline-flex min-h-[44px] items-center font-semibold">
              Voir la formule en détail
            </Link>
          </p>
        </div>
      </section>

      <CtaBand avant="creme" />
    </>
  )
}
