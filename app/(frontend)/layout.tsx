import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '@/components/providers'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import './globals.css'

export const metadata = {
  title: 'Consilienta - Pharmaceutical Consulting Excellence',
  description: 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen brand-gradient-no-black">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
