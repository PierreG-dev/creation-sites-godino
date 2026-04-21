import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

// ─── Email SMTP ───────────────────────────────────────────────────────────────
async function sendEmail(data: {
  prenom: string
  nom: string
  email: string
  telephone: string
  secteur: string
  message: string
  offreLancement: boolean
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const sujet = data.offreLancement
    ? `🔥 Offre lancement — ${data.prenom} ${data.nom} (${data.secteur})`
    : `Nouveau contact — ${data.prenom} ${data.nom} (${data.secteur})`

  await transporter.sendMail({
    from: `"Site GODINO" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
    replyTo: data.email,
    subject: sujet,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1208">
        <h2 style="margin-bottom:24px">Nouveau contact depuis le site</h2>
        ${data.offreLancement ? `
          <div style="background:#C8622A15;border:1px solid #C8622A40;border-radius:12px;padding:16px;margin-bottom:24px">
            <strong style="color:#C8622A">🔥 Offre lancement demandée — création gratuite</strong>
          </div>
        ` : ''}
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#7A6E63;font-size:14px;width:120px">Prénom</td><td style="padding:8px 0;font-weight:500">${data.prenom}</td></tr>
          <tr><td style="padding:8px 0;color:#7A6E63;font-size:14px">Nom</td><td style="padding:8px 0;font-weight:500">${data.nom}</td></tr>
          <tr><td style="padding:8px 0;color:#7A6E63;font-size:14px">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#7A6E63;font-size:14px">WhatsApp</td><td style="padding:8px 0"><a href="https://wa.me/${data.telephone.replace(/\D/g, '')}">${data.telephone}</a></td></tr>
          <tr><td style="padding:8px 0;color:#7A6E63;font-size:14px">Secteur</td><td style="padding:8px 0">${data.secteur}</td></tr>
          ${data.message ? `<tr><td style="padding:8px 0;color:#7A6E63;font-size:14px;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>` : ''}
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
    const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    if (
      allowedOrigin &&
      process.env.NODE_ENV === 'production' &&
      !origin.startsWith(allowedOrigin)
    ) {
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

    const data = await req.json()
    const { prenom, nom, email, telephone, secteur, message, offreLancement, _honeypot } = data

    // Honeypot anti-bot
    if (_honeypot) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!prenom || !nom || !email || !telephone || !secteur) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const payload = {
      prenom: String(prenom).slice(0, 100),
      nom: String(nom).slice(0, 100),
      email: String(email).slice(0, 200),
      telephone: String(telephone).slice(0, 20),
      secteur: String(secteur).slice(0, 100),
      message: String(message ?? '').slice(0, 2000),
      offreLancement: Boolean(offreLancement),
    }

    // Envoi parallèle email + push
    await Promise.allSettled([
      sendEmail(payload),
      sendPushover(
        payload.offreLancement ? '🔥 Offre lancement' : 'Nouveau contact',
        `${payload.prenom} ${payload.nom} — ${payload.secteur}\n${payload.telephone}`
      ),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
