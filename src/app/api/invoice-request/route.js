import { NextResponse } from 'next/server'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { saveAccessCode } from '../../../lib/google-sheets'
import crypto from 'crypto'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, (m) => map[m])
}

function generateAccessCode(companyName) {
  const prefix = (companyName || 'KUNDE')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 6)
    .toUpperCase()
  const suffix = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `${prefix}-${suffix}`
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' },
        { status: 429 }
      )
    }

    const { plan, name, email, company } = await request.json()

    if (!plan || !['premium', 'strategie'].includes(plan)) {
      return NextResponse.json({ error: 'Ungültiger Plan' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.length < 2) {
      return NextResponse.json({ error: 'Name erforderlich' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }

    if (email.length > 254) {
      return NextResponse.json({ error: 'E-Mail zu lang' }, { status: 400 })
    }

    const safeName = escapeHtml(name.slice(0, 200).replace(/[\r\n]/g, ''))
    const safeMail = email.slice(0, 254).replace(/[<>\r\n"'&]/g, '')
    const safeCompany = escapeHtml((company || '–').slice(0, 200).replace(/[\r\n]/g, ''))

    const planName =
      plan === 'premium' ? 'Premium Report (197 €)' : 'Strategie-Paket (497 €)'
    const planPrice = plan === 'premium' ? '197' : '497'

    const accessCode = generateAccessCode(safeCompany)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de'
    const accessLink = `${baseUrl}/premium?code=${accessCode}`

    // Ablaufdatum: 7 Tage ab jetzt
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const expiresAtISO = expiresAt.toISOString()
    const expiresAtFormatted = expiresAt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    const createdAtISO = new Date().toISOString()

    // Google Sheets: Zugangscode speichern (sofort aktiv – kein manuelles Deployment nötig!)
    saveAccessCode({
      code: accessCode,
      name: safeName,
      email: safeMail,
      company: safeCompany,
      plan,
      expiresAt: expiresAtISO,
      createdAt: createdAtISO,
    }).catch((err) => console.error('Fehler beim Speichern des Zugangscodes:', err.message))

    // Kundendaten werden NICHT hier gespeichert – das passiert bereits in /api/purchase-request
    // (verhindert doppelte Einträge in der Kundendatenbank)

    // Vorbereitete E-Mail-Vorlage für den Kunden (zum Kopieren/Versenden durch Steffen)
    const customerEmailTemplate = `
Betreff: Ihr Zugangscode für den KI-Kompass ${planName}

Guten Tag ${safeName},

vielen Dank für Ihre Bestellung des ${planName}!

Ihr persönlicher Zugangscode lautet: ${accessCode}

Klicken Sie auf folgenden Link, um direkt zu starten:
${accessLink}

WICHTIG: Bitte lösen Sie Ihren Zugangscode innerhalb von 7 Tagen ein (gültig bis ${expiresAtFormatted}). Danach verliert der Code seine Gültigkeit.

Bei Fragen stehe ich Ihnen jederzeit zur Verfügung.

Mit freundlichen Grüßen
Steffen Hefter
frimalo – KI-Beratung
Wilhelm-Schrader-Str. 27a, 06120 Halle (Saale)`

    // 1. E-Mail an Steffen mit Zugangscode + vorbereiteter Kundenmail + Rechnungshinweis
    await sendNotificationToOwner({
      subject: `RECHNUNG ANGEFORDERT: ${planName} – ${safeCompany}`,
      html: `
        <h2 style="color:#dc2626;">Rechnungsanforderung eingegangen!</h2>
        <p style="font-size:16px;">Der Kunde möchte <strong>per Rechnung</strong> zahlen. Bitte Rechnung erstellen und versenden.</p>

        <table style="border-collapse:collapse;width:100%;max-width:500px;margin:16px 0;">
          <tr style="background:#fef2f2;"><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Produkt</td><td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#dc2626;">${planName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">${safeName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:10px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${safeMail}">${safeMail}</a></td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Datum</td><td style="padding:10px;border:1px solid #ddd;">${new Date().toLocaleString('de-DE')}</td></tr>
        </table>

        <div style="margin:20px 0;padding:16px;background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;">
          <h3 style="margin-top:0;color:#92400e;">Rechnungsdaten</h3>
          <p>Bitte erstelle eine Rechnung über <strong>${planPrice} €</strong> und sende sie an <a href="mailto:${safeMail}">${safeMail}</a>.</p>
          <p style="margin-bottom:0;">Zahlungsziel: 14 Tage nach Rechnungsdatum</p>
        </div>

        <div style="margin:20px 0;padding:16px;background:#ecfdf5;border:2px solid #10b981;border-radius:8px;">
          <h3 style="margin-top:0;color:#065f46;">Freischaltcode (generiert)</h3>
          <p style="font-size:20px;font-weight:bold;font-family:monospace;background:#f0fdf4;padding:10px;border-radius:4px;text-align:center;">${accessCode}</p>
          <p>Freischalt-Link für den Kunden:</p>
          <p><a href="${accessLink}" style="word-break:break-all;">${accessLink}</a></p>
          <p style="color:#666;font-size:13px;margin-bottom:0;">
            <strong>Wichtig:</strong> Trage diesen Code in <code>src/data/customers.js</code> ein, bevor du den Link an den Kunden sendest:
          </p>
          <pre style="background:#f9fafb;padding:12px;border-radius:4px;font-size:13px;overflow-x:auto;margin-bottom:0;">
{
  code: '${accessCode}',
  name: '${safeName}',
  email: '${safeMail}',
  company: '${safeCompany}',
  plan: '${plan}',
  expiresAt: '${expiresAtISO}',
  createdAt: '${createdAtISO}',
}</pre>
          <p style="color:#dc2626;font-weight:bold;font-size:13px;margin-top:8px;">
            Ablaufdatum: ${expiresAtFormatted} (7 Tage ab jetzt)
          </p>
        </div>

        <div style="margin:20px 0;padding:16px;background:#eff6ff;border:2px solid #3b82f6;border-radius:8px;">
          <h3 style="margin-top:0;color:#1e40af;">Vorbereitete E-Mail an den Kunden</h3>
          <p style="font-size:13px;color:#666;">Kopiere den folgenden Text und sende ihn an den Kunden, nachdem die Rechnung erstellt wurde und der Code in customers.js eingetragen ist:</p>
          <div style="background:white;padding:12px;border-radius:4px;border:1px solid #ddd;font-family:monospace;font-size:13px;white-space:pre-wrap;">${escapeHtml(customerEmailTemplate)}</div>
          <p style="margin-bottom:0;margin-top:8px;">
            <a href="mailto:${safeMail}?subject=${encodeURIComponent(`Ihr Zugangscode für den KI-Kompass ${planName}`)}&body=${encodeURIComponent(customerEmailTemplate)}" style="display:inline-block;background:#2563eb;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-family:Arial,sans-serif;">
              E-Mail an Kunden öffnen
            </a>
          </p>
        </div>

        <h3 style="margin-top:24px;">Nächste Schritte:</h3>
        <ol>
          <li>Rechnung über ${planPrice} € erstellen und an ${safeMail} senden</li>
          <li>Code <code>${accessCode}</code> in <code>src/data/customers.js</code> eintragen</li>
          <li>Neu deployen: <code>npm run build</code></li>
          <li>Vorbereitete E-Mail mit Zugangscode an den Kunden senden</li>
        </ol>
      `,
    })

    // 2. Bestätigungsmail an den Kunden
    await sendConfirmationToCustomer({
      to: safeMail,
      subject: `Ihre Rechnungsanforderung: KI-Kompass ${planName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#2563eb;color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:24px;">KI-Kompass</h1>
            <p style="margin:8px 0 0;opacity:0.9;">KI-Readiness Assessment f&uuml;r KMU</p>
          </div>
          <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank f&uuml;r Ihre Bestellung, ${safeName}!</h2>

            <p>Sie haben den <strong>${planName}</strong> bestellt und die Zahlung <strong>per Rechnung</strong> gew&auml;hlt.</p>

            <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
              <p style="margin:0 0 8px;font-weight:bold;color:#92400e;font-size:16px;">Rechnung wird erstellt</p>
              <p style="margin:0;color:#78350f;font-size:14px;">
                Sie erhalten in K&uuml;rze eine Rechnung &uuml;ber <strong>${planPrice} &euro;</strong> per E-Mail.
              </p>
            </div>

            <div style="background:#ecfdf5;border:1px solid #10b981;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
              <p style="margin:0 0 8px;font-weight:bold;color:#065f46;font-size:16px;">Freischaltung Ihres Zugangs</p>
              <p style="margin:0;color:#064e3b;font-size:14px;">
                Ihr Zugang zum Premium Assessment wird <strong>innerhalb der n&auml;chsten 12 Stunden</strong> freigeschaltet.
                Sie erhalten dann eine separate E-Mail mit Ihrem pers&ouml;nlichen Zugangscode und Link.
              </p>
            </div>

            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:24px 0;text-align:center;">
              <p style="margin:0;font-weight:bold;color:#991b1b;font-size:14px;">
                Bitte beachten Sie: Ihr Zugangscode ist <strong>7 Tage</strong> g&uuml;ltig. Bitte l&ouml;sen Sie ihn innerhalb dieses Zeitraums ein.
              </p>
            </div>

            <div style="background:#f0f9ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:24px 0;">
              <h3 style="margin-top:0;color:#2563eb;">So geht es weiter</h3>
              <ol style="margin-bottom:0;padding-left:20px;">
                <li>Sie erhalten Ihre Rechnung per E-Mail</li>
                <li>Ihr Zugang wird innerhalb von 12 Stunden freigeschaltet</li>
                <li>Sie erhalten Ihren pers&ouml;nlichen Zugangscode per E-Mail</li>
                <li>Sie starten das Premium Assessment (35 Detailfragen)</li>
                <li>Sie erhalten Ihren individuellen KI-Readiness Report</li>
                ${plan === 'strategie' ? '<li>Wir vereinbaren einen Termin f&uuml;r Ihr 60-Min. Strategiegespr&auml;ch</li>' : ''}
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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
