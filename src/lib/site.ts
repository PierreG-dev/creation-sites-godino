export const SITE_URL = 'https://www.creation-sites-godino.fr'

export const CITIES_SERVED = [
  'Montauban',
  'Toulouse',
  'Castelsarrasin',
  'Moissac',
  'Caussade',
  'Albi',
  'Agen',
  'Cahors',
] as const

export const SITE_NAME = 'GODINO - Création WEB'

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'GODINO - Création WEB : sites web professionnels pour artisans et TPE',
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
      url: `${SITE_URL}${path}`,
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
