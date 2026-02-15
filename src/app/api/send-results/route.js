import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { savePremiumAssessmentResult, findAccessCode } from '../../../lib/google-sheets'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Versuche.' }, { status: 429 })
    }

    const { code, companyName, contactName, contactEmail, results } = await request.json()

    // Code erneut verifizieren
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    // Zuerst in customers.js suchen, dann in Google Sheets
    let customer = customers.find((c) => c.code === code.trim())
    if (!customer) {
      try {
        const sheetCustomer = await findAccessCode(code.trim())
        if (sheetCustomer && sheetCustomer.status !== 'deaktiviert') {
          customer = sheetCustomer
        }
      } catch {
        // Weiter ohne Sheets
      }
    }
    if (!customer) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    const safeName = (contactName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (companyName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeEmail = (contactEmail || '').slice(0, 200).replace(/[<>\r\n]/g, '')

    const { percentage, level, levelTitle, categoryScores, quickWins, recommendations } = results || {}

    // Google Sheets: Premium-Ergebnisse speichern
    savePremiumAssessmentResult({
      companyName: safeCompany,
      contactName: safeName,
      contactEmail: safeEmail,
      plan: customer.plan,
      percentage,
      level,
      levelTitle,
      categoryScores,
    }).catch(() => {})

    // Kategorie-Tabelle erstellen
    const categoryRows = (categoryScores || [])
      .map(
        (cat) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${cat.label}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:bold;color:${cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444'}">${cat.percentage}%</td>
          </tr>`
      )
      .join('')

    // Quick-Wins Liste
    const quickWinsList = (quickWins || [])
      .map((qw) => `<li style="margin-bottom:8px;"><strong>${qw.title}</strong> (${qw.effort})<br/><span style="color:#6b7280;">${qw.desc}</span></li>`)
      .join('')

    // Empfehlungen Liste
    const recommendationsList = (recommendations || [])
      .map((rec) => `<li style="margin-bottom:12px;"><strong>[${rec.priority.toUpperCase()}] ${rec.title}</strong> (${rec.category})<br/><ul>${rec.actions.map((a) => `<li style="color:#6b7280;">${a}</li>`).join('')}</ul></li>`)
      .join('')

    const datum = new Date().toLocaleDateString('de-DE')

    // E-Mail an den Kunden
    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;">Ihr KI-Readiness Report</h1>
          <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">${safeCompany} &bull; ${datum}</p>
        </div>
        <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;">
          <p>Hallo ${safeName},</p>
          <p>vielen Dank f&uuml;r die Durchf&uuml;hrung des Premium KI-Readiness Assessments. Hier ist Ihre Zusammenfassung:</p>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
            <div style="font-size:48px;font-weight:bold;color:#2563eb;">${percentage}%</div>
            <div style="font-size:18px;font-weight:bold;color:#1f2937;">Level ${level}: ${levelTitle}</div>
          </div>

          <h3 style="color:#1f2937;">Ergebnisse nach Bereichen</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead><tr style="background:#f3f4f6;"><th style="padding:8px 12px;text-align:left;">Bereich</th><th style="padding:8px 12px;text-align:center;">Score</th></tr></thead>
            <tbody>${categoryRows}</tbody>
          </table>

          ${quickWinsList ? `<h3 style="color:#1f2937;">Ihre Quick-Wins</h3><ul>${quickWinsList}</ul>` : ''}

          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin-top:24px;">
            <p style="margin:0 0 8px;font-weight:bold;">N&auml;chster Schritt?</p>
            <p style="margin:0;color:#6b7280;">Besprechen Sie Ihren Report in einem pers&ouml;nlichen Strategiegespr&auml;ch mit Steffen Hefter und entwickeln Sie Ihre individuelle KI-Strategie.</p>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:14px;">Bei Fragen antworten Sie einfach auf diese E-Mail.</p>
        </div>
        <div style="text-align:center;padding:16px;color:#9ca3af;font-size:12px;">
          KI-Kompass &bull; frimalo &bull; Steffen Hefter
        </div>
      </div>
    `

    // E-Mail an Steffen (ausführlicher)
    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
        <div style="background:#1e40af;padding:24px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">Neues Premium Assessment abgeschlossen</h1>
        </div>
        <div style="background:white;padding:24px;border:1px solid #e5e7eb;border-top:none;">
          <table style="width:100%;margin-bottom:20px;">
            <tr><td style="padding:4px 0;color:#6b7280;">Firma:</td><td style="padding:4px 0;font-weight:bold;">${safeCompany}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Name:</td><td style="padding:4px 0;">${safeName}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">E-Mail:</td><td style="padding:4px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Plan:</td><td style="padding:4px 0;">${customer.plan}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Datum:</td><td style="padding:4px 0;">${datum}</td></tr>
          </table>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:16px;text-align:center;margin-bottom:20px;">
            <div style="font-size:36px;font-weight:bold;color:#2563eb;">${percentage}%</div>
            <div style="font-weight:bold;">Level ${level}: ${levelTitle}</div>
          </div>

          <h3>Detailergebnisse</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <thead><tr style="background:#f3f4f6;"><th style="padding:8px 12px;text-align:left;">Bereich</th><th style="padding:8px 12px;text-align:center;">Score</th></tr></thead>
            <tbody>${categoryRows}</tbody>
          </table>

          ${recommendationsList ? `<h3>Empfehlungen</h3><ul>${recommendationsList}</ul>` : ''}
          ${quickWinsList ? `<h3>Quick-Wins</h3><ul>${quickWinsList}</ul>` : ''}
        </div>
      </div>
    `

    // Beide E-Mails senden
    const [customerSent, ownerSent] = await Promise.all([
      sendConfirmationToCustomer({
        to: safeEmail,
        subject: `Ihr KI-Readiness Report – ${safeCompany} (${percentage}%)`,
        html: customerHtml,
      }),
      sendNotificationToOwner({
        subject: `Premium Assessment: ${safeCompany} – ${percentage}% (Level ${level})`,
        html: ownerHtml,
      }),
    ])

    return NextResponse.json({
      success: true,
      customerSent,
      ownerSent,
    })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
