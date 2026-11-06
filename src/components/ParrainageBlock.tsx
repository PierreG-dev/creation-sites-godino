import Link from 'next/link'
import { Gift, Sparkles, ArrowRight } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'

interface ParrainageBlockProps {
  variant?: 'full' | 'hero'
  className?: string
}

export function ParrainageBlock({ variant = 'full', className = '' }: ParrainageBlockProps) {
  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-gradient-to-br from-accent2 to-[#3d6b5f] rounded-[2.5rem] p-8 md:p-14 text-white relative overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #C8622A 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Parrainage
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl leading-tight mb-5">
              Votre mensuel peut descendre <span className="italic">à 0 €.</span>
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-6">
              Chaque client que vous me recommandez fait baisser votre mensuel.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Vous connaissez un artisan, un commerçant ou un indépendant qui a besoin d&apos;un site ? Recommandez-moi.
            </p>
            <Link
              href="/offre#parrainage"
              className="inline-flex items-center gap-2 bg-white text-accent2 hover:bg-white/90 font-semibold rounded-full px-6 py-3 transition-all hover:gap-3"
            >
              Comment ça marche
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-accent2/10 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Parrainage
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl text-warmDark mb-5 leading-tight">
            Vos recommandations font <span className="italic text-accent2">baisser votre mensuel.</span>
          </h2>
          <p className="text-textMuted text-lg leading-relaxed">
            Chaque client que vous me recommandez fait baisser votre mensuel.
          </p>
          <p className="text-textMuted text-lg leading-relaxed">
            <strong className="text-accent2">Il peut descendre jusqu&apos;à 0 €.</strong>
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-mid shadow-soft max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent2/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent2" />
            </div>
            <div>
              <div className="text-warmDark font-medium mb-1">
                Comment ça marche
              </div>
              <div className="text-textMuted text-sm leading-relaxed space-y-2">
                <p>
                  Vous connaissez un artisan, un commerçant ou un indépendant qui aurait besoin d&apos;un site ? Recommandez-moi.
                </p>
                <p>
                  Signalez-moi la recommandation quand cette personne me contacte.
                </p>
                <p>
                  La baisse s&apos;applique dès qu&apos;elle devient cliente active.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
