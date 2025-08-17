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
            title: 'About Us',
            subtitle: 'Meet our team of experts',
            sections: [
              {
                sectionTitle: 'Founding Members',
                employees: [
                  {
                    name: 'Dr. Elena Meurer',
                    position: 'co-founder & principal consultant managing director',
                    bio: 'Elena brings 25+ years of academic, industry and consulting experience. She provides strategic, CMC and regulatory consulting for products in all development stages and for various regulatory regions.',
                    photo: 7, // portrait1.jpg
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
                    bio: 'Liron is a drug development and regulatory strategist with 15+ years of experience across academia, the biotech industry and consulting services.',
                    photo: 8, // portrait2.jpg
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
                    bio: 'Tiina has 25+ years of biotech experience in academia, regulatory agency and consulting services. She is an ex-regulator of Fimea and EMA.',
                    photo: 9, // portrait3.jpg
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