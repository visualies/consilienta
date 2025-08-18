import { getPayload } from 'payload'
import config from '../../payload.config'
import { BlockRenderer } from '@/components/blocks'
import { notFound } from 'next/navigation'

// Disable caching for test environment
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageData {
  id: string
  title: string
  slug: string
  meta?: {
    title?: string
    description?: string
    image?: {
      url: string
      alt: string
    }
  }
  layout: Array<{
    blockType: string
    [key: string]: any
  }>
  publishedAt?: string
  status: 'draft' | 'published'
}

async function getHomePageData(): Promise<PageData | null> {
  try {
    const payload = await getPayload({ config })
    
    const page = await payload.find({
      collection: 'pages',
      where: {
        or: [
          {
            slug: {
              equals: 'home',
            },
          },
          {
            slug: {
              equals: '/',
            },
          },
        ],
      },
      limit: 1,
    })

    if (!page.docs.length) {
      return null
    }

    return page.docs[0] as PageData
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

export default async function ConsilientsLanding() {
  const pageData = await getHomePageData()

  if (!pageData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer blocks={pageData.layout} />
    </div>
  )
}
