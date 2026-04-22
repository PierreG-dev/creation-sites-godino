import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/blog-auth'

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  return NextResponse.json({ valid: true })
}
