export interface Realisation {
  slug: string
  nom: string
  // Métier et ville, tels qu'affichés sous le nom.
  contexte: string
  description: string
  // Lien vers le site en ligne. Absent si le site n'est plus en ligne.
  href?: string
  horsLigne?: boolean
  // Capture du site (public/images/realisations). Sans capture, un
  // emplacement "Capture du site" est affiché.
  capture?: string
}

export const realisations: Realisation[] = [
  {
    slug: 'garage-brincat',
    nom: 'Garage Brincat',
    contexte: 'Garagiste, Castelsarrasin (82)',
    description:
      'Services du garage, véhicules disponibles, formulaire de demande de rendez-vous.',
    href: 'https://sarlgaragebrincat.fr',
    capture: '/images/realisations/garage-brincat.webp',
  },
  {
    slug: 'dr-misino',
    nom: 'Dr Jérôme Misino',
    contexte: 'Médecin, Agen (47)',
    description: 'Site vitrine avec un espace où les patients posent leurs questions.',
    href: 'https://dr-misino-orthodontie-agen.fr',
    capture: '/images/realisations/dr-misino.webp',
  },
  {
    slug: 'ab-nature',
    nom: 'AB Nature',
    contexte: 'Cosmétiques artisanaux, Graulhet (81)',
    description: 'Boutique en ligne avec catalogue et gestion des commandes.',
    horsLigne: true,
    capture: '/images/realisations/ab-nature.webp',
  },
]

export function getRealisation(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug)
}
