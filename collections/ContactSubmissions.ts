import { CollectionConfig } from 'payload/types'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'service', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: false,
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: false,
          admin: {
            readOnly: true,
            width: '50%',
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
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          displayFormat: 'MMM do, yyyy h:mm a',
        },
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
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
      admin: {
      },
    },
  ],
}