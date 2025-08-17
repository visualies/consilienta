"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FooterProps {
  data?: {
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
}

const defaultData = {
  logo: {
    url: "/logo-with-claim.svg",
    alt: "Consilienta Logo"
  },
  description: "Leading pharmaceutical consulting services worldwide.",
  socialLinks: [],
  services: [
    { name: "Regulatory Affairs", link: "#services" },
    { name: "Clinical Trials", link: "#services" },
    { name: "Quality Assurance", link: "#services" }
  ],
  companyLinks: [
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
    { name: "Careers", link: "#careers" }
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
      className="px-6 py-16 text-white relative z-10">
      <div className="absolute inset-0 frosted-overlay"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center">
              <Image src={data.logo.url} alt={data.logo.alt} width={400} height={80} className="h-25 w-auto" />
            </div>
            <p className="text-white/90 max-w-md leading-relaxed">
              {data.description}
            </p>
            <div className="flex space-x-4">
              {data.socialLinks.map((link, index) => (
                <Button key={index} variant="secondary" size="sm" asChild>
                  <a href={link.url}>{link.platform}</a>
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-medium">Services</h3>
            <ul className="space-y-2 text-white/80">
              {data.services.map((service, index) => (
                <li key={index}>
                  <a href={service.link} className="hover:text-white transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-medium">Company</h3>
            <ul className="space-y-2 text-white/80">
              {data.companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
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