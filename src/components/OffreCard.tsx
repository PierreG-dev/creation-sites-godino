import {
  Globe,
  Mail,
  Wrench,
  Database,
  Lock,
  TrendingUp,
  MessageCircle,
  RefreshCw,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { CTAButton } from './CTAButton'
import { BadgeUrgence } from './BadgeUrgence'

const features = [
  { icon: Globe, text: 'Hébergement + nom de domaine inclus', highlight: false },
  { icon: Mail, text: 'Adresse email professionnelle (contact@votredomaine.fr)', highlight: false },
  { icon: Wrench, text: 'Modifications incluses — vous demandez, je fais (jusqu\'à 2h/mois)', highlight: true },
  { icon: Database, text: 'Sauvegardes automatiques quotidiennes', highlight: false },
  { icon: Lock, text: 'Certificat SSL + sécurité assurée en permanence', highlight: false },
  { icon: TrendingUp, text: 'Référencement Google (SEO on-page) inclus et maintenu', highlight: true },
  { icon: MessageCircle, text: 'Support email & WhatsApp — réponse sous 24h', highlight: true },
  { icon: RefreshCw, text: 'Mises à jour techniques invisibles pour vous', highlight: false },
]

interface OffreCardProps {
  variant?: 'compact' | 'full'
  className?: string
  showBadge?: boolean
}

export function OffreCard({ variant = 'full', className = '', showBadge = true }: OffreCardProps) {
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
          {showBadge && <BadgeUrgence className="mb-6" />}

          <h3 className="font-playfair text-2xl md:text-3xl text-white mb-2">
            L'offre la plus simple du marché
          </h3>
          <p className="text-white/60 mb-8">
            Normalement 500€ à la création. Avec l'offre lancement : <strong className="text-accent">création offerte</strong>, vous ne payez que 100€/mois.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-1 bg-accent/20 border border-accent/40 rounded-2xl p-5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Offre lancement
                </span>
              </div>
              <div className="text-accent text-xs uppercase tracking-widest mb-1 mt-1">Création</div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-medium text-white">0 <span className="text-lg text-white/60">€</span></span>
                <span className="font-mono text-lg text-white/30 line-through">500 €</span>
              </div>
              <div className="text-accent/80 text-sm mt-1 font-medium">Offerte pour les 5 premiers</div>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Mensuel tout compris</div>
              <div className="font-mono text-3xl font-medium text-white">100 <span className="text-lg text-white/60">€/mois</span></div>
              <div className="text-white/50 text-sm mt-1">Sans engagement, tout inclus</div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent2 flex-shrink-0" />
                <span className="text-white/70 text-sm">{f.text}</span>
              </div>
            ))}
            <div className="text-white/40 text-sm pl-7">+ 4 autres avantages inclus →</div>
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
              {showBadge && <BadgeUrgence className="mb-5" />}
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">
                Une offre. Un prix. Zéro surprise.
              </h2>
              <p className="text-white/60 text-lg max-w-xl">
                Tout ce dont votre entreprise a besoin sur internet, dans un seul abonnement sans prise de tête.
              </p>
            </div>

            {/* Prix */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 flex-shrink-0">
              <div className="bg-accent/15 border border-accent/40 rounded-2xl p-5 text-center min-w-[160px] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Offre lancement
                  </span>
                </div>
                <div className="text-accent text-xs uppercase tracking-widest mb-2 mt-1">Création</div>
                <div className="font-mono text-4xl font-medium text-white leading-none">0 <span className="text-xl text-white/40 line-through">500</span></div>
                <div className="text-accent/80 text-sm mt-1 font-medium">€ · offerte</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center min-w-[160px] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white/10 text-white/70 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                    Tout compris
                  </span>
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest mb-2 mt-1">Mensuel</div>
                <div className="font-mono text-4xl font-medium text-white leading-none">100</div>
                <div className="text-white/40 text-sm mt-1">€/mois · sans engagement</div>
              </div>
            </div>
          </div>

          {/* Features grid */}
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
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 flex items-start gap-4">
            <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-medium mb-1">Vous ne touchez à rien.</div>
              <div className="text-white/60 text-sm">
                Vous parlez, je fais. Modifications, pannes, mises à jour, sécurité — c'est mon problème, pas le vôtre.
                Vous gérez votre métier, je gère votre site.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton href="/contact" variant="primary" size="lg" className="flex-1 justify-center">
              Profiter de l'offre lancement
            </CTAButton>
            <CTAButton href="/comment-ca-marche" variant="secondary" size="lg" className="flex-1 justify-center border-white/30 text-white hover:bg-white hover:text-warmDark">
              Comment ça marche ?
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}
