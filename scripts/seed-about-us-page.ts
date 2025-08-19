import 'dotenv/config'
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

async function seedAboutUs() {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Check if About Us page already exists
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about-us',
        },
      },
      limit: 1,
    })

    if (existingPage.docs.length > 0) {
      console.log('About Us page already exists, deleting and recreating...')
      await payload.delete({
        collection: 'pages',
        id: existingPage.docs[0].id,
      })
    }

    // Create the About Us page with simple structure first
    const aboutUsPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about-us',
        meta: {
          title: 'About Us - Consilienta',
          description: 'Meet the founding team of Consilienta and learn about our mission to drive innovation in pharmaceutical consulting.',
        },
        status: 'published',
        layout: [
          // 1. Main page headline - Founders
          {
            blockType: 'headline',
            title: 'Founders',
            subtitle: 'The co-founders of Consilienta',
          },
          // 2. About Us block with employee data (using existing structure)
          {
            blockType: 'employeeCards',
            title: 'About Us',
            subtitle: 'Meet our team of experts',
            layout: 'default',
            sections: [
              {
                sectionTitle: 'Founding Members',
                employees: [
                  {
                    name: 'Dr. Elena Meurer',
                    position: 'co-founder & principal consultant managing director',
                    bio: 'Elena brings 25+ years of academic, industry and consulting experience. She provides strategic, CMC and regulatory consulting for products in all development stages and for various regulatory regions. Elena has supported several MAA and BLA preparations and national hospital exemptions. She guided companies in obtaining GMP manufacturing licenses and establishing CDMO activities. Elena also contributed to projects aimed at establishing high regulatory standards in third countries and provided training to relevant regulatory agencies.',
                    photo: 7,
                    email: 'elena.meurer@consilienta.com',
                    phone: '+49 (0) 163 2457821',
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
                    bio: 'Liron is a drug development and regulatory strategist with 15+ years of experience across academia, the biotech industry and consulting services. She has led global consultancy teams and overseen clinical development and regulatory consulting activities across various regions. Liron has successfully guided companies through complex global development processes from early phase to registration, including orphan and pediatric indications.',
                    photo: 8,
                    email: 'liron.sarid-krebs@consilienta.com',
                    phone: '+49 (0) 157 87414589',
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
                    bio: 'Tiina has 25+ years of biotech experience in academia, regulatory agency and consulting services. She is an ex-regulator of Fimea and EMA (CAT, GTWP, CPWP, SWP) with expertise in ATMPs and biotech products. She provides scientific and global regulatory strategies, nonclinical and early phase clinical development support and agency interactions such as scientific advice, CTA, IND, MAA and BLA across the regions.',
                    photo: 9,
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
          },
          // 3. About Consilienta headline
          {
            blockType: 'headline',
            title: 'About Consilienta',
          },
          // 4. Text block with flexible content blocks
          {
            blockType: 'textBlock',
            alignment: 'left',
            maxWidth: 'lg',
            backgroundColor: 'frosted',
            textColor: 'white',
            contentBlocks: [
              // Single column content block
              {
                blockType: 'singleColumn',
                content: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        format: 'center',
                        children: [
                          {
                            type: 'text',
                            format: 1,
                            text: 'Consilienta is a consulting company providing services in the area of regulatory affairs and product development for biologics, cell & gene therapy (ATMP) and other innovative therapies, including synthetically manufactured products.',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Drug development is becoming increasingly complex and evolves at higher speed than the regulations can keep up with the pace and consequently demand intelligent strategic and regulatory planning. The founders of Consilienta combine extensive industry, ex-regulatory, consulting and academic experience to enable high-value and fast response in answering this demand.',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'We offer high-quality consulting support and strategic advice for development of medicinal products including biologics, cell & gene therapy (ATMP) and other innovative therapies such as synthetically manufactured products. It comprises strategic advice, non-clinical, clinical, CMC and regulatory advice for all development stages, from non-clinical to late clinical research and approval.',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'We offer a low threshold and personal service to solve diverse complex questions that arise during product development; develop fast, efficient and regulatory compliant path forward and to avoid development pitfalls utilizing local expertise for a new regulatory environment and ex-regulator expertise for getting an opinion on specific developmental and regulatory questions.',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              // Multi-column content block for Mission/Values
              {
                blockType: 'multiColumn',
                columns: 2,
                columnContent: [
                  {
                    content: {
                      root: {
                        type: 'root',
                        children: [
                          {
                            type: 'heading',
                            tag: 'h3',
                            children: [
                              {
                                type: 'text',
                                text: 'Mission',
                              },
                            ],
                          },
                          {
                            type: 'paragraph',
                            children: [
                              {
                                type: 'text',
                                text: 'Our mission is to drive innovation to improve people\'s lives',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    content: {
                      root: {
                        type: 'root',
                        children: [
                          {
                            type: 'heading',
                            tag: 'h3',
                            children: [
                              {
                                type: 'text',
                                text: 'Values',
                              },
                            ],
                          },
                          {
                            type: 'paragraph',
                            children: [
                              {
                                type: 'text',
                                text: 'We are guided and driven by our values: Innovation and scientific excellence, Diligence, Integrity and Reliability',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
          // 5. Background image block 1
          {
            blockType: 'backgroundImage',
            backgroundImage: {
              enabled: true,
              image: 10,
              size: 90,
              positionX: 15,
              positionY: 25,
            },
          },
          // 6. Background image block 2
          {
            blockType: 'backgroundImage',
            backgroundImage: {
              enabled: true,
              image: 10,
              size: 75,
              positionX: 85,
              positionY: 85,
            },
          },
        ],
      },
    })

    console.log('About Us page created successfully:', aboutUsPage.id)
  } catch (error) {
    console.error('Error seeding About Us page:', error)
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