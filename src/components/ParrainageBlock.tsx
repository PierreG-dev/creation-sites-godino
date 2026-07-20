import { Users, Gift, Sparkles } from 'lucide-react'
import { SectionWrapper, StaggerWrapper, StaggerItem } from './SectionWrapper'

const paliers = [
  { clients: 1, remise: '15 %' },
  { clients: 2, remise: '30 %' },
  { clients: 3, remise: '45 %' },
  { clients: 4, remise: '60 %' },
  { clients: 5, remise: '75 %' },
  { clients: 6, remise: '90 %' },
  { clients: 7, remise: 'Gratuit', highlight: true },
]

interface ParrainageBlockProps {
  className?: string
}

export function ParrainageBlock({ className = '' }: ParrainageBlockProps) {
  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-accent2/10 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Bonus parrainage
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-4 leading-tight">
            Divisez votre abonnement par le bouche-à-oreille.
          </h2>
          <p className="text-textMuted text-lg leading-relaxed">
            <strong className="text-warmDark">15 % de remise mensuelle</strong> par client que vous m'apportez.{' '}
            <strong className="text-accent2">Cumulable jusqu'à 100 %.</strong>
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <StaggerWrapper
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3"
          staggerDelay={0.06}
        >
          {paliers.map((p) => (
            <StaggerItem key={p.clients}>
              <div
                className={`rounded-2xl p-4 text-center h-full flex flex-col justify-center border transition-transform ${
                  p.highlight
                    ? 'bg-accent2/10 border-accent2/40 shadow-soft'
                    : 'bg-white border-mid'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-textMuted text-xs uppercase tracking-widest mb-2">
                  <Users className="w-3 h-3" />
                  {p.clients} client{p.clients > 1 ? 's' : ''}
                </div>
                {p.highlight ? (
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-5 h-5 text-accent2" />
                    <div className="font-playfair text-xl text-accent2 font-semibold leading-none">
                      {p.remise}
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-2xl text-warmDark font-medium leading-none">
                    −{p.remise}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <p className="text-center text-textMuted text-sm mt-8 max-w-xl mx-auto">
          Applicable dès que le client parrainé devient actif. Sur simple demande — il suffit de me signaler le parrainage.
        </p>
      </SectionWrapper>
    </div>
  )
}
