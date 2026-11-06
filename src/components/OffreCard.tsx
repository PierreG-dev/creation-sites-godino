import {
  Globe,
  AtSign,
  Wrench,
  Database,
  Lock,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Zap,
  Users,
} from 'lucide-react'
import { CTAButton } from './CTAButton'

const features = [
  { icon: Globe, text: 'Hébergement', highlight: false },
  { icon: AtSign, text: 'Nom de domaine', highlight: false },
  { icon: Lock, text: 'Certificat HTTPS', highlight: false },
  { icon: Database, text: 'Sauvegardes chaque jour', highlight: false },
  { icon: RefreshCw, text: 'Mises à jour', highlight: false },
  { icon: ShieldCheck, text: 'Sécurité', highlight: false },
  { icon: TrendingUp, text: 'Référencement de base', highlight: false },
  { icon: Wrench, text: 'Modifications à volonté, dans la limite du raisonnable', highlight: true },
]

interface OffreCardProps {
  variant?: 'compact' | 'full'
  className?: string
}

export function OffreCard({ variant = 'full', className = '' }: OffreCardProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-warmDark rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden ${className}`}>
        {/* Blob décoratif */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C8622A 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h3 className="font-playfair text-2xl md:text-3xl text-white mb-2">
            Une offre. Un prix.
          </h3>
          <p className="text-white/60 mb-8">
            La création du site est offerte. Ensuite, vous payez un mensuel.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-1 bg-accent/20 border border-accent/40 rounded-2xl p-5">
              <div className="text-accent text-xs uppercase tracking-widest mb-1">Mensuel</div>
              <div className="font-mono text-3xl font-medium text-white">50 <span className="text-lg text-white/60">€/mois</span></div>
              <div className="text-white/60 text-sm mt-1">Au lieu de 100 €</div>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Création du site</div>
              <div className="font-mono text-3xl font-medium text-white">Offerte</div>
              <div className="text-white/50 text-sm mt-1">Pas d&apos;engagement de durée.</div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent2 flex-shrink-0" />
                <span className="text-white/70 text-sm">{f.text}</span>
              </div>
            ))}
            <div className="text-white/40 text-sm pl-7">Et {features.length - 4} autres éléments compris</div>
          </div>

          <CTAButton href="/offre" variant="primary" size="lg" className="w-full justify-center">
            Voir l'offre complète
          </CTAButton>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Card principale */}
      <div className="bg-warmDark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
        {/* Blobs décoratifs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #C8622A 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #4A7C6F 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">
                Le détail de l&apos;offre
              </h2>
              <p className="text-white/60 text-lg max-w-xl">
                La création du site est offerte. Elle n&apos;est pas comprise dans le mensuel.
              </p>
            </div>

            {/* Prix */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 flex-shrink-0">
              <div className="bg-accent/15 border border-accent/40 rounded-2xl p-5 text-center min-w-[160px]">
                <div className="text-accent text-xs uppercase tracking-widest mb-2">Mensuel</div>
                <div className="font-mono text-4xl font-medium text-white leading-none">50</div>
                <div className="text-white/60 text-sm mt-1">€/mois, au lieu de 100 €</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center min-w-[160px]">
                <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Création</div>
                <div className="font-mono text-4xl font-medium text-white leading-none">0 €</div>
                <div className="text-white/40 text-sm mt-1">Offerte</div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Compris dans le mensuel</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-2xl p-4 ${
                  feature.highlight
                    ? 'bg-white/8 border border-white/10'
                    : 'bg-white/4'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-accent2/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <feature.icon className="w-4 h-4 text-accent2" />
                </div>
                <span className="text-white/80 text-sm leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Message clé */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 flex items-start gap-4">
            <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-medium mb-1">Pas d&apos;engagement de durée.</div>
              <div className="text-white/60 text-sm">
                Si vous ne gardez pas le site, vous ne devez rien.
              </div>
            </div>
          </div>

          {/* Parrainage */}
          <div className="bg-accent2/15 border border-accent2/30 rounded-2xl p-5 mb-8 flex items-start gap-4">
            <Users className="w-5 h-5 text-accent2 flex-shrink-0 mt-0.5" />
            <div className="text-white/85 text-sm leading-relaxed">
              <span className="text-accent2 font-semibold">Parrainage.</span>{' '}
              Chaque client que vous me recommandez fait baisser votre mensuel, <strong className="text-white">jusqu&apos;à 0 €</strong>.
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton href="/contact" variant="primary" size="lg" className="flex-1 justify-center">
              Parler de mon projet
            </CTAButton>
            <CTAButton href="/comment-ca-marche" variant="secondary" size="lg" dark className="flex-1 justify-center">
              Comment ça marche ?
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}
