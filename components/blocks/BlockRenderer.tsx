import React from 'react'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { ContentBlock } from './ContentBlock'
import { MediaBlock } from './MediaBlock'
import { FormBlock } from './FormBlock'
import { ContactFormBlock } from './ContactFormBlock'

interface Block {
  blockType: string
  [key: string]: any
}

// Type assertion helper to avoid TypeScript errors
const asBlockProps = <T,>(block: Block): T => block as T

interface BlockRendererProps {
  blocks: Block[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }

  console.log('BlockRenderer received blocks:', blocks)
  
  return (
    <div>
      {blocks.map((block, index) => {
        console.log('Processing block:', block.blockType, block)
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={index} {...asBlockProps(block)} />
          case 'features':
            return <FeaturesBlock key={index} {...asBlockProps(block)} />
          case 'cta':
            return <CTABlock key={index} {...asBlockProps(block)} />
          case 'content':
            return <ContentBlock key={index} {...asBlockProps(block)} />
          case 'media':
            return <MediaBlock key={index} {...asBlockProps(block)} />
          case 'form':
            return <FormBlock key={index} {...asBlockProps(block)} />
          case 'contactForm':
            return <ContactFormBlock key={index} {...asBlockProps(block)} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </div>
  )
}