# GODINO Pierre — Site vitrine création de sites web

Site vitrine production-ready pour Pierre GODINO, freelance spécialisé dans la création de sites web pour artisans et TPE/PME françaises.

## Stack technique

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v3** (palette custom luxury-organic)
- **Framer Motion** (animations au scroll)
- **react-hook-form** (formulaire de contact)
- **Lucide React** (icônes)
- **next/font** (Playfair Display + DM Sans + DM Mono)

## Installation

```bash
# Cloner le repo
git clone <url-du-repo>
cd godino-sites

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ou repartir de zéro avec create-next-app :
```bash
npx create-next-app@latest godino-sites --typescript --tailwind --app --src-dir
cd godino-sites
npm install framer-motion lucide-react react-hook-form
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# TODO: Ajouter votre clé API Resend pour les emails transactionnels
# Obtenir une clé sur https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx

# TODO: Remplacer par votre vrai domaine
NEXT_PUBLIC_SITE_URL=https://creation-sites-godino.fr
```

## Brancher Resend pour les emails

1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine `creation-sites-godino.fr`
3. Générer une clé API et l'ajouter dans `.env.local`
4. Installer le SDK : `npm install resend`
5. Décommenter le code dans `src/app/api/contact/route.ts`

Documentation : https://resend.com/docs/send-with-nextjs

## Déploiement sur Vercel

```bash
# Option 1 : Interface Vercel
# 1. Pousser sur GitHub
# 2. Importer sur vercel.com/new
# 3. Ajouter les variables d'environnement dans les settings Vercel
# 4. Deploy automatique à chaque push

# Option 2 : CLI Vercel
npm install -g vercel
vercel --prod
```

## Checklist avant mise en ligne

- [ ] **Domaine** : Configurer `creation-sites-godino.fr` sur Vercel
- [ ] **Variables d'env** : Ajouter `RESEND_API_KEY` dans Vercel > Settings > Environment Variables
- [ ] **OG Image** : Créer `/public/og-image.png` (1200×630px) pour les partages réseaux sociaux
- [ ] **Favicon** : Remplacer `/public/favicon.ico` par votre favicon
- [ ] **Mentions légales** : Compléter tous les champs `<!-- À COMPLÉTER -->` dans `/src/app/mentions-legales/page.tsx`
- [ ] **Réalisations** : Remplacer les projets fictifs par de vrais projets clients (avec accord)
- [ ] **Analytics** : Brancher Vercel Analytics ou Plausible
- [ ] **JSON-LD** : Compléter le schema LocalBusiness dans `src/app/page.tsx`
- [ ] **Sitemap** : Vérifier que `sitemap.xml` est généré automatiquement par Next.js

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx              # Layout racine, fonts, metadata globale
│   ├── page.tsx                # Homepage
│   ├── globals.css
│   ├── offre/page.tsx
│   ├── comment-ca-marche/page.tsx
│   ├── realisations/page.tsx
│   ├── contact/page.tsx
│   ├── mentions-legales/page.tsx
│   └── api/contact/route.ts    # API formulaire de contact
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CTAButton.tsx
│   ├── SectionWrapper.tsx
│   ├── WaveDivider.tsx
│   ├── OffreCard.tsx
│   ├── TestimonialCard.tsx
│   ├── StepCard.tsx
│   ├── BadgeUrgence.tsx
│   ├── GarantieBlock.tsx
│   └── ContactForm.tsx
└── data/
    ├── testimonials.ts
    ├── faq.ts
    └── realisations.ts
```
