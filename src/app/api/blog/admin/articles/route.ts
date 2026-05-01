import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/blog-store'
import { verifyAdminToken } from '@/lib/blog-auth'

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const articles = await getAllArticles()
  return NextResponse.json({ articles })
}
