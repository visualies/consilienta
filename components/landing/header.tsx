"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  isOverWhite: boolean
}

export function Header({ isOverWhite }: HeaderProps) {
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
            <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={200} height={40} className="h-10 w-auto transition-all duration-300 drop-shadow-sm" />
          )}
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Home</a>
            <a href="#how-we-help" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>How We Help</a>
            <a href="#about" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>About Us</a>
            <a href="#insights" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Insights</a>
            <a href="#careers" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Careers</a>
          </div>
          
          <Button variant="primary">
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>
    </header>
  )
}