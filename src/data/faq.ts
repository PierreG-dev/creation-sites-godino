export interface FAQ {
  id: number
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Qu'est-ce qui est inclus dans l'abonnement mensuel ?",
    answer:
      "Absolument tout : la création du site (sans frais initiaux), l'hébergement, un nom de domaine personnalisé (ex : votreentreprise.fr), la maintenance technique, les sauvegardes quotidiennes, le certificat SSL (le petit cadenas de sécurité), le référencement Google sur les mots-clés de votre activité, et le support via la messagerie de votre espace client. Le tarif standard est de 150 €/mois — et 100 €/mois pour les 10 premiers clients (offre lancement). L'abonnement comporte un engagement initial de 9 mois. Vous ne payez rien d'autre.",
  },
  {
    id: 2,
    question: "Que se passe-t-il si je veux arrêter l'abonnement ?",
    answer:
      "L'abonnement comporte un engagement initial de 9 mois — c'est ce qui me permet de garantir un référencement durable et un suivi sérieux dès le départ. Passé cette période, vous pouvez résilier à tout moment. Vous m'envoyez votre demande de résiliation via la messagerie de votre espace client, avec un préavis de 30 jours — la résiliation n'est pas automatisée, c'est moi qui la traite pour m'assurer que tout est en ordre (export de vos contenus, données RGPD, dernière facturation). La résiliation prend effet à l'échéance de votre période d'abonnement en cours. Le fonctionnement est celui d'un service tout-en-un : je crée, j'héberge et je gère votre site sur mon infrastructure, donc à l'arrêt le site est mis hors ligne — vous ne payez pas pour reprendre l'ensemble. En revanche, je vous restitue dans les 30 jours vos contenus (textes, photos, logos que vous m'avez confiés), et sur demande un export des données collectées via le site (contacts du formulaire, etc.). Le nom de domaine, enregistré et géré par mes soins dans le cadre de l'abonnement, ne fait pas partie de ce qui est transféré — sauf s'il reprend une marque que vous avez déposée à l'INPI avant la souscription, auquel cas vous pouvez en demander le transfert à vos frais.",
  },
  {
    id: 3,
    question: 'Comment se passe la livraison en 7 jours ?',
    answer:
      "Jour 1-2 : on se parle 15 minutes pour que j'comprenne votre activité. Je vous pose les questions essentielles et je collecte vos informations (logo, photos, textes si vous en avez). Jour 3-5 : je crée votre site. Jour 6 : vous recevez un lien de prévisualisation. Vous me dites si vous voulez changer quelque chose. Jour 7 : votre site est en ligne. Si vous n'avez pas de photos ni de textes, pas de panique — je m'en charge.",
  },
  {
    id: 4,
    question: 'Est-ce que je peux modifier mon site moi-même ?',
    answer:
      "Non, et c'est fait exprès. Vous ne touchez à rien — c'est tout le concept. Chaque mois, vous m'envoyez une demande d'assistance depuis votre espace client (mise à jour d'un texte, remplacement d'une photo, changement d'horaires ou de tarifs). Je l'exécute sous 48h ouvrées, dans la limite de 2 heures de travail. C'est inclus dans l'abonnement. Pour les demandes plus importantes — nouvelle page, refonte, nouvelle fonctionnalité, intégration tierce — je vous fais un devis dédié et vous décidez si vous voulez avancer.",
  },
  {
    id: 5,
    question: 'Est-ce que mon site sera bien positionné sur Google ?',
    answer:
      "Dès la livraison, votre site est optimisé pour Google sur les recherches locales de votre activité (ex : \"plombier Lyon\", \"coiffeuse Bordeaux\"). Le SEO on-page est inclus et je continue à le travailler chaque mois. Le référencement prend en général 3 à 6 mois pour s'installer, mais les résultats sont durables — contrairement à la publicité payante qui s'arrête dès que vous ne payez plus.",
  },
]
