import Link from 'next/link'
import { Users, Gift, Sparkles, ArrowRight } from 'lucide-react'
import { SectionWrapper, StaggerWrapper, StaggerItem } from './SectionWrapper'

const paliers = [
  { clients: 1, remise: 15, prix: 85 },
  { clients: 2, remise: 30, prix: 70 },
  { clients: 3, remise: 45, prix: 55 },
  { clients: 4, remise: 60, prix: 40 },
  { clients: 5, remise: 75, prix: 25 },
  { clients: 6, remise: 90, prix: 10 },
  { clients: 7, remise: 100, prix: 0, highlight: true },
]

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

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Gift className="w-4 h-4" />
                Programme parrainage
              </div>
              <h2 className="font-playfair text-3xl md:text-5xl leading-tight mb-5">
                Votre site peut devenir <span className="italic">gratuit.</span>
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-6">
                <strong className="text-white">−15 % sur votre abonnement mensuel</strong> pour chaque client que vous m'apportez.{' '}
                <strong className="text-white">Cumulable jusqu'à 100 %.</strong>
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Vous connaissez un artisan, un commerçant, un indépendant qui a besoin d'un site&nbsp;? Recommandez-moi. À 7 clients apportés, votre abonnement tombe à 0 €.
              </p>
              <Link
                href="/offre#parrainage"
                className="inline-flex items-center gap-2 bg-white text-accent2 hover:bg-white/90 font-semibold rounded-full px-6 py-3 transition-all hover:gap-3"
              >
                Comment ça marche
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8">
                <div className="text-white/70 text-xs uppercase tracking-widest mb-4 text-center">
                  Votre abonnement selon vos parrainages
                </div>
                <div className="space-y-2">
                  {[
                    { c: 0, prix: 100, label: 'Sans parrainage' },
                    { c: 3, prix: 55, label: '3 clients apportés' },
                    { c: 5, prix: 25, label: '5 clients apportés' },
                    { c: 7, prix: 0, label: '7 clients apportés', highlight: true },
                  ].map((row) => (
                    <div
                      key={row.c}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                        row.highlight
                          ? 'bg-white text-accent2 shadow-lg'
                          : 'bg-white/5 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${row.highlight ? 'text-accent2' : 'text-white/60'}`} />
                        <span className={`text-sm ${row.highlight ? 'font-semibold' : 'text-white/80'}`}>
                          {row.label}
                        </span>
                      </div>
                      <div className={`font-mono text-lg font-medium ${row.highlight ? 'text-accent2' : ''}`}>
                        {row.prix === 0 ? (
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            Gratuit
                          </span>
                        ) : (
                          <>{row.prix} <span className="text-sm opacity-70">€/mois</span></>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-white/50 text-xs text-center mt-4">
                  Base : tarif lancement 100 €/mois
                </div>
              </div>
            </div>
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
            Programme parrainage
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl text-warmDark mb-5 leading-tight">
            Votre abonnement, <span className="italic text-accent2">divisé par vos clients.</span>
          </h2>
          <p className="text-textMuted text-lg leading-relaxed">
            <strong className="text-warmDark">−15 % de remise mensuelle</strong> par client que vous m'apportez.{' '}
            <strong className="text-accent2">Cumulable jusqu'à 100 % — 7 clients apportés = abonnement gratuit.</strong>
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <StaggerWrapper
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8"
          staggerDelay={0.06}
        >
          {paliers.map((p) => (
            <StaggerItem key={p.clients}>
              <div
                className={`rounded-2xl p-4 md:p-5 text-center h-full flex flex-col justify-between border-2 min-h-[140px] ${
                  p.highlight
                    ? 'bg-accent2 border-accent2 text-white shadow-soft scale-105'
                    : 'bg-white border-mid text-warmDark'
                }`}
              >
                <div className={`flex items-center justify-center gap-1 text-xs uppercase tracking-widest mb-2 ${
                  p.highlight ? 'text-white/80' : 'text-textMuted'
                }`}>
                  <Users className="w-3 h-3" />
                  {p.clients} client{p.clients > 1 ? 's' : ''}
                </div>
                <div className="flex flex-col items-center">
                  {p.highlight ? (
                    <>
                      <Sparkles className="w-6 h-6 mb-1" />
                      <div className="font-playfair text-2xl font-semibold leading-none mb-1">
                        Gratuit
                      </div>
                      <div className="text-xs text-white/80">
                        0 €/mois
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-mono text-2xl md:text-3xl font-medium leading-none mb-1">
                        −{p.remise}%
                      </div>
                      <div className="text-xs text-textMuted">
                        {p.prix} €/mois
                      </div>
                    </>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-mid shadow-soft max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent2/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent2" />
            </div>
            <div>
              <div className="text-warmDark font-medium mb-1">
                Un bouche-à-oreille qui rapporte vraiment.
              </div>
              <div className="text-textMuted text-sm leading-relaxed">
                Vous connaissez un artisan, un commerçant, un indépendant qui aurait besoin d'un site&nbsp;? Recommandez-moi. La remise s'applique dès que le client parrainé devient actif — sur simple demande, il vous suffit de me signaler le parrainage lors de la souscription du filleul.
                <br />
                <span className="text-textMuted/80 text-xs mt-2 inline-block">
                  Exemple sur base tarif lancement 100 €/mois. Sur le tarif standard 150 €/mois, l'économie mensuelle est proportionnelle.
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
