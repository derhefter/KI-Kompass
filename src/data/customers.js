// ============================================================
// KUNDENZUGÄNGE FÜR DAS PREMIUM ASSESSMENT
// ============================================================
//
// So fügst du einen neuen Kunden hinzu:
// 1. Erstelle einen neuen Eintrag im Array unten
// 2. Wähle ein sicheres Passwort (code) - z.B. Firmenname + Zahlen
// 3. Sende dem Kunden den Link: https://DEINE-DOMAIN.de/premium?code=DAS_PASSWORT
// 4. Speichere die Datei und deploye neu (npm run build)
//
// Beispiel-Link für den Demo-Kunden:
// http://localhost:3000/premium?code=DEMO2026
//
// ============================================================

export const customers = [
  // --- DEMO-ZUGANG (kann gelöscht werden) ---
  {
    code: 'DEMO2026',            // Passwort im Link
    name: 'Max Mustermann',      // Kundenname
    email: 'max@example.com',    // E-Mail für Ergebnis-Versand
    company: 'Muster GmbH',     // Firmenname
    plan: 'premium',             // 'premium' oder 'strategie'
  },

  // --- ECHTE KUNDEN HIER EINTRAGEN ---
  // {
  //   code: 'FIRMA2026',
  //   name: 'Anna Schmidt',
  //   email: 'anna@firma.de',
  //   company: 'Firma XY GmbH',
  //   plan: 'strategie',
  // },
]
