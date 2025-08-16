import { getPayload } from 'payload'
import config from '../payload.config'

interface HeaderData {
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

interface FooterData {
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

interface GlobalsData {
  header: HeaderData
  footer: FooterData
}

export async function getGlobals(): Promise<GlobalsData | null> {
  try {
    const payload = await getPayload({ config })
    
    const globals = await payload.findGlobal({
      slug: 'globals',
    })

    if (!globals) {
      return null
    }

    return globals as GlobalsData
  } catch (error) {
    console.error('Error fetching globals:', error)
    return null
  }
}