export const metadata = {
  title: 'Datenschutz | KI-Kompass',
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerkl&auml;rung</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Datenschutz auf einen Blick</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. Verantwortlicher</h2>
              <p>
                frimalo<br />
                Gesch&auml;ftsf&uuml;hrer: Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)<br />
                E-Mail: steffenhefter@googlemail.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">KI-Readiness Assessment</h3>
              <p>
                Wenn Sie das kostenlose Assessment durchf&uuml;hren, werden Ihre Antworten
                lokal in Ihrem Browser verarbeitet. Die Auswertung erfolgt clientseitig &ndash;
                Ihre Antworten werden nicht an unseren Server &uuml;bermittelt.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">E-Mail-Erfassung und Kontaktformulare</h3>
              <p>
                Wenn Sie uns freiwillig Ihre E-Mail-Adresse oder andere Kontaktdaten mitteilen
                (z.B. f&uuml;r eine Anfrage zum Premium Report oder eine Terminbuchung),
                verwenden wir diese ausschlie&szlig;lich f&uuml;r den angegebenen Zweck.
                Die Kommunikation erfolgt &uuml;ber unseren E-Mail-Dienst (Google Gmail).
                Eine Weitergabe an sonstige Dritte erfolgt nicht.
                Sie k&ouml;nnen die L&ouml;schung Ihrer Daten jederzeit per E-Mail verlangen.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">E-Mail-Dienstleister</h3>
              <p>
                F&uuml;r den Versand von E-Mails nutzen wir Google Gmail (Google Ireland Ltd.,
                Gordon House, Barrow Street, Dublin 4, Irland). Google verarbeitet Ihre Daten
                m&ouml;glicherweise auch in den USA. Es gelten die Standardvertragsklauseln
                gem&auml;&szlig; Art. 46 DSGVO. Weitere Informationen:{' '}
                <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">Terminbuchung</h3>
              <p>
                F&uuml;r die Terminbuchung nutzen wir Google Kalender (Google Ireland Ltd.,
                Gordon House, Barrow Street, Dublin 4, Irland). Bei einer Terminbuchung
                werden Ihr Name und Ihre E-Mail-Adresse an Google &uuml;bermittelt.
                Es gelten die Standardvertragsklauseln gem&auml;&szlig; Art. 46 DSGVO.
                Weitere Informationen finden Sie in der Datenschutzerkl&auml;rung
                von Google unter:{' '}
                <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Auskunft &uuml;ber Ihre gespeicherten Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>L&ouml;schung Ihrer Daten</li>
                <li>Einschr&auml;nkung der Verarbeitung</li>
                <li>Daten&uuml;bertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung</li>
              </ul>
              <p className="mt-2">
                Wenden Sie sich hierzu an: steffenhefter@googlemail.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Hosting</h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet. Vercel kann beim Zugriff auf die Website
                technisch bedingt Ihre IP-Adresse erfassen. Weitere Informationen:{' '}
                <a href="https://vercel.com/legal/privacy-policy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">
              <p className="text-yellow-800 text-sm font-medium">
                Hinweis: Diese Datenschutzerkl&auml;rung ist ein Entwurf. Lassen Sie sie vor
                Ver&ouml;ffentlichung idealerweise von einem Rechtsanwalt pr&uuml;fen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
