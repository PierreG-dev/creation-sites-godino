import { getDb } from '@/lib/mongodb'
import type { Article, CreateArticleInput, UpdateArticleInput } from '@/types/blog'

const COLLECTION = 'articles'

// UUID v4 format validation — prevents any attempt to pass MongoDB operators as id
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isValidUUID(id: string): boolean {
  return UUID_RE.test(id)
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100)
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function getAllArticles(): Promise<Article[]> {
  const db = await getDb()
  const docs = await db
    .collection<Article>(COLLECTION)
    .find({}, { projection: { _id: 0 } })
    .sort({ created_at: -1 })
    .toArray()
  return docs
}

export async function getPublishedArticles(): Promise<Article[]> {
  const db = await getDb()
  const docs = await db
    .collection<Article>(COLLECTION)
    .find({ status: 'published', published_at: { $ne: null } }, { projection: { _id: 0 } })
    .sort({ published_at: -1 })
    .toArray()
  return docs
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const db = await getDb()
  const doc = await db
    .collection<Article>(COLLECTION)
    .findOne({ slug }, { projection: { _id: 0 } })
  return doc ?? null
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!isValidUUID(id)) return null
  const db = await getDb()
  const doc = await db
    .collection<Article>(COLLECTION)
    .findOne({ id }, { projection: { _id: 0 } })
  return doc ?? null
}

export async function createArticle(input: CreateArticleInput): Promise<Article> {
  const db = await getDb()
  const col = db.collection<Article>(COLLECTION)
  const now = new Date().toISOString()

  let slug = slugify(input.slug || input.title)
  // Resolve slug conflicts
  const base = slug
  let counter = 2
  while (await col.findOne({ slug }, { projection: { _id: 1 } })) {
    slug = `${base}-${counter++}`
  }

  const isPublished = (input.status ?? 'published') === 'published'

  const article: Article = {
    id: crypto.randomUUID(),
    title: input.title,
    slug,
    excerpt: input.excerpt,
    content: input.content,
    cover_image: input.cover_image ?? '',
    author: input.author ?? 'Pierre Godino',
    category: input.category ?? 'Général',
    tags: input.tags ?? [],
    status: input.status ?? 'published',
    meta_description: input.meta_description ?? input.excerpt,
    published_at: isPublished ? (input.published_at ?? now) : null,
    created_at: now,
    updated_at: now,
    reading_time: calcReadingTime(input.content),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await col.insertOne(article as any)
  return article
}

export async function updateArticle(id: string, input: UpdateArticleInput): Promise<Article | null> {
  if (!isValidUUID(id)) return null
  const db = await getDb()
  const col = db.collection<Article>(COLLECTION)

  const existing = await col.findOne({ id }, { projection: { _id: 0 } })
  if (!existing) return null

  const now = new Date().toISOString()
  const newStatus = input.status ?? existing.status
  let publishedAt = existing.published_at
  if (newStatus === 'published' && !publishedAt) publishedAt = now
  if (newStatus === 'draft') publishedAt = null

  const updated: Article = {
    ...existing,
    ...input,
    id: existing.id,
    slug: input.slug ? slugify(input.slug) : existing.slug,
    reading_time: input.content ? calcReadingTime(input.content) : existing.reading_time,
    published_at: publishedAt,
    status: newStatus,
    updated_at: now,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await col.replaceOne({ id }, updated as any)
  return updated
}

export async function deleteArticle(id: string): Promise<boolean> {
  if (!isValidUUID(id)) return false
  const db = await getDb()
  const result = await db.collection<Article>(COLLECTION).deleteOne({ id })
  return result.deletedCount === 1
}

export async function ensureIndexes(): Promise<void> {
  const db = await getDb()
  const col = db.collection<Article>(COLLECTION)
  await Promise.all([
    col.createIndex({ id: 1 }, { unique: true }),
    col.createIndex({ slug: 1 }, { unique: true }),
    col.createIndex({ status: 1, published_at: -1 }),
    col.createIndex({ created_at: -1 }),
  ])
}
