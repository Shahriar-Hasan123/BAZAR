import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

// FONT SETUP
// next/font downloads and self-hosts fonts
// No external requests at runtime = faster
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

// METADATA
// Next.js automatically puts this in <head>
// Great for SEO out of the box
export const metadata: Metadata = {
  title: {
    default: 'Bazar',
    template: '%s | Bazar',
    // "Products" becomes "Products | Bazar"
  },
  description: 'A modern eCommerce store built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}