import { useQuery } from '@tanstack/react-query'

export interface PageData {
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

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async (): Promise<PageData> => {
      const response = await fetch(`/api/pages/${slug}`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `Failed to fetch page "${slug}"`)
      }

      return response.json()
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
