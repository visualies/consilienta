import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function createImprint() {
  try {
    const payload = await getPayload({ config })

    // Check if imprint page already exists
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'imprint'
        }
      },
      limit: 1
    })

    if (existing.docs.length > 0) {
      console.log('Imprint page already exists')
      return
    }

    // Create imprint page
    const page = await payload.create({
      collection: 'pages',
      data: {
        title: 'Imprint',
        slug: 'imprint',
        meta: {
          title: 'Imprint - Consilienta',
          description: 'Legal information and company details for Consilienta GmbH.',
        },
        layout: [
          {
            blockType: 'imprint',
          }
        ],
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })

    console.log(`Created imprint page: ${page.id}`)
  } catch (error) {
    console.error('Error creating imprint page:', error)
  }
}

createImprint()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to create imprint:', error)
    process.exit(1)
  })