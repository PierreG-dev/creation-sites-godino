import { NextRequest } from 'next/server'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { MIME_BY_EXT, UPLOAD_DIR, UPLOAD_FILENAME_RE } from '@/lib/blog-uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Sert les images uploadées depuis l'admin. Next.js ne sert que les fichiers
// présents dans public/ au démarrage du serveur : sans cette route, une image
// envoyée après le déploiement répondrait 404.
// Les noms de fichiers ne sont jamais réécrits (suffixe -2, -3… à l'upload),
// donc un cache "immutable" d'un an est sûr.
export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params
  if (!UPLOAD_FILENAME_RE.test(filename)) return notFound()

  const path = join(UPLOAD_DIR, filename)
  let info
  try {
    info = await stat(path)
    if (!info.isFile()) return notFound()
  } catch {
    return notFound()
  }

  const ext = filename.slice(filename.lastIndexOf('.') + 1)
  const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`
  const headers = new Headers({
    'Content-Type': MIME_BY_EXT[ext],
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Last-Modified': info.mtime.toUTCString(),
    ETag: etag,
    'X-Content-Type-Options': 'nosniff',
  })

  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers })
  }

  const body = await readFile(path)
  headers.set('Content-Length', String(body.length))
  return new Response(body, { status: 200, headers })
}

function notFound() {
  return new Response('Not found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
