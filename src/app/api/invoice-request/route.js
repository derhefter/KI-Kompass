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

// frimalo Logo als Base64 (PNG)
const FRIMALO_LOGO_BASE64 = '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'

// Rechnung als HTML generieren (DIN 5008, Arial, editierbar)
function generateInvoiceHtml({ safeName, safeMail, safeCompany, safeStreet, safePlzCity, planName, plan, planPrice, datum }) {
  const netto = planPrice
  const ust = (parseFloat(planPrice) * 0.19).toFixed(2)
  const brutto = (parseFloat(planPrice) * 1.19).toFixed(2)

  const leistungsBeschreibung = plan === 'premium'
    ? 'Premium Report &ndash; KI-Reifegradanalyse inkl. Roadmap, Use-Cases &amp; F&ouml;rdermittel&uuml;bersicht'
    : 'Strategie-Paket &ndash; inkl. Premium Report, 60-Min. Strategiegespr&auml;ch, KI-Strategie, F&ouml;rdermittelberatung, 30 Tage Support'

  // Zahlungsziel: 14 Tage ab heute
  const zahlungsziel = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Rechnung &ndash; frimalo &ndash; ${planName}</title>
  <style>
    @page { size: A4; margin: 20mm 25mm 25mm 25mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1a1a1a;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm 25mm 25mm 25mm;
    }
    /* DIN 5008: Absender-Kurzzeile */
    .absender-kurz {
      font-size: 7pt;
      color: #666;
      border-bottom: 1px solid #999;
      padding-bottom: 2px;
      margin-bottom: 5mm;
    }
    /* Briefkopf */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15mm;
    }
    .header-left { max-width: 60%; }
    .header-right {
      text-align: right;
      font-size: 9pt;
      color: #444;
    }
    .logo { height: 40px; margin-bottom: 5mm; }
    .firma-name {
      font-size: 14pt;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 2mm;
    }
    /* Empf&auml;nger (DIN 5008 Anschriftfeld) */
    .empfaenger {
      min-height: 27.3mm;
      margin-bottom: 10mm;
      padding: 5mm 0;
    }
    .empfaenger .editable {
      color: #c00;
      font-style: italic;
      border-bottom: 1px dashed #c00;
    }
    /* Betreffzeile */
    .betreff {
      font-size: 12pt;
      font-weight: bold;
      margin-bottom: 8mm;
    }
    /* Infos rechts */
    .rechnungs-info {
      margin-bottom: 8mm;
    }
    .rechnungs-info table {
      font-size: 9pt;
    }
    .rechnungs-info td {
      padding: 1px 8px 1px 0;
    }
    .rechnungs-info td:first-child {
      color: #666;
    }
    .rechnungs-info .editable {
      color: #c00;
      font-style: italic;
    }
    /* Anrede & Text */
    .anrede { margin-bottom: 5mm; }
    .text-block { margin-bottom: 5mm; }
    /* Leistungstabelle */
    .leistung-table {
      width: 100%;
      border-collapse: collapse;
      margin: 5mm 0 8mm 0;
    }
    .leistung-table th {
      background: #f3f4f6;
      font-weight: bold;
      text-align: left;
      padding: 3mm 4mm;
      border-bottom: 2px solid #2563eb;
      font-size: 9pt;
    }
    .leistung-table th:last-child { text-align: right; }
    .leistung-table td {
      padding: 3mm 4mm;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: top;
    }
    .leistung-table td:last-child { text-align: right; white-space: nowrap; }
    .leistung-table .summe td {
      border-bottom: none;
      padding-top: 1mm;
      font-size: 9pt;
    }
    .leistung-table .gesamt td {
      font-weight: bold;
      font-size: 11pt;
      border-top: 2px solid #2563eb;
      padding-top: 3mm;
    }
    /* Bankverbindung */
    .bank-box {
      background: #f0f9ff;
      border: 1px solid #bfdbfe;
      border-radius: 4px;
      padding: 4mm 5mm;
      margin: 8mm 0;
      font-size: 9pt;
    }
    .bank-box strong { color: #2563eb; }
    .bank-box table td { padding: 1px 10px 1px 0; }
    /* Hinweis */
    .hinweis {
      font-size: 8.5pt;
      color: #666;
      margin-top: 5mm;
    }
    /* Fu&szlig;zeile */
    .footer {
      margin-top: 15mm;
      padding-top: 3mm;
      border-top: 1px solid #ddd;
      font-size: 8pt;
      color: #888;
      display: flex;
      justify-content: space-between;
    }
    .footer div { max-width: 33%; }
    /* Editierbare Felder hervorheben */
    [contenteditable="true"] {
      outline: none;
      border-bottom: 1px dashed #c00;
    }
    @media print {
      body { padding: 0; }
      .editable { color: #1a1a1a !important; font-style: normal !important; border: none !important; }
      [contenteditable="true"] { border: none !important; }
    }
  </style>
</head>
<body>
  <!-- Logo & Absender -->
  <div class="header">
    <div class="header-left">
      <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" class="logo" />
      <div class="firma-name">frimalo</div>
      <div style="font-size:9pt;color:#444;">KI-Beratung f&uuml;r den Mittelstand</div>
    </div>
    <div class="header-right">
      <strong>frimalo</strong><br>
      Inhaber: Steffen Hefter<br>
      Wilhelm-Schrader-Str. 27a<br>
      06120 Halle (Saale)<br><br>
      E-Mail: steffenhefter@googlemail.com<br>
      Steuernummer: 110/229/09047
    </div>
  </div>

  <!-- DIN 5008: Absender-Kurzzeile -->
  <div class="absender-kurz">frimalo &middot; Wilhelm-Schrader-Str. 27a &middot; 06120 Halle (Saale)</div>

  <!-- Empf&auml;nger -->
  <div class="empfaenger">
    ${safeCompany !== '&ndash;' && safeCompany !== '–' ? `${safeCompany}<br>` : ''}
    ${safeName}<br>
    ${safeStreet}<br>
    ${safePlzCity}
  </div>

  <!-- Rechnungsinfos -->
  <div class="rechnungs-info">
    <table>
      <tr><td>Rechnungsnummer:</td><td><span class="editable" contenteditable="true">[RE-XXXX]</span></td></tr>
      <tr><td>Rechnungsdatum:</td><td>${datum}</td></tr>
      <tr><td>Leistungsdatum:</td><td>${datum}</td></tr>
      <tr><td>Zahlungsziel:</td><td>${zahlungsziel}</td></tr>
    </table>
  </div>

  <!-- Betreff -->
  <div class="betreff">Rechnung &ndash; ${planName}</div>

  <!-- Anrede -->
  <div class="anrede">Sehr geehrte(r) ${safeName},</div>
  <div class="text-block">f&uuml;r die nachfolgend aufgef&uuml;hrte Leistung erlaube ich mir, wie folgt abzurechnen:</div>

  <!-- Leistungstabelle -->
  <table class="leistung-table">
    <thead>
      <tr><th>Leistung</th><th>Betrag</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>${leistungsBeschreibung}</td>
        <td>${parseFloat(netto).toFixed(2)} &euro;</td>
      </tr>
      <tr class="summe">
        <td style="text-align:right;color:#666;">Nettobetrag:</td>
        <td>${parseFloat(netto).toFixed(2)} &euro;</td>
      </tr>
      <tr class="summe">
        <td style="text-align:right;color:#666;">zzgl. 19% Umsatzsteuer:</td>
        <td>${ust} &euro;</td>
      </tr>
      <tr class="gesamt">
        <td style="text-align:right;">Rechnungsbetrag:</td>
        <td>${brutto} &euro;</td>
      </tr>
    </tbody>
  </table>

  <!-- Bankverbindung -->
  <div class="bank-box">
    <strong>Bankverbindung:</strong>
    <table style="margin-top:2mm;">
      <tr><td>Bank:</td><td>Deutsche Bank</td></tr>
      <tr><td>IBAN:</td><td>DE89 1001 0010 0952 9931 04</td></tr>
      <tr><td>BIC:</td><td>PBNKDEFF</td></tr>
      <tr><td>Verwendungszweck:</td><td><span class="editable" contenteditable="true">[RE-XXXX]</span> &ndash; ${safeCompany !== '–' ? safeCompany : safeName}</td></tr>
    </table>
  </div>

  <div class="text-block">
    Bitte &uuml;berweisen Sie den Rechnungsbetrag von <strong>${brutto} &euro;</strong> bis zum <strong>${zahlungsziel}</strong> auf das oben genannte Konto.
  </div>

  <div class="hinweis">
    Gem&auml;&szlig; &sect; 19 UStG wird Umsatzsteuer ausgewiesen. Es handelt sich um eine Kleinunternehmerregelung, sofern diese zutrifft &ndash; bitte pr&uuml;fen und ggf. anpassen.
  </div>

  <div class="text-block" style="margin-top:8mm;">
    Vielen Dank f&uuml;r Ihr Vertrauen!
  </div>
  <div class="text-block">
    Mit freundlichen Gr&uuml;&szlig;en<br><br>
    <strong>Steffen Hefter</strong><br>
    frimalo &ndash; KI-Beratung
  </div>

  <!-- Fu&szlig;zeile -->
  <div class="footer">
    <div>
      frimalo<br>
      Inhaber: Steffen Hefter<br>
      Wilhelm-Schrader-Str. 27a<br>
      06120 Halle (Saale)
    </div>
    <div style="text-align:center;">
      E-Mail: steffenhefter@googlemail.com<br>
      Steuernr.: 110/229/09047
    </div>
    <div style="text-align:right;">
      Deutsche Bank<br>
      IBAN: DE89 1001 0010 0952 9931 04<br>
      BIC: PBNKDEFF
    </div>
  </div>
</body>
</html>`
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

    const { plan, name, email, company, street, plz, city } = await request.json()

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
    if (!street || typeof street !== 'string' || street.length < 3) {
      return NextResponse.json({ error: 'Straße und Hausnummer erforderlich' }, { status: 400 })
    }
    if (!plz || !/^\d{4,5}$/.test(plz)) {
      return NextResponse.json({ error: 'Gültige PLZ erforderlich' }, { status: 400 })
    }
    if (!city || typeof city !== 'string' || city.length < 2) {
      return NextResponse.json({ error: 'Ort erforderlich' }, { status: 400 })
    }

    const safeName = escapeHtml(name.slice(0, 200).replace(/[\r\n]/g, ''))
    const safeMail = email.slice(0, 254).replace(/[<>\r\n"'&]/g, '')
    const safeCompany = escapeHtml((company || '–').slice(0, 200).replace(/[\r\n]/g, ''))
    const safeStreet = escapeHtml(street.slice(0, 200).replace(/[\r\n]/g, ''))
    const safePlz = escapeHtml(plz.slice(0, 5).replace(/[\r\n]/g, ''))
    const safeCity = escapeHtml(city.slice(0, 200).replace(/[\r\n]/g, ''))
    const safePlzCity = `${safePlz} ${safeCity}`

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
    const datum = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })

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

    // Rechnung als HTML generieren (editierbar, DIN 5008, Arial)
    const invoiceHtml = generateInvoiceHtml({
      safeName, safeMail, safeCompany, safeStreet, safePlzCity, planName, plan, planPrice, datum,
    })

    // Vorbereitete E-Mail-Vorlage für den Kunden
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

    // 1. E-Mail an Steffen mit Zugangscode + Rechnung als Anhang
    await sendNotificationToOwner({
      subject: `RECHNUNG ANGEFORDERT: ${planName} – ${safeCompany}`,
      html: `
        <h2 style="color:#dc2626;">Rechnungsanforderung eingegangen!</h2>
        <p style="font-size:16px;">Der Kunde möchte <strong>per Rechnung</strong> zahlen. Bitte Rechnung vervollständigen und versenden.</p>

        <table style="border-collapse:collapse;width:100%;max-width:500px;margin:16px 0;">
          <tr style="background:#fef2f2;"><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Produkt</td><td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#dc2626;">${planName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">${safeName}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:10px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${safeMail}">${safeMail}</a></td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Adresse</td><td style="padding:10px;border:1px solid #ddd;">${safeStreet}<br>${safePlzCity}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Datum</td><td style="padding:10px;border:1px solid #ddd;">${datum}</td></tr>
        </table>

        <div style="margin:20px 0;padding:16px;background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;">
          <h3 style="margin-top:0;color:#92400e;">Rechnungsdaten</h3>
          <p>Netto: <strong>${planPrice},00 €</strong> | USt (19%): <strong>${(parseFloat(planPrice) * 0.19).toFixed(2)} €</strong> | <strong style="font-size:18px;">Brutto: ${(parseFloat(planPrice) * 1.19).toFixed(2)} €</strong></p>
          <p>Zahlungsziel: 14 Tage nach Rechnungsdatum</p>
          <p style="margin-bottom:0;font-weight:bold;color:#dc2626;">📎 Rechnung als editierbare HTML-Datei im Anhang! Kundenadresse ist bereits eingetragen – bitte nur noch Rechnungsnummer ergänzen.</p>
        </div>

        <div style="margin:20px 0;padding:16px;background:#ecfdf5;border:2px solid #10b981;border-radius:8px;">
          <h3 style="margin-top:0;color:#065f46;">Freischaltcode (automatisch gespeichert)</h3>
          <p style="font-size:20px;font-weight:bold;font-family:monospace;background:#f0fdf4;padding:10px;border-radius:4px;text-align:center;">${accessCode}</p>
          <p>Freischalt-Link für den Kunden:</p>
          <p><a href="${accessLink}" style="word-break:break-all;">${accessLink}</a></p>
          <p style="color:#065f46;font-size:13px;margin-bottom:0;">
            <strong>✅ Der Code wurde automatisch in Google Sheets gespeichert</strong> und ist sofort aktiv.
            Der Kunde kann ihn direkt verwenden – kein manuelles Eintragen oder Deployment nötig.
          </p>
          <p style="color:#dc2626;font-weight:bold;font-size:13px;margin-top:8px;">
            Ablaufdatum: ${expiresAtFormatted} (7 Tage ab jetzt)
          </p>
        </div>

        <div style="margin:20px 0;padding:16px;background:#eff6ff;border:2px solid #3b82f6;border-radius:8px;">
          <h3 style="margin-top:0;color:#1e40af;">Vorbereitete E-Mail an den Kunden</h3>
          <p style="font-size:13px;color:#666;">Kopiere den folgenden Text und sende ihn an den Kunden, nachdem die Rechnung erstellt wurde:</p>
          <div style="background:white;padding:12px;border-radius:4px;border:1px solid #ddd;font-family:monospace;font-size:13px;white-space:pre-wrap;">${escapeHtml(customerEmailTemplate)}</div>
          <p style="margin-bottom:0;margin-top:8px;">
            <a href="mailto:${safeMail}?subject=${encodeURIComponent(`Ihr Zugangscode für den KI-Kompass ${planName}`)}&body=${encodeURIComponent(customerEmailTemplate)}" style="display:inline-block;background:#2563eb;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-family:Arial,sans-serif;">
              E-Mail an Kunden öffnen
            </a>
          </p>
        </div>

        <h3 style="margin-top:24px;">Nächste Schritte:</h3>
        <ol>
          <li>📎 Rechnung im Anhang öffnen → Rechnungsnummer ergänzen → als PDF speichern (Strg+P)</li>
          <li>Rechnung an <a href="mailto:${safeMail}">${safeMail}</a> senden</li>
          <li>Vorbereitete E-Mail mit Zugangscode an den Kunden senden (Code ist bereits aktiv!)</li>
        </ol>
      `,
      attachments: [
        {
          filename: `Rechnung_frimalo_${safeCompany.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, '_')}_${datum.replace(/\./g, '-')}.html`,
          content: invoiceHtml,
          contentType: 'text/html',
        },
      ],
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
                Sie erhalten in K&uuml;rze eine Rechnung &uuml;ber <strong>${(parseFloat(planPrice) * 1.19).toFixed(2)} &euro;</strong> (inkl. 19% USt) per E-Mail.
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
                <li>Sie starten das Premium Assessment (30 Detailfragen)</li>
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
