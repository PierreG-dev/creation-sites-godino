import { getPublishedArticles } from '@/lib/blog-store'
import { SITE_URL } from '@/lib/site'
import { getPublishedCityPages } from '@/data/cities'

export const revalidate = 300

// Sitemap écrit à la main (et non via sitemap.ts) pour inclure les balises
// <image:image> des covers d'articles, non supportées par Next 14.2.
type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

interface Entry {
  url: string
  lastModified: Date
  changeFrequency: ChangeFreq
  priority: number
  images?: string[]
}

export async function GET() {
  const articles = await getPublishedArticles()
  const cityPages = getPublishedCityPages()

  const now = new Date()

  const staticRoutes: Entry[] = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/offre`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/comment-ca-marche`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/realisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const articleRoutes: Entry[] = articles
    .filter((a) => a.status === 'published' && !a.slug.endsWith('-2'))
    .map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: article.cover_image ? [new URL(article.cover_image, SITE_URL).toString()] : [],
    }))

  const cityRoutes: Entry[] = cityPages.map((city) => ({
    url: `${SITE_URL}/creation-site-internet/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const xml = renderSitemap([...staticRoutes, ...cityRoutes, ...articleRoutes])
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}

function renderSitemap(entries: Entry[]): string {
  const urls = entries
    .map((e) => {
      const images = (e.images ?? [])
        .map((src) => `\n<image:image>\n<image:loc>${escapeXml(src)}</image:loc>\n</image:image>`)
        .join('')
      return `<url>
<loc>${escapeXml(e.url)}</loc>
<lastmod>${e.lastModified.toISOString()}</lastmod>
<changefreq>${e.changeFrequency}</changefreq>
<priority>${e.priority}</priority>${images}
</url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
