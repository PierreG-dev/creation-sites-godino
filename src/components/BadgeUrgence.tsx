'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

interface BadgeUrgenceProps {
  // TODO: Pour rendre ce compteur dynamique plus tard :
  // 1. Stocker le nombre de places restantes dans une base de données (ex: Supabase, Vercel KV)
  // 2. Créer une API route GET /api/places qui retourne le nombre courant
  // 3. Créer une API route POST /api/places/decrement appelée à chaque conversion
  // 4. Utiliser useSWR ou un server component avec revalidate pour afficher le chiffre en temps réel
  placesRestantes?: number
  className?: string
  variant?: 'default' | 'compact' | 'large'
}

export function BadgeUrgence({
  placesRestantes = 3, // Hard-codé — voir TODO ci-dessus pour le rendre dynamique
  className = '',
  variant = 'default',
}: BadgeUrgenceProps) {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 ${className}`}>
        <motion.span
          className="w-2 h-2 rounded-full bg-accent flex-shrink-0"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-accent text-xs font-medium font-sans">
          Plus que {placesRestantes} place{placesRestantes > 1 ? 's' : ''} disponible{placesRestantes > 1 ? 's' : ''}
        </span>
      </div>
    )
  }

  if (variant === 'large') {
    return (
      <motion.div
        className={`bg-accent/5 border border-accent/15 rounded-3xl p-6 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                Offre lancement
              </span>
            </div>
            <p className="text-warmDark font-playfair text-xl mb-1">
              Plus que{' '}
              <span className="text-accent font-bold">
                {placesRestantes} place{placesRestantes > 1 ? 's' : ''}
              </span>{' '}
              disponible{placesRestantes > 1 ? 's' : ''}
            </p>
            <p className="text-textMuted text-sm leading-relaxed">
              Les {5 - placesRestantes + placesRestantes} premiers clients bénéficient de la création offerte — 0 € au lieu de 500 €.
              Vous ne payez que la maintenance à 100 €/mois dès la mise en ligne.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-3 bg-accent/8 border border-accent/15 rounded-2xl px-5 py-3 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="text-warmDark text-sm font-medium">
        <span className="text-accent font-semibold">Offre lancement</span>
        {' — '}
        Plus que{' '}
        <span className="font-bold text-accent">
          {placesRestantes} place{placesRestantes > 1 ? 's' : ''}
        </span>{' '}
        disponible{placesRestantes > 1 ? 's' : ''}
      </span>
    </motion.div>
  )
}
