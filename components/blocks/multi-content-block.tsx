"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface MultiContentBlockProps {
  data?: {
    sections?: Array<{
      title?: string
      content?: string
    }>
  }
}

export function MultiContentBlock({ data }: MultiContentBlockProps) {
  const sections = data?.sections

  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <FadeUpAnimation>
          <div className="frosted-glass p-8 lg:p-12 rounded-2xl border border-white/20">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="space-y-6">
                  {section.title && (
                    <h2 className="text-2xl font-serif font-medium text-white">
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <div className="text-white/90 leading-relaxed">
                      <p className="text-base">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUpAnimation>
      </div>
    </section>
  )
}