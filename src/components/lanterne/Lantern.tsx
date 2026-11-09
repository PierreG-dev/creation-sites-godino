// Illustration du hero. Décorative.
// Le corps reprend le symbole du logo (cadre orange, fenêtre décalée), étiré en
// hauteur, avec un toit et un socle en gradins. La flamme en goutte est la
// seule courbe du dessin.
// Seule animation du site : flottement, balancier depuis l'anneau, flamme qui
// vacille en restant d'aplomb, lueur qui respire. Tout est coupé si
// prefers-reduced-motion (voir globals.css).

const ENCRE = '#17212E'

type LanternSvgProps = {
  id: string
  width: number
  height: number
  ringStroke: number
  bodyStroke: number
}

function LanternSvg({ id, width, height, ringStroke, bodyStroke }: LanternSvgProps) {
  return (
    <svg
      className="lt-flotte relative overflow-visible"
      width={width}
      height={height}
      viewBox="0 0 200 232"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0%" stopColor="#F08A4B" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F08A4B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-lueur`}>
          <stop offset="0%" stopColor="#F08A4B" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#F08A4B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F08A4B" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-papier`}>
          <rect x="58" y="80" width="84" height="104" />
        </clipPath>
      </defs>

      <g className="lt-balance">
        <circle className="lt-lueur" cx="100" cy="132" r="115" fill={`url(#${id}-halo)`} />

        {/* Anneau et toit en gradins */}
        <rect x="91" y="22" width="18" height="18" fill="none" stroke={ENCRE} strokeWidth={ringStroke} />
        <rect x="96" y="40" width="8" height="10" fill={ENCRE} />
        <rect x="80" y="50" width="40" height="8" fill={ENCRE} />
        <rect x="64" y="58" width="72" height="8" fill={ENCRE} />
        <rect x="48" y="66" width="104" height="8" fill={ENCRE} />

        {/* Corps : le symbole du logo */}
        <rect x="54" y="76" width="92" height="112" fill="#F6E3D3" stroke="#B4501C" strokeWidth={bodyStroke} />
        <rect x="70" y="92" width="44" height="62" fill="#E8DDD0" />
        <g clipPath={`url(#${id}-papier)`}>
          <circle className="lt-lueur" cx="92" cy="128" r="66" fill={`url(#${id}-lueur)`} />
        </g>

        {/* Bec et flamme */}
        <rect x="85" y="148" width="14" height="6" fill={ENCRE} />
        <g className="lt-aplomb">
          <g className="lt-flamme">
            <path
              d="M92,106 C100,118 104,126 104,134 A12,12 0 0 1 80,134 C80,126 84,118 92,106 Z"
              fill="#B4501C"
            />
            <path
              className="lt-coeur"
              d="M92,121 C96,128 98,131 98,136 A6,6 0 0 1 86,136 C86,131 88,128 92,121 Z"
              fill="#F08A4B"
            />
          </g>
        </g>

        {/* Socle en gradins */}
        <rect x="48" y="190" width="104" height="8" fill={ENCRE} />
        <rect x="64" y="198" width="72" height="8" fill={ENCRE} />
        <rect x="80" y="206" width="40" height="8" fill={ENCRE} />
      </g>
    </svg>
  )
}

export function LanternDesktop() {
  return (
    <div aria-hidden="true" className="relative flex min-h-[440px] items-center justify-center">
      <LanternSvg id="lt-d" width={220} height={255} ringStroke={6} bodyStroke={7} />
      <svg
        className="absolute bottom-2"
        width="160"
        height="20"
        viewBox="0 0 160 20"
        focusable="false"
      >
        <ellipse className="lt-ombre" cx="80" cy="10" rx="70" ry="8" fill={ENCRE} opacity="0.08" />
      </svg>
    </div>
  )
}

export function LanternMobile() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[14px] top-[18px] flex h-[120px] w-[96px] justify-center"
    >
      <LanternSvg id="lt-m" width={78} height={90} ringStroke={8} bodyStroke={9} />
    </div>
  )
}
