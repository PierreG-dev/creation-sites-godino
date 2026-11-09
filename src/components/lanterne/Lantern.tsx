// Illustration du hero, reprise des maquettes. Décorative.
// Seule animation du site (flottement de 6 s, coupé si prefers-reduced-motion).

export function LanternDesktop() {
  return (
    <div aria-hidden="true" className="relative flex min-h-[440px] items-center justify-center">
      <svg
        className="lt-flotte relative"
        width="210"
        height="300"
        viewBox="0 0 200 286"
        focusable="false"
      >
        <circle cx="100" cy="18" r="12" fill="none" stroke="#17212E" strokeWidth="6" />
        <polygon points="66,34 134,34 148,58 52,58" fill="#17212E" />
        <rect x="56" y="58" width="88" height="150" fill="#F6E3D3" stroke="#B4501C" strokeWidth="7" />
        <rect x="74" y="96" width="52" height="74" fill="#F3D2BC" />
        <rect x="90" y="114" width="20" height="34" rx="10" fill="#B4501C" />
        <rect x="95" y="124" width="10" height="18" rx="5" fill="#F08A4B" />
        <polygon points="52,208 148,208 136,230 64,230" fill="#17212E" />
      </svg>
      <svg
        className="absolute bottom-2"
        width="160"
        height="20"
        viewBox="0 0 160 20"
        focusable="false"
      >
        <ellipse cx="80" cy="10" rx="70" ry="8" fill="#17212E" opacity="0.08" />
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
      <svg
        className="lt-flotte relative"
        width="66"
        height="96"
        viewBox="0 0 200 286"
        focusable="false"
      >
        <circle cx="100" cy="18" r="12" fill="none" stroke="#17212E" strokeWidth="8" />
        <polygon points="66,34 134,34 148,58 52,58" fill="#17212E" />
        <rect x="56" y="58" width="88" height="150" fill="#F6E3D3" stroke="#B4501C" strokeWidth="9" />
        <rect x="74" y="96" width="52" height="74" fill="#F3D2BC" />
        <rect x="90" y="114" width="20" height="34" rx="10" fill="#B4501C" />
        <polygon points="52,208 148,208 136,230 64,230" fill="#17212E" />
      </svg>
    </div>
  )
}
