import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Réservation',
  description: 'Contactez l\'Hôtel Sept-Îles pour réservations, informations ou demandes spéciales. 451 avenue Arnaud, Sept-Îles QC. Téléphone: +1 418 962-2581. Service 24/7.',
  keywords: [
    'contact hôtel sept-îles',
    'réservation sept-îles',
    'téléphone hôtel sept-îles',
    'adresse hôtel côte-nord',
    'information hôtel sept-îles',
    'réserver sept-îles',
    'coordonnées hôtel québec'
  ],
  openGraph: {
    title: 'Contact & Réservation - Hôtel Sept-Îles',
    description: 'Contactez-nous pour réserver ou pour toute information. Service disponible 24/7.',
    url: 'https://hotel-sept-iles.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
