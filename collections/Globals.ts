import { GlobalConfig } from 'payload/types'
import { ColorField } from '../fields/ColorField'

export const Globals: GlobalConfig = {
  slug: 'globals',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Brand Settings',
      fields: [
        ColorField({
          name: 'brandColor',
          label: 'Brand Color',
          required: true,
          defaultValue: '#4041D5',
          admin: {
            description: 'Primary brand color used for buttons, icons, and accents throughout the site',
          },
        }),
        {
          name: 'frostingStrength',
          type: 'number',
          label: 'Frosting Strength (%)',
          required: true,
          defaultValue: 40,
          admin: {
            description: 'Controls the opacity of the white frosting overlay (0-100%). Higher values create stronger frosting effect.',
            step: 5,
            min: 0,
            max: 100,
          },
        },
        {
          name: 'brandGradient',
          type: 'group',
          label: 'Brand Gradient',
          fields: [
            {
              name: 'angle',
              type: 'number',
              label: 'Gradient Angle (degrees)',
              required: true,
              defaultValue: 135,
              admin: {
                description: 'Direction of the gradient in degrees (0-360). 0 = up, 90 = right, 180 = down, 270 = left',
                step: 1,
                min: 0,
                max: 360,
              },
            },
            {
              name: 'colors',
              type: 'array',
              label: 'Gradient Colors',
              minRows: 2,
              maxRows: 10,
              defaultValue: [
                { color: '#e89d87', position: 0 },
                { color: '#a985b3', position: 25 },
                { color: '#4041d5', position: 60 },
                { color: '#2a1846', position: 100 },
              ],
              fields: [
                ColorField({
                  name: 'color',
                  label: 'Color',
                  required: true,
                  admin: {
                    description: 'Select a color for this gradient stop',
                  },
                }),
                {
                  name: 'position',
                  type: 'number',
                  label: 'Position (%)',
                  required: true,
                  admin: {
                    description: 'Position of this color stop in the gradient (0-100%)',
                    step: 1,
                    min: 0,
                    max: 100,
                  },
                },
              ],
              admin: {
                description: 'Define colors and their positions in the gradient. Colors will be automatically sorted by position.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'logoWhite',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'navigation',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { label: 'Home', link: '/' },
            { label: 'How We Help', link: '/how-we-help' },
            { label: 'About Us', link: '/about-us' },
            { label: 'Insights', link: '/insights' },
            { label: 'Careers', link: '/careers' },
          ],
        },
        {
          name: 'contactButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Contact Us',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '/contact',
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          defaultValue: 'Hanfelder St. 6\n81475 Munich\nGermany',
          admin: {
            description: 'Company address displayed in the footer',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+49 (0)163 2457821',
          admin: {
            description: 'Primary phone number displayed in the footer',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Email', value: 'email' },
                { label: 'Twitter', value: 'twitter' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { platform: 'linkedin', url: '#' },
            { platform: 'email', url: 'mailto:contact@consilienta.com' },
          ],
        },
        {
          name: 'companyLinks',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { name: 'About Us', link: '#about' },
            { name: 'Careers', link: '#careers' },
            { name: 'Insights', link: '#insights' },
            { name: 'Contact', link: '#contact' },
            { name: 'Privacy Policy', link: '#privacy' },
          ],
        },
        {
          name: 'copyright',
          type: 'text',
          required: true,
          defaultValue: '© 2024 Consilienta. All rights reserved. Pharmaceutical consulting excellence.',
        },
        {
          name: 'legalLinks',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { name: 'Terms of Service', link: '#terms' },
            { name: 'Privacy Policy', link: '#privacy' },
            { name: 'Cookies', link: '#cookies' },
          ],
        },
      ],
    },
  ],
}