import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'KI-Kompass | KI-Readiness Check für KMU',
  description: 'Prüfen Sie in wenigen Minuten, wie bereit Ihr Unternehmen für Künstliche Intelligenz ist. Kostenloser KI-Readiness Check mit konkreten Handlungsempfehlungen für den Mittelstand.',
  keywords: 'KI Readiness, KI für KMU, Künstliche Intelligenz Mittelstand, KI Check, KI Beratung, Digital Transformation, AI Readiness Assessment',
  openGraph: {
    title: 'KI-Kompass | Wie bereit ist Ihr Unternehmen für KI?',
    description: 'Kostenloser KI-Readiness Check für den Mittelstand. In 5 Minuten wissen Sie, wo Sie stehen.',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">KI-Kompass</span>
              </a>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/#vorteile" className="text-gray-600 hover:text-primary-600 transition-colors">Vorteile</a>
                <a href="/#ablauf" className="text-gray-600 hover:text-primary-600 transition-colors">Ablauf</a>
                <a href="/#preise" className="text-gray-600 hover:text-primary-600 transition-colors">Preise</a>
                <a href="/ueber-mich" className="text-gray-600 hover:text-primary-600 transition-colors">&Uuml;ber mich</a>
                <a href="/assessment" className="btn-primary !py-2 !px-6 !text-base">Jetzt starten</a>
              </div>
              <a href="/assessment" className="md:hidden btn-primary !py-2 !px-4 !text-sm">Jetzt starten</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white">KI-Kompass</span>
                </div>
                <p className="text-sm">Der KI-Readiness Check f&uuml;r den deutschen Mittelstand. Ein Angebot der frimalo &ndash; Steffen Hefter, KI-Berater f&uuml;r KMU in Mitteldeutschland.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/assessment" className="hover:text-white transition-colors">Kostenloser Check</a></li>
                  <li><a href="/#preise" className="hover:text-white transition-colors">Premium Report</a></li>
                  <li><a href="/#ablauf" className="hover:text-white transition-colors">So funktioniert&apos;s</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Kontakt</h4>
                <ul className="space-y-2 text-sm">
                  <li>frimalo &ndash; Steffen Hefter</li>
                  <li>Wilhelm-Schrader-Str. 27a</li>
                  <li>06120 Halle (Saale)</li>
                  <li>E-Mail: steffenhefter@googlemail.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} frimalo &ndash; KI-Kompass. Alle Rechte vorbehalten.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
