import type { Metadata } from 'next'
import { CheckCircle2, X, Minus } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { SectionWrapper, StaggerWrapper, StaggerItem } from '@/components/SectionWrapper'
import { OffreCard } from '@/components/OffreCard'
import { GarantieBlock } from '@/components/GarantieBlock'
import { BadgeUrgence } from '@/components/BadgeUrgence'
import { WaveDivider } from '@/components/WaveDivider'

export const metadata: Metadata = {
  title: "L'offre — Site web professionnel 500€ + 100€/mois tout compris",
  description:
    "Une seule offre claire : création de site web 500€ HT + maintenance 100€/mois tout compris. Hébergement, domaine, email, SEO, modifications, support. Zéro surprise.",
  alternates: {
    canonical: 'https://creation-sites-godino.fr/offre', // TODO: Remplacer par le vrai domaine
  },
}

const comparatif = [
  {
    critere: 'Prix de création',
    godino: '500 € HT',
    agence: '3 000 — 15 000 € HT',
    diy: '0 € (mais votre temps)',
    godinoOk: true,
    agenceOk: false,
    diyOk: null,
  },
  {
    critere: 'Délai de livraison',
    godino: '7 jours',
    agence: '2 — 6 mois',
    diy: 'Illimité (si vous y arrivez)',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
  {
    critere: 'Hébergement inclus',
    godino: 'Oui',
    agence: 'Non (50 — 200 €/an en plus)',
    diy: 'Non (ou limité)',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
  {
    critere: 'Email professionnel',
    godino: 'Oui',
    agence: 'En option payante',
    diy: 'Non',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
  {
    critere: 'SEO Google inclus',
    godino: 'Oui, suivi mensuel',
    agence: 'En option (500 — 2000 €/mois)',
    diy: 'Basique, peu efficace',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
  {
    critere: 'Modifications du site',
    godino: 'Inclus (2h/mois)',
    agence: 'Facturées (75 — 150 €/h)',
    diy: 'Vous-même',
    godinoOk: true,
    agenceOk: false,
    diyOk: null,
  },
  {
    critere: 'Support réactif',
    godino: 'WhatsApp + email, 24h',
    agence: 'Ticket, 3 — 10 jours',
    diy: 'Forums internet',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
  {
    critere: 'Garantie satisfait ou remboursé',
    godino: '30 jours',
    agence: 'Rarissime',
    diy: 'Non applicable',
    godinoOk: true,
    agenceOk: false,
    diyOk: false,
  },
]

function CellValue({ value, ok }: { value: string; ok: boolean | null }) {
  return (
    <div className="flex items-start gap-2">
      {ok === true && <CheckCircle2 className="w-4 h-4 text-accent2 flex-shrink-0 mt-0.5" />}
      {ok === false && <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
      {ok === null && <Minus className="w-4 h-4 text-textMuted flex-shrink-0 mt-0.5" />}
      <span className={ok === true ? 'text-warmDark font-medium' : 'text-textMuted'}>
        {value}
      </span>
    </div>
  )
}

export default function OffrePage() {
  return (
    <>
      {/* Hero secondaire */}
      <section className="bg-cream pt-16 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(200,98,42,0.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <SectionWrapper>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-medium mb-6">
                L'offre unique
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-warmDark mb-5 leading-tight">
                L'offre la plus simple du marché.
              </h1>
              <p className="text-textMuted text-lg leading-relaxed max-w-xl">
                Un prix fixe. Un délai garanti. Tout inclus. Vous ne cherchez pas ce qu'il faut payer en plus — parce qu'il n'y a rien en plus.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* OffreCard full */}
      <section className="bg-cream pb-20">
        <div className="container">
          <SectionWrapper>
            <OffreCard variant="full" />
          </SectionWrapper>
        </div>
      </section>

      {/* Comparatif */}
      <WaveDivider fillColor="#E8DDD0" />

      <section className="bg-mid py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl text-warmDark mb-4">
                Godino vs Agence vs DIY
              </h2>
              <p className="text-textMuted">
                Comparez objectivement. Le résultat parle de lui-même.
              </p>
            </div>
          </SectionWrapper>

          {/* Desktop table */}
          <SectionWrapper>
            <div className="hidden md:block bg-white rounded-3xl shadow-soft overflow-hidden border border-mid">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-mid">
                    <th className="text-left px-6 py-4 text-textMuted text-sm font-medium w-[28%]">
                      Critère
                    </th>
                    <th className="px-6 py-4 w-[24%]">
                      <div className="bg-accent text-white rounded-xl px-4 py-2 text-sm font-semibold inline-block">
                        GODINO Pierre ✓
                      </div>
                    </th>
                    <th className="px-6 py-4 text-warmDark text-sm font-medium w-[24%]">
                      Agence web
                    </th>
                    <th className="px-6 py-4 text-warmDark text-sm font-medium w-[24%]">
                      DIY (Wix, etc.)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparatif.map((row, i) => (
                    <tr
                      key={row.critere}
                      className={`border-b border-mid last:border-0 ${i % 2 === 0 ? '' : 'bg-cream/40'}`}
                    >
                      <td className="px-6 py-4 text-textMuted text-sm font-medium">
                        {row.critere}
                      </td>
                      <td className="px-6 py-4 bg-accent/4">
                        <CellValue value={row.godino} ok={row.godinoOk} />
                      </td>
                      <td className="px-6 py-4">
                        <CellValue value={row.agence} ok={row.agenceOk} />
                      </td>
                      <td className="px-6 py-4">
                        <CellValue value={row.diy} ok={row.diyOk} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {comparatif.map((row) => (
                <div key={row.critere} className="bg-white rounded-2xl p-5 shadow-soft border border-mid">
                  <div className="text-textMuted text-xs uppercase tracking-widest mb-3">
                    {row.critere}
                  </div>
                  <div className="space-y-2">
                    <div className="bg-accent/6 rounded-xl p-3">
                      <div className="text-accent text-xs font-semibold mb-1">GODINO</div>
                      <CellValue value={row.godino} ok={row.godinoOk} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-cream rounded-xl p-3">
                        <div className="text-textMuted text-xs mb-1">Agence</div>
                        <div className="text-textMuted text-xs">{row.agence}</div>
                      </div>
                      <div className="bg-cream rounded-xl p-3">
                        <div className="text-textMuted text-xs mb-1">DIY</div>
                        <div className="text-textMuted text-xs">{row.diy}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Badge urgence */}
      <WaveDivider fillColor="#FAF7F2" flip />

      <section className="bg-cream py-20">
        <div className="container">
          <SectionWrapper>
            <div className="max-w-2xl mx-auto">
              <BadgeUrgence variant="large" className="mb-10" />
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Garantie */}
      <section className="bg-cream pb-20">
        <div className="container">
          <SectionWrapper>
            <GarantieBlock />
          </SectionWrapper>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider fillColor="#1A1208" />

      <section className="bg-warmDark py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
                Prêt à avoir votre site en 7 jours ?
              </h2>
              <p className="text-white/60 text-lg mb-10">
                C'est gratuit de me contacter. Je vous explique ce que je peux faire pour vous, sans engagement.
              </p>
              <CTAButton href="/contact" variant="primary" size="lg">
                Parler de mon projet
              </CTAButton>
              <p className="text-white/30 text-sm mt-5">
                Réponse garantie sous 24h
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}
