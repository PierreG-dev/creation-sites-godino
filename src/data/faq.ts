export interface FAQ {
  id: number
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Qu'est-ce qui est compris dans le mensuel ?",
    answer:
      "L'hébergement, le nom de domaine, le certificat HTTPS, les sauvegardes chaque jour, les mises à jour, la sécurité et le référencement de base. Les modifications sont comprises aussi, à volonté, dans la limite du raisonnable. Le mensuel est de 100 €/mois. Il est actuellement à 50 €/mois pour tous. La création du site est offerte. Elle n'est pas comprise dans le mensuel.",
  },
  {
    id: 2,
    question: "Que se passe-t-il si je veux arrêter ?",
    answer:
      "Il n'y a pas d'engagement de durée. Vous arrêtez quand vous voulez. Si vous ne gardez pas le site, vous ne devez rien. Vous m'envoyez votre demande depuis la messagerie de votre espace client. Je la traite moi-même pour que tout soit en ordre. Le site est hébergé sur mon infrastructure, donc à l'arrêt il est mis hors ligne. Je vous rends sous 30 jours vos contenus (textes, photos, logos que vous m'avez confiés). Sur demande, je vous envoie aussi un export des données collectées par le site (contacts du formulaire, etc.). Le nom de domaine est enregistré et géré par mes soins. Il ne fait pas partie de ce qui est transféré, sauf s'il reprend une marque que vous avez déposée à l'INPI avant de démarrer. Dans ce cas, vous pouvez en demander le transfert à vos frais.",
  },
  {
    id: 3,
    question: 'Comment se passe la livraison en 7 jours ?',
    answer:
      "Jour 1-2 : on se parle 15 minutes pour que je comprenne votre activité. Je vous pose les questions essentielles et je collecte vos informations (logo, photos, textes si vous en avez). Jour 3-5 : je crée votre site. Jour 6 : vous recevez un lien de prévisualisation. Vous me dites si vous voulez changer quelque chose. Jour 7 : votre site est en ligne. Si vous n'avez ni photos ni textes, je m'en charge.",
  },
  {
    id: 4,
    question: 'Est-ce que je peux modifier mon site moi-même ?',
    answer:
      "Non, et c'est voulu. Vous me demandez, je fais. Vous m'envoyez votre demande depuis votre espace client : un texte à mettre à jour, une photo à remplacer, des horaires ou des tarifs à changer. Je l'exécute sous 48h ouvrées. Les modifications sont comprises dans le mensuel, à volonté, dans la limite du raisonnable. Pour une demande plus lourde (nouvelle page, refonte, nouvelle fonctionnalité, intégration d'un outil externe), je vous fais un devis à part et vous décidez.",
  },
  {
    id: 5,
    question: 'Est-ce que mon site sera bien positionné sur Google ?',
    answer:
      "Le référencement de base est compris dans le mensuel. Dès la livraison, votre site est préparé pour les recherches locales de votre activité (ex : \"plombier Montauban\", \"coiffeuse Castelsarrasin\"). Le référencement prend en général 3 à 6 mois pour s'installer.",
  },
  {
    id: 6,
    question: 'Y a-t-il un système de parrainage ?',
    answer:
      "Oui. Chaque client que vous me recommandez fait baisser votre mensuel. Il peut descendre jusqu'à 0 €. La baisse s'applique dès que la personne recommandée devient cliente active. Signalez-moi simplement la recommandation quand elle me contacte.",
  },
]
