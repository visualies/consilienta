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

interface BrandingData {
  brandColor: string
  brandGradient: {
    angle: number
    colors: Array<{
      color: string
      position: number
    }>
  }
}

interface GlobalsData {
  branding: BrandingData
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

export function generateBrandGradientStyles(brandGradient: BrandingData['brandGradient']) {
  const gradientCSS = generateBrandGradientCSS(brandGradient)
  
  return {
    background: gradientCSS,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textFillColor: 'transparent',
  }
}

export function generateBrandGradientCSS(brandGradient: BrandingData['brandGradient']) {
  const angle = brandGradient.angle ?? 135
  const colors = brandGradient.colors || [
    { color: '#e89d87', position: 0 },
    { color: '#a985b3', position: 25 },
    { color: '#4041d5', position: 60 },
    { color: '#2a1846', position: 100 }
  ]
  
  // Sort colors by position to ensure proper gradient order
  const sortedColors = [...colors].sort((a, b) => a.position - b.position)
  
  // Generate color stops
  const colorStops = sortedColors
    .map(({ color, position }) => `${color} ${position}%`)
    .join(', ')
  
  return `linear-gradient(${angle}deg, ${colorStops})`
}

export function generateBrandColorCSS(brandColor: string) {
  return `
    :root {
      --brand-color: ${brandColor};
      --brand-color-hover: ${adjustColorBrightness(brandColor, -20)};
      --brand-color-light: ${adjustColorBrightness(brandColor, 20)};
    }
  `
}

function adjustColorBrightness(color: string, amount: number): string {
  const usePound = color[0] === '#'
  const col = usePound ? color.slice(1) : color
  const num = parseInt(col, 16)
  let r = (num >> 16) + amount
  let g = (num >> 8 & 0x00FF) + amount
  let b = (num & 0x0000FF) + amount
  r = r > 255 ? 255 : r < 0 ? 0 : r
  g = g > 255 ? 255 : g < 0 ? 0 : g
  b = b > 255 ? 255 : b < 0 ? 0 : b
  return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0')
}