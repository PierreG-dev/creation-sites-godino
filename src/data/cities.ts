export interface CityFaqItem {
  question: string
  answer: string
}

export interface CityPage {
  slug: string
  name: string
  published: boolean
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  // Contenu principal en Markdown — rédigé à la main, pas de texte générique.
  body: string
  faq?: CityFaqItem[]
}

// IMPORTANT :
// - Toute page avec `published: false` est exclue du sitemap et du pied de page.
// - Ne jamais dupliquer un même contenu en changeant uniquement le nom de ville
//   (Google pénalise). Chaque page doit avoir un texte propre.
export const CITY_PAGES: CityPage[] = [
  {
    slug: 'montauban',
    name: 'Montauban',
    published: false, // À REMPLACER : passer à `true` quand le contenu sera finalisé.
    seoTitle: 'Création site internet Montauban | GODINO',
    metaDescription:
      'Création de sites internet professionnels à Montauban (82) pour artisans et TPE. Livré en 7 jours, hébergement et SEO inclus.',
    h1: 'Création de site internet à Montauban',
    intro:
      'À REMPLACER : brève accroche de 2 à 3 phrases qui parle vraiment du contexte local (quartiers, type d’activités, concurrence Google locale).',
    body: `## À REMPLACER : contexte local Montauban

Rédige ici 2 à 4 paragraphes propres au Tarn-et-Garonne : type d’artisans et TPE que tu accompagnes, spécificités du marché local, exemples (sans citer de clients sans accord), zones périphériques servies depuis Montauban.

## À REMPLACER : pourquoi un site pro à Montauban

Un ou deux paragraphes concrets : requêtes locales fréquentes, concurrence sur le centre-ville, importance du SEO local et de Google Business Profile.

## À REMPLACER : ce que je livre

Rappelle l’offre en 3 à 5 points, mais formulé pour Montauban (délai, périmètre, support local).
`,
    faq: [
      {
        question: 'À REMPLACER : Vous déplacez-vous à Montauban ?',
        answer:
          'À REMPLACER : réponse honnête (déplacement, visio, format téléphone).',
      },
    ],
  },
]

export function getPublishedCityPages(): CityPage[] {
  return CITY_PAGES.filter((c) => c.published)
}

export function getCityPageBySlug(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug)
}
