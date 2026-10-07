import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { verifyAdminToken } from '@/lib/blog-auth'
import { SITE_URL } from '@/lib/site'
import { UPLOAD_DIR, UPLOAD_URL_PREFIX } from '@/lib/blog-uploads'

export const runtime = 'nodejs'

const MAX_BYTES = 2 * 1024 * 1024 // 2 Mo
const ALLOWED = new Map<string, string>([
  ['image/webp', 'webp'],
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/jpg', 'jpg'],
])

// Format des covers : 16:9, comme les images d'origine (1200×675) et les
// emplacements d'affichage (aspect-[16/9]). 1600 px de large couvre l'écran
// retina de la page article et dépasse les 1200 px exigés par Google Discover.
const COVER_MAX_WIDTH = 1600
const COVER_RATIO = 16 / 9
const MIN_RECOMMENDED_WIDTH = 1200

interface ProcessedImage {
  bytes: Buffer
  ext: string
  width?: number
  height?: number
}

// Recadre au centre en 16:9 (identique au rendu object-cover actuel), réduit
// à 1600 px max, convertit en WebP et retire les métadonnées EXIF.
// Si sharp est indisponible, le fichier original est conservé tel quel.
async function processCover(input: Buffer, fallbackExt: string): Promise<ProcessedImage> {
  try {
    const sharp = (await import('sharp')).default
    const rotated = sharp(input, { failOn: 'error' }).rotate()
    const { data: normalized, info } = await rotated.toBuffer({ resolveWithObject: true })

    const width = Math.min(COVER_MAX_WIDTH, info.width, Math.floor(info.height * COVER_RATIO))
    const height = Math.round(width / COVER_RATIO)

    const bytes = await sharp(normalized)
      .resize(width, height, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82, effort: 5 })
      .toBuffer()
    return { bytes, ext: 'webp', width, height }
  } catch (err) {
    console.error('[upload] optimisation impossible, fichier original conservé :', err)
    return { bytes: input, ext: fallbackExt }
  }
}

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
  const dir = UPLOAD_DIR
  await mkdir(dir, { recursive: true })

  const image = await processCover(Buffer.from(await file.arrayBuffer()), ext)

  // Nom de fichier = slug de l'article quand il est fourni (meilleur signal
  // pour Google Images), sinon le nom du fichier envoyé.
  const slug = form.get('slug')
  const stem = safeStem((typeof slug === 'string' && slug.trim()) || file.name || 'image')
  let filename = `${stem}.${image.ext}`
  let counter = 2
  while (await fileExists(join(dir, filename))) {
    filename = `${stem}-${counter}.${image.ext}`
    counter++
  }

  await writeFile(join(dir, filename), image.bytes)

  const url = `${SITE_URL}${UPLOAD_URL_PREFIX}${filename}`
  const warning =
    image.width && image.width < MIN_RECOMMENDED_WIDTH
      ? `Image petite (${image.width}×${image.height}). Pour le SEO, visez au moins ${MIN_RECOMMENDED_WIDTH} px de large.`
      : undefined
  return NextResponse.json(
    { url, filename, width: image.width, height: image.height, warning },
    { status: 201 },
  )
}
