'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { CTAButton } from './CTAButton'

const navLinks = [
  { href: '/offre', label: 'L\'offre' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-mid shadow-soft'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/logos/logo.svg"
                alt="Logo Godino"
                width={36}
                height={36}
                className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
              />
              <div className="leading-none">
                <div className="font-playfair text-warmDark text-lg font-semibold tracking-tight">
                  GODINO
                </div>
                <div className="text-textMuted text-[0.65rem] tracking-widest uppercase font-sans">
                  Création web
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-mid text-warmDark'
                      : 'text-textMuted hover:text-warmDark hover:bg-mid/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Badge "7 jours" */}
              <div className="flex items-center gap-1.5 bg-accent2/10 text-accent2 rounded-full px-3 py-1.5 text-xs font-medium">
                <Zap className="w-3 h-3" />
                Livré en 7 jours
              </div>
              <CTAButton href="/contact" variant="primary" size="sm">
                Démarrer mon projet
              </CTAButton>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-warmDark hover:bg-mid transition-colors"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <nav className="flex-1 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-5 py-4 rounded-2xl text-lg font-medium transition-colors ${
                        pathname === link.href
                          ? 'bg-mid text-warmDark'
                          : 'text-textMuted hover:bg-mid hover:text-warmDark'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 bg-accent2/10 text-accent2 rounded-2xl px-4 py-3 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Livré en 7 jours ouvrés, garanti
                </div>
                <CTAButton href="/contact" variant="primary" size="lg" className="w-full justify-center">
                  Démarrer mon projet
                </CTAButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
