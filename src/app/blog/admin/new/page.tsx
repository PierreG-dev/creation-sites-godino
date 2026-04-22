'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/blog/ArticleForm'

export default function NewArticlePage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('blog_admin_token')
    if (!saved) {
      router.replace('/blog/admin')
    } else {
      setToken(saved)
    }
    setChecked(true)
  }, [router])

  if (!checked || !token) return null

  return <ArticleForm token={token} />
}
