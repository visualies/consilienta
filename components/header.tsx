"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X, Linkedin, Mail, Twitter, Instagram, Facebook } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useScrollHeader } from "@/components/hooks/use-scroll-header"
import { useState } from "react"

interface HeaderProps {
  data?: {
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
    socialLinks?: Array<{
      platform: 'linkedin' | 'email' | 'twitter' | 'instagram' | 'facebook'
      url: string
      label?: string
    }>
  }
}

const defaultData = {
  logo: {
    url: '/logo-without-claim.svg',
    alt: 'Consilienta Logo'
  },
  logoWhite: {
    url: '/Logo-Transparent-Icon White.svg',
    alt: 'Consilienta Logo White'
  },
  navigation: [
    { label: 'Home', link: '/' },
    { label: 'How We Help', link: '/how-we-help' },
    { label: 'About Us', link: '/about-us' },
    { label: 'Insights', link: '/insights' },
    { label: 'Careers', link: '/careers' }
  ],
  contactButton: {
    text: 'Contact Us',
    link: '/contact'
  },
  socialLinks: [
    {
      platform: 'linkedin' as const,
      url: 'https://linkedin.com/company/consilienta',
      label: 'LinkedIn'
    },
    {
      platform: 'email' as const,
      url: 'mailto:info@consilienta.com',
      label: 'Email'
    }
  ]
}

// Helper function to get the appropriate icon for each platform
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />
    case 'email':
      return <Mail className="h-4 w-4" />
    case 'twitter':
      return <Twitter className="h-4 w-4" />
    case 'instagram':
      return <Instagram className="h-4 w-4" />
    case 'facebook':
      return <Facebook className="h-4 w-4" />
    default:
      return <Mail className="h-4 w-4" />
  }
}

export function Header({ data = defaultData }: HeaderProps) {
  const { isOverWhite } = useScrollHeader()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <>
      <header 
        className={`sticky top-0 z-50 px-6 py-4 frosted-glass-navbar ${isOverWhite ? 'navbar-over-white' : ''}`}
        style={{'--logo-white-url': `url('${data.logoWhite.url}')`} as React.CSSProperties}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            {isOverWhite ? (
              <div 
                className="logo-over-white w-[200px] h-10 transition-all duration-300"
                aria-label="Consilienta Logo"
              />
            ) : (
              <Image src={data.logo.url} alt={data.logo.alt} width={200} height={40} className="h-10 w-auto transition-all duration-300 drop-shadow-sm" />
            )}
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {data.navigation.map((item, index) => (
              <Link 
                key={index}
                href={item.link} 
                className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}
                style={isOverWhite ? { color: 'var(--brand-color) !important' } : {}}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Contact Button - Desktop */}
          <Button variant="primary" className="hidden lg:flex ml-4" asChild>
            <Link href={data.contactButton.link}>
              {data.contactButton.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Separator - Desktop */}
          <div className="hidden lg:block w-px h-6 bg-white/30"></div>

          {/* Social Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {(data.socialLinks || defaultData.socialLinks)?.map((social, index) => (
              <Link 
                key={index}
                href={social.url}
                className={`p-2 text-white hover:text-white/80 transition-colors rounded-lg ${!isOverWhite ? 'drop-shadow-sm' : ''}`}
                style={isOverWhite ? { color: 'var(--brand-color)' } : {}}
                aria-label={social.label || social.platform}
                target={social.platform !== 'email' ? "_blank" : undefined}
                rel={social.platform !== 'email' ? "noopener noreferrer" : undefined}
              >
                {getSocialIcon(social.platform)}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
            style={isOverWhite ? { color: 'var(--brand-color)' } : {}}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

    </header>

    {/* Mobile Navigation Menu - Separate element for proper backdrop-filter */}
    {isMobileMenuOpen && (
      <div className={`lg:hidden fixed top-[88px] left-0 right-0 z-40 frosted-glass-navbar border-t border-white/10 ${isOverWhite ? 'navbar-over-white' : ''}`}>
        <div className="px-6 py-4 space-y-4">
          {data.navigation.map((item, index) => (
            <Link 
              key={index}
              href={item.link} 
              className="block nav-text text-white hover:text-white/80 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <Button variant="primary" className="w-full" asChild>
              <Link href={data.contactButton.link}>
                {data.contactButton.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            {/* Social Links - Mobile */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              {(data.socialLinks || defaultData.socialLinks)?.map((social, index) => (
                <Link 
                  key={index}
                  href={social.url}
                  className="p-2 text-white hover:text-white/80 transition-colors rounded-lg"
                  aria-label={social.label || social.platform}
                  target={social.platform !== 'email' ? "_blank" : undefined}
                  rel={social.platform !== 'email' ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}