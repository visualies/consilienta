"use client"

interface ContentBlockProps {
  content?: string
  title?: string
  subtitle?: string
}

export function ContentBlock({ content, title, subtitle }: ContentBlockProps) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-3xl font-serif font-medium text-white mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-xl text-white/90 mb-8">
            {subtitle}
          </p>
        )}
        {content && (
          <div className="prose prose-invert max-w-none">
            {content}
          </div>
        )}
      </div>
    </section>
  )
}