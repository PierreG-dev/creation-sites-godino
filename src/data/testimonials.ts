// Avis Google réels, cités sans retouche. N'ajouter ici qu'un avis publié sur
// la fiche Google (voir GOOGLE_REVIEWS dans src/lib/site.ts).
export interface Testimonial {
  id: number
  name: string
  context: string
  text: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Florian Fabre',
    context: 'Fabricant de cosmétiques, Graulhet (81). Mars 2025',
    text: "Un site internet réalisé avec professionnalisme, très facile d'utilisation. Le rendu est parfait et la clientèle a pu commander mes produits sans difficulté. Je recommande Pierre pour la création de vos sites internet.",
  },
  {
    id: 2,
    name: 'SARL Garage Brincat',
    context: 'Concessionnaire automobile, Castelsarrasin (82). Février 2026',
    text: `Je suis pas du tout informatique, j'avais peur que ce soit compliqué. Ça l'a pas été. Pierre a assuré du début à la fin, toujours disponible quand j'avais une question, même bête.

Le site est nickel, mes clients le trouvent facilement et ça fait pro. C'est tout ce que je demandais.

Un vrai bon boulot, je recommande.`,
  },
  {
    id: 3,
    name: 'Dr Misino',
    context: 'Médecin stomatologue, Agen (47). Juin 2025',
    text: `Le site est top mais honnêtement c'est le suivi qui m'a vraiment surpris. J'ai pu rajouter après coup une page de réponses aux questions que mes patients me posent tout le temps, ça a été fait vite et sans prise de tête.

On travaille toujours ensemble et franchement c'est cool. Pas juste une livraison et au revoir. Je recommande.`,
  },
]
