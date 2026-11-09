import type { ReactNode } from 'react'
import { Protege } from '@/components/Protege'
import { CONTACT } from '@/lib/site'

// Email et téléphone affichés sans jamais apparaître en clair dans le HTML ni
// dans le payload React. À utiliser partout à la place de CONTACT.email / telephone.
const inverse = (s: string) => Array.from(s).reverse().join('')

type Props = { className?: string; label?: string; children?: ReactNode }

export function Email(props: Props) {
  return <Protege texte={inverse(CONTACT.email)} lien={inverse(`mailto:${CONTACT.email}`)} {...props} />
}

export function Telephone(props: Props) {
  return <Protege texte={inverse(CONTACT.telephone)} lien={inverse(CONTACT.telephoneHref)} {...props} />
}
