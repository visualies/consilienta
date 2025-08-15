import React from 'react'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { ContentBlock } from './ContentBlock'
import { MediaBlock } from './MediaBlock'
import { FormBlock } from './FormBlock'

interface Block {
  blockType: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: Block[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={index} {...block} />
          case 'features':
            return <FeaturesBlock key={index} {...block} />
          case 'cta':
            return <CTABlock key={index} {...block} />
          case 'content':
            return <ContentBlock key={index} {...block} />
          case 'media':
            return <MediaBlock key={index} {...block} />
          case 'form':
            return <FormBlock key={index} {...block} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </div>
  )
}