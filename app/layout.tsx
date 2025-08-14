import type React from "react"
import type { Metadata } from "next"
import { Jura as Qurova, Rubik } from "next/font/google"
import "./globals.css"

const qurova = Qurova({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-qurova",
  weight: ["400", "500", "600", "700"],
})

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Consilienta - Pharmaceutical Consulting Excellence",
  description: "Guiding your product from concept to approval with expert pharmaceutical consulting services",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${qurova.variable} ${rubik.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
