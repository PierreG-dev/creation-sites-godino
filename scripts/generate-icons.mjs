// Génère les icônes du site à partir de assets/favicon.svg et assets/logo.svg.
// Usage : node scripts/generate-icons.mjs
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const OUT = 'public/images/logos'
const favicon = await readFile('assets/favicon.svg')

const png = (size) => sharp(favicon, { density: 600 }).resize(size, size).png().toBuffer()

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
}
for (const [name, size] of Object.entries(sizes)) {
  await writeFile(`${OUT}/${name}`, await png(size))
}

await copyFile('assets/favicon.svg', `${OUT}/favicon.svg`)
await copyFile('assets/logo.svg', `${OUT}/logo.svg`)
await copyFile('assets/logo-fond-sombre.svg', `${OUT}/logo-fond-sombre.svg`)

// favicon.ico : conteneur ICO avec des images PNG 16, 32 et 48 px.
const icoSizes = [16, 32, 48]
const images = await Promise.all(icoSizes.map(png))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = 6 + 16 * images.length
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(icoSizes[i], 0)
  e.writeUInt8(icoSizes[i], 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(img.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += img.length
  return e
})
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...entries, ...images]))

console.log('Icônes générées.')
