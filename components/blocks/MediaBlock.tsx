"use client"

import Image from "next/image"

interface MediaBlockProps {
  media?: {
    url: string
    alt: string
    width?: number
    height?: number
  }
  caption?: string
}

export function MediaBlock({ media, caption }: MediaBlockProps) {
  if (!media) return null

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <Image
            src={media.url}
            alt={media.alt}
            width={media.width || 1200}
            height={media.height || 600}
            className="w-full rounded-lg"
          />
          {caption && (
            <p className="text-center text-white/70 mt-4 text-sm">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}