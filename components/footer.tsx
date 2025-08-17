"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FooterProps {
  data?: {
    logo: {
      url: string
      alt: string
    }
    address: string
    phone: string
    email: string
    socialLinks: Array<{
      platform: string
      url: string
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
}

const defaultData = {
  logo: {
    url: "/logo-with-claim.svg",
    alt: "Consilienta Logo"
  },
  address: "Consilienta GmbH\nHanfelder St. 6\n81475 Munich\nGermany",
  phone: "+49 (0)163 2457821",
  email: "info@consilienta.com",
  socialLinks: [],
  companyLinks: [
    { name: "About Us", link: "#about" },
    { name: "Careers", link: "#careers" },
    { name: "Insights", link: "#insights" },
    { name: "Contact", link: "#contact" },
    { name: "Privacy Policy", link: "#privacy" }
  ],
  copyright: "© 2024 Consilienta. All rights reserved.",
  legalLinks: [
    { name: "Privacy Policy", link: "#privacy" },
    { name: "Terms of Service", link: "#terms" }
  ]
}

export function Footer({ data = defaultData }: FooterProps) {
  return (
    <footer 
      className="px-6 py-8 text-white relative z-10">
      <div className="absolute inset-0 frosted-overlay"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8 items-start">
          {/* Logo and Contact Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src={data.logo.url} alt={data.logo.alt} width={350} height={140} className="h-28 lg:h-32 w-auto" />
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4 lg:mt-4">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="flex flex-col gap-3 md:min-w-48 mb-4 md:mb-0">
                  <div className="text-white/90">
                    <p className="text-sm font-medium text-white/70 mb-1">Phone</p>
                    <a href={`tel:${data.phone}`} className="hover:text-white transition-colors">
                      {data.phone}
                    </a>
                  </div>
                  <div className="text-white/90">
                    <p className="text-sm font-medium text-white/70 mb-1">Email</p>
                    <a href={`mailto:${data.email}`} className="hover:text-white transition-colors">
                      {data.email}
                    </a>
                  </div>
                  <div className="text-white/90">
                    <p className="text-sm font-medium text-white/70 mb-1">LinkedIn</p>
                    <a href="https://linkedin.com/company/consilienta" className="hover:text-white transition-colors">
                      Consilienta
                    </a>
                  </div>
                </div>
                <div className="text-white/90 md:min-w-48">
                  <p className="text-sm font-medium text-white/70 mb-1">Address</p>
                  <p className="leading-relaxed whitespace-pre-line">{data.address}</p>
                </div>
              </div>
              
              {/* Social Links */}
              {data.socialLinks.length > 0 && (
                <div className="flex space-x-4 pt-2">
                  {data.socialLinks.map((link, index) => (
                    <Button key={index} variant="secondary" size="sm" asChild>
                      <a href={link.url}>{link.platform}</a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:justify-self-end lg:mt-4">
            <h3 className="text-lg font-serif font-medium text-white mb-2">Company</h3>
            <ul className="space-y-2 text-white/80">
              {data.companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-2 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            {data.copyright}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {data.legalLinks.map((link, index) => (
              <a key={index} href={link.link} className="text-white/70 hover:text-white text-sm transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}