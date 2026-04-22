import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug } from '@/lib/blog-store'

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const article = getArticleBySlug(params.slug)

  if (!article || article.status !== 'published') {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}
