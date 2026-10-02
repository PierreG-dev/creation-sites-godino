import type { NextRequest } from 'next/server'

export const BLOG_ADMIN_COOKIE = 'blog_admin_session'
export const BLOG_ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 180 // 6 mois

export function verifyAdminToken(request: NextRequest): boolean {
  const expected = process.env.BLOG_ADMIN_TOKEN
  if (!expected) return false

  // 1) Cookie httpOnly (nouvelle méthode, session 30 jours).
  const cookieValue = request.cookies.get(BLOG_ADMIN_COOKIE)?.value
  if (cookieValue && cookieValue === expected) return true

  // 2) Header Authorization: Bearer <token> (compatibilité clients API / anciens appels).
  const auth = request.headers.get('Authorization') ?? ''
  return auth === `Bearer ${expected}`
}
