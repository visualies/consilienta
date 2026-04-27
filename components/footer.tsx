"use client"

import Image from "next/image"
import Link from "next/link"

interface FooterProps {
  data?: {
    logo: {
      url: string
      alt: string
    }
    address: string
    phones: Array<{phone: string}>
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
  phones: [
    { phone: "+49 (0)163 2457821" },
    { phone: "+49 (0) 157 87414589" }
  ],
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
      className="px-8 lg:px-12 py-8 text-white relative z-10">
      <div className="absolute inset-0 frosted-overlay"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          {/* Desktop: All in one row, Mobile/Tablet: Logo on top, content below */}
          <div className="flex flex-col xl:flex-row xl:items-start gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src={data.logo.url} alt={data.logo.alt} width={290} height={140} className="h-32 pt-4 w-auto pr-38" />
            </div>
            
            {/* Contact Info and Company Links Container */}
            <div className="flex-1 grid grid-cols-3 gap-8 lg:gap-12 xl:mt-4">
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <div className="flex flex-col gap-3 sm:min-w-48 mb-4 sm:mb-0">
                    <div className="text-white/90">
                      <h3 className="text-lg font-serif font-medium text-white mb-2">Contact</h3>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-white/70 mb-1">Phone</p>
                        {data.phones.map((phoneObj, index) => (
                          <a key={index} href={`tel:${phoneObj.phone}`} className="hover:text-white transition-colors block text-sm">
                            {phoneObj.phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    {data.socialLinks?.filter(social => social.platform === 'email').map((social, index) => (
                      <div key={index} className="text-white/90">
                        <p className="text-sm font-medium text-white/70 mb-1">Email</p>
                        <a href={social.url} className="hover:text-white transition-colors text-sm">
                          {social.url.replace('mailto:', '')}
                        </a>
                      </div>
                    ))}
                    {data.socialLinks?.filter(social => social.platform === 'linkedin').map((social, index) => (
                      <div key={index} className="text-white/90">
                        <p className="text-sm font-medium text-white/70 mb-1">LinkedIn</p>
                        <a href={social.url} className="hover:text-white transition-colors text-sm">
                          Consilienta
                        </a>
                      </div>
                    ))}
                </div>
              </div>
              </div>
              <div className="text-white/90 sm:min-w-48">
                <h3 className="text-lg font-serif font-medium text-white mb-2">Address</h3>
                <p className="leading-relaxed whitespace-pre-line text-sm">{data.address}</p>
              </div>

              {/* Company Links */}
              <div className="">
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/40 pt-2 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            {data.copyright}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {data.legalLinks.map((link, index) => (
              <a key={index} href={link.link} className="text-white/70 hover:text-white text-sm transition-colors">
                {link.name}
              </a>
            ))}
            <Link href="/legal-notice" className="text-white/70 hover:text-white text-sm transition-colors">
              Legal Notice (Impressum)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
