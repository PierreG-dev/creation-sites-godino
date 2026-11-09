import type { Metadata } from 'next'
import { ContactForm, MessageEnvoye } from '@/components/ContactForm'
import { Email, Telephone } from '@/components/Coordonnees'
import { Wave } from '@/components/lanterne/Wave'
import { Eclaire, GoogleRating } from '@/components/lanterne/ui'
import { TARIF } from '@/data/tarif'
import { CONTACT, SITE_URL, pageSocialMetadata } from '@/lib/site'
import { createFormToken } from '@/lib/form-guard'

const TITLE = 'Contact : demander mon site'
const DESCRIPTION = `Parlez-moi de votre activité. Réponse sous 24h. Création du site offerte, puis ${TARIF.mensuel} € par mois tout compris.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
  ...pageSocialMetadata({ path: '/contact', title: TITLE, description: DESCRIPTION }),
}

// Rendu à chaque requête : le jeton anti-robots porte l'heure d'affichage.
export const dynamic = 'force-dynamic'

export default function ContactPage({
  searchParams,
}: {
  searchParams: { envoye?: string }
}) {
  const envoye = searchParams.envoye === '1'
  return (
    <>
      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="m-0 text-[36px] font-extrabold leading-[1.06] tracking-titre sm:text-[52px]">
            Demander mon <Eclaire>site</Eclaire>.
          </h1>
          <p className="mt-4 max-w-[620px] text-[18px] text-gris sm:mt-5 sm:text-[20px]">
            Dites-moi ce que fait votre entreprise. Je vous recontacte pour un appel de 15 minutes.
          </p>

          <div className="mt-8 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-start lg:gap-14">
            <div className="min-w-0 lg:flex-[1_1_560px]">
              {envoye ? <MessageEnvoye /> : <ContactForm
                  email={<Email className="font-semibold underline" />}
                  token={createFormToken()}
                />}
            </div>

            <aside className="lg:flex-[0_1_380px]">
              <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-[14px] rounded-md border border-beige bg-blanc p-5 sm:p-7">
                <dt className="text-gris">Email</dt>
                <dd className="m-0 font-semibold [overflow-wrap:anywhere]">
                  <Email className="text-encre underline" />
                </dd>
                <dt className="text-gris">Téléphone</dt>
                <dd className="m-0 font-semibold">
                  <Telephone className="text-encre underline" />
                </dd>
                <dt className="text-gris">Réponse</dt>
                <dd className="m-0 font-semibold">Réponse sous 24h</dd>
                <dt className="text-gris">Horaires</dt>
                <dd className="m-0 font-semibold">Du lundi au vendredi, 9h à 19h</dd>
              </dl>
              <GoogleRating className="mt-4" />
            </aside>
          </div>
        </div>
      </section>
      <Wave top="creme" bottom="encre" sens="a" />
    </>
  )
}
