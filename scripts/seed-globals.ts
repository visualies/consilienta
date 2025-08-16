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
      console.log('Globals already exists, skipping...')
      return
    }

    // Get media for logos
    const media = await payload.find({
      collection: 'media',
      limit: 10,
    })

    const logoMedia = media.docs.find(doc => doc.filename?.includes('logo-without-claim'))
    const logoWithClaimMedia = media.docs.find(doc => doc.filename?.includes('logo-with-claim'))

    // Create globals with header and footer data
    const globals = await payload.updateGlobal({
      slug: 'globals',
      data: {
        header: {
          logo: logoMedia?.id || null,
          logoWhite: logoMedia?.id || null,
          navigation: [
            { label: 'Home', link: '#home' },
            { label: 'How We Help', link: '#how-we-help' },
            { label: 'About Us', link: '#about' },
            { label: 'Insights', link: '#insights' },
            { label: 'Careers', link: '#careers' },
          ],
          contactButton: {
            text: 'Contact Us',
            link: '#contact',
          },
        },
        footer: {
          logo: logoWithClaimMedia?.id || logoMedia?.id || null,
          description: 'Expert pharmaceutical consulting guiding your product from concept to approval. Comprehensive solutions for complex development challenges.',
          socialLinks: [
            { platform: 'linkedin', url: '#' },
            { platform: 'email', url: 'mailto:contact@consilienta.com' },
          ],
          services: [
            { name: 'Regulatory Strategy', link: '#' },
            { name: 'Clinical Development', link: '#' },
            { name: 'Market Access', link: '#' },
            { name: 'Quality Assurance', link: '#' },
            { name: 'Compliance', link: '#' },
          ],
          companyLinks: [
            { name: 'About Us', link: '#about' },
            { name: 'Careers', link: '#careers' },
            { name: 'Insights', link: '#insights' },
            { name: 'Contact', link: '#contact' },
            { name: 'Privacy Policy', link: '#privacy' },
          ],
          copyright: '© 2024 Consilienta. All rights reserved. Pharmaceutical consulting excellence.',
          legalLinks: [
            { name: 'Terms of Service', link: '#terms' },
            { name: 'Privacy Policy', link: '#privacy' },
            { name: 'Cookies', link: '#cookies' },
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