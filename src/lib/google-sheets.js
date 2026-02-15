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
    console.log(`Google Sheets: Daten erfolgreich gespeichert in ${range}`)
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
        console.log(`Google Sheets: Daten gespeichert in Fallback-Tab ${fallbackRange}`)
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
