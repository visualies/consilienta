import { getPayload } from 'payload'
import config from '../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Get robots.txt content from globals
    const globals = await payload.findGlobal({
      slug: 'globals',
    })

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://consilienta.com'
    
    // Default robots.txt content if not configured
    const defaultRobots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Block admin and API routes
Disallow: /admin/
Disallow: /api/`

    const robotsContent = globals?.seo?.robotsTxt || defaultRobots

    return new Response(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating robots.txt:', error)
    
    // Fallback robots.txt
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://consilienta.com'
    const fallbackRobots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

    return new Response(fallbackRobots, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }
}