// Coordonnées et identité : source unique pour tout le site.
//
// Changement de domaine (lanterneweb.fr), au moment voulu, dans les variables
// d'environnement de Coolify (disponibles au build) :
//   SITE_URL=https://www.lanterneweb.fr
//   SITE_EMAIL=contact@lanterneweb.fr
//   REDIRECT_TO_NEW_DOMAIN=true   (voir next.config.mjs)
// puis relancer un build.

export const SITE_URL = (process.env.SITE_URL || 'https://www.creation-sites-godino.fr').replace(
  /\/+$/,
  '',
)

export const SITE_NAME = 'Lanterne Web'
export const SITE_TAGLINE = 'Création de sites'

export const CONTACT = {
  responsable: 'Pierre Godino',
  statut: 'entrepreneur individuel',
  siret: '850 759 762 00014',
  telephone: '07 57 69 06 71',
  telephoneHref: 'tel:+33757690671',
  telephoneIntl: '+33757690671',
  email: process.env.SITE_EMAIL || 'contact@creation-sites-godino.fr',
  delaiReponse: 'Sous 24h',
} as const

export const GOOGLE_REVIEWS = {
  url: 'https://share.google/28myp084LnBAvTD4m',
  note: 5,
  nombre: 3,
} as const

// Suit le domaine du site : gestion.lanterneweb.fr une fois SITE_URL basculé.
export const ESPACE_CLIENT_URL = SITE_URL.includes('lanterneweb.fr')
  ? 'https://gestion.lanterneweb.fr'
  : 'https://www.gestion.creation-sites-godino.fr'

export const ZONE_PHRASE =
  'Je crée des sites pour les entreprises de Montauban et du Tarn-et-Garonne.'

// Zones servies (JSON-LD areaServed).
export const AREA_SERVED = [
  { '@type': 'City', name: 'Montauban' },
  { '@type': 'AdministrativeArea', name: 'Tarn-et-Garonne' },
  { '@type': 'City', name: 'Albi' },
  { '@type': 'City', name: 'Agen' },
  { '@type': 'City', name: 'Cahors' },
  { '@type': 'Place', name: 'Nord de Toulouse' },
]

export const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Lanterne Web, création de sites',
}

// Open Graph + Twitter propres à une page. Nécessaire car un `openGraph` défini
// dans une page remplace entièrement celui du layout : sans ça, la page hérite
// du titre et de l'URL de l'accueil lors des partages.
export function pageSocialMetadata({
  path,
  title,
  description,
  images = [DEFAULT_OG_IMAGE],
}: {
  path: string
  title: string
  description: string
  images?: { url: string; width?: number; height?: number; alt?: string }[]
}) {
  return {
    openGraph: {
      type: 'website' as const,
      locale: 'fr_FR',
      siteName: SITE_NAME,
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: images.map((i) => i.url),
    },
  }
}
