import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from '@/components/lanterne/Logo'
import { Email, Telephone } from '@/components/Coordonnees'

export const NAV_LINKS = [
  { href: '/offre', label: 'La formule' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

// En-tête sans JavaScript : le menu mobile est un <details>.
export function Navbar() {
  return (
    <header className="relative z-20 border-b border-beige bg-creme">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-[14px] sm:px-6 sm:py-[18px]">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-[16px] font-medium lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="py-2 text-encre no-underline hover:text-orange">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded-md bg-orange px-5 py-3 font-semibold text-blanc no-underline hover:bg-orange-fonce hover:text-blanc"
          >
            Demander mon site
          </Link>
        </nav>

        <div className="flex gap-1 lg:hidden">
          <Telephone
            label="Appeler le"
            className="flex h-11 w-11 items-center justify-center text-encre hover:text-orange"
          >
            <Phone aria-hidden="true" width={22} height={22} strokeWidth={2} />
          </Telephone>
          <details className="group">
            <summary
              aria-label="Menu"
              className="flex h-11 w-11 items-center justify-center text-encre"
            >
              <Menu aria-hidden="true" width={24} height={24} strokeWidth={2} className="group-open:hidden" />
              <X aria-hidden="true" width={24} height={24} strokeWidth={2} className="hidden group-open:block" />
            </summary>
            <nav
              aria-label="Navigation principale"
              className="absolute inset-x-0 top-full border-b border-beige bg-creme px-4 pb-6 pt-2"
            >
              <ul className="m-0 flex list-none flex-col p-0">
                {NAV_LINKS.map((l) => (
                  <li key={l.href} className="border-b border-beige">
                    <Link
                      href={l.href}
                      className="flex min-h-[52px] items-center text-[18px] font-semibold text-encre no-underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-5 flex min-h-[44px] items-center justify-center rounded-md bg-orange px-5 py-4 text-[18px] font-semibold text-blanc no-underline hover:text-blanc"
              >
                Demander mon site
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
