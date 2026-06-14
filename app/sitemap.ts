import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '../payload.config'
import { getSiteUrl, type PostSummary } from '@/lib/posts'

export const dynamic = 'force-dynamic'

type PageDoc = {
  slug?: string
  updatedAt?: string
}

function pagePath(slug?: string) {
  if (!slug || slug === 'home' || slug === '/') {
    return '/'
  }

  return `/${slug.replace(/^\/+/, '')}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const payload = await getPayload({ config })

  const [pages, posts] = await Promise.all([
    payload.find({
      collection: 'pages' as never,
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    }),
    payload.find({
      collection: 'posts' as never,
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            noIndex: {
              not_equals: true,
            },
          },
        ],
      },
      limit: 1000,
    }),
  ])

  const pageUrls = (pages.docs as PageDoc[]).map((page) => ({
    url: `${baseUrl}${pagePath(page.slug)}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: pagePath(page.slug) === '/' ? 1 : 0.7,
  }))

  const staticUrls = [
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  const postUrls = (posts.docs as PostSummary[])
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  const deduped = new Map<string, MetadataRoute.Sitemap[number]>()
  ;[...pageUrls, ...staticUrls, ...postUrls].forEach((entry) => {
    deduped.set(entry.url, entry)
  })

  return Array.from(deduped.values())
}
