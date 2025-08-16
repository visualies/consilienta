import { GlobalConfig } from 'payload/types'

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
          name: 'description',
          type: 'textarea',
          defaultValue: 'Expert pharmaceutical consulting guiding your product from concept to approval. Comprehensive solutions for complex development challenges.',
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
          name: 'services',
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
            { name: 'Regulatory Strategy', link: '#' },
            { name: 'Clinical Development', link: '#' },
            { name: 'Market Access', link: '#' },
            { name: 'Quality Assurance', link: '#' },
            { name: 'Compliance', link: '#' },
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