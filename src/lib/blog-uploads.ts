import { join } from 'node:path'
import { stat } from 'node:fs/promises'

// Dossier des images envoyées depuis l'admin. Il reste sous public/ car c'est
// là qu'est monté le volume persistant Coolify. Next.js ne sert pas les
// fichiers ajoutés à public/ après le démarrage : ils sont donc servis par
// src/app/uploads/blog/[filename]/route.ts.
export const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'blog')
export const UPLOAD_URL_PREFIX = '/uploads/blog/'

export const UPLOAD_FILENAME_RE = /^[a-z0-9][a-z0-9-]{0,120}\.(webp|png|jpg)$/

export const MIME_BY_EXT: Record<string, string> = {
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
}

export interface ImageSize {
  width: number
  height: number
}

const sizeCache = new Map<string, ImageSize | null>()

/**
 * Dimensions réelles d'une image du site (public/images/… ou uploads),
 * pour des balises og:image / JSON-LD exactes. Renvoie null pour une image
 * externe ou illisible.
 */
export async function getLocalImageSize(src: string): Promise<ImageSize | null> {
  const path = localPathFor(src)
  if (!path) return null

  let key: string
  try {
    const s = await stat(path)
    key = `${path}:${s.mtimeMs}`
  } catch {
    return null
  }
  if (sizeCache.has(key)) return sizeCache.get(key)!

  let size: ImageSize | null = null
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(path).metadata()
    if (meta.width && meta.height) size = { width: meta.width, height: meta.height }
  } catch {
    size = null
  }
  sizeCache.set(key, size)
  return size
}

function localPathFor(src: string): string | null {
  let pathname: string
  try {
    const u = new URL(src, 'http://local')
    if (u.host !== 'local' && !/(^|\.)creation-sites-godino\.fr$/.test(u.hostname)) return null
    pathname = decodeURIComponent(u.pathname)
  } catch {
    return null
  }

  if (pathname.startsWith(UPLOAD_URL_PREFIX)) {
    const name = pathname.slice(UPLOAD_URL_PREFIX.length)
    return UPLOAD_FILENAME_RE.test(name) ? join(UPLOAD_DIR, name) : null
  }
  if (/^\/images\/[a-z0-9/_-]+\.(webp|png|jpe?g)$/i.test(pathname) && !pathname.includes('..')) {
    return join(process.cwd(), 'public', pathname)
  }
  return null
}
