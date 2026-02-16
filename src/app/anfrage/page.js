'use client'

import { useState, useEffect } from 'react'

const PAYPAL_ME = 'https://paypal.me/frimalo'

const plans = {
  premium: {
    name: 'Premium Report',
    price: '197',
    color: 'primary',
    features: [
      '30+ Detailfragen zur Tiefenanalyse',
      'Ausf\u00fchrlicher PDF-Report (20+ Seiten)',
      'Individuelle KI-Roadmap',
      'Use-Case-Empfehlungen f\u00fcr Ihre Branche',
      'F\u00f6rdermittel-\u00dcbersicht',
      'Tool-Empfehlungen pro Bereich',
    ],
  },
  strategie: {
    name: 'Strategie-Paket',
    price: '497',
    color: 'accent',
    features: [
      'Alles aus dem Premium Report',
      '60-Min. Video-Strategiegespr\u00e4ch',
      'Pers\u00f6nliche KI-Strategie',
      'F\u00f6rdermittelberatung',
      '30 Tage E-Mail-Support',
    ],
  },
}

export default function Anfrage() {
  const [plan, setPlan] = useState('premium')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [invoiceRequested, setInvoiceRequested] = useState(false)
  const [invoiceSending, setInvoiceSending] = useState(false)
  const [invoiceError, setInvoiceError] = useState('')
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [street, setStreet] = useState('')
  const [plz, setPlz] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('plan')
    if (p && plans[p]) {
      setPlan(p)
    }
  }, [])

  const currentPlan = plans[plan]
  const paypalLink = `${PAYPAL_ME}/${currentPlan.price}EUR`

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name || name.length < 2) {
      setError('Bitte geben Sie Ihren Namen ein.')
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Bitte geben Sie eine g\u00fcltige E-Mail-Adresse ein.')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/purchase-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, name, email, company, phone }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Es gab einen Fehler. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt an steffenhefter@googlemail.com.')
      }
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
    setSending(false)
  }

  async function handleInvoiceRequest() {
    setInvoiceError('')

    // Adressdaten validieren
    if (!street || street.trim().length < 3) {
      setInvoiceError('Bitte geben Sie Ihre Straße und Hausnummer ein.')
      return
    }
    if (!plz || !/^\d{4,5}$/.test(plz.trim())) {
      setInvoiceError('Bitte geben Sie eine gültige Postleitzahl ein.')
      return
    }
    if (!city || city.trim().length < 2) {
      setInvoiceError('Bitte geben Sie Ihren Ort ein.')
      return
    }

    setInvoiceSending(true)
    try {
      const res = await fetch('/api/invoice-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, name, email, company, street: street.trim(), plz: plz.trim(), city: city.trim() }),
      })
      const data = await res.json()
      if (data.success) {
        setInvoiceRequested(true)
      } else {
        setInvoiceError('Es gab einen Fehler. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an steffenhefter@googlemail.com.')
      }
    } catch {
      setInvoiceError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
    setInvoiceSending(false)
  }

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || ''

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="card text-center fade-in-up">
            <div className="w-20 h-20 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Vielen Dank f&uuml;r Ihre Anfrage!
            </h1>
            <p className="text-gray-600 mb-6">
              Wir haben Ihre Anfrage f&uuml;r den <strong>{currentPlan.name}</strong> erhalten.
              Sie k&ouml;nnen jetzt direkt per PayPal auf unser Firmenkonto bezahlen oder auf unsere Rechnung per E-Mail warten.
            </p>

            {/* PayPal Zahlung */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg className="w-8 h-8 text-[#003087]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.56A.859.859 0 0 1 5.79 1.84h7.708c2.555 0 4.335.55 5.283 1.633.444.508.735 1.04.898 1.63.17.616.21 1.35.117 2.241l-.01.078v.676l.526.298a3.58 3.58 0 0 1 1.07.863c.35.427.588.95.71 1.555.125.625.127 1.37.006 2.215-.14.974-.368 1.822-.681 2.525a5.265 5.265 0 0 1-1.09 1.645c-.448.455-.99.797-1.61 1.016-.6.213-1.29.32-2.054.32H15.53a1.08 1.08 0 0 0-1.067.915l-.038.233-.66 4.173-.03.169a.645.645 0 0 1-.637.543H7.076z"/>
                  <path d="M18.283 7.326c-.01.07-.023.14-.038.21-.79 4.057-3.496 5.46-6.95 5.46h-1.76a.854.854 0 0 0-.845.724l-.9 5.715-.256 1.62a.45.45 0 0 0 .445.52h3.124c.37 0 .683-.27.742-.636l.03-.16.587-3.72.038-.206a.748.748 0 0 1 .74-.636h.468c3.023 0 5.39-1.228 6.081-4.78.29-1.484.14-2.723-.625-3.594a2.98 2.98 0 0 0-.86-.617z" opacity=".7"/>
                </svg>
                <h3 className="font-bold text-gray-900 text-lg">Jetzt direkt bezahlen</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Bezahlen Sie bequem und sicher &uuml;ber PayPal. Nach Zahlungseingang
                erhalten Sie umgehend Ihren Zugang.
              </p>
              <a
                href={paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-[#0070ba] rounded-xl hover:bg-[#005ea6] transition-all shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.56A.859.859 0 0 1 5.79 1.84h7.708c2.555 0 4.335.55 5.283 1.633.444.508.735 1.04.898 1.63.17.616.21 1.35.117 2.241l-.01.078v.676l.526.298a3.58 3.58 0 0 1 1.07.863c.35.427.588.95.71 1.555.125.625.127 1.37.006 2.215-.14.974-.368 1.822-.681 2.525a5.265 5.265 0 0 1-1.09 1.645c-.448.455-.99.797-1.61 1.016-.6.213-1.29.32-2.054.32H15.53a1.08 1.08 0 0 0-1.067.915l-.038.233-.66 4.173-.03.169a.645.645 0 0 1-.637.543H7.076z"/>
                </svg>
                &euro;{currentPlan.price} mit PayPal bezahlen
              </a>
              <p className="text-xs text-gray-500 mt-3">
                Sicher &uuml;ber PayPal &ndash; auch ohne PayPal-Konto mit Kreditkarte oder Lastschrift m&ouml;glich
              </p>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-gray-400">oder</span></div>
            </div>

            {/* Rechnung anfordern */}
            {!invoiceRequested ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="font-bold text-gray-900 text-lg">Lieber per Rechnung zahlen?</h3>
                </div>

                {!showInvoiceForm ? (
                  <>
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      Fordern Sie eine Rechnung an. Ihr Zugang wird innerhalb von 12 Stunden freigeschaltet.
                      Die Rechnung erhalten Sie per E-Mail an <strong>{email}</strong>.
                    </p>
                    <button
                      onClick={() => setShowInvoiceForm(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-all shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Per Rechnung zahlen
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Zahlung per &Uuml;berweisung &ndash; Rechnung wird an {email} gesendet
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      Bitte vervollst&auml;ndigen Sie Ihre Rechnungsadresse, damit wir Ihnen direkt eine korrekte Rechnung erstellen k&ouml;nnen.
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-amber-200">
                        <div className="text-xs text-gray-500 mb-0.5">Name</div>
                        <div className="font-medium text-gray-900">{name}</div>
                      </div>
                      {company && (
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <div className="text-xs text-gray-500 mb-0.5">Firma</div>
                          <div className="font-medium text-gray-900">{company}</div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stra&szlig;e und Hausnummer *</label>
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Musterstra&szlig;e 12"
                          required
                          maxLength={200}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">PLZ *</label>
                          <input
                            type="text"
                            value={plz}
                            onChange={(e) => setPlz(e.target.value)}
                            placeholder="12345"
                            required
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ort *</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Musterstadt"
                            required
                            maxLength={200}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {invoiceError && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {invoiceError}
                      </div>
                    )}

                    <button
                      onClick={handleInvoiceRequest}
                      disabled={invoiceSending}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {invoiceSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Wird angefordert...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Rechnung anfordern
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Rechnung wird an {email} gesendet &ndash; Zahlung per &Uuml;berweisung
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 text-center">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Rechnung angefordert!</h3>
                <p className="text-gray-600 text-sm">
                  Ihre Rechnungsanforderung wurde erfolgreich &uuml;bermittelt. Sie erhalten in K&uuml;rze eine
                  Rechnung per E-Mail an <strong>{email}</strong>.
                  Ihr Zugang wird <strong>innerhalb von 12 Stunden</strong> freigeschaltet.
                </p>
              </div>
            )}

            {/* Terminbuchung direkt im Flow f&uuml;r Strategie-Paket */}
            {plan === 'strategie' && bookingUrl && (
              <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 mb-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Strategiegespr&auml;ch direkt buchen</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Im Strategie-Paket ist ein 60-min&uuml;tiges Video-Strategiegespr&auml;ch enthalten.
                  Buchen Sie jetzt direkt Ihren Wunschtermin!
                </p>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Termin w&auml;hlen
                </a>
              </div>
            )}

            <div className="bg-primary-50 rounded-xl p-5 text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">So geht es weiter</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                  Zahlung per PayPal oder &Uuml;berweisung
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                  Nach Zahlungseingang schalten wir Ihren Zugang frei
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                  Sie starten das Premium Assessment (30 Detailfragen)
                </li>
                {plan === 'strategie' && (
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                    {bookingUrl ? 'Ihr Strategiegespr\u00e4ch findet zum gebuchten Termin statt' : 'Wir vereinbaren einen Termin f\u00fcr Ihr Strategiegespr\u00e4ch'}
                  </li>
                )}
              </ol>
            </div>
            <a href="/" className="btn-secondary">
              Zur&uuml;ck zur Startseite
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {currentPlan.name} bestellen
          </h1>
          <p className="text-gray-600">
            F&uuml;llen Sie das Formular aus &ndash; im n&auml;chsten Schritt k&ouml;nnen Sie direkt per PayPal bezahlen.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Formular */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ihre Kontaktdaten</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max Mustermann"
                    required
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="max@firma.de"
                    required
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Firma</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Muster GmbH"
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 123 456 7890"
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Plan-Auswahl */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gew&auml;hltes Paket</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPlan('premium')}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${plan === 'premium' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-gray-900">Premium Report</div>
                      <div className="text-sm text-gray-500">&euro;197 einmalig</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan('strategie')}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${plan === 'strategie' ? 'border-accent-500 bg-accent-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-gray-900">Strategie-Paket</div>
                      <div className="text-sm text-gray-500">&euro;497 einmalig</div>
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className={`mt-6 w-full ${plan === 'strategie' ? 'btn-accent' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {sending ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Wird gesendet...
                  </span>
                ) : (
                  <>
                    Weiter zur Zahlung
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Im n&auml;chsten Schritt k&ouml;nnen Sie per PayPal bezahlen oder eine Rechnung anfordern.
              </p>
            </form>
          </div>

          {/* Zusammenfassung */}
          <div className="md:col-span-2">
            <div className="card sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Ihre Bestellung
              </h3>

              <div className={`p-4 rounded-xl mb-4 ${plan === 'strategie' ? 'bg-accent-50 border border-accent-100' : 'bg-primary-50 border border-primary-100'}`}>
                <div className="text-2xl font-extrabold text-gray-900">&euro;{currentPlan.price}</div>
                <div className="text-sm text-gray-600">{currentPlan.name} &ndash; einmalig</div>
              </div>

              <ul className="space-y-2 mb-6">
                {currentPlan.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <svg className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan === 'strategie' ? 'text-accent-500' : 'text-primary-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2 text-[#0070ba] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.56A.859.859 0 0 1 5.79 1.84h7.708c2.555 0 4.335.55 5.283 1.633.444.508.735 1.04.898 1.63.17.616.21 1.35.117 2.241l-.01.078v.676l.526.298a3.58 3.58 0 0 1 1.07.863c.35.427.588.95.71 1.555.125.625.127 1.37.006 2.215-.14.974-.368 1.822-.681 2.525a5.265 5.265 0 0 1-1.09 1.645c-.448.455-.99.797-1.61 1.016-.6.213-1.29.32-2.054.32H15.53a1.08 1.08 0 0 0-1.067.915l-.038.233-.66 4.173-.03.169a.645.645 0 0 1-.637.543H7.076z"/>
                  </svg>
                  Zahlung per PayPal
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Oder Rechnung per E-Mail
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Sicher &amp; DSGVO-konform
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
