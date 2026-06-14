import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { revalidatePath } from 'next/cache'
import { type CollectionConfig } from 'payload'

const revalidatePostPaths = (slug?: string | null) => {
  revalidatePath('/')
  revalidatePath('/insights')
  if (slug) {
    revalidatePath(`/insights/${slug}`)
  }
  revalidatePath('/sitemap.xml')
}

type SiblingData = {
  status?: string
  postType?: string
}

type SlugDoc = {
  slug?: string | null
}

type ValidateArgs = {
  siblingData?: SiblingData
}

type RichTextNode = {
  text?: unknown
  type?: unknown
  children?: RichTextNode[]
}

const isPublished = (siblingData?: SiblingData) => siblingData?.status === 'published'
const isPublishedEvent = (siblingData?: SiblingData) =>
  siblingData?.status === 'published' && siblingData?.postType === 'event'

const hasRichTextContent = (value: unknown): boolean => {
  const root = value as { root?: { children?: RichTextNode[] } } | undefined
  const children = root?.root?.children
  if (!Array.isArray(children)) {
    return false
  }

  return children.some((child) => {
    if (typeof child?.text === 'string' && child.text.trim()) {
      return true
    }

    if (Array.isArray(child?.children)) {
      return child.children.some((nestedChild) => {
        return typeof nestedChild?.text === 'string' && nestedChild.text.trim()
      })
    }

    return child?.type === 'upload'
  })
}

const requiredWhenPublished = (label: string) => {
  return (value: unknown, { siblingData }: ValidateArgs) => {
    if (!isPublished(siblingData)) {
      return true
    }

    if (typeof value === 'string') {
      return value.trim() ? true : `${label} is required when status is published.`
    }

    return value ? true : `${label} is required when status is published.`
  }
}

const requiredWhenPublishedEvent = (label: string) => {
  return (value: unknown, { siblingData }: ValidateArgs) => {
    if (!isPublishedEvent(siblingData)) {
      return true
    }

    if (typeof value === 'string') {
      return value.trim() ? true : `${label} is required for published events.`
    }

    return value ? true : `${label} is required for published events.`
  }
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'postType', 'status', 'publishedAt', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }: { doc?: SlugDoc; previousDoc?: SlugDoc }) => {
        try {
          revalidatePostPaths(doc?.slug)
          if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
            revalidatePath(`/insights/${previousDoc.slug}`)
          }
        } catch (error) {
          console.log('Skipping post revalidation (likely during seeding)')
        }
      },
    ],
    afterDelete: [
      async ({ doc }: { doc?: SlugDoc }) => {
        try {
          revalidatePostPaths(doc?.slug)
        } catch (error) {
          console.log('Skipping post revalidation (likely during seeding)')
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      validate: requiredWhenPublished('Title'),
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      validate: requiredWhenPublished('Slug'),
    },
    {
      name: 'excerpt',
      type: 'textarea',
      validate: requiredWhenPublished('Excerpt'),
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      validate: (value: unknown, { siblingData }: ValidateArgs) => {
        if (!isPublished(siblingData)) {
          return true
        }

        return hasRichTextContent(value)
          ? true
          : 'Content is required when status is published.'
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      validate: requiredWhenPublished('Published date'),
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'postType',
      type: 'select',
      required: true,
      defaultValue: 'insight',
      options: [
        { label: 'Insight', value: 'insight' },
        { label: 'News', value: 'news' },
        { label: 'Event', value: 'event' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'collapsible',
      label: 'Event Details',
      admin: {
        condition: (_: unknown, siblingData?: SiblingData) => siblingData?.postType === 'event',
      },
      fields: [
        {
          name: 'eventStartAt',
          type: 'date',
          validate: requiredWhenPublishedEvent('Event start'),
        },
        {
          name: 'eventEndAt',
          type: 'date',
          validate: requiredWhenPublishedEvent('Event end'),
        },
        {
          name: 'eventLocation',
          type: 'text',
          validate: requiredWhenPublishedEvent('Event location'),
        },
        {
          name: 'registrationUrl',
          type: 'text',
          validate: requiredWhenPublishedEvent('Registration URL'),
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'seoImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide this post from public pages, search engines, and sitemap output.',
          },
        },
      ],
    },
  ],
}
