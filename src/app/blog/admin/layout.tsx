import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Administration Blog | Lanterne Web' },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Les liens de l'admin sont stylés par classes : pas de soulignement global.
  return <div className="[&_a]:no-underline">{children}</div>
}
