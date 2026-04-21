# GODINO Pierre — Site vitrine création de sites web

Site vitrine production-ready pour Pierre GODINO, freelance spécialisé dans la création de sites web pour artisans et TPE/PME françaises.

## Stack technique

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v3** (palette custom luxury-organic)
- **Framer Motion** (animations au scroll)
- **react-hook-form** (formulaire de contact)
- **Lucide React** (icônes)
- **next/font** (DM Sans + DM Mono)
- **nodemailer** (emails SMTP)

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
# ── Site ──────────────────────────────────────────────────────────────────────
# URL de production (utilisée pour sécuriser l'API contact)
NEXT_PUBLIC_SITE_URL=https://creation-sites-godino.fr

# ── SMTP (formulaire de contact → email) ──────────────────────────────────────
# Hôte SMTP de votre fournisseur (ex: OVH, Gmail, Infomaniak...)
SMTP_HOST=ssl0.ovh.net

# Port SMTP : 587 (STARTTLS) ou 465 (SSL/TLS)
SMTP_PORT=587

# true si port 465 (SSL direct), false si port 587 (STARTTLS)
SMTP_SECURE=false

# Identifiants de votre boîte email
SMTP_USER=contact@creation-sites-godino.fr
SMTP_PASS=votre_mot_de_passe

# Adresse expéditrice (souvent identique à SMTP_USER)
SMTP_FROM=contact@creation-sites-godino.fr

# Adresse qui reçoit les notifications (votre boîte)
CONTACT_EMAIL=contact@creation-sites-godino.fr

# ── Pushover (notification push sur téléphone) ────────────────────────────────
# Créer un compte sur https://pushover.net
# User Key : dans le dashboard Pushover (onglet "Your User Key")
PUSHOVER_USER_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# API Token : créer une application sur https://pushover.net/apps/build
PUSHOVER_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Fournisseurs SMTP courants

| Fournisseur | SMTP_HOST | SMTP_PORT | SMTP_SECURE |
|-------------|-----------|-----------|-------------|
| OVH | `ssl0.ovh.net` | `587` | `false` |
| Gmail | `smtp.gmail.com` | `587` | `false` |
| Infomaniak | `mail.infomaniak.com` | `587` | `false` |
| Ionos | `smtp.ionos.fr` | `587` | `false` |

> **Gmail** : utiliser un [App Password](https://myaccount.google.com/apppasswords) (pas votre mot de passe principal).

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
- [ ] **Variables d'env** : Ajouter toutes les variables SMTP + Pushover dans Vercel > Settings > Environment Variables
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
