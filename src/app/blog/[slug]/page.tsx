import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug, getRelatedArticles } from '@/lib/blog-store'
import { CtaBand } from '@/components/lanterne/blocks'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, ZONE_PHRASE } from '@/lib/site'
import { TARIF } from '@/data/tarif'
import { toImageSrc } from '@/lib/blog-images'
import { getLocalImageSize } from '@/lib/blog-uploads'

export const revalidate = 300

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article || article.status !== 'published') {
    return { title: 'Article introuvable' }
  }

  const seoTitle = article.seo_title?.trim() || article.title
  const coverImage = article.cover_image ? await getCoverImageMeta(article.cover_image, article.title) : null

  return {
    // `title.absolute` évite l'ajout du suffixe du template parent (`| Lanterne Web`).
    title: { absolute: seoTitle },
    description: article.meta_description || article.excerpt,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `${SITE_URL}/blog/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${article.slug}`,
      title: article.title,
      description: article.meta_description || article.excerpt,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      authors: [article.author],
      tags: article.tags,
      images: [coverImage ?? DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_description || article.excerpt,
      images: [(coverImage ?? DEFAULT_OG_IMAGE).url],
    },
  }
}

// og:image / twitter:image avec les dimensions réelles du fichier (les
// réseaux sociaux s'en servent pour afficher l'aperçu sans le télécharger).
async function getCoverImageMeta(src: string, alt: string) {
  const size = await getLocalImageSize(src)
  return {
    url: new URL(src, SITE_URL).toString(),
    ...(size
      ? {
          ...size,
          type: src.endsWith('.png') ? 'image/png' : /\.jpe?g$/.test(src) ? 'image/jpeg' : 'image/webp',
        }
      : {}),
    alt,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Enlève un éventuel h1 initial qui répèterait le titre de l'article.
function stripLeadingH1(content: string): string {
  const match = content.match(/^#\s[^\n]*\n+/)
  return match ? content.slice(match[0].length) : content
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)

  if (!article || article.status !== 'published') {
    notFound()
  }

  const related = await getRelatedArticles(article, 3)
  const body = stripLeadingH1(article.content)
  const coverSize = article.cover_image ? await getLocalImageSize(article.cover_image) : null

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.meta_description || article.excerpt,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
    wordCount: body.split(/\s+/).length,
    timeRequired: `PT${article.reading_time}M`,
    ...(article.cover_image
      ? {
          image: {
            '@type': 'ImageObject',
            url: new URL(article.cover_image, SITE_URL).toString(),
            ...(coverSize ?? {}),
            caption: article.title,
          },
        }
      : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-[1120px]">
          <nav aria-label="Fil d'Ariane" className="mb-8 text-[15px] text-gris">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <Link href="/" className="text-gris underline">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="text-gris underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="max-w-[280px] truncate sm:max-w-md">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl">
            <p className="m-0 text-[15px] font-semibold text-orange">{article.category}</p>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-titre sm:text-[46px]">
              {article.title}
            </h1>
            <p className="mt-5 text-[18px] text-gris sm:text-[20px]">{article.excerpt}</p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-b border-beige pb-8 text-[15px] text-gris">
              <span>{article.author}</span>
              {article.published_at && (
                <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
              )}
              <span>{article.reading_time} min de lecture</span>
            </p>
          </div>
        </div>
      </section>

      {article.cover_image ? (
        <section className="px-4 pb-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-beige">
              <Image
                src={toImageSrc(article.cover_image)}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-16 pt-10 sm:px-6">
        <div className="mx-auto max-w-[1120px]">
          <article
            className="mx-auto max-w-3xl"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="headline" content={article.title} />
            {article.published_at && (
              <meta itemProp="datePublished" content={article.published_at} />
            )}
            <meta itemProp="dateModified" content={article.updated_at} />
            <meta itemProp="author" content={article.author} />

            <div className="article-prose" itemProp="articleBody">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>

            {article.tags.length > 0 && (
              <footer className="mt-12 border-t border-beige pt-6">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-beige bg-blanc px-3 py-1 text-[15px] text-gris"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </footer>
            )}

            {/* Encart interne : lien vers la formule et le contact */}
            <aside className="mt-10 rounded-md border-2 border-orange bg-blanc p-6 sm:p-8">
              <h2 className="m-0 text-[22px] font-extrabold leading-tight sm:text-[26px]">
                Besoin d&apos;un site pour votre activité ?
              </h2>
              <p className="mt-3 text-gris">
                {ZONE_PHRASE} Création offerte, puis {TARIF.mensuel} € par mois. Hébergement,
                référencement de base et modifications compris.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/offre"
                  className="inline-flex min-h-[44px] items-center rounded-md bg-orange px-5 py-3 font-semibold text-blanc no-underline hover:bg-orange-fonce hover:text-blanc"
                >
                  Voir la formule
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center rounded-md border-2 border-encre px-5 py-3 font-semibold text-encre no-underline hover:bg-encre hover:text-creme"
                >
                  Me contacter
                </Link>
              </div>
            </aside>
          </article>

          {related.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h2 className="m-0 text-[26px] font-extrabold sm:text-[32px]">À lire aussi</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ArticleCard key={r.id} article={r} />
                ))}
              </div>
            </div>
          )}

          <div className="mx-auto mt-10 max-w-3xl">
            <Link href="/blog" className="inline-flex min-h-[44px] items-center font-semibold">
              Retour au blog
            </Link>
          </div>
        </div>
      </section>

      <CtaBand avant="creme" />
    </>
  )
}
