import { InsightsList } from '@/components/posts/insights-list'
import { type PostSummary } from '@/lib/posts'

interface PostsArchiveBlockData {
  eyebrow?: string
  title?: string
  intro?: string
  showFilters?: boolean
}

interface PostsArchiveBlockProps {
  data: PostsArchiveBlockData
  posts: PostSummary[]
}

export function PostsArchiveBlock({ data, posts }: PostsArchiveBlockProps) {
  return (
    <InsightsList
      posts={posts}
      title={data.title}
      intro={data.intro}
      showFilters={data.showFilters}
    />
  )
}
