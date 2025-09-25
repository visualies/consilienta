"use client"

import { ParallaxAnimation, HeroAnimation, FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface HeadlineBlockProps {
  data?: {
    headline: string
    description?: string
  }
}

const defaultData = {
  headline: "Your Headline Here",
  description: "Your description text goes here."
}

export function HeadlineBlock({ data }: HeadlineBlockProps) {
  const headlineData = {
    headline: data?.headline || defaultData.headline,
    description: data?.description || defaultData.description
  }

  return (
    <section className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden">
      <ParallaxAnimation className="max-w-7xl mx-auto relative z-10">
        <HeroAnimation className="space-y-8 max-w-3xl">
          <FadeUpAnimation className="space-y-4" delay={0.2}>
            <FadeUpAnimation delay={0.4}>
              <h1 className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white">
                {headlineData.headline}
              </h1>
            </FadeUpAnimation>

            {headlineData.description && (
              <FadeUpAnimation delay={0.6}>
                <div className="text-lg text-white/80 leading-relaxed max-w-2xl whitespace-pre-line">
                  {headlineData.description}
                </div>
              </FadeUpAnimation>
            )}
          </FadeUpAnimation>
        </HeroAnimation>
      </ParallaxAnimation>
    </section>
  )
}