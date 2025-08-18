import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedTermsOfService() {
  try {
    const payload = await getPayload({ config })

    // Check if terms of service page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'terms'
        }
      }
    })

    const pageData = {
      title: 'Terms of Service',
      slug: 'terms',
      meta: {
        title: 'Terms of Service - Consilienta GmbH',
        description: 'Terms of Use and Service for Consilienta GmbH website',
      },
      layout: [
        {
          blockType: 'pageHeadline',
          title: 'Terms of Use & Service',
          subtitle: 'Effective Date: [to be inserted]'
        },
        {
          blockType: 'multiContent',
          sections: [
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using this website, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree, you must not use this website.'
            },
            {
              title: '2. Scope',
              content: 'These Terms apply to your use of this website. They do not govern any consulting or other professional services provided by Consilienta GmbH, which are subject to separate written agreements.'
            },
            {
              title: '3. Intellectual Property',
              content: 'All content on this website, including but not limited to text, graphics, logos, and images, is the property of Consilienta GmbH or its licensors and is protected under copyright and trademark laws. Any reproduction, distribution, or modification without prior written consent is prohibited.'
            },
            {
              title: '4. Use License',
              content: 'You may temporarily download one copy of the materials on this website for personal, non-commercial, transitory viewing only. This license is a limited right, not a transfer of ownership, and under it you may not:\n\n1. modify or copy the materials\n2. use the materials for any commercial purpose\n3. attempt to decompile or reverse engineer any software on the website\n4. remove any copyright or proprietary notices\n5. transfer the materials to another person or mirror them on another server\n\nThis license terminates automatically if you violate these restrictions.'
            },
            {
              title: '5. Prohibited Uses',
              content: 'You may not use this website in any way that violates laws, infringes on third-party rights, or interferes with the proper functioning of the website.'
            },
            {
              title: '6. Scientific and Medical Disclaimer',
              content: 'The content on this website is provided for general informational purposes only. While Consilienta GmbH strives to ensure accuracy, it is not intended as medical advice, diagnosis, treatment recommendation, or a substitute for consultation with qualified healthcare or scientific professionals. Decisions regarding patient care, therapies, or clinical trials must not be made based solely on information from this website. Consilienta GmbH assumes no responsibility for actions taken based on website content.'
            },
            {
              title: '7. Disclaimer of Warranties',
              content: 'This website and its contents are provided "as is." Consilienta GmbH makes no warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.'
            },
            {
              title: '8. Limitation of Liability',
              content: 'In no event shall Consilienta GmbH or its affiliates be liable for any damages (including but not limited to loss of data, profit, or business interruption) arising from the use or inability to use this website, even if Consilienta GmbH has been advised of such possibilities.'
            },
            {
              title: '9. Links to Third Parties',
              content: 'This website may contain links to external websites. Consilienta GmbH has no control over the content of such websites and accepts no responsibility or liability for them.'
            },
            {
              title: '10. Amendments',
              content: 'Consilienta GmbH may update these Terms at any time without prior notice. Continued use of the website constitutes acceptance of the current version.'
            },
            {
              title: '11. Governing Law',
              content: 'These Terms are governed by the laws of the Federal Republic of Germany. To the extent legally permissible, exclusive place of jurisdiction is Munich.'
            },
            {
              title: '12. Contact',
              content: 'If you have questions about these Terms of Service, please contact us.\n\nConsilienta GmbH\nHanfelder Str. 6, 81475 Munich, Germany\nE-mail: info@consilienta.com\nPhone: +49 (0)163 2457821'
            }
          ]
        }
      ],
      status: 'published'
    }

    if (existingPages.docs.length > 0) {
      console.log('Terms of service page already exists. Updating...')
      
      // Update existing page
      await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData
      })
      
      console.log('Terms of service page updated successfully!')
    } else {
      // Create new page
      await payload.create({
        collection: 'pages',
        data: pageData
      })
      
      console.log('Terms of service page created successfully!')
    }

  } catch (error) {
    console.error('Error seeding terms of service:', error)
    throw error
  }
}

seedTermsOfService()
  .then(() => {
    console.log('Terms of service seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Terms of service seeding failed:', error)
    process.exit(1)
  })