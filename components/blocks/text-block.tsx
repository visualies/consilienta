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
      [&_h4]:text-lg [&_h4]:font-serif [&_h4]:font-normal [&_h4]:mb-2 [&_h4]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_h5]:text-base [&_h5]:font-serif [&_h5]:font-normal [&_h5]:mb-2 [&_h5]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_h6]:text-sm [&_h6]:font-serif [&_h6]:font-normal [&_h6]:mb-2 [&_h6]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
      [&_strong]:font-semibold [&_strong]:${data.textColor === 'dark' ? 'text-gray-900' : 'text-white'}
      [&_em]:italic [&_em]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
      [&_u]:underline [&_u]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
      [&_s]:line-through [&_s]:${data.textColor === 'dark' ? 'text-gray-600' : 'text-white/70'}
      [&_code]:bg-black/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:${data.textColor === 'dark' ? 'text-gray-800 [&_code]:bg-gray-100' : 'text-white/95 [&_code]:bg-white/10'}
      [&_pre]:bg-black/20 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:${data.textColor === 'dark' ? 'bg-gray-100' : 'bg-white/10'}
      [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono
      [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:mb-4 [&_blockquote]:italic [&_blockquote]:${data.textColor === 'dark' ? 'border-gray-300 text-gray-600' : 'border-white/30 text-white/80'}
      [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-1
      [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:space-y-1
      [&_li]:${data.textColor === 'dark' ? 'text-gray-700' : 'text-white/90'}
      [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:${data.textColor === 'dark' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-300 hover:text-blue-100'}
      [&_hr]:border-0 [&_hr]:h-px [&_hr]:my-8 [&_hr]:${data.textColor === 'dark' ? 'bg-gray-300' : 'bg-white/30'}
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