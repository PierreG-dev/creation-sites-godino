import { TARIF } from '@/data/tarif'
import { AREA_SERVED, CONTACT, SITE_NAME, SITE_URL } from '@/lib/site'

// JSON-LD de l'accueil et de /offre. Téléphone gardé pour le référencement
// (déjà public via Google Business) ; pas d'email, il serait en clair dans le
// HTML (voir Coordonnees.tsx). Pas d'adresse postale, pas
// d'aggregateRating (Google ignore les avis publiés par l'entreprise sur
// elle-même et peut considérer ce balisage comme abusif).
export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#entreprise`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT.telephoneIntl,
    logo: `${SITE_URL}/images/logos/android-chrome-512x512.png`,
    image: `${SITE_URL}/opengraph-image`,
    areaServed: AREA_SERVED,
    makesOffer: offerJsonLd(),
  }
}

export function offerJsonLd() {
  return {
    '@type': 'Offer',
    name: 'Site internet créé et entretenu',
    description:
      'Création du site offerte. Hébergement, nom de domaine, HTTPS, sauvegardes, mises à jour, sécurité, référencement de base et modifications compris.',
    url: `${SITE_URL}/offre`,
    price: TARIF.mensuel,
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: TARIF.mensuel,
      priceCurrency: 'EUR',
      unitCode: 'MON',
      billingDuration: 1,
    },
  }
}
