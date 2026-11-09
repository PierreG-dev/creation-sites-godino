import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SITE_URL, SITE_NAME, CONTACT, DEFAULT_OG_IMAGE } from '@/lib/site'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  variable: '--font-figtree',
  // 'block' : la police (préchargée) s'affiche dès la première visite, sans
  // décalage de mise en page. 'swap' décalait /offre (CLS 0,19) et 'optional'
  // laissait la police système à la première visite.
  display: 'block',
})

const DEFAULT_DESCRIPTION =
  'Je crée des sites pour les entreprises de Montauban et du Tarn-et-Garonne. Création offerte, puis un mensuel tout compris.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, création de sites à Montauban`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: CONTACT.responsable, url: SITE_URL }],
  creator: CONTACT.responsable,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
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
      { url: '/images/logos/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/logos/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logos/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/images/logos/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/images/logos/manifest.json',
  // Pas de canonical ici : il serait hérité par toutes les pages qui n'en
  // définissent pas, et les ferait passer pour des doublons de l'accueil.
  // Search Console : renseigner GOOGLE_SITE_VERIFICATION dans l'environnement.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={figtree.variable}>
      <head>
        {/* JSON-LD WebSite : nom du site affiché par Google dans les résultats */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-creme">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-encre focus:px-4 focus:py-3 focus:text-creme"
        >
          Aller au contenu
        </a>
        <Navbar />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
