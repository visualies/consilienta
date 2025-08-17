import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '@/components/providers'
import localFont from 'next/font/local'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getGlobals, generateBrandGradientCSS, generateBrandColorCSS, generateFrostingCSS } from '@/lib/get-globals'
import './globals.css'

const rubik = localFont({
  src: [
    {
      path: '../../public/Rubik/static/Rubik-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/Rubik/static/Rubik-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-rubik',
})

const qurova = localFont({
  src: [
    {
      path: '../../public/qurova-font-family/QurovaDEMO-Light-BF67a5c6380ebd4.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/qurova-font-family/QurovaDEMO-Regular-BF67a5c637a5dc9.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/qurova-font-family/QurovaDEMO-Medium-BF67a5c6382651c.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/qurova-font-family/QurovaDEMO-SemiBold-BF67a5c637bcd0b.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/qurova-font-family/QurovaDEMO-Bold-BF67a5c637eed62.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-qurova',
})

export const metadata = {
  title: 'Consilienta - Biopharma Consulting Excellence',
  description: 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const globalsData = await getGlobals()
  
  const dynamicGradient = globalsData?.branding?.brandGradient?.colors
    ? generateBrandGradientCSS(globalsData.branding.brandGradient)
    : 'linear-gradient(135deg, #e89d87 0%, #a985b3 25%, #4041d5 60%, #2a1846 100%)'
  
  const brandColorCSS = globalsData?.branding?.brandColor 
    ? generateBrandColorCSS(globalsData.branding.brandColor)
    : generateBrandColorCSS('#4041D5')
  
  const frostingCSS = globalsData?.branding?.frostingStrength !== undefined
    ? generateFrostingCSS(globalsData.branding.frostingStrength)
    : generateFrostingCSS(40)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          .dynamic-brand-gradient {
            background: ${dynamicGradient};
          }
          ${brandColorCSS}
          ${frostingCSS}
        `}</style>
      </head>
      <body className={`min-h-screen dynamic-brand-gradient ${rubik.variable} ${qurova.variable}`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header data={globalsData?.header} />
            <main>{children}</main>
            <Footer data={globalsData?.footer} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
