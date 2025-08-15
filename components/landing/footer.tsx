"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  return (
    <footer 
      className="px-6 py-16 text-white relative z-10">
      <div className="absolute inset-0 bg-white opacity-40"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center">
              <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={200} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-white/90 max-w-md leading-relaxed">
              Expert pharmaceutical consulting guiding your product from concept to approval. 
              Comprehensive solutions for complex development challenges.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary" size="sm">
                LinkedIn
              </Button>
              <Button variant="secondary" size="sm">
                Email
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-medium">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Regulatory Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clinical Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Access</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Assurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-medium">Company</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © 2024 Consilienta. All rights reserved. Pharmaceutical consulting excellence.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}