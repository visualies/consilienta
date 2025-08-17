"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
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
  }
}

export function Header({ data = defaultData }: HeaderProps) {
  const { isOverWhite } = useScrollHeader()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header 
      className={`sticky top-0 z-50 px-6 py-4 frosted-glass-navbar ${isOverWhite ? 'navbar-over-white' : ''}`}
      style={{'--logo-white-url': `url('${data.logoWhite.url}')`} as React.CSSProperties}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {isOverWhite ? (
            <div 
              className="logo-over-white w-[200px] h-10 transition-all duration-300"
              aria-label="Consilienta Logo"
            />
          ) : (
            <Image src={data.logo.url} alt={data.logo.alt} width={200} height={40} className="h-10 w-auto transition-all duration-300 drop-shadow-sm" />
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {data.navigation.map((item, index) => (
              <Link 
                key={index}
                href={item.link} 
                className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Contact Button - Desktop */}
          <Button variant="primary" className="hidden lg:flex" asChild>
            <Link href={data.contactButton.link}>
              {data.contactButton.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 frosted-glass-navbar border-t border-white/10">
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
            <div className="pt-4 border-t border-white/10">
              <Button variant="primary" className="w-full" asChild>
                <Link href={data.contactButton.link}>
                  {data.contactButton.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}