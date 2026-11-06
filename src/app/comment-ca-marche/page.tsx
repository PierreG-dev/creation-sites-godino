import type { Metadata } from 'next'
import { MessageCircle, Palette, Settings, Rocket, Heart } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { SectionWrapper } from '@/components/SectionWrapper'
import { StepCard } from '@/components/StepCard'
import { GarantieBlock } from '@/components/GarantieBlock'
import { WaveDivider } from '@/components/WaveDivider'
import { SITE_URL, pageSocialMetadata } from '@/lib/site'

const DESCRIPTION =
  "Votre site est créé et mis en ligne en 7 jours. 5 étapes, rien à préparer. Je m'occupe du domaine, de l'hébergement, du design et du référencement de base."

export const metadata: Metadata = {
  title: 'Comment ça marche : votre site en ligne en 7 jours',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/comment-ca-marche`,
  },
  ...pageSocialMetadata({ path: '/comment-ca-marche', title: 'Comment ça marche : votre site en ligne en 7 jours', description: DESCRIPTION }),
}

const steps = [
  {
    icon: MessageCircle,
    title: 'On se parle 15 minutes',
    desc: "Un appel téléphonique, simple et direct. Vous m'expliquez votre activité, vos clients, ce que vous aimeriez mettre en avant. Je pose quelques questions. Pas de jargon technique, pas de présentation PowerPoint. Juste une conversation naturelle. Vous n'avez rien à préparer.",
    detail: 'Appel · 15 min · Aucune préparation nécessaire',
  },
  {
    icon: Palette,
    title: 'Je crée votre site',
    desc: "Je m'occupe de tout : le design, les textes, les photos (si vous n'en avez pas, j'utilise des photos professionnelles libres de droits adaptées à votre secteur), la structure, les formulaires de contact. Vous recevez un lien de prévisualisation. Vous me dites ce que vous voulez changer, je retouche jusqu'à ce que le site vous convienne. Pas de limite sur les retouches.",
    detail: 'Design + textes + photos · Retouches illimitées · Lien prévisualisation',
  },
  {
    icon: Settings,
    title: "Je m'occupe de tout le technique",
    desc: "Nom de domaine, hébergement, certificat HTTPS, référencement de base : je configure tout pour vous. Vous ne voyez rien de tout ça, vous n'avez rien à comprendre. C'est mon travail, pas le vôtre.",
    detail: 'Domaine + hébergement + HTTPS · Invisible pour vous',
  },
  {
    icon: Rocket,
    title: 'Votre site est en ligne en 7 jours',
    desc: "Livraison en 7 jours ouvrés après notre premier échange. Je vous envoie le lien de votre site définitif. Je vous montre aussi comment me contacter si vous voulez modifier quelque chose.",
    detail: '7 jours ouvrés · Présentation incluse · Lien définitif',
  },
  {
    icon: Heart,
    title: "Je reste là",
    desc: "La relation ne s'arrête pas à la livraison. Chaque mois, je maintiens votre site, je le mets à jour et j'assure sa sécurité. Je gère les éventuels problèmes techniques. Vous voulez changer un texte, ajouter une photo, modifier vos horaires ? Vous m'envoyez un message, je m'en charge. Les modifications sont comprises dans le mensuel, à volonté, dans la limite du raisonnable.",
    detail: 'Support email · Modifications comprises · Mises à jour et sécurité',
  },
]

export default function CommentCaMarchePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(74,124,111,0.12) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent2/12 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-6">
                Le processus
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                5 étapes. Vous ne faites rien.
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Vraiment rien. Vous parlez, je crée, votre site est en ligne. Tout le reste c'est moi.
                C'est comme ça que ça devrait toujours fonctionner.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <SectionWrapper key={step.title} delay={i * 0.05}>
                <div className="relative">
                  <div className="flex gap-6">
                    {/* Number + connector */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-warmDark text-white font-mono font-medium text-xl flex items-center justify-center flex-shrink-0 shadow-soft-lg z-10">
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-warmDark/20 to-mid mt-2 min-h-[4rem]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${i < steps.length - 1 ? 'pb-12' : ''}`}>
                      <div className="bg-white border border-mid rounded-3xl p-7 shadow-soft">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-4.5 h-4.5 text-accent" />
                          </div>
                          <h2 className="font-playfair text-xl md:text-2xl text-warmDark">
                            {step.title}
                          </h2>
                        </div>
                        <p className="text-textMuted leading-relaxed mb-5">
                          {step.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.detail.split(' · ').map((d) => (
                            <span
                              key={d}
                              className="bg-mid text-textMuted text-xs font-medium rounded-full px-3 py-1"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Recap message clé */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-16 md:py-20">
        <div className="container">
          <SectionWrapper>
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="font-playfair text-2xl md:text-3xl text-warmDark leading-snug mb-6">
                Vous ne touchez à rien. Vous me parlez, je m'occupe du reste.
                Votre site est en ligne en 7 jours.
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-mono font-bold text-sm">G</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-warmDark text-sm">Pierre GODINO</div>
                  <div className="text-textMuted text-xs">Créateur de sites web pour artisans</div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Garantie */}
      <WaveDivider fillColor="#E8DDD0" flip />

      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <GarantieBlock />
          </SectionWrapper>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container">
          <SectionWrapper>
            <div className="bg-warmDark rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.1) 0%, transparent 60%)' }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2 className="font-playfair text-3xl md:text-4xl text-white mb-5">
                  Prêt à commencer ?
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  15 minutes de conversation, et je m'occupe du reste. Votre site sera en ligne en 7 jours.
                </p>
                <CTAButton href="/contact" variant="primary" size="lg">
                  Parler de mon projet
                </CTAButton>
                <p className="text-white/30 text-sm mt-4">
                  Contact gratuit. Pas d'engagement de durée. Réponse sous 24h.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}
