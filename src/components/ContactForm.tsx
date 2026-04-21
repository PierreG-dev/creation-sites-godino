'use client'

// TODO: Brancher Resend.com pour les emails transactionnels
// 1. npm install resend
// 2. Ajouter RESEND_API_KEY dans .env.local et les variables Vercel
// 3. Décommenter le code Resend dans src/app/api/contact/route.ts
// 4. Documentation : https://resend.com/docs/send-with-nextjs
//
// Alternative : Formspree (sans backend)
// 1. Créer un compte sur formspree.io
// 2. Remplacer l'action du fetch par https://formspree.io/f/VOTRE_ID
// 3. Supprimer l'API route src/app/api/contact/route.ts

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTEURS = [
  { value: '', label: 'Votre secteur d\'activité *' },
  { value: 'plombier', label: 'Plombier / Chauffagiste' },
  { value: 'electricien', label: 'Électricien' },
  { value: 'maconnerie', label: 'Maçon / BTP' },
  { value: 'coiffeur', label: 'Coiffeur / Esthéticien' },
  { value: 'boulanger', label: 'Boulanger / Pâtissier' },
  { value: 'restaurant', label: 'Restaurant / Traiteur' },
  { value: 'garage', label: 'Garage / Mécanicien' },
  { value: 'jardinier', label: 'Jardinier / Paysagiste' },
  { value: 'menuisier', label: 'Menuisier / Charpentier' },
  { value: 'peintre', label: 'Peintre / Décorateur' },
  { value: 'autre', label: 'Autre activité' },
]

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  secteur: string
  message: string
  offreLancement: boolean
  _honeypot: string
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      offreLancement: true,
    },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Erreur serveur')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-2xl border px-4 py-3.5 text-warmDark placeholder:text-textMuted/60 bg-white
     font-sans text-[0.9375rem] outline-none transition-all duration-200
     focus:ring-2 focus:ring-accent/30 focus:border-accent
     ${hasError ? 'border-red-400 ring-2 ring-red-100' : 'border-mid hover:border-textMuted/40'}`

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-accent2/6 border border-accent2/20 rounded-3xl p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent2/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-accent2" />
        </div>
        <h3 className="font-playfair text-2xl text-warmDark mb-3">Message envoyé !</h3>
        <p className="text-textMuted leading-relaxed max-w-sm mx-auto">
          Je vous réponds sous 24h (souvent bien avant). À très vite !
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-accent text-sm font-medium underline underline-offset-4 hover:no-underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypot anti-bot */}
      <input {...register('_honeypot')} type="text" name="_honeypot" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
      {/* Prénom + Nom */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('prenom', { required: 'Prénom requis' })}
            type="text"
            placeholder="Prénom *"
            autoComplete="given-name"
            className={inputClass(!!errors.prenom)}
          />
          {errors.prenom && (
            <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.prenom.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register('nom', { required: 'Nom requis' })}
            type="text"
            placeholder="Nom *"
            autoComplete="family-name"
            className={inputClass(!!errors.nom)}
          />
          {errors.nom && (
            <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.nom.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email invalide',
            },
          })}
          type="email"
          placeholder="Email *"
          autoComplete="email"
          className={inputClass(!!errors.email)}
        />
        {errors.email && (
          <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <input
          {...register('telephone', {
            required: 'Téléphone requis',
            pattern: {
              value: /^(\+33|0)[1-9](\d{2}){4}$/,
              message: 'Numéro invalide (ex: 06 12 34 56 78)',
            },
          })}
          type="tel"
          placeholder="Téléphone *"
          autoComplete="tel"
          className={inputClass(!!errors.telephone)}
        />
        {errors.telephone && (
          <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.telephone.message}
          </p>
        )}
      </div>

      {/* Secteur */}
      <div>
        <select
          {...register('secteur', { required: 'Secteur requis' })}
          className={`${inputClass(!!errors.secteur)} cursor-pointer`}
          defaultValue=""
        >
          {SECTEURS.map((s) => (
            <option key={s.value} value={s.value} disabled={s.value === ''}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.secteur && (
          <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.secteur.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          {...register('message')}
          placeholder="Votre message (optionnel) — parlez-moi de votre activité, vos besoins, vos questions..."
          rows={4}
          className={`${inputClass(false)} resize-none`}
        />
      </div>

      {/* Checkbox offre lancement */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          {...register('offreLancement')}
          type="checkbox"
          className="mt-1 w-4 h-4 accent-accent rounded flex-shrink-0"
        />
        <span className="text-sm text-textMuted leading-relaxed group-hover:text-warmDark transition-colors">
          <span className="font-semibold text-accent">Je souhaite profiter de l'offre lancement</span>
          {' '}— création offerte (0 € au lieu de 500 €), je ne paye que 100 €/mois
        </span>
      </label>

      {/* Error state */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Oups, une erreur s'est produite. Réessayez ou écrivez-moi directement à{' '}
            <a href="mailto:contact@creation-sites-godino.fr" className="underline">
              contact@creation-sites-godino.fr
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-accent text-white rounded-full py-4 font-medium text-base
                   flex items-center justify-center gap-2 transition-all duration-200
                   hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2"
        whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Envoyer ma demande — c'est gratuit
          </>
        )}
      </motion.button>

      <p className="text-center text-textMuted text-xs">
        Réponse garantie sous 24h · Aucun engagement · Zéro démarchage
      </p>
    </form>
  )
}
