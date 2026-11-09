import Link from 'next/link'
import type { ComponentType, ReactNode, SVGProps } from 'react'
import { ArrowRight, Star } from 'lucide-react'
import { GOOGLE_REVIEWS } from '@/lib/site'

// Mot en couleur d'un titre sur fond clair.
export function Eclaire({ children }: { children: ReactNode }) {
  return <span className="mot-eclaire">{children}</span>
}

// Mot en couleur d'un titre sur fond encre (pas de fond éclairé).
export function EclaireSombre({ children }: { children: ReactNode }) {
  return <span className="text-orange-clair">{children}</span>
}

// En-tête de section : titre + sous-titre. Aligné à gauche sur mobile,
// centré à partir de 640 px (comme les maquettes).
export function SectionTitle({
  title,
  subtitle,
  sombre = false,
  as: Tag = 'h2',
  center = true,
}: {
  title: ReactNode
  subtitle?: ReactNode
  sombre?: boolean
  as?: 'h1' | 'h2'
  center?: boolean
}) {
  return (
    <>
      <Tag
        className={`m-0 text-[28px] font-extrabold leading-[1.15] tracking-titre-2 sm:text-[40px] ${
          center ? 'sm:text-center' : ''
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={`mt-[10px] sm:mt-[14px] sm:text-[19px] ${center ? 'sm:text-center' : ''} ${
            sombre ? 'text-gris-clair' : 'text-gris'
          }`}
        >
          {subtitle}
        </p>
      )}
    </>
  )
}

type Variant = 'primaire' | 'clair' | 'contour'

const VARIANTS: Record<Variant, string> = {
  primaire: 'bg-orange text-blanc hover:bg-orange-fonce hover:text-blanc',
  clair: 'bg-creme text-encre hover:bg-blanc hover:text-encre',
  contour: 'border-2 border-encre text-encre hover:bg-encre hover:text-creme',
}

// Lien en forme de bouton. Plein largeur sur mobile si `bloc`.
export function ButtonLink({
  href,
  children,
  variant = 'primaire',
  bloc = false,
  fleche = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: Variant
  bloc?: boolean
  fleche?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center gap-[10px] rounded-md px-[26px] py-4 text-[18px] font-semibold leading-tight no-underline ${
        VARIANTS[variant]
      } ${bloc ? 'flex w-full sm:inline-flex sm:w-auto' : ''} ${className}`}
    >
      {children}
      {fleche && <ArrowRight aria-hidden="true" className="hidden h-5 w-5 sm:block" strokeWidth={2} />}
    </Link>
  )
}

// Tuile d'icône : 48 px, fond blanc, bordure beige, icône encre 24 px.
export function IconTile({
  icon: Icon,
  fond = 'blanc',
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  fond?: 'blanc' | 'creme'
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded border border-beige ${
        fond === 'blanc' ? 'bg-blanc' : 'bg-creme'
      }`}
    >
      <Icon aria-hidden="true" width={24} height={24} strokeWidth={2} color="#17212E" />
    </span>
  )
}

// Numéro d'étape en fenêtre : éteinte, à moitié allumée, allumée.
export function StepWindow({ n, petite = false }: { n: 1 | 2 | 3; petite?: boolean }) {
  const etat =
    n === 1
      ? 'bg-encre-2 text-creme'
      : n === 2
        ? 'bg-fenetre-mi text-creme'
        : 'bg-orange-clair text-encre'
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border-2 border-orange-clair font-extrabold ${etat} ${
        petite ? 'h-9 w-9' : 'h-9 w-9 sm:h-10 sm:w-10'
      }`}
    >
      {n}
    </span>
  )
}

// Note Google : étoiles + texte, lien vers la fiche.
export function GoogleRating({ className = '' }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS.url}
      className={`inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-encre no-underline hover:text-encre ${className}`}
    >
      <span className="inline-flex gap-[2px] text-orange" role="img" aria-label="5 étoiles sur 5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden="true" width={18} height={18} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      {GOOGLE_REVIEWS.note}/5 sur Google, {GOOGLE_REVIEWS.nombre} avis
    </a>
  )
}
