"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface PageHeadlineBlockProps {
  data?: {
    title?: string
    subtitle?: string
  }
}

export function PageHeadlineBlock({ data }: PageHeadlineBlockProps) {
  const title = data?.title || "Page Title"
  const subtitle = data?.subtitle

  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <FadeUpAnimation>
            <h1 className="text-4xl font-serif font-medium text-white mb-4">
              {title}
            </h1>
          </FadeUpAnimation>
          {subtitle && (
            <FadeUpAnimation delay={0.1}>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </FadeUpAnimation>
          )}
        </div>
      </div>
    </section>
  )
}