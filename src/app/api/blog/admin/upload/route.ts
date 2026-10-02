import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { verifyAdminToken } from '@/lib/blog-auth'
import { SITE_URL } from '@/lib/site'

export const runtime = 'nodejs'

const MAX_BYTES = 2 * 1024 * 1024 // 2 Mo
const ALLOWED = new Map<string, string>([
  ['image/webp', 'webp'],
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/jpg', 'jpg'],
])

function safeStem(name: string): string {
  const stem = name.replace(/\.[^.]+$/, '')
  const cleaned = stem
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return cleaned || 'image'
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file field required' }, { status: 400 })
  }

  const ext = ALLOWED.get(file.type)
  if (!ext) {
    return NextResponse.json(
      { error: 'Format non supporté. Formats autorisés : webp, png, jpg.' },
      { status: 400 },
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'Fichier trop volumineux. Taille maximum : 2 Mo.' },
      { status: 400 },
    )
  }

  // Écrit dans public/uploads/blog/ (volume persistant monté sur Coolify)
  // pour que les uploads survivent aux redeploys. Les 26 images originales
  // restent sous public/images/blog/ (immuables, dans l'image Docker).
  const dir = join(process.cwd(), 'public', 'uploads', 'blog')
  await mkdir(dir, { recursive: true })

  const stem = safeStem(file.name || 'image')
  let filename = `${stem}.${ext}`
  let counter = 2
  while (await fileExists(join(dir, filename))) {
    filename = `${stem}-${counter}.${ext}`
    counter++
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  await writeFile(join(dir, filename), bytes)

  const url = `${SITE_URL}/uploads/blog/${filename}`
  return NextResponse.json({ url, filename }, { status: 201 })
}
