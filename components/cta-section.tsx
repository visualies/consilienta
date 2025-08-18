"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeUpAnimation } from "@/components/ui/motion-wrappers"
import Image from "next/image"
import Link from "next/link"

interface CTASectionProps {
  data?: {
    title: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
    backgroundSvg?: {
      enabled: boolean
      svg?: {
        url: string
        alt?: string
      }
      size?: number
      positionX?: number
      positionY?: number
      color?: string
      opacity?: number
    }
  }
}

const defaultData = {
  title: "Ready to Get Started?",
  description: "Contact us today to discuss your pharmaceutical consulting needs.",
  primaryButton: {
    text: "Start Your Journey",
    link: "#contact"
  },
  secondaryButton: {
    text: "Learn More",
    link: "#about"
  }
}

export function CTASection({ data = defaultData }: CTASectionProps) {
  return (
    <section
      className="px-6 pt-48 pb-32 relative"
      style={{
        paddingBottom: '10rem',
        marginBottom: '-3rem',
        overflow: 'hidden'
      }}
    >
      {/* Background SVG */}
      {data?.backgroundSvg?.enabled && data.backgroundSvg.svg && (
        <div 
          className="absolute pointer-events-none"
          style={{
            width: `${data.backgroundSvg.size || 200}px`,
            height: `${data.backgroundSvg.size || 200}px`,
            left: `${data.backgroundSvg.positionX || 50}%`,
            top: `${data.backgroundSvg.positionY || 50}%`,
            transform: 'translate(-50%, -50%)',
            opacity: data.backgroundSvg.opacity || 0.1,
            zIndex: 1
          }}
        >
          <Image
            src={data.backgroundSvg.svg.url}
            alt={data.backgroundSvg.svg.alt || 'Background decoration'}
            fill
            className="object-contain"
            style={{
              filter: data.backgroundSvg.color ? 
                `sepia(1) saturate(5) hue-rotate(180deg)` : undefined
            }}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <FadeUpAnimation>
          <h2 className="text-4xl lg:text-5xl font-serif font-medium text-white">
            {data.title}
          </h2>
        </FadeUpAnimation>
        <FadeUpAnimation delay={0.2}>
          <p className="text-xl text-white/90 leading-relaxed">
            {data.description}
          </p>
        </FadeUpAnimation>
        <FadeUpAnimation className="flex flex-col sm:flex-row gap-4 justify-center" delay={0.4}>
          <Link href={data.primaryButton.link}>
            <Button size="lg" variant="cta">
              {data.primaryButton.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={data.secondaryButton.link}>
            <Button
              size="lg"
              variant="secondary"
            >
              {data.secondaryButton.text}
            </Button>
          </Link>
        </FadeUpAnimation>
      </div>
    </section>
  )
}