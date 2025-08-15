import { useQuery } from '@tanstack/react-query'

export interface LandingPageData {
  id: string
  title: string
  hero: {
    badge: string
    headline: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
    showHelix: boolean
  }
  features: {
    title: string
    subtitle: string
    featuresList: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  cta: {
    title: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
  }
  header: {
    logo: {
      url: string
      alt: string
    }
    logoWhite: {
      url: string
      alt: string
    }
    navigation: Array<{
      label: string
      link: string
    }>
    contactButton: {
      text: string
      link: string
    }
  }
  footer: {
    logo: {
      url: string
      alt: string
    }
    description: string
    socialLinks: Array<{
      platform: string
      url: string
    }>
    services: Array<{
      name: string
      link: string
    }>
    companyLinks: Array<{
      name: string
      link: string
    }>
    copyright: string
    legalLinks: Array<{
      name: string
      link: string
    }>
  }
  helix: {
    enabled: boolean
    model?: {
      url: string
      filename: string
    }
    rotationSpeed: number
    scale: number
    hoverScale: number
    position: {
      x: number
      y: number
      z: number
    }
    rotation: {
      x: number
      y: number
      z: number
    }
  }
}

export const useLandingPage = () => {
  return useQuery({
    queryKey: ['landing-page'],
    queryFn: async (): Promise<LandingPageData> => {
      const response = await fetch('/api/landing-page')
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch landing page')
      }

      const page = await response.json()
      
      // Transform the data to match our interface
      return {
        id: page.id,
        title: page.title,
        hero: {
          badge: page.hero.badge,
          headline: page.hero.headline,
          description: page.hero.description,
          primaryButton: page.hero.primaryButton,
          secondaryButton: page.hero.secondaryButton,
          showHelix: page.hero.showHelix,
        },
        features: {
          title: page.features.title,
          subtitle: page.features.subtitle,
          featuresList: page.features.featuresList,
        },
        cta: {
          title: page.cta.title,
          description: page.cta.description,
          primaryButton: page.cta.primaryButton,
          secondaryButton: page.cta.secondaryButton,
        },
        header: {
          logo: {
            url: page.header.logo?.url || '/logo-with-claim.svg',
            alt: page.header.logo?.alt || 'Consilienta Logo',
          },
          logoWhite: {
            url: page.header.logoWhite?.url || '/Logo-Transparent-Icon White.svg',
            alt: page.header.logoWhite?.alt || 'Consilienta Logo White',
          },
          navigation: page.header.navigation,
          contactButton: page.header.contactButton,
        },
        footer: {
          logo: {
            url: page.footer.logo?.url || '/logo-with-claim.svg',
            alt: page.footer.logo?.alt || 'Consilienta Logo',
          },
          description: page.footer.description,
          socialLinks: page.footer.socialLinks,
          services: page.footer.services,
          companyLinks: page.footer.companyLinks,
          copyright: page.footer.copyright,
          legalLinks: page.footer.legalLinks,
        },
        helix: {
          enabled: page.helix.enabled,
          model: page.helix.model ? {
            url: page.helix.model.url,
            filename: page.helix.model.filename,
          } : undefined,
          rotationSpeed: page.helix.rotationSpeed,
          scale: page.helix.scale,
          hoverScale: page.helix.hoverScale,
          position: page.helix.position,
          rotation: page.helix.rotation,
        },
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
