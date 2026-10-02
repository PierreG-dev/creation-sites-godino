import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/blog-store'
import { SITE_URL } from '@/lib/site'
import { getPublishedCityPages } from '@/data/cities'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles()
  const cityPages = getPublishedCityPages()

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/offre`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/comment-ca-marche`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/realisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.status === 'published' && !a.slug.endsWith('-2'))
    .map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const cityRoutes: MetadataRoute.Sitemap = cityPages.map((city) => ({
    url: `${SITE_URL}/creation-site-internet/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...cityRoutes, ...articleRoutes]
}
