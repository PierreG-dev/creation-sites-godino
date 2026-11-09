# Lanterne Web : site vitrine

Site de Lanterne Web (Pierre Godino, entrepreneur individuel) : création de sites pour les entreprises de Montauban et du Tarn-et-Garonne.

## Stack technique

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v3** : tokens de couleur Lanterne dans `tailwind.config.ts`
- **next/font** : Figtree (400, 500, 600, 800)
- **lucide-react** : icônes
- **react-hook-form** : formulaire de contact (fonctionne aussi sans JavaScript)
- **nodemailer** : emails SMTP
- **MongoDB** : articles du blog

```bash
npm install
npm run dev
```

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Coordonnées, nom, SIRET, fiche Google, URL du site | `src/lib/site.ts` |
| Prix, baisse par parrainage, nombre de paliers | `src/data/tarif.ts` |
| Avis Google (réels uniquement, sans retouche) | `src/data/testimonials.ts` |
| Réalisations | `src/data/realisations.ts` |
| Pages ville | `src/data/cities.ts` |
| FAQ de l'accueil | `src/data/faq.ts` |
| Composants de l'identité (vague, logo, lanterne, carte du prix...) | `src/components/lanterne/` |
| Icônes du site | `assets/*.svg`, puis `node scripts/generate-icons.mjs` |

## Variables d'environnement

Voir `.env.example`. Celles du site :

- `SITE_URL` : URL publique (canonical, sitemap, Open Graph, JSON-LD). Lue au build.
- `SITE_EMAIL` : email affiché sur le site.
- `REDIRECT_TO_NEW_DOMAIN` : `true` pour activer la redirection 301 vers `https://www.lanterneweb.fr`. Lue au build.
- `CONTACT_EMAIL` : destinataire des messages du formulaire.
- SMTP : `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- Pushover (optionnel) : `PUSHOVER_API_TOKEN`, `PUSHOVER_USER_KEY`.

## Changement de domaine vers lanterneweb.fr

Quand `www.lanterneweb.fr` pointe vers l'application, dans Coolify :

1. Ajouter les domaines `www.lanterneweb.fr` et `lanterneweb.fr` à l'application, en gardant les anciens.
2. Définir `SITE_URL=https://www.lanterneweb.fr`, `SITE_EMAIL=contact@lanterneweb.fr` et `REDIRECT_TO_NEW_DOMAIN=true`.
3. Relancer un build : les redirections et les URLs sont figées au build.

Le lien "Espace client" passe alors automatiquement à `https://gestion.lanterneweb.fr` (voir `ESPACE_CLIENT_URL` dans `src/lib/site.ts`).

Le sous-domaine `digiweb-solutions.creation-sites-godino.fr` est redirigé chez o2switch, pas dans ce dépôt.

## Déploiement

Coolify. Les images envoyées depuis l'admin du blog sont stockées dans `public/uploads/blog` (volume persistant).
