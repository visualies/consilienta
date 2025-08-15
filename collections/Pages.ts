import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            {
              name: 'variant',
              type: 'select',
              required: true,
              options: [
                { label: 'High Impact', value: 'high-impact' },
                { label: 'Medium Impact', value: 'medium-impact' },
                { label: 'Low Impact', value: 'low-impact' },
                { label: 'Post Hero', value: 'post' },
              ],
              defaultValue: 'high-impact',
            },
            {
              name: 'badge',
              type: 'text',
            },
            {
              name: 'headline',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'background',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Image', value: 'image' },
                    { label: 'Video', value: 'video' },
                    { label: '3D Model', value: '3d-model' },
                  ],
                  defaultValue: 'none',
                },
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type !== 'none',
                  },
                },
                {
                  name: 'overlay',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'CTA', value: 'cta' },
                  ],
                  defaultValue: 'primary',
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'action',
                  type: 'select',
                  options: [
                    { label: 'Link', value: 'link' },
                    { label: 'Modal', value: 'modal' },
                    { label: 'Scroll', value: 'scroll' },
                  ],
                  defaultValue: 'link',
                },
              ],
            },
          ],
        },
        {
          slug: 'features',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'textarea',
            },
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: 'Grid 2x3', value: 'grid-2x3' },
                { label: 'Grid 3x2', value: 'grid-3x2' },
                { label: 'List', value: 'list' },
                { label: 'Carousel', value: 'carousel' },
              ],
              defaultValue: 'grid-2x3',
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Users', value: 'Users' },
                    { label: 'Target', value: 'Target' },
                    { label: 'Lightbulb', value: 'Lightbulb' },
                    { label: 'Globe', value: 'Globe' },
                    { label: 'Zap', value: 'Zap' },
                    { label: 'Award', value: 'Award' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  name: 'customIcon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (data, siblingData) => siblingData?.icon === 'custom',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          slug: 'cta',
          fields: [
            {
              name: 'variant',
              type: 'select',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Split', value: 'split' },
                { label: 'Full Width', value: 'full-width' },
              ],
              defaultValue: 'standard',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'background',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Solid', value: 'solid' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Image', value: 'image' },
                  ],
                  defaultValue: 'solid',
                },
                {
                  name: 'color',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'solid',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'image',
                  },
                },
              ],
            },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'CTA', value: 'cta' },
                  ],
                  defaultValue: 'primary',
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'action',
                  type: 'select',
                  options: [
                    { label: 'Link', value: 'link' },
                    { label: 'Modal', value: 'modal' },
                    { label: 'Scroll', value: 'scroll' },
                  ],
                  defaultValue: 'link',
                },
              ],
            },
          ],
        },
        {
          slug: 'content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor(),
            },
            {
              name: 'width',
              type: 'select',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Container', value: 'container' },
                { label: 'Narrow', value: 'narrow' },
              ],
              defaultValue: 'container',
            },
            {
              name: 'background',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Solid', value: 'solid' },
                    { label: 'Image', value: 'image' },
                  ],
                  defaultValue: 'none',
                },
                {
                  name: 'color',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'solid',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'image',
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'media',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'alignment',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
                { label: 'Full Width', value: 'full' },
              ],
              defaultValue: 'center',
            },
            {
              name: 'size',
              type: 'select',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ],
              defaultValue: 'medium',
            },
          ],
        },
        {
          slug: 'form',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'fields',
              type: 'array',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Text', value: 'text' },
                    { label: 'Email', value: 'email' },
                    { label: 'Textarea', value: 'textarea' },
                    { label: 'Select', value: 'select' },
                    { label: 'Checkbox', value: 'checkbox' },
                    { label: 'Number', value: 'number' },
                  ],
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'placeholder',
                  type: 'text',
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'options',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                    },
                    {
                      name: 'value',
                      type: 'text',
                    },
                  ],
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'select',
                  },
                },
              ],
            },
            {
              name: 'submitButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Submit',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'CTA', value: 'cta' },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
