"use client"

import Image from 'next/image'
import { Mail, Phone, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'email' | 'website'
  url: string
}

interface EmployeeCardProps {
  name: string
  position: string
  bio: string
  photo?: {
    url: string
    alt?: string
  }
  email?: string
  phone?: string
  socialLinks?: SocialLink[]
}

export function EmployeeCard({
  name,
  position,
  bio,
  photo,
  email,
  phone,
  socialLinks = []
}: EmployeeCardProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      case 'email':
        return <Mail className="w-4 h-4" />
      case 'website':
        return <ExternalLink className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out h-full border-0 outline outline-2 outline-white/20">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {photo && (
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white/50">
              <Image
                src={photo.url}
                alt={photo.alt || `${name} profile photo`}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-normal text-gray-900">{name}</h3>
            <p 
              className="text-sm font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: 'var(--brand-purple)' }}
            >
              {position}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
          
          <div className="flex flex-col space-y-3 w-full pt-2">
            {email && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" style={{ color: 'var(--brand-purple)' }} />
                <a 
                  href={`mailto:${email}`}
                  className="transition-colors duration-200"
                  style={{ 
                    color: 'var(--brand-purple)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {email}
                </a>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" style={{ color: 'var(--brand-purple)' }} />
                <a 
                  href={`tel:${phone}`}
                  className="transition-colors duration-200"
                  style={{ 
                    color: 'var(--brand-purple)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
          
          {socialLinks.length > 0 && (
            <div className="flex space-x-3 pt-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="p-2 h-10 w-10 border-2 hover:bg-opacity-10 transition-all duration-200"
                  style={{ 
                    borderColor: 'var(--brand-purple)',
                    color: 'var(--brand-purple)'
                  }}
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}