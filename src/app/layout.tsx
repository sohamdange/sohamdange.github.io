import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/constants'
import { themeInitScript } from '@/lib/theme'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
})

const description =
  'Systems thinker. Tool builder. I work at the intersection of simulation and engineering architecture.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Soham Dange',
    template: '%s — Soham Dange',
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'Soham Dange',
    title: 'Soham Dange',
    description,
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Soham Dange' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soham Dange',
    description,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // themeInitScript sets data-theme on this element before hydration,
    // which React would otherwise flag as a mismatch.
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* The toggle cannot do anything without JS, so do not show a dead control. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>.theme-toggle{display:none}</style>',
          }}
        />
      </head>
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
