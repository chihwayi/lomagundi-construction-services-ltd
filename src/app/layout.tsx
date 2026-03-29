import type { Metadata } from 'next'
import { Inter, Oswald, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lomagundi Construction Services Ltd | Diamond Drilling & Construction UK',
  description:
    'UK-registered specialists in diamond drilling & sawing, construction, and demolition. Precision engineering, fully certified, available 24/7 across the UK.',
  keywords: [
    'diamond drilling',
    'diamond sawing',
    'construction UK',
    'demolition UK',
    'core drilling',
    'wall sawing',
    'concrete cutting',
    'Lomagundi Construction',
  ],
  authors: [{ name: 'Lomagundi Construction Services Ltd' }],
  openGraph: {
    title: 'Lomagundi Construction Services Ltd',
    description: 'UK specialists in diamond drilling, construction & demolition.',
    type: 'website',
    locale: 'en_GB',
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${dancing.variable}`}>
      <body className="font-sans bg-dark text-white antialiased">{children}</body>
    </html>
  )
}
