import { getPayload } from 'payload'
import config from '../../../payload.config'
import { BlockRenderer } from '@/components/blocks'
import { notFound } from 'next/navigation'

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

async function getPageData(slug: string): Promise<PageData | null> {
  try {
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
      return null
    }

    return page.docs[0] as PageData
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const pageData = await getPageData(slug)
  
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


export default async function DynamicPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const page = await getPageData(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}
