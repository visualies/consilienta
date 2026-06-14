export type PostType = 'insight' | 'news' | 'event'

export interface MediaImage {
  url?: string
  alt?: string
  width?: number
  height?: number
}

export interface PostSummary {
  id: string
  title?: string
  slug?: string
  excerpt?: string
  postType?: PostType
  status?: 'draft' | 'published'
  publishedAt?: string
  eventStartAt?: string
  eventEndAt?: string
  eventLocation?: string
  registrationUrl?: string
  featuredImage?: MediaImage | number | string
  seoImage?: MediaImage | number | string
  metaTitle?: string
  metaDescription?: string
  noIndex?: boolean
  updatedAt?: string
  createdAt?: string
  content?: unknown
}

export const INSIGHTS_DESCRIPTION =
  'Read Consilienta insights and company news on biopharma development, regulatory strategy, and the path from concept to approval.'

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://consilienta.com'

  try {
    return new URL(rawUrl).origin
  } catch {
    return 'https://consilienta.com'
  }
}

export function absoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) {
    return undefined
  }

  try {
    return new URL(pathOrUrl).toString()
  } catch {
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
    return new URL(path, getSiteUrl()).toString()
  }
}

export function getPostUrl(slug?: string | null) {
  return slug ? `/insights/${slug}` : '/insights'
}

export function getImage(image?: PostSummary['featuredImage']) {
  return typeof image === 'object' && image && 'url' in image ? image : undefined
}

export function getPostTypeLabel(post: PostSummary) {
  if (post.postType === 'event') {
    return isPastEvent(post) ? 'Past event' : 'Upcoming workshop'
  }

  if (post.postType === 'news') {
    return 'News'
  }

  return 'Insight'
}

export function isEvent(post: PostSummary) {
  return post.postType === 'event'
}

export function isPastEvent(post: PostSummary) {
  return isEvent(post) && !!post.eventEndAt && new Date(post.eventEndAt).getTime() < Date.now()
}

export function isUpcomingEvent(post: PostSummary) {
  return isEvent(post) && !!post.eventStartAt && !isPastEvent(post)
}

export function sortPostsForInsights(posts: PostSummary[]) {
  return [...posts].sort((a, b) => {
    const aUpcoming = isUpcomingEvent(a)
    const bUpcoming = isUpcomingEvent(b)

    if (aUpcoming && bUpcoming) {
      return new Date(a.eventStartAt || '').getTime() - new Date(b.eventStartAt || '').getTime()
    }

    if (aUpcoming) {
      return -1
    }

    if (bUpcoming) {
      return 1
    }

    return new Date(b.publishedAt || b.createdAt || '').getTime() - new Date(a.publishedAt || a.createdAt || '').getTime()
  })
}

export function getFeaturedPost(posts: PostSummary[]) {
  const sortedPosts = sortPostsForInsights(posts)
  return sortedPosts.find(isUpcomingEvent) || sortedPosts[0]
}

export function formatDate(date?: string | null) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatEventDateTime(start?: string | null, end?: string | null) {
  if (!start) {
    return ''
  }

  const startDate = new Date(start)
  const endDate = end ? new Date(end) : undefined
  const date = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Berlin',
  }).format(startDate)

  const startTime = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Berlin',
  }).format(startDate)

  const endTime = endDate
    ? new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Berlin',
      }).format(endDate)
    : undefined

  return `${date} · ${endTime ? `${startTime}-${endTime}` : startTime}`
}
