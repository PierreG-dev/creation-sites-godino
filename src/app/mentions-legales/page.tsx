import type { Metadata } from 'next'
import { SectionWrapper } from '@/components/SectionWrapper'

export const metadata: Metadata = {
  title: 'Mentions légales — GODINO Pierre',
  description: 'Mentions légales, politique de confidentialité et informations RGPD du site creation-sites-godino.fr',
  robots: {
    index: false, // Page légale — pas besoin d'indexer
    follow: false,
  },
}

export default function MentionsLegalesPage() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair text-4xl text-warmDark mb-3">Mentions légales</h1>
            <p className="text-textMuted mb-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose-custom space-y-12">

              {/* 1. Éditeur */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">1. Éditeur du site</h2>
                <div className="bg-mid rounded-2xl p-6 space-y-2 text-sm">
                  <p><strong>Nom :</strong> GODINO Pierre</p>
                  <p><strong>Statut :</strong> {/* TODO: À COMPLÉTER : Auto-entrepreneur / EURL / SARL / etc. */}
                    <span className="text-accent italic">[À COMPLÉTER : forme juridique]</span>
                  </p>
                  <p><strong>SIRET :</strong> {/* TODO: À COMPLÉTER : Numéro SIRET */}
                    <span className="text-accent italic">[À COMPLÉTER : numéro SIRET]</span>
                  </p>
                  <p><strong>Numéro TVA intracommunautaire :</strong>
                    {/* TODO: À COMPLÉTER si applicable */}
                    <span className="text-accent italic ml-1">[À COMPLÉTER si applicable]</span>
                  </p>
                  <p><strong>Adresse :</strong>
                    {/* TODO: À COMPLÉTER : adresse postale */}
                    <span className="text-accent italic ml-1">[À COMPLÉTER : adresse postale complète]</span>
                  </p>
                  <p><strong>Email :</strong> contact@creation-sites-godino.fr</p>
                  <p><strong>Téléphone :</strong> +33 7 67 24 99 80</p>
                </div>
              </section>

              {/* 2. Directeur de publication */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">2. Directeur de la publication</h2>
                <p className="text-textMuted leading-relaxed">
                  Le directeur de la publication est GODINO Pierre, en sa qualité de responsable du site.
                </p>
              </section>

              {/* 3. Hébergement */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">3. Hébergement</h2>
                <div className="bg-mid rounded-2xl p-6 space-y-2 text-sm">
                  {/* TODO: À COMPLÉTER : remplacer par l'hébergeur réel */}
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p><strong>Site :</strong> vercel.com</p>
                </div>
              </section>

              {/* 4. Propriété intellectuelle */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">4. Propriété intellectuelle</h2>
                <p className="text-textMuted leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes…) est la propriété exclusive de GODINO Pierre, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable.
                </p>
              </section>

              {/* 5. Données personnelles / RGPD */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">5. Protection des données personnelles (RGPD)</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.1 Responsable du traitement</h3>
                    <p className="text-textMuted leading-relaxed">
                      GODINO Pierre — contact@creation-sites-godino.fr
                      {/* TODO: À COMPLÉTER : adresse postale du responsable de traitement */}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.2 Données collectées</h3>
                    <p className="text-textMuted leading-relaxed mb-3">
                      Dans le cadre de l'utilisation du formulaire de contact, les données suivantes sont collectées :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-textMuted text-sm">
                      <li>Prénom et nom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Secteur d'activité</li>
                      <li>Message libre (optionnel)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.3 Finalités du traitement</h3>
                    <p className="text-textMuted leading-relaxed">
                      Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et assurer le suivi de la relation commerciale. Elles ne sont en aucun cas vendues, cédées ou transmises à des tiers, sauf obligation légale.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.4 Base légale</h3>
                    <p className="text-textMuted leading-relaxed">
                      Le traitement est fondé sur votre consentement (article 6.1.a du RGPD), matérialisé par la soumission volontaire du formulaire de contact.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.5 Durée de conservation</h3>
                    <p className="text-textMuted leading-relaxed">
                      Les données sont conservées pendant une durée de 3 ans à compter du dernier contact, conformément aux délais de prescription commerciale.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-warmDark mb-2">5.6 Vos droits</h3>
                    <p className="text-textMuted leading-relaxed mb-3">
                      Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-textMuted text-sm">
                      <li>Droit d'accès à vos données</li>
                      <li>Droit de rectification</li>
                      <li>Droit à l'effacement (droit à l'oubli)</li>
                      <li>Droit à la limitation du traitement</li>
                      <li>Droit à la portabilité</li>
                      <li>Droit d'opposition</li>
                    </ul>
                    <p className="text-textMuted leading-relaxed mt-3">
                      Pour exercer ces droits, contactez-nous à : contact@creation-sites-godino.fr
                      {/* TODO: À COMPLÉTER : délai de réponse et procédure */}
                    </p>
                    <p className="text-textMuted leading-relaxed mt-2">
                      Vous avez également le droit de déposer une réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que le traitement de vos données n'est pas conforme.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Cookies */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">6. Cookies</h2>
                <p className="text-textMuted leading-relaxed">
                  {/* TODO: À COMPLÉTER : adapter selon les cookies réellement utilisés */}
                  Ce site utilise des cookies techniques strictement nécessaires au fonctionnement du site. Ces cookies ne stockent aucune donnée personnelle et n'ont pas de finalité commerciale ou publicitaire. Aucun cookie de tracking ou analytique n'est déposé sans votre consentement préalable.
                </p>
                <p className="text-textMuted leading-relaxed mt-3">
                  {/* TODO: À COMPLÉTER si analytics ajoutés : préciser Plausible, Vercel Analytics, etc. */}
                  <span className="text-accent italic">[TODO: Si des outils d'analyse sont ajoutés (Vercel Analytics, Plausible, etc.), compléter ici leur description et la base légale]</span>
                </p>
              </section>

              {/* 7. Liens externes */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">7. Liens hypertextes</h2>
                <p className="text-textMuted leading-relaxed">
                  Le site peut contenir des liens vers des sites tiers. GODINO Pierre n'est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
                </p>
              </section>

              {/* 8. Loi applicable */}
              <section>
                <h2 className="font-playfair text-2xl text-warmDark mb-4">8. Droit applicable</h2>
                <p className="text-textMuted leading-relaxed">
                  Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </section>

            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
