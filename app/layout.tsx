import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E40AF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' }
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Hôtel Sept-Îles | Hébergement Premium Côte-Nord',
    template: '%s | Hôtel Sept-Îles'
  },
  description: 'Découvrez l\'Hôtel Sept-Îles, votre oasis de luxe sur la Côte-Nord. Chambres élégantes, spa premium, massage, hammam et services exclusifs.',
  keywords: ['hôtel', 'sept-îles', 'côte-nord', 'spa', 'massage', 'hébergement', 'luxe', 'hammam', 'pédicure', 'manucure'],
  authors: [{ name: 'Hôtel Sept-Îles' }],
  creator: 'Hôtel Sept-Îles',
  publisher: 'Hôtel Sept-Îles',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sept-Îles',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://hotel-sept-iles.com',
    siteName: 'Hôtel Sept-Îles',
    title: 'Hôtel Sept-Îles | Expérience Premium Côte-Nord',
    description: 'Vivez une expérience unique à l\'Hôtel Sept-Îles avec nos services spa premium',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hôtel Sept-Îles',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hôtel Sept-Îles | Hébergement Premium',
    description: 'Découvrez notre hôtel premium sur la Côte-Nord',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}