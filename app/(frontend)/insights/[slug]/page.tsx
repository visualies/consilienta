import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import RichText from '@/components/ui/rich-text'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  absoluteUrl,
  formatDate,
  formatEventDateTime,
  getImage,
  getPostTypeLabel,
  getPostUrl,
  isEvent,
  isPastEvent,
  type PostSummary,
} from '@/lib/posts'
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, Ticket } from 'lucide-react'
import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const richTextClasses = `
  [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:text-gray-900
  [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-normal [&_h3]:text-gray-900
  [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-700
  [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
  [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5
  [&_li]:text-gray-700
  [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2
`

async function getPost(slug: string): Promise<PostSummary | null> {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts' as never,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  return (posts.docs[0] as PostSummary) || null
}

async function getRelatedPosts(currentPost: PostSummary): Promise<PostSummary[]> {
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
        {
          slug: {
            not_equals: currentPost.slug,
          },
        },
      ],
    },
    depth: 1,
    limit: 3,
    sort: '-publishedAt',
  })

  return posts.docs as PostSummary[]
}

function isPublicPost(post: PostSummary | null): post is PostSummary {
  return !!post && post.status === 'published' && !post.noIndex
}

function FeaturedImage({ post }: { post: PostSummary }) {
  const image = getImage(post.featuredImage)

  if (!image?.url) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-xl">
      <Image
        src={image.url}
        alt={image.alt || post.title || ''}
        width={image.width || 1200}
        height={image.height || 720}
        className="h-auto w-full object-cover"
        priority
      />
    </div>
  )
}

function PrimaryRegistrationLink({ post, className = '' }: { post: PostSummary; className?: string }) {
  if (!post.registrationUrl) {
    return null
  }

  return (
    <Link
      href={post.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-colors hover:bg-brand-hover ${className}`}
    >
      Register
      <ExternalLink className="ml-2 h-4 w-4" />
    </Link>
  )
}

function JsonLd({ post }: { post: PostSummary }) {
  const image = getImage(post.seoImage) || getImage(post.featuredImage)
  const canonical = absoluteUrl(getPostUrl(post.slug))
  const imageUrl = absoluteUrl(image?.url)
  const description = post.metaDescription || post.excerpt || ''

  const jsonLd = isEvent(post)
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: post.title,
        description,
        startDate: post.eventStartAt,
        endDate: post.eventEndAt,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: post.eventLocation,
          address: post.eventLocation,
        },
        organizer: [
          { '@type': 'Organization', name: 'Consilienta', url: absoluteUrl('/') },
          { '@type': 'Organization', name: 'Catalent' },
          { '@type': 'Organization', name: 'BioM' },
        ],
        ...(imageUrl && { image: [imageUrl] }),
        offers: {
          '@type': 'Offer',
          url: post.registrationUrl,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
        url: canonical,
      }
    : {
        '@context': 'https://schema.org',
        '@type': post.postType === 'news' ? 'Article' : 'BlogPosting',
        headline: post.title,
        description,
        ...(imageUrl && { image: [imageUrl] }),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Organization',
          name: 'Consilienta',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Consilienta',
        },
        mainEntityOfPage: canonical,
      }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function EventDetails({ post }: { post: PostSummary }) {
  return (
    <Card className="border-0 bg-white shadow-lg ring-1 ring-black/5">
      <CardContent className="space-y-6 p-5 sm:p-6">
        <div>
          <h2 className="font-serif text-2xl font-normal leading-tight text-gray-950">Registration</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Secure your place through Eventbrite.
          </p>
        </div>
        <PrimaryRegistrationLink post={post} className="w-full" />
        <div className="h-px bg-gray-200" />
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand">
            <CalendarDays className="h-4 w-4" />
            Date and time
          </div>
          <p className="text-gray-800">{formatEventDateTime(post.eventStartAt, post.eventEndAt)}</p>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand">
            <MapPin className="h-4 w-4" />
            Location
          </div>
          <p className="text-gray-800">{post.eventLocation}</p>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand">
            <Ticket className="h-4 w-4" />
            Participation
          </div>
          <p className="text-gray-800">Free of charge</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-brand">Organizers</p>
          <p className="text-gray-800">Consilienta and Catalent, hosted at BioM</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MobileRegistrationBar({ post }: { post: PostSummary }) {
  if (!post.registrationUrl) {
    return null
  }

  const summary = [
    formatEventDateTime(post.eventStartAt, post.eventEndAt),
    post.eventLocation,
  ].filter(Boolean).join(' · ')

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-12px_30px_rgba(0,0,0,0.14)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Workshop</p>
          {summary && <p className="truncate text-sm font-medium text-gray-950">{summary}</p>}
        </div>
        <PrimaryRegistrationLink post={post} className="shrink-0 px-4" />
      </div>
    </div>
  )
}

function EventPage({ post, relatedPosts }: { post: PostSummary; relatedPosts: PostSummary[] }) {
  return (
    <>
      <JsonLd post={post} />
      <article className="pb-24 lg:pb-0">
        <section className="px-5 pb-8 pt-8 sm:px-6 lg:pb-12 lg:pt-12">
          <div className="mx-auto max-w-6xl">
            <Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Insights & News
            </Link>

            <div className="max-w-4xl space-y-6">
              <Badge className="border-0 bg-white/15 px-3 py-1 text-white">
                {isPastEvent(post) ? 'Past event' : 'Workshop'}
              </Badge>
              <div className="space-y-5">
                <h1 className="text-4xl font-serif font-medium leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">{post.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <aside className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start">
              <EventDetails post={post} />
            </aside>

            <div className="order-2 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 lg:order-1">
              <div className="border-b border-gray-200 px-5 py-5 sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Workshop details</p>
              </div>
              <div className="p-5 sm:p-8 lg:p-10">
                {Boolean(post.content) && (
                  <RichText
                    data={post.content as DefaultTypedEditorState}
                    className={richTextClasses}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </article>

      <MobileRegistrationBar post={post} />
      <RelatedPosts posts={relatedPosts} />
    </>
  )
}

function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) {
    return null
  }

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-3xl font-serif font-normal text-white">Related posts</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={getPostUrl(post.slug)}
              className="rounded-lg bg-white p-5 shadow-lg transition-transform hover:-translate-y-1"
            >
              <Badge className="mb-4 border-0 bg-brand text-white">{getPostTypeLabel(post)}</Badge>
              <h3 className="mb-3 font-serif text-lg font-normal leading-snug text-gray-900">{post.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Insights & News | Consilienta',
    }
  }

  const image = getImage(post.seoImage) || getImage(post.featuredImage)
  const title = post.metaTitle || post.title || 'Insights & News | Consilienta'
  const description = post.metaDescription || post.excerpt || ''
  const canonical = getPostUrl(post.slug)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: post.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type: isEvent(post) ? 'website' : 'article',
      title,
      description,
      url: canonical,
      ...(image?.url && {
        images: [
          {
            url: absoluteUrl(image.url),
            alt: image.alt || post.title || '',
          },
        ],
      }),
    },
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!isPublicPost(post)) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post)
  const eventPost = isEvent(post)

  if (eventPost) {
    return <EventPage post={post} relatedPosts={relatedPosts} />
  }

  return (
    <>
      <JsonLd post={post} />
      <article>
        <section className="px-6 pb-10 pt-10">
          <div className="mx-auto max-w-5xl">
            <Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Insights & News
            </Link>
            <div className="space-y-5">
              <Badge className="border-0 bg-white/15 text-white">{getPostTypeLabel(post)}</Badge>
              <h1 className="max-w-4xl text-4xl font-serif font-medium leading-tight text-white lg:text-6xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="max-w-3xl text-xl leading-relaxed text-white/85">{post.excerpt}</p>
              )}
              {!eventPost && post.publishedAt && (
                <p className="text-sm font-medium text-white/70">{formatDate(post.publishedAt)}</p>
              )}
            </div>
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl">
            <FeaturedImage post={post} />
          </div>
        </section>

        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg lg:p-10">
            {Boolean(post.content) && (
              <RichText
                data={post.content as DefaultTypedEditorState}
                className={richTextClasses}
              />
            )}
            </div>
        </section>
      </article>

      <RelatedPosts posts={relatedPosts} />
    </>
  )
}
