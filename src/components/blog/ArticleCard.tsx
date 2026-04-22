import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { Article } from '@/types/blog'

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
      className={`bg-white border border-mid rounded-3xl overflow-hidden shadow-soft group hover:shadow-soft-lg transition-all duration-300 flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="headline" content={article.title} />
      <meta itemProp="description" content={article.excerpt} />
      {article.published_at && (
        <meta itemProp="datePublished" content={article.published_at} />
      )}
      <meta itemProp="author" content={article.author} />

      {/* Cover Image */}
      {article.cover_image && (
        <Link
          href={`/blog/${article.slug}`}
          className={`relative overflow-hidden bg-mid flex-shrink-0 ${
            featured
              ? 'md:w-2/5 aspect-[4/3] md:aspect-auto'
              : 'aspect-[16/9]'
          }`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 40vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`font-playfair text-warmDark leading-snug mb-3 group-hover:text-accent transition-colors duration-200 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
          itemProp="name"
        >
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        {/* Excerpt */}
        <p
          className="text-textMuted text-sm leading-relaxed flex-1 mb-4 line-clamp-3"
          itemProp="abstract"
        >
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-mid text-textMuted text-xs rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-textMuted border-t border-mid pt-4">
          {article.published_at && (
            <time
              dateTime={article.published_at}
              itemProp="datePublished"
              className="flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.published_at)}
            </time>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.reading_time} min de lecture
          </span>
        </div>
      </div>
    </article>
  )
}
