import { HeroSection } from "@/components/hero-section"

interface HeroBlockProps {
  data: {
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

export function HeroBlock({ data, helixConfig }: HeroBlockProps) {
  return <HeroSection data={data} helixConfig={helixConfig} />
}