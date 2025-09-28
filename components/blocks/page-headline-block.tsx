"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface PageHeadlineBlockProps {
  data?: {
    title?: string
    subtitle?: string
    alignment?: 'center' | 'left'
  }
}

export function PageHeadlineBlock({ data }: PageHeadlineBlockProps) {
  const title = data?.title || "Page Title"
  const subtitle = data?.subtitle
  const alignment = data?.alignment || 'center'

  const alignmentClasses = {
    center: 'text-center',
    left: 'text-left'
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
            <h1 className={`text-4xl font-serif font-medium text-white mb-4 ${alignmentClasses[alignment]}`}>
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