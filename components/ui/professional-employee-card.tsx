"use client"

import Image from 'next/image'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'email' | 'website'
  url: string
}

interface ProfessionalEmployeeCardProps {
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

export function ProfessionalEmployeeCard({
  name,
  position,
  bio,
  photo,
  email,
  phone,
  socialLinks = []
}: ProfessionalEmployeeCardProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
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

  const linkedInLink = socialLinks.find(link => link.platform === 'linkedin')

  return (
    <Card className="shadow-lg border-0 overflow-hidden relative frosted-glass-navbar">
      <div className="flex gap-6">
        {/* Column 1 - Photo */}
        <div className="w-64 flex-shrink-0">
          <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg group m-1">
            {photo ? (
              <Image
                src={photo.url}
                alt={photo.alt || `${name} profile photo`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-serif bg-brand">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 2 - Name, Title, and Contact Info */}
        <div className="w-80 flex-shrink-0 p-6 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Name and title */}
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-normal text-white leading-tight">
                {name}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-white/90">
                {position}
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col space-y-3">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="inline-block"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => {
                    if (window.getSelection()?.toString()) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-900 frosted-glass border-0 px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-white/60 hover:text-gray-800 select-text">
                    <Mail className="w-4 h-4 pointer-events-none" />
                    <span className="truncate select-text">{email}</span>
                  </div>
                </a>
              )}
              
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="inline-block"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => {
                    if (window.getSelection()?.toString()) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-900 frosted-glass border-0 px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-white/60 hover:text-gray-800 select-text">
                    <Phone className="w-4 h-4 pointer-events-none" />
                    <span className="select-text">{phone}</span>
                  </div>
                </a>
              )}

              {linkedInLink && (
                <a
                  href={linkedInLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => {
                    if (window.getSelection()?.toString()) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-900 frosted-glass border-0 px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-white/60 hover:text-gray-800 select-text">
                    <Linkedin className="w-4 h-4 pointer-events-none" />
                    <span className="select-text">LinkedIn Profile</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Column 3 - Bio */}
        <div className="flex-1 p-6 flex items-center border-l border-white/20">
          <div className="w-full">
            <p className="text-white/90 leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}