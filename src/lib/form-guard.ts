import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

// Garde anti-robots invisible pour les formulaires publics.
// La page rend un jeton signé contenant l'heure d'affichage. À l'envoi, on
// vérifie la signature et le délai : un humain met plus de quelques secondes à
// remplir le formulaire, un robot le poste aussitôt (ou sans jamais l'afficher).

export const FORM_TOKEN_FIELD = '_t'

const MIN_DELAY_MS = 3 * 1000
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000

// Secret stable entre redémarrages, sinon les pages déjà ouvertes deviennent invalides.
const SECRET =
  process.env.FORM_GUARD_SECRET ||
  process.env.BLOG_ADMIN_TOKEN ||
  (() => {
    console.warn('[form-guard] FORM_GUARD_SECRET absent : secret aléatoire, invalidé à chaque redémarrage.')
    return randomBytes(32).toString('hex')
  })()

function sign(issuedAt: number): string {
  return createHmac('sha256', SECRET).update(`form:${issuedAt}`).digest('base64url')
}

export function createFormToken(issuedAt = Date.now()): string {
  return `${issuedAt}.${sign(issuedAt)}`
}

// Jeton immédiatement utilisable, pour relancer un envoi dont le jeton a expiré.
export function createRetryToken(): string {
  return createFormToken(Date.now() - MIN_DELAY_MS)
}

export type FormTokenStatus = 'ok' | 'missing' | 'invalid' | 'too-fast' | 'expired'

export function checkFormToken(token: unknown): FormTokenStatus {
  if (typeof token !== 'string' || !token) return 'missing'
  const [ts, sig] = token.split('.')
  const issuedAt = Number(ts)
  if (!Number.isSafeInteger(issuedAt) || !sig) return 'invalid'

  const expected = Buffer.from(sign(issuedAt))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid'

  const age = Date.now() - issuedAt
  if (age < MIN_DELAY_MS) return 'too-fast'
  if (age > MAX_AGE_MS) return 'expired'
  return 'ok'
}

// Signal faible : on ne bloque pas (un vrai prospect peut coller des liens),
// on marque seulement le message pour le trier.
export function looksLikeSpam(text: string): boolean {
  const links = text.match(/https?:\/\/|www\./gi)?.length ?? 0
  return links >= 3 || /\[url=|<a\s+href/i.test(text)
}
