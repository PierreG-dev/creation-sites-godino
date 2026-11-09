import Link from 'next/link'
import { LogoMark, LogoText } from '@/components/lanterne/Logo'
import { Email, Telephone } from '@/components/Coordonnees'
import { NAV_LINKS } from '@/components/Navbar'
import { CITY_PAGES } from '@/data/cities'
import { CONTACT, ESPACE_CLIENT_URL, ZONE_PHRASE } from '@/lib/site'

const lienBase = 'inline-flex min-h-[32px] items-center text-gris-clair hover:text-creme'
const lien = `${lienBase} no-underline`

export function Footer() {
  const villes = CITY_PAGES.filter((c) => c.published)
  return (
    <footer className="bg-encre px-4 pb-7 pt-12 text-creme sm:px-6 sm:pb-8 sm:pt-[72px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-12">
          <div className="sm:max-w-[360px] sm:flex-[1_1_300px]">
            <div className="flex items-center gap-[10px] sm:gap-3">
              <LogoMark sombre className="h-[34px] w-[34px] sm:h-10 sm:w-10" />
              <LogoText sombre />
            </div>
            <p className="mt-4 text-[15px] text-gris-clair sm:mt-[18px]">{ZONE_PHRASE}</p>
          </div>

          <div className="grid grid-cols-2 gap-7 sm:contents">
            <nav aria-label="Pages" className="sm:flex-[0_1_160px]">
              <p className="mb-[10px] font-semibold sm:mb-[14px]">Pages</p>
              <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[15px]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={lien}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {villes.length > 0 && (
              <nav aria-label="Villes" className="sm:flex-[0_1_160px]">
                <p className="mb-[10px] font-semibold sm:mb-[14px]">Villes</p>
                <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[15px]">
                  {villes.map((v) => (
                    <li key={v.slug}>
                      <Link href={`/creation-site-internet/${v.slug}`} className={lien}>
                        {v.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          <div className="sm:flex-[0_1_240px]">
            <p className="mb-[14px] hidden font-semibold sm:block">Contact</p>
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[15px] text-gris-clair">
              <li>
                <Email className={lien} />
              </li>
              <li>
                <Telephone className={lien} />
              </li>
              <li className="py-1">SIRET {CONTACT.siret}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-encre-2 pt-5 text-[14px] text-gris-clair sm:mt-14 sm:pt-6">
          <Link href="/mentions-legales" className={lienBase}>
            Mentions légales
          </Link>
          <a href={ESPACE_CLIENT_URL} className={lienBase}>
            Espace client
          </a>
          <span>© {new Date().getFullYear()} {CONTACT.responsable}</span>
        </div>
      </div>
    </footer>
  )
}
