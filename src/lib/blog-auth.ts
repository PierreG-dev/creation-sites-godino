import type { NextRequest } from 'next/server'

export function verifyAdminToken(request: NextRequest): boolean {
  const token = process.env.BLOG_ADMIN_TOKEN
  if (!token) return false
  const auth = request.headers.get('Authorization') ?? ''
  return auth === `Bearer ${token}`
}
