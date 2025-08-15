"use client"

import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { ContentBlock } from './ContentBlock'
import { MediaBlock } from './MediaBlock'
import { FormBlock } from './FormBlock'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export interface BlockData {
  blockType: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: BlockData[]
  headerData?: any
  footerData?: any
  helixConfig?: any
}

export function BlockRenderer({ blocks, headerData, footerData, helixConfig }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {headerData && (
        <Header 
          isOverWhite={false}
          data={headerData}
        />
      )}
      {blocks.map((block, index) => {
        const { blockType, ...blockData } = block

        switch (blockType) {
          case 'hero':
            return <HeroBlock key={index} data={blockData} />
          case 'features':
            return <FeaturesBlock key={index} data={blockData} />
          case 'cta':
            return <CTABlock key={index} data={blockData} />
          case 'content':
            return <ContentBlock key={index} data={blockData} />
          case 'media':
            return <MediaBlock key={index} data={blockData} />
          case 'form':
            return <FormBlock key={index} data={blockData} />
          case 'landingHero':
            return <HeroSection key={index} data={blockData} helixConfig={helixConfig} />
          case 'landingFeatures':
            return <FeaturesSection key={index} data={blockData} />
          case 'landingCTA':
            return <CTASection key={index} data={blockData} />
          default:
            console.warn(`Unknown block type: ${blockType}`)
            return null
        }
      })}
      {footerData && (
        <Footer data={footerData} />
      )}
    </>
  )
}
