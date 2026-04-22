import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/offre', label: 'L\'offre' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
]

export function Footer() {
  return (
    <footer className="bg-warmDark text-white">
      <div className="container">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <Image
                src="/images/logos/logo.svg"
                alt="Logo Godino"
                width={36}
                height={36}
                className="flex-shrink-0"
              />
              <div className="leading-none">
                <div className="font-playfair text-white text-lg font-semibold tracking-tight">
                  GODINO
                </div>
                <div className="text-white/40 text-[0.65rem] tracking-widest uppercase font-sans">
                  Création web
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Création de sites web professionnels pour artisans et TPE/PME françaises.
              Vous ne touchez à rien — je m'occupe de tout.
            </p>
            <div className="space-y-2.5">
              <a
                href="mailto:contact@creation-sites-godino.fr"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                contact@creation-sites-godino.fr
              </a>
              <a
                href="tel:+33767249980"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +33 7 67 24 99 80
              </a>
              <div className="flex items-center gap-2.5 text-white/40 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                France entière (télétravail)
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair text-white text-lg mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Promise */}
          <div>
            <h3 className="font-playfair text-white text-lg mb-5">La promesse</h3>
            <ul className="space-y-3">
              {[
                'Livré en 7 jours ouvrés',
                'Prix fixe, jamais de surprise',
                'Vous ne touchez à rien',
                'Satisfait ou remboursé 30j',
                'Sans engagement',
                'Support WhatsApp réactif',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/60 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} GODINO Pierre — Tous droits réservés
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
