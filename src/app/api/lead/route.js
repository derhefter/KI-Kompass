import { NextResponse } from 'next/server'
import { sendNotificationToOwner } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { saveFreeAssessmentResult } from '../../../lib/google-sheets'

const limiter = rateLimit({ maxRequests: 5, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    }

    const { email, company, score, level } = await request.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }

    const safeMail = email.slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (company || 'Nicht angegeben').slice(0, 200).replace(/[<>\r\n]/g, '')

    // Google Sheets: Nur Erstumfrage-Ergebnis speichern (NICHT in Kundendaten!)
    // Kundendaten-Eintrag erfolgt erst bei tatsächlicher Kaufanfrage (PayPal/Rechnung)
    saveFreeAssessmentResult({ email: safeMail, company: safeCompany, score, level }).catch(() => {})

    await sendNotificationToOwner({
      subject: `Neuer KI-Kompass Lead: ${safeCompany}`,
      html: `
        <h2>Neuer Lead über den KI-Kompass</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">${safeMail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">KI-Score</td><td style="padding:8px;border:1px solid #ddd;">${typeof score === 'number' ? score : '–'}%</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Level</td><td style="padding:8px;border:1px solid #ddd;">${typeof level === 'number' ? level : '–'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Datum</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString('de-DE')}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666;">Du kannst direkt auf diese E-Mail antworten, um den Lead zu kontaktieren.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
