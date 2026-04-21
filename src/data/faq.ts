export interface FAQ {
  id: number
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Qu'est-ce qui est inclus dans les 100 €/mois ?",
    answer:
      "Absolument tout : l'hébergement de votre site, votre nom de domaine (ex : votreentreprise.fr), une adresse email professionnelle (contact@votreentreprise.fr), la maintenance technique, les sauvegardes quotidiennes, le certificat SSL (le petit cadenas de sécurité), le référencement Google sur les mots-clés de votre activité, et le support par email ou WhatsApp avec une réponse garantie sous 24h. Vous ne payez rien d'autre.",
  },
  {
    id: 2,
    question: "Que se passe-t-il si je veux arrêter l'abonnement ?",
    answer:
      "Vous pouvez arrêter à tout moment, sans préavis ni pénalité. Il suffit de m'envoyer un message. Je vous transfère votre nom de domaine et les fichiers de votre site dans les 5 jours. Vous gardez tout ce que vous avez payé. Aucun engagement.",
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
      "Non, et c'est fait exprès. Vous ne touchez à rien — c'est tout le concept. Si vous voulez changer du texte, ajouter une photo, modifier vos horaires ou vos tarifs, vous m'envoyez un message et je m'en occupe. C'est inclus dans le 100€/mois (jusqu'à 2h de modifications par mois). Ça vous évite de passer du temps sur la technique et de risquer de casser quelque chose.",
  },
  {
    id: 5,
    question: "C'est quoi exactement la garantie 30 jours ?",
    answer:
      "Si dans les 30 jours suivant la livraison de votre site, il ne vous convient pas — pour quelque raison que ce soit — je vous rembourse intégralement les 500 € de création. Pas de question posée. Je travaille bien et je veux que vous soyez satisfait. Dans la pratique, ça n'est jamais arrivé, mais c'est important pour moi que vous commandiez sans risque.",
  },
  {
    id: 6,
    question: 'Est-ce que mon site sera bien positionné sur Google ?',
    answer:
      "Dès la livraison, votre site est optimisé pour Google sur les recherches locales de votre activité (ex : \"plombier Lyon\", \"coiffeuse Bordeaux\"). Le SEO on-page est inclus et je continue à le travailler chaque mois. Le référencement prend en général 3 à 6 mois pour s'installer, mais les résultats sont durables — contrairement à la publicité payante qui s'arrête dès que vous ne payez plus.",
  },
]
