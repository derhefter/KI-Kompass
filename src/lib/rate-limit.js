// Einfaches In-Memory Rate-Limiting
// Begrenzt Anfragen pro IP-Adresse auf maxRequests pro windowMs

const requests = new Map()

// Automatische Bereinigung alle 10 Minuten
setInterval(() => {
  const now = Date.now()
  for (const [key, data] of requests) {
    if (now - data.start > data.windowMs * 2) {
      requests.delete(key)
    }
  }
}, 10 * 60 * 1000)

export function rateLimit({ maxRequests = 5, windowMs = 60 * 1000 } = {}) {
  return function check(request) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const key = `${ip}`
    const now = Date.now()
    const record = requests.get(key)

    if (!record || now - record.start > windowMs) {
      requests.set(key, { count: 1, start: now, windowMs })
      return { allowed: true }
    }

    record.count++
    if (record.count > maxRequests) {
      return { allowed: false }
    }

    return { allowed: true }
  }
}
