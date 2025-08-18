import { HeroBlock } from './hero-block'
import { FeaturesBlock } from './features-block'
import { SolutionsBlock } from './solutions-block'
import { CTABlock } from './cta-block'
import { ContactFormBlock } from './contact-form-block'
import { AboutUsBlock } from './about-us-block'
import { ImprintBlock } from './imprint-block'
import { TermsOfServiceBlock } from './terms-of-service-block'
import { CookiesBlock } from './cookies-block'
import { PrivacyBlock } from './privacy-block'
import { PageHeadlineBlock } from './page-headline-block'
import { BackgroundImageBlock } from './background-image-block'
import { ContentSectionBlock } from './content-section-block'
import { MultiContentBlock } from './multi-content-block'

interface BlockData {
  blockType: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: BlockData[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  // Group consecutive legal-notice blocks together
  const groupedBlocks: Array<BlockData | BlockData[]> = []
  let currentLegalNoticeGroup: BlockData[] = []

  blocks.forEach((block) => {
    if (block.blockType === 'legal-notice') {
      currentLegalNoticeGroup.push(block)
    } else {
      if (currentLegalNoticeGroup.length > 0) {
        groupedBlocks.push(currentLegalNoticeGroup)
        currentLegalNoticeGroup = []
      }
      groupedBlocks.push(block)
    }
  })

  // Don't forget the last group if it ends with legal-notice blocks
  if (currentLegalNoticeGroup.length > 0) {
    groupedBlocks.push(currentLegalNoticeGroup)
  }

  return (
    <>
      {groupedBlocks.map((blockOrGroup, index) => {
        // Handle grouped legal-notice blocks
        if (Array.isArray(blockOrGroup)) {
          const legalNoticeBlocks = blockOrGroup

          return (
            <section key={`legal-notice-group-${index}`} className="px-6 pb-16">
              <div className={`mx-auto ${legalNoticeBlocks.length > 1 ? 'max-w-7xl' : 'max-w-4xl'}`}>
                <div className={`${legalNoticeBlocks.length > 1 ? 'flex flex-col lg:flex-row gap-8' : 'flex justify-center'}`}>
                  {legalNoticeBlocks.map((block, blockIndex) => (
                    <ImprintBlock key={`${index}-${blockIndex}`} data={block} />
                  ))}
                </div>
              </div>
            </section>
          )
        }

        // Handle single blocks
        const block = blockOrGroup as BlockData
        switch (block.blockType) {
          case 'header':
            // Skip header blocks - handled globally
            return null
          case 'hero':
            return <HeroBlock key={index} data={block} helixConfig={block.helixConfig} />
          case 'features':
            return <FeaturesBlock key={index} data={block} />
          case 'solutions':
            return <SolutionsBlock key={index} data={block} />
          case 'cta':
            return <CTABlock key={index} data={block} />
          case 'footer':
            // Skip footer blocks - handled globally
            return null
          case 'contactForm':
            return <ContactFormBlock key={index} {...block} />
          case 'aboutUs':
            return <AboutUsBlock key={index} data={block} />
          case 'pageHeadline':
            return <PageHeadlineBlock key={index} data={block} />
          case 'backgroundImage':
            return <BackgroundImageBlock key={index} data={block} />
          case 'contentSection':
            return <ContentSectionBlock key={index} data={block} />
          case 'multiContent':
            return <MultiContentBlock key={index} data={block} />
          case 'termsOfService':
            return <TermsOfServiceBlock key={index} data={block} />
          case 'cookies':
            return <CookiesBlock key={index} data={block} />
          case 'privacy':
            return <PrivacyBlock key={index} data={block} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </>
  )
}