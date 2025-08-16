import { Header } from "@/components/header"

interface HeaderBlockProps {
  data: {
    logo: {
      url: string
      alt: string
    }
    logoWhite: {
      url: string
      alt: string
    }
    navigation: Array<{
      label: string
      link: string
    }>
    contactButton: {
      text: string
      link: string
    }
  }
  isOverWhite?: boolean
}

export function HeaderBlock({ data }: HeaderBlockProps) {
  return <Header data={data} />
}