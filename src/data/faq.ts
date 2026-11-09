export interface FAQ {
  question: string
  answer: string
}

// Questions de l'accueil (maquette). La première est ouverte par défaut.
export const faqs: FAQ[] = [
  {
    question: 'Et si le site ne me convient pas ?',
    answer: "Vous le voyez avant sa mise en ligne. S'il ne vous convient pas, vous ne devez rien.",
  },
  {
    question: "Si j'arrête, que deviennent mon site et mon nom de domaine ?",
    answer:
      "Le site est mis hors ligne. Je vous rends vos textes, photos et logos sous 30 jours. Le nom de domaine reste enregistré à mon nom, sauf s'il reprend une marque que vous avez déposée avant de commencer.",
  },
  {
    question: "Je n'ai ni textes ni photos, c'est un problème ?",
    answer: 'Non. Je m\'en charge. Vous relisez et vous corrigez avant la mise en ligne.',
  },
  {
    question: 'Combien de modifications puis-je demander ?',
    answer:
      'Autant que nécessaire, dans la limite du raisonnable. Vous me les envoyez par message, je les fais moi-même.',
  },
]
