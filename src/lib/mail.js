import nodemailer from 'nodemailer'

let transporterInstance = null

function getTransporter() {
  if (!transporterInstance) {
    const host = process.env.EMAIL_HOST
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !user || !pass || pass === 'DEIN_16_STELLIGES_APP_PASSWORT') {
      return null
    }

    transporterInstance = nodemailer.createTransport({
      host,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: { user, pass },
    })
  }
  return transporterInstance
}

// E-Mail an Steffen senden (Benachrichtigung bei neuem Lead / Kaufanfrage)
export async function sendNotificationToOwner({ subject, html }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('E-Mail nicht konfiguriert – Nachricht konnte nicht gesendet werden')
    return false
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
      subject,
      html,
    })
    return true
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err.message)
    return false
  }
}

// Bestätigungsmail an den Kunden senden
export async function sendConfirmationToCustomer({ to, subject, html }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('E-Mail nicht konfiguriert – Bestätigung konnte nicht gesendet werden')
    return false
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
      subject,
      html,
    })
    return true
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err.message)
    return false
  }
}
