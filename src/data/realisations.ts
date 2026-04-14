export interface Realisation {
  id: number
  nom: string
  metier: string
  ville: string
  description: string
  tags: string[]
  // TODO: Remplacer les images placeholder par les vraies captures d'écran des sites
  // TODO: Ajouter les vraies réalisations clients ici (avec accord écrit du client)
  image: string
  // TODO: Remplacer href par l'URL du site client
  href: string
  couleur: string
}

export const realisations: Realisation[] = [
  {
    id: 1,
    nom: 'Plomberie Marchetti',
    metier: 'Plombier-chauffagiste',
    ville: 'Lyon 69',
    description:
      'Site vitrine 5 pages avec formulaire de devis. Référencement local sur "plombier Lyon 3e" — page 1 Google en 4 mois.',
    tags: ['Vitrine', 'Devis en ligne', 'SEO local'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Plomberie+Marchetti',
    href: '#', // TODO: URL du site client
    couleur: '#3B82F6',
  },
  {
    id: 2,
    nom: 'Atelier Renard Coiffure',
    metier: 'Coiffure indépendante',
    ville: 'Bordeaux 33',
    description:
      'Site avec galerie photo, prise de RDV en ligne et présentation des prestations. +40% de nouveaux clients en 6 mois.',
    tags: ['RDV en ligne', 'Galerie', 'Instagram'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Atelier+Renard',
    href: '#', // TODO: URL du site client
    couleur: '#EC4899',
  },
  {
    id: 3,
    nom: 'Électricité Fontaine',
    metier: 'Électricien',
    ville: 'Nantes 44',
    description:
      'Site vitrine avec portfolio de chantiers, certificats RGE mis en avant et formulaire de contact optimisé.',
    tags: ['Vitrine', 'Portfolio', 'RGE'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Electricit%C3%A9+Fontaine',
    href: '#', // TODO: URL du site client
    couleur: '#F59E0B',
  },
  {
    id: 4,
    nom: 'Boulangerie Au Pain d\'Antan',
    metier: 'Artisan boulanger',
    ville: 'Rennes 35',
    description:
      'Site vitrine avec carte des produits, horaires dynamiques et intégration Google Maps. Classé 1er sur "boulangerie bio Rennes".',
    tags: ['Vitrine', 'Menu', 'Google Maps'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Boulangerie+Au+Pain',
    href: '#', // TODO: URL du site client
    couleur: '#92400E',
  },
  {
    id: 5,
    nom: 'Maçonnerie Dubois & Fils',
    metier: 'Maçon',
    ville: 'Toulouse 31',
    description:
      'Site vitrine avec avant/après en galerie, témoignages clients et devis en ligne. Génère 5 à 8 demandes de devis par mois.',
    tags: ['Galerie avant/après', 'Devis', 'Témoignages'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Ma%C3%A7onnerie+Dubois',
    href: '#', // TODO: URL du site client
    couleur: '#6B7280',
  },
  {
    id: 6,
    nom: 'Restaurant Le Vieux Four',
    metier: 'Restaurateur',
    ville: 'Marseille 13',
    description:
      'Site avec menu complet, réservation en ligne et photos professionnelles. 200 visiteurs/mois depuis le lancement.',
    tags: ['Réservation', 'Menu', 'Photos pro'],
    image: 'https://placehold.co/800x500/E8DDD0/7A6E63?text=Restaurant+Le+Vieux+Four',
    href: '#', // TODO: URL du site client
    couleur: '#DC2626',
  },
]
