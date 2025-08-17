"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface TermsOfServiceBlockProps {
  data?: {
    title?: string
    subtitle?: string
    effectiveDate?: string
    sections?: Array<{
      sectionTitle: string
      content: string
    }>
  }
}

export function TermsOfServiceBlock({ data }: TermsOfServiceBlockProps) {
  const title = data?.title || "Terms of Service"
  const subtitle = data?.subtitle || "Terms and Conditions of Use"
  const effectiveDate = data?.effectiveDate || "Effective Date: [To be filled]"

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
            {effectiveDate && (
              <p className="text-sm text-white/70 mt-4">
                {effectiveDate}
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