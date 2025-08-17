import { getPayload } from 'payload'
import config from '../payload.config'

async function seedLandingPage() {
  try {
    const payload = await getPayload({ config })

    // Check if landing page already exists
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })

    if (existingPage.docs.length > 0) {
      console.log('Landing page already exists, skipping...')
      return
    }

    // Create the landing page
    const landingPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        meta: {
          title: 'Consilienta - Biopharma Consulting Excellence',
          description: 'Expert pharmaceutical consulting guiding your product from concept to approval. Comprehensive solutions for complex development challenges.',
        },
        layout: [
          {
            blockType: 'hero',
            variant: 'high-impact',
            badge: 'Biopharma Consulting Excellence',
            headline: 'Guiding your product from concept to approval',
            description: 'No matter how complex or innovative your development journey may be. We will help you navigate each step of product development with clarity and confidence.',
            background: {
              type: '3d-model',
              overlay: false,
            },
            buttons: [
              {
                text: 'Get in Touch',
                variant: 'cta',
                link: '#contact',
                action: 'scroll',
              },
              {
                text: 'Learn More',
                variant: 'secondary',
                link: '#about',
                action: 'scroll',
              },
            ],
          },
          {
            blockType: 'features',
            title: 'Why Choose Consilienta',
            subtitle: 'Our comprehensive approach combines deep expertise with innovative solutions to accelerate your pharmaceutical development journey.',
            layout: 'grid-2x3',
            features: [
              {
                icon: 'Users',
                title: 'Expert Team',
                description: 'Blend of ex-regulatory, industry, consulting and academic experience',
              },
              {
                icon: 'Globe',
                title: 'Broad Experience',
                description: 'From small biotech startups to large pharmaceutical corporations',
              },
              {
                icon: 'Target',
                title: 'Tailored Support',
                description: 'Agile, attentive and personalized service with true partnership',
              },
              {
                icon: 'Award',
                title: 'Comprehensive Coverage',
                description: 'Broad coverage of product class & disease types',
              },
              {
                icon: 'Zap',
                title: 'Emerging Technologies',
                description: 'Ample experience with a range of emerging technologies and medicines',
              },
              {
                icon: 'Lightbulb',
                title: 'Novel Approaches',
                description: 'Out-of-the-box solutions for complex challenges',
              },
            ],
          },
          {
            blockType: 'cta',
            variant: 'standard',
            title: 'Ready to Transform Your Development Process?',
            description: 'Partner with Consilienta and experience the difference that expert guidance, innovative solutions, and personalized service can make for your pharmaceutical development journey.',
            background: {
              type: 'solid',
              color: 'rgba(255, 255, 255, 0.1)',
            },
            buttons: [
              {
                text: 'Schedule Consultation',
                variant: 'cta',
                link: '#contact',
                action: 'scroll',
              },
              {
                text: 'Download Brochure',
                variant: 'secondary',
                link: '#brochure',
                action: 'link',
              },
            ],
          },
        ],
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })

    console.log('Landing page created successfully:', landingPage.id)
  } catch (error) {
    console.error('Error seeding landing page:', error)
  }
}

// Run the seed function
seedLandingPage()
  .then(() => {
    console.log('Seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
