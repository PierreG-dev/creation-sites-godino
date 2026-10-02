import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, BLOG_ADMIN_COOKIE, BLOG_ADMIN_COOKIE_MAX_AGE } from '@/lib/blog-auth'

// Permet au client de savoir s'il est déjà authentifié via cookie (session active).
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  return NextResponse.json({ valid: true })
}

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  // Pose le cookie de session (le token admin lui-même, httpOnly) pour éviter
  // de redemander le token à chaque ouverture de l'admin.
  const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/, '') ?? ''
  const response = NextResponse.json({ valid: true })
  if (token) {
    response.cookies.set(BLOG_ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: BLOG_ADMIN_COOKIE_MAX_AGE,
    })
  }
  return response
}
