'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/blog/ArticleForm'
import type { Article } from '@/types/blog'

interface Props {
  params: { id: string }
}

export default function EditArticlePage({ params }: Props) {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('blog_admin_token')
    if (!saved) {
      router.replace('/blog/admin')
      return
    }
    setToken(saved)

    fetch(`/api/blog/admin/articles/${params.id}`, {
      headers: { Authorization: `Bearer ${saved}` },
    })
      .then((res) => {
        if (!res.ok) { setNotFound(true); return null }
        return res.json()
      })
      .then((data) => {
        if (data) setArticle(data)
      })
      .finally(() => setLoading(false))
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-textMuted text-sm">
        Chargement…
      </div>
    )
  }

  if (notFound || !article || !token) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-textMuted">Article introuvable.</p>
      </div>
    )
  }

  return <ArticleForm article={article} token={token} />
}
