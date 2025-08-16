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
          slug: 'header',
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
          slug: 'hero',
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
            {
              name: 'helixConfig',
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
        },
        {
          slug: 'features',
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
          slug: 'cta',
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
          slug: 'contactForm',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Get in Touch',
            },
            {
              name: 'subtitle',
              type: 'text',
              required: false,
              defaultValue: 'Ready to start your journey?',
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              defaultValue: 'We\'re here to help you navigate the complexities of pharmaceutical development. Send us a message and we\'ll get back to you within 24 hours.',
            },
            {
              name: 'contactInfo',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  required: false,
                  defaultValue: 'info@consilienta.com',
                },
                {
                  name: 'phones',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      defaultValue: 'Main Office',
                    },
                    {
                      name: 'number',
                      type: 'text',
                      required: true,
                      defaultValue: '+49 (0) 163 2457821',
                    },
                  ],
                  defaultValue: [
                    {
                      label: 'Main Office',
                      number: '+49 (0) 163 2457821',
                    },
                  ],
                },
                {
                  name: 'address',
                  type: 'textarea',
                  required: false,
                  defaultValue: 'Consilienta GmbH\nHanfelder St. 6 \n81475 Munich, Germany',
                },
              ],
            },
            {
              name: 'formFields',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Text', value: 'text' },
                    { label: 'Email', value: 'email' },
                    { label: 'Phone', value: 'tel' },
                    { label: 'Textarea', value: 'textarea' },
                    { label: 'Select', value: 'select' },
                  ],
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'placeholder',
                  type: 'text',
                  required: false,
                },
                {
                  name: 'options',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
              defaultValue: [
                { name: 'firstName', type: 'text', label: 'First Name', required: true, placeholder: 'Enter your first name' },
                { name: 'lastName', type: 'text', label: 'Last Name', required: true, placeholder: 'Enter your last name' },
                { name: 'email', type: 'email', label: 'Email Address', required: true, placeholder: 'Enter your email address' },
                { name: 'company', type: 'text', label: 'Company', required: false, placeholder: 'Enter your company name' },
                { name: 'phone', type: 'tel', label: 'Phone Number', required: false, placeholder: 'Enter your phone number' },
                { 
                  name: 'service', 
                  type: 'select', 
                  label: 'Service of Interest', 
                  required: true,
                  options: [
                    { label: 'Regulatory Strategy', value: 'regulatory' },
                    { label: 'Clinical Development', value: 'clinical' },
                    { label: 'Market Access', value: 'market-access' },
                    { label: 'Quality Assurance', value: 'quality' },
                    { label: 'Compliance', value: 'compliance' },
                    { label: 'Other', value: 'other' }
                  ]
                },
                { name: 'message', type: 'textarea', label: 'Message', required: true, placeholder: 'Tell us about your project or how we can help...' }
              ],
            },
            {
              name: 'submitText',
              type: 'text',
              required: false,
              defaultValue: 'Send Message',
            },
            {
              name: 'successMessage',
              type: 'textarea',
              required: false,
              defaultValue: 'Thank you for your message! We\'ll get back to you within 24 hours.',
            },
          ],
        },
        {
          slug: 'footer',
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
