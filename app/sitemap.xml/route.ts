import { getPayload } from 'payload'
import config from '../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Get all published pages
    const pages = await payload.find({
      collection: 'pages',
      where: {
        status: {
          equals: 'published'
        }
      },
      limit: 1000,
      sort: 'updatedAt'
    })

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://consilienta.com'
    
    // Generate sitemap XML with embedded styling
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="data:text/xsl;base64,${Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Consilienta Sitemap</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #4041D5 0%, #1C1F72 70%, #191900 95%);
            min-height: 100vh;
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #4041D5 0%, #1C1F72 70%, #191900 95%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
          }
          
          .header p {
            color: #666;
            font-size: 1.1rem;
          }
          
          .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 30px 0;
            flex-wrap: wrap;
          }
          
          .stat {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            min-width: 120px;
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #4041D5;
            display: block;
          }
          
          .stat-label {
            color: #666;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .url-list {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .url-item {
            padding: 20px 25px;
            border-bottom: 1px solid rgba(229, 231, 235, 0.6);
            transition: all 0.2s ease;
          }
          
          .url-item:last-child {
            border-bottom: none;
          }
          
          .url-item:hover {
            background: rgba(64, 65, 213, 0.05);
            transform: translateX(5px);
          }
          
          .url-link {
            color: #4041D5;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 8px;
            transition: color 0.2s ease;
          }
          
          .url-link:hover {
            color: #1C1F72;
            text-decoration: underline;
          }
          
          .url-meta {
            display: flex;
            gap: 20px;
            font-size: 0.85rem;
            color: #666;
            flex-wrap: wrap;
          }
          
          .url-meta span {
            background: #f8f9fa;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
          }
          
          .priority-high { background: #dcfce7; border-color: #86efac; color: #166534; }
          .priority-medium { background: #fef3c7; border-color: #fbbf24; color: #92400e; }
          
          .home-indicator {
            background: linear-gradient(135deg, #4041D5 0%, #1C1F72 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .stats { gap: 15px; }
            .stat { padding: 15px; min-width: 100px; }
            .url-meta { flex-direction: column; gap: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Consilienta Sitemap</h1>
            <p>XML Sitemap for pharmaceutical consulting excellence</p>
            
            <div class="stats">
              <div class="stat">
                <span class="stat-number"><xsl:value-of select="count(//sitemap:url)"/></span>
                <span class="stat-label">Total Pages</span>
              </div>
              <div class="stat">
                <span class="stat-number"><xsl:value-of select="count(//sitemap:url[sitemap:priority='1.0'])"/></span>
                <span class="stat-label">High Priority</span>
              </div>
              <div class="stat">
                <span class="stat-number"><xsl:value-of select="count(//sitemap:url[sitemap:changefreq='weekly'])"/></span>
                <span class="stat-label">Weekly Updates</span>
              </div>
            </div>
          </div>
          
          <div class="url-list">
            <xsl:for-each select="//sitemap:url">
              <div class="url-item">
                <a class="url-link" href="{sitemap:loc}">
                  <xsl:value-of select="sitemap:loc"/>
                  <xsl:if test="sitemap:priority='1.0'">
                    <span class="home-indicator" style="margin-left: 10px;">Home</span>
                  </xsl:if>
                </a>
                <div class="url-meta">
                  <span>Last Modified: <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></span>
                  <span>Update Frequency: <xsl:value-of select="sitemap:changefreq"/></span>
                  <span>
                    <xsl:attribute name="class">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority='1.0'">priority-high</xsl:when>
                        <xsl:otherwise>priority-medium</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    Priority: <xsl:value-of select="sitemap:priority"/>
                  </span>
                </div>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`).toString('base64')}"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home page -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${pages.docs.map((page: any) => `
  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}