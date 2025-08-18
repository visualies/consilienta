import { CTASection } from "@/components/cta-section"

interface CTABlockProps {
  data: {
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

export function CTABlock({ data }: CTABlockProps) {
  return <CTASection data={data} />
}