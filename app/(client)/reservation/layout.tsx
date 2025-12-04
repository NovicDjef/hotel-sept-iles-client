import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation en Ligne',
  description: 'Réservez votre séjour à l\'Hôtel Sept-Îles en ligne. Meilleurs tarifs garantis, réservation sécurisée, confirmation instantanée. Chambres et suites disponibles à Sept-Îles Côte-Nord Québec.',
  keywords: [
    'réservation hôtel sept-îles',
    'réserver en ligne sept-îles',
    'booking sept-îles',
    'réservation chambre côte-nord',
    'tarif hôtel sept-îles',
    'disponibilité sept-îles',
    'réservation sécurisée québec',
    'meilleur prix sept-îles'
  ],
  openGraph: {
    title: 'Réservation en Ligne - Hôtel Sept-Îles',
    description: 'Réservez en ligne avec les meilleurs tarifs garantis. Confirmation instantanée.',
    url: 'https://hotel-sept-iles.com/reservation',
  },
}

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
