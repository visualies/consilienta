import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata = {
  title: 'Consilienta - Pharmaceutical Consulting Excellence',
  description: 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
