import { Footer } from "@/components/footer"

interface FooterBlockProps {
  data: {
    logo: {
      url: string
      alt: string
    }
    description: string
    socialLinks: Array<{
      platform: string
      url: string
    }>
    services: Array<{
      name: string
      link: string
    }>
    companyLinks: Array<{
      name: string
      link: string
    }>
    copyright: string
    legalLinks: Array<{
      name: string
      link: string
    }>
  }
}

export function FooterBlock({ data }: FooterBlockProps) {
  return <Footer data={data} />
}