'use client'

import { useForm } from 'react-hook-form'
import { useRef, useState, type ReactNode } from 'react'

interface FormData {
  nom: string
  email: string
  telephone: string
  message: string
  societe_site: string
}

// Sans JavaScript, le formulaire est posté directement à /api/contact, qui
// redirige vers /contact?envoye=1. Avec JavaScript, l'envoi se fait en fetch.
// `token` : jeton anti-robots signé par le serveur au rendu de la page.
// `email` : lien email déjà protégé (voir Coordonnees.tsx), jamais la valeur en clair.
export function ContactForm({ email, token }: { email: ReactNode; token: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const tokenRef = useRef(token)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    const send = () =>
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _t: tokenRef.current }),
      })
    try {
      let res = await send()
      // Jeton expiré (page ouverte depuis des jours) : on relance une fois avec le neuf.
      if (res.status === 409) {
        const { token: fresh } = await res.json()
        if (fresh) {
          tokenRef.current = fresh
          res = await send()
        }
      }
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const champ = (hasError: boolean) =>
    `block w-full rounded-md border bg-blanc px-4 py-3 text-[17px] text-encre outline-none focus:border-orange focus:ring-2 focus:ring-orange/30 ${
      hasError ? 'border-[#B42318]' : 'border-beige'
    }`
  const label = 'mb-2 block font-semibold'
  const erreur = 'mt-2 text-[15px] font-semibold text-[#B42318]'

  if (status === 'success') {
    return <MessageEnvoye />
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <input type="hidden" name="_t" value={token} />

      {/* Piège à robots : hors écran plutôt que display:none, que certains robots ignorent */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Ne pas remplir
          <input {...register('societe_site')} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="nom" className={label}>
          Votre nom
        </label>
        <input
          id="nom"
          {...register('nom', { required: 'Indiquez votre nom.' })}
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? 'nom-erreur' : undefined}
          className={champ(!!errors.nom)}
        />
        {errors.nom && (
          <p id="nom-erreur" className={erreur}>
            {errors.nom.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Votre email
        </label>
        <input
          id="email"
          {...register('email', {
            required: 'Indiquez votre email.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Cet email n'est pas valide." },
          })}
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-erreur' : undefined}
          className={champ(!!errors.email)}
        />
        {errors.email && (
          <p id="email-erreur" className={erreur}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telephone" className={label}>
          Votre téléphone <span className="font-normal text-gris">(facultatif)</span>
        </label>
        <input
          id="telephone"
          {...register('telephone')}
          type="tel"
          autoComplete="tel"
          className={champ(false)}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Votre activité, en quelques mots
        </label>
        <textarea
          id="message"
          {...register('message', { required: 'Dites-moi en quelques mots ce que vous faites.' })}
          rows={4}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-erreur' : undefined}
          className={`${champ(!!errors.message)} resize-y`}
        />
        {errors.message && (
          <p id="message-erreur" className={erreur}>
            {errors.message.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-md border-2 border-[#B42318] bg-blanc p-4">
          Le message n&apos;est pas parti. Réessayez ou écrivez-moi à{' '}
          {email}
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-orange px-6 py-4 text-[18px] font-semibold text-blanc hover:bg-orange-fonce disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {status === 'loading' ? 'Envoi en cours' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}

export function MessageEnvoye() {
  return (
    <div role="status" className="rounded-md border-2 border-encre bg-blanc p-6 sm:p-8">
      <h2 className="m-0 text-[24px] font-extrabold">Message envoyé.</h2>
      <p className="mt-2 text-gris">Je vous réponds sous 24h.</p>
    </div>
  )
}
