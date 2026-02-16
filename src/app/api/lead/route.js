import { NextResponse } from 'next/server'
import { sendNotificationToOwner } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { saveFreeAssessmentResult, saveDetailedAnswers } from '../../../lib/google-sheets'
import { freeQuestions } from '../../../data/questions'

const limiter = rateLimit({ maxRequests: 5, windowMs: 60 * 1000 })

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    }

    const { email, company, score, level, answers, categoryScores } = await request.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }

    const safeMail = email.slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (company || 'Nicht angegeben').slice(0, 200).replace(/[<>\r\n]/g, '')

    // Google Sheets: Nur Erstumfrage-Ergebnis speichern (NICHT in Kundendaten!)
    saveFreeAssessmentResult({ email: safeMail, company: safeCompany, score, level }).catch(() => {})

    // Google Sheets: Detaillierte Einzelantworten speichern
    if (answers && Array.isArray(answers) && answers.length > 0) {
      saveDetailedAnswers({
        sheetId: process.env.GOOGLE_SHEET_FREE_RESULTS,
        checkType: 'Schnell-Check (kostenlos)',
        company: safeCompany,
        name: '–',
        email: safeMail,
        answers,
        questions: freeQuestions,
      }).catch(() => {})
    }

    // Kategorie-Tabelle für E-Mail
    const categoryRows = (categoryScores || [])
      .map(
        (cat) =>
          `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(cat.label)}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:bold;color:${cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444'}">${cat.percentage}%</td>
          </tr>`
      )
      .join('')

    // Einzelantworten-Tabelle für E-Mail
    const answersTable = (answers && Array.isArray(answers) && answers.length > 0)
      ? answers.map((answer) => {
          const question = freeQuestions.find((q) => q.id === answer.questionId)
          return `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:30%;">${question ? escapeHtml(question.categoryLabel) : '–'}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:13px;">${question ? escapeHtml(question.question) : '–'}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;">${escapeHtml(answer.text || '–')}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:bold;color:${answer.score >= 3 ? '#22c55e' : answer.score >= 2 ? '#f59e0b' : '#ef4444'}">${answer.score}/4</td>
          </tr>`
        }).join('')
      : ''

    await sendNotificationToOwner({
      subject: `Neuer KI-Kompass Lead: ${safeCompany} – ${typeof score === 'number' ? score : '?'}%`,
      html: `
        <h2>Neuer Lead über den KI-Kompass</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">${safeMail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">KI-Score</td><td style="padding:8px;border:1px solid #ddd;">${typeof score === 'number' ? score : '–'}%</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Level</td><td style="padding:8px;border:1px solid #ddd;">${typeof level === 'number' ? level : '–'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Datum</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString('de-DE')}</td></tr>
        </table>

        ${categoryRows ? `
        <h3 style="margin-top:24px;">Ergebnisse nach Bereichen</h3>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <thead><tr style="background:#f3f4f6;"><th style="padding:6px 10px;text-align:left;">Bereich</th><th style="padding:6px 10px;text-align:center;">Score</th></tr></thead>
          <tbody>${categoryRows}</tbody>
        </table>
        ` : ''}

        ${answersTable ? `
        <h3 style="margin-top:24px;">Alle Einzelantworten (12 Fragen)</h3>
        <table style="border-collapse:collapse;width:100%;font-size:13px;">
          <thead><tr style="background:#f3f4f6;">
            <th style="padding:6px 10px;text-align:left;">Bereich</th>
            <th style="padding:6px 10px;text-align:left;">Frage</th>
            <th style="padding:6px 10px;text-align:left;">Antwort</th>
            <th style="padding:6px 10px;text-align:center;">Score</th>
          </tr></thead>
          <tbody>${answersTable}</tbody>
        </table>
        ` : ''}

        <p style="margin-top:16px;color:#666;">Du kannst direkt auf diese E-Mail antworten, um den Lead zu kontaktieren.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
