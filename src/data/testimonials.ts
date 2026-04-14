export interface Testimonial {
  id: number
  name: string
  role: string
  city: string
  avatar: string
  rating: number
  text: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marc Delaunay',
    role: 'Plombier-chauffagiste',
    city: 'Lyon (69)',
    avatar: 'MD',
    rating: 5,
    text: "Avant, mes clients me trouvaient uniquement par le bouche-à-oreille. Depuis que Pierre a créé mon site, j'ai au moins 3 nouveaux clients par mois qui viennent de Google. Et honnêtement, je n'ai rien eu à faire — j'ai juste répondu à ses questions, et le site était en ligne en moins d'une semaine.",
    date: 'Janvier 2024',
  },
  {
    id: 2,
    name: 'Sophie Renard',
    role: 'Coiffeuse indépendante',
    city: 'Bordeaux (33)',
    avatar: 'SR',
    rating: 5,
    text: "J'avais essayé de créer mon site toute seule sur Wix. Après 15 heures perdues, le résultat était vraiment pas terrible. Pierre a tout repris en 7 jours et le site est magnifique. Mes clientes me disent souvent qu'elles m'ont trouvée sur Google. Le 100€/mois, ça vaut largement le coup.",
    date: 'Mars 2024',
  },
  {
    id: 3,
    name: 'Thomas Fontaine',
    role: 'Électricien',
    city: 'Nantes (44)',
    avatar: 'TF',
    rating: 5,
    text: "Ce que j'apprécie le plus c'est de ne rien avoir à gérer. Pierre s'occupe des mises à jour, de la sécurité, du référencement. Moi je fais mon métier, lui il fait le sien. Quand j'ai besoin de changer quelque chose sur le site, j'envoie un WhatsApp et c'est fait dans la journée.",
    date: 'Avril 2024',
  },
]
