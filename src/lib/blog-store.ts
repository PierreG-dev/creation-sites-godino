import fs from 'fs'
import path from 'path'
import type { Article, CreateArticleInput, UpdateArticleInput } from '@/types/blog'

const DATA_FILE = path.join(process.cwd(), 'data', 'articles.json')

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
}

function readArticles(): Article[] {
  ensureDataFile()
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeArticles(articles: Article[]) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8')
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

export function getAllArticles(): Article[] {
  return readArticles().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function getPublishedArticles(): Article[] {
  return readArticles()
    .filter((a) => a.status === 'published' && a.published_at)
    .sort(
      (a, b) =>
        new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime()
    )
}

export function getArticleBySlug(slug: string): Article | undefined {
  return readArticles().find((a) => a.slug === slug)
}

export function getArticleById(id: string): Article | undefined {
  return readArticles().find((a) => a.id === id)
}

export function createArticle(input: CreateArticleInput): Article {
  const articles = readArticles()
  const now = new Date().toISOString()

  let slug = slugify(input.slug || input.title)
  const taken = new Set(articles.map((a) => a.slug))
  let counter = 2
  const base = slug
  while (taken.has(slug)) slug = `${base}-${counter++}`

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

  articles.push(article)
  writeArticles(articles)
  return article
}

export function updateArticle(id: string, input: UpdateArticleInput): Article | null {
  const articles = readArticles()
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return null

  const existing = articles[idx]
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

  articles[idx] = updated
  writeArticles(articles)
  return updated
}

export function deleteArticle(id: string): boolean {
  const articles = readArticles()
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return false
  articles.splice(idx, 1)
  writeArticles(articles)
  return true
}
