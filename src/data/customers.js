// ============================================================
// KUNDENZUGÄNGE FÜR DAS PREMIUM ASSESSMENT
// ============================================================
//
// So fügst du einen neuen Kunden hinzu:
// 1. Erstelle einen neuen Eintrag im Array unten
// 2. Wähle ein sicheres Passwort (code) - z.B. Firmenname + Zahlen
// 3. Setze ein Ablaufdatum (expiresAt) - Standard: 7 Tage ab Erstellung
// 4. Sende dem Kunden den Link: https://DEINE-DOMAIN.de/premium?code=DAS_PASSWORT
// 5. Speichere die Datei und deploye neu (npm run build)
//
// Ablaufdatum berechnen:
// new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
// → ergibt z.B. '2026-02-22T12:00:00.000Z' (7 Tage ab jetzt)
//
// Beispiel-Link für den Demo-Kunden:
// http://localhost:3000/premium?code=DEMO2026
//
// ============================================================

export const customers = [
  // --- DEMO-ZUGANG (kann gelöscht werden) ---
  {
    code: 'DEMO2026',                               // Passwort im Link
    name: 'Max Mustermann',                          // Kundenname
    email: 'max@example.com',                        // E-Mail für Ergebnis-Versand
    company: 'Muster GmbH',                          // Firmenname
    plan: 'premium',                                 // 'premium' oder 'strategie'
    expiresAt: '2099-12-31T23:59:59.000Z',           // Demo läuft nicht ab
    createdAt: '2026-02-15T00:00:00.000Z',           // Erstellungsdatum
  },

  // --- ECHTE KUNDEN HIER EINTRAGEN ---
  // {
  //   code: 'FIRMA-A3F2B1',
  //   name: 'Anna Schmidt',
  //   email: 'anna@firma.de',
  //   company: 'Firma XY GmbH',
  //   plan: 'strategie',
  //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  //   createdAt: new Date().toISOString(),
  // },
]
