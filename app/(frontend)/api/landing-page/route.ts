import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '../../../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const landingPage = await payload.find({
      collection: 'landing-page',
      limit: 1,
    })

    if (!landingPage.docs.length) {
      return NextResponse.json(
        { error: 'No landing page found' },
        { status: 404 }
      )
    }

    return NextResponse.json(landingPage.docs[0])
  } catch (error) {
    console.error('Error fetching landing page:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}