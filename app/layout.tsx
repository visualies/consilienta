import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const qurova = localFont({
  src: [
    {
      path: "../public/qurova-font-family/QurovaDEMO-Light-BF67a5c6380ebd4.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/qurova-font-family/QurovaDEMO-Regular-BF67a5c637a5dc9.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/qurova-font-family/QurovaDEMO-Medium-BF67a5c6382651c.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/qurova-font-family/QurovaDEMO-SemiBold-BF67a5c637bcd0b.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/qurova-font-family/QurovaDEMO-Bold-BF67a5c637eed62.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-qurova",
  display: "swap",
})

const rubik = localFont({
  src: [
    {
      path: "../public/Rubik/static/Rubik-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Rubik/static/Rubik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Rubik/static/Rubik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Rubik/static/Rubik-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Rubik/static/Rubik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Rubik/static/Rubik-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/Rubik/static/Rubik-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/Rubik/static/Rubik-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/Rubik/static/Rubik-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/Rubik/static/Rubik-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
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
