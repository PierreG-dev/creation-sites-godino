import type { Metadata } from 'next'
import Link from 'next/link'
import { Database, Gift, Pen, Search, Server, ShieldCheck, Users } from 'lucide-react'
import { LanternDesktop, LanternMobile } from '@/components/lanterne/Lantern'
import { Wave } from '@/components/lanterne/Wave'
import {
  ButtonLink,
  Eclaire,
  EclaireSombre,
  GoogleRating,
  IconTile,
  SectionTitle,
} from '@/components/lanterne/ui'
import {
  CtaBand,
  Faq,
  PriceCard,
  RealisationCard,
  ReferralGridClair,
  Reviews,
  Steps,
  type Etape,
} from '@/components/lanterne/blocks'
import { faqs } from '@/data/faq'
import { realisations } from '@/data/realisations'
import { TARIF, euros } from '@/data/tarif'
import { businessJsonLd } from '@/lib/jsonld'
import { Email, Telephone } from '@/components/Coordonnees'
import { CONTACT, SITE_URL, ZONE_PHRASE, pageSocialMetadata } from '@/lib/site'

const TITLE = 'Lanterne Web, création de sites à Montauban et dans le Tarn-et-Garonne'
const DESCRIPTION = `Je crée des sites pour les entreprises de Montauban et du Tarn-et-Garonne. Création offerte, puis ${TARIF.mensuel} € par mois : hébergement, domaine, sauvegardes et modifications compris.`

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  ...pageSocialMetadata({ path: '/', title: TITLE, description: DESCRIPTION }),
}

const AVANTAGES = [
  { icon: Gift, label: 'Création du site offerte' },
  { icon: Server, label: 'Hébergement et domaine' },
  { icon: Database, label: 'Sauvegarde chaque jour' },
  { icon: ShieldCheck, label: 'Sécurité et mises à jour' },
  { icon: Search, label: 'Référencement Google de base' },
  { icon: Pen, label: 'Modifications à la demande' },
]

const ETAPES: Etape[] = [
  {
    title: 'Vous me présentez votre activité',
    text: 'Un appel de 15 minutes. Je vous pose les questions utiles.',
  },
  {
    title: 'Je crée votre site',
    text: "Vous recevez un lien pour le voir. Vous me dites ce qu'il faut changer.",
  },
  {
    title: 'Il est mis en ligne quand vous le validez',
    text: 'Le mensuel commence à ce moment-là.',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }}
      />

      {/* Hero */}
      <section className="relative px-4 pb-8 pt-7 sm:px-6 sm:pb-24 sm:pt-[88px]">
        <div className="sm:hidden">
          <LanternMobile />
        </div>
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-16">
          <div className="min-w-0 flex-[1_1_480px]">
            <h1 className="m-0 pr-24 text-[36px] font-extrabold leading-[1.06] tracking-titre sm:pr-0 sm:text-[clamp(38px,5vw,60px)] sm:leading-[1.05]">
              Votre site internet, créé puis <Eclaire>entretenu</Eclaire> chaque mois.
            </h1>
            <p className="mt-4 text-[18px] text-gris sm:mt-5 sm:max-w-[520px] sm:text-[20px]">
              {ZONE_PHRASE} La création est offerte.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <ButtonLink href="/contact" bloc fleche>
                Demander mon site
              </ButtonLink>
              <GoogleRating className="justify-center sm:justify-start" />
            </div>
          </div>
          <div className="hidden min-w-0 flex-[1_1_360px] sm:block">
            <LanternDesktop />
          </div>
        </div>
      </section>

      {/* Formule */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-24">
        <div className="mx-auto flex max-w-[1120px] justify-center">
          <PriceCard />
        </div>
      </section>

      {/* Avis et avantages : l'ordre change entre mobile et ordinateur (maquettes). */}
      <div className="flex flex-col">
        <section className="order-2 px-4 py-14 sm:order-1 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[1120px]">
            <SectionTitle
              title={
                <>
                  Ce qu&apos;en disent mes <Eclaire>clients</Eclaire>.
                </>
              }
              subtitle="Avis publiés sur Google, cités sans retouche."
            />
            <Reviews />
          </div>
        </section>

        <Wave top="creme" bottom="blanc" sens="a" className="hidden sm:order-2 sm:block" />

        <section className="order-1 border-y border-beige bg-blanc px-4 py-14 sm:order-3 sm:border-y-0 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[1120px]">
            <SectionTitle
              title={
                <>
                  Vous ne gérez rien de <Eclaire>technique</Eclaire>.
                </>
              }
              subtitle="Je m'occupe du site du premier au dernier jour."
            />
            <ul className="mt-7 grid list-none grid-cols-2 gap-3 p-0 sm:mt-14 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-5">
              {AVANTAGES.map((a) => (
                <li
                  key={a.label}
                  className="rounded-md border border-beige bg-creme p-4 sm:flex sm:items-center sm:gap-4 sm:p-[22px]"
                >
                  <IconTile icon={a.icon} />
                  <p className="mt-3 font-semibold leading-[1.3] sm:mt-0 sm:text-[18px] sm:leading-normal">
                    {a.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Étapes */}
      <Wave top="creme" bottom="encre" sens="a" className="sm:bg-blanc" />
      <section className="bg-encre px-4 py-14 text-creme sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle
            sombre
            title={
              <>
                Vous voyez votre site <EclaireSombre>avant</EclaireSombre> de payer.
              </>
            }
            subtitle="Trois étapes, environ 7 jours ouvrés."
          />
          <Steps etapes={ETAPES} />
          <div className="mt-8 sm:mt-12 sm:text-center">
            <ButtonLink href="/contact" bloc>
              Demander mon site
            </ButtonLink>
          </div>
        </div>
      </section>
      <Wave top="encre" bottom="creme" sens="b" />

      {/* Réalisations */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle
            title={
              <>
                Quelques sites que j&apos;ai <Eclaire>créés</Eclaire>.
              </>
            }
            subtitle="Des entreprises du Tarn-et-Garonne et des alentours."
          />
          <div className="mt-7 flex flex-col gap-[14px] sm:mt-14 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-5">
            {realisations.map((r) => (
              <RealisationCard key={r.slug} r={r} />
            ))}
          </div>
          <div className="mt-6 sm:mt-10 sm:text-center">
            <ButtonLink href="/realisations" variant="contour" bloc className="text-[17px]">
              Voir les réalisations
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Parrainage */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-24">
        <div className="mx-auto flex max-w-[1120px] flex-col rounded-md border border-beige bg-blanc p-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7 sm:p-10">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-md border border-beige bg-creme sm:flex">
            <Users aria-hidden="true" width={26} height={26} strokeWidth={2} color="#17212E" />
          </span>
          <div className="min-w-0 sm:flex-[1_1_400px]">
            <h2 className="m-0 text-[24px] font-extrabold leading-[1.2] tracking-titre-2 sm:text-[30px]">
              Recommandez-moi, votre mensuel <Eclaire>baisse</Eclaire>.
            </h2>
            <p className="mt-2 text-gris sm:text-[18px]">
              Chaque client que vous m&apos;envoyez le fait baisser de {euros(TARIF.baisseParClient)}.
            </p>
          </div>
          <p className="order-last mt-[14px] font-semibold sm:order-none sm:mt-0">
            <Link href="/offre#parrainage" className="inline-flex min-h-[44px] items-center">
              Comment ça marche
            </Link>
          </p>
          <ReferralGridClair />
        </div>
      </section>

      {/* Qui */}
      <section className="border-y border-beige bg-blanc px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-14">
          <div className="min-w-0 sm:flex-[1_1_460px]">
            <h2 className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-titre-2 sm:text-[40px]">
              Une seule personne, du début à la <Eclaire>fin</Eclaire>.
            </h2>
            <p className="mt-4 sm:mt-5 sm:text-[19px]">
              Je m&apos;appelle Pierre Godino. Je suis développeur web, entrepreneur individuel.
            </p>
            <p className="mt-[10px] sm:mt-3 sm:text-[19px]">
              Je crée votre site, je l&apos;héberge et je traite vos demandes moi-même.
            </p>
          </div>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-[10px] rounded-md border border-beige bg-creme p-5 text-[15px] sm:flex-[1_1_360px] sm:gap-x-5 sm:gap-y-[14px] sm:p-7 sm:text-[16px]">
            <dt className="text-gris">Email</dt>
            <dd className="m-0 font-semibold [overflow-wrap:anywhere]">
              <Email className="text-encre" />
            </dd>
            <dt className="text-gris">Téléphone</dt>
            <dd className="m-0 font-semibold">
              <Telephone className="text-encre" />
            </dd>
            <dt className="text-gris">Réponse</dt>
            <dd className="m-0 font-semibold">{CONTACT.delaiReponse}</dd>
            <dt className="text-gris">SIRET</dt>
            <dd className="m-0 font-semibold">{CONTACT.siret}</dd>
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[760px]">
          <h2 className="m-0 text-[28px] font-extrabold tracking-titre-2 sm:text-center sm:text-[40px] sm:leading-[1.15]">
            Vos <Eclaire>questions</Eclaire>.
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand avant="creme" />
    </>
  )
}
