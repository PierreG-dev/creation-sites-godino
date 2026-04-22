export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  meta_description: string
  published_at: string | null
  created_at: string
  updated_at: string
  reading_time: number
}

export type CreateArticleInput = {
  title: string
  excerpt: string
  content: string
  cover_image?: string
  author?: string
  category?: string
  tags?: string[]
  status?: 'draft' | 'published'
  meta_description?: string
  slug?: string
  published_at?: string | null
}

export type UpdateArticleInput = Partial<CreateArticleInput>