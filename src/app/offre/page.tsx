import type { Metadata } from 'next'
import { Database, Globe, Lock, Pen, RefreshCw, Search, Server, ShieldCheck } from 'lucide-react'
import { Wave } from '@/components/lanterne/Wave'
import { ButtonLink, Eclaire, EclaireSombre, IconTile, SectionTitle } from '@/components/lanterne/ui'
import { CtaBand, ReferralGridSombre, Steps, type Etape } from '@/components/lanterne/blocks'
import { MENSUEL_MINIMUM, MENTION_TVA, TARIF, euros } from '@/data/tarif'
import { businessJsonLd } from '@/lib/jsonld'
import { SITE_URL, pageSocialMetadata } from '@/lib/site'

const TITLE = `La formule : ${TARIF.mensuel} € par mois, création du site offerte`
const DESCRIPTION = `Création du site offerte, puis ${TARIF.mensuel} € par mois. Hébergement, nom de domaine, HTTPS, sauvegardes, mises à jour, sécurité et modifications compris. Parrainage jusqu'à ${MENSUEL_MINIMUM} €.`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Lanterne Web` },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/offre` },
  ...pageSocialMetadata({ path: '/offre', title: TITLE, description: DESCRIPTION }),
}

// `court` : texte de la maquette mobile, quand il diffère.
const COMPRIS = [
  {
    icon: Server,
    title: 'Hébergement',
    text: "Le site tourne sur mon infrastructure. Vous n'avez pas d'hébergeur à payer à côté.",
    court: "Pas d'hébergeur à payer à côté.",
  },
  {
    icon: Globe,
    title: 'Nom de domaine',
    text: "L'adresse de votre site, enregistrée et renouvelée chaque année.",
    court: 'Enregistré et renouvelé chaque année.',
  },
  {
    icon: Lock,
    title: 'Certificat HTTPS',
    text: 'Le cadenas dans le navigateur. Les échanges avec vos visiteurs sont chiffrés.',
    court: 'Le cadenas dans le navigateur.',
  },
  {
    icon: Database,
    title: 'Sauvegarde chaque jour',
    text: 'Une copie complète du site, faite automatiquement tous les jours.',
    court: 'Une copie complète, tous les jours.',
  },
  {
    icon: RefreshCw,
    title: 'Mises à jour',
    text: 'Je tiens à jour tout ce qui fait fonctionner le site.',
    court: 'Tout ce qui fait fonctionner le site.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    text: "Je surveille le site et je corrige les failles dès qu'elles sont connues.",
    court: "Les failles corrigées dès qu'elles sont connues.",
  },
  {
    icon: Search,
    title: 'Référencement Google de base',
    text: 'Titres, descriptions et informations lisibles par Google. Je ne promets pas de position.',
    court: 'Un site lisible par Google. Pas de promesse de position.',
  },
  {
    icon: Pen,
    title: 'Modifications à la demande',
    text: "Un horaire, un tarif, une photo, une page : vous me l'envoyez, je le fais. Dans la limite du raisonnable.",
    court: "Vous me l'envoyez, je le fais. Dans la limite du raisonnable.",
  },
]

// Seul endroit du site où l'engagement de 12 mois apparaît.
const CONTRAT = [
  {
    dt: 'Avant la mise en ligne',
    dd: "Vous voyez votre site. S'il ne vous convient pas, vous ne devez rien.",
  },
  { dt: 'Engagement', dd: '12 mois, à partir de la mise en ligne.' },
  {
    dt: 'Après 12 mois',
    dd: 'Le mensuel continue mois par mois. Vous arrêtez quand vous voulez, sans frais.',
  },
  {
    dt: 'Si vous arrêtez',
    dd: "Le site est mis hors ligne. Je vous rends vos textes, photos et logos sous 30 jours. Le nom de domaine reste enregistré à mon nom, sauf s'il reprend une marque que vous avez déposée avant de commencer.",
  },
]

const ETAPES_PARRAINAGE: Etape[] = [
  {
    title: 'Vous parlez de moi',
    text: "À un artisan, un commerçant ou un indépendant qui a besoin d'un site.",
    textMobile: "À quelqu'un qui a besoin d'un site.",
  },
  {
    title: 'Son site est mis en ligne',
    text: 'Il me donne votre nom quand il me contacte.',
  },
  {
    title: 'Votre mensuel baisse',
    text: `À chaque nouveau client recommandé, jusqu'à ${euros(MENSUEL_MINIMUM)}.`,
  },
]

function Responsive({ court, long }: { court: string; long: string }) {
  return (
    <>
      <span className="sm:hidden">{court}</span>
      <span className="hidden sm:inline">{long}</span>
    </>
  )
}

export default function OffrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }}
      />

      {/* Hero */}
      <section className="px-4 pb-11 pt-10 sm:px-6 sm:pb-[72px] sm:pt-20 sm:text-center">
        <div className="mx-auto max-w-[760px]">
          <h1 className="m-0 text-[38px] font-extrabold leading-[1.06] tracking-titre sm:text-[clamp(36px,5vw,56px)]">
            {euros(TARIF.mensuel)} par mois, <Eclaire>tout compris</Eclaire>.
          </h1>
          <p className="mt-[14px] text-[18px] text-gris sm:mt-[18px] sm:text-[20px]">
            La création du site est offerte. Le mensuel couvre tout le reste.
          </p>
          <ButtonLink href="/contact" bloc className="mt-6 sm:mt-8">
            Demander mon site
          </ButtonLink>
          <p className="mt-3 text-center text-[15px] text-gris sm:mt-[14px]">
            <Responsive
              court="Pas de devis. Pas d'options. Pas de frais de mise en ligne."
              long="Pas de devis. Pas d'options à choisir. Pas de frais de mise en ligne."
            />
          </p>
          <p className="mt-1 text-center text-[14px] text-gris">{MENTION_TVA}</p>
        </div>
      </section>

      {/* Ce que comprend le mensuel */}
      <Wave top="creme" bottom="blanc" sens="a" />
      <section className="bg-blanc px-4 py-[52px] sm:px-6 sm:py-[88px]">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle
            title={
              <>
                Ce que comprend le <Eclaire>mensuel</Eclaire>.
              </>
            }
            subtitle="Huit choses dont vous n'avez plus à vous occuper."
          />
          <ul className="mt-7 flex list-none flex-col gap-5 p-0 sm:mt-[52px] sm:grid sm:grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] sm:gap-4">
            {COMPRIS.map((c) => (
              <li
                key={c.title}
                className="flex gap-[14px] sm:gap-4 sm:rounded-md sm:border sm:border-beige sm:bg-creme sm:p-[22px]"
              >
                <IconTile icon={c.icon} />
                <div>
                  <h3 className="m-0 text-[17px] font-extrabold sm:text-[18px]">{c.title}</h3>
                  <p className="mt-[2px] text-gris sm:mt-1 sm:text-[16px]">
                    <Responsive court={c.court} long={c.text} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Wave top="blanc" bottom="creme" sens="b" />

      {/* Le contrat, en clair */}
      <section className="px-4 py-[52px] sm:px-6 sm:py-[88px]">
        <div className="mx-auto max-w-[860px]">
          <SectionTitle
            title={
              <>
                Le contrat, en <Eclaire>clair</Eclaire>.
              </>
            }
            subtitle="Ce que vous signez, sans petites lignes."
          />
          <dl className="mt-7 overflow-hidden rounded-md border-2 border-encre bg-blanc sm:mt-12">
            {CONTRAT.map((c, i) => (
              <div
                key={c.dt}
                className={`px-5 py-[18px] sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:px-[30px] sm:py-[26px] ${
                  i < CONTRAT.length - 1 ? 'border-b border-beige' : ''
                }`}
              >
                <dt className="font-extrabold sm:flex-[0_0_220px]">{c.dt}</dt>
                <dd className="m-0 mt-1 text-gris sm:mt-0 sm:flex-[1_1_300px]">{c.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Parrainage */}
      <Wave top="creme" bottom="encre" sens="a" />
      <section id="parrainage" className="bg-encre px-4 py-[52px] text-creme sm:px-6 sm:py-[88px]">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle
            sombre
            title={
              <>
                Votre mensuel peut descendre à{' '}
                <EclaireSombre>{euros(MENSUEL_MINIMUM)}</EclaireSombre>.
              </>
            }
            subtitle={`Chaque client que vous recommandez le fait baisser de ${euros(TARIF.baisseParClient)}.`}
          />
          <ReferralGridSombre />
          <Steps etapes={ETAPES_PARRAINAGE} />
        </div>
      </section>

      <CtaBand avant="encre" />
    </>
  )
}
