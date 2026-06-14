import { getPayload } from 'payload'
import config from '../../../payload.config'
import { BlockRenderer } from '@/components/blocks'
import { InsightsList } from '@/components/posts/insights-list'
import { INSIGHTS_DESCRIPTION, sortPostsForInsights, type PostSummary } from '@/lib/posts'

interface PageData {
  layout?: Array<{
    blockType: string
    [key: string]: unknown
  }>
}

async function getPublishedPosts(): Promise<PostSummary[]> {
  const payload = await getPayload({ config })
  const posts = await payload.find({
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
    depth: 1,
    limit: 100,
  })

  return sortPostsForInsights(posts.docs as PostSummary[])
}

async function getInsightsPage(): Promise<PageData | null> {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages' as never,
    where: {
      slug: {
        equals: 'insights',
      },
    },
    depth: 1,
    limit: 1,
  })

  return (page.docs[0] as PageData) || null
}

export const metadata = {
  title: 'Insights & News | Consilienta',
  description: INSIGHTS_DESCRIPTION,
  alternates: {
    canonical: '/insights',
  },
  openGraph: {
    type: 'website',
    title: 'Insights & News | Consilienta',
    description: INSIGHTS_DESCRIPTION,
    url: '/insights',
  },
}

export default async function InsightsPage() {
  const [posts, page] = await Promise.all([getPublishedPosts(), getInsightsPage()])

  if (page?.layout?.some((block) => block.blockType === 'postsArchive')) {
    return <BlockRenderer blocks={page.layout} posts={posts} />
  }

  return <InsightsList posts={posts} />
}
