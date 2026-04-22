'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Save, Eye, Code2, Loader2, AlertCircle } from 'lucide-react'
import type { Article, CreateArticleInput } from '@/types/blog'

const CATEGORIES = [
  'Conseils web',
  'SEO & Référencement',
  'Création de site',
  'Artisanat & TPE',
  'Maintenance & Sécurité',
  'Général',
]

interface ArticleFormProps {
  article?: Article
  token: string
}

export function ArticleForm({ article, token }: ArticleFormProps) {
  const router = useRouter()
  const isEdit = !!article

  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [coverImage, setCoverImage] = useState(article?.cover_image ?? '')
  const [author, setAuthor] = useState(article?.author ?? 'Pierre Godino')
  const [category, setCategory] = useState(article?.category ?? 'Général')
  const [tags, setTags] = useState(article?.tags.join(', ') ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(
    article?.status ?? 'published'
  )
  const [metaDescription, setMetaDescription] = useState(article?.meta_description ?? '')

  // Auto-slug from title on create
  useEffect(() => {
    if (!isEdit && title) {
      const auto = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 80)
      setSlug(auto)
    }
  }, [title, isEdit])

  async function handleSave() {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Le titre, l\'extrait et le contenu sont obligatoires.')
      return
    }
    setSaving(true)
    setError('')

    const payload: CreateArticleInput & { slug?: string } = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover_image: coverImage.trim(),
      author: author.trim(),
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      meta_description: metaDescription.trim() || excerpt.trim(),
      slug: slug.trim() || undefined,
    }

    const url = isEdit
      ? `/api/blog/admin/articles/${article!.id}`
      : '/api/blog'

    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Une erreur est survenue.')
      return
    }

    router.push('/blog/admin')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-mid">
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              href="/blog/admin"
              className="flex items-center gap-2 text-textMuted hover:text-warmDark transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </Link>

            <h1 className="font-playfair text-warmDark text-base flex-1 text-center truncate">
              {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
            </h1>

            <div className="flex items-center gap-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="text-sm bg-cream border border-mid rounded-xl px-3 py-1.5 text-warmDark focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-accent text-white text-sm font-medium rounded-2xl px-4 py-2 hover:bg-accent/90 disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-6 bg-red-50 border border-red-200 rounded-2xl px-5 py-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'article…"
              className="w-full font-playfair text-2xl md:text-3xl text-warmDark bg-transparent border-none outline-none placeholder:text-mid resize-none"
            />

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-mid rounded-xl p-1 w-fit">
              <button
                onClick={() => setTab('edit')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'edit'
                    ? 'bg-white text-warmDark shadow-soft'
                    : 'text-textMuted hover:text-warmDark'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Markdown
              </button>
              <button
                onClick={() => setTab('preview')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'preview'
                    ? 'bg-white text-warmDark shadow-soft'
                    : 'text-textMuted hover:text-warmDark'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Aperçu
              </button>
            </div>

            {/* Content area */}
            <div className="bg-white border border-mid rounded-2xl overflow-hidden min-h-[500px]">
              {tab === 'edit' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Écrivez votre article en Markdown…

# Titre principal

## Section

Votre contenu ici...

- Bullet point
- Bullet point

**Texte en gras**, *texte en italique*

> Blockquote"
                  className="w-full h-full min-h-[500px] p-6 font-mono text-sm text-warmDark bg-transparent border-none resize-none focus:outline-none leading-relaxed"
                />
              ) : (
                <div className="p-6 min-h-[500px] article-prose">
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-textMuted italic">L&apos;aperçu apparaîtra ici…</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Excerpt */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <label className="block text-sm font-medium text-warmDark mb-2">
                Extrait <span className="text-red-500">*</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Résumé court affiché dans les cartes et utilisé pour le SEO…"
                rows={3}
                className="w-full text-sm text-textMuted bg-cream border border-mid rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
              <p className="text-xs text-textMuted mt-1.5">
                {excerpt.length}/160 caractères recommandés
              </p>
            </div>

            {/* Category */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <label className="block text-sm font-medium text-warmDark mb-2">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm bg-cream border border-mid rounded-xl px-4 py-2.5 text-warmDark focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <label className="block text-sm font-medium text-warmDark mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="seo, artisan, web…"
                className="w-full text-sm bg-cream border border-mid rounded-xl px-4 py-2.5 text-warmDark focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
              <p className="text-xs text-textMuted mt-1.5">Séparés par des virgules</p>
            </div>

            {/* Cover image */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <label className="block text-sm font-medium text-warmDark mb-2">
                Image de couverture (URL)
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://…"
                className="w-full text-sm bg-cream border border-mid rounded-xl px-4 py-2.5 text-warmDark focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>

            {/* Author */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <label className="block text-sm font-medium text-warmDark mb-2">
                Auteur
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-sm bg-cream border border-mid rounded-xl px-4 py-2.5 text-warmDark focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>

            {/* SEO */}
            <div className="bg-white border border-mid rounded-2xl p-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                SEO
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-warmDark mb-1.5">
                    Slug URL
                  </label>
                  <div className="flex items-center gap-1 bg-cream border border-mid rounded-xl px-3 py-2">
                    <span className="text-textMuted text-xs">/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 text-sm text-warmDark bg-transparent focus:outline-none min-w-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-warmDark mb-1.5">
                    Meta description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Si vide, l'extrait est utilisé."
                    rows={2}
                    className="w-full text-sm bg-cream border border-mid rounded-xl px-4 py-3 text-warmDark resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
