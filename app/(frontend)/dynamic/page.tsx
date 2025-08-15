import { getPayload } from 'payload'
import config from '../../../payload.config'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

async function getLandingPageData() {
  const payload = await getPayload({ config })
  
  try {
    const landingPage = await payload.find({
      collection: 'landing-page',
      limit: 1,
    })

    if (landingPage.docs.length > 0) {
      return landingPage.docs[0]
    }
  } catch (error) {
    console.error('Error fetching landing page:', error)
  }
  
  return null
}

export default async function DynamicLandingPage() {
  const data = await getLandingPageData()

  return (
    <div className="min-h-screen brand-gradient-no-black">
      <Header 
        isOverWhite={false}
        data={data?.header}
      />
      <HeroSection 
        data={data?.hero}
        helixConfig={data?.helix}
      />
      <FeaturesSection data={data?.features} />
      <CTASection data={data?.cta} />
      <Footer data={data?.footer} />
    </div>
  )
}