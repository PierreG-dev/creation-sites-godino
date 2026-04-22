import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/blog-store'
import { verifyAdminToken } from '@/lib/blog-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const article = getArticleById(params.id)
  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const article = updateArticle(params.id, {
    title: body.title ? String(body.title) : undefined,
    content: body.content ? String(body.content) : undefined,
    excerpt: body.excerpt ? String(body.excerpt) : undefined,
    author: body.author ? String(body.author) : undefined,
    category: body.category ? String(body.category) : undefined,
    tags: Array.isArray(body.tags) ? body.tags.map(String) : undefined,
    cover_image: body.cover_image !== undefined ? String(body.cover_image) : undefined,
    status: body.status === 'draft' || body.status === 'published' ? body.status : undefined,
    meta_description: body.meta_description ? String(body.meta_description) : undefined,
    slug: body.slug ? String(body.slug) : undefined,
  })

  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const deleted = deleteArticle(params.id)
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
