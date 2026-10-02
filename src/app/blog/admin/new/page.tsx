'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/blog/ArticleForm'

export default function NewArticlePage() {
  const router = useRouter()
  const [state, setState] = useState<'checking' | 'ok'>('checking')

  useEffect(() => {
    fetch('/api/blog/admin/validate').then((res) => {
      if (res.ok) setState('ok')
      else router.replace('/blog/admin')
    })
  }, [router])

  if (state !== 'ok') return null

  return <ArticleForm />
}
