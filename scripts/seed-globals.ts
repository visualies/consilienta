import 'dotenv/config'
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

async function seedGlobals() {
  try {
    const payload = await getPayload({ config: payloadConfig })

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
          frostingStrength: 40,
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
          logo: 5, // logo-transparent-with-claim.svg
          logoWhite: 6, // logo-transparent-without-claim.svg
          navigation: [
            { label: 'Home', link: '/' },
            { label: 'How We Help', link: '/how-we-help' },
            { label: 'About Us', link: '/about-us' },
            { label: 'Insights & News', link: '/insights' },
            { label: 'Careers', link: '/careers' },
          ],
          contactButton: {
            text: 'Contact Us',
            link: '/contact',
          },
        },
        homepageAnnouncement: {
          enabled: true,
          label: 'Catalent/Consilienta Workshop',
          title: 'Catalent/Consilienta Workshop',
          description: 'Unlocking Biotech Value: Speed to First-in-Human Matters',
          dateText: 'Tuesday, 23 June 2026 from 1.00 - 5.30 pm',
          locationText: 'BioM Biotech Cluster Development GmbH, Am Klopferspitz 19a, 82152 Martinsried, Germany',
          ctaText: 'Registration Link',
          ctaLink: '/insights/unlocking-biotech-value-speed-to-first-in-human-matters',
          hideAfter: '2026-06-23T17:30:00+02:00',
        },
        footer: {
          logo: 5, // logo-transparent-with-claim.svg
          address: "Hanfelder St. 6\n81475 Munich\nGermany",
          phones: [
            { phone: "+49 (0)163 2457821" },
            { phone: "+49 (0) 157 87414589" }
          ],
          socialLinks: [
            { platform: 'linkedin', url: 'https://linkedin.com/company/consilienta' },
            { platform: 'email', url: 'mailto:info@consilienta.com' },
          ],
          companyLinks: [
            { name: 'About Us', link: '/about-us' },
            { name: 'Careers', link: '/careers' },
            { name: 'Insights & News', link: '/insights' },
            { name: 'Contact', link: '/contact' },
            { name: 'Privacy Policy', link: '/privacy' },
          ],
          copyright: "© 2024 Consilienta. All rights reserved.",
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
