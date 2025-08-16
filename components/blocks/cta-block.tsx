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
  }
}

export function CTABlock({ data }: CTABlockProps) {
  return <CTASection data={data} />
}