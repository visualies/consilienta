"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeUpAnimation } from "@/components/ui/motion-wrappers"
import { BackgroundImage } from "@/components/ui/background-image"
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
    backgroundImage?: {
      enabled: boolean
      image?: {
        url: string
        alt?: string
      }
      size?: number
      positionX?: number
      positionY?: number
      color?: string
      opacity?: number
      zIndex?: number
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
      {/* Background Image */}
      <BackgroundImage backgroundImage={data?.backgroundImage} />

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