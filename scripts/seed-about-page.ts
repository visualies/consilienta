import { getPayload } from 'payload'
import config from '../payload.config'

const seedAboutPage = async () => {
  try {
    const payload = await getPayload({ config })

    // Check if about page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about',
        },
      },
    })

    if (existingPages.docs.length > 0) {
      console.log('About page already exists')
      return
    }

    // Create the about page
    const aboutPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about',
        meta: {
          title: 'About Us - Consilienta',
          description: 'Meet our team of pharmaceutical consulting experts guiding your product development journey.',
        },
        layout: [
          {
            blockType: 'aboutUs',
            title: 'About Us',
            subtitle: 'Meet our team of experts dedicated to guiding your pharmaceutical development journey',
            sections: [
              {
                sectionTitle: 'Founding Members',
                employees: [
                  {
                    name: 'Dr. Jane Smith',
                    position: 'Chief Executive Officer',
                    bio: 'With over 20 years of experience in pharmaceutical development, Dr. Smith leads our strategic initiatives and regulatory guidance programs.',
                    email: 'jane.smith@consilienta.com',
                    phone: '+49 (0) 163 2457821',
                    socialLinks: [
                      {
                        platform: 'linkedin',
                        url: 'https://linkedin.com/in/janesmith'
                      },
                      {
                        platform: 'email',
                        url: 'mailto:jane.smith@consilienta.com'
                      }
                    ]
                  },
                  {
                    name: 'Dr. John Doe',
                    position: 'Chief Scientific Officer',
                    bio: 'A recognized expert in regulatory affairs with extensive experience in both European and US markets, specializing in innovative therapies.',
                    email: 'john.doe@consilienta.com',
                    phone: '+49 (0) 163 2457822',
                    socialLinks: [
                      {
                        platform: 'linkedin',
                        url: 'https://linkedin.com/in/johndoe'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })

    console.log('About page created successfully:', aboutPage.id)
  } catch (error) {
    console.error('Error seeding about page:', error)
    process.exit(1)
  }

  process.exit(0)
}

seedAboutPage()