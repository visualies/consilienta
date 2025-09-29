"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface PageHeadlineBlockProps {
  data?: {
    title?: string
    subtitle?: string
    alignment?: 'center' | 'left'
    size?: 'default' | 'large' | 'xl' | 'hero'
  }
}

export function PageHeadlineBlock({ data }: PageHeadlineBlockProps) {
  const title = data?.title || "Page Title"
  const subtitle = data?.subtitle
  const alignment = data?.alignment || 'center'
  const size = data?.size || 'default'

  const alignmentClasses = {
    center: 'text-center',
    left: 'text-left'
  }

  const sizeClasses = {
    default: 'text-4xl',
    large: 'text-5xl',
    xl: 'text-6xl',
    hero: 'text-5xl lg:text-7xl'
  }

  const subtitleClasses = {
    center: 'mx-auto',
    left: ''
  }

  return (
    <section className="pt-16 pb-0 px-6">
      <div className={`${alignment === 'center' ? 'max-w-4xl mx-auto text-center' : 'max-w-7xl mx-auto'}`}>
        <div className="mb-8">
          <FadeUpAnimation>
            <h1 className={`${sizeClasses[size]} font-serif font-medium text-white mb-4 ${alignmentClasses[alignment]}`}>
              {title}
            </h1>
          </FadeUpAnimation>
          {subtitle && (
            <FadeUpAnimation delay={0.1}>
              <p className={`text-xl text-white/90 max-w-2xl ${subtitleClasses[alignment]} leading-relaxed ${alignmentClasses[alignment]}`}>
                {subtitle}
              </p>
            </FadeUpAnimation>
          )}
        </div>
      </div>
    </section>
  )
}