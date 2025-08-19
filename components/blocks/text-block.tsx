"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"
import RichText from "@/components/ui/rich-text"
import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface ContentBlock {
  blockType: 'singleColumn' | 'multiColumn'
  content?: DefaultTypedEditorState
  columns?: number
  columnContent?: Array<{
    content: DefaultTypedEditorState
  }>
}

interface TextBlockProps {
  data: {
    alignment?: 'left' | 'center' | 'right'
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    backgroundColor?: 'transparent' | 'frosted' | 'solid'
    textColor?: 'white' | 'dark'
    contentBlocks?: ContentBlock[]
  }
}

export function TextBlock({ data }: TextBlockProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center', 
    right: 'text-right'
  }

  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  const backgroundClasses = {
    transparent: '',
    frosted: 'frosted-glass-navbar rounded-lg p-8',
    solid: 'bg-white/10 rounded-lg p-8'
  }

  const textColorClasses = {
    white: 'text-white',
    dark: 'text-gray-900'
  }

  const getColumnClasses = (columnCount: number) => {
    switch (columnCount) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2'
    }
  }

  const getContentBlockStyling = () => {
    return `
      ${textColorClasses[data.textColor || 'white']}
      [&_h1]:text-4xl [&_h1]:font-serif [&_h1]:font-normal [&_h1]:mb-6 [&_h1]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_h2]:text-3xl [&_h2]:font-serif [&_h2]:font-normal [&_h2]:mb-4 [&_h2]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-normal [&_h3]:mb-2 [&_h3]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
      [&_strong]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_li]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
    `
  }

  return (
    <section className={`px-6 ${data.backgroundColor === 'frosted' || data.backgroundColor === 'solid' ? 'pt-0 pb-8' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto">
        <FadeUpAnimation>
          <div className={`
            ${backgroundClasses[data.backgroundColor || 'transparent']}
            ${alignmentClasses[data.alignment || 'left']}
            ${maxWidthClasses[data.maxWidth || 'lg']}
            mx-auto space-y-8
          `}>
            {/* Flexible Content Blocks */}
            {data.contentBlocks && data.contentBlocks.map((block, blockIndex) => (
              <FadeUpAnimation key={blockIndex} delay={0.2 * (blockIndex + 1)}>
                {block.blockType === 'singleColumn' ? (
                  // Single Column Content
                  <div className={getContentBlockStyling()}>
                    {block.content && <RichText data={block.content} />}
                  </div>
                ) : (
                  // Multi-Column Content
                  <div className={`
                    grid gap-8 ${getColumnClasses(block.columns || 2)}
                  `}>
                    {block.columnContent?.map((column, columnIndex) => (
                      <div key={columnIndex} className={getContentBlockStyling()}>
                        <RichText data={column.content} />
                      </div>
                    ))}
                  </div>
                )}
              </FadeUpAnimation>
            ))}
          </div>
        </FadeUpAnimation>
      </div>
    </section>
  )
}