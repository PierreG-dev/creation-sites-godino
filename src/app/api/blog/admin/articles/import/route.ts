import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { verifyAdminToken } from '@/lib/blog-auth'
import type { Article } from '@/types/blog'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isISODate(v: unknown): v is string {
  return typeof v === 'string' && ISO_RE.test(v)
}

function validateArticle(raw: unknown): { ok: true; article: Article } | { ok: false; reason: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, reason: 'Not an object' }
  }

  const a = raw as Record<string, unknown>

  if (!isString(a.id) || !UUID_RE.test(a.id)) return { ok: false, reason: `Invalid id: ${a.id}` }
  if (!isString(a.title)) return { ok: false, reason: 'Missing title' }
  if (!isString(a.slug)) return { ok: false, reason: 'Missing slug' }
  if (!isString(a.excerpt)) return { ok: false, reason: 'Missing excerpt' }
  if (!isString(a.content)) return { ok: false, reason: 'Missing content' }
  if (typeof a.cover_image !== 'string') return { ok: false, reason: 'Missing cover_image' }
  if (!isString(a.author)) return { ok: false, reason: 'Missing author' }
  if (!isString(a.category)) return { ok: false, reason: 'Missing category' }
  if (!Array.isArray(a.tags) || !a.tags.every((t) => typeof t === 'string')) {
    return { ok: false, reason: 'tags must be an array of strings' }
  }
  if (a.status !== 'draft' && a.status !== 'published') {
    return { ok: false, reason: `Invalid status: ${a.status}` }
  }
  if (typeof a.meta_description !== 'string') return { ok: false, reason: 'Missing meta_description' }
  if (a.published_at !== null && !isISODate(a.published_at)) {
    return { ok: false, reason: `Invalid published_at: ${a.published_at}` }
  }
  if (!isISODate(a.created_at)) return { ok: false, reason: 'Invalid created_at' }
  if (!isISODate(a.updated_at)) return { ok: false, reason: 'Invalid updated_at' }
  if (typeof a.reading_time !== 'number' || a.reading_time < 1) {
    return { ok: false, reason: 'Invalid reading_time' }
  }

  return {
    ok: true,
    article: {
      id: a.id as string,
      title: (a.title as string).slice(0, 500),
      slug: (a.slug as string).slice(0, 200),
      excerpt: (a.excerpt as string).slice(0, 1000),
      content: a.content as string,
      cover_image: (a.cover_image as string).slice(0, 500),
      author: (a.author as string).slice(0, 200),
      category: (a.category as string).slice(0, 100),
      tags: (a.tags as string[]).map((t) => t.slice(0, 100)).slice(0, 20),
      status: a.status as 'draft' | 'published',
      meta_description: (a.meta_description as string).slice(0, 500),
      published_at: a.published_at as string | null,
      created_at: a.created_at as string,
      updated_at: a.updated_at as string,
      reading_time: a.reading_time as number,
    },
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || !Array.isArray((body as Record<string, unknown>).articles)) {
    return NextResponse.json({ error: 'Body must be { articles: [...] }' }, { status: 400 })
  }

  const rawArticles = (body as Record<string, unknown>).articles as unknown[]

  if (rawArticles.length === 0) {
    return NextResponse.json({ error: 'No articles provided' }, { status: 400 })
  }

  if (rawArticles.length > 500) {
    return NextResponse.json({ error: 'Maximum 500 articles per import' }, { status: 400 })
  }

  const valid: Article[] = []
  const errors: string[] = []

  for (let i = 0; i < rawArticles.length; i++) {
    const result = validateArticle(rawArticles[i])
    if (result.ok) {
      valid.push(result.article)
    } else {
      errors.push(`Article[${i}]: ${result.reason}`)
    }
  }

  if (valid.length === 0) {
    return NextResponse.json({ error: 'No valid articles', errors }, { status: 400 })
  }

  const db = await getDb()
  const col = db.collection<Article>('articles')

  let inserted = 0
  let updated = 0

  for (const article of valid) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await col.replaceOne({ id: article.id }, article as any, { upsert: true })
    if (result.upsertedCount) inserted++
    else if (result.modifiedCount) updated++
  }

  return NextResponse.json({
    inserted,
    updated,
    skipped: errors.length,
    errors: errors.length > 0 ? errors : undefined,
  })
}
