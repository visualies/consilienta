"use client"

import { usePage } from '@/hooks/usePage'
import { BlockRenderer } from '@/components/blocks'

export default function ContactPage() {
  const { data: pageData, isLoading, error } = usePage('contact')

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
        <div className="text-white text-lg">Contact page not found</div>
      </div>
    )
  }

  console.log('Contact page data:', pageData)
  console.log('Contact page layout:', pageData.layout)

  return (
    <div className="min-h-screen brand-gradient-no-black">
      <BlockRenderer blocks={pageData.layout} />
    </div>
  )
}
