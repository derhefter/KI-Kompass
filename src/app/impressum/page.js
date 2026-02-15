export const metadata = {
  title: 'Impressum | KI-Kompass',
}

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
              <p className="text-gray-700">
                frimalo<br />
                Gesch&auml;ftsf&uuml;hrer: Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Kontakt</h2>
              <p className="text-gray-700">
                E-Mail: steffenhefter@googlemail.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
              <p className="text-gray-700">
                Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)
		</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Haftungsausschluss</h2>
              <p className="text-gray-700">
                Die Inhalte dieser Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit,
                Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen.
                Das KI-Readiness Assessment dient der Orientierung und stellt keine verbindliche Beratung dar.
              </p>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">
              <p className="text-yellow-800 text-sm font-medium">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
