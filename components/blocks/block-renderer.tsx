"use client"

import { HeroBlock } from './hero-block'
import { FeaturesBlock } from './features-block'
import { SolutionsBlock } from './solutions-block'
import { CTABlock } from './cta-block'
import { HeaderBlock } from './header-block'
import { FooterBlock } from './footer-block'
import { ContactFormBlock } from './contact-form-block'

interface BlockData {
  blockType: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: BlockData[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'header':
            return <HeaderBlock key={index} data={block} />
          case 'hero':
            return <HeroBlock key={index} data={block} helixConfig={block.helixConfig} />
          case 'features':
            return <FeaturesBlock key={index} data={block} />
          case 'solutions':
            return <SolutionsBlock key={index} data={block} />
          case 'cta':
            return <CTABlock key={index} data={block} />
          case 'footer':
            return <FooterBlock key={index} data={block} />
          case 'contactForm':
            return <ContactFormBlock key={index} {...block} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </>
  )
}