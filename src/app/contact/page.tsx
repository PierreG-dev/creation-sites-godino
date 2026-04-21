import type { Metadata } from 'next'
import { Mail, Clock, MessageCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/SectionWrapper'
import { GarantieBlock } from '@/components/GarantieBlock'
import { BadgeUrgence } from '@/components/BadgeUrgence'
import { WaveDivider } from '@/components/WaveDivider'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Parlons de votre projet de site web',
  description:
    'Contactez Pierre GODINO pour créer votre site web professionnel. Réponse sous 24h. Consultation gratuite et sans engagement. Livraison en 7 jours garantie.',
  alternates: {
    canonical: 'https://creation-sites-godino.fr/contact', // TODO: Remplacer par le vrai domaine
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-medium mb-6">
                Gratuit · Sans engagement
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                Parlons de votre projet.
                <br />
                <span className="text-accent italic">C'est gratuit.</span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Dites-moi qui vous êtes et ce que vous faites. Je vous explique exactement ce que je peux faire pour vous. Pas de jargon, pas de pression.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-cream pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Form */}
            <SectionWrapper>
              <div>
                <BadgeUrgence variant="large" className="mb-8" />
                <ContactForm />
              </div>
            </SectionWrapper>

            {/* Sidebar info */}
            <SectionWrapper delay={0.1}>
              <div className="space-y-5">
                {/* Contact direct */}
                <div className="bg-white border border-mid rounded-3xl p-7 shadow-soft">
                  <h2 className="font-playfair text-xl text-warmDark mb-5">
                    Contact direct
                  </h2>
                  <div className="space-y-4">
                    <a
                      href="mailto:contact@creation-sites-godino.fr"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <Mail className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div>
                        <div className="text-warmDark font-medium text-sm group-hover:text-accent transition-colors">
                          contact@creation-sites-godino.fr
                        </div>
                        <div className="text-textMuted text-xs">Email — réponse sous 24h</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/33767249980"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                        <MessageCircle className="w-4.5 h-4.5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-warmDark font-medium text-sm group-hover:text-green-600 transition-colors">
                          WhatsApp — +33 7 67 24 99 80
                        </div>
                        <div className="text-textMuted text-xs">Réponse rapide garantie</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-mid rounded-3xl p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Clock className="w-4 h-4 text-textMuted" />
                    <span className="font-medium text-warmDark text-sm">Disponibilités</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-textMuted">Lundi — Vendredi</span>
                      <span className="text-warmDark font-medium">9h — 19h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textMuted">Samedi</span>
                      <span className="text-warmDark font-medium">Sur rendez-vous</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textMuted">Réponse email</span>
                      <span className="text-warmDark font-medium">Sous 24h</span>
                    </div>
                  </div>
                </div>

                {/* Promise */}
                <div className="bg-warmDark rounded-3xl p-6">
                  <div className="font-playfair text-white text-lg mb-3">
                    Ce que vous obtenez
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Une réponse personnalisée, pas un template',
                      "Un délai et un prix clairs d'entrée",
                      'Aucune obligation de suite',
                      'Livraison en 7 jours si vous décidez',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Garantie */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-20">
        <div className="container">
          <SectionWrapper>
            <GarantieBlock />
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}
