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
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out h-full border-0 overflow-hidden group relative">
      {/* Main photo section */}
      <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt || `${name} profile photo`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-serif"
              style={{ backgroundColor: 'var(--brand-purple)' }}
            >
              {name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* LinkedIn button - always clickable */}
        {linkedInLink && (
          <div className="absolute top-4 right-4 z-20">
            <a
              href={linkedInLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              style={{ color: 'var(--brand-purple)' }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        )}

        {/* Basic info overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-serif font-normal leading-tight mb-1">
            {name}
          </h3>
          <p className="text-sm text-white/90 font-medium">
            {position}
          </p>
        </div>
      </div>

      {/* Content section that expands on hover */}
      <div className="relative bg-white transition-all duration-300 group-hover:shadow-inner">
        {/* Collapsed state - just basic info */}
        <div className="h-20 p-4 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
          <p className="text-xs text-gray-500 text-center">Hover to view details</p>
        </div>

        {/* Expanded state - full bio and contact */}
        <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white overflow-y-auto">
          <div className="space-y-4">
            <div className="text-center border-b border-gray-100 pb-3">
              <h3 className="text-lg font-serif font-normal text-gray-900">
                {name}
              </h3>
              <p 
                className="text-sm font-medium"
                style={{ color: 'var(--brand-purple)' }}
              >
                {position}
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {bio}
              </p>
            </div>
            
            {/* Contact info */}
            {(email || phone) && (
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                {email && (
                  <a 
                    href={`mailto:${email}`}
                    className="flex items-center justify-center space-x-2 text-sm transition-colors duration-200 hover:opacity-70"
                    style={{ color: 'var(--brand-purple)' }}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{email}</span>
                  </a>
                )}
                
                {phone && (
                  <a 
                    href={`tel:${phone}`}
                    className="flex items-center justify-center space-x-2 text-sm transition-colors duration-200 hover:opacity-70"
                    style={{ color: 'var(--brand-purple)' }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phone}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}