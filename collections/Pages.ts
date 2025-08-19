import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { backgroundImageFields } from '../lib/payload-fields'
import { revalidatePath } from 'next/cache'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          // Revalidate cache when page content changes
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/') // Also revalidate home page
        } catch (error) {
          // Ignore revalidation errors during seeding
          console.log('Skipping revalidation (likely during seeding)')
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          // Revalidate cache when page is deleted
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/') // Also revalidate home page
        } catch (error) {
          // Ignore revalidation errors during seeding
          console.log('Skipping revalidation (likely during seeding)')
        }
      },
    ],
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
              defaultValue: 'Biopharma Consulting Excellence',
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
                  defaultValue: '/contact',
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
                  defaultValue: '/how-we-help',
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
              defaultValue: null,
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
                  required: false,
                  defaultValue: '#brochure',
                  admin: {
                    description: 'Leave empty if using a downloadable file instead',
                  },
                },
                {
                  name: 'downloadFile',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  admin: {
                    description: 'Upload a file (PDF, brochure, etc.) for direct download. This will override the link field.',
                  },
                },
              ],
            },
            ...backgroundImageFields,
          ],
        },
        {
          slug: 'solutions',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'How We Help',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: true,
              defaultValue: 'We are providing services in the area of regulatory affairs and strategic product development for diverse innovative therapies.',
            },
            {
              name: 'solutionsList',
              type: 'array',
              minRows: 0,
              maxRows: 10,
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
                {
                  name: 'color',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Hex color code (e.g., #3B82F6)',
                  },
                },
                {
                  name: 'bodyText',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'popupText',
                  type: 'richText',
                  required: false,
                  editor: lexicalEditor({}),
                },
              ],
              defaultValue: [
                {
                  headline: 'Regulatory Strategy',
                  bodyText: 'Strategy and Planning, Orphan and Pediatric, Due Diligence, Training and Coaching, Embedded Regulatory Function.',
                  color: '#3B82F6',
                },
                {
                  headline: 'Agency Interactions',
                  bodyText: 'Scientific and Regulatory Support, Scientific Advice, Dossier Preparation, EU Regulatory Agent Services.',
                  color: '#10B981',
                },
                {
                  headline: 'Classification and Designation',
                  bodyText: 'Product Classification, Expedited Development Programs, New Active Substance Assessment.',
                  color: '#F59E0B',
                },
                {
                  headline: 'Drug Development',
                  bodyText: 'Advice on Manufacturing, Nonclinical and Clinical Development Plans, Translational Liaison Service.',
                  color: '#EF4444',
                },
                {
                  headline: 'Safety',
                  bodyText: 'Microbial and Viral Safety, Material of Animal and Human Origin, GMO and Risk Assessments.',
                  color: '#8B5CF6',
                },
                {
                  headline: 'Innovative Medicines',
                  bodyText: 'ATMPs, Biologics/Synthetics, Innovative Small Molecules, Combination Products, Individualized Therapies.',
                  color: '#06B6D4',
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
              defaultValue: null,
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              defaultValue: 'We\'re here to help you navigate the complexities of pharmaceutical development. Send us a message and we\'ll get back to you soon.',
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
                      defaultValue: 'Phone',
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
                      label: 'Phone',
                      number: '+49 (0) 163 2457821',
                    },
                  ],
                },
                {
                  name: 'address',
                  type: 'textarea',
                  required: false,
                  defaultValue: 'Consilienta GmbH\nHanfelder St. 6\n81475 Munich, Germany',
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
              defaultValue: 'Thank you for your message! We\'ll get back to you soon.',
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
                { platform: 'email', url: 'mailto:info@consilienta.com' },
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
          slug: 'aboutUs',
          dbName: 'about_us',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'About Us',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              defaultValue: 'Meet our team of experts',
            },
            {
              name: 'layout',
              type: 'select',
              required: true,
              defaultValue: 'default',
              options: [
                { label: 'Default Layout', value: 'default' },
                { label: 'Card Layout (3 columns)', value: 'cards' },
              ],
              admin: {
                description: 'Choose how to display the employee information',
              },
            },
            {
              name: 'sections',
              type: 'array',
              dbName: 'sections',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Founding Members',
                },
                {
                  name: 'employees',
                  type: 'array',
                  dbName: 'employees',
                  admin: {
                    useAsTitle: 'name',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'position',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'bio',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'photo',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                    },
                    {
                      name: 'email',
                      type: 'email',
                      required: false,
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      required: false,
                    },
                    {
                      name: 'socialLinks',
                      type: 'array',
                      dbName: 'social_links',
                      fields: [
                        {
                          name: 'platform',
                          type: 'select',
                          required: true,
                          options: [
                            { label: 'LinkedIn', value: 'linkedin' },
                            { label: 'Twitter', value: 'twitter' },
                            { label: 'Email', value: 'email' },
                            { label: 'Website', value: 'website' },
                          ],
                        },
                        {
                          name: 'url',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
              defaultValue: [
                {
                  sectionTitle: 'Founding Members',
                  employees: [
                    {
                      name: 'Dr. Elena Meurer',
                      position: 'co-founder & principal consultant managing director',
                      bio: 'Elena brings 25+ years of academic, industry and consulting experience. She provides strategic, CMC and regulatory consulting for products in all development stages and for various regulatory regions. Elena has supported several MAA and BLA preparations and national hospital exemptions. She guided companies in obtaining GMP manufacturing licenses and establishing CDMO activities. Elena also contributed to projects aimed at  establishing high regulatory standards in third countries and provided training to relevant regulatory agencies.',
                      photo: 3,
                      email: 'elena.meurer@consilienta.com',
                      phone: '+49 (0)163 2457821',
                      socialLinks: [
                        {
                          platform: 'linkedin',
                          url: '#',
                        },
                        {
                          platform: 'email',
                          url: 'mailto:elena.meurer@consilienta.com',
                        },
                      ],
                    },
                    {
                      name: 'Dr. Liron Sarid-Krebs',
                      position: 'co-founder & principal consultant managing director',
                      bio: 'Liron is a drug development and regulatory strategist with 15+ years of experience across academia, the biotech industry and consulting services. She has led global consultancy teams and overseen clinical development and regulatory consulting activities across various regions. Liron has successfully guided companies through complex global development processes from early phase to registration, including orphan and pediatric indications.',
                      photo: 5,
                      email: 'liron.sarid-krebs@consilienta.com',
                      phone: '+49 (0)157 87414589',
                      socialLinks: [
                        {
                          platform: 'linkedin',
                          url: '#',
                        },
                        {
                          platform: 'email',
                          url: 'mailto:liron.sarid-krebs@consilienta.com',
                        },
                      ],
                    },
                    {
                      name: 'Dr. Tiina Palomäki',
                      position: 'co-founder & principal consultant',
                      bio: 'Tiina has 25+ years of biotech experience in academia, regulatory agency and consulting services. She is an ex-regulator of Fimea and EMA (CAT, GTWP, CPWP, SWP) with expertise in ATMPs and biotech products. She provides scientific and global regulatory strategies, nonclinical and early phase clinical development support and agency interactions such as scientific advice, CTA, IND, MAA and BLA across the regions.',
                      photo: 6,
                      email: 'tiina.palomaki@consilienta.com',
                      phone: '+358 (0) 50 3684785',
                      socialLinks: [
                        {
                          platform: 'linkedin',
                          url: '#',
                        },
                        {
                          platform: 'email',
                          url: 'mailto:tiina.palomaki@consilienta.com',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'pageHeadline',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Page Title',
              admin: {
                description: 'Main page headline (like Contact, About Us, Legal Notice)',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              admin: {
                description: 'Optional subtitle displayed below the main headline',
              },
            },
          ],
        },
        {
          slug: 'backgroundImage',
          fields: backgroundImageFields,
        },
        {
          slug: 'contentSection',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: false,
              admin: {
                description: 'Section heading (optional)',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Section content - use line breaks for paragraphs',
              },
            },
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Numbered', value: 'numbered' },
                { label: 'Simple', value: 'simple' }
              ],
              admin: {
                description: 'Layout style for this section',
              },
            },
          ],
        },
        {
          slug: 'multiContent',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Content Sections',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Section heading (optional)',
                  },
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Section content - use line breaks for paragraphs',
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'legal-notice',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Impressum',
              admin: {
                description: 'Card title (e.g., "Impressum", "Legal Notice")',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              defaultValue: 'Angaben gemäß § 5 TMG',
              admin: {
                description: 'Card subtitle',
              },
            },
            {
              name: 'disclaimer',
              type: 'textarea',
              required: false,
              admin: {
                description: 'Optional disclaimer text in top-right corner',
              },
            },
            {
              name: 'companyInfo',
              type: 'group',
              label: '1. Company Information',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  required: true,
                  defaultValue: 'Consilienta GmbH',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Hanfelder Str. 6\n81475 München\nDeutschland',
                },
              ],
            },
            {
              name: 'contactInfo',
              type: 'group',
              label: '2. Contact Information',
              fields: [
                {
                  name: 'contactLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Kontakt',
                },
                {
                  name: 'phoneLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Telefon',
                },
                {
                  name: 'emailLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'E-Mail',
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: false,
                  defaultValue: '+49 (0)163 2457821',
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  defaultValue: 'info@consilienta.com',
                },
              ],
            },
            {
              name: 'managingDirectors',
              type: 'group',
              label: '3. Managing Directors',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  defaultValue: 'Vertreten durch die Geschäftsführer',
                },
                {
                  name: 'directors',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Dr. Elena Meurer\nDr. Liron Sarid-Krebs\nDr. Tiina Palomäki',
                },
              ],
            },
            {
              name: 'registrationInfo',
              type: 'group',
              label: '4. Registration Information',
              fields: [
                {
                  name: 'registerLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Registereintrag',
                },
                {
                  name: 'commercialRegisterLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Handelsregister',
                },
                {
                  name: 'registrationNumberLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Registernummer',
                },
                {
                  name: 'commercialRegister',
                  type: 'text',
                  required: true,
                  defaultValue: 'Amtsgericht München',
                },
                {
                  name: 'registerNumber',
                  type: 'text',
                  required: true,
                  defaultValue: 'HRB 302328',
                },
              ],
            },
            {
              name: 'vatInfo',
              type: 'group',
              label: '5. VAT Information',
              fields: [
                {
                  name: 'vatLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Umsatzsteuer-ID',
                },
                {
                  name: 'vatDescription',
                  type: 'text',
                  required: true,
                  defaultValue: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG',
                },
                {
                  name: 'vatId',
                  type: 'text',
                  required: true,
                  defaultValue: 'DE[bitte einfügen]',
                },
              ],
            },
            {
              name: 'responsiblePerson',
              type: 'group',
              label: '6. Responsible for Content',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  defaultValue: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  defaultValue: 'Dr. Elena Meurer',
                },
                {
                  name: 'companyName',
                  type: 'text',
                  required: true,
                  defaultValue: 'Consilienta GmbH',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Hanfelder Str. 6\n81475 München',
                },
              ],
            },
            {
              name: 'disclaimers',
              type: 'group',
              label: '7. Legal Disclaimers',
              fields: [
                {
                  name: 'disclaimerTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Haftungsausschluss',
                },
                {
                  name: 'contentLiabilityLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Haftung für Inhalte',
                },
                {
                  name: 'contentLiability',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
                },
                {
                  name: 'linkLiabilityLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Haftung für Links',
                },
                {
                  name: 'linkLiability',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
                },
                {
                  name: 'copyrightLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Urheberrecht',
                },
                {
                  name: 'copyright',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
                },
              ],
            },
            {
              name: 'additionalSections',
              type: 'array',
              label: '8. Additional Sections',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  title: 'EU-Streitschlichtung',
                  content: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.\n\nWir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                },
              ],
            },
          ],
        },
        {
          slug: 'termsOfService',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Terms of Service',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              defaultValue: 'Terms and Conditions of Use',
            },
            {
              name: 'effectiveDate',
              type: 'text',
              required: true,
              defaultValue: 'Effective Date: [To be filled]',
            },
            {
              name: 'sections',
              type: 'array',
              label: 'Content Sections',
              minRows: 1,
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  sectionTitle: 'Acceptance of Terms',
                  content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.',
                },
                {
                  sectionTitle: 'Use License',
                  content: 'Permission is granted to temporarily download one copy of the materials on Consilienta\'s website for personal, non-commercial transitory viewing only.',
                },
                {
                  sectionTitle: 'Disclaimer',
                  content: 'The materials on Consilienta\'s website are provided on an \'as is\' basis. Consilienta makes no warranties, expressed or implied.',
                },
                {
                  sectionTitle: 'Limitations',
                  content: 'In no event shall Consilienta or its suppliers be liable for any damages arising out of the use or inability to use the materials on Consilienta\'s website.',
                },
                {
                  sectionTitle: 'Contact Information',
                  content: 'If you have any questions about these Terms of Service, please contact us at info@consilienta.com.',
                },
              ],
            },
          ],
        },
        {
          slug: 'cookies',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Cookie Policy',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              defaultValue: 'How We Use Cookies',
            },
            {
              name: 'lastUpdated',
              type: 'text',
              required: true,
              defaultValue: 'Last Updated: [To be filled]',
            },
            {
              name: 'sections',
              type: 'array',
              label: 'Content Sections',
              minRows: 1,
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  sectionTitle: 'What Are Cookies',
                  content: 'Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.',
                },
                {
                  sectionTitle: 'How We Use Cookies',
                  content: 'We use cookies to improve your experience on our website, analyze website traffic, and understand where our visitors are coming from.',
                },
                {
                  sectionTitle: 'Types of Cookies We Use',
                  content: 'Essential Cookies: These are necessary for the website to function properly. Analytics Cookies: These help us understand how visitors interact with our website.',
                },
                {
                  sectionTitle: 'Managing Cookies',
                  content: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.',
                },
                {
                  sectionTitle: 'Contact Us',
                  content: 'If you have any questions about our use of cookies, please contact us at info@consilienta.com.',
                },
              ],
            },
          ],
        },
        {
          slug: 'privacy',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Privacy Policy',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              required: false,
              defaultValue: 'How We Protect Your Privacy',
            },
            {
              name: 'lastUpdated',
              type: 'text',
              required: true,
              defaultValue: 'Last Updated: [To be filled]',
            },
            {
              name: 'sections',
              type: 'array',
              label: 'Content Sections',
              minRows: 1,
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  sectionTitle: 'Information We Collect',
                  content: 'We collect information you provide directly to us, such as when you contact us through our website, request information about our services, or communicate with us.',
                },
                {
                  sectionTitle: 'How We Use Your Information',
                  content: 'We use the information we collect to provide, maintain, and improve our services, respond to your inquiries, and communicate with you about our pharmaceutical consulting services.',
                },
                {
                  sectionTitle: 'Data Security',
                  content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                },
                {
                  sectionTitle: 'Your Rights',
                  content: 'You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.',
                },
                {
                  sectionTitle: 'Contact Us',
                  content: 'If you have questions about this Privacy Policy, please contact us at info@consilienta.com.',
                },
              ],
            },
          ],
        },
        {
          slug: 'textBlock',
          fields: [
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' }
              ],
              admin: {
                description: 'Text alignment',
              },
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'lg',
              options: [
                { label: 'Small (max-w-2xl)', value: 'sm' },
                { label: 'Medium (max-w-4xl)', value: 'md' },
                { label: 'Large (max-w-6xl)', value: 'lg' },
                { label: 'Extra Large (max-w-7xl)', value: 'xl' },
                { label: 'Full Width', value: 'full' }
              ],
              admin: {
                description: 'Maximum width of the content container',
              },
            },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'frosted',
              options: [
                { label: 'Transparent', value: 'transparent' },
                { label: 'Frosted Glass', value: 'frosted' },
                { label: 'Solid Background', value: 'solid' }
              ],
              admin: {
                description: 'Background style for the text block',
              },
            },
            {
              name: 'textColor',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White/Light', value: 'white' },
                { label: 'Dark', value: 'dark' }
              ],
              admin: {
                description: 'Text color theme',
              },
            },
            {
              name: 'contentBlocks',
              type: 'array',
              label: 'Content Blocks',
              admin: {
                description: 'Add flexible content blocks - each can be single or multi-column',
              },
              fields: [
                {
                  name: 'blockType',
                  type: 'select',
                  required: true,
                  defaultValue: 'singleColumn',
                  options: [
                    { label: 'Single Column Content', value: 'singleColumn' },
                    { label: 'Multi-Column Content', value: 'multiColumn' }
                  ],
                  admin: {
                    description: 'Choose the layout type for this content block',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ defaultFeatures }) => [
                      ...defaultFeatures,
                    ],
                  }),
                  admin: {
                    condition: (data, siblingData) => siblingData.blockType === 'singleColumn',
                    description: 'Single column rich text content',
                  },
                },
                {
                  name: 'columns',
                  type: 'number',
                  defaultValue: 2,
                  min: 1,
                  max: 4,
                  admin: {
                    condition: (data, siblingData) => siblingData.blockType === 'multiColumn',
                    description: 'Number of columns (1-4)',
                  },
                },
                {
                  name: 'columnContent',
                  type: 'array',
                  label: 'Column Content',
                  admin: {
                    condition: (data, siblingData) => siblingData.blockType === 'multiColumn',
                    description: 'Content for each column',
                  },
                  fields: [
                    {
                      name: 'content',
                      type: 'richText',
                      required: true,
                      editor: lexicalEditor({
                        features: ({ defaultFeatures }) => [
                          ...defaultFeatures,
                        ],
                      }),
                      admin: {
                        description: 'Rich text content for this column',
                      },
                    },
                  ],
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
