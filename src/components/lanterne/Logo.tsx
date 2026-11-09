import Link from 'next/link'

interface LogoMarkProps {
  sombre?: boolean
  className?: string
}

// Symbole seul. Version claire (fond crème) ou sombre (fond encre).
export function LogoMark({ sombre = false, className = '' }: LogoMarkProps) {
  const trait = sombre ? '#E07033' : '#B4501C'
  const fenetre = sombre ? '#2A3544' : '#E8DDD0'
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className}>
      <rect x="12" y="12" width="76" height="76" fill="none" stroke={trait} strokeWidth="5" />
      <rect x="26" y="26" width="36" height="36" fill={fenetre} />
      <rect x="38" y="38" width="14" height="14" fill={trait} />
    </svg>
  )
}

// Nom + sous-titre. "Lanterne" en 800, "Web" en 500.
export function LogoText({ sombre = false }: { sombre?: boolean }) {
  return (
    <span className="flex flex-col leading-[1.1]">
      <span className="text-[20px] font-extrabold tracking-titre-2 sm:text-[22px]">
        Lanterne <span className="font-medium">Web</span>
      </span>
      <span className={`text-[13px] ${sombre ? 'text-gris-clair' : 'text-gris'}`}>
        Création de sites
      </span>
    </span>
  )
}

export function Logo({ sombre = false }: { sombre?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex min-h-[44px] items-center gap-[10px] no-underline sm:gap-3 ${
        sombre ? 'text-creme hover:text-creme' : 'text-encre hover:text-encre'
      }`}
    >
      <LogoMark sombre={sombre} className="h-[34px] w-[34px] shrink-0 sm:h-10 sm:w-10" />
      <LogoText sombre={sombre} />
    </Link>
  )
}
