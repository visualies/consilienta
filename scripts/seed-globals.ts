import { getPayload } from 'payload'
import config from '../payload.config'

async function seedGlobals() {
  try {
    const payload = await getPayload({ config })

    // Check if globals already exists
    const existingGlobals = await payload.findGlobal({
      slug: 'globals',
    })

    if (existingGlobals.id) {
      console.log('Globals already exists, updating with new navigation links...')
    } else {
      console.log('Creating new globals...')
    }

    // Update globals with branding configuration
    const globals = await payload.updateGlobal({
      slug: 'globals',
      data: {
        branding: {
          brandColor: '#4041D5',
          brandGradient: {
            angle: 135,
            colors: [
              { color: '#e89d87', position: 0 },
              { color: '#a985b3', position: 25 },
              { color: '#4041d5', position: 60 },
              { color: '#2a1846', position: 100 },
            ],
          },
        },
        header: {
          ...existingGlobals.header,
          navigation: [
            { label: 'Home', link: '/' },
            { label: 'How We Help', link: '/how-we-help' },
            { label: 'About Us', link: '/about-us' },
            { label: 'Insights', link: '/insights' },
            { label: 'Careers', link: '/careers' },
          ],
          contactButton: {
            text: 'Contact Us',
            link: '/contact',
          },
        },
        footer: {
          ...existingGlobals.footer,
          companyLinks: [
            { name: 'About Us', link: '/about-us' },
            { name: 'Careers', link: '/careers' },
            { name: 'Insights', link: '/insights' },
            { name: 'Contact', link: '/contact' },
            { name: 'Privacy Policy', link: '/privacy' },
          ],
          legalLinks: [
            { name: 'Terms of Service', link: '/terms' },
            { name: 'Privacy Policy', link: '/privacy' },
            { name: 'Cookies', link: '/cookies' },
          ],
        },
      },
    })

    console.log('Globals created successfully:', globals.id)
  } catch (error) {
    console.error('Error seeding globals:', error)
  }
}

// Run the seed function
seedGlobals()
  .then(() => {
    console.log('Globals seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Globals seeding failed:', error)
    process.exit(1)
  })