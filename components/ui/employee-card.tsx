"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

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
  layoutType?: 'big' | 'medium' | 'small'
  cardStyle?: 'horizontal' | 'vertical'
}

export function EmployeeCard({
  name,
  position,
  bio,
  photo,
  email,
  phone,
  socialLinks = [],
  layoutType = 'big',
  cardStyle = 'horizontal'
}: EmployeeCardProps) {
  const bioRef = useRef<HTMLParagraphElement>(null)

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
    <Card data-employee-card className={`shadow-lg border-0 overflow-hidden relative frosted-glass-navbar group ${cardStyle === 'vertical' ? 'h-full flex flex-col' : ''}`}>
      {/* Big layout - 3 columns side by side with fixed height */}
      <div 
        data-layout="big"
        className={layoutType !== 'big' ? 'hidden' : 'flex gap-6'}
        style={{ height: '328px' }}
      >
        {/* Column 1 - Photo */}
        <div className="w-64 flex-shrink-0">
          <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg m-1">
            {photo ? (
              <Image
                src={photo.url}
                alt={photo.alt || `${name} profile photo`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-102"
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
                  className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{email}</span>
                </a>
              )}
              
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>
              )}

              {linkedInLink && (
                <a
                  href={linkedInLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Column 3 - Bio with fixed height container */}
        <div className="flex-1 p-6 flex items-center relative" data-bio-container="true">
          <div className="absolute left-0 top-6 bottom-6 w-px bg-white/40"></div>
          <div className="w-full">
            <p ref={bioRef} data-bio-ref className="text-white/90 leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </div>

      {/* Medium layout - 2 rows (horizontal) or vertical card */}
      <div className={layoutType !== 'medium' ? 'hidden' : 'block'}>
        {cardStyle === 'vertical' ? (
          /* Vertical card layout for 3-column grid */
          <div className="p-2 pb-4 space-y-3 text-center flex flex-col h-full">
            {/* Photo */}
            <div className="w-full">
              <div className="w-full h-64">
                <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg">
                  {photo ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt || `${name} profile photo`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-serif bg-brand">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-2 pb-3 border-b border-white/40">
              <h3 className="text-xl font-serif font-normal text-white leading-tight">
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
                  className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{email}</span>
                </a>
              )}
              
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>
              )}

              {linkedInLink && (
                <a
                  href={linkedInLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>

            {/* Bio */}
            <div className="border-t border-white/40 pt-4 px-2 flex-1 flex flex-col justify-start">
              <p className="text-white/90 leading-relaxed text-left">
                {bio}
              </p>
            </div>
          </div>
        ) : (
          /* Original horizontal layout */
          <>
            {/* Top row - Photo and Contact Info */}
            <div className="flex gap-4 p-4">
              {/* Photo */}
              <div className="w-64 flex-shrink-0">
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg">
                  {photo ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt || `${name} profile photo`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-serif bg-brand">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Name, Title, and Contact Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-4">
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
                        className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{email}</span>
                      </a>
                    )}
                    
                    {phone && (
                      <a 
                        href={`tel:${phone}`}
                        className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{phone}</span>
                      </a>
                    )}

                    {linkedInLink && (
                      <a
                        href={linkedInLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row - Bio */}
            <div className="border-t border-white/20 p-4">
              <p className="text-white/90 leading-relaxed">
                {bio}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Small layout - Single column for mobile */}
      <div className={layoutType !== 'small' ? 'hidden' : 'block'}>
        <div className="p-6 space-y-6">
          {/* Photo and Name */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 flex-shrink-0">
              <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-full">
                {photo ? (
                  <Image
                    src={photo.url}
                    alt={photo.alt || `${name} profile photo`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-serif bg-brand">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-normal text-white leading-tight">
                {name}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-white/90">
                {position}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-3">
            {email && (
              <a 
                href={`mailto:${email}`}
                className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="truncate">{email}</span>
              </a>
            )}
            
            {phone && (
              <a 
                href={`tel:${phone}`}
                className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            )}

            {linkedInLink && (
              <a
                href={linkedInLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            )}
          </div>

          {/* Bio */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/90 leading-relaxed text-center">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}