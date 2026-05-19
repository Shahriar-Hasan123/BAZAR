import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/providers/ThemeProvider'
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} font-sans antialiased transition-colors duration-300`}
      >
        <ThemeProvider>

          {/* flex-col + min-h-screen pushes footer to bottom */}
          <div className="flex flex-col min-h-screen">

            <Header />

            <main className="flex-1">
              {children}
            </main>

            <Footer />

          </div>

        </ThemeProvider>
      </body>
    </html>
  )
}