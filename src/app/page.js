'use client'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/top-view-of-road-intersection-Z6NJKXA.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 fade-in-up backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Kostenfrei &bull; 5 Minuten &bull; Sofort Ergebnis
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight fade-in-up fade-in-up-delay-1 drop-shadow-lg">
              Wie bereit ist Ihr Unternehmen f&uuml;r{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-100">
                K&uuml;nstliche Intelligenz?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed fade-in-up fade-in-up-delay-2">
              Finden Sie in 5 Minuten heraus, wo Ihr Unternehmen steht &ndash;
              und welche konkreten Schritte Sie jetzt unternehmen sollten, um KI
              erfolgreich einzusetzen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-3">
              <a href="/assessment" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                Kostenfreien Check starten
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#ablauf" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                Mehr erfahren
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/80 fade-in-up fade-in-up-delay-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Praxisorientiert
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                DSGVO-konform
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                von &uuml;ber 50 KMU getestet
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Die KI-Herausforderung f&uuml;r den Mittelstand</h2>
            <p className="section-subtitle mt-4">
              73% der Erwerbst&auml;tigen kennen keine KI-Lernangebote. Ebenso viele KMU wissen nicht, wo sie anfangen sollen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Orientierungslosigkeit',
                desc: 'Wo fange ich an? Welche KI-Tools passen zu meinem Unternehmen? Welche Prozesse lassen sich automatisieren?',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Kostenunsicherheit',
                desc: 'Was kostet eine KI-Implementierung wirklich? Welche Foerdermittel gibt es? Lohnt sich die Investition wirklich?',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                title: 'Kompetenzluecken',
                desc: 'Mitarbeiter sind unsicher im Umgang mit KI. Es fehlt an Schulungen, Richtlinien und einer klaren Strategie.',
              },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Vorteile Section */}
      <section id="vorteile" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Der KI-Kompass zeigt Ihnen den Weg</h2>
            <p className="section-subtitle mt-4">
              Unser Assessment basiert auf der bew&auml;hrten 3-Phasen-Methodik: AI Awareness, AI Readiness, AI Steadiness.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Reifegrad erkennen',
                desc: 'Erfahren Sie genau, auf welcher KI-Reifestufe Ihr Unternehmen steht.',
                color: 'primary',
              },
              {
                num: '02',
                title: 'Potenziale identifizieren',
                desc: 'Erfahren Sie konkrete KI-Anwendungsf\u00e4lle mit dem gr\u00f6\u00dften ROI f\u00fcr Ihr Unternehmen.',
                color: 'accent',
              },
              {
                num: '03',
                title: 'Roadmap erhalten',
                desc: 'Bekommen Sie einen klaren Fahrplan mit priorisierten Ma\u00dfnahmen und Quick-Wins.',
                color: 'primary',
              },
              {
                num: '04',
                title: 'Sofort handeln',
                desc: 'Starten Sie mit konkreten und vorallem umsetzbaren Schritten - Step by Step.',
                color: 'accent',
              },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`text-5xl font-extrabold mb-4 ${item.color === 'primary' ? 'text-primary-200' : 'text-accent-200'}`}>
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="ablauf" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">So funktioniert&apos;s</h2>
            <p className="section-subtitle mt-4">
              In drei einfachen Schritten zu Ihrem individuellen KI-Fahrplan.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Fragen beantworten',
                desc: 'Beantworten Sie 12 praxisnahe Fragen zu Ihrem Unternehmen, Ihren Prozessen und Ihrer digitalen Infrastruktur.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Ergebnis erhalten',
                desc: 'Sie erhalten sofort Ihren KI-Reifegrad-Score mit einer Einordnung in unser 4-Level-Modell.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Ma\u00dfnahmen umsetzen',
                desc: 'Nutzen Sie unsere konkreten Handlungsempfehlungen, um Ihr Unternehmen Schritt f\u00fcr Schritt KI-ready zu machen.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  {item.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/assessment" className="btn-primary">
              Jetzt kostenfreien Check starten
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preise" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">W&auml;hlen Sie Ihren KI-Kompass</h2>
            <p className="section-subtitle mt-4">
              Vom kostenfreien Schnell-Check bis zum pers&ouml;nlichen Strategiegespr&auml;ch. Sie entscheiden!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card text-center border-2 border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Schnell-Check</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">Kostenfrei</div>
              <p className="text-gray-500 mb-6">Ihr erster Schritt</p>
              <ul className="space-y-3 text-left mb-8">
                {['12 Fragen zum KI-Reifegrad', 'Sofort-Score mit Einordnung', 'Allgemeine Handlungstipps', 'Vergleich mit Ihrer Branche'].map((f, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/assessment" className="btn-secondary w-full">
                Jetzt starten
              </a>
            </div>

            {/* Premium */}
            <div className="card text-center border-2 border-primary-500 relative shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Beliebteste Wahl
              </div>
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Premium Report</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;197</div>
              <p className="text-gray-500 mb-6">einmalig</p>
              <ul className="space-y-3 text-left mb-8">
                {[
                  'Alles aus dem Schnell-Check',
                  '30+ Detailfragen',
                  'Ausf\u00fchrlicher PDF-Report (20+ Seiten)',
                  'Individuelle KI-Roadmap',
                  'Use-Case-Empfehlungen',
                  'F\u00f6rdermittel-\u00dcbersicht',
                  'Tool-Empfehlungen pro Bereich',
                ].map((f, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/anfrage?plan=premium" className="btn-primary w-full">
                Premium Report anfragen
              </a>
            </div>

            {/* Strategy */}
            <div className="card text-center border-2 border-gray-200 hover:border-accent-300 transition-colors">
              <div className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">Strategie-Paket</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;497</div>
              <p className="text-gray-500 mb-6">einmalig</p>
              <ul className="space-y-3 text-left mb-8">
                {[
                  'Alles aus dem Premium Report',
                  '60-Min. Video-Strategiegespr\u00e4ch',
                  'Pers\u00f6nliche KI-Strategie',
                  'F\u00f6rdermittelberatung',
                  '30 Tage E-Mail-Support',
                ].map((f, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/anfrage?plan=strategie" className="btn-accent w-full">
                Strategie-Paket anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { num: '50+', label: 'Unternehmen gepr\u00fcft' },
              { num: '94%', label: 'Weiterempfehlung' },
              { num: '12', label: 'Fragen im Schnell-Check' },
              { num: '5 Min', label: 'bis zum Ergebnis' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.num}</div>
                <div className="text-primary-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">H&auml;ufige Fragen</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'F\u00fcr wen ist der KI-Kompass geeignet?',
                a: 'Der KI-Kompass richtet sich an kleine und mittlere Unternehmen (KMU) mit 5-250 Mitarbeitenden, die wissen m\u00f6chten, wie sie KI sinnvoll einsetzen k\u00f6nnen. Branchenunabh\u00e4ngig.',
              },
              {
                q: 'Brauche ich technisches Vorwissen?',
                a: 'Nein! Die Fragen sind bewusst allgemeinverst\u00e4ndlich formuliert. Sie brauchen keinerlei IT- oder KI-Kenntnisse.',
              },
              {
                q: 'Was bekomme ich im Premium Report?',
                a: 'Einen ausf\u00fchrlichen PDF-Report (20+ Seiten) mit Ihrem detaillierten KI-Reifegrad, individuellen Handlungsempfehlungen, einer priorisierten Roadmap, konkreten Tool-Empfehlungen und einer \u00dcbersicht relevanter F\u00f6rderprogramme.',
              },
              {
                q: 'Wie l\u00e4uft das Strategiegespr\u00e4ch ab?',
                a: 'Nach dem Kauf erhalten Sie einen Link zur Terminbuchung. Im 60-min\u00fctigen Video-Call besprechen wir Ihren Report, entwickeln gemeinsam eine KI-Strategie und identifizieren Quick-Wins f\u00fcr Ihr Unternehmen.',
              },
              {
                q: 'Werden meine Daten sicher behandelt?',
                a: 'Absolut. Alle Daten werden DSGVO-konform verarbeitet und nicht an Dritte weitergegeben. Die Auswertung erfolgt ausschlie\u00dflich zur Erstellung Ihres pers\u00f6nlichen Reports.',
              },
            ].map((faq, i) => (
              <details key={i} className="group card cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Bereit, den n&auml;chsten Schritt zu machen?
          </h2>
          <p className="text-xl text-primary-200 mb-10">
            Starten Sie jetzt Ihren kostenfreien KI-Readiness Check und erfahren Sie,
            welches KI-Potenzial in Ihrem Unternehmen steckt.
          </p>
          <a href="/assessment" className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            Kostenfreien Check starten
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
