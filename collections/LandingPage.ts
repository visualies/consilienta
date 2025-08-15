import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const LandingPage: CollectionConfig = {
  slug: 'landing-page',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Landing Page',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
          defaultValue: 'Pharmaceutical Consulting Excellence',
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'Guiding your product from concept to approval',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'No matter how complex or innovative your development journey may be. We will help you navigate each step of product development with clarity and confidence.',
        },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Get in Touch',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '#contact',
            },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Learn More',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '#about',
            },
          ],
        },
        {
          name: 'showHelix',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Why Choose Consilienta',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
          defaultValue: 'Our comprehensive approach combines deep expertise with innovative solutions to accelerate your pharmaceutical development journey.',
        },
        {
          name: 'featuresList',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Users', value: 'Users' },
                { label: 'Target', value: 'Target' },
                { label: 'Lightbulb', value: 'Lightbulb' },
                { label: 'Globe', value: 'Globe' },
                { label: 'Zap', value: 'Zap' },
                { label: 'Award', value: 'Award' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
          defaultValue: [
            {
              icon: 'Users',
              title: 'Expert Team',
              description: 'Blend of ex-regulatory, industry, consulting and academic experience',
            },
            {
              icon: 'Globe',
              title: 'Broad Experience',
              description: 'From small biotech startups to large pharmaceutical corporations',
            },
            {
              icon: 'Target',
              title: 'Tailored Support',
              description: 'Agile, attentive and personalized service with true partnership',
            },
            {
              icon: 'Award',
              title: 'Comprehensive Coverage',
              description: 'Broad coverage of product class & disease types',
            },
            {
              icon: 'Zap',
              title: 'Emerging Technologies',
              description: 'Ample experience with a range of emerging technologies and medicines',
            },
            {
              icon: 'Lightbulb',
              title: 'Novel Approaches',
              description: 'Out-of-the-box solutions for complex challenges',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Ready to Transform Your Development Process?',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Partner with Consilienta and experience the difference that expert guidance, innovative solutions, and personalized service can make for your pharmaceutical development journey.',
        },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Schedule Consultation',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '#contact',
            },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Download Brochure',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '#brochure',
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
            { label: 'Home', link: '#home' },
            { label: 'How We Help', link: '#how-we-help' },
            { label: 'About Us', link: '#about' },
            { label: 'Insights', link: '#insights' },
            { label: 'Careers', link: '#careers' },
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
              defaultValue: '#contact',
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
          required: true,
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
    {
      name: 'helix',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'model',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'rotationSpeed',
          type: 'number',
          defaultValue: 0.2,
          min: 0,
          max: 2,
          step: 0.1,
        },
        {
          name: 'scale',
          type: 'number',
          defaultValue: 7,
          min: 1,
          max: 15,
          step: 0.1,
        },
        {
          name: 'hoverScale',
          type: 'number',
          defaultValue: 7.7,
          min: 1,
          max: 15,
          step: 0.1,
        },
        {
          name: 'position',
          type: 'group',
          fields: [
            {
              name: 'x',
              type: 'number',
              defaultValue: 7,
            },
            {
              name: 'y',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'z',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'rotation',
          type: 'group',
          fields: [
            {
              name: 'x',
              type: 'number',
              defaultValue: 90,
            },
            {
              name: 'y',
              type: 'number',
              defaultValue: -24,
            },
            {
              name: 'z',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
      ],
    },
  ],
}
