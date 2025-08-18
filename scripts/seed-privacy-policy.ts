import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedPrivacyPolicy() {
  try {
    const payload = await getPayload({ config })

    // Check if privacy policy page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'privacy'
        }
      }
    })

    const pageData = {
      title: 'Privacy Policy',
      slug: 'privacy',
      meta: {
        title: 'Privacy Policy - Consilienta GmbH',
        description: 'Privacy Policy and data protection information for Consilienta GmbH',
      },
      layout: [
        {
          blockType: 'pageHeadline',
          title: 'Privacy Policy',
          subtitle: 'Last updated: [insert date]'
        },
        {
          blockType: 'multiContent',
          sections: [
            {
              content: 'Consilienta GmbH ("we", "us") is the controller of personal data collected through this website.'
            },
            {
              title: 'What we collect',
              content: 'We only collect personal data that you provide when contacting us, such as your name, e-mail address, and the content of your message.'
            },
            {
              title: 'Why we use it',
              content: 'We use this data solely to respond to your inquiry. The legal basis is Art. 6(1)(b) GDPR (necessary for the performance of a contract or pre-contractual steps) or Art. 6(1)(f) GDPR (legitimate interests in communication).'
            },
            {
              title: 'Sharing of data',
              content: 'We do not sell or trade your data. It may be processed by service providers (e.g. website host, IT support) who are contractually bound to act only on our instructions.'
            },
            {
              title: 'Storage period',
              content: 'We store your data only as long as necessary to handle your inquiry, unless legal retention obligations require longer storage.'
            },
            {
              title: 'Your rights',
              content: 'You have the right to request access, rectification, erasure, restriction, data portability, and to object to processing. You also have the right to lodge a complaint with a supervisory authority.'
            },
            {
              title: 'Contact',
              content: 'If you have questions about this Privacy Policy, please contact us.\n\nConsilienta GmbH\nHanfelder Str. 6, 81475 Munich, Germany\nE-mail: info@consilienta.com\nPhone: +49 (0)163 2457821'
            }
          ]
        }
      ],
      status: 'published'
    }

    if (existingPages.docs.length > 0) {
      console.log('Privacy policy page already exists. Updating...')
      
      // Update existing page
      await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData
      })
      
      console.log('Privacy policy page updated successfully!')
    } else {
      // Create new page
      await payload.create({
        collection: 'pages',
        data: pageData
      })
      
      console.log('Privacy policy page created successfully!')
    }

  } catch (error) {
    console.error('Error seeding privacy policy:', error)
    throw error
  }
}

seedPrivacyPolicy()
  .then(() => {
    console.log('Privacy policy seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Privacy policy seeding failed:', error)
    process.exit(1)
  })