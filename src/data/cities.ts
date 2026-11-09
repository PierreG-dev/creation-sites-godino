// Pages /creation-site-internet/[ville]. Un seul gabarit, alimenté ici.
//
// Ne jamais dupliquer un même contenu en changeant uniquement le nom de ville :
// chaque page a son introduction propre, et affiche ce qui la concerne
// (réalisation, avis, article de blog) quand cela existe.

export interface CityPage {
  slug: string
  name: string
  departement: string // numéro, ex. "82"
  published: boolean
  // Introduction propre à la ville. Si null, un TODO est affiché sur la page.
  intro: string | null
  realisation?: string // slug dans src/data/realisations.ts
  testimonial?: number // id dans src/data/testimonials.ts
  articles?: string[] // slugs d'articles du blog
}

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'montauban',
    name: 'Montauban',
    departement: '82',
    published: true,
    intro: "À Montauban, beaucoup de clients cherchent un artisan ou un commerce sur leur téléphone avant de se déplacer, en centre-ville comme dans les communes autour : Montech, Lafrançaise, Nègrepelisse. Un site clair, avec vos services, vos horaires et un numéro qui s'appelle d'un geste, leur donne ce qu'ils cherchent. Je le crée, je l'héberge et je le tiens à jour pendant que vous travaillez.",
    // Le blog n'a pas d'article sur les garages : les deux articles retenus
    // parlent des commerces. Un slug absent du blog est ignoré à l'affichage.
    articles: [
      'ouvrir-un-commerce-local-pourquoi-votre-site-internet-doit-preceder-votre-inauguration',
      'site-internet-pour-boulangerie-ou-commerce-alimentaire-attirer-plus-de-clients',
    ],
  },
  {
    slug: 'castelsarrasin',
    name: 'Castelsarrasin',
    departement: '82',
    published: true,
    intro: "Castelsarrasin, sous-préfecture du Tarn-et-Garonne, compte des garages, des artisans et des commerces qui vivent de leur clientèle locale. C'est pour un garage de Castelsarrasin que j'ai créé le site présenté plus bas : ses services, ses véhicules disponibles et un formulaire pour demander un rendez-vous. Votre site peut suivre le même principe, adapté à votre métier.",
    realisation: 'garage-brincat',
    testimonial: 2,
  },
  {
    slug: 'moissac',
    name: 'Moissac',
    departement: '82',
    published: true,
    intro: "Moissac reçoit chaque année des visiteurs venus pour l'abbaye Saint-Pierre et son cloître, et vit aussi de ses producteurs, dont ceux du chasselas. Pour un commerce, un restaurant, un hébergement ou une exploitation, le site doit répondre vite à ceux qui ne connaissent pas encore la ville : où vous trouver, quand vous êtes ouvert, comment vous joindre. Je le mets en place, puis je l'entretiens chaque mois.",
  },
  {
    slug: 'albi',
    name: 'Albi',
    departement: '81',
    published: true,
    intro: "À Albi, la cité épiscopale, inscrite au patrimoine mondial de l'Unesco, attire des visiteurs qui choisissent souvent leur restaurant ou leur boutique depuis leur téléphone. Les artisans et indépendants de l'agglomération travaillent, eux, avec des habitués qui vérifient un numéro ou des horaires sur Google. Un site à jour sert ces deux publics, et c'est moi qui fais les mises à jour.",
  },
  {
    slug: 'agen',
    name: 'Agen',
    departement: '47',
    published: true,
    intro: "Agen, préfecture du Lot-et-Garonne, compte des professions libérales, des commerces et des artisans qui ont besoin d'être trouvés en ligne. J'y ai créé le site d'un médecin, avec un espace où les patients posent leurs questions. C'est un exemple de ce qu'un site peut faire en plus d'une page de présentation.",
    realisation: 'dr-misino',
    testimonial: 3,
  },
  {
    slug: 'cahors',
    name: 'Cahors',
    departement: '46',
    published: true,
    intro: "Cahors, préfecture du Lot, est connue pour le pont Valentré et pour son vin. Domaines, caves, restaurants, hébergements et artisans y reçoivent des clients venus de loin comme des clients du quartier. Votre site leur dit ce que vous proposez et comment vous joindre, et je le tiens à jour pour vous chaque mois.",
  },
]

export function getPublishedCityPages(): CityPage[] {
  return CITY_PAGES.filter((c) => c.published)
}

export function getCityPageBySlug(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug)
}

export function cityTitle(c: CityPage): string {
  return `Création de site internet à ${c.name} (${c.departement})`
}

export function cityDescription(c: CityPage, mensuel: number): string {
  return `Je crée des sites pour les entreprises de ${c.name}. Création offerte, puis ${mensuel} € par mois : hébergement, nom de domaine, sauvegardes et modifications compris.`
}
