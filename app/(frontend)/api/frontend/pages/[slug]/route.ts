import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '../../../../../../payload.config'

// Disable caching for test environment
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayload({ config })
    
    const page = await payload.find({
      collection: 'pages',
      where: {
        or: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            slug: {
              equals: `/${slug}`,
            },
          },
        ],
      },
      limit: 1,
    })

    if (!page.docs.length) {
      return NextResponse.json(
        { error: `Page with slug "${slug}" not found` },
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