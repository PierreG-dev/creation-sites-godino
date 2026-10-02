import { NextResponse } from 'next/server'
import { BLOG_ADMIN_COOKIE } from '@/lib/blog-auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(BLOG_ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
