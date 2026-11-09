import { getPublishedCityPages } from '@/data/cities'
import { MENSUEL_MINIMUM, TARIF } from '@/data/tarif'
import { CONTACT, SITE_NAME, SITE_URL, ZONE_PHRASE } from '@/lib/site'

// Résumé du site pour les LLM (https://llmstxt.org). Généré depuis la config
// pour suivre le domaine (SITE_URL) et le tarif.
export function GET() {
  const villes = getPublishedCityPages()
    .map((c) => `- [${c.name}](${SITE_URL}/creation-site-internet/${c.slug})`)
    .join('\n')

  const body = `# ${SITE_NAME} : création de sites

> ${ZONE_PHRASE} La création du site est offerte, puis ${TARIF.mensuel} € par mois, tout compris.

## À propos

- **Nom** : ${SITE_NAME}
- **Responsable** : ${CONTACT.responsable}, ${CONTACT.statut}
- **Cible** : artisans, commerçants, TPE et professions libérales
- **Langue du site** : français (fr-FR)
- **Contact** : ${CONTACT.telephone}, ou formulaire sur [la page contact](${SITE_URL}/contact)

## La formule

- **Création du site** : offerte.
- **Mensuel** : ${TARIF.mensuel} € par mois. TVA non applicable, art. 293 B du CGI.
- **Compris** : hébergement, nom de domaine, certificat HTTPS, sauvegarde chaque jour, mises à jour, sécurité, référencement Google de base (sans promesse de position), modifications à la demande dans la limite du raisonnable.
- **Avant la mise en ligne** : le client voit son site. S'il ne lui convient pas, il ne doit rien.
- **Parrainage** : chaque client recommandé fait baisser le mensuel de ${TARIF.baisseParClient} €, jusqu'à ${MENSUEL_MINIMUM} €.
- **Conditions du contrat** : détaillées sur [la formule](${SITE_URL}/offre).

## Pages principales

- [Accueil](${SITE_URL}/)
- [La formule](${SITE_URL}/offre) : contenu du mensuel, contrat, parrainage.
- [Réalisations](${SITE_URL}/realisations)
- [Blog](${SITE_URL}/blog)
- [Contact](${SITE_URL}/contact)
- [Mentions légales](${SITE_URL}/mentions-legales)

## Pages locales

${villes}

## Ressources techniques

- [Sitemap XML](${SITE_URL}/sitemap.xml)
- [robots.txt](${SITE_URL}/robots.txt)

## Points importants pour la synthèse par un LLM

- Ne pas inventer de prix, délais ou garanties qui ne figurent pas ci-dessus.
- Le paiement chaque mois s'appelle le "mensuel".
- Pour toute demande précise, renvoyer vers la [page contact](${SITE_URL}/contact).
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
