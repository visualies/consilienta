import { getPayload } from 'payload'
import config from '../payload.config'

async function seedContactPage() {
  try {
    const payload = await getPayload({ config })

  // Check if contact page already exists
  const existingContactPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'contact'
      }
    }
  })

  if (existingContactPage.docs.length > 0) {
    console.log('Contact page already exists, skipping...')
    return
  }

  // Create contact page
  const contactPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Contact Us',
      slug: 'contact',
      meta: {
        title: 'Contact Us - Consilienta',
        description: 'Get in touch with Consilienta for expert pharmaceutical consulting services. We\'re here to help you navigate the complexities of pharmaceutical development.',
      },
      layout: [
        {
          blockType: 'contactForm',
          title: 'Get in Touch',
          subtitle: 'Ready to start your journey?',
          description: 'We\'re here to help you navigate the complexities of pharmaceutical development. Send us a message and we\'ll get back to you within 24 hours.',
          contactInfo: {
            email: 'contact@consilienta.com',
            phone: '+1 (555) 123-4567',
            address: '123 Innovation Drive, Suite 100, San Francisco, CA 94105',
          },
          formFields: [
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
          submitText: 'Send Message',
          successMessage: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        },
      ],
      status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

    console.log('Contact page created successfully:', contactPage.id)
  } catch (error) {
    console.error('Error seeding contact page:', error)
  }
}

// Run the seed function
seedContactPage()
  .then(() => {
    console.log('Contact page seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Contact page seeding failed:', error)
    process.exit(1)
  })
