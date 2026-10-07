// Génère public/og-image.png (1200×630) : image affichée lors des partages
// de liens (Facebook, LinkedIn, WhatsApp…). Lancer : node scripts/generate-og-image.mjs
import sharp from 'sharp'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF7F2"/>
  <rect x="0" y="0" width="1200" height="10" fill="#C8622A"/>

  <g transform="translate(90 90) scale(1.2)">
    <rect x="12" y="12" width="76" height="76" fill="none" stroke="#C8622A" stroke-width="2"/>
    <rect x="26" y="26" width="36" height="36" fill="#C8622A" opacity="0.13"/>
    <rect x="38" y="38" width="14" height="14" fill="#C8622A"/>
  </g>
  <text x="230" y="168" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="40" font-weight="700" fill="#1A1208" letter-spacing="2">GODINO</text>
  <text x="230" y="208" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="26" fill="#7A6E63">Création WEB</text>

  <text x="90" y="350" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="64" font-weight="700" fill="#1A1208">Votre site pro livré en 7 jours.</text>
  <text x="90" y="430" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="64" font-weight="700" fill="#C8622A">Vous ne touchez à rien.</text>

  <text x="90" y="540" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="30" fill="#7A6E63">Artisans &amp; TPE · 150 €/mois tout compris · Hébergement, SEO, maintenance</text>
  <text x="90" y="590" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="24" fill="#4A7C6F">creation-sites-godino.fr</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')
console.log('public/og-image.png généré')
