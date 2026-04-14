import { NextRequest, NextResponse } from 'next/server'

// TODO: Brancher Resend.com pour les emails transactionnels
//
// 1. Installer le SDK : npm install resend
//
// 2. Décommenter les imports et le code ci-dessous
//
// 3. Ajouter dans .env.local :
//    RESEND_API_KEY=re_xxxxxxxxxxxx
//
// 4. Ajouter dans Vercel > Settings > Environment Variables :
//    RESEND_API_KEY=re_xxxxxxxxxxxx
//
// 5. Vérifier votre domaine création-sites-godino.fr sur resend.com/domains
//    pour pouvoir envoyer depuis contact@creation-sites-godino.fr
//
// Documentation : https://resend.com/docs/send-with-nextjs

// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      prenom,
      nom,
      email,
      telephone,
      secteur,
      message,
      offreLancement,
    } = data

    // Validation minimale côté serveur
    if (!prenom || !nom || !email || !telephone || !secteur) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    // TODO: Décommenter et adapter ce code une fois Resend configuré
    //
    // const sujet = offreLancement
    //   ? `🔥 Offre lancement — ${prenom} ${nom} (${secteur})`
    //   : `Nouveau contact — ${prenom} ${nom} (${secteur})`
    //
    // await resend.emails.send({
    //   from: 'Site GODINO <noreply@creation-sites-godino.fr>',
    //   to: 'contact@creation-sites-godino.fr',
    //   replyTo: email,
    //   subject: sujet,
    //   html: `
    //     <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
    //       <h2 style="color: #1A1208; margin-bottom: 24px;">Nouveau contact depuis le site</h2>
    //
    //       ${offreLancement ? `
    //         <div style="background: #C8622A15; border: 1px solid #C8622A30; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
    //           <strong style="color: #C8622A;">🔥 Offre lancement demandée</strong>
    //         </div>
    //       ` : ''}
    //
    //       <table style="width: 100%; border-collapse: collapse;">
    //         <tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px;">Prénom</td><td style="padding: 8px 0; font-weight: 500;">${prenom}</td></tr>
    //         <tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px;">Nom</td><td style="padding: 8px 0; font-weight: 500;">${nom}</td></tr>
    //         <tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
    //         <tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td></tr>
    //         <tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px;">Secteur</td><td style="padding: 8px 0;">${secteur}</td></tr>
    //         ${message ? `<tr><td style="padding: 8px 0; color: #7A6E63; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
    //       </table>
    //     </div>
    //   `,
    // })
    //
    // // Email de confirmation au prospect
    // await resend.emails.send({
    //   from: 'Pierre GODINO <contact@creation-sites-godino.fr>',
    //   to: email,
    //   subject: 'Votre demande a bien été reçue — GODINO Pierre',
    //   html: `
    //     <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
    //       <h2 style="color: #1A1208;">Bonjour ${prenom},</h2>
    //       <p>J'ai bien reçu votre message et je vous réponds sous 24h.</p>
    //       <p style="color: #7A6E63;">À très vite,<br>Pierre GODINO<br>+33 7 67 24 99 80</p>
    //     </div>
    //   `,
    // })

    // En attendant Resend, on log côté serveur (visible dans Vercel Functions logs)
    console.log('[Contact Form]', {
      prenom,
      nom,
      email,
      telephone,
      secteur,
      message: message || '(aucun)',
      offreLancement,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
