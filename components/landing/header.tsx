"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useScrollHeader } from "@/components/hooks/use-scroll-header"

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
    url: '/logo-with-claim.svg',
    alt: 'Consilienta Logo'
  },
  logoWhite: {
    url: '/Logo-Transparent-Icon White.svg',
    alt: 'Consilienta Logo White'
  },
  navigation: [
    { label: 'Services', link: '#services' },
    { label: 'About', link: '#about' },
    { label: 'Contact', link: '#contact' }
  ],
  contactButton: {
    text: 'Get Started',
    link: '#contact'
  }
}

export function Header({ data = defaultData }: HeaderProps) {
  const { isOverWhite } = useScrollHeader()
  
  return (
    <header className={`sticky top-0 z-50 px-6 py-4 frosted-glass-navbar ${isOverWhite ? 'navbar-over-white' : ''}`}>
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
        
        <div className="flex items-center space-x-8">
          <div className="hidden lg:flex items-center space-x-8">
            {data.navigation.map((item, index) => (
              <a 
                key={index}
                href={item.link} 
                className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <Button variant="primary">
            {data.contactButton.text}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>
    </header>
  )
}