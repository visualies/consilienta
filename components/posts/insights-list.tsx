"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  formatDate,
  formatEventDateTime,
  getImage,
  getPostTypeLabel,
  getPostUrl,
  isEvent,
  sortPostsForInsights,
  type PostSummary,
  type PostType,
} from "@/lib/posts"

type FilterValue = 'all' | PostType

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: 'All', value: 'all' },
  { label: 'News', value: 'news' },
  { label: 'Insights', value: 'insight' },
]

function PostImage({ post }: { post: PostSummary }) {
  const image = getImage(post.featuredImage)

  if (!image?.url) {
    return null
  }

  return (
    <Image
      src={image.url}
      alt={image.alt || post.title || ''}
      width={image.width || 900}
      height={image.height || 600}
      className="h-full w-full object-cover"
    />
  )
}

function PostMeta({ post }: { post: PostSummary }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs leading-relaxed text-gray-600">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" />
        {isEvent(post) ? formatEventDateTime(post.eventStartAt, post.eventEndAt) : formatDate(post.publishedAt)}
      </span>
      {isEvent(post) && post.eventLocation && (
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {post.eventLocation}
        </span>
      )}
    </div>
  )
}

function PostCard({ post }: { post: PostSummary }) {
  const image = getImage(post.featuredImage)
  const hasImage = !!image?.url

  return (
    <Card className="h-full overflow-hidden border-0 bg-white shadow-md outline outline-1 outline-white/30">
      {hasImage && (
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <PostImage post={post} />
        </div>
      )}
      <CardContent className={`flex flex-col ${hasImage ? 'p-5' : 'p-4'}`}>
        <Badge className="mb-2.5 w-fit border-0 bg-brand px-2.5 py-0.5 text-xs text-white">{getPostTypeLabel(post)}</Badge>
        <h2 className={`${hasImage ? 'text-xl' : 'text-lg'} mb-2 font-serif font-normal leading-snug text-gray-900`}>
          {post.title}
        </h2>
        <p className={`${hasImage ? 'line-clamp-3' : 'line-clamp-2'} mb-3 text-sm leading-relaxed text-gray-600`}>
          {post.excerpt}
        </p>
        <div className="space-y-2.5">
          <PostMeta post={post} />
          <Link href={getPostUrl(post.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover">
            {isEvent(post) ? 'View event' : 'Read more'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

interface InsightsListProps {
  posts: PostSummary[]
  title?: string
  intro?: string
  showFilters?: boolean
}

export function InsightsList({
  posts,
  title = 'Insights & News',
  intro,
  showFilters = true,
}: InsightsListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')
  const sortedPosts = useMemo(() => sortPostsForInsights(posts), [posts])
  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedPosts
    }

    if (activeFilter === 'news') {
      return sortedPosts.filter((post) => post.postType === 'news' || post.postType === 'event')
    }

    return sortedPosts.filter((post) => post.postType === 'insight')
  }, [activeFilter, sortedPosts])

  return (
    <>
      <section className="px-6 pb-6 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-serif font-medium leading-tight text-white lg:text-5xl">
              {title}
            </h1>
            {intro?.trim() && (
              <p className="max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
                {intro}
              </p>
            )}
          </div>
        </div>
      </section>

      {showFilters && (
        <section className="px-6 pb-6">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-white text-brand'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="w-fit rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow-md">
              No posts match this filter yet.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
