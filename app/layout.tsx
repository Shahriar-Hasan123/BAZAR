import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: {
    default: 'Bazar',
    template: '%s | Bazar',
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
      <body className={`${geist.variable} antialiased bg-gray-50`}>

        {/* flex-col + min-h-screen pushes footer to bottom */}
        <div className="flex flex-col min-h-screen">

          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </div>

      </body>
    </html>
  )
}