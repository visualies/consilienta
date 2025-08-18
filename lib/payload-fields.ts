import { Field } from 'payload/types'

export const backgroundImageFields: Field[] = [
  {
    name: 'backgroundImage',
    type: 'group',
    label: 'Background Image',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Enable background decorative image'
        }
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: 20,
        min: 1,
        admin: {
          description: 'Size as percentage of container (e.g., 20 = 20%, 150 = 150%)',
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'positionX',
        type: 'number',
        defaultValue: 50,
        admin: {
          description: 'Horizontal position: 0 = left edge, 50 = center, 100 = right edge',
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'positionY',
        type: 'number',
        defaultValue: 50,
        admin: {
          description: 'Vertical position: 0 = top edge, 50 = center, 100 = bottom edge',
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'opacity',
        type: 'number',
        defaultValue: 0.8,
        min: 0,
        max: 1,
        step: 0.1,
        admin: {
          description: 'Opacity (0-1)',
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'color',
        type: 'text',
        admin: {
          description: 'Optional color filter (hex color like #FF0000)',
          condition: (data, siblingData) => siblingData?.enabled
        }
      },
      {
        name: 'zIndex',
        type: 'number',
        defaultValue: 1,
        min: -10,
        max: 50,
        admin: {
          description: 'Z-index for layering',
          condition: (data, siblingData) => siblingData?.enabled
        }
      }
    ]
  }
]