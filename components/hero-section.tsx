"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { ParallaxAnimation, HeroAnimation, ScaleAnimation, FadeUpAnimation } from "@/components/ui/motion-wrappers"
import { lazy, Suspense } from "react"

const HelixCanvas = lazy(() => import("./interactive-helix").then(module => ({ default: module.HelixCanvas })))

interface HeroSectionProps {
  data?: {
    badge: string
    headline: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
    showHelix: boolean
  }
  helixConfig?: {
    enabled: boolean
    model?: {
      url: string
      filename: string
    }
    rotationSpeed: number
    scale: number
    hoverScale: number
    position: {
      x: number
      y: number
      z: number
    }
    rotation: {
      x: number
      y: number
      z: number
    }
  }
}

const defaultData = {
  badge: "Industry Leading",
  headline: "Biopharma Consulting Excellence",
  description: "Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.",
  primaryButton: {
    text: "Get in Touch",
    link: "/contact"
  },
  secondaryButton: {
    text: "Learn More",
    link: "/how-we-help"
  },
  showHelix: true
}

const defaultHelixConfig = {
  enabled: true,
  rotationSpeed: 0.5,
  scale: 1,
  hoverScale: 1.1,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}

export function HeroSection({ data, helixConfig = defaultHelixConfig }: HeroSectionProps) {
  // Prioritize Payload data but fall back to defaults if needed
  const heroData = {
    badge: data?.badge || defaultData.badge,
    headline: data?.headline || defaultData.headline,
    description: data?.description || defaultData.description,
    primaryButton: data?.primaryButton || defaultData.primaryButton,
    secondaryButton: data?.secondaryButton || defaultData.secondaryButton,
    showHelix: data?.showHelix !== undefined ? data.showHelix : defaultData.showHelix
  }
  return (
    <section className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden min-h-[60vh]">
      {helixConfig.enabled && (
        <Suspense fallback={<div className="absolute inset-0" />}>
          <HelixCanvas config={helixConfig} />
        </Suspense>
      )}

      <ParallaxAnimation className="max-w-7xl mx-auto relative z-10">
        <HeroAnimation className="space-y-8 max-w-3xl">
          <FadeUpAnimation className="space-y-4" delay={0.2}>
            <ScaleAnimation delay={0.3}>
              <Badge className="frosted-glass text-white border-0">{heroData.badge}</Badge>
            </ScaleAnimation>
            <FadeUpAnimation delay={0.4}>
              <h1 className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white">
                {heroData.headline}
              </h1>
            </FadeUpAnimation>

            <FadeUpAnimation delay={0.6}>
              <div className="text-lg text-white/80 leading-relaxed max-w-lg whitespace-pre-line">
                {heroData.description}
              </div>
            </FadeUpAnimation>
          </FadeUpAnimation>
          <FadeUpAnimation className="flex flex-col sm:flex-row gap-4" delay={0.8}>
            <Link href={heroData.primaryButton.link}>
              <Button size="lg" variant="cta">
                {heroData.primaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={heroData.secondaryButton.link}>
              <Button
                size="lg"
                variant="secondary"
              >
                {heroData.secondaryButton.text}
              </Button>
            </Link>
          </FadeUpAnimation>
        </HeroAnimation>
      </ParallaxAnimation>
    </section>
  )
}