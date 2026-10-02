#!/usr/bin/env node
/* eslint-disable no-console */
// One-shot : met à jour `cover_image` sur chaque article publié avec
// `https://www.creation-sites-godino.fr/images/blog/<slug>.webp`.
//
// Usage :
//   node scripts/set-blog-covers.mjs              # dry-run
//   node scripts/set-blog-covers.mjs --apply      # applique

import { MongoClient } from 'mongodb'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

function loadDotEnv() {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    const envPath = join(here, '..', '.env')
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim()
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}

loadDotEnv()

const APPLY = process.argv.includes('--apply')
const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI manquant.')
  process.exit(1)
}

const BASE = 'https://www.creation-sites-godino.fr/images/blog'

const client = new MongoClient(uri)

async function main() {
  await client.connect()
  const col = client.db().collection('articles')

  const published = await col
    .find(
      { status: 'published', published_at: { $ne: null } },
      { projection: { _id: 0, id: 1, slug: 1, cover_image: 1 } },
    )
    .toArray()

  console.log(`\n== Mode : ${APPLY ? 'APPLY' : 'DRY-RUN'} ==`)
  console.log(`Articles publiés : ${published.length}`)

  const now = new Date().toISOString()
  let updated = 0
  for (const a of published) {
    const next = `${BASE}/${a.slug}.webp`
    if (a.cover_image === next) {
      console.log(`  = ${a.slug} (déjà à jour)`)
      continue
    }
    console.log(`  → ${a.slug}`)
    if (APPLY) {
      await col.updateOne(
        { id: a.id },
        { $set: { cover_image: next, updated_at: now } },
      )
      updated++
    }
  }

  console.log(`\n${APPLY ? updated + ' article(s) écrit(s).' : 'Dry-run — rien n\'a été écrit.'}`)
  await client.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
