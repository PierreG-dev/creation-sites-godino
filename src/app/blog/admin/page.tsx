'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  PenSquare,
  Trash2,
  Plus,
  LogOut,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  Circle,
  AlertCircle,
  Download,
  Upload,
} from 'lucide-react'
import type { Article } from '@/types/blog'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token.trim()) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/blog/admin/validate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.trim()}` },
    })

    setLoading(false)
    if (res.ok) {
      onLogin(token.trim())
    } else {
      setError('Token invalide. Vérifiez votre fichier .env.')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-mono font-bold text-lg">G</span>
          </div>
          <h1 className="font-playfair text-2xl text-warmDark">Administration Blog</h1>
          <p className="text-textMuted text-sm mt-2">GODINO Pierre</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-mid rounded-3xl p-8 shadow-soft"
        >
          <h2 className="font-playfair text-lg text-warmDark mb-6">Accès sécurisé</h2>

          <div className="mb-5">
            <label
              htmlFor="token"
              className="block text-sm font-medium text-warmDark mb-2"
            >
              Token d&apos;accès
            </label>
            <div className="relative">
              <input
                id="token"
                type={showToken ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Entrez votre token…"
                className="w-full bg-cream border border-mid rounded-2xl px-4 py-3 pr-12 text-warmDark placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-textMuted hover:text-warmDark transition-colors"
                aria-label={showToken ? 'Masquer le token' : 'Afficher le token'}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm mb-5 bg-red-50 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full bg-accent text-white font-medium rounded-2xl px-6 py-3 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Vérification…' : 'Accéder au backoffice'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<{ inserted: number; updated: number; skipped: number; errors?: string[] } | null>(null)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/blog/admin/articles', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      const data = await res.json()
      setArticles(data.articles)
    }
    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  function handleExport() {
    const blob = new Blob([JSON.stringify({ articles }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `articles-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        alert('Fichier trop volumineux (max 5 Mo)')
        return
      }
      let parsed: unknown
      try {
        parsed = JSON.parse(await file.text())
      } catch {
        alert('Fichier JSON invalide')
        return
      }
      setImporting(true)
      setImportResult(null)
      const res = await fetch('/api/blog/admin/articles/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      })
      const data = await res.json()
      setImporting(false)
      if (res.ok) {
        setImportResult(data)
        await fetchArticles()
      } else {
        alert(`Erreur import : ${data.error ?? 'inconnue'}`)
      }
    }
    input.click()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return
    setDeleting(id)
    await fetch(`/api/blog/admin/articles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    await fetchArticles()
    setDeleting(null)
  }

  const published = articles.filter((a) => a.status === 'published').length
  const drafts = articles.filter((a) => a.status === 'draft').length

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-mid">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
                  <span className="text-white font-mono font-bold text-xs">G</span>
                </div>
                <span className="font-playfair text-warmDark text-sm hidden sm:block">
                  GODINO
                </span>
              </Link>
              <span className="text-mid text-lg hidden sm:block">/</span>
              <span className="text-textMuted text-sm hidden sm:block">Blog Admin</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                target="_blank"
                className="text-sm text-textMuted hover:text-accent transition-colors hidden sm:block mr-1"
              >
                Voir le blog →
              </Link>
              <button
                onClick={handleExport}
                disabled={articles.length === 0}
                className="flex items-center gap-1.5 text-sm text-textMuted hover:text-warmDark border border-mid rounded-2xl px-3 py-2 hover:bg-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Exporter les articles en JSON"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exporter</span>
              </button>
              <button
                onClick={handleImportClick}
                disabled={importing}
                className="flex items-center gap-1.5 text-sm text-textMuted hover:text-warmDark border border-mid rounded-2xl px-3 py-2 hover:bg-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Importer des articles depuis un JSON"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">{importing ? 'Import…' : 'Importer'}</span>
              </button>
              <button
                onClick={() => router.push('/blog/admin/new')}
                className="flex items-center gap-2 bg-accent text-white text-sm font-medium rounded-2xl px-4 py-2 hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nouvel article</span>
                <span className="sm:hidden">Nouveau</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-textMuted hover:text-warmDark transition-colors rounded-xl hover:bg-mid"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-10">
        {/* Import result banner */}
        {importResult && (
          <div className="mb-6 bg-white border border-mid rounded-2xl px-5 py-4 flex items-start justify-between gap-4 shadow-soft">
            <div className="text-sm text-warmDark">
              <span className="font-medium">Import terminé —</span>{' '}
              {importResult.inserted} ajouté{importResult.inserted !== 1 ? 's' : ''},{' '}
              {importResult.updated} mis à jour,{' '}
              {importResult.skipped} ignoré{importResult.skipped !== 1 ? 's' : ''}
              {importResult.errors && importResult.errors.length > 0 && (
                <details className="mt-2 text-xs text-red-600">
                  <summary className="cursor-pointer">Voir les erreurs ({importResult.errors.length})</summary>
                  <ul className="mt-1 space-y-0.5 list-disc list-inside">
                    {importResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </details>
              )}
            </div>
            <button
              onClick={() => setImportResult(null)}
              className="text-textMuted hover:text-warmDark text-lg leading-none flex-shrink-0"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: articles.length, icon: FileText },
            { label: 'Publiés', value: published, icon: CheckCircle, color: 'text-accent2' },
            { label: 'Brouillons', value: drafts, icon: Circle, color: 'text-textMuted' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white border border-mid rounded-2xl p-5 flex items-center gap-4 shadow-soft"
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${color ?? 'text-warmDark'}`} />
              <div>
                <div className="font-playfair text-2xl text-warmDark">{value}</div>
                <div className="text-textMuted text-xs">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Articles list */}
        <div className="bg-white border border-mid rounded-3xl shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-mid flex items-center justify-between">
            <h2 className="font-playfair text-lg text-warmDark">Articles</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-textMuted text-sm">
              Chargement…
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <FileText className="w-10 h-10 text-mid" />
              <p className="text-textMuted text-sm">Aucun article pour l&apos;instant.</p>
              <button
                onClick={() =>
                  router.push('/blog/admin/new')
                }
                className="flex items-center gap-2 bg-accent text-white text-sm font-medium rounded-2xl px-5 py-2.5 hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Créer le premier article
              </button>
            </div>
          ) : (
            <ul>
              {articles.map((article, i) => (
                <li
                  key={article.id}
                  className={`flex items-start gap-4 px-6 py-4 ${
                    i < articles.length - 1 ? 'border-b border-mid' : ''
                  } hover:bg-cream/50 transition-colors`}
                >
                  {/* Status dot */}
                  <div className="flex-shrink-0 mt-1">
                    {article.status === 'published' ? (
                      <CheckCircle className="w-4 h-4 text-accent2" />
                    ) : (
                      <Circle className="w-4 h-4 text-textMuted" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-warmDark font-medium text-sm truncate">
                      {article.title}
                    </p>
                    <p className="text-textMuted text-xs mt-0.5 line-clamp-1">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-textMuted">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-medium ${
                          article.status === 'published'
                            ? 'bg-accent2/10 text-accent2'
                            : 'bg-mid text-textMuted'
                        }`}
                      >
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                      <span>{article.category}</span>
                      {article.published_at && (
                        <span>{formatDate(article.published_at)}</span>
                      )}
                      <span>{article.reading_time} min</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {article.status === 'published' && (
                      <Link
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        className="p-2 text-textMuted hover:text-accent2 rounded-xl hover:bg-mid transition-colors"
                        title="Voir l'article"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/blog/admin/edit/${article.id}`}
                      className="p-2 text-textMuted hover:text-accent rounded-xl hover:bg-mid transition-colors"
                      title="Modifier"
                    >
                      <PenSquare className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      disabled={deleting === article.id}
                      className="p-2 text-textMuted hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-40"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('blog_admin_token')
    if (saved) setToken(saved)
  }, [])

  function handleLogin(t: string) {
    sessionStorage.setItem('blog_admin_token', t)
    setToken(t)
  }

  function handleLogout() {
    sessionStorage.removeItem('blog_admin_token')
    setToken(null)
  }

  if (!token) return <LoginForm onLogin={handleLogin} />
  return <Dashboard token={token} onLogout={handleLogout} />
}
