'use client'

import { useEffect, useState, type ReactNode } from 'react'

const inverse = (s: string) => Array.from(s).reverse().join('')

// Coordonnée cachée aux robots qui lisent le HTML. Le serveur ne transmet que
// la valeur à l'envers. Avant JavaScript, le CSS la remet à l'endroit (lisible
// mais sans lien) ; après le chargement, on affiche le vrai lien cliquable,
// au rendu identique.
export function Protege({
  texte,
  lien,
  label,
  className,
  children,
}: {
  texte: string
  lien: string
  label?: string
  className?: string
  children?: ReactNode
}) {
  const [pret, setPret] = useState(false)
  useEffect(() => setPret(true), [])

  if (!pret) {
    return (
      <a className={className} aria-label={label}>
        {children ?? <span style={{ unicodeBidi: 'bidi-override', direction: 'rtl' }}>{texte}</span>}
      </a>
    )
  }

  const valeur = inverse(texte)
  return (
    <a href={inverse(lien)} className={className} aria-label={label && `${label} ${valeur}`}>
      {children ?? valeur}
    </a>
  )
}
