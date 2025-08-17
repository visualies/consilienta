import 'dotenv/config'
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

async function seedAboutUs() {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Check if home page exists
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })

    if (existingPage.docs.length === 0) {
      console.log('Home page does not exist. Please run seed-landing-page first.')
      return
    }

    const homePage = existingPage.docs[0]

    // Check if aboutUs block already exists and has sections with employees
    const aboutUsBlock = homePage.layout?.find((block: any) => block.blockType === 'aboutUs')
    
    if (aboutUsBlock && aboutUsBlock.sections && aboutUsBlock.sections.length > 0 && aboutUsBlock.sections[0].employees && aboutUsBlock.sections[0].employees.length > 0) {
      console.log('About Us section already has employees, skipping...')
      return
    }

    // Employee data from employees.txt
    const employeeData = [
      {
        name: 'Dr. Elena Meurer',
        position: 'co-founder & principal consultant managing director',
        bio: 'Elena brings 25+ years of academic, industry and consulting experience. She provides strategic, CMC and regulatory consulting for products in all development stages and for various regulatory regions. Elena has supported several MAA and BLA preparations and national hospital exemptions. She guided companies in obtaining GMP manufacturing licenses and establishing CDMO activities. Elena also contributed to projects aimed at  establishing high regulatory standards in third countries and provided training to relevant regulatory agencies.',
        photo: 7,
        email: 'elena.meurer@consilienta.com',
        phone: '+49 (0)163 2457821',
        socialLinks: [
          {
            platform: 'linkedin',
            url: '#', // linked link tba
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
        bio: 'Liron is a drug development and regulatory strategist with 15+ years of experience across academia, the biotech industry and consulting services. She has led global consultancy teams and overseen clinical development and regulatory consulting activities across various regions. Liron has successfully guided companies through complex global development processes from early phase to registration, including orphan and pediatric indications.',
        photo: 8,
        email: 'liron.sarid-krebs@consilienta.com',
        phone: '+49 (0)157 87414589',
        socialLinks: [
          {
            platform: 'linkedin',
            url: '#', // linked link tba
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
        bio: 'Tiina has 25+ years of biotech experience in academia, regulatory agency and consulting services. She is an ex-regulator of Fimea and EMA (CAT, GTWP, CPWP, SWP) with expertise in ATMPs and biotech products. She provides scientific and global regulatory strategies, nonclinical and early phase clinical development support and agency interactions such as scientific advice, CTA, IND, MAA and BLA across the regions.',
        photo: 9,
        email: 'tiina.palomaki@consilienta.com',
        phone: '+358 (0) 50 3684785',
        socialLinks: [
          {
            platform: 'linkedin',
            url: '#', // linked link tba
          },
          {
            platform: 'email',
            url: 'mailto:tiina.palomaki@consilienta.com',
          },
        ],
      },
    ]

    // Remove aboutUs block from home page layout
    let updatedLayout = homePage.layout || []

    // Remove any existing aboutUs block from home page
    updatedLayout = updatedLayout.filter((block: any) => block.blockType !== 'aboutUs')

    // Update the page
    const updatedPage = await payload.update({
      collection: 'pages',
      id: homePage.id,
      data: {
        layout: updatedLayout,
      },
    })

    console.log('About Us section seeded successfully:', updatedPage.id)
  } catch (error) {
    console.error('Error seeding About Us section:', error)
  }
}

// Run the seed function
seedAboutUs()
  .then(() => {
    console.log('About Us seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('About Us seeding failed:', error)
    process.exit(1)
  })