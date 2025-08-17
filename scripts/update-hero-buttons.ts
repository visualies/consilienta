import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function updateHeroButtons() {
  try {
    const payload = await getPayload({ config })

    // Find the home page
    const homePage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home'
        }
      },
      limit: 1
    })

    if (homePage.docs.length === 0) {
      console.log('Home page not found')
      return
    }

    const page = homePage.docs[0]
    
    // Find the hero block and update the button links
    const updatedLayout = page.layout.map((block: any) => {
      if (block.blockType === 'hero') {
        return {
          ...block,
          primaryButton: {
            ...block.primaryButton,
            link: '/contact'
          },
          secondaryButton: {
            ...block.secondaryButton,
            link: '/how-we-help'
          }
        }
      }
      return block
    })

    // Update the page
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        layout: updatedLayout
      }
    })

    console.log('Hero button links updated successfully!')
    console.log('Primary button now links to: /contact')
    console.log('Secondary button now links to: /how-we-help')

  } catch (error) {
    console.error('Error updating hero buttons:', error)
  }
}

updateHeroButtons()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to update hero buttons:', error)
    process.exit(1)
  })