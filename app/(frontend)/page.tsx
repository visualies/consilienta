"use client"

import { usePage } from '@/hooks/usePage'
import { BlockRenderer } from '@/components/blocks'

export default function ConsilientsLanding() {
  const { data: pageData, isLoading, error } = usePage('home')

  if (isLoading) {
    return (
      <div className="min-h-screen brand-gradient-no-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen brand-gradient-no-black flex items-center justify-center">
        <div className="text-white text-lg">Page not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen brand-gradient-no-black">
      <BlockRenderer blocks={pageData.layout} />
    </div>
  )
}
