import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink, MapPin, Briefcase } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { SectionWrapper, StaggerWrapper, StaggerItem } from '@/components/SectionWrapper'
import { WaveDivider } from '@/components/WaveDivider'
import { BadgeUrgence } from '@/components/BadgeUrgence'
import { realisations } from '@/data/realisations'

export const metadata: Metadata = {
  title: 'Réalisations — Sites web créés pour des artisans et TPE',
  description:
    'Découvrez les sites web créés pour des artisans et TPE françaises : plombiers, coiffeurs, électriciens, boulangers, restaurateurs. Résultats concrets.',
  alternates: {
    canonical: 'https://creation-sites-godino.fr/realisations', // TODO: Remplacer par le vrai domaine
  },
}

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-warmDark/8 text-warmDark rounded-full px-4 py-2 text-sm font-medium mb-6">
                Portfolio
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                Des sites qui travaillent pour eux.
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Chaque site a un objectif : générer des contacts et des clients. Voici quelques exemples de ce que je crée.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Grid réalisations */}
      {/* TODO: Remplacer les projets fictifs par de vraies réalisations clients (avec accord écrit du client) */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container">
          <StaggerWrapper className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realisations.map((projet) => (
              <StaggerItem key={projet.id}>
                <div className="bg-white border border-mid rounded-3xl overflow-hidden shadow-soft group hover:shadow-soft-lg transition-shadow duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-mid overflow-hidden">
                    <Image
                      src={projet.image}
                      alt={`Site web de ${projet.nom}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-warmDark/0 group-hover:bg-warmDark/20 transition-colors duration-300" />
                    {/* Voir le site button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={projet.href} // TODO: URL du site client
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white text-warmDark rounded-full px-5 py-2.5 text-sm font-medium shadow-soft-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir le site
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="font-playfair text-lg text-warmDark leading-snug">
                        {projet.nom}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-textMuted text-xs">
                        <Briefcase className="w-3 h-3" />
                        {projet.metier}
                      </div>
                      <div className="flex items-center gap-1.5 text-textMuted text-xs">
                        <MapPin className="w-3 h-3" />
                        {projet.ville}
                      </div>
                    </div>

                    <p className="text-textMuted text-sm leading-relaxed flex-1 mb-5">
                      {projet.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {projet.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-mid text-textMuted text-xs font-medium rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* Social proof */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-16 md:py-20">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl text-warmDark mb-4">
                Le vôtre sera ici aussi.
              </h2>
              <p className="text-textMuted mb-8 leading-relaxed">
                Chaque site que je crée est conçu pour être trouvé sur Google et convertir les visiteurs en clients. Votre secteur, votre ville, votre activité — je sais faire.
              </p>
              <BadgeUrgence className="mx-auto mb-6" />
              <CTAButton href="/contact" variant="primary" size="lg">
                Créer mon site maintenant
              </CTAButton>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}
