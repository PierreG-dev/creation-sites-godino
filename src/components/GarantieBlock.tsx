import { ShieldCheck, RotateCcw, Handshake } from 'lucide-react'

interface GarantieBlockProps {
  className?: string
  variant?: 'default' | 'dark' | 'minimal'
}

export function GarantieBlock({ className = '', variant = 'default' }: GarantieBlockProps) {
  const items = [
    {
      icon: ShieldCheck,
      title: '30 jours satisfait ou remboursé',
      desc: "Si votre site ne vous convient pas dans les 30 jours, je vous rembourse intégralement les 500 €. Sans question posée.",
    },
    {
      icon: RotateCcw,
      title: 'Résiliable à tout moment',
      desc: "Pas d'engagement sur la maintenance. Vous partez quand vous voulez, je transfère votre domaine et vos fichiers sous 5 jours.",
    },
    {
      icon: Handshake,
      title: 'Livraison garantie en 7 jours',
      desc: "Je m'engage sur la date. Votre site est en ligne en 7 jours ouvrés après notre premier échange, ou je vous offre un mois de maintenance.",
    },
  ]

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-accent2/8 text-accent2 rounded-full px-4 py-2 text-sm font-medium"
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'dark') {
    return (
      <section className={`bg-warmDark rounded-[2.5rem] p-8 md:p-12 ${className}`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent2/20 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" />
            Triple garantie
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">
            Vous ne prenez aucun risque
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Je travaille bien et j'aime que mes clients soient satisfaits. Ces garanties, c'est ma façon de le prouver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-accent2/20 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-accent2" />
              </div>
              <h3 className="font-playfair text-lg text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`bg-accent2/6 border border-accent2/15 rounded-[2.5rem] p-8 md:p-12 ${className}`}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-accent2/15 text-accent2 rounded-full px-4 py-2 text-sm font-medium mb-4">
          <ShieldCheck className="w-4 h-4" />
          Triple garantie
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-3">
          Vous ne prenez aucun risque
        </h2>
        <p className="text-textMuted max-w-xl mx-auto">
          Je travaille bien et j'aime que mes clients soient satisfaits. Ces garanties, c'est ma façon de le prouver.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-mid rounded-3xl p-6 shadow-soft"
          >
            <div className="w-10 h-10 rounded-2xl bg-accent2/10 flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-accent2" />
            </div>
            <h3 className="font-playfair text-lg text-warmDark mb-2">{item.title}</h3>
            <p className="text-textMuted text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
