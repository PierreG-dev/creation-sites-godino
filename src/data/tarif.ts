// Tarif : source unique. Un changement de prix se fait ici et nulle part ailleurs.
export const TARIF = {
  mensuel: 80, // euros par mois
  baisseParClient: 16, // euros retirés au mensuel par client recommandé
  paliers: 5, // nombre de clients recommandés pour atteindre le dernier palier
} as const

export const MENTION_TVA = 'TVA non applicable, art. 293 B du CGI.'

export function euros(montant: number): string {
  return `${montant} €`
}

export interface PalierParrainage {
  clients: number
  mensuel: number
}

// 0 client : 80 €, 1 client : 64 €, ... 5 clients : 0 €
export const GRILLE_PARRAINAGE: PalierParrainage[] = Array.from(
  { length: TARIF.paliers + 1 },
  (_, clients) => ({
    clients,
    mensuel: Math.max(0, TARIF.mensuel - clients * TARIF.baisseParClient),
  }),
)

export const MENSUEL_MINIMUM = GRILLE_PARRAINAGE[GRILLE_PARRAINAGE.length - 1].mensuel
