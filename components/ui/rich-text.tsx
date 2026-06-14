import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type NodeTypes = DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/insights/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    const { value } = node
    if (typeof value === 'object' && value && 'url' in value) {
      return (
        <Image
          src={value.url as string}
          alt={value.alt as string || ''}
          width={value.width as number || 800}
          height={value.height as number || 600}
          className="max-w-full h-auto rounded-lg shadow-md my-4"
        />
      )
    }
    return null
  },
})

type Props = {
  data: DefaultTypedEditorState
  className?: string
}

export default function RichText({ data, className }: Props) {
  return (
    <ConvertRichText
      converters={jsxConverters}
      data={data}
      className={className}
    />
  )
}
