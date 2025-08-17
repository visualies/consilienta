import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedPages() {
  try {
    const payload = await getPayload({ config })

    // Define pages to create
    const pages = [
      {
        title: 'Contact Us',
        slug: 'contact',
        meta: {
          title: 'Contact Us - Consilienta',
          description: 'Get in touch with Consilienta for expert pharmaceutical consulting services.',
        },
        layout: [
          {
            blockType: 'contactForm',
          }
        ]
      },
      {
        title: 'About Us', 
        slug: 'about-us',
        meta: {
          title: 'About Us - Consilienta',
          description: 'Learn about the Consilienta team and our pharmaceutical consulting expertise.',
        },
        layout: [
          {
            blockType: 'aboutUs',
          }
        ]
      },
      {
        title: 'How We Help',
        slug: 'how-we-help', 
        meta: {
          title: 'How We Help - Consilienta',
          description: 'Discover our pharmaceutical consulting services and how we can help your project.',
        },
        layout: [
          {
            blockType: 'solutions',
          }
        ]
      },
      {
        title: 'Insights',
        slug: 'insights',
        meta: {
          title: 'Insights - Consilienta', 
          description: 'Industry insights and expertise from our pharmaceutical consulting team.',
        },
        layout: [
          {
            blockType: 'insights',
          }
        ]
      },
      {
        title: 'Careers',
        slug: 'careers',
        meta: {
          title: 'Careers - Consilienta',
          description: 'Join our team of pharmaceutical consulting experts.',
        },
        layout: [
          {
            blockType: 'careers',
          }
        ]
      },
    ]

    for (const pageData of pages) {
      // Check if page already exists
      const existingPage = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: pageData.slug
          }
        },
        limit: 1
      })

      if (existingPage.docs.length > 0) {
        console.log(`Page "${pageData.title}" already exists, skipping...`)
        continue
      }

      // Create the page
      const page = await payload.create({
        collection: 'pages',
        data: {
          ...pageData,
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
      })

      console.log(`Created page: ${pageData.title} (ID: ${page.id})`)
    }

    console.log('Pages seeding completed successfully')
  } catch (error) {
    console.error('Error seeding pages:', error)
  }
}

// Run the seed function
seedPages()
  .then(() => {
    console.log('All pages seeded')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Pages seeding failed:', error)
    process.exit(1)
  })