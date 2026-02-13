import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 10, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Versuche.' }, { status: 429 })
    }

    const { code } = await request.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const customer = customers.find(
      (c) => c.code === code.trim()
    )

    if (!customer) {
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({
      valid: true,
      name: customer.name,
      email: customer.email,
      company: customer.company,
      plan: customer.plan,
    })
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
