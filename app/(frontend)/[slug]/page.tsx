"use client"

import { useParams } from 'next/navigation'
import { usePage } from '@/hooks/usePage'
import { BlockRenderer } from '@/components/blocks'
import { useState, useEffect } from 'react'

export default function DynamicPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: page, isLoading, error } = usePage(slug)
  const [isOverWhite, setIsOverWhite] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.55
      setIsOverWhite(scrollY > heroHeight)
    }

    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Page not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}
