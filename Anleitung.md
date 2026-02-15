# KI-Kompass - Komplette Einrichtungs- und Bearbeitungsanleitung

## Was ist der KI-Kompass?

Der KI-Kompass ist ein webbasiertes KI-Readiness Assessment Tool für KMU. Es basiert auf deiner bewährten 3-Phasen-Methodik (AI Awareness → AI Readiness → AI Steadiness) und dem 4-Level-Implementierungsmodell.

### Einnahmemodell
- **Kostenloser Schnell-Check** (12 Fragen) → Lead-Generierung, E-Mail an dich
- **Premium Report** (€197) → Anfrage per Formular → E-Mail an dich → Rechnung senden
- **Strategie-Paket** (€497) → Anfrage + Terminbuchung via Google Kalender
- **Ziel:** ~10 Premium Reports/Monat = ~€2.000/Monat

### Ablauf bei einer Kaufanfrage
1. Kunde füllt Anfrageformular aus (Name, E-Mail, Firma)
2. Du bekommst eine E-Mail in dein Gmail-Postfach mit allen Details
3. Der Kunde bekommt eine automatische Bestätigungsmail mit PayPal-Link
4. Kunde zahlt per PayPal (oder du sendest eine Rechnung)
5. Du trägst den Kunden in `src/data/customers.js` ein und sendest ihm den Zugangslink

---

## Inhalte bearbeiten – Welche Datei für was?

### Preise ändern
**WICHTIG: Preise stehen an 4 Stellen und müssen überall gleichzeitig geändert werden!**

| Stelle | Datei | Zeile/Ort |
|--------|-------|-----------|
| Plandaten (Hauptquelle) | `src/app/anfrage/page.js` | Zeile 10: `price: '197'` und Zeile 23: `price: '497'` |
| Startseite Pricing | `src/app/page.js` | Suche nach `€197` und `€497` in der Pricing-Section |
| Upsell nach Schnell-Check | `src/app/assessment/page.js` | Suche nach `€197` und `€497` |
| E-Mail-Texte | `src/app/api/purchase-request/route.js` | Zeile 32-33: `planName` und `planPrice` |

### Startseite (Landing Page)
**Datei:** `src/app/page.js`
- Hero-Text und Untertitel (ganz oben)
- Problem-Section (3 Karten: "KI-Projekte scheitern...")
- Vorteile-Section (4 Karten mit Icons)
- Ablauf "So funktioniert's" (3 Schritte)
- Preise (Kostenlos / Premium / Strategie) – s. oben
- Trust-Statistiken (200+, 94%, etc.)
- FAQ-Fragen und Antworten (s. unten)
- CTA am Seitenende

### Häufige Fragen (FAQ)
**Datei:** `src/app/page.js` – FAQ-Array ab ca. Zeile 343
```javascript
// Jede Frage hat dieses Format:
{ q: 'Wie lange dauert der Check?', a: 'Der kostenlose Check dauert nur 3-5 Minuten...' }
```
- Einfach neue Objekte zum Array hinzufügen
- Bestehende Fragen/Antworten direkt im Text ändern
- Reihenfolge durch Umordnen der Objekte ändern

### Navigation (Kopfzeile)
**Datei:** `src/app/layout.js`
- Logo-Text ("KI-Kompass") – in der `<nav>`-Sektion (ca. Zeile 26)
- Menü-Links (Vorteile, Ablauf, Preise, Über mich) – `href="..."` und Linktext
- "Jetzt starten"-Button

### Fußzeile (Footer)
**Datei:** `src/app/layout.js`
- Firmenname und Beschreibungstext – in der `<footer>`-Sektion (ca. Zeile 49)
- Link-Liste (Kostenloser Check, Premium Report, etc.)
- Kontaktdaten (Adresse, E-Mail)
- Impressum/Datenschutz-Links
- Copyright-Text

### Über mich
**Datei:** `src/app/ueber-mich/page.js`
- **Profilbild:** Datei `public/Steffen2025.jpg` austauschen (gleiches Dateiformat + Name beibehalten)
- Name und Untertitel im Hero-Bereich
- Mission-Text und Kennzahlen (20+, 500+, etc.)
- "Was mich besonders macht" – 4 Karten mit Icon, Titel und Text
- Persönliches Zitat
- Beratungsansatz (3 Phasen: Awareness, Readiness, Steadiness)
- "Was mich antreibt" – 3 Textboxen
- Termin-Button (nutzt `NEXT_PUBLIC_BOOKING_URL` aus `.env.local`)

### Impressum
**Datei:** `src/app/impressum/page.js`
- Firmenname, Geschäftsführer, Adresse
- E-Mail-Adresse
- **USt-IdNr. ergänzen (vor Go-Live!)**
- Verantwortlicher nach §55 RStV
- Haftungsausschluss-Texte

### Datenschutzerklärung
**Datei:** `src/app/datenschutz/page.js`
- Verantwortlicher und Kontaktdaten
- Beschreibung der Datenverarbeitung
- Google Calendar-Hinweis (Terminbuchung)
- E-Mail-Dienstleister (Gmail)
- Hosting (Vercel)
- **Tipp:** Vor Go-Live von einem Anwalt prüfen lassen!

### Kostenloser Check (12 Fragen)
**Datei:** `src/data/questions.js` – `freeQuestions`-Array (Zeile 4-154)
```javascript
// Jede Frage hat dieses Format:
{
  id: 1,
  category: 'strategie',
  categoryLabel: 'Strategie & Vision',
  question: 'Wie gut kennen Sie die KI-Möglichkeiten...?',
  options: [
    { text: 'Gar nicht', score: 1 },
    { text: 'Etwas', score: 2 },
    { text: 'Gut', score: 3 },
    { text: 'Sehr gut', score: 4 },
  ]
}
```
- Score 1 = niedrig (schlecht), Score 4 = hoch (gut)
- 4 Antwortoptionen pro Frage

### Premium Assessment (35 Fragen)
**Datei:** `src/data/questions.js` – `premiumQuestions`-Array (Zeile 157-528)
- 7 Kategorien: Strategie, Daten, Prozesse, Kompetenzen, Governance, Branche
- Gleiche Struktur wie kostenlose Fragen
- Empfehlungen: `getRecommendations()` ab Zeile 600
- Quick-Wins: `getQuickWins()` ab Zeile 751
- Förderprogramme: `foerderprogramme`-Array ab Zeile 778

### Kundenzugänge verwalten
**Datei:** `src/data/customers.js`
```javascript
{
  code: 'FIRMA2026',           // Zugangscode (= Passwort im Link)
  name: 'Anna Schmidt',       // Kundenname
  email: 'anna@firma.de',     // E-Mail für Ergebnis-Versand
  company: 'Firma XY GmbH',   // Firmenname
  plan: 'premium',            // 'premium' oder 'strategie'
},
```
- Kundenlink: `https://DEINE-DOMAIN.de/premium?code=FIRMA2026`
- Nach dem Hinzufügen: `npm run build` und neu deployen
- Ergebnisse werden automatisch an Kunde UND an dich per E-Mail gesendet

### Bestellseite
**Datei:** `src/app/anfrage/page.js`
- Plandaten (Name, Preis, Features) ab Zeile 7
- PayPal-Link: Zeile 5 – `PAYPAL_ME` URL
- Formularfelder und Bestätigungsseite

### E-Mail-Einstellungen
**Datei:** `.env.local`
- `EMAIL_HOST`, `EMAIL_PORT` – SMTP-Server
- `EMAIL_USER` – Gmail-Adresse
- `EMAIL_PASS` – Gmail App-Passwort (16 Zeichen)
- `EMAIL_FROM` – Absendername
- `NEXT_PUBLIC_CONTACT_EMAIL` – Kontaktadresse auf der Website
- `NEXT_PUBLIC_BOOKING_URL` – Google Calendar Link

---

## Schritt 1: Node.js installieren (bereits erledigt)

Node.js v22.21.1 ist bereits installiert.

---

## Schritt 2: Gmail App-Passwort einrichten (WICHTIG!)

Damit die App E-Mails über dein Gmail-Konto senden kann:

### 2a. Bestätigung in zwei Schritten aktivieren
1. Gehe zu **https://myaccount.google.com/security**
2. Unter "Wie Sie sich in Google anmelden" → **Bestätigung in zwei Schritten** aktivieren
3. Folge den Anweisungen (Telefonnummer bestätigen etc.)

### 2b. App-Passwort erstellen
1. Gehe zu **https://myaccount.google.com/apppasswords**
2. Gib als App-Name ein: `KI-Kompass`
3. Klicke auf "Erstellen"
4. Du erhältst ein **16-stelliges Passwort** (z.B. `abcd efgh ijkl mnop`)
5. **Kopiere dieses Passwort!**

### 2c. App-Passwort eintragen
1. Öffne die Datei `.env.local` im KI-Kompass Ordner mit einem Texteditor
2. Ersetze den Wert bei `EMAIL_PASS` mit dem kopierten Passwort (ohne Leerzeichen):
```
EMAIL_PASS=abcdefghijklmnop
```

---

## Schritt 3: Google Kalender für Terminbuchung einrichten

### 3a. Terminplanung in Google Kalender aktivieren
1. Öffne **Google Kalender** (calendar.google.com)
2. Klicke auf das **+** neben "Andere Kalender" oder auf "Erstellen"
3. Wähle **Terminplanungsseite** (oder "Appointment Schedule")
4. Richte einen Termintyp ein:
   - Name: "KI-Strategie-Gespräch (60 Min.)"
   - Dauer: 60 Minuten
   - Verfügbarkeit: Deine gewünschten Zeiten
5. Speichere den Termintyp
6. Klicke auf den Termin → **Buchungsseite öffnen** → Kopiere die URL

### 3b. Buchungs-URL eintragen
1. Öffne `.env.local`
2. Ersetze die Zeile `NEXT_PUBLIC_BOOKING_URL=...` mit deinem Link:
```
NEXT_PUBLIC_BOOKING_URL=https://calendar.google.com/calendar/appointments/schedules/DEINE_ID
```

---

## Schritt 4: Lokal testen

1. **Doppelklicke** auf `setup.bat` im KI-Kompass Ordner
2. Wähle **Option 1** (Lokal starten)
3. Öffne im Browser: **http://localhost:3000**

### Was du testen solltest:
- [ ] Schnell-Check durchspielen → Ergebnis sehen
- [ ] E-Mail-Erfassung → Prüfe ob Mail in deinem Gmail ankommt
- [ ] "Premium Report anfragen" klicken → Formular ausfüllen → Mail prüfen
- [ ] Premium-Zugang testen: http://localhost:3000/premium?code=DEMO2026
- [ ] Über mich Seite prüfen
- [ ] Impressum & Datenschutz prüfen

---

## Schritt 5: Online stellen (Vercel Deployment)

### 5a. Vercel-Konto erstellen
1. Gehe zu **https://vercel.com**
2. Klicke "Sign Up" → Registriere dich mit E-Mail
3. Kostenlos für persönliche Projekte!

### 5b. Deployen
1. **Doppelklicke** auf `setup.bat`
2. Wähle **Option 2** (Auf Vercel deployen)
3. Folge den Anweisungen im Terminal

### 5c. Umgebungsvariablen in Vercel eintragen
1. Gehe zu **vercel.com** → Dein Projekt → **Settings** → **Environment Variables**
2. Trage alle Variablen aus `.env.local` ein:
   - `EMAIL_HOST` → `smtp.gmail.com`
   - `EMAIL_PORT` → `587`
   - `EMAIL_USER` → `steffenhefter@googlemail.com`
   - `EMAIL_PASS` → Dein App-Passwort
   - `EMAIL_FROM` → `KI-Kompass <steffenhefter@googlemail.com>`
   - `EMAIL_REPLY_TO` → `steffenhefter@googlemail.com`
   - `NEXT_PUBLIC_BASE_URL` → Deine Vercel-URL (z.B. `https://ki-kompass.vercel.app`)
   - `NEXT_PUBLIC_CONTACT_EMAIL` → `steffenhefter@googlemail.com`
   - `NEXT_PUBLIC_BOOKING_URL` → Dein Google Kalender Buchungslink
3. Klicke "Save"
4. Gehe zu **Deployments** → Klicke "Redeploy"

---

## So funktioniert der E-Mail-Flow

### Bei einem kostenlosen Check (Lead):
- Kunde füllt E-Mail-Feld aus → Du bekommst eine Mail:
  - Betreff: "Neuer KI-Kompass Lead: [Firma]"
  - Inhalt: E-Mail, Firma, Score, Level
  - Du kannst direkt auf die Mail antworten → geht an den Kunden

### Bei einer Kaufanfrage (Premium/Strategie):
- Kunde füllt Anfrageformular aus → Zwei Mails werden gesendet:
  1. **An dich:** "Neue Kaufanfrage: Premium Report – [Firma]" mit PayPal-Status
  2. **An den Kunden:** Bestätigung mit PayPal-Zahlungslink
- Zahlung per PayPal.me/frimalo (Betrag vorausgefüllt)
- Alternativ: Manuell Rechnung per E-Mail senden

### Nach Zahlungseingang – Kunden freischalten:
1. Öffne `src/data/customers.js`
2. Füge neuen Kunden ein (code, name, email, company, plan)
3. `npm run build` und deployen
4. Sende dem Kunden den Link: `https://DEINE-DOMAIN.de/premium?code=ZUGANGSCODE`

### Bei Abschluss des Premium Assessments:
- Ergebnisse werden automatisch per E-Mail gesendet:
  1. **An den Kunden:** Zusammenfassung mit Score, Kategorie-Ergebnissen, Quick-Wins
  2. **An dich:** Ausführliche Auswertung mit allen Details und Empfehlungen

---

## Kontaktdaten im System

- **Firma:** frimalo
- **Name:** Steffen Hefter
- **Adresse:** Wilhelm-Schrader-Str. 27a, 06120 Halle (Saale)
- **E-Mail:** steffenhefter@googlemail.com
- **PayPal:** paypal.me/frimalo
- **Terminbuchung:** Google Kalender

---

## Technische Details

### Projektstruktur
```
KI-Kompass/
├── setup.bat              ← Doppelklick zum Starten
├── ANLEITUNG.md           ← Diese Anleitung
├── .env.local             ← Deine Konfiguration (NICHT teilen!)
├── src/
│   ├── app/
│   │   ├── page.js        ← Landing Page (Startseite)
│   │   ├── layout.js      ← Navigation + Footer
│   │   ├── globals.css    ← CSS/Styles
│   │   ├── assessment/    ← Kostenloser Schnell-Check
│   │   ├── anfrage/       ← Kauf-Anfrageformular + PayPal
│   │   ├── premium/       ← Premium Assessment (passwortgeschützt)
│   │   ├── ueber-mich/    ← Über mich Seite
│   │   ├── impressum/     ← Impressum (frimalo)
│   │   ├── datenschutz/   ← Datenschutzerklärung
│   │   ├── admin/         ← Bearbeitungsguide (nur für dich)
│   │   └── api/
│   │       ├── lead/              ← Lead-Mail an dich
│   │       ├── purchase-request/  ← Kaufanfrage-Mails
│   │       ├── verify-access/     ← Kundenzugang prüfen
│   │       └── send-results/      ← Assessment-Ergebnisse per Mail
│   ├── data/
│   │   ├── questions.js   ← Alle Assessment-Fragen + Scoring
│   │   └── customers.js   ← Kundenzugänge (Codes + Daten)
│   └── lib/
│       ├── mail.js        ← Gmail-Versand
│       └── rate-limit.js  ← API-Schutz
└── public/
    └── Steffen2025.jpg    ← Profilbild
```

### Laufende Kosten
- **Vercel Hosting:** €0 (kostenloser Plan)
- **Gmail:** €0 (bestehendes Konto)
- **Google Kalender:** €0 (bestehendes Konto)
- **Domain:** ~€10-15/Jahr (optional)
- **Gesamt:** Praktisch kostenlos

---

## FAQ

**Wie schalte ich den Premium-Zugang für einen Kunden frei?**
1. Öffne `src/data/customers.js`
2. Füge einen neuen Eintrag hinzu mit: code, name, email, company, plan
3. Führe `npm run build` aus und deploye neu
4. Sende dem Kunden den Link: `/premium?code=SEIN_CODE`

**Kann ich die Fragen ändern?**
Ja! Öffne `src/data/questions.js` mit einem Texteditor. Kostenlose Fragen: `freeQuestions`-Array. Premium-Fragen: `premiumQuestions`-Array.

**Kann ich die Preise ändern?**
Ja! An diesen 4 Stellen gleichzeitig:
1. `src/app/anfrage/page.js` (Zeile 10 + 23)
2. `src/app/page.js` (Pricing-Section)
3. `src/app/assessment/page.js` (Upsell-Bereich)
4. `src/app/api/purchase-request/route.js` (Zeile 32-33)

**Wie ändere ich die "Über mich"-Seite?**
Öffne `src/app/ueber-mich/page.js`. Dort findest du die Texte, Kennzahlen, Karten und das Zitat. Das Profilbild liegt unter `public/Steffen2025.jpg`.

**Wie ändere ich die FAQ auf der Startseite?**
Öffne `src/app/page.js` und suche das FAQ-Array (ca. Zeile 343). Jede Frage ist ein Objekt: `{ q: 'Frage?', a: 'Antwort.' }`.

**Wie ändere ich Navigation und Footer?**
Öffne `src/app/layout.js`. Die Navigation beginnt bei ca. Zeile 26, der Footer bei ca. Zeile 49.

**Wie ändere ich Impressum oder Datenschutz?**
Impressum: `src/app/impressum/page.js` – Adresse, Name, USt-IdNr. etc. direkt im Text ändern.
Datenschutz: `src/app/datenschutz/page.js` – Texte direkt bearbeiten.

**Was wenn die E-Mails nicht ankommen?**
1. Prüfe ob das App-Passwort korrekt in `.env.local` steht
2. Prüfe deinen Spam-Ordner
3. Stelle sicher, dass "Bestätigung in zwei Schritten" bei Google aktiv ist

**Wo sehe ich alle bearbeitbaren Bereiche auf einen Blick?**
Öffne im Browser: `/admin` – dort ist ein visueller Guide mit allen Dateien und Bereichen.

---

## Update vom 15.02.2026 – Neue Features & Änderungen

### 1. Button "Rechnung anfordern" (NEU)

**Problem vorher:** Nach dem Absenden des Bestellformulars gab es nur den PayPal-Button und einen passiven Texthinweis "Alternativ erhalten Sie eine Rechnung per E-Mail" + "Zurück zur Startseite". Der Kunde konnte nicht aktiv eine Rechnung anfordern.

**Lösung:** Auf der Bestellbestätigungsseite (`/anfrage`) gibt es jetzt einen prominenten orangen **"Rechnung anfordern"-Button** – sowohl für den Premium Report als auch für das Strategie-Paket.

**Was passiert beim Klick:**
- **E-Mail an dich (steffenhefter@googlemail.com):**
  - Betreff: `RECHNUNG ANGEFORDERT: [Produkt] – [Firma]`
  - Enthält: Kundendaten, Rechnungsdaten (Betrag + Zahlungsziel 14 Tage)
  - **Generierter Freischaltcode** (z.B. `MUSTER-A3F2B1`)
  - **Fertiger Freischaltlink** zum Kopieren
  - **Code-Snippet** zum Eintragen in `customers.js`
  - **Vorbereitete Kunden-E-Mail** mit "E-Mail an Kunden öffnen"-Button (öffnet Mail-Client)
- **E-Mail an den Kunden:**
  - Freundliche Bestätigung
  - "Rechnung kommt per E-Mail"
  - "Freischaltung innerhalb von 12 Stunden"
  - **7-Tage-Gültigkeitshinweis** für den Zugangscode

**API-Endpunkt:** `src/app/api/invoice-request/route.js`

**Dein Workflow bei Rechnungsanforderung:**
1. Du erhältst die E-Mail mit allen vorbereiteten Daten
2. Erstelle die Rechnung über den angegebenen Betrag
3. Trage den Code in `src/data/customers.js` ein (Snippet ist in der Mail)
4. `npm run build` und deployen
5. Klicke "E-Mail an Kunden öffnen" in der Admin-Mail → Freischaltlink wird versendet

### 2. Ablaufdatum für Zugangscodes (7 Tage)

**Datei:** `src/data/customers.js`

Jeder Kundeneintrag hat jetzt zwei neue Felder:
```javascript
{
  code: 'FIRMA-A3F2B1',
  name: 'Anna Schmidt',
  email: 'anna@firma.de',
  company: 'Firma XY GmbH',
  plan: 'premium',
  expiresAt: '2026-02-22T12:00:00.000Z',   // NEU: Ablaufdatum (7 Tage)
  createdAt: '2026-02-15T12:00:00.000Z',    // NEU: Erstellungsdatum
}
```

**Ablaufdatum berechnen (7 Tage ab jetzt):**
```javascript
new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
```

**Was passiert bei abgelaufenem Code:**
- Kunde sieht: "Ihr Zugangscode ist abgelaufen. Bitte kontaktieren Sie uns: steffenhefter@googlemail.com"
- Code verlängern: `expiresAt` in `customers.js` aktualisieren + neu deployen

**In allen E-Mails:** Hinweis "Bitte lösen Sie Ihren Code innerhalb von 7 Tagen ein"

### 3. Google Sheets Integration (NEU)

Die App speichert automatisch Daten in 3 Google Sheets (optional – E-Mail-Versand funktioniert auch ohne):

| Sheet | Google Drive Ordner | Trigger |
|-------|-------------------|---------|
| Erstumfrage-Ergebnisse | [Link](https://drive.google.com/drive/folders/1wW4-u3Kx61lEH8BrIt-_XmfmSnbVRkv3) | Schnell-Check E-Mail-Erfassung |
| Premium-Ergebnisse | [Link](https://drive.google.com/drive/folders/1vaesAn_aVuS8obuKNWiJy_RGWra9gNud) | Premium Assessment abgeschlossen |
| Kundendaten | [Link](https://drive.google.com/drive/folders/1NKgGLVzQvOGguOSBrnEQq4Lq1VJE2QgI) | Kaufanfrage oder Rechnungsanforderung |

**Spalten in den Tabellen:**

- **Erstumfrage:** Datum | Firma | E-Mail | Score (%) | Level | Level-Titel
- **Premium:** Datum | Firma | Name | E-Mail | Plan | Score (%) | Level | Level-Titel | Kategorie-Scores
- **Kunden:** Datum | Sortierung (Firma/Name) | Name | E-Mail | Firma | Telefon | Produkt | Zahlungsart | Betrag

**Sortierung der Kundendaten:** Firma ist primäres Sortierkriterium. Wenn keine Firma angegeben, wird der Name verwendet.

**Einrichtung (einmalig):**
1. Google Cloud Console → Service Account erstellen + JSON-Key herunterladen
2. Google Sheets API aktivieren
3. In jedem Google Drive-Ordner ein Google Sheet erstellen mit den Spalten oben als Kopfzeile
4. Service Account E-Mail als Editor in jedes Sheet einladen
5. Sheet-IDs in `.env.local` eintragen + JSON-Key als einzeilige Zeichenkette

**Neue Umgebungsvariablen in `.env.local`:**
```env
GOOGLE_SHEET_FREE_RESULTS=SHEET_ID_HIER
GOOGLE_SHEET_PREMIUM_RESULTS=SHEET_ID_HIER
GOOGLE_SHEET_CUSTOMERS=SHEET_ID_HIER
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

**Lib-Datei:** `src/lib/google-sheets.js`

### 4. frimalo Logo eingebunden (NEU)

**Datei:** `public/frimalo logo.png`

- **Navbar:** frimalo-Logo ersetzt das alte SVG-Icon (farbig, Höhe 40px)
- **Footer:** frimalo-Logo in Weiß (invertiert, Höhe 32px)
- Referenziert in `src/app/layout.js`

### 5. Hintergrundbild auf der Startseite (NEU)

**Datei:** `public/top-view-of-road-intersection-Z6NJKXA.jpg`

- Hero-Section der Startseite hat jetzt ein Hintergrundbild (Vogelperspektive Straßenkreuzung)
- Darüber liegt ein dunkler Farbverlauf-Overlay für Lesbarkeit
- Alle Texte im Hero-Bereich sind jetzt weiß statt dunkel
- CTA-Button "Kostenlosen Check starten" ist jetzt weiß mit blauer Schrift
- "Mehr erfahren" hat einen weißen Rahmen mit Glaseffekt
- Referenziert in `src/app/page.js`

### 6. Sicherheitsverbesserungen

- **HTML-Escaping** (`escapeHtml()`) in `purchase-request/route.js` und `invoice-request/route.js`
- **Timing-Attack-Schutz** (`crypto.timingSafeEqual()`) in `verify-access/route.js`
- **Verschärftes Rate-Limiting**: Code-Eingabe auf 5 Versuche/Minute begrenzt
- **E-Mail-Längenbegrenzung** auf 254 Zeichen (RFC 5321 konform)

### 7. Neue Dependency

```bash
npm install googleapis
```

Wird für die Google Sheets Integration benötigt. Ist in `package.json` eingetragen.

### 8. Aktualisierte Projektstruktur

```
KI-Kompass/
├── public/
│   ├── frimalo logo.png                          ← NEU: frimalo Logo
│   ├── top-view-of-road-intersection-Z6NJKXA.jpg ← NEU: Hintergrundbild
│   └── Steffen2025.jpg                           ← Profilbild
├── src/
│   ├── app/
│   │   ├── page.js                ← Startseite (NEU: Hintergrundbild)
│   │   ├── layout.js              ← Navigation + Footer (NEU: Logo)
│   │   ├── anfrage/page.js        ← Bestellseite (NEU: Rechnung-Button)
│   │   ├── premium/page.js        ← Premium (NEU: Ablauf-Meldung)
│   │   └── api/
│   │       ├── invoice-request/   ← NEU: Rechnungsanforderung
│   │       ├── purchase-request/  ← Kaufanfrage (NEU: Google Sheets)
│   │       ├── verify-access/     ← Code-Prüfung (NEU: Ablaufdatum)
│   │       ├── send-results/      ← Ergebnisse (NEU: Google Sheets)
│   │       └── lead/              ← Leads (NEU: Google Sheets)
│   ├── data/
│   │   └── customers.js           ← Zugänge (NEU: expiresAt, createdAt)
│   └── lib/
│       ├── mail.js                ← E-Mail-Versand
│       ├── google-sheets.js       ← NEU: Google Sheets API
│       └── rate-limit.js          ← Rate Limiting
├── .env.local                     ← Konfiguration (NEU: Google Sheets)
└── Anleitung.md                   ← Diese Datei (aktualisiert)
```

### Preise ändern – aktualisierte Stellen

Bei Preisänderungen nun an **5 Stellen** ändern (eine mehr als vorher):

| Stelle | Datei |
|--------|-------|
| Plandaten | `src/app/anfrage/page.js` (Zeile 10 + 23) |
| Startseite Pricing | `src/app/page.js` (Pricing-Section) |
| Upsell nach Schnell-Check | `src/app/assessment/page.js` |
| E-Mail-Texte (PayPal) | `src/app/api/purchase-request/route.js` |
| E-Mail-Texte (Rechnung) | `src/app/api/invoice-request/route.js` (NEU) |

---

## Bugfix vom 15.02.2026 (Nachmittag)

### 1. 404-Fehler auf Startseite behoben

**Problem:** Die Startseite zeigte einen 404-Fehler nach dem Deployment.
**Ursache:** `output: 'standalone'` in `next.config.js` erzeugt kein vollständiges Bundle für Standard-Deployments (Vercel, Netlify). Der Standalone-Modus ist nur für Docker/Node.js-Server.
**Lösung:** `output: 'standalone'` aus `next.config.js` entfernt.

### 2. Google Sheets IDs korrigiert

**Problem:** In `.env.local` waren die vollen Google Sheets URLs eingetragen statt nur die Sheet-IDs. Die Google Sheets API erwartet aber nur die reine ID.
**Lösung:**
- Die IDs wurden aus den URLs extrahiert (z.B. `1IkdLnb_fnImYex2q_UO-rjWasWVoOjSa-V8XbLBQcb8`)
- Der Code enthält jetzt eine automatische URL-zu-ID-Extraktion als Sicherheitsnetz

### 3. Google Sheets Code robuster gemacht

- **URL-Extraktion:** Falls versehentlich eine volle URL eingetragen wird, extrahiert der Code automatisch die Sheet-ID
- **Tab-Fallback:** Falls der Tab-Name (z.B. "Ergebnisse") nicht existiert, wird automatisch "Tabellenblatt1" versucht
- **Service Account Validierung:** Prüft ob `client_email` und `private_key` im JSON vorhanden sind
- **Bessere Fehlermeldungen:** Klare Warnungen in der Konsole wenn etwas nicht konfiguriert ist

### 4. Google Sheets Tab-Namen

Die Tabs in den 3 Google Sheets sollten wie folgt benannt werden (1. Tab im Sheet umbenennen):

| Sheet | Tab-Name |
|-------|----------|
| Erstumfrage-Ergebnisse | `Ergebnisse` |
| Premium-Ergebnisse | `Ergebnisse` |
| Kundendaten | `Kunden` |

Falls die Tabs anders heißen (z.B. Standard "Tabellenblatt1"), funktioniert es trotzdem dank Fallback.

### 5. GOOGLE_SERVICE_ACCOUNT_KEY (noch offen!)

**WICHTIG:** Die Google Sheets Speicherung funktioniert erst, wenn der Service Account Key in `.env.local` eingetragen ist. Ohne Key werden die Daten weiterhin nur per E-Mail versendet (die App stürzt nicht ab).

Setup-Kurzanleitung:
1. https://console.cloud.google.com öffnen
2. Neues Projekt erstellen → Google Sheets API aktivieren
3. Credentials → Service Account erstellen → JSON-Key herunterladen
4. Service Account E-Mail als Editor in alle 3 Sheets einladen
5. JSON-Inhalt als eine Zeile in `.env.local` bei `GOOGLE_SERVICE_ACCOUNT_KEY=` eintragen
