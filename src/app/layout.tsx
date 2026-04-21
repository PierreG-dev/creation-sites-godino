import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// TODO: Remplacer VOTRE_DOMAINE par le vrai domaine dans toutes les metadata
const SITE_URL = 'https://creation-sites-godino.fr'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Création de sites web pour artisans & TPE — GODINO Pierre',
    template: '%s | GODINO Pierre',
  },
  description:
    'Site web professionnel pour artisans et TPE françaises. Livré en 7 jours, 500 € HT + 100 €/mois tout compris. Hébergement, email pro, SEO, maintenance inclus. Zéro surprise.',
  keywords: [
    'création site web artisan',
    'site internet TPE',
    'site web plombier',
    'site web électricien',
    'création site web pas cher',
    'site web professionnel',
    'site web coiffeur',
    'site web restaurant',
    'hébergement inclus',
    'site web 7 jours',
  ],
  authors: [{ name: 'Pierre GODINO', url: SITE_URL }],
  creator: 'Pierre GODINO',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'GODINO Pierre — Création de sites web',
    title: 'Votre site pro livré en 7 jours. Vous ne touchez à rien.',
    description:
      "Je crée, j'héberge, je sécurise, je référence. 500 € HT + 100 €/mois tout compris.",
    images: [
      {
        url: '/og-image.png', // TODO: Créer /public/og-image.png (1200×630px) pour les partages réseaux sociaux
        width: 1200,
        height: 630,
        alt: 'GODINO Pierre — Création de sites web professionnels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre site pro livré en 7 jours. Vous ne touchez à rien.',
    description:
      "Je crée, j'héberge, je sécurise, je référence. 500 € HT + 100 €/mois tout compris.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        {/* JSON-LD Schema LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'GODINO Pierre — Création de sites web',
              description:
                'Création de sites web professionnels pour artisans et TPE françaises. Livré en 7 jours.',
              url: SITE_URL,
              telephone: '+33767249980',
              email: 'contact@creation-sites-godino.fr',
              // TODO: Compléter les champs JSON-LD ci-dessous
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'FR',
                // addressLocality: 'VOTRE_VILLE',
                // postalCode: 'VOTRE_CODE_POSTAL',
              },
              // sameAs: [
              //   'https://www.linkedin.com/in/VOTRE_PROFIL',
              //   'https://www.instagram.com/VOTRE_COMPTE',
              // ],
              priceRange: '€€',
              currenciesAccepted: 'EUR',
              paymentAccepted: 'Virement, Carte bancaire',
              areaServed: {
                '@type': 'Country',
                name: 'France',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '19:00',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
