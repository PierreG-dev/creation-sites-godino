import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types/blog'
import { toImageSrc } from '@/lib/blog-images'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-md border border-beige bg-blanc ${
        featured ? 'md:flex-row' : ''
      }`}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="headline" content={article.title} />
      <meta itemProp="description" content={article.excerpt} />
      {article.published_at && <meta itemProp="datePublished" content={article.published_at} />}
      <meta itemProp="author" content={article.author} />

      {article.cover_image && (
        <Link
          href={`/blog/${article.slug}`}
          className={`relative shrink-0 overflow-hidden bg-beige ${
            featured ? 'aspect-[4/3] md:aspect-auto md:w-2/5' : 'aspect-[16/9]'
          }`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={toImageSrc(article.cover_image)}
            alt=""
            fill
            className="object-cover"
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 40vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="m-0 text-[14px] font-semibold text-orange">{article.category}</p>

        <h2
          className={`mt-2 font-extrabold leading-snug ${featured ? 'text-[24px] md:text-[30px]' : 'text-[20px]'}`}
          itemProp="name"
        >
          <Link href={`/blog/${article.slug}`} className="text-encre no-underline hover:text-orange">
            {article.title}
          </Link>
        </h2>

        <p className="mt-3 line-clamp-3 flex-1 text-gris" itemProp="abstract">
          {article.excerpt}
        </p>

        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-beige pt-4 text-[14px] text-gris">
          {article.published_at && (
            <time dateTime={article.published_at} itemProp="datePublished">
              {formatDate(article.published_at)}
            </time>
          )}
          <span>{article.reading_time} min de lecture</span>
        </p>
      </div>
    </article>
  )
}
