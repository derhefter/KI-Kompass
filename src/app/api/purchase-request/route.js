import { NextResponse } from 'next/server'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' }, { status: 429 })
    }

    const { plan, name, email, company, phone } = await request.json()

    // Validierung
    if (!plan || !['premium', 'strategie'].includes(plan)) {
      return NextResponse.json({ error: 'Ungültiger Plan' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.length < 2) {
      return NextResponse.json({ error: 'Name erforderlich' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }

    const safeName = name.slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeMail = email.slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (company || '–').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safePhone = (phone || '–').slice(0, 50).replace(/[<>\r\n]/g, '')

    const planName = plan === 'premium' ? 'Premium Report (197 €)' : 'Strategie-Paket (497 €)'
    const planPrice = plan === 'premium' ? '197' : '497'
    const paypalLink = `https://paypal.me/frimalo/${planPrice}EUR`
    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || ''

    // 1. Benachrichtigung an Steffen
    const ownerSent = await sendNotificationToOwner({
      subject: `Neue Kaufanfrage: ${planName} – ${safeCompany}`,
      html: `
        <h2 style="color:#2563eb;">Neue Kaufanfrage über den KI-Kompass!</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr style="background:#f0f9ff;"><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Produkt</td><td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#2563eb;">${planName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">${safeName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:10px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${safeMail}">${safeMail}</a></td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:10px;border:1px solid #ddd;">${safePhone}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Datum</td><td style="padding:10px;border:1px solid #ddd;">${new Date().toLocaleString('de-DE')}</td></tr>
        </table>
        <div style="margin-top:16px;padding:12px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;">
          <strong>Hinweis:</strong> Dem Kunden wurde der PayPal-Link (<a href="${paypalLink}">${paypalLink}</a>) angezeigt.
          Prüfe den PayPal-Eingang. Falls keine PayPal-Zahlung eingeht, sende eine Rechnung über ${planPrice} € an <a href="mailto:${safeMail}">${safeMail}</a>.
        </div>
        <h3 style="margin-top:20px;">Nächste Schritte:</h3>
        <ol>
          <li>PayPal-Eingang prüfen oder Rechnung über ${planPrice} € senden</li>
          <li>Nach Zahlungseingang: Zugang zum Premium Assessment freischalten</li>
          ${plan === 'strategie' ? '<li>Termin für Strategiegespräch bestätigen (Kunde hat Kalender-Link erhalten)</li>' : ''}
        </ol>
        <p style="margin-top:16px;color:#666;">Antworte direkt auf diese Mail, um den Kunden zu kontaktieren.</p>
      `,
    })

    // 2. Bestätigung an den Kunden
    await sendConfirmationToCustomer({
      to: safeMail,
      subject: `Ihre Bestellung: KI-Kompass ${planName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#2563eb;color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:24px;">KI-Kompass</h1>
            <p style="margin:8px 0 0;opacity:0.9;">KI-Readiness Assessment f&uuml;r KMU</p>
          </div>
          <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank f&uuml;r Ihre Bestellung, ${safeName}!</h2>
            <p>Sie haben den <strong>${planName}</strong> bestellt.</p>

            <div style="background:#eff6ff;border:2px solid #0070ba;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
              <p style="margin:0 0 12px;font-size:16px;font-weight:bold;color:#1e3a8a;">Jetzt bezahlen &ndash; schnell &amp; sicher</p>
              <a href="${paypalLink}" style="display:inline-block;background:#0070ba;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">&euro;${planPrice} mit PayPal bezahlen</a>
              <p style="margin:12px 0 0;font-size:12px;color:#666;">Auch ohne PayPal-Konto mit Kreditkarte oder Lastschrift m&ouml;glich</p>
            </div>

            <p style="text-align:center;color:#999;font-size:13px;">Alternativ erhalten Sie innerhalb von 24 Stunden eine Rechnung per E-Mail zur &Uuml;berweisung.</p>

            ${plan === 'strategie' && bookingUrl ? `
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:24px 0;text-align:center;">
              <p style="margin:0 0 8px;font-weight:bold;color:#166534;">Strategiegespr&auml;ch buchen</p>
              <p style="margin:0 0 12px;font-size:14px;color:#666;">Buchen Sie direkt Ihren Wunschtermin f&uuml;r das 60-Min. Video-Strategiegespr&auml;ch:</p>
              <a href="${bookingUrl}" style="display:inline-block;background:#16a34a;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Termin w&auml;hlen</a>
            </div>
            ` : ''}

            <div style="background:#f0f9ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:24px 0;">
              <h3 style="margin-top:0;color:#2563eb;">So geht es weiter</h3>
              <ol style="margin-bottom:0;padding-left:20px;">
                <li>Zahlung per PayPal oder &Uuml;berweisung</li>
                <li>Nach Zahlungseingang schalten wir Ihren Zugang frei</li>
                <li>Sie starten das Premium Assessment (35 Detailfragen)</li>
                <li>Sie erhalten Ihren individuellen KI-Readiness Report</li>
                ${plan === 'strategie' ? '<li>Ihr Strategiegespräch findet zum gebuchten Termin statt</li>' : ''}
              </ol>
            </div>

            <p>Bei Fragen erreichen Sie mich jederzeit &uuml;ber diese E-Mail-Adresse.</p>
            <p style="margin-bottom:0;">
              Mit freundlichen Gr&uuml;&szlig;en<br />
              <strong>Steffen Hefter</strong><br />
              frimalo &ndash; KI-Beratung<br />
              Wilhelm-Schrader-Str. 27a, 06120 Halle (Saale)
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, emailSent: ownerSent })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
