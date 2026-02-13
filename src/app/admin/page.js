export const metadata = {
  title: 'Admin Guide | KI-Kompass',
  robots: 'noindex, nofollow',
}

export default function AdminGuide() {
  const sections = [
    {
      title: 'Startseite (Landing Page)',
      file: 'src/app/page.js',
      items: [
        'Hero-Text und Untertitel',
        'Problem-Section (3 Karten)',
        'Vorteile-Section (4 Karten)',
        'Ablauf "So funktioniert\'s" (3 Schritte)',
        'Preise (Kostenlos / Premium / Strategie)',
        'Trust-Statistiken (200+, 94%, etc.)',
        'FAQ-Fragen und Antworten',
        'CTA am Seitenende',
      ],
    },
    {
      title: 'Navigation (Kopfzeile)',
      file: 'src/app/layout.js',
      items: [
        'Logo-Text ("KI-Kompass")',
        'Men\u00fc-Links (Vorteile, Ablauf, Preise, \u00dcber mich)',
        '"Jetzt starten"-Button',
      ],
      hint: 'Die <nav>-Sektion beginnt bei Zeile 26. Links \u00e4ndern: href="..." und Linktext.',
    },
    {
      title: 'Fu\u00dfzeile (Footer)',
      file: 'src/app/layout.js',
      items: [
        'Firmenname und Beschreibungstext',
        'Link-Liste (Kostenloser Check, Premium Report, etc.)',
        'Kontaktdaten (Adresse, E-Mail)',
        'Impressum/Datenschutz-Links',
        'Copyright-Text',
      ],
      hint: 'Die <footer>-Sektion beginnt bei Zeile 49. Kontaktdaten direkt im HTML \u00e4ndern.',
    },
    {
      title: '\u00dcber mich',
      file: 'src/app/ueber-mich/page.js',
      items: [
        'Profilbild (public/Steffen2025.jpg austauschen)',
        'Name und Untertitel im Hero',
        'Mission-Text und Kennzahlen (20+, 500+, etc.)',
        '"Was mich besonders macht" \u2013 4 Karten mit Texten',
        'Pers\u00f6nliches Zitat',
        'Beratungsansatz (3 Phasen)',
        '"Was mich antreibt" \u2013 3 Textboxen',
        'Termin-Button (Google Calendar URL)',
      ],
    },
    {
      title: 'Preise \u00e4ndern',
      file: 'src/app/anfrage/page.js',
      items: [
        'Premium Report Preis: Zeile 8 \u2013 price: \'197\'',
        'Strategie-Paket Preis: Zeile 20 \u2013 price: \'497\'',
        'Feature-Listen f\u00fcr beide Pakete',
        'PayPal-Link: Zeile 5 \u2013 PAYPAL_ME URL',
      ],
      hint: 'Preise auch auf der Startseite (src/app/page.js) in der Pricing-Section anpassen!',
    },
    {
      title: 'H\u00e4ufige Fragen (FAQ)',
      file: 'src/app/page.js',
      items: [
        'FAQ-Array ab ca. Zeile 343',
        'Jede Frage hat { q: "Frage?", a: "Antwort..." }',
        'Einfach neue Objekte hinzuf\u00fcgen oder bestehende \u00e4ndern',
      ],
      hint: 'Format: { q: \'Ihre Frage?\', a: \'Ihre Antwort.\' }',
    },
    {
      title: 'Kostenloser Check (12 Fragen)',
      file: 'src/data/questions.js',
      items: [
        'freeQuestions-Array (Zeile 4-154)',
        'Jede Frage: { id, category, categoryLabel, question, options: [...] }',
        'Jede Option: { text: "...", score: 1-4 }',
        'Score 1 = niedrig, 4 = hoch',
      ],
    },
    {
      title: 'Premium Assessment (35 Fragen)',
      file: 'src/data/questions.js',
      items: [
        'premiumQuestions-Array (Zeile 157-528)',
        '7 Kategorien: Strategie, Daten, Prozesse, Kompetenzen, Governance, Branche',
        'Gleiche Struktur wie kostenlose Fragen',
        'Empfehlungen: getRecommendations() ab Zeile 600',
        'Quick-Wins: getQuickWins() ab Zeile 751',
        'F\u00f6rderprogramme: foerderprogramme-Array ab Zeile 778',
      ],
    },
    {
      title: 'Kundenzug\u00e4nge verwalten',
      file: 'src/data/customers.js',
      items: [
        'Neuen Kunden hinzuf\u00fcgen: { code, name, email, plan }',
        'code = Passwort, das der Kunde im Link bekommt',
        'Kundenlink: /premium?code=DAS_PASSWORT',
        'plan: \'premium\' oder \'strategie\'',
      ],
      hint: 'Nach dem Hinzuf\u00fcgen muss der Server neu gestartet werden (npm run build).',
    },
    {
      title: 'E-Mail-Einstellungen',
      file: '.env.local',
      items: [
        'EMAIL_HOST, EMAIL_PORT \u2013 SMTP-Server',
        'EMAIL_USER \u2013 Gmail-Adresse',
        'EMAIL_PASS \u2013 Gmail App-Passwort (16 Zeichen)',
        'EMAIL_FROM \u2013 Absendername',
        'NEXT_PUBLIC_CONTACT_EMAIL \u2013 Kontaktadresse auf der Website',
        'NEXT_PUBLIC_BOOKING_URL \u2013 Google Calendar Link',
      ],
    },
    {
      title: 'Impressum',
      file: 'src/app/impressum/page.js',
      items: [
        'Firmenname, Gesch\u00e4ftsf\u00fchrer, Adresse',
        'E-Mail-Adresse',
        'USt-IdNr. erg\u00e4nzen (vor Go-Live!)',
        'Verantwortlicher nach \u00a755 RStV',
      ],
    },
    {
      title: 'Datenschutzerkl\u00e4rung',
      file: 'src/app/datenschutz/page.js',
      items: [
        'Verantwortlicher und Kontaktdaten',
        'Beschreibung der Datenverarbeitung',
        'Google Calendar-Hinweis',
        'E-Mail-Dienstleister (Gmail)',
        'Hosting (Vercel)',
      ],
      hint: 'Vor Go-Live von einem Anwalt pr\u00fcfen lassen!',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KI-Kompass &ndash; Bearbeitungsguide</h1>
              <p className="text-gray-500 text-sm">Welche Datei f&uuml;r welchen Inhalt?</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
            <p className="text-yellow-800 font-medium mb-2">So bearbeitest du Inhalte:</p>
            <ol className="text-yellow-700 space-y-1 list-decimal list-inside">
              <li>&Ouml;ffne die Datei im angegebenen Pfad mit einem Texteditor (z.B. VS Code)</li>
              <li>&Auml;ndere den gew&uuml;nschten Text direkt im Code</li>
              <li>Speichere die Datei</li>
              <li>Pr&uuml;fe lokal mit <code className="bg-yellow-100 px-1 rounded">npm run dev</code></li>
              <li>F&uuml;r Produktion: <code className="bg-yellow-100 px-1 rounded">npm run build</code> und neu deployen</li>
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                <code className="text-xs bg-gray-100 text-primary-700 px-2 py-1 rounded font-mono flex-shrink-0 ml-4">
                  {section.file}
                </code>
              </div>

              <ul className="space-y-2 mb-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {section.hint && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700">
                  <strong>Tipp:</strong> {section.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card mt-8 bg-primary-50 border-primary-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Wichtige Dateien auf einen Blick</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900">Was</th>
                  <th className="text-left py-2 font-semibold text-gray-900">Datei</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ['Startseite', 'src/app/page.js'],
                  ['Navigation + Footer', 'src/app/layout.js'],
                  ['\u00dcber mich', 'src/app/ueber-mich/page.js'],
                  ['Bestellseite', 'src/app/anfrage/page.js'],
                  ['Premium Assessment', 'src/app/premium/page.js'],
                  ['Kostenloser Check', 'src/app/assessment/page.js'],
                  ['Alle Fragen + Scoring', 'src/data/questions.js'],
                  ['Kundenzug\u00e4nge', 'src/data/customers.js'],
                  ['E-Mail-Versand', 'src/lib/mail.js'],
                  ['Konfiguration', '.env.local'],
                  ['Impressum', 'src/app/impressum/page.js'],
                  ['Datenschutz', 'src/app/datenschutz/page.js'],
                  ['Profilbild', 'public/Steffen2025.jpg'],
                  ['CSS/Styles', 'src/app/globals.css'],
                ].map(([was, datei], i) => (
                  <tr key={i} className="border-b border-primary-100 last:border-0">
                    <td className="py-2 pr-4">{was}</td>
                    <td className="py-2"><code className="text-xs bg-white px-1.5 py-0.5 rounded font-mono text-primary-700">{datei}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
