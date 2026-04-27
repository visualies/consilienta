import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const CONTACT_FORM_WEBHOOK_URL = process.env.CONTACT_FORM_WEBHOOK_URL

async function notifyContactWebhook(submission: {
  id: string | number
  submittedAt: Date
}) {
  if (!CONTACT_FORM_WEBHOOK_URL) {
    return
  }

  const text = `New contact form submission received at ${submission.submittedAt.toISOString()}.`

  try {
    const response = await fetch(CONTACT_FORM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        content: text,
        event: 'contact_form_submission',
        source: 'consilienta-contact-form',
        submissionId: submission.id,
        submittedAt: submission.submittedAt.toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      throw new Error(`Webhook responded with status ${response.status}`)
    }
  } catch (error) {
    console.error('Error sending contact webhook notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received form data:', body)
    const { firstName, lastName, title, email, company, phone, service, message } = body
    console.log('Extracted title:', title)

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Save to database
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        firstName,
        lastName,
        title: title || '',
        email,
        company: company || '',
        phone: phone || '',
        service: service || 'other',
        message,
        submittedAt: new Date(),
        status: 'new',
      },
    })

    console.log('Contact form submission saved:', submission.id)

    await notifyContactWebhook({
      id: submission.id,
      submittedAt: new Date(submission.submittedAt || new Date()),
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
