const DUPLICATE_SLUGS = [
  'textes-de-site-internet-comment-rediger-des-contenus-qui-convainquent-et-convertissent',
  'image-de-marque-en-ligne-comment-votre-site-internet-forge-la-reputation-de-votre-entreprise',
  'site-internet-pour-medecin-ou-professionnel-de-sante-les-cles-dune-presence-en-ligne-efficace',
  'images-professionnelles-pourquoi-la-qualite-visuelle-de-votre-site-fait-ou-defait-votre-credibilite',
  'core-web-vitals-pourquoi-la-performance-de-votre-site-impacte-votre-referencement',
  'entretenir-son-site-internet-pourquoi-la-maintenance-est-indispensable',
  'les-erreurs-de-communication-digitale-qui-coutent-des-clients-aux-tpe',
  'choisir-son-nom-de-domaine-les-regles-dor-pour-bien-demarrer',
  'creer-un-site-internet-pour-un-restaurant-ce-quil-faut-absolument-inclure',
  'google-my-business-le-levier-gratuit-pour-attirer-plus-de-clients-locaux',
  'rgpd-et-site-internet-ce-que-tout-chef-dentreprise-doit-savoir',
  'site-vitrine-ou-e-commerce-comment-choisir-la-bonne-solution-pour-votre-entreprise',
  'comment-mesurer-le-retour-sur-investissement-de-votre-site-internet',
  'artisans-pourquoi-un-site-internet-professionnel-est-indispensable-pour-developper-votre-clientele',
  'seo-local-comment-apparaitre-en-tete-des-resultats-google-dans-votre-ville',
  'pourquoi-votre-entreprise-a-besoin-dun-site-internet-professionnel',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'www.creation-sites-godino.fr',
      },
      {
        protocol: 'https',
        hostname: 'creation-sites-godino.fr',
      },
    ],
  },
  async redirects() {
    return DUPLICATE_SLUGS.map((slug) => ({
      source: `/blog/${slug}-2`,
      destination: `/blog/${slug}`,
      permanent: true,
    }))
  },
}

export default nextConfig
