'use client'

import { useState } from 'react'
import { freeQuestions, calculateScore, getRecommendations, getQuickWins } from '../../data/questions'

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const question = freeQuestions[currentQuestion]
  const progress = ((currentQuestion) / freeQuestions.length) * 100

  function handleAnswer(option) {
    const newAnswers = [...answers, { questionId: question.id, score: option.score, text: option.text }]
    setAnswers(newAnswers)

    if (currentQuestion < freeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  if (showResults) {
    const result = calculateScore(answers, freeQuestions)
    const recommendations = getRecommendations(result.categoryScores, result.level)
    const quickWins = getQuickWins(result.level)

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Score Header */}
          <div className="card text-center mb-8 fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ihr KI-Readiness Ergebnis</h1>
            <p className="text-gray-500 mb-8">Basierend auf dem 3-Phasen-Modell: AI Awareness &rarr; Readiness &rarr; Steadiness</p>

            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={result.levelColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * result.percentage) / 100}
                    className="score-circle"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold" style={{ color: result.levelColor }}>
                    {result.percentage}%
                  </span>
                  <span className="text-sm text-gray-500">KI-Readiness</span>
                </div>
              </div>
            </div>

            <div
              className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg mb-4"
              style={{ backgroundColor: result.levelColor }}
            >
              Level {result.level}: {result.levelTitle}
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{result.levelDescription}</p>
          </div>

          {/* Category Breakdown */}
          <div className="card mb-8 fade-in-up fade-in-up-delay-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ihre Ergebnisse im Detail</h2>
            <div className="space-y-4">
              {result.categoryScores.map((cat) => (
                <div key={cat.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                    <span className="text-sm font-bold" style={{ color: cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444' }}>
                      {cat.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full progress-bar"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div className="card mb-8 fade-in-up fade-in-up-delay-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ihre Quick-Wins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickWins.map((qw, i) => (
                <div key={i} className="bg-accent-50 rounded-xl p-5 border border-accent-100">
                  <div className="text-xs font-semibold text-accent-600 uppercase mb-2">{qw.effort}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{qw.title}</h3>
                  <p className="text-sm text-gray-600">{qw.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recommendations (limited) */}
          {recommendations.length > 0 && (
            <div className="card mb-8 fade-in-up fade-in-up-delay-3">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top-Empfehlungen</h2>
              {recommendations.slice(0, 2).map((rec, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase ${rec.priority === 'hoch' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      Priorit&auml;t: {rec.priority}
                    </span>
                    <span className="text-sm text-gray-500">{rec.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{rec.title}</h3>
                  <ul className="space-y-1">
                    {rec.actions.slice(0, 2).map((action, j) => (
                      <li key={j} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {action}
                      </li>
                    ))}
                    <li className="text-sm text-gray-400 italic ml-6">+ weitere Ma&szlig;nahmen im Premium Report</li>
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Email Capture */}
          {!emailSubmitted && (
            <div className="card mb-8 bg-primary-50 border-primary-200 fade-in-up fade-in-up-delay-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ergebnis speichern &amp; Updates erhalten</h2>
                <p className="text-gray-600 mb-6">Hinterlassen Sie Ihre Daten und wir informieren Sie &uuml;ber neue KI-Tipps f&uuml;r Ihr Unternehmen.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Firma"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="ihre@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={async () => {
                      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        try {
                          await fetch('/api/lead', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, company, score: result.percentage, level: result.level }),
                          })
                        } catch {
                          // API nicht erreichbar - trotzdem Danke zeigen
                        }
                        setEmailSubmitted(true)
                      }
                    }}
                    className="btn-primary !py-3"
                  >
                    Senden
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">Kein Spam. Ihre Daten werden DSGVO-konform behandelt.</p>
              </div>
            </div>
          )}

          {emailSubmitted && (
            <div className="card mb-8 bg-accent-50 border-accent-200 text-center">
              <svg className="w-12 h-12 text-accent-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-gray-900">Vielen Dank! Wir haben Ihre Daten erfasst und melden uns bei Ihnen.</p>
            </div>
          )}

          {/* Premium Upsell */}
          <div className="card border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-white">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-3">
                Jetzt verf&uuml;gbar
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wollen Sie den vollst&auml;ndigen KI-Fahrplan f&uuml;r Ihr Unternehmen?
              </h2>
              <p className="text-gray-600">
                Der Premium Report liefert Ihnen auf 20+ Seiten eine detaillierte Analyse mit individuellen
                Handlungsempfehlungen, priorisierter Roadmap und konkreten Tool-Empfehlungen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-primary-200">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">&euro;197</div>
                <div className="text-sm text-gray-500 mb-4">Premium Report</div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>35+ Detailfragen</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>PDF-Report (20+ Seiten)</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Individuelle Roadmap</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>F&ouml;rdermittel-&Uuml;bersicht</li>
                </ul>
                <a href="/anfrage?plan=premium" className="btn-primary w-full !text-base">
                  Premium Report anfragen
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 border border-accent-200">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">&euro;497</div>
                <div className="text-sm text-gray-500 mb-4">Strategie-Paket</div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Alles aus Premium Report</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>60-Min. Strategiegespr&auml;ch</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Pers&ouml;nliche KI-Strategie</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>30 Tage E-Mail-Support</li>
                </ul>
                <a href="/anfrage?plan=strategie" className="btn-accent w-full !text-base">
                  Strategie-Paket anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Frage {currentQuestion + 1} von {freeQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {question.categoryLabel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card fade-in-up" key={currentQuestion}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0 transition-colors">
                    <span className="text-sm font-semibold text-gray-500 group-hover:text-primary-600 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zur&uuml;ck
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
