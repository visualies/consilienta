"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface PrivacyBlockProps {
  data?: {
    title?: string
    subtitle?: string
    lastUpdated?: string
    sections?: Array<{
      sectionTitle: string
      content: string
    }>
  }
}

export function PrivacyBlock({ data }: PrivacyBlockProps) {
  const title = data?.title || "Privacy Policy"
  const subtitle = data?.subtitle || "How We Protect Your Privacy"
  const lastUpdated = data?.lastUpdated || "Last Updated: [To be filled]"

  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <FadeUpAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="text-sm text-white/70 mt-4">
                {lastUpdated}
              </p>
            )}
          </div>
        </FadeUpAnimation>

        <FadeUpAnimation delay={0.2}>
          <div className="frosted-glass p-8 lg:p-12 rounded-2xl border border-white/20 space-y-8">
            
            {data?.sections?.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-serif font-semibold text-white mb-4">
                  {section.sectionTitle}
                </h3>
                <div className="text-white/90 leading-relaxed">
                  <p>{section.content}</p>
                </div>
              </div>
            ))}

          </div>
        </FadeUpAnimation>
      </div>
    </section>
  )
}