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
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/admin/articles/${params.id}`)
      .then((res) => {
        if (res.status === 401) {
          router.replace('/blog/admin')
          return null
        }
        if (!res.ok) {
          setNotFound(true)
          return null
        }
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

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-textMuted">Article introuvable.</p>
      </div>
    )
  }

  return <ArticleForm article={article} />
}
