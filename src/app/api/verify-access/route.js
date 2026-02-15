import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { rateLimit } from '../../../lib/rate-limit'
import crypto from 'crypto'

const limiter = rateLimit({ maxRequests: 5, windowMs: 60 * 1000 })

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, bufA)
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Versuche.' }, { status: 429 })
    }

    const { code } = await request.json()

    if (!code || typeof code !== 'string' || code.length > 100) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const trimmedCode = code.trim()
    let matchedCustomer = null

    for (const customer of customers) {
      if (constantTimeEqual(customer.code, trimmedCode)) {
        matchedCustomer = customer
      }
    }

    if (!matchedCustomer) {
      return NextResponse.json({ valid: false })
    }

    // Ablaufdatum prüfen
    if (matchedCustomer.expiresAt) {
      const expiryDate = new Date(matchedCustomer.expiresAt)
      if (expiryDate < new Date()) {
        return NextResponse.json({
          valid: false,
          expired: true,
          message: 'Ihr Zugangscode ist abgelaufen. Bitte kontaktieren Sie uns für eine Verlängerung: steffenhefter@googlemail.com',
        })
      }
    }

    return NextResponse.json({
      valid: true,
      name: matchedCustomer.name,
      email: matchedCustomer.email,
      company: matchedCustomer.company,
      plan: matchedCustomer.plan,
    })
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
