import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, Euro, Users, Quote } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { SectionWrapper, StaggerWrapper, StaggerItem } from '@/components/SectionWrapper'
import { OffreCard } from '@/components/OffreCard'
import { GarantieBlock } from '@/components/GarantieBlock'
import { BadgeUrgence } from '@/components/BadgeUrgence'
import { TestimonialCard } from '@/components/TestimonialCard'
import { StepCard } from '@/components/StepCard'
import { WaveDivider } from '@/components/WaveDivider'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faq'
import FAQSection from './_components/FAQSection'

// TODO: Remplacer VOTRE_DOMAINE par le vrai domaine
export const metadata: Metadata = {
  title: 'Votre site pro livré en 7 jours — GODINO Pierre',
  description:
    'Création de sites web pour artisans et TPE françaises. 500 € HT + 100 €/mois tout compris. Hébergement, email, SEO, maintenance. Livré en 7 jours. Garanti 30 jours.',
  alternates: {
    canonical: 'https://creation-sites-godino.fr',
  },
}

const painPoints = [
  {
    icon: Users,
    title: 'Pas de site = des clients qui vont chez le concurrent',
    desc: "Aujourd'hui, 81% des gens cherchent un artisan sur Google avant d'appeler. Sans site, vous n'existez pas pour eux.",
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: Euro,
    title: 'Les agences : 3 000 € minimum, 3 mois d'attente',
    desc: 'Devis interminables, réunions à n\'en plus finir, et une facture qui dépasse toujours le budget prévu.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Clock,
    title: 'Les constructeurs DIY : 10h à perdre pour un résultat moyen',
    desc: 'Wix, WordPress, Squarespace... Vous avez votre métier à gérer, pas à devenir développeur web.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
]

const steps = [
  {
    title: 'On se parle 15 minutes',
    desc: 'Un appel ou un échange WhatsApp. Vous m'expliquez votre activité, vos clients, ce que vous voulez mettre en avant. Je pose quelques questions. C'est tout.',
  },
  {
    title: 'Je crée votre site',
    desc: 'Je m'occupe de tout : design, textes, photos, structure. Je vous envoie un lien de prévisualisation. Vous me dites quoi changer, je retouche jusqu'à ce que ce soit parfait.',
  },
  {
    title: 'Votre site est en ligne en 7 jours',
    desc: 'Livraison garantie. Présentation incluse. Je vous montre le résultat et vous explique ce que vous avez maintenant en main.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center py-20 overflow-hidden bg-cream">
        {/* Blobs décoratifs */}
        <div
          className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(74,124,111,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(232,221,208,0.5) 0%, transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge offre lancement */}
            <SectionWrapper>
              <BadgeUrgence className="mb-8 mx-auto" />
            </SectionWrapper>

            {/* Headline */}
            <SectionWrapper delay={0.1}>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-[4.5rem] text-warmDark leading-[1.08] mb-6 text-balance">
                Votre site pro livré{' '}
                <span className="text-accent italic">en 7 jours.</span>
                <br />
                Vous ne touchez à rien.
              </h1>
            </SectionWrapper>

            {/* Subtitle */}
            <SectionWrapper delay={0.2}>
              <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
                Je crée, j'héberge, je sécurise, je référence.
                <br className="hidden sm:block" />
                Vous gérez votre métier. Je gère votre présence en ligne.
              </p>
            </SectionWrapper>

            {/* CTAs */}
            <SectionWrapper delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Profiter de l'offre lancement
                </CTAButton>
                <CTAButton href="/offre" variant="secondary" size="lg">
                  Voir l'offre complète
                </CTAButton>
              </div>
            </SectionWrapper>

            {/* Floating trust badges */}
            <SectionWrapper delay={0.4}>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Livraison en 7 jours', emoji: '⚡' },
                  { label: 'Garanti 30 jours', emoji: '🛡️' },
                  { label: 'Prix fixe, zéro surprise', emoji: '✓' },
                  { label: 'Sans engagement', emoji: '🤝' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-white border border-mid rounded-full px-5 py-2.5 shadow-soft text-sm font-medium text-warmDark"
                  >
                    <span>{badge.emoji}</span>
                    {badge.label}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textMuted/50">
          <div className="w-5 h-8 rounded-full border border-mid flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-textMuted/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROBLÈME
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-warmDark/8 text-warmDark rounded-full px-4 py-2 text-sm font-medium mb-5">
                Le problème
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-4">
                Vous méritez un site pro. <br className="hidden sm:block" />
                Les options actuelles vous le compliquent.
              </h2>
            </div>
          </SectionWrapper>

          <StaggerWrapper className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="bg-white rounded-3xl p-7 shadow-soft h-full">
                  <div className={`w-11 h-11 rounded-2xl ${point.bg} flex items-center justify-center mb-5`}>
                    <point.icon className={`w-5 h-5 ${point.color}`} />
                  </div>
                  <h3 className="font-playfair text-lg text-warmDark mb-3 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed">{point.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOLUTION
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#FAF7F2" flip />

      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-medium mb-6">
                La solution
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-warmDark mb-6 leading-tight">
                Et si tout ça coûtait{' '}
                <span className="font-mono text-accent">100 €/mois</span>&nbsp;?
              </h2>
              <p className="text-textMuted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Un site professionnel créé pour vous, hébergé, sécurisé, référencé et maintenu.
                Vous parlez, je fais. <strong className="text-warmDark">Vous ne touchez à rien.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  'Hébergement inclus',
                  'Email pro inclus',
                  'SEO Google inclus',
                  'Modifications incluses',
                  'Support WhatsApp',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-accent2/8 text-accent2 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OFFRE CARD
      ═══════════════════════════════════════ */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container">
          <SectionWrapper>
            <OffreCard variant="compact" />
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMMENT ÇA MARCHE (résumé)
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SectionWrapper>
              <div className="inline-flex items-center gap-2 bg-accent2/15 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-5">
                Le processus
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-4">
                Simple comme une conversation.
              </h2>
              <p className="text-textMuted leading-relaxed mb-8">
                Vous n'avez rien à préparer, rien à apprendre. On se parle, je crée, votre site est en ligne.
              </p>
              <Link
                href="/comment-ca-marche"
                className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
              >
                Voir le processus en détail
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SectionWrapper>

            <div>
              {steps.map((step, i) => (
                <SectionWrapper key={step.title} delay={i * 0.1}>
                  <StepCard
                    step={i + 1}
                    title={step.title}
                    desc={step.desc}
                    isLast={i === steps.length - 1}
                  />
                </SectionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TÉMOIGNAGES
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#FAF7F2" flip />

      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-warmDark/8 text-warmDark rounded-full px-4 py-2 text-sm font-medium mb-5">
                <Quote className="w-4 h-4" />
                Ce qu'ils en disent
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl text-warmDark">
                Des artisans qui ont fait le pas
              </h2>
            </div>
          </SectionWrapper>

          <StaggerWrapper className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <TestimonialCard testimonial={t} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GARANTIE
      ═══════════════════════════════════════ */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container">
          <SectionWrapper>
            <GarantieBlock />
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-4">
                Vos questions
              </h2>
              <p className="text-textMuted">
                Les réponses aux questions les plus fréquentes. D'autres questions ?{' '}
                <Link href="/contact" className="text-accent underline underline-offset-4 hover:no-underline">
                  Écrivez-moi.
                </Link>
              </p>
            </div>
          </SectionWrapper>

          <div className="max-w-3xl mx-auto">
            <FAQSection faqs={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════ */}
      <WaveDivider fillColor="#1A1208" flip />

      <section className="bg-warmDark py-24 md:py-32 relative overflow-hidden">
        {/* Blob décoratif */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.12) 0%, transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <SectionWrapper>
              <BadgeUrgence className="mb-8 mx-auto" />
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6 leading-tight">
                Votre site pro, livré{' '}
                <span className="text-accent italic">en 7 jours.</span>
                <br />
                Commençons maintenant.
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Profitez de l'offre lancement : création offerte pour les 5 premiers clients.
                Ne payez que 100 €/mois dès la mise en ligne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Démarrer mon projet gratuitement
                </CTAButton>
                <CTAButton href="/offre" variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white hover:text-warmDark">
                  Voir l'offre complète
                </CTAButton>
              </div>
              <p className="text-white/30 text-sm">
                Sans engagement · Réponse sous 24h · Zéro démarche de votre côté
              </p>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </>
  )
}
