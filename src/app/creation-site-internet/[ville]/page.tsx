import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowRight } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { WaveDivider } from '@/components/WaveDivider'
import { SITE_URL } from '@/lib/site'
import { getCityPageBySlug, getPublishedCityPages } from '@/data/cities'

interface Props {
  params: { ville: string }
}

export function generateStaticParams() {
  // Génère uniquement les pages publiées — les brouillons restent accessibles via
  // le lien direct en interne mais ne sont pas prerenderées ni dans la navigation.
  return getPublishedCityPages().map((c) => ({ ville: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityPageBySlug(params.ville)
  if (!city || !city.published) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } }
  }
  return {
    title: { absolute: city.seoTitle },
    description: city.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/creation-site-internet/${city.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/creation-site-internet/${city.slug}`,
      title: city.seoTitle,
      description: city.metaDescription,
    },
  }
}

export default function CityPage({ params }: Props) {
  const city = getCityPageBySlug(params.ville)
  if (!city) notFound()
  if (!city.published) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Création site internet ${city.name}`,
        item: `${SITE_URL}/creation-site-internet/${city.slug}`,
      },
    ],
  }

  const faqJsonLd =
    city.faq && city.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: city.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <section className="bg-cream pt-16 pb-10">
        <div className="container">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-textMuted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true" className="text-mid">/</li>
              <li className="text-warmDark font-medium">
                Création site internet {city.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent2/10 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-6">
              {city.name} · Tarn-et-Garonne et Occitanie
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl text-warmDark leading-tight mb-5">
              {city.h1}
            </h1>
            <p className="text-textMuted text-lg leading-relaxed">{city.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-16">
        <div className="container">
          <div className="max-w-3xl article-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{city.body}</ReactMarkdown>
          </div>

          <aside className="max-w-3xl mt-10 bg-white border border-mid rounded-3xl p-6 md:p-8 shadow-soft">
            <h2 className="font-playfair text-xl md:text-2xl text-warmDark mb-3 leading-tight">
              Prêt à parler de votre projet à {city.name} ?
            </h2>
            <p className="text-textMuted text-sm md:text-base leading-relaxed mb-5">
              Je crée des sites internet clés en main. Hébergement, SEO et modifications
              inclus. Aucun frais de création.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/offre"
                className="inline-flex items-center gap-1.5 bg-accent text-white text-sm font-medium rounded-2xl px-5 py-2.5 hover:bg-accent/90 transition-colors"
              >
                Voir l&apos;offre
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 border border-mid text-warmDark text-sm font-medium rounded-2xl px-5 py-2.5 hover:bg-mid transition-colors"
              >
                Me contacter
              </Link>
            </div>
          </aside>

          {city.faq && city.faq.length > 0 && (
            <div className="max-w-3xl mt-14">
              <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {city.faq.map((f, i) => (
                  <details
                    key={i}
                    className="bg-white border border-mid rounded-2xl p-5"
                  >
                    <summary className="cursor-pointer font-medium text-warmDark">
                      {f.question}
                    </summary>
                    <p className="text-textMuted text-sm mt-3 leading-relaxed">
                      {f.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <WaveDivider fillColor="#E8DDD0" />
      <section className="bg-mid py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-4">
              Votre site pro, livré en 7 jours.
            </h2>
            <CTAButton href="/contact" variant="primary" size="lg">
              Démarrer mon projet
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
