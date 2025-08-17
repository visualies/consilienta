import { CollectionConfig } from 'payload/types'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'service', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        description: 'First name of the person submitting the form',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        description: 'Last name of the person submitting the form',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address for follow-up',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: false,
      admin: {
        description: 'Company name (optional)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      admin: {
        description: 'Phone number (optional)',
      },
    },
    {
      name: 'service',
      type: 'select',
      required: true,
      options: [
        { label: 'Regulatory Strategy', value: 'regulatory' },
        { label: 'Clinical Development', value: 'clinical' },
        { label: 'Market Access', value: 'market-access' },
        { label: 'Quality Assurance', value: 'quality' },
        { label: 'Compliance', value: 'compliance' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Service they are interested in',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Their inquiry or message',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        description: 'When the form was submitted',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Status of the inquiry',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Internal notes about this submission',
      },
    },
  ],
}