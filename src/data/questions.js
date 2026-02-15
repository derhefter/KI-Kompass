// Kostenloser Schnell-Check: 12 Fragen basierend auf der 3-Phasen-Methodik
// (AI Awareness, AI Readiness, AI Steadiness) und dem 4-Level-Implementierungsmodell

export const freeQuestions = [
  // === AI AWARENESS (Fragen 1-4) ===
  {
    id: 1,
    category: 'awareness',
    categoryLabel: 'KI-Bewusstsein',
    question: 'Wie gut kennen sich Ihre Mitarbeitenden mit K\u00fcnstlicher Intelligenz aus?',
    options: [
      { text: 'Kaum jemand wei\u00df, was KI genau ist', score: 1 },
      { text: 'Einige haben davon geh\u00f6rt, aber kaum praktische Erfahrung', score: 2 },
      { text: 'Mehrere Mitarbeitende nutzen KI-Tools wie ChatGPT privat', score: 3 },
      { text: 'KI wird bereits aktiv in einzelnen Bereichen eingesetzt', score: 4 },
    ],
  },
  {
    id: 2,
    category: 'awareness',
    categoryLabel: 'KI-Bewusstsein',
    question: 'Gibt es in Ihrem Unternehmen eine KI-Richtlinie oder Regelungen zum Umgang mit KI?',
    options: [
      { text: 'Nein, dar\u00fcber haben wir noch nicht nachgedacht', score: 1 },
      { text: 'Es gibt informelle Absprachen', score: 2 },
      { text: 'Wir arbeiten gerade an Richtlinien', score: 3 },
      { text: 'Ja, wir haben klare Richtlinien f\u00fcr den KI-Einsatz', score: 4 },
    ],
  },
  {
    id: 3,
    category: 'awareness',
    categoryLabel: 'KI-Bewusstsein',
    question: 'Wie steht die Gesch\u00e4ftsf\u00fchrung zum Thema KI?',
    options: [
      { text: 'KI ist kein Thema auf der F\u00fchrungsebene', score: 1 },
      { text: 'Es gibt Interesse, aber keine konkreten Pl\u00e4ne', score: 2 },
      { text: 'KI ist Teil der strategischen \u00dcberlegungen', score: 3 },
      { text: 'Die Gesch\u00e4ftsf\u00fchrung treibt KI-Initiativen aktiv voran', score: 4 },
    ],
  },
  {
    id: 4,
    category: 'awareness',
    categoryLabel: 'KI-Bewusstsein',
    question: 'Sind Ihnen die rechtlichen Rahmenbedingungen f\u00fcr KI (z.B. EU AI Act, DSGVO) bekannt?',
    options: [
      { text: 'Nein, damit haben wir uns noch nicht besch\u00e4ftigt', score: 1 },
      { text: 'Wir wissen, dass es Regelungen gibt, kennen Details aber nicht', score: 2 },
      { text: 'Wir haben uns damit grundlegend besch\u00e4ftigt', score: 3 },
      { text: 'Ja, wir haben die regulatorischen Anforderungen im Blick', score: 4 },
    ],
  },

  // === AI READINESS (Fragen 5-8) ===
  {
    id: 5,
    category: 'readiness',
    categoryLabel: 'KI-Bereitschaft',
    question: 'Wie gut ist Ihre Datengrundlage? Liegen Ihre Gesch\u00e4ftsdaten digital und strukturiert vor?',
    options: [
      { text: 'Vieles l\u00e4uft noch auf Papier oder in unstrukturierten Dateien', score: 1 },
      { text: 'Teilweise digital, aber in verschiedenen Systemen verteilt', score: 2 },
      { text: '\u00dcberwiegend digital in zentralen Systemen (CRM, ERP, etc.)', score: 3 },
      { text: 'Umfassend digitalisiert mit guter Datenqualit\u00e4t', score: 4 },
    ],
  },
  {
    id: 6,
    category: 'readiness',
    categoryLabel: 'KI-Bereitschaft',
    question: 'Welche digitalen Tools setzen Sie heute bereits ein?',
    options: [
      { text: 'Haupts\u00e4chlich E-Mail und Office-Programme', score: 1 },
      { text: 'Einige Cloud-Dienste und Branchensoftware', score: 2 },
      { text: 'Umfangreiche Digitall\u00f6sungen (CRM, Projektmanagement, etc.)', score: 3 },
      { text: 'Moderne, vernetzte Systeme mit API-Anbindungen', score: 4 },
    ],
  },
  {
    id: 7,
    category: 'readiness',
    categoryLabel: 'KI-Bereitschaft',
    question: 'Haben Sie repetitive (sich wiederholende) Prozesse identifiziert, die automatisiert werden k\u00f6nnten?',
    options: [
      { text: 'Wir haben uns damit noch nicht besch\u00e4ftigt', score: 1 },
      { text: 'Wir vermuten Potenzial, haben aber nichts konkret analysiert', score: 2 },
      { text: 'Ja, wir kennen einige Prozesse mit Automatisierungspotenzial', score: 3 },
      { text: 'Ja, wir haben Prozesse dokumentiert und priorisiert', score: 4 },
    ],
  },
  {
    id: 8,
    category: 'readiness',
    categoryLabel: 'KI-Bereitschaft',
    question: 'Wie hoch ist das Budget, das Sie f\u00fcr Digitalisierung/KI einplanen k\u00f6nnten?',
    options: [
      { text: 'Derzeit kein Budget vorgesehen', score: 1 },
      { text: 'Kleines Budget f\u00fcr einzelne Tools (unter 5.000\u20ac/Jahr)', score: 2 },
      { text: 'Mittleres Budget f\u00fcr gezielte Projekte (5.000-20.000\u20ac/Jahr)', score: 3 },
      { text: 'Signifikantes Budget f\u00fcr digitale Transformation (>20.000\u20ac/Jahr)', score: 4 },
    ],
  },

  // === AI STEADINESS (Fragen 9-12) ===
  {
    id: 9,
    category: 'steadiness',
    categoryLabel: 'KI-Nachhaltigkeit',
    question: 'Gibt es in Ihrem Unternehmen bereits Erfahrung mit Digitalisierungsprojekten?',
    options: [
      { text: 'Kaum Erfahrung mit gr\u00f6\u00dferen Digitalisierungsprojekten', score: 1 },
      { text: 'Einzelne Projekte, aber ohne klare Methodik', score: 2 },
      { text: 'Mehrere erfolgreiche Digitalisierungsprojekte durchgef\u00fchrt', score: 3 },
      { text: 'Systematisches Projektmanagement f\u00fcr Digitalisierungsprojekte', score: 4 },
    ],
  },
  {
    id: 10,
    category: 'steadiness',
    categoryLabel: 'KI-Nachhaltigkeit',
    question: 'Wie offen sind Ihre Mitarbeitenden gegen\u00fcber Ver\u00e4nderungen und neuen Technologien?',
    options: [
      { text: 'Eher zur\u00fcckhaltend, Ver\u00e4nderungen werden kritisch gesehen', score: 1 },
      { text: 'Gemischt \u2013 einige sind offen, andere skeptisch', score: 2 },
      { text: '\u00dcberwiegend offen, wenn der Nutzen klar erkennbar ist', score: 3 },
      { text: 'Sehr offen und neugierig auf neue Technologien', score: 4 },
    ],
  },
  {
    id: 11,
    category: 'steadiness',
    categoryLabel: 'KI-Nachhaltigkeit',
    question: 'Haben Sie Ressourcen (Personal/Zeit) f\u00fcr KI-Projekte?',
    options: [
      { text: 'Nein, alle sind im Tagesgesch\u00e4ft voll ausgelastet', score: 1 },
      { text: 'Begrenzt \u2013 einzelne Mitarbeitende k\u00f6nnten teilweise freigestellt werden', score: 2 },
      { text: 'Ja, es gibt Personen, die sich mit dem Thema besch\u00e4ftigen k\u00f6nnten', score: 3 },
      { text: 'Ja, wir haben dedizierte Rollen oder ein Innovationsteam', score: 4 },
    ],
  },
  {
    id: 12,
    category: 'steadiness',
    categoryLabel: 'KI-Nachhaltigkeit',
    question: 'Was ist Ihr wichtigstes Ziel bei der KI-Einf\u00fchrung?',
    options: [
      { text: 'Erstmal verstehen, was KI f\u00fcr uns bedeuten k\u00f6nnte', score: 1 },
      { text: 'Kosten senken durch Automatisierung einfacher Aufgaben', score: 2 },
      { text: 'Prozesse optimieren und Qualit\u00e4t steigern', score: 3 },
      { text: 'Wettbewerbsvorteile durch innovative KI-L\u00f6sungen', score: 4 },
    ],
  },
]

// Premium-Assessment: 30 Detailfragen (zus\u00e4tzlich)
export const premiumQuestions = [
  // === STRATEGIE & VISION ===
  {
    id: 101,
    category: 'strategie',
    categoryLabel: 'Strategie & Vision',
    question: 'Ist KI Bestandteil Ihrer Unternehmensstrategie?',
    options: [
      { text: 'Nein, KI spielt strategisch keine Rolle', score: 1 },
      { text: 'KI wird als m\u00f6gliches Thema betrachtet', score: 2 },
      { text: 'KI ist Teil unserer Digitalisierungsstrategie', score: 3 },
      { text: 'KI ist ein zentraler strategischer Pfeiler', score: 4 },
    ],
  },
  {
    id: 102,
    category: 'strategie',
    categoryLabel: 'Strategie & Vision',
    question: 'Kennen Sie die KI-Aktivit\u00e4ten Ihrer Wettbewerber?',
    options: [
      { text: 'Nein, wir beobachten das nicht', score: 1 },
      { text: 'Wir haben vereinzelt davon geh\u00f6rt', score: 2 },
      { text: 'Wir beobachten den Markt regelm\u00e4\u00dfig', score: 3 },
      { text: 'Wir f\u00fchren systematische Wettbewerbsanalysen durch', score: 4 },
    ],
  },
  {
    id: 103,
    category: 'strategie',
    categoryLabel: 'Strategie & Vision',
    question: 'Haben Sie konkrete KI-Use-Cases f\u00fcr Ihr Unternehmen identifiziert?',
    options: [
      { text: 'Nein, keine konkreten Ideen', score: 1 },
      { text: 'Vage Ideen, aber nichts Konkretes', score: 2 },
      { text: 'Ja, einige Use-Cases sind identifiziert', score: 3 },
      { text: 'Ja, priorisierte Use-Cases mit Business Case', score: 4 },
    ],
  },
  {
    id: 104,
    category: 'strategie',
    categoryLabel: 'Strategie & Vision',
    question: 'Gibt es ein dediziertes Budget f\u00fcr KI-Projekte?',
    options: [
      { text: 'Nein, kein Budget', score: 1 },
      { text: 'Kann im Rahmen des IT-Budgets finanziert werden', score: 2 },
      { text: 'Es gibt ein kleines Innovationsbudget', score: 3 },
      { text: 'Ja, es gibt ein dediziertes KI-/Digitalisierungsbudget', score: 4 },
    ],
  },
  {
    id: 105,
    category: 'strategie',
    categoryLabel: 'Strategie & Vision',
    question: 'Kennen Sie relevante F\u00f6rderprogramme f\u00fcr KI und Digitalisierung?',
    options: [
      { text: 'Nein, keine Kenntnis', score: 1 },
      { text: 'Wir wissen, dass es F\u00f6rderung gibt, aber keine Details', score: 2 },
      { text: 'Wir kennen einige Programme (go-digital, Digital Jetzt, etc.)', score: 3 },
      { text: 'Wir nutzen bereits F\u00f6rderprogramme', score: 4 },
    ],
  },

  // === DATEN & INFRASTRUKTUR ===
  {
    id: 201,
    category: 'daten',
    categoryLabel: 'Daten & Infrastruktur',
    question: 'Wie w\u00fcrden Sie die Qualit\u00e4t Ihrer Gesch\u00e4ftsdaten bewerten?',
    options: [
      { text: 'Inkonsistent, l\u00fcckenhaft, viele Dubletten', score: 1 },
      { text: 'Grundlegend vorhanden, aber verbesserungsw\u00fcrdig', score: 2 },
      { text: 'Gute Qualit\u00e4t in den wichtigsten Bereichen', score: 3 },
      { text: 'Hohe Datenqualit\u00e4t mit regelm\u00e4\u00dfiger Pflege', score: 4 },
    ],
  },
  {
    id: 202,
    category: 'daten',
    categoryLabel: 'Daten & Infrastruktur',
    question: 'Gibt es eine zentrale Datenhaltung oder ein Data Warehouse?',
    options: [
      { text: 'Nein, Daten liegen in Silos', score: 1 },
      { text: 'Teilweise zusammengef\u00fchrt, aber nicht systematisch', score: 2 },
      { text: 'Ja, zentrale Datenbank / Cloud-L\u00f6sung', score: 3 },
      { text: 'Ja, mit Data Governance und klaren Verantwortlichkeiten', score: 4 },
    ],
  },
  {
    id: 203,
    category: 'daten',
    categoryLabel: 'Daten & Infrastruktur',
    question: 'Nutzen Sie Cloud-Services?',
    options: [
      { text: 'Nein, alles l\u00e4uft lokal / On-Premise', score: 1 },
      { text: 'Einzelne Cloud-Dienste (z.B. E-Mail, Speicher)', score: 2 },
      { text: 'Mehrere Cloud-Dienste im Einsatz', score: 3 },
      { text: 'Cloud-First-Strategie mit umfassender Nutzung', score: 4 },
    ],
  },
  {
    id: 204,
    category: 'daten',
    categoryLabel: 'Daten & Infrastruktur',
    question: 'Haben Ihre Systeme offene Schnittstellen (APIs)?',
    options: [
      { text: 'Keine Ahnung / Nein', score: 1 },
      { text: 'Einzelne Systeme haben APIs', score: 2 },
      { text: 'Die meisten Systeme sind \u00fcber APIs verbindbar', score: 3 },
      { text: 'Ja, wir nutzen APIs aktiv zur Systemintegration', score: 4 },
    ],
  },
  {
    id: 205,
    category: 'daten',
    categoryLabel: 'Daten & Infrastruktur',
    question: 'Wie ist Ihr IT-Sicherheitsniveau?',
    options: [
      { text: 'Grundlegend (Virenschutz, Firewall)', score: 1 },
      { text: 'Solide Basis mit regelm\u00e4\u00dfigen Updates', score: 2 },
      { text: 'Umfassendes Sicherheitskonzept vorhanden', score: 3 },
      { text: 'Zertifiziert (ISO 27001) oder gleichwertiges Niveau', score: 4 },
    ],
  },

  // === PROZESSE & AUTOMATISIERUNG ===
  {
    id: 301,
    category: 'prozesse',
    categoryLabel: 'Prozesse & Automatisierung',
    question: 'Sind Ihre Kernprozesse dokumentiert?',
    options: [
      { text: 'Nein, Wissen steckt in den K\u00f6pfen', score: 1 },
      { text: 'Teilweise dokumentiert', score: 2 },
      { text: 'Die wichtigsten Prozesse sind dokumentiert', score: 3 },
      { text: 'Ja, systematisch dokumentiert und optimiert', score: 4 },
    ],
  },
  {
    id: 302,
    category: 'prozesse',
    categoryLabel: 'Prozesse & Automatisierung',
    question: 'Nutzen Sie bereits Automatisierungstools (z.B. RPA, Workflows)?',
    options: [
      { text: 'Nein, keine Automatisierung', score: 1 },
      { text: 'Einfache Automatisierungen (z.B. E-Mail-Regeln)', score: 2 },
      { text: 'Einige automatisierte Workflows', score: 3 },
      { text: 'Umfassende Automatisierung mit professionellen Tools', score: 4 },
    ],
  },
  {
    id: 303,
    category: 'prozesse',
    categoryLabel: 'Prozesse & Automatisierung',
    question: 'In welchem Bereich sehen Sie das gr\u00f6\u00dfte KI-Potenzial?',
    options: [
      { text: 'Kundenservice / Kommunikation', score: 3 },
      { text: 'Verwaltung / Backoffice', score: 3 },
      { text: 'Marketing / Vertrieb', score: 3 },
      { text: 'Produktion / operative Prozesse', score: 3 },
    ],
  },
  {
    id: 304,
    category: 'prozesse',
    categoryLabel: 'Prozesse & Automatisierung',
    question: 'Wie viel Zeit verbringen Mitarbeitende mit repetitiven (sich wiederholenden) Aufgaben?',
    options: [
      { text: 'Das haben wir nie gemessen', score: 1 },
      { text: 'Gesch\u00e4tzt weniger als 20% der Arbeitszeit', score: 2 },
      { text: 'Gesch\u00e4tzt 20-40% der Arbeitszeit', score: 3 },
      { text: '\u00dcber 40% \u2013 hier liegt enormes Potenzial', score: 4 },
    ],
  },
  {
    id: 305,
    category: 'prozesse',
    categoryLabel: 'Prozesse & Automatisierung',
    question: 'Wie gehen Sie mit Kundendaten und -kommunikation um?',
    options: [
      { text: 'Manuell per E-Mail und Telefon, wenig Dokumentation', score: 1 },
      { text: 'Grundlegendes CRM oder Kontaktverwaltung', score: 2 },
      { text: 'Professionelles CRM mit Verlaufshistorie', score: 3 },
      { text: 'Umfassendes CRM mit Automatisierungen und Analytics', score: 4 },
    ],
  },

  // === KOMPETENZEN & KULTUR ===
  {
    id: 401,
    category: 'kompetenzen',
    categoryLabel: 'Kompetenzen & Kultur',
    question: 'Gibt es IT-Fachkr\u00e4fte oder technikaffine Mitarbeitende im Unternehmen?',
    options: [
      { text: 'Nein, IT wird komplett extern betreut', score: 1 },
      { text: 'Ein IT-Verantwortlicher / technikaffiner Mitarbeitender', score: 2 },
      { text: 'Kleine IT-Abteilung oder mehrere technikaffine Mitarbeitende', score: 3 },
      { text: 'Kompetentes IT-Team mit Innovationserfahrung', score: 4 },
    ],
  },
  {
    id: 402,
    category: 'kompetenzen',
    categoryLabel: 'Kompetenzen & Kultur',
    question: 'Gibt es Schulungsangebote f\u00fcr digitale Kompetenzen?',
    options: [
      { text: 'Nein, keine systematischen Schulungen', score: 1 },
      { text: 'Gelegentliche Schulungen bei Bedarf', score: 2 },
      { text: 'Regelm\u00e4\u00dfige Weiterbildung im Digitalbereich', score: 3 },
      { text: 'Umfassendes Schulungsprogramm inkl. KI-Themen', score: 4 },
    ],
  },
  {
    id: 403,
    category: 'kompetenzen',
    categoryLabel: 'Kompetenzen & Kultur',
    question: 'Wie w\u00fcrden Sie Ihre Unternehmenskultur in Bezug auf Innovation beschreiben?',
    options: [
      { text: 'Konservativ \u2013 bew\u00e4hrte Methoden werden bevorzugt', score: 1 },
      { text: 'Offen, aber vorsichtig bei Neuerungen', score: 2 },
      { text: 'Innovationsfreundlich mit Raum f\u00fcr Experimente', score: 3 },
      { text: 'Innovationsgetrieben mit agilen Arbeitsweisen', score: 4 },
    ],
  },
  {
    id: 404,
    category: 'kompetenzen',
    categoryLabel: 'Kompetenzen & Kultur',
    question: 'Gibt es einen \u201eKI-Champion\u201c oder Innovationstreiber im Unternehmen?',
    options: [
      { text: 'Nein, niemand treibt das Thema aktiv', score: 1 },
      { text: 'Einzelne interessierte Mitarbeitende', score: 2 },
      { text: 'Ja, es gibt informelle Treiber', score: 3 },
      { text: 'Ja, mit klarer Rolle und Mandat', score: 4 },
    ],
  },
  {
    id: 405,
    category: 'kompetenzen',
    categoryLabel: 'Kompetenzen & Kultur',
    question: 'Wie wird mit Fehlern und gescheiterten Projekten umgegangen?',
    options: [
      { text: 'Fehler werden vermieden und nicht thematisiert', score: 1 },
      { text: 'Fehler werden akzeptiert, aber nicht systematisch ausgewertet', score: 2 },
      { text: 'Es gibt eine offene Fehlerkultur', score: 3 },
      { text: '\u201eFail to Learn\u201c \u2013 Fehler sind Lernchancen', score: 4 },
    ],
  },

  // === GOVERNANCE & ETHIK ===
  {
    id: 501,
    category: 'governance',
    categoryLabel: 'Governance & Ethik',
    question: 'Wie gut ist Ihr Datenschutz aufgestellt?',
    options: [
      { text: 'Grundlegend \u2013 DSGVO-Anforderungen werden erf\u00fcllt', score: 2 },
      { text: 'Solide \u2013 Datenschutzbeauftragter und Prozesse vorhanden', score: 3 },
      { text: 'Umfassend \u2013 Datenschutz ist Teil der Unternehmenskultur', score: 4 },
      { text: 'Unklar \u2013 wir sind nicht sicher, wo wir stehen', score: 1 },
    ],
  },
  {
    id: 502,
    category: 'governance',
    categoryLabel: 'Governance & Ethik',
    question: 'Besch\u00e4ftigen Sie sich mit ethischen Aspekten von KI?',
    options: [
      { text: 'Nein, das ist kein Thema', score: 1 },
      { text: 'Am Rande, wenn es relevant wird', score: 2 },
      { text: 'Ja, wir ber\u00fccksichtigen ethische Aspekte bei Entscheidungen', score: 3 },
      { text: 'Ja, mit klaren Ethik-Leitlinien f\u00fcr KI-Einsatz', score: 4 },
    ],
  },
  {
    id: 503,
    category: 'governance',
    categoryLabel: 'Governance & Ethik',
    question: 'Kennen Sie den EU AI Act und seine Auswirkungen auf Ihr Unternehmen?',
    options: [
      { text: 'Nein, nie davon geh\u00f6rt', score: 1 },
      { text: 'Dem Namen nach, aber keine Details', score: 2 },
      { text: 'Ja, wir kennen die Grundz\u00fcge', score: 3 },
      { text: 'Ja, wir haben die Relevanz f\u00fcr unser Unternehmen gepr\u00fcft', score: 4 },
    ],
  },
  {
    id: 504,
    category: 'governance',
    categoryLabel: 'Governance & Ethik',
    question: 'Gibt es Verantwortlichkeiten f\u00fcr Datenqualit\u00e4t und -management?',
    options: [
      { text: 'Nein, keine klaren Verantwortlichkeiten', score: 1 },
      { text: 'Informell \u2013 jede Abteilung verwaltet eigene Daten', score: 2 },
      { text: 'Ja, es gibt definierte Verantwortliche', score: 3 },
      { text: 'Ja, mit Data Governance Framework', score: 4 },
    ],
  },
  {
    id: 505,
    category: 'governance',
    categoryLabel: 'Governance & Ethik',
    question: 'Wie w\u00fcrden Sie Ihr Vertrauen in KI-basierte Entscheidungen beschreiben?',
    options: [
      { text: 'Sehr skeptisch \u2013 KI-Entscheidungen werden nicht vertraut', score: 1 },
      { text: 'Vorsichtig \u2013 KI als Unterst\u00fctzung, nicht als Entscheider', score: 2 },
      { text: '\u00d6ffen \u2013 KI kann bei klar definierten Aufgaben entscheiden', score: 3 },
      { text: 'Proaktiv \u2013 KI-Entscheidungen werden in vielen Bereichen akzeptiert', score: 4 },
    ],
  },

  // === BRANCHE & UMFELD ===
  {
    id: 601,
    category: 'branche',
    categoryLabel: 'Branche & Marktumfeld',
    question: 'In welcher Branche ist Ihr Unternehmen t\u00e4tig?',
    options: [
      { text: 'Handwerk / Produktion', score: 2 },
      { text: 'Dienstleistung / Beratung', score: 3 },
      { text: 'Gesundheitswesen / Soziales', score: 2 },
      { text: 'Handel / E-Commerce / IT', score: 3 },
    ],
  },
  {
    id: 602,
    category: 'branche',
    categoryLabel: 'Branche & Marktumfeld',
    question: 'Wie viele Mitarbeitende hat Ihr Unternehmen?',
    options: [
      { text: '1-10 Mitarbeitende', score: 2 },
      { text: '11-50 Mitarbeitende', score: 3 },
      { text: '51-150 Mitarbeitende', score: 3 },
      { text: '\u00dcber 150 Mitarbeitende', score: 4 },
    ],
  },
  {
    id: 603,
    category: 'branche',
    categoryLabel: 'Branche & Marktumfeld',
    question: 'Sp\u00fcren Sie Fachkr\u00e4ftemangel in Ihrem Unternehmen?',
    options: [
      { text: 'Nein, kein Problem', score: 1 },
      { text: 'Leicht \u2013 einzelne Stellen sind schwer zu besetzen', score: 2 },
      { text: 'Deutlich \u2013 mehrere Bereiche sind betroffen', score: 3 },
      { text: 'Massiv \u2013 Fachkr\u00e4ftemangel ist eine existenzielle Herausforderung', score: 4 },
    ],
  },
  {
    id: 604,
    category: 'branche',
    categoryLabel: 'Branche & Marktumfeld',
    question: 'Haben Sie externe Partner f\u00fcr Digitalisierung/KI?',
    options: [
      { text: 'Nein, kein Netzwerk in dem Bereich', score: 1 },
      { text: 'IT-Dienstleister f\u00fcr Grundlagen', score: 2 },
      { text: 'Kontakte zu Digitalisierungsberatern', score: 3 },
      { text: 'Strategische Partnerschaften mit KI-/Tech-Anbietern', score: 4 },
    ],
  },
  {
    id: 605,
    category: 'branche',
    categoryLabel: 'Branche & Marktumfeld',
    question: 'Wie sch\u00e4tzen Sie den Digitalisierungsdruck in Ihrer Branche ein?',
    options: [
      { text: 'Gering \u2013 unsere Branche ist traditionell', score: 1 },
      { text: 'Moderat \u2013 Digitalisierung wird wichtiger', score: 2 },
      { text: 'Hoch \u2013 Wettbewerber digitalisieren bereits stark', score: 3 },
      { text: 'Sehr hoch \u2013 ohne Digitalisierung droht Marktrelevanz-Verlust', score: 4 },
    ],
  },
]

// Scoring und Auswertungslogik
export function calculateScore(answers, questions) {
  const maxScore = questions.length * 4
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)

  // Kategorie-Scores berechnen
  const categories = {}
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId)
    if (question) {
      if (!categories[question.category]) {
        categories[question.category] = { label: question.categoryLabel, scores: [], max: 0 }
      }
      categories[question.category].scores.push(answer.score)
      categories[question.category].max += 4
    }
  })

  const categoryScores = Object.entries(categories).map(([key, val]) => ({
    key,
    label: val.label,
    score: val.scores.reduce((a, b) => a + b, 0),
    max: val.max,
    percentage: Math.round((val.scores.reduce((a, b) => a + b, 0) / val.max) * 100),
  }))

  // Level-Einordnung
  let level, levelTitle, levelDescription, levelColor

  if (percentage <= 25) {
    level = 1
    levelTitle = 'Einsteiger'
    levelDescription =
      'Ihr Unternehmen steht am Anfang der KI-Reise. Das ist kein Nachteil \u2013 Sie haben die Chance, von Anfang an richtig vorzugehen. Fokussieren Sie sich zun\u00e4chst auf AI Awareness: Schulen Sie sich und Ihr Team, schaffen Sie ein Grundverst\u00e4ndnis und identifizieren Sie erste Anwendungsf\u00e4lle.'
    levelColor = '#ef4444'
  } else if (percentage <= 50) {
    level = 2
    levelTitle = 'Entdecker'
    levelDescription =
      'Sie haben bereits erste Schritte gemacht und ein Grundverst\u00e4ndnis aufgebaut. Jetzt ist es Zeit, systematisch vorzugehen: Analysieren Sie Ihre Daten, identifizieren Sie Quick-Wins und starten Sie mit Low-Code/No-Code L\u00f6sungen (Level 1-2).'
    levelColor = '#f59e0b'
  } else if (percentage <= 75) {
    level = 3
    levelTitle = 'Fortgeschritten'
    levelDescription =
      'Ihr Unternehmen hat eine solide Basis f\u00fcr KI geschaffen. Sie k\u00f6nnen nun gezielt in anspruchsvollere L\u00f6sungen investieren: API-Integrationen, spezialisierte KI-Tools und systematisches Change Management stehen im Fokus.'
    levelColor = '#3b82f6'
  } else {
    level = 4
    levelTitle = 'Vorreiter'
    levelDescription =
      'Ihr Unternehmen ist hervorragend auf KI vorbereitet. Nutzen Sie Ihren Vorsprung: Entwickeln Sie eigene KI-L\u00f6sungen, skalieren Sie erfolgreiche Pilotprojekte und positionieren Sie sich als Innovationsf\u00fchrer in Ihrer Branche.'
    levelColor = '#22c55e'
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    levelTitle,
    levelDescription,
    levelColor,
    categoryScores,
  }
}

// Empfehlungen basierend auf Kategorie-Scores
export function getRecommendations(categoryScores, level) {
  const recommendations = []

  categoryScores.forEach((cat) => {
    if (cat.percentage <= 40) {
      switch (cat.key) {
        case 'awareness':
          recommendations.push({
            priority: 'hoch',
            category: cat.label,
            title: 'KI-Bewusstsein aufbauen',
            actions: [
              'F\u00fchren Sie eine KI-Awareness-Schulung f\u00fcr alle Mitarbeitenden durch',
              'Erstellen Sie eine KI-Richtlinie als \u201edigitale Hausordnung\u201c',
              'Informieren Sie sich \u00fcber den EU AI Act und DSGVO-Anforderungen',
              'Starten Sie mit kostenlosen KI-Tools (ChatGPT, Microsoft Copilot) zum Ausprobieren',
            ],
          })
          break
        case 'readiness':
          recommendations.push({
            priority: 'hoch',
            category: cat.label,
            title: 'Digitale Grundlagen st\u00e4rken',
            actions: [
              'Digitalisieren und zentralisieren Sie Ihre Gesch\u00e4ftsdaten',
              'F\u00fchren Sie ein CRM-System oder ERP-System ein',
              'Pr\u00fcfen Sie Cloud-L\u00f6sungen f\u00fcr flexible Infrastruktur',
              'Identifizieren und dokumentieren Sie repetitive Prozesse',
            ],
          })
          break
        case 'steadiness':
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: 'Nachhaltigkeit sichern',
            actions: [
              'Etablieren Sie ein Innovationsteam oder benennen Sie KI-Champions',
              'Schaffen Sie Freiräume f\u00fcr Mitarbeitende zur Weiterbildung',
              'Entwickeln Sie eine Fehlerkultur (\u201eFail to Learn\u201c)',
              'Planen Sie Quick-Win-Projekte, um fr\u00fch Erfolge zu erzielen',
            ],
          })
          break
        case 'strategie':
          recommendations.push({
            priority: 'hoch',
            category: cat.label,
            title: 'KI-Strategie entwickeln',
            actions: [
              'Integrieren Sie KI in Ihre Unternehmensstrategie',
              'F\u00fchren Sie eine Wettbewerbsanalyse zu KI-Aktivit\u00e4ten durch',
              'Erstellen Sie ein KI-Strategie-Canvas mit Zielen und Ma\u00dfnahmen',
              'Definieren Sie ein Budget und pr\u00fcfen Sie F\u00f6rderprogramme (go-digital, EFRE)',
            ],
          })
          break
        case 'daten':
          recommendations.push({
            priority: 'hoch',
            category: cat.label,
            title: 'Datengrundlage verbessern',
            actions: [
              'F\u00fchren Sie ein Daten-Audit durch: Welche Daten haben Sie, wo und in welcher Qualit\u00e4t?',
              'Definieren Sie Verantwortlichkeiten f\u00fcr Datenqualit\u00e4t',
              'Investieren Sie in Cloud-Infrastruktur und API-f\u00e4hige Systeme',
              'Entwickeln Sie eine Datenstrategie mit dem Datenkompass f\u00fcr KMU',
            ],
          })
          break
        case 'prozesse':
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: 'Prozesse automatisieren',
            actions: [
              'Dokumentieren Sie Ihre Kernprozesse systematisch',
              'Identifizieren Sie die Top-5 Prozesse mit dem h\u00f6chsten Automatisierungspotenzial',
              'Starten Sie mit Low-Code Automatisierung (Microsoft Power Automate, Make.com)',
              'Implementieren Sie ein professionelles CRM mit Workflow-Automatisierung',
            ],
          })
          break
        case 'kompetenzen':
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: 'Kompetenzen aufbauen',
            actions: [
              'Investieren Sie in KI-Schulungen f\u00fcr Mitarbeitende',
              'Benennen Sie KI-Champions als interne Ansprechpartner',
              'F\u00f6rdern Sie eine innovationsfreundliche Unternehmenskultur',
              'Schaffen Sie Raum f\u00fcr Experimente und Pilotprojekte',
            ],
          })
          break
        case 'governance':
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: 'Governance aufbauen',
            actions: [
              'Erstellen Sie eine KI-Richtlinie f\u00fcr Ihr Unternehmen',
              'Pr\u00fcfen Sie Ihre DSGVO-Konformit\u00e4t im Kontext von KI',
              'Informieren Sie sich \u00fcber den EU AI Act',
              'Etablieren Sie ethische Leitlinien f\u00fcr den KI-Einsatz',
            ],
          })
          break
      }
    } else if (cat.percentage <= 70) {
      // Moderate recommendations for medium scores
      switch (cat.key) {
        case 'awareness':
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: 'KI-Wissen vertiefen',
            actions: [
              'Vertiefen Sie das KI-Wissen durch praxisnahe Workshops',
              'Testen Sie konkrete KI-Tools in Pilotbereichen',
              '\u00dcberpr\u00fcfen und aktualisieren Sie Ihre KI-Richtlinie regelm\u00e4\u00dfig',
            ],
          })
          break
        default:
          recommendations.push({
            priority: 'mittel',
            category: cat.label,
            title: `${cat.label} weiter optimieren`,
            actions: [
              `Bauen Sie Ihre St\u00e4rken im Bereich ${cat.label} weiter aus`,
              'Identifizieren Sie Quick-Wins f\u00fcr schnelle Fortschritte',
              'Setzen Sie klare KPIs und messen Sie den Fortschritt',
            ],
          })
      }
    }
  })

  // Sortiere nach Priorit\u00e4t
  recommendations.sort((a, b) => {
    const order = { hoch: 0, mittel: 1, niedrig: 2 }
    return order[a.priority] - order[b.priority]
  })

  return recommendations
}

// Quick-Wins basierend auf Level
export function getQuickWins(level) {
  const quickWins = {
    1: [
      { title: 'ChatGPT oder Microsoft Copilot ausprobieren', desc: 'Starten Sie kostenlos mit KI-Assistenten f\u00fcr Textarbeit, E-Mails und Recherche.', effort: 'Sofort umsetzbar' },
      { title: 'KI-Awareness Meeting', desc: 'Organisieren Sie ein 1-st\u00fcndiges Team-Meeting zum Thema \u201eWas ist KI und was kann sie f\u00fcr uns tun?\u201c', effort: '1 Stunde' },
      { title: 'Prozesse auflisten', desc: 'Erstellen Sie eine einfache Liste aller regelm\u00e4\u00dfig wiederkehrenden Aufgaben in Ihrem Unternehmen.', effort: '2-3 Stunden' },
    ],
    2: [
      { title: 'KI-Textassistent einf\u00fchren', desc: 'Nutzen Sie KI f\u00fcr E-Mails, Angebote und Dokumentation. ROI: 5-10 Std./Woche Zeitersparnis.', effort: '1 Tag Einrichtung' },
      { title: 'Daten zentralisieren', desc: 'F\u00fchren Sie verstreute Daten in einem zentralen System (CRM/Cloud) zusammen.', effort: '1-2 Wochen' },
      { title: 'Automatisierung starten', desc: 'Automatisieren Sie einen einfachen Prozess mit Microsoft Power Automate oder Make.com.', effort: '1 Woche' },
    ],
    3: [
      { title: 'KI-Chatbot f\u00fcr Kundenservice', desc: 'Implementieren Sie einen KI-Chatbot f\u00fcr h\u00e4ufig gestellte Fragen auf Ihrer Website.', effort: '2-4 Wochen' },
      { title: 'KI-gest\u00fctzte Datenanalyse', desc: 'Nutzen Sie KI-Tools (Power BI + Copilot) f\u00fcr automatisierte Gesch\u00e4ftsberichte.', effort: '2-3 Wochen' },
      { title: 'Prozessautomatisierung skalieren', desc: 'Erweitern Sie Automatisierungen auf 3-5 weitere Kernprozesse.', effort: '1-2 Monate' },
    ],
    4: [
      { title: 'Eigene KI-Modelle evaluieren', desc: 'Pr\u00fcfen Sie, ob spezialisierte KI-Modelle (fine-tuned) f\u00fcr Ihren Use-Case sinnvoll sind.', effort: '1-2 Monate' },
      { title: 'KI-Strategie formalisieren', desc: 'Erstellen Sie eine umfassende KI-Strategie mit Roadmap, KPIs und Governance-Framework.', effort: '2-3 Monate' },
      { title: 'Innovationslabor einrichten', desc: 'Schaffen Sie einen Raum f\u00fcr systematische KI-Experimente und Prototypen.', effort: 'Fortlaufend' },
    ],
  }
  return quickWins[level] || quickWins[1]
}

// F\u00f6rderprogramme
export const foerderprogramme = [
  {
    name: 'go-digital',
    beschreibung: 'F\u00f6rderprogramm des BMWi f\u00fcr Digitalisierung in KMU. Bis zu 50% F\u00f6rderung f\u00fcr Beratungsleistungen.',
    betrag: 'Bis 16.500\u20ac',
    link: 'https://www.bmwk.de/go-digital',
  },
  {
    name: 'Digital Jetzt',
    beschreibung: 'Investitionsf\u00f6rderung f\u00fcr digitale Technologien und Qualifizierung.',
    betrag: 'Bis 50.000\u20ac',
    link: 'https://www.bmwk.de/digital-jetzt',
  },
  {
    name: 'Innovationsgutscheine',
    beschreibung: 'L\u00e4nderspezifische F\u00f6rderung f\u00fcr innovative Projekte in KMU.',
    betrag: 'Variiert nach Bundesland',
    link: '',
  },
  {
    name: 'ESF/EFRE-F\u00f6rderung',
    beschreibung: 'EU-F\u00f6rderprogramme f\u00fcr Digitalisierung und Qualifizierung in Mitteldeutschland.',
    betrag: 'Projektabh\u00e4ngig',
    link: '',
  },
  {
    name: 'BAFA-Unternehmensberatung',
    beschreibung: 'F\u00f6rderung f\u00fcr Unternehmensberatung durch das BAFA. Bis 80% Zuschuss in neuen Bundesl\u00e4ndern.',
    betrag: 'Bis 3.200\u20ac',
    link: 'https://www.bafa.de/unternehmensberatung',
  },
]
