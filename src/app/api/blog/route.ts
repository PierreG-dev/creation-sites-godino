import { NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles, createArticle } from '@/lib/blog-store'
import { verifyAdminToken } from '@/lib/blog-auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12')))
  const category = searchParams.get('category')

  let articles = await getPublishedArticles()
  if (category) articles = articles.filter((a) => a.category === category)

  const total = articles.length
  const paginated = articles.slice((page - 1) * limit, page * limit)

  return NextResponse.json({
    articles: paginated,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  })
}

// Used by n8n or any HTTP client to create articles
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { title, content, excerpt } = body as {
    title?: string
    content?: string
    excerpt?: string
  }

  if (!title || !content || !excerpt) {
    return NextResponse.json(
      { error: 'title, content, and excerpt are required' },
      { status: 400 }
    )
  }

  const article = await createArticle({
    title: String(title),
    content: String(content),
    excerpt: String(excerpt),
    author: body.author ? String(body.author) : undefined,
    category: body.category ? String(body.category) : undefined,
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    cover_image: body.cover_image ? String(body.cover_image) : undefined,
    status: body.status === 'draft' ? 'draft' : 'published',
    meta_description: body.meta_description ? String(body.meta_description) : undefined,
    slug: body.slug ? String(body.slug) : undefined,
  })

  return NextResponse.json(article, { status: 201 })
}
