import Image from 'next/image'
import Link from 'next/link'
import type { Realisation } from '@/data/realisations'
import { ButtonLink, StepWindow } from './ui'
import { Wave, type Fond } from './Wave'
import { GRILLE_PARRAINAGE, MENSUEL_MINIMUM, MENTION_TVA, TARIF, euros } from '@/data/tarif'
import { testimonials } from '@/data/testimonials'
import type { FAQ } from '@/data/faq'
import { GOOGLE_REVIEWS } from '@/lib/site'

/* ─── Carte du prix (accueil) ─────────────────────────────────────────── */

const POINTS_PRIX = [
  'Hébergement, nom de domaine et HTTPS',
  'Sauvegardes, mises à jour et sécurité',
  'Modifications à la demande',
]

export function PriceCard() {
  return (
    <div className="w-full max-w-[520px] rounded-md border-2 border-orange bg-encre px-6 py-7 text-creme sm:p-10">
      <p className="m-0 text-[14px] font-semibold text-gris-clair sm:text-[15px]">
        Un seul prix, tout compris
      </p>
      <p className="mt-[10px] flex items-baseline gap-2 sm:mt-[14px]">
        <span className="text-[64px] font-extrabold leading-none tracking-titre-2 sm:text-[76px]">
          {euros(TARIF.mensuel)}
        </span>
        <span className="text-[18px] font-medium text-gris-clair sm:text-[20px]">par mois</span>
      </p>
      <p className="mt-2 font-semibold sm:mt-[10px]">Création du site offerte</p>
      <p className="mt-[2px] text-[15px] font-semibold text-orange-clair sm:mt-1 sm:text-[16px]">
        Jusqu&apos;à {euros(MENSUEL_MINIMUM)} avec le parrainage
      </p>
      <ul className="mt-5 flex list-none flex-col gap-3 border-t border-encre-2 p-0 pt-5 sm:mt-6 sm:gap-[14px] sm:pt-6">
        {POINTS_PRIX.map((p) => (
          <li key={p} className="flex items-start gap-[10px] sm:gap-3">
            <span aria-hidden="true" className="mt-2 h-[10px] w-[10px] shrink-0 bg-orange-clair" />
            {p}
          </li>
        ))}
      </ul>
      <Link
        href="/offre"
        className="mt-6 flex min-h-[44px] items-center justify-center rounded-md bg-creme px-5 py-[14px] text-center font-semibold text-encre no-underline hover:bg-blanc hover:text-encre sm:mt-7 sm:py-[15px]"
      >
        Voir la formule
      </Link>
      <p className="mt-3 text-center text-[13px] text-gris-clair sm:mt-[14px] sm:text-[14px]">
        {MENTION_TVA}
      </p>
    </div>
  )
}

/* ─── Grille de parrainage, fond clair (accueil) ─────────────────────── */

export function ReferralGridClair() {
  const dernier = GRILLE_PARRAINAGE.length - 1
  return (
    <>
      {/* Mobile : grille de 3 colonnes */}
      <ul className="mt-[18px] grid list-none grid-cols-3 gap-2 p-0 text-center sm:hidden">
        {GRILLE_PARRAINAGE.map((p, i) => (
          <li
            key={p.clients}
            className={`rounded px-[2px] py-[10px] ${
              i === dernier ? 'bg-orange text-blanc' : 'border border-beige bg-creme'
            }`}
          >
            <span className={`block text-[13px] ${i === dernier ? 'text-blanc' : 'text-gris'}`}>
              {p.clients} {p.clients > 1 ? 'clients' : 'client'}
            </span>
            <strong className="text-[19px] font-extrabold">{euros(p.mensuel)}</strong>
          </li>
        ))}
      </ul>
      {/* Ordinateur : tableau */}
      <div className="hidden w-full basis-full overflow-x-auto sm:block">
        <table className="-mx-2 border-separate border-spacing-x-2 text-center">
          <tbody>
            <tr>
              <th scope="row" className="pb-2 pr-2 text-left text-[14px] font-semibold text-gris">
                Clients recommandés
              </th>
              {GRILLE_PARRAINAGE.map((p) => (
                <td key={p.clients} className="pb-2 text-[14px] text-gris">
                  {p.clients}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="pr-2 text-left text-[14px] font-semibold text-gris">
                Votre mensuel
              </th>
              {GRILLE_PARRAINAGE.map((p, i) => (
                <td
                  key={p.clients}
                  className={`min-w-[64px] rounded px-4 py-[14px] text-[22px] font-extrabold ${
                    i === dernier ? 'bg-orange text-blanc' : 'border border-beige bg-creme'
                  }`}
                >
                  {euros(p.mensuel)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── Grille de parrainage, fond encre (/offre) ──────────────────────── */

export function ReferralGridSombre() {
  const dernier = GRILLE_PARRAINAGE.length - 1
  return (
    <>
      {/* Mobile : tableau vertical */}
      <table className="mt-6 w-full border-collapse sm:hidden">
        <thead>
          <tr>
            <th scope="col" className="pb-2 text-left text-[14px] font-semibold text-gris-clair">
              Clients recommandés
            </th>
            <th scope="col" className="pb-2 text-right text-[14px] font-semibold text-gris-clair">
              Votre mensuel
            </th>
          </tr>
        </thead>
        <tbody>
          {GRILLE_PARRAINAGE.map((p, i) => (
            <tr key={p.clients} className="border-t border-encre-2">
              <td className="py-3">{p.clients}</td>
              <td
                className={`py-3 text-right text-[20px] font-extrabold ${
                  i === dernier ? 'text-orange-clair' : ''
                }`}
              >
                {euros(p.mensuel)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Ordinateur : tableau horizontal */}
      <div className="mt-11 hidden justify-center overflow-x-auto sm:flex">
        <table className="border-separate border-spacing-x-[10px] text-center">
          <tbody>
            <tr>
              <th
                scope="row"
                className="pb-[10px] pr-[10px] text-left text-[15px] font-semibold text-gris-clair"
              >
                Clients recommandés
              </th>
              {GRILLE_PARRAINAGE.map((p) => (
                <td key={p.clients} className="pb-[10px] text-[16px] font-semibold">
                  {p.clients}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="pr-[10px] text-left text-[15px] font-semibold text-gris-clair">
                Votre mensuel
              </th>
              {GRILLE_PARRAINAGE.map((p, i) => (
                <td
                  key={p.clients}
                  className={`min-w-[84px] rounded-md px-[14px] py-[18px] text-[26px] font-extrabold ${
                    i === dernier ? 'bg-orange text-blanc' : 'bg-encre-3'
                  }`}
                >
                  {euros(p.mensuel)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── Étapes sur fond encre ──────────────────────────────────────────── */

export interface Etape {
  title: string
  text: string
  // Texte mobile, s'il diffère (maquette mobile).
  textMobile?: string
}

export function Steps({ etapes }: { etapes: Etape[] }) {
  return (
    <ol className="mt-7 flex list-none flex-col gap-[22px] p-0 sm:mt-14 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-5">
      {etapes.map((e, i) => (
        <li
          key={e.title}
          className="flex gap-4 sm:block sm:rounded-md sm:border sm:border-encre-2 sm:p-7"
        >
          <StepWindow n={(i + 1) as 1 | 2 | 3} />
          <div>
            <h3 className="mt-1 text-[19px] font-extrabold sm:mt-[18px] sm:text-[21px]">{e.title}</h3>
            <p className="mt-1 text-gris-clair sm:mt-2">
              {e.textMobile ? (
                <>
                  <span className="sm:hidden">{e.textMobile}</span>
                  <span className="hidden sm:inline">{e.text}</span>
                </>
              ) : (
                e.text
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ─── Avis Google ────────────────────────────────────────────────────── */

export function Reviews() {
  return (
    <>
      <div className="mt-7 flex flex-col gap-[14px] sm:mt-14 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:items-start sm:gap-5">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="m-0 flex flex-col gap-[14px] rounded-md border border-beige bg-blanc p-[22px] sm:gap-[18px] sm:p-7"
          >
            <span className="text-[14px] font-semibold text-orange sm:text-[15px]">5/5 sur Google</span>
            <blockquote className="m-0 whitespace-pre-line">{t.text}</blockquote>
            <figcaption className="border-t border-beige pt-3 text-[14px] sm:pt-4 sm:text-[15px]">
              <strong className="font-semibold">{t.name}</strong>
              <br />
              <span className="text-gris">{t.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-[22px] text-center font-semibold sm:mt-8 sm:text-[16px]">
        <a href={GOOGLE_REVIEWS.url} className="inline-flex min-h-[44px] items-center">
          Lire les avis sur Google
        </a>
      </p>
    </>
  )
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */

export function Faq({ items }: { items: FAQ[] }) {
  return (
    <div className="mt-6 flex flex-col gap-[10px] sm:mt-11 sm:gap-3">
      {items.map((f, i) => (
        <details
          key={f.question}
          open={i === 0}
          className="rounded-md border border-beige bg-blanc px-[18px] py-4 sm:px-6 sm:py-5"
        >
          <summary className="font-semibold sm:text-[18px]">{f.question}</summary>
          <p className="mt-[10px] text-gris sm:mt-3">{f.answer}</p>
        </details>
      ))}
    </div>
  )
}

/* ─── Carte de réalisation ───────────────────────────────────────────── */

export function RealisationCard({
  r,
  titre: Titre = 'h3',
  lien = false,
}: {
  r: Realisation
  titre?: 'h2' | 'h3'
  lien?: boolean
}) {
  return (
    <article className="overflow-hidden rounded-md border border-beige bg-blanc">
      {r.capture ? (
        <Image
          src={r.capture}
          alt={`Capture du site ${r.nom}`}
          width={640}
          height={380}
          className="h-[150px] w-full object-cover object-top sm:h-[190px]"
          sizes="(max-width: 640px) 100vw, 360px"
        />
      ) : (
        // Emplacement affiché tant qu'aucune capture n'est renseignée.
        <div className="flex h-[150px] items-center justify-center bg-beige text-[14px] text-encre sm:h-[190px]">
          Capture du site
        </div>
      )}
      <div className="p-[18px] sm:p-[22px]">
        <Titre className="m-0 text-[19px] font-extrabold sm:text-[20px]">{r.nom}</Titre>
        <p className="mt-[2px] text-[15px] text-gris sm:mt-1">
          {r.contexte}
          {r.horsLigne ? '. Site plus en ligne' : ''}
        </p>
        <p className="mt-2 sm:mt-3">{r.description}</p>
        {lien && r.href && !r.horsLigne && (
          <p className="mt-3">
            <a href={r.href} className="inline-flex min-h-[44px] items-center font-semibold">
              Voir le site<span className="sr-only"> {r.nom}</span>
            </a>
          </p>
        )}
      </div>
    </article>
  )
}

/* ─── Bandeau final orange ───────────────────────────────────────────── */

// Inclut la vague d'entrée (depuis `avant`) et la vague vers le pied de page.
// À placer en dernier dans une page.
export function CtaBand({ avant = 'creme' }: { avant?: Fond }) {
  return (
    <>
      <Wave top={avant} bottom="orange" sens="a" />
      <CtaBandSection />
      <Wave top="orange" bottom="encre" sens="b" />
    </>
  )
}

function CtaBandSection() {
  return (
    <section className="bg-orange px-4 py-14 text-center text-blanc sm:px-6 sm:py-[88px]">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="m-0 text-[30px] font-extrabold leading-[1.12] tracking-titre-2 sm:text-[44px]">
          Voyez votre site avant de vous engager.
        </h2>
        <p className="mt-3 sm:mt-[14px] sm:text-[20px]">
          Création offerte, puis {euros(TARIF.mensuel)} par mois, tout compris.
        </p>
        <ButtonLink href="/contact" variant="clair" bloc className="mt-6 sm:mt-8 sm:px-7">
          Demander mon site
        </ButtonLink>
      </div>
    </section>
  )
}
