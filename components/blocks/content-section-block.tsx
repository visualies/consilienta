"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface ContentSectionBlockProps {
  data?: {
    title?: string
    content?: string
    layout?: 'default' | 'numbered' | 'simple'
  }
}

export function ContentSectionBlock({ data }: ContentSectionBlockProps) {
  const title = data?.title
  const content = data?.content
  const layout = data?.layout || 'default'

  if (!title && !content) {
    return null
  }

  return (
    <section className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <FadeUpAnimation>
          <div className="frosted-glass p-8 lg:p-12 rounded-2xl border border-white/20">
            <div className="space-y-6">
              {title && (
                <h2 className="text-2xl font-serif font-medium text-white mb-6">
                  {title}
                </h2>
              )}
              {content && (
                <div className="text-white/90 leading-relaxed space-y-4">
                  {content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null
                    
                    return (
                      <p key={index} className="text-base">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </FadeUpAnimation>
      </div>
    </section>
  )
}