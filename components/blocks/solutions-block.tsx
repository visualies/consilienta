import { SolutionsSection } from "@/components/solutions-section"

interface SolutionItem {
  headline: string
  logo?: {
    url: string
    alt?: string
  }
  color?: string
  bodyText: string
  popupText?: string
}

interface SolutionsBlockProps {
  data: {
    title: string
    subtitle: string
    solutionsList: Array<SolutionItem>
  }
}

export function SolutionsBlock({ data }: SolutionsBlockProps) {
  return <SolutionsSection data={data} />
}