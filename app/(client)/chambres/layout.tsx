import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chambres & Suites Premium',
  description: 'Découvrez nos chambres et suites de luxe à l\'Hôtel Sept-Îles. Hébergement 4 étoiles avec vue sur la Côte-Nord, Wi-Fi gratuit, climatisation et équipements modernes. Réservez votre chambre à Sept-Îles Québec.',
  keywords: [
    'chambres hôtel sept-îles',
    'suites luxe sept-îles',
    'hébergement côte-nord',
    'chambres 4 étoiles québec',
    'réservation chambre sept-îles',
    'suite deluxe sept-îles',
    'chambre vue mer côte-nord',
    'hôtel confort sept-îles'
  ],
  openGraph: {
    title: 'Chambres & Suites Premium - Hôtel Sept-Îles',
    description: 'Chambres et suites de luxe avec vue sur la Côte-Nord. Équipements modernes, confort exceptionnel.',
    url: 'https://hotel-sept-iles.com/chambres',
  },
}

export default function ChambresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
