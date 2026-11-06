import type { Metadata } from 'next'
import { CTAButton } from '@/components/CTAButton'
import { SectionWrapper } from '@/components/SectionWrapper'
import { OffreCard } from '@/components/OffreCard'
import { GarantieBlock } from '@/components/GarantieBlock'
import { ParrainageBlock } from '@/components/ParrainageBlock'
import { WaveDivider } from '@/components/WaveDivider'
import { SITE_URL, pageSocialMetadata } from '@/lib/site'

const TITLE = "L'offre : création offerte, 50 €/mois"
const DESCRIPTION =
  "Création du site offerte. Mensuel à 50 €/mois (au lieu de 100 €) : hébergement, domaine, HTTPS, sauvegardes, mises à jour, modifications. Sans engagement de durée."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/offre`,
  },
  ...pageSocialMetadata({ path: '/offre', title: TITLE, description: DESCRIPTION }),
}

export default function OffrePage() {
  return (
    <>
      {/* Hero secondaire */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-medium mb-6">
                L'offre
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                Une offre. Un prix.
              </h1>
              <p className="text-textMuted text-lg leading-relaxed max-w-xl mb-3">
                La création du site est offerte.
              </p>
              <p className="text-textMuted text-lg leading-relaxed max-w-xl mb-3">
                Ensuite, un mensuel à 50 €/mois (au lieu de 100 €).
              </p>
              <p className="text-textMuted text-lg leading-relaxed max-w-xl">
                Pas d'engagement de durée.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* OffreCard full */}
      <section className="bg-cream pb-20">
        <div className="container">
          <SectionWrapper>
            <OffreCard variant="full" />
          </SectionWrapper>
        </div>
      </section>

      {/* Parrainage */}
      <WaveDivider fillColor="#E8DDD0" />

      <section id="parrainage" className="bg-mid py-20 scroll-mt-24">
        <div className="container">
          <ParrainageBlock />
        </div>
      </section>

      {/* Garantie */}
      <WaveDivider fillColor="#E8DDD0" flip />

      <section className="bg-cream py-20">
        <div className="container">
          <SectionWrapper>
            <GarantieBlock />
          </SectionWrapper>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider fillColor="#1A1208" />

      <section className="bg-warmDark py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
                Prêt à avoir votre site en 7 jours ?
              </h2>
              <p className="text-white/60 text-lg mb-10">
                Me contacter est gratuit. Je vous explique ce que je peux faire pour vous.
              </p>
              <CTAButton href="/contact" variant="primary" size="lg">
                Parler de mon projet
              </CTAButton>
              <p className="text-white/30 text-sm mt-5">
                Réponse sous 24h
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}
