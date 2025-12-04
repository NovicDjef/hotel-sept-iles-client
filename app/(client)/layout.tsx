import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Bienvenue à l\'Hôtel Sept-Îles, votre destination luxe à Sept-Îles, Côte-Nord Québec. Chambres premium, spa, restaurant gastronomique, bar, salle de sport, sauna, hammam. Réservez maintenant!',
  openGraph: {
    title: 'Hôtel Sept-Îles | Hébergement Premium Côte-Nord Québec',
    description: 'Hôtel 4 étoiles avec spa, restaurant, bar et services de luxe à Sept-Îles.',
    url: 'https://hotel-sept-iles.com',
  },
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
