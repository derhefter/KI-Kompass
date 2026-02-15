export const metadata = {
  title: '\u00dcber mich | Steffen Hefter - KI-Kompass',
  description: 'Steffen Hefter, Gesch\u00e4ftsf\u00fchrer der frimalo und KI-Berater f\u00fcr KMU in Mitteldeutschland. \u00dcber 20 Jahre Erfahrung in F\u00fchrung, Digitalisierung und Prozessoptimierung.',
}

export default function UeberMich() {
  const erstberatungUrl = process.env.NEXT_PUBLIC_ERSTBERATUNG_URL || process.env.NEXT_PUBLIC_BOOKING_URL || '/anfrage?plan=strategie'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero mit Foto */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <div className="w-52 md:w-64 rounded-2xl border-4 border-white/30 overflow-hidden shadow-2xl bg-white/10">
                <img
                  src="/Steffen2025.jpg"
                  alt="Steffen Hefter - KI-Berater f&uuml;r KMU"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div>
              <p className="text-primary-200 font-medium mb-2">KI-Berater f&uuml;r KMU</p>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Steffen Hefter</h1>
              <p className="text-xl text-primary-100 leading-relaxed max-w-2xl">
                Gesch&auml;ftsf&uuml;hrer der frimalo &ndash; &uuml;ber 20 Jahre Erfahrung in F&uuml;hrung,
                Kundenservice, Vertrieb und Digitalisierung. Ich unterstütze kleine und mittlere
                Unternehmen in Mitteldeutschland, K&uuml;nstliche Intelligenz pragmatisch und
                gewinnbringend einzusetzen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meine Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meine Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Digitalisierung und K&uuml;nstliche Intelligenz sind kein Luxus f&uuml;r Gro&szlig;konzerne &ndash;
                sie sind Werkzeuge f&uuml;r den Mittelstand. Mein Ziel ist es, Fachkr&auml;fte zu entlasten,
                Prozesse effizienter zu gestalten und die Wettbewerbsf&auml;higkeit regionaler Unternehmen
                zu st&auml;rken.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dabei bringe ich soziales Verst&auml;ndnis und Wirtschaftskompetenz zusammen:
                Als Diplom-Sozialp&auml;dagoge mit langj&auml;hriger F&uuml;hrungserfahrung in der
                Software- und Energiewirtschaft verstehe ich sowohl die Menschen als auch
                die Gesch&auml;ftslogik hinter erfolgreicher Transformation.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: '20+', text: 'Jahre F\u00fchrungserfahrung' },
                { num: '500+', text: 'Mitarbeitende gef\u00fchrt' },
                { num: '15 Mio.\u20ac', text: 'Budgetverantwortung' },
                { num: '6+', text: 'Branchen-Expertise' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center bg-primary-50 rounded-xl p-4">
                  <div className="text-2xl font-extrabold text-primary-600 w-28 flex-shrink-0">{stat.num}</div>
                  <div className="text-gray-700">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vielseitigkeit - ersetzt den alten Werdegang */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Was mich besonders macht</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Mein gr&ouml;&szlig;ter Vorteil? Ich denke nicht in Schubladen. Meine Laufbahn hat mich durch
            v&ouml;llig unterschiedliche Welten gef&uuml;hrt &ndash; und genau das macht meinen Blick auf
            Ihr Unternehmen so wertvoll.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-l-4 border-l-primary-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mensch trifft Technik</h3>
                  <p className="text-gray-600">
                    Als Diplom-Sozialp&auml;dagoge habe ich gelernt, Menschen zu verstehen, zuzuh&ouml;ren und
                    Ver&auml;nderungsprozesse empathisch zu begleiten. Diese F&auml;higkeit ist in der
                    KI-Transformation wichtig &ndash; denn Technologie funktioniert nur, wenn die
                    Menschen dahinter mitgenommen werden. Es ist kein IT-Projekt.
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-accent-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Vertrieb &amp; Strategie</h3>
                  <p className="text-gray-600">
                    Jahre im Vertrieb, Key-Account-Management und in der strategischen Unternehmenssteuerung
                    haben mir beigebracht, wie Gesch&auml;fte wirklich funktionieren. Ich spreche die Sprache
                    des Mittelstands &ndash; nicht die von Tech-Konzernen.
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-primary-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Branchen&uuml;bergreifend denken</h3>
                  <p className="text-gray-600">
                    Von der Softwarebranche &uuml;ber die Energiewirtschaft bis hin zu Telekommunikation, Software,
                    Finanzen und Sozialwirtschaft &ndash; in jeder Branche konnte ich wertvolle
                    Erfahrungen sammeln. Dieses Wissen hilft mir, L&ouml;sungen aus einer Branche
                    auf eine andere zu &uuml;bertragen.
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-accent-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">F&uuml;hrung mit Empathie</h3>
                  <p className="text-gray-600">
                    &Uuml;ber 500 Mitarbeitende gef&uuml;hrt, Teams aufgebaut und durch Ver&auml;nderungsphasen
                    begleitet. Ich wei&szlig;, dass Digitalisierung zuerst in den K&ouml;pfen stattfindet &ndash;
                    bevor sie in der Technik ankommt. Deshalb steht bei mir der Mensch immer im
                    Mittelpunkt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto italic">
              &bdquo;Genau diese Mischung aus sozialer Kompetenz, unternehmerischem Denken und
              technologischem Know-how macht den Unterschied. Ich sehe Ihr Unternehmen nicht
              nur durch die Technik-Brille &ndash; sondern verstehe die Menschen, die Prozesse
              und die Gesch&auml;ftslogik dahinter.&ldquo;
            </p>
          </div>
        </div>
      </section>

      {/* Mein Ansatz */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Mein Beratungsansatz</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            &bdquo;KI in kleinen Happen&ldquo; &ndash; niedrigschwelliger Zugang f&uuml;r KMU,
            die pragmatisch und schrittweise in die digitale Zukunft starten wollen.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Phase 1',
                name: 'AI Awareness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                desc: 'Orientierung schaffen, Mitarbeitende schulen, rechtliche Klarheit gewinnen. Erste KI-Tools testen und Verst\u00e4ndnis aufbauen.',
              },
              {
                phase: 'Phase 2',
                name: 'AI Readiness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                desc: 'Reifegrad analysieren, Daten pr\u00fcfen, Use-Cases identifizieren und priorisieren. Quick-Wins definieren und Roadmap erstellen.',
              },
              {
                phase: 'Phase 3',
                name: 'AI Steadiness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                desc: 'Pilotprojekte umsetzen, Erfolge messen und kommunizieren. Prozesse skalieren und KI nachhaltig im Unternehmen verankern.',
              },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">{item.phase}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was mich antreibt */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Was mich antreibt</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border-t-4 border-t-primary-500">
              <h3 className="font-bold text-gray-900 mb-3">Meine &Uuml;berzeugung</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                KI ist kein Selbstzweck, sondern ein Werkzeug zur Entlastung von Fachkr&auml;ften,
                zur Sicherung von Teilhabe und zur St&auml;rkung regionaler Unternehmen. Ich arbeite daran,
                soziale Wirkung, &ouml;konomische Effizienz und &ouml;kologische Nachhaltigkeit in Einklang zu bringen.
              </p>
            </div>
            <div className="card border-t-4 border-t-accent-500">
              <h3 className="font-bold text-gray-900 mb-3">Warum Mitteldeutschland?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ich bin in Halle (Saale) beheimatet und fest in Mitteldeutschland verankert.
                Die Region hat enormes Potenzial &ndash; und ich m&ouml;chte dazu beitragen,
                dass KMU hier nicht den Anschluss verlieren, sondern mit KI neue Chancen ergreifen.
              </p>
            </div>
            <div className="card border-t-4 border-t-primary-500">
              <h3 className="font-bold text-gray-900 mb-3">Mein Versprechen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hilfe zur Selbsthilfe statt Abh&auml;ngigkeit. Ich bef&auml;hige Ihr Team, KI eigenst&auml;ndig
                zu nutzen. Mein Ansatz &bdquo;KI in kleinen Happen&ldquo; sorgt daf&uuml;r, dass Sie nicht
                &uuml;berfordert werden, sondern Schritt f&uuml;r Schritt sicher vorankommen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Termin buchen - Google Calendar */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Termin vereinbaren</h2>
          <p className="text-gray-600 text-lg mb-8">
            Lernen wir uns kennen! Buchen Sie direkt eine kostenlose 30-min&uuml;tige
            Erstberatung &uuml;ber meinen Online-Kalender.
          </p>

          <a
            href={erstberatungUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Erstberatung buchen (30 Min.)
          </a>

          <p className="text-sm text-gray-500 mt-4">
            Terminbuchung &uuml;ber Google Kalender &ndash; w&auml;hlen Sie einfach einen freien Termin aus.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit, Ihr Unternehmen KI-ready zu machen?
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Starten Sie mit dem kostenlosen KI-Readiness Check oder kontaktieren Sie mich direkt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/assessment" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all shadow-lg">
              Kostenlosen Check starten
            </a>
            <a href={`mailto:steffenhefter@googlemail.com`} className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all">
              E-Mail schreiben
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
