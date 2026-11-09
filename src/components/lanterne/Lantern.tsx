// Illustration du hero, reprise des maquettes. Décorative.
// Seule animation du site : flottement, balancier depuis l'anneau, flamme qui
// vacille en restant d'aplomb, lueur qui respire. Tout est coupé si
// prefers-reduced-motion (voir globals.css).

type LanternSvgProps = {
  id: string
  width: number
  height: number
  ringStroke: number
  bodyStroke: number
  detailed: boolean
}

function LanternSvg({ id, width, height, ringStroke, bodyStroke, detailed }: LanternSvgProps) {
  return (
    <svg
      className="lt-flotte relative overflow-visible"
      width={width}
      height={height}
      viewBox="0 0 200 286"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0%" stopColor="#F08A4B" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F08A4B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-lueur`}>
          <stop offset="0%" stopColor="#F08A4B" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#F08A4B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F08A4B" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-papier`}>
          <rect x="60" y="62" width="80" height="142" />
        </clipPath>
      </defs>

      <g className="lt-balance">
        <circle className="lt-lueur" cx="100" cy="132" r="110" fill={`url(#${id}-halo)`} />
        <circle cx="100" cy="18" r="12" fill="none" stroke="#17212E" strokeWidth={ringStroke} />
        <polygon points="66,34 134,34 148,58 52,58" fill="#17212E" />
        <rect x="56" y="58" width="88" height="150" fill="#F6E3D3" stroke="#B4501C" strokeWidth={bodyStroke} />
        <rect x="74" y="96" width="52" height="74" fill="#F3D2BC" />
        <g clipPath={`url(#${id}-papier)`}>
          <circle className="lt-lueur" cx="100" cy="132" r="72" fill={`url(#${id}-lueur)`} />
        </g>
        <g className="lt-aplomb">
          <g className="lt-flamme">
            <rect x="90" y="114" width="20" height="34" rx="10" fill="#B4501C" />
            {detailed && (
              <rect className="lt-coeur" x="95" y="124" width="10" height="18" rx="5" fill="#F08A4B" />
            )}
          </g>
        </g>
        <polygon points="52,208 148,208 136,230 64,230" fill="#17212E" />
      </g>
    </svg>
  )
}

export function LanternDesktop() {
  return (
    <div aria-hidden="true" className="relative flex min-h-[440px] items-center justify-center">
      <LanternSvg id="lt-d" width={210} height={300} ringStroke={6} bodyStroke={7} detailed />
      <svg
        className="absolute bottom-2"
        width="160"
        height="20"
        viewBox="0 0 160 20"
        focusable="false"
      >
        <ellipse className="lt-ombre" cx="80" cy="10" rx="70" ry="8" fill="#17212E" opacity="0.08" />
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
      <LanternSvg id="lt-m" width={66} height={96} ringStroke={8} bodyStroke={9} detailed={false} />
    </div>
  )
}
