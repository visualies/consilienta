import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '../../../../../payload.config'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const payload = await getPayload({ config })
    
    const page = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: params.slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    if (!page.docs.length) {
      return NextResponse.json(
        { error: `Page with slug "${params.slug}" not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(page.docs[0])
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}