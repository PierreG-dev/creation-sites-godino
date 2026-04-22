export interface Realisation {
  id: number;
  nom: string;
  metier: string;
  ville: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  couleur: string;
  horsLigne?: boolean;
}

export const realisations: Realisation[] = [
  {
    id: 1,
    nom: "AB Nature",
    metier: "Fabricant de cosmétiques artisanaux",
    ville: "Graulhet (81)",
    description:
      "Site e-commerce complet avec catalogue produits, gestion des commandes en ligne et back-office pour le suivi des ventes.",
    tags: ["E-commerce", "Commandes en ligne", "Back-office", "SEO local"],
    image: "/images/realisations/abnature.png",
    href: "https://abnature.fr", // TODO: URL du site client
    couleur: "#3B82F6",
    horsLigne: true,
  },
  {
    id: 2,
    nom: "Dr Jérôme Misino",
    metier: "Médecin",
    ville: "Agen (47)",
    description:
      "Site vitrine avec espace sécurisé permettant aux patients de poser des questions sur leurs traitements, géré via une base de données dédiée.",
    tags: ["Vitrine", "Base de données", "Espace patient", "Sécurisé"],
    image: "/images/realisations/cabinet_misino.png",
    href: "https://dr-misino-orthodontie-agen.fr", // TODO: URL du site client
    couleur: "#10B981",
  },
  {
    id: 3,
    nom: "Garage Brincat",
    metier: "Garagiste",
    ville: "Castelsarrasin (82)",
    description:
      "Site vitrine présentant les services du garage, les véhicules disponibles et un formulaire de contact pour les demandes de rendez-vous.",
    tags: ["Vitrine", "Services", "Formulaire de contact"],
    image: "/images/realisations/garage_brincat.png",
    href: "https://sarlgaragebrincat.fr", // TODO: URL du site client
    couleur: "#F59E0B",
  },
  {
    id: 4,
    nom: "Formation Développement Web",
    metier: "Plateforme de formation",
    ville: "En ligne",
    description:
      "Plateforme de formation complète accompagnant les interventions en développement web : cours structurés, exercices pratiques et suivi des apprenants.",
    tags: ["Formation", "E-learning", "Développement web", "Suivi apprenants"],
    image: "/images/realisations/learn.png",
    href: "https://learn.pierre-godino.com", // TODO: URL de la plateforme
    couleur: "#8B5CF6",
  },
];
