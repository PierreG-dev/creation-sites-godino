// Vague en aplat entre deux sections de fonds différents.
// À n'utiliser que là où la couleur de fond change.

export type Fond = 'creme' | 'blanc' | 'encre' | 'orange'

const BG: Record<Fond, string> = {
  creme: 'bg-creme',
  blanc: 'bg-blanc',
  encre: 'bg-encre',
  orange: 'bg-orange',
}

const FILL: Record<Fond, string> = {
  creme: 'text-creme',
  blanc: 'text-blanc',
  encre: 'text-encre',
  orange: 'text-orange',
}

const PATHS = {
  // creux puis bosse
  a: 'M0 26 C 240 50 480 2 720 26 C 960 50 1200 2 1440 26 L 1440 48 L 0 48 Z',
  // bosse puis creux
  b: 'M0 26 C 240 2 480 50 720 26 C 960 2 1200 50 1440 26 L 1440 48 L 0 48 Z',
}

interface WaveProps {
  // Couleur de la section au-dessus.
  top: Fond
  // Couleur de la section en dessous.
  bottom: Fond
  sens?: 'a' | 'b'
  className?: string
}

export function Wave({ top, bottom, sens = 'a', className = '' }: WaveProps) {
  return (
    // -my-px + relative : la vague déborde d'1px sur les sections voisines
    // pour masquer le liseré dû à l'arrondi subpixel entre les fonds.
    <div aria-hidden="true" className={`${BG[top]} relative z-10 -my-px leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className={`block h-6 w-full sm:h-12 ${FILL[bottom]}`}
        focusable="false"
      >
        <path d={PATHS[sens]} fill="currentColor" />
      </svg>
    </div>
  )
}
