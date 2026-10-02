#!/usr/bin/env node
/* eslint-disable no-console */
// Script one-shot de nettoyage de la collection `articles`.
//
// Il effectue, dans l'ordre :
//   1. (DRY-RUN par défaut) liste les 16 doublons dont le slug finit par `-2`.
//   2. Les supprime quand on passe `--apply`.
//   3. Convertit les `\n` littéraux en vrais retours à la ligne.
//   4. Supprime le `# <titre>` dupliqué en tête du contenu.
//
// Usage :
//   node scripts/clean-blog.mjs              # dry-run, n'écrit rien
//   node scripts/clean-blog.mjs --apply      # applique les changements
//
// Nécessite MONGODB_URI dans l'environnement (ou dans .env à la racine).

import { MongoClient } from 'mongodb'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Petit loader .env minimal — on évite d'ajouter dotenv en dépendance.
function loadDotEnv() {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    const envPath = join(here, '..', '.env')
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // Pas de .env → on espère que MONGODB_URI est passé dans l'environnement.
  }
}

loadDotEnv()

const APPLY = process.argv.includes('--apply')
const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI manquant. Mets-le dans .env ou l\'environnement.')
  process.exit(1)
}

function fixContent(content) {
  // 1) Remplace les `\n` littéraux (2 caractères backslash + n) par de vrais retours.
  let cleaned = content.replace(/\\n/g, '\n')
  // 2) Supprime un éventuel `# <titre>\n\n` au début (le h1 est déjà rendu hors markdown).
  const idx = cleaned.indexOf('\n\n')
  if (cleaned.startsWith('# ') && idx > 0) {
    cleaned = cleaned.slice(idx + 2)
  }
  return cleaned
}

const client = new MongoClient(uri)

async function main() {
  await client.connect()
  const db = client.db()
  const col = db.collection('articles')

  console.log(`\n== Mode : ${APPLY ? 'APPLIQUE' : 'DRY-RUN (aucune écriture)'} ==`)

  // 1. Doublons -2
  const dupes = await col
    .find({ slug: { $regex: /-2$/ } }, { projection: { _id: 0, slug: 1, title: 1 } })
    .toArray()
  console.log(`\n[1] Doublons -2 : ${dupes.length}`)
  for (const d of dupes) console.log(`  - ${d.slug}`)

  if (APPLY && dupes.length > 0) {
    const res = await col.deleteMany({ slug: { $regex: /-2$/ } })
    console.log(`  -> supprimés : ${res.deletedCount}`)
  }

  // 2. Correction du content pour tous les articles restants.
  const all = await col.find({}, { projection: { _id: 0, id: 1, slug: 1, content: 1 } }).toArray()
  console.log(`\n[2] Articles à vérifier : ${all.length}`)

  let changed = 0
  for (const a of all) {
    const fixed = fixContent(a.content)
    if (fixed !== a.content) {
      changed++
      if (APPLY) {
        await col.updateOne(
          { id: a.id },
          { $set: { content: fixed, updated_at: new Date().toISOString() } },
        )
      }
    }
  }
  console.log(`  -> ${changed} article(s) à corriger ${APPLY ? '(écrits)' : '(dry-run)'}`)

  // 3. Audit final : plus aucun `\\n` littéral ni `# ` initial ?
  const afterCheck = await col
    .find({}, { projection: { _id: 0, slug: 1, content: 1 } })
    .toArray()
  const stillBad = afterCheck.filter(
    (a) => a.content.includes('\\n') || /^#\s/.test(a.content),
  )
  console.log(`\n[3] Reste à problème (post-opération en mémoire) : ${stillBad.length}`)
  for (const b of stillBad) console.log(`  - ${b.slug}`)

  await client.close()
  if (!APPLY) {
    console.log('\nRien n\'a été modifié. Relance avec --apply pour écrire.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
