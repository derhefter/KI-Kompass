import { google } from 'googleapis'

// ============================================================
// GOOGLE SHEETS INTEGRATION
// ============================================================
//
// Speichert Daten automatisch in Google Sheets:
// 1. Erstumfrage-Ergebnisse (12 Fragen) → GOOGLE_SHEET_FREE_RESULTS
// 2. Premium-Ergebnisse (35 Fragen)     → GOOGLE_SHEET_PREMIUM_RESULTS
// 3. Kundendaten-Übersicht              → GOOGLE_SHEET_CUSTOMERS
//
// WICHTIG: In .env.local nur die Sheet-ID eintragen (nicht die volle URL)!
// Die ID findest du in der URL: docs.google.com/spreadsheets/d/HIER_IST_DIE_ID/edit
//
// WICHTIG: Die Tabs in den Google Sheets müssen so heißen:
//   - Erstumfrage-Sheet: Tab "Ergebnisse"
//   - Premium-Sheet: Tab "Ergebnisse"
//   - Kunden-Sheet: Tab "Kunden"
// Falls du die Tabs anders benennst, wird automatisch "Tabellenblatt1" versucht.
//
// ============================================================

let authClient = null

function isConfigured() {
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_KEY && process.env.GOOGLE_SERVICE_ACCOUNT_KEY.trim().startsWith('{'))
}

function extractSheetId(value) {
  if (!value) return null
  // Falls versehentlich eine volle URL eingetragen wurde, die ID extrahieren
  const urlMatch = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (urlMatch) return urlMatch[1]
  // Ansonsten ist es bereits die reine ID
  return value.trim()
}

async function getAuth() {
  if (authClient) return authClient

  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    console.warn('Google Sheets: GOOGLE_SERVICE_ACCOUNT_KEY nicht konfiguriert – Daten werden nicht gespeichert.')
    return null
  }

  try {
    const parsed = JSON.parse(credentials)
    if (!parsed.client_email || !parsed.private_key) {
      console.error('Google Sheets: Service Account Key unvollständig (client_email oder private_key fehlt)')
      return null
    }
    const auth = new google.auth.GoogleAuth({
      credentials: parsed,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    authClient = await auth.getClient()
    return authClient
  } catch (err) {
    console.error('Google Sheets Auth-Fehler:', err.message)
    return null
  }
}

async function appendToSheet(spreadsheetId, range, values) {
  // Sheet-ID extrahieren (falls versehentlich eine URL eingetragen wurde)
  const cleanId = extractSheetId(spreadsheetId)
  if (!cleanId) {
    console.warn('Google Sheets: Keine Sheet-ID konfiguriert')
    return false
  }

  if (!isConfigured()) {
    console.warn('Google Sheets: Service Account nicht konfiguriert – Daten werden nur per E-Mail gesendet.')
    return false
  }

  const auth = await getAuth()
  if (!auth) return false

  const sheets = google.sheets({ version: 'v4', auth })

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: cleanId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    })
    return true
  } catch (err) {
    // Falls der Tab-Name nicht existiert, versuche "Tabellenblatt1" (Standard-Tab in deutschen Google Sheets)
    if (err.message && err.message.includes('Unable to parse range')) {
      const fallbackRange = range.replace(/^[^!]+!/, 'Tabellenblatt1!')
      console.warn(`Google Sheets: Tab "${range.split('!')[0]}" nicht gefunden, versuche "${fallbackRange}"`)
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: cleanId,
          range: fallbackRange,
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: { values },
        })
        return true
      } catch (fallbackErr) {
        console.error('Google Sheets Schreibfehler (auch Fallback fehlgeschlagen):', fallbackErr.message)
        return false
      }
    }
    console.error('Google Sheets Schreibfehler:', err.message)
    return false
  }
}

// ============================================================
// ZUGANGSCODES – Speichern und Lesen (dynamische Kundenverwaltung)
// ============================================================
// Codes werden im Kundendaten-Sheet im Tab "Zugangscodes" gespeichert.
// Spalten: Code | Name | E-Mail | Firma | Plan | Erstellt | Ablaufdatum | Status
// ============================================================

export async function saveAccessCode({ code, name, email, company, plan, expiresAt, createdAt }) {
  const sheetId = process.env.GOOGLE_SHEET_CUSTOMERS
  return appendToSheet(sheetId, 'Zugangscodes!A:H', [
    [
      code,
      name || '–',
      email || '–',
      company || '–',
      plan || 'premium',
      createdAt || new Date().toISOString(),
      expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      'aktiv',
    ],
  ])
}

async function readFromSheet(spreadsheetId, range) {
  const cleanId = extractSheetId(spreadsheetId)
  if (!cleanId) return null

  if (!isConfigured()) return null

  const auth = await getAuth()
  if (!auth) return null

  const sheets = google.sheets({ version: 'v4', auth })

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: cleanId,
      range,
    })
    return res.data.values || []
  } catch (err) {
    // Fallback auf "Tabellenblatt1" falls Tab nicht existiert
    if (err.message && err.message.includes('Unable to parse range')) {
      const fallbackRange = range.replace(/^[^!]+!/, 'Tabellenblatt1!')
      try {
        const res = await sheets.spreadsheets.values.get({
          spreadsheetId: cleanId,
          range: fallbackRange,
        })
        return res.data.values || []
      } catch {
        return null
      }
    }
    console.error('Google Sheets Lesefehler:', err.message)
    return null
  }
}

export async function findAccessCode(code) {
  if (!code) return null

  const sheetId = process.env.GOOGLE_SHEET_CUSTOMERS
  const rows = await readFromSheet(sheetId, 'Zugangscodes!A:H')
  if (!rows) return null

  // Spalten: 0=Code, 1=Name, 2=E-Mail, 3=Firma, 4=Plan, 5=Erstellt, 6=Ablaufdatum, 7=Status
  const trimmedCode = code.trim()
  for (const row of rows) {
    if (row[0] && row[0].trim() === trimmedCode) {
      return {
        code: row[0],
        name: row[1] || '',
        email: row[2] || '',
        company: row[3] || '',
        plan: row[4] || 'premium',
        createdAt: row[5] || '',
        expiresAt: row[6] || '',
        status: row[7] || 'aktiv',
      }
    }
  }
  return null
}

// ============================================================
// DETAILLIERTE EINZELANTWORTEN speichern (für beide Checks)
// ============================================================
// Speichert jede einzelne Antwort in einem eigenen Tab "Einzelantworten"
// im jeweiligen Sheet (Free oder Premium).
// Spalten: Datum | Firma | Name | E-Mail | Check-Art | Frage-Nr | Kategorie | Frage | Antwort | Score
// ============================================================

export async function saveDetailedAnswers({
  sheetId,
  checkType,
  company,
  name,
  email,
  answers,
  questions,
}) {
  if (!answers || !answers.length || !questions || !questions.length) return false

  const datum = new Date().toLocaleString('de-DE')
  const safeName = name || '–'
  const safeCompany = company || '–'
  const safeEmail = email || '–'

  // Jede Antwort als eigene Zeile
  const rows = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId)
    return [
      datum,
      safeCompany,
      safeName,
      safeEmail,
      checkType, // 'Schnell-Check (kostenlos)' oder 'Premium Assessment'
      answer.questionId,
      question ? question.categoryLabel : '–',
      question ? question.question : '–',
      answer.text || '–',
      typeof answer.score === 'number' ? answer.score : '–',
    ]
  })

  return appendToSheet(sheetId, 'Einzelantworten!A:J', rows)
}

// ============================================================
// 1. Erstumfrage-Ergebnisse (12 Fragen) speichern
// ============================================================
export async function saveFreeAssessmentResult({ email, company, score, level }) {
  const sheetId = process.env.GOOGLE_SHEET_FREE_RESULTS
  const datum = new Date().toLocaleString('de-DE')

  return appendToSheet(sheetId, 'Ergebnisse!A:F', [
    [
      datum,
      company || '–',
      email || '–',
      typeof score === 'number' ? score : '–',
      typeof level === 'number' ? level : '–',
      typeof level === 'number'
        ? level === 1
          ? 'KI-Einsteiger'
          : level === 2
            ? 'KI-Erkunder'
            : level === 3
              ? 'KI-Anwender'
              : 'KI-Vorreiter'
        : '–',
    ],
  ])
}

// ============================================================
// 2. Premium-Ergebnisse (35 Fragen) speichern
// ============================================================
export async function savePremiumAssessmentResult({
  companyName,
  contactName,
  contactEmail,
  plan,
  percentage,
  level,
  levelTitle,
  categoryScores,
}) {
  const sheetId = process.env.GOOGLE_SHEET_PREMIUM_RESULTS
  const datum = new Date().toLocaleString('de-DE')

  // Kategorie-Scores als einzelne Spalten
  const catValues = (categoryScores || []).map((c) => `${c.label}: ${c.percentage}%`)

  return appendToSheet(sheetId, 'Ergebnisse!A:K', [
    [
      datum,
      companyName || '–',
      contactName || '–',
      contactEmail || '–',
      plan || '–',
      typeof percentage === 'number' ? percentage : '–',
      typeof level === 'number' ? level : '–',
      levelTitle || '–',
      catValues[0] || '–',
      catValues[1] || '–',
      catValues[2] || '–',
      catValues[3] || '–',
      catValues[4] || '–',
      catValues[5] || '–',
    ],
  ])
}

// ============================================================
// 3. Kundendaten speichern (bei jeder Kaufanfrage/Rechnungsanfrage)
// ============================================================
export async function saveCustomerData({
  name,
  email,
  company,
  phone,
  plan,
  paymentMethod,
  amount,
}) {
  const sheetId = process.env.GOOGLE_SHEET_CUSTOMERS
  const datum = new Date().toLocaleString('de-DE')

  // Sortierkriterium: Firma, wenn vorhanden, sonst Name
  const sortKey = (company && company !== '–') ? company : name

  return appendToSheet(sheetId, 'Kunden!A:H', [
    [
      datum,
      sortKey || '–',
      name || '–',
      email || '–',
      company || '–',
      phone || '–',
      plan || '–',
      paymentMethod || '–',
      amount || '–',
    ],
  ])
}
