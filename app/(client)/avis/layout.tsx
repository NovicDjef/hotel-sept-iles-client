import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avis Clients & Témoignages',
  description: 'Lisez les avis vérifiés de nos clients sur l\'Hôtel Sept-Îles. Note moyenne 4.9/5 basée sur 2000+ avis. Découvrez les témoignages sur nos chambres, spa et services à Sept-Îles Côte-Nord.',
  keywords: [
    'avis hôtel sept-îles',
    'témoignages sept-îles',
    'commentaires hôtel côte-nord',
    'évaluation hôtel sept-îles',
    'reviews hotel sept-iles',
    'satisfaction client sept-îles',
    'avis spa sept-îles',
    'expérience client côte-nord'
  ],
  openGraph: {
    title: 'Avis Clients & Témoignages - Hôtel Sept-Îles',
    description: 'Note 4.9/5 basée sur 2000+ avis vérifiés. Découvrez ce que nos clients disent de nous.',
    url: 'https://hotel-sept-iles.com/avis',
  },
}

export default function AvisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
