import { ImageResponse } from 'next/og'

// Image de partage (Open Graph / Twitter), générée à la demande.
// Runtime edge : le runtime Node de @vercel/og échoue au build sous Windows.
// Polices : Figtree (SIL Open Font License), sous-ensemble latin.

export const runtime = 'edge'

export const alt = 'Lanterne Web, création de sites'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const [medium, extraBold] = await Promise.all([
    fetch(new URL('./_og/figtree-500.woff', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('./_og/figtree-800.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#FAF7F2',
          color: '#17212E',
          fontFamily: 'Figtree',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <svg width="180" height="180" viewBox="0 0 100 100">
            <rect x="12" y="12" width="76" height="76" fill="none" stroke="#B4501C" strokeWidth="5" />
            <rect x="26" y="26" width="36" height="36" fill="#E8DDD0" />
            <rect x="38" y="38" width="14" height="14" fill="#B4501C" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1 }}>
              Lanterne
              <span style={{ fontWeight: 500, marginLeft: 26 }}>Web</span>
            </div>
            <div style={{ display: 'flex', marginTop: 18, fontSize: 44, fontWeight: 500, color: '#5E6670' }}>
              Lanterne Web, création de sites
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 72, height: 8, width: 160, background: '#B4501C' }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Figtree', data: medium, weight: 500, style: 'normal' },
        { name: 'Figtree', data: extraBold, weight: 800, style: 'normal' },
      ],
    },
  )
}
