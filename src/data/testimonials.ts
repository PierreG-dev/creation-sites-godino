export interface Testimonial {
  id: number;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Fabre Florian",
    role: "Fabriquant de cosmétiques",
    city: "Graulhet (81)",
    avatar: "FF",
    rating: 5,
    text: "Un site internet réalisé avec professionnalisme, très facile d'utilisation. Le rendu est parfait et la clientèle a pu commander mes produits sans difficulté. Je recommande Pierre pour la création de vos sites internet.",
    date: "Mars 2025",
  },
  {
    id: 2,
    name: "SARL Garage BRINCAT",
    role: "Concessionnaire automobile",
    city: "Castelsarrasin (82)",
    avatar: "GB",
    rating: 5,
    text: `Je suis pas du tout informatique, j'avais peur que ce soit compliqué. Ça l'a pas été. [Prénom] a assuré du début à la fin, toujours disponible quand j'avais une question, même bête.

Le site est nickel, mes clients le trouvent facilement et ça fait pro. C'est tout ce que je demandais.

Un vrai bon boulot, je recommande.`,
    date: "Février 2026",
  },
  {
    id: 3,
    name: "Dr. Misino",
    role: "Médecin Stomatologue",
    city: "Agen (47)",
    avatar: "JM",
    rating: 5,
    text: `Le site est top mais honnêtement c'est le suivi qui m'a vraiment surpris. J'ai pu rajouter après coup une page de réponses aux questions que mes patients me posent tout le temps, ça a été fait vite et sans prise de tête.

On travaille toujours ensemble et franchement c'est cool. Pas juste une livraison et au revoir. Je recommande.`,
    date: "Juin 2025",
  },
];
