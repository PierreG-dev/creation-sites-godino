import type { Metadata } from 'next'
import { Eclaire } from '@/components/lanterne/ui'
import { CtaBand, RealisationCard } from '@/components/lanterne/blocks'
import { realisations } from '@/data/realisations'
import { SITE_URL, pageSocialMetadata } from '@/lib/site'

const TITLE = 'Réalisations : sites créés dans le Tarn-et-Garonne et alentours'
const DESCRIPTION =
  "Quelques sites que j'ai créés, avec ce qu'ils contiennent : Garage Brincat à Castelsarrasin, Dr Jérôme Misino à Agen, AB Nature à Graulhet."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/realisations` },
  ...pageSocialMetadata({ path: '/realisations', title: TITLE, description: DESCRIPTION }),
}

export default function RealisationsPage() {
  return (
    <>
      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="m-0 text-[36px] font-extrabold leading-[1.06] tracking-titre sm:text-[52px]">
            <Eclaire>Réalisations</Eclaire>.
          </h1>
          <p className="mt-4 text-[18px] text-gris sm:mt-5 sm:text-[20px]">
            Quelques sites que j&apos;ai créés, avec ce qu&apos;ils contiennent.
          </p>
          <div className="mt-8 flex flex-col gap-[14px] sm:mt-12 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-5">
            {realisations.map((r) => (
              <RealisationCard key={r.slug} r={r} titre="h2" lien />
            ))}
          </div>
        </div>
      </section>
      <CtaBand avant="creme" />
    </>
  )
}
