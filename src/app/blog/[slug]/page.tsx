import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ChevronLeft, Tag, User, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug, getRelatedArticles } from '@/lib/blog-store'
import { CTAButton } from '@/components/CTAButton'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { WaveDivider } from '@/components/WaveDivider'
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site'
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
    // `title.absolute` évite l'ajout du suffixe du template parent (`| GODINO`).
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
      name: 'GODINO - Création WEB',
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

      {/* Header */}
      <section className="bg-cream pt-10 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol
              className="flex flex-wrap items-center gap-2 text-sm text-textMuted"
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
              <li aria-hidden="true" className="text-mid">/</li>
              <li
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <Link
                  href="/blog"
                  className="hover:text-accent transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li aria-hidden="true" className="text-mid">/</li>
              <li
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
                className="text-warmDark font-medium truncate max-w-[280px] sm:max-w-md"
              >
                <span itemProp="name">{article.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl mx-auto">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-warmDark leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-textMuted text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-textMuted pb-8 border-b border-mid">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              {article.published_at && (
                <time
                  dateTime={article.published_at}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.published_at)}
                </time>
              )}
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.reading_time} min de lecture
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {article.cover_image ? (
        <section className="bg-cream pb-4">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft-lg">
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
          </div>
        </section>
      ) : null}

      {/* Article body */}
      <section className="bg-cream py-10 pb-16">
        <div className="container">
          <article
            className="max-w-3xl mx-auto"
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {body}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <footer className="mt-12 pt-6 border-t border-mid">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-mid text-textMuted text-sm font-medium rounded-full px-4 py-1.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>
            )}

            {/* Encart interne — lien vers l'offre et le contact */}
            <aside className="mt-10 bg-white border border-mid rounded-3xl p-6 md:p-8 shadow-soft">
              <h2 className="font-playfair text-xl md:text-2xl text-warmDark mb-3 leading-tight">
                Besoin d&apos;un site pro pour votre activité ?
              </h2>
              <p className="text-textMuted text-sm md:text-base leading-relaxed mb-5">
                Je crée des sites internet clés en main pour les artisans et TPE :
                hébergement, SEO et modifications inclus. Aucun frais de création.
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
          </article>

          {/* Articles liés */}
          {related.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-6">
                À lire aussi
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <ArticleCard key={r.id} article={r} />
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="max-w-3xl mx-auto mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-textMuted hover:text-accent transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <WaveDivider fillColor="#E8DDD0" />
      <section className="bg-mid py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-4">
              Un site web qui vous rapporte des clients ?
            </h2>
            <p className="text-textMuted mb-8 leading-relaxed">
              Livré en 7 jours ouvrés, clés en main. Hébergement, SEO et maintenance
              inclus. Zéro surprise.
            </p>
            <CTAButton href="/contact" variant="primary" size="lg">
              Démarrer mon projet
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
