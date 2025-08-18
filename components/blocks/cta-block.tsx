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

export function CTABlock({ data }: CTABlockProps) {
  return <CTASection data={data} />
}