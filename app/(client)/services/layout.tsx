import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services Spa & Bien-être',
  description: 'Centre spa premium à l\'Hôtel Sept-Îles, Côte-Nord. Massages thérapeutiques, soins de beauté, pédicure, manucure, sauna, hammam, forfaits détente. Réservez votre soin à Sept-Îles Québec.',
  keywords: [
    'spa sept-îles',
    'massage sept-îles',
    'hammam côte-nord',
    'sauna sept-îles',
    'soins beauté sept-îles',
    'pédicure manucure sept-îles',
    'forfait spa québec',
    'massage thérapeutique côte-nord',
    'centre bien-être sept-îles',
    'relaxation spa québec',
    'soins du visage sept-îles',
    'massage relaxant côte-nord'
  ],
  openGraph: {
    title: 'Services Spa & Bien-être - Hôtel Sept-Îles',
    description: 'Spa premium avec massages, soins de beauté, pédicure, manucure, sauna et hammam à Sept-Îles.',
    url: 'https://hotel-sept-iles.com/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
