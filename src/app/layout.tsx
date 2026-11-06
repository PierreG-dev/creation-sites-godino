import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SITE_URL, SITE_NAME, HOME_DESCRIPTION, CITIES_SERVED, OFFERS_JSONLD } from '@/lib/site'

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
    default: 'Création de sites web pour artisans et TPE | GODINO - Création WEB',
    template: '%s | GODINO',
  },
  description: HOME_DESCRIPTION,
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
    siteName: SITE_NAME,
    title: 'Création de site offerte, 50 €/mois',
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/og-image.png', // Généré par scripts/generate-og-image.mjs
        width: 1200,
        height: 630,
        alt: 'GODINO - Création WEB : sites web professionnels pour artisans et TPE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Création de site offerte, 50 €/mois',
    description: HOME_DESCRIPTION,
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
  icons: {
    icon: [
      { url: '/images/logos/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logos/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/images/logos/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'manifest', url: '/images/logos/manifest.json' },
    ],
  },
  // Pas de canonical ici : il serait hérité par toutes les pages qui n'en
  // définissent pas, et les ferait passer pour des doublons de l'accueil.
  // Chaque page déclare le sien (voir src/app/page.tsx pour l'accueil).
  // Search Console : renseigner GOOGLE_SITE_VERIFICATION (code de la balise meta
  // fournie par Google) dans les variables d'environnement.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        {/* JSON-LD Schema WebSite : nom du site affiché par Google dans les résultats */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GODINO - Création WEB',
              alternateName: ['GODINO', 'GODINO Pierre'],
              url: `${SITE_URL}/`,
            }),
          }}
        />
        {/* JSON-LD Schema LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: SITE_NAME,
              description:
                'Je crée des sites pour les entreprises de Montauban et du Tarn-et-Garonne.',
              url: SITE_URL,
              logo: `${SITE_URL}/images/logos/android-chrome-512x512.png`,
              image: `${SITE_URL}/og-image.png`,
              telephone: '+33757690671',
              email: 'contact@creation-sites-godino.fr',
              // Ville et code postal via NEXT_PUBLIC_BUSINESS_CITY / NEXT_PUBLIC_BUSINESS_POSTAL_CODE.
              address: {
                '@type': 'PostalAddress',
                ...(process.env.NEXT_PUBLIC_BUSINESS_CITY
                  ? { addressLocality: process.env.NEXT_PUBLIC_BUSINESS_CITY }
                  : {}),
                ...(process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE
                  ? { postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE }
                  : {}),
                addressCountry: 'FR',
              },
              priceRange: '50 €/mois',
              makesOffer: OFFERS_JSONLD,
              currenciesAccepted: 'EUR',
              paymentAccepted: 'Virement, Carte bancaire',
              areaServed: CITIES_SERVED.map((name) => ({
                '@type': 'City',
                name,
              })),
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
