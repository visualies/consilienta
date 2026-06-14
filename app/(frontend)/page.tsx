import { getPayload } from 'payload'
import config from '../../payload.config'
import { BlockRenderer } from '@/components/blocks'
import { notFound } from 'next/navigation'
import { getGlobals } from '@/lib/get-globals'

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

export async function generateMetadata() {
  const pageData = await getHomePageData()
  
  if (!pageData) {
    return {
      title: 'Consilienta - Biopharma Consulting Excellence',
      description: 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
    }
  }

  return {
    title: pageData.meta?.title || pageData.title || 'Consilienta - Biopharma Consulting Excellence',
    description: pageData.meta?.description || 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
    ...(pageData.meta?.image && {
      openGraph: {
        images: [
          {
            url: pageData.meta.image.url,
            alt: pageData.meta.image.alt,
          },
        ],
      },
    }),
  }
}


export default async function ConsilientsLanding() {
  const [pageData, globalsData] = await Promise.all([
    getHomePageData(),
    getGlobals(),
  ])

  if (!pageData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer blocks={pageData.layout} homepageAnnouncement={globalsData?.homepageAnnouncement} />
    </div>
  )
}
