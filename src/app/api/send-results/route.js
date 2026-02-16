import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { savePremiumAssessmentResult, findAccessCode, saveDetailedAnswers } from '../../../lib/google-sheets'
import { premiumQuestions } from '../../../data/questions'

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

    const { percentage, level, levelTitle, categoryScores, quickWins, recommendations, answers } = results || {}

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

    // Google Sheets: Detaillierte Einzelantworten speichern
    if (answers && Array.isArray(answers) && answers.length > 0) {
      saveDetailedAnswers({
        sheetId: process.env.GOOGLE_SHEET_PREMIUM_RESULTS,
        checkType: 'Premium Assessment',
        company: safeCompany,
        name: safeName,
        email: safeEmail,
        answers,
        questions: premiumQuestions,
      }).catch(() => {})
    }

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

    // Einzelantworten-Tabelle für Steffen-E-Mail
    const answersTableHtml = (answers && Array.isArray(answers) && answers.length > 0)
      ? answers.map((answer) => {
          const question = premiumQuestions.find((q) => q.id === answer.questionId)
          const safeQ = question ? question.question.replace(/[<>]/g, '') : '–'
          const safeCat = question ? question.categoryLabel.replace(/[<>]/g, '') : '–'
          const safeAns = (answer.text || '–').replace(/[<>]/g, '')
          return `<tr>
            <td style="padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280;">${safeCat}</td>
            <td style="padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;">${safeQ}</td>
            <td style="padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;">${safeAns}</td>
            <td style="padding:5px 8px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:bold;color:${answer.score >= 3 ? '#22c55e' : answer.score >= 2 ? '#f59e0b' : '#ef4444'}">${answer.score}/4</td>
          </tr>`
        }).join('')
      : ''

    const datum = new Date().toLocaleDateString('de-DE')

    // Branche-Antworten (601-605) für Zusammenfassung extrahieren
    const brancheQuestionIds = [601, 602, 603, 604, 605]
    const brancheAnswers = brancheQuestionIds.map((qId) => {
      const answer = (answers || []).find((a) => a.questionId === qId)
      const question = premiumQuestions.find((q) => q.id === qId)
      return {
        id: qId,
        question: question ? question.question : '–',
        answer: answer ? (answer.text || '–') : '–',
        score: answer ? answer.score : 0,
      }
    })

    const brancheSummaryHtml = brancheAnswers.length > 0 ? `
      <div style="margin-top:24px;padding:20px;background:#f0fdf4;border:2px solid #86efac;border-radius:8px;">
        <h3 style="margin-top:0;color:#065f46;">Kundenprofil: Branche & Situation (Fragen 601-605)</h3>
        <p style="color:#064e3b;font-size:13px;margin-bottom:12px;">Diese Antworten geben dir einen schnellen Überblick über die Branche, Größe und aktuelle Herausforderungen des Kunden:</p>
        <table style="border-collapse:collapse;width:100%;font-size:13px;">
          ${brancheAnswers.map((ba) => `
            <tr>
              <td style="padding:6px 8px;border-bottom:1px solid #bbf7d0;color:#6b7280;width:40%;">${ba.question.replace(/[<>]/g, '')}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #bbf7d0;font-weight:bold;">${ba.answer.replace(/[<>]/g, '')}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:12px;padding:12px;background:#ecfdf5;border-radius:6px;">
          <p style="margin:0 0 8px;font-weight:bold;color:#065f46;">Empfehlung für den Report:</p>
          <p style="margin:0;color:#064e3b;font-size:13px;">
            <strong>Branche:</strong> ${brancheAnswers[0].answer.replace(/[<>]/g, '')} |
            <strong>Größe:</strong> ${brancheAnswers[1].answer.replace(/[<>]/g, '')} |
            <strong>Fachkräftemangel:</strong> ${brancheAnswers[2].answer.replace(/[<>]/g, '')}
          </p>
          <p style="margin:8px 0 0;color:#064e3b;font-size:13px;">
            <strong>Externe Partner:</strong> ${brancheAnswers[3].answer.replace(/[<>]/g, '')} |
            <strong>Digitalisierungsdruck:</strong> ${brancheAnswers[4].answer.replace(/[<>]/g, '')}
          </p>
          <p style="margin:12px 0 0;color:#065f46;font-size:13px;font-style:italic;">
            ➡️ Bitte nutze diese Informationen, um den PDF-Report mit branchenspezifischen Use-Cases, passenden Fördermitteln und individuellen Handlungsempfehlungen anzureichern.
          </p>
        </div>
      </div>
    ` : ''

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

          ${answersTableHtml ? `
          <h3 style="color:#1f2937;margin-top:24px;">Ihre Antworten im &Uuml;berblick</h3>
          <table style="border-collapse:collapse;width:100%;font-size:12px;margin-bottom:24px;">
            <thead><tr style="background:#f3f4f6;">
              <th style="padding:5px 8px;text-align:left;">Bereich</th>
              <th style="padding:5px 8px;text-align:left;">Frage</th>
              <th style="padding:5px 8px;text-align:left;">Ihre Antwort</th>
              <th style="padding:5px 8px;text-align:center;">Score</th>
            </tr></thead>
            <tbody>${answersTableHtml}</tbody>
          </table>
          ` : ''}

          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin-top:24px;">
            <p style="margin:0 0 12px;font-weight:bold;font-size:16px;">Wie geht es weiter?</p>
            <p style="margin:0 0 12px;color:#1f2937;">Auf Basis Ihrer Antworten erstellen wir Ihnen jetzt Ihren <strong>ausf&uuml;hrlichen PDF-Report (20+ Seiten)</strong> mit:</p>
            <ul style="margin:0 0 12px;padding-left:20px;color:#1f2937;">
              <li style="margin-bottom:6px;"><strong>Individuelle KI-Roadmap</strong> &ndash; Ihr Fahrplan f&uuml;r die n&auml;chsten 6 Monate</li>
              <li style="margin-bottom:6px;"><strong>Use-Case-Empfehlungen f&uuml;r Ihre Branche</strong> &ndash; konkrete Anwendungsf&auml;lle, die zu Ihrem Unternehmen passen</li>
              <li style="margin-bottom:6px;"><strong>F&ouml;rdermittel-&Uuml;bersicht</strong> &ndash; relevante Programme zur Finanzierung Ihrer KI-Projekte</li>
              <li style="margin-bottom:6px;"><strong>Tool-Empfehlungen pro Bereich</strong> &ndash; passende KI-Tools f&uuml;r Ihre spezifischen Anforderungen</li>
            </ul>
            <p style="margin:0;color:#6b7280;font-size:14px;">Sie erhalten Ihren Report zeitnah per E-Mail.</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-top:16px;">
            <p style="margin:0 0 8px;font-weight:bold;color:#92400e;">Sie m&ouml;chten noch mehr?</p>
            <p style="margin:0;color:#78350f;font-size:14px;">Mit unserem <strong>Strategie-Paket</strong> erhalten Sie zus&auml;tzlich ein 60-min&uuml;tiges pers&ouml;nliches Strategiegespr&auml;ch, eine individuelle KI-Strategie, F&ouml;rdermittelberatung und 30 Tage E-Mail-Support. <a href="https://ki-kompass-rust.vercel.app/anfrage?plan=strategie" style="color:#2563eb;font-weight:bold;">Jetzt Strategie-Paket entdecken &rarr;</a></p>
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

          ${answersTableHtml ? `
          <h3 style="margin-top:24px;">Alle Einzelantworten (${answers.length} Fragen)</h3>
          <table style="border-collapse:collapse;width:100%;font-size:12px;">
            <thead><tr style="background:#f3f4f6;">
              <th style="padding:5px 8px;text-align:left;">Bereich</th>
              <th style="padding:5px 8px;text-align:left;">Frage</th>
              <th style="padding:5px 8px;text-align:left;">Antwort</th>
              <th style="padding:5px 8px;text-align:center;">Score</th>
            </tr></thead>
            <tbody>${answersTableHtml}</tbody>
          </table>
          <p style="font-size:12px;color:#9ca3af;margin-top:8px;">Die Einzelantworten wurden auch in Google Sheets gespeichert (Tab "Einzelantworten").</p>
          ` : ''}

          ${brancheSummaryHtml}
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
