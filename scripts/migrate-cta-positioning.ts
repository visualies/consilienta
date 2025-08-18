import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function migrateCTAPositioning() {
  try {
    const payload = await getPayload({ config })

    // Find all pages with CTA blocks
    const pages = await payload.find({
      collection: 'pages',
      limit: 1000, // Adjust if you have more pages
    })

    let updatedCount = 0

    for (const page of pages.docs) {
      let hasChanges = false
      const updatedLayout = page.layout.map((block: any) => {
        if (block.blockType === 'cta' && block.backgroundSvg?.enabled) {
          const svg = block.backgroundSvg
          
          // Only migrate if we have pixel offsets but no percentage positions
          if ((svg.offsetX !== undefined || svg.offsetY !== undefined) && 
              (svg.positionX === undefined && svg.positionY === undefined)) {
            
            console.log(`Migrating CTA positioning for page: ${page.title}`)
            console.log(`  Old: offsetX=${svg.offsetX}, offsetY=${svg.offsetY}`)
            
            // Convert pixel offsets to percentage positions
            // Assuming a typical section width of ~1200px for conversion
            const sectionWidth = 1200
            const sectionHeight = 800
            
            // Calculate percentage positions
            // Center (50%) + offset converted to percentage
            const newPositionX = Math.max(0, Math.min(100, 
              50 + ((svg.offsetX || 0) / sectionWidth) * 100
            ))
            const newPositionY = Math.max(0, Math.min(100, 
              50 + ((svg.offsetY || 0) / sectionHeight) * 100
            ))
            
            console.log(`  New: positionX=${newPositionX}, positionY=${newPositionY}`)
            
            hasChanges = true
            return {
              ...block,
              backgroundSvg: {
                ...svg,
                positionX: Math.round(newPositionX),
                positionY: Math.round(newPositionY),
                // Remove old offset fields
                offsetX: undefined,
                offsetY: undefined
              }
            }
          }
        }
        return block
      })

      if (hasChanges) {
        await payload.update({
          collection: 'pages',
          id: page.id,
          data: {
            layout: updatedLayout
          }
        })
        updatedCount++
      }
    }

    console.log(`Migration completed! Updated ${updatedCount} pages.`)

  } catch (error) {
    console.error('Error during migration:', error)
  }
}

migrateCTAPositioning()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })