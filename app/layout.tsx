import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/chat'
import { HotelStructuredData, RestaurantStructuredData, SpaStructuredData } from '@/components/seo/StructuredData'
import { FAQStructuredData } from '@/components/seo/FAQStructuredData'

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
  metadataBase: new URL('https://hotel-sept-iles.com'),
  title: {
    default: 'Hôtel Sept-Îles | Hébergement Premium, Spa & Restaurant - Côte-Nord Québec',
    template: '%s | Hôtel Sept-Îles - Côte-Nord'
  },
  description: 'Hôtel Sept-Îles à Sept-Îles, Côte-Nord Québec. Chambres luxueuses, spa premium, restaurant gastronomique, bar, salle de sport, sauna, hammam, massages, soins de beauté, pédicure, manucure et salle de jeux. Réservez votre séjour.',
  keywords: [
    'hôtel sept-îles',
    'hôtel côte-nord',
    'hôtel québec',
    'hébergement sept-îles',
    'spa sept-îles',
    'massage sept-îles',
    'restaurant sept-îles',
    'bar sept-îles',
    'hammam sept-îles',
    'sauna sept-îles',
    'salle de sport',
    'soins de beauté',
    'pédicure manucure',
    'hôtel luxe côte-nord',
    'réservation hôtel sept-îles',
    'forfait spa',
    'salle de jeux',
    'hébergement côte-nord',
    'tourisme sept-îles',
    'hôtel 4 étoiles québec'
  ],
  authors: [{ name: 'Hôtel Sept-Îles', url: 'https://hotel-sept-iles.com' }],
  creator: 'Hôtel Sept-Îles',
  publisher: 'Hôtel Sept-Îles',
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://hotel-sept-iles.com',
  },
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
    title: 'Hôtel Sept-Îles | Hébergement Premium, Spa & Restaurant - Côte-Nord',
    description: 'Hôtel 4 étoiles à Sept-Îles, Côte-Nord Québec. Spa, restaurant, bar, salle de sport, sauna, hammam, massages et soins de beauté. Réservez maintenant!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hôtel Sept-Îles - Hébergement de luxe Côte-Nord Québec',
      }
    ],
    emails: ['info@hotel-sept-iles.com'],
    phoneNumbers: ['+1 418 962-2581'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hôtel Sept-Îles | Hébergement Premium Côte-Nord',
    description: 'Spa, restaurant, bar, salle de sport, sauna, hammam, massages et soins de beauté à Sept-Îles Québec',
    images: ['/twitter-image.jpg'],
    creator: '@HotelSeptIles',
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
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icons/favicon-32x32.png',
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
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="geo.region" content="CA-QC" />
        <meta name="geo.placename" content="Sept-Îles" />
        <meta name="geo.position" content="50.2169;-66.3819" />
        <meta name="ICBM" content="50.2169, -66.3819" />
        <HotelStructuredData />
        <RestaurantStructuredData />
        <SpaStructuredData />
        <FAQStructuredData />
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
          <ChatWidget />
        </Providers>
      </body>
    </html>
  )
}