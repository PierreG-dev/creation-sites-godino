import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE_URL } from '@/lib/site'
import { FORM_TOKEN_FIELD, checkFormToken, createRetryToken, looksLikeSpam } from '@/lib/form-guard'

// ─── Rate limiting (in-memory, par IP) ───────────────────────────────────────
const RATE_LIMIT = 3        // requêtes max
const RATE_WINDOW = 10 * 60 * 1000 // 10 minutes en ms

const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ─── Pushover ─────────────────────────────────────────────────────────────────
async function sendPushover(title: string, message: string): Promise<void> {
  const token = process.env.PUSHOVER_API_TOKEN
  const user = process.env.PUSHOVER_USER_KEY

  if (!token || !user) return

  await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, user, title, message, priority: 0 }),
  })
}

const ALLOWED_ORIGIN = /^https:\/\/(www\.)?(creation-sites-godino|lanterneweb)\.fr$/

// ─── Email SMTP ───────────────────────────────────────────────────────────────
function escapeHtml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendEmail(
  data: {
    nom: string
    email: string
    telephone: string
    message: string
  },
  suspect: boolean
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const e = {
    nom: escapeHtml(data.nom),
    email: escapeHtml(data.email),
    telephone: escapeHtml(data.telephone),
    message: escapeHtml(data.message).replace(/\n/g, '<br>'),
  }
  const ligne = (label: string, valeur: string) =>
    `<tr><td style="padding:8px 0;color:#5E6670;font-size:14px;width:120px;vertical-align:top">${label}</td><td style="padding:8px 0">${valeur}</td></tr>`

  await transporter.sendMail({
    from: `"Site Lanterne Web" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
    replyTo: data.email,
    subject: `${suspect ? '[Spam probable] ' : ''}Nouveau contact : ${data.nom.replace(/[\r\n]/g, ' ')}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#17212E">
        <h2 style="margin-bottom:24px">Nouveau contact depuis le site</h2>
        <table style="width:100%;border-collapse:collapse">
          ${ligne('Nom', e.nom)}
          ${ligne('Email', `<a href="mailto:${e.email}">${e.email}</a>`)}
          ${e.telephone ? ligne('Téléphone', e.telephone) : ''}
          ${ligne('Message', e.message)}
        </table>
      </div>
    `,
  })
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Origin check : accepter seulement les requêtes du propre domaine
    const origin = req.headers.get('origin') ?? ''
    // (ancien et nouveau domaine, avec ou sans www).
    if (process.env.NODE_ENV === 'production' && origin && !ALLOWED_ORIGIN.test(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limiting par IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez dans 10 minutes.' },
        { status: 429 }
      )
    }

    // JSON (envoi en JavaScript) ou formulaire HTML classique (sans JavaScript).
    const isForm = !(req.headers.get('content-type') ?? '').includes('application/json')
    const data: Record<string, unknown> = isForm
      ? Object.fromEntries(await req.formData())
      : await req.json()
    const { nom, email, telephone, message, societe_site } = data
    const done = () =>
      isForm
        ? NextResponse.redirect(new URL('/contact?envoye=1', SITE_URL), 303)
        : NextResponse.json({ success: true })

    // Anti-robots : champ piège rempli, ou jeton absent / falsifié / envoi
    // trop rapide. On répond comme un succès pour ne rien apprendre au robot.
    const tokenStatus = checkFormToken(data[FORM_TOKEN_FIELD])
    if (societe_site || (tokenStatus !== 'ok' && tokenStatus !== 'expired')) {
      console.warn(`[Contact] Envoi bloqué (${societe_site ? 'honeypot' : tokenStatus}) ip=${ip}`)
      return done()
    }
    // Page restée ouverte très longtemps : le client JS relance seul avec ce
    // nouveau jeton, le visiteur ne voit rien.
    if (tokenStatus === 'expired') {
      return NextResponse.json(
        { error: 'Page expirée. Rechargez la page et renvoyez le message.', token: createRetryToken() },
        { status: 409 }
      )
    }

    // Validation
    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const payload = {
      nom: String(nom).slice(0, 100),
      email: String(email).slice(0, 200),
      telephone: String(telephone ?? '').slice(0, 30),
      message: String(message ?? '').slice(0, 2000),
    }

    const suspect = looksLikeSpam(payload.message)

    // Envoi parallèle email + push (pas de notification pour un message suspect)
    const pushMsg = [
      payload.nom,
      payload.telephone ? `Tél : ${payload.telephone}` : '',
      `Email : ${payload.email}`,
      payload.message,
    ].filter(Boolean).join('\n')

    const [emailResult, pushResult] = await Promise.allSettled([
      sendEmail(payload, suspect),
      suspect ? Promise.resolve() : sendPushover('Nouveau contact', pushMsg),
    ])

    if (emailResult.status === 'rejected') {
      console.error('[Contact] Email failed:', emailResult.reason)
      return NextResponse.json({ error: 'Échec envoi email: ' + String(emailResult.reason) }, { status: 500 })
    }
    if (pushResult.status === 'rejected') {
      console.error('[Contact] Pushover failed:', pushResult.reason)
    }

    return done()
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
