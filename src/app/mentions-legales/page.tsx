import type { Metadata } from 'next'
import { Wave } from '@/components/lanterne/Wave'
import { Email, Telephone } from '@/components/Coordonnees'
import { CONTACT, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: `Mentions légales, politique de confidentialité et informations RGPD du site ${SITE_NAME}.`,
  robots: {
    index: false, // Page légale : pas besoin d'indexer
    follow: false,
  },
}

const TBD = <span className="font-semibold text-orange">[À compléter]</span>

const legal = {
  statut: process.env.NEXT_PUBLIC_LEGAL_STATUT,
  siret: process.env.NEXT_PUBLIC_LEGAL_SIRET || CONTACT.siret,
  tva: process.env.NEXT_PUBLIC_LEGAL_TVA,
  adresse: process.env.NEXT_PUBLIC_LEGAL_ADRESSE,
}

const host = {
  name: process.env.NEXT_PUBLIC_HOST_NAME,
  address: process.env.NEXT_PUBLIC_HOST_ADDRESS,
  website: process.env.NEXT_PUBLIC_HOST_WEBSITE,
  phone: process.env.NEXT_PUBLIC_HOST_PHONE,
}

export default function MentionsLegalesPage() {
  return (
    <>
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-[36px] sm:text-[48px] font-extrabold tracking-titre mb-3">Mentions légales</h1>
            <p className="text-gris mb-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose-custom space-y-12">

              {/* 1. Éditeur */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">1. Éditeur du site</h2>
                <div className="bg-blanc border border-beige rounded-md p-6 space-y-2">
                  <p><strong>Nom :</strong> GODINO Pierre</p>
                  <p><strong>Nom commercial :</strong> {SITE_NAME}</p>
                  <p><strong>Statut :</strong> {legal.statut || TBD}</p>
                  <p><strong>SIRET :</strong> {legal.siret || TBD}</p>
                  <p><strong>Numéro TVA intracommunautaire :</strong> {legal.tva || TBD}</p>
                  <p><strong>Adresse :</strong> {legal.adresse || TBD}</p>
                  <p><strong>Email :</strong> <Email className="underline" /></p>
                  <p><strong>Téléphone :</strong> <Telephone className="underline" /></p>
                </div>
              </section>

              {/* 2. Directeur de publication */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">2. Directeur de la publication</h2>
                <p className="text-gris leading-relaxed">
                  Le directeur de la publication est GODINO Pierre, en sa qualité de responsable du site.
                </p>
              </section>

              {/* 3. Hébergement */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">3. Hébergement</h2>
                <div className="bg-blanc border border-beige rounded-md p-6 space-y-2">
                  <p><strong>Hébergeur :</strong> {host.name || TBD}</p>
                  <p><strong>Adresse :</strong> {host.address || TBD}</p>
                  <p><strong>Site :</strong> {host.website || TBD}</p>
                  <p><strong>Téléphone :</strong> {host.phone || TBD}</p>
                </div>
              </section>

              {/* 4. Propriété intellectuelle */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">4. Propriété intellectuelle</h2>
                <p className="text-gris leading-relaxed">
                  L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes...) est la propriété exclusive de GODINO Pierre, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable.
                </p>
              </section>

              {/* 5. Données personnelles / RGPD */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">5. Protection des données personnelles (RGPD)</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">5.1 Responsable du traitement</h3>
                    <p className="text-gris leading-relaxed">
                      GODINO Pierre, <Email className="underline" />
                      {legal.adresse ? `, ${legal.adresse}` : ''}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">5.2 Données collectées</h3>
                    <p className="text-gris leading-relaxed mb-3">
                      Dans le cadre de l&apos;utilisation du formulaire de contact, les données suivantes sont collectées :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gris">
                      <li>Nom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone (facultatif)</li>
                      <li>Message libre</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">5.3 Finalités du traitement</h3>
                    <p className="text-gris leading-relaxed">
                      Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et assurer le suivi de la relation commerciale. Elles ne sont en aucun cas vendues, cédées ou transmises à des tiers, sauf obligation légale.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">5.4 Base légale</h3>
                    <p className="text-gris leading-relaxed">
                      Le traitement est fondé sur votre consentement (article 6.1.a du RGPD), matérialisé par la soumission volontaire du formulaire de contact.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">5.5 Durée de conservation</h3>
                    <p className="text-gris leading-relaxed">
                      Les données sont conservées pendant une durée de 3 ans à compter du dernier contact, conformément aux délais de prescription commerciale.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">5.6 Vos droits</h3>
                    <p className="text-gris leading-relaxed mb-3">
                      Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gris">
                      <li>Droit d&apos;accès à vos données</li>
                      <li>Droit de rectification</li>
                      <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
                      <li>Droit à la limitation du traitement</li>
                      <li>Droit à la portabilité</li>
                      <li>Droit d&apos;opposition</li>
                    </ul>
                    <p className="text-gris leading-relaxed mt-3">
                      Pour exercer ces droits, contactez-nous à : <Email className="underline" />
                      {/* TODO: À COMPLÉTER : délai de réponse et procédure */}
                    </p>
                    <p className="text-gris leading-relaxed mt-2">
                      Vous avez également le droit de déposer une réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que le traitement de vos données n&apos;est pas conforme.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Cookies */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">6. Cookies</h2>
                <p className="text-gris leading-relaxed">
                  {/* TODO: À COMPLÉTER : adapter selon les cookies réellement utilisés */}
                  Ce site utilise des cookies techniques strictement nécessaires au fonctionnement du site. Ces cookies ne stockent aucune donnée personnelle et n&apos;ont pas de finalité commerciale ou publicitaire. Aucun cookie de tracking ou analytique n&apos;est déposé sans votre consentement préalable.
                </p>
              </section>

              {/* 7. Liens externes */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">7. Liens hypertextes</h2>
                <p className="text-gris leading-relaxed">
                  Le site peut contenir des liens vers des sites tiers. GODINO Pierre n&apos;est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
                </p>
              </section>

              {/* 8. Loi applicable */}
              <section>
                <h2 className="text-2xl font-extrabold mb-4">8. Droit applicable</h2>
                <p className="text-gris leading-relaxed">
                  Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </section>
    <Wave top="creme" bottom="encre" sens="a" />
    </>
  )
}
