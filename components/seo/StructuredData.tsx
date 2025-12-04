/**
 * Composant pour les données structurées JSON-LD
 * Aide les moteurs de recherche à comprendre le contenu du site
 */

export function HotelStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://hotel-sept-iles.com',
    name: 'Hôtel Sept-Îles',
    description: 'Hôtel 4 étoiles de luxe à Sept-Îles, Côte-Nord Québec. Chambres premium, spa, restaurant gastronomique, bar, salle de sport, sauna, hammam, massages et soins de beauté.',
    url: 'https://hotel-sept-iles.com',
    logo: 'https://hotel-sept-iles.com/images/hotel/logoH.jpg',
    image: [
      'https://hotel-sept-iles.com/images/hotel/vueseptiles.png',
      'https://hotel-sept-iles.com/og-image.jpg'
    ],
    telephone: '+1-418-962-2581',
    email: 'info@hotel-sept-iles.com',
    priceRange: '$$$$',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4',
      bestRating: '5'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '451, avenue Arnaud',
      addressLocality: 'Sept-Îles',
      addressRegion: 'QC',
      postalCode: 'G4R 3B3',
      addressCountry: 'CA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.2169',
      longitude: '-66.3819'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Spa & Centre de bien-être',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Restaurant',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Bar',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Salle de sport',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sauna',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Hammam',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Massages',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Soins de beauté',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Pédicure',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Manucure',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Salle de jeux',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wi-Fi gratuit',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Stationnement',
        value: true
      }
    ],
    hasMap: 'https://www.google.com/maps/place/Sept-%C3%8Eles,+QC',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2000',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://www.facebook.com/HotelSeptIles',
      'https://www.instagram.com/hotelseptiles',
      'https://twitter.com/HotelSeptIles'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function RestaurantStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Restaurant Hôtel Sept-Îles',
    description: 'Restaurant gastronomique de l\'Hôtel Sept-Îles offrant une cuisine raffinée avec des produits locaux de la Côte-Nord.',
    url: 'https://hotel-sept-iles.com',
    servesCuisine: ['Cuisine française', 'Cuisine québécoise', 'Cuisine internationale'],
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '451, avenue Arnaud',
      addressLocality: 'Sept-Îles',
      addressRegion: 'QC',
      postalCode: 'G4R 3B3',
      addressCountry: 'CA'
    },
    telephone: '+1-418-962-2581',
    acceptsReservations: true,
    hasMenu: 'https://hotel-sept-iles.com/restaurant'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function SpaStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Spa Hôtel Sept-Îles',
    description: 'Centre spa premium offrant massages, soins de beauté, pédicure, manucure, sauna, hammam et bien plus.',
    url: 'https://hotel-sept-iles.com/services',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '451, avenue Arnaud',
      addressLocality: 'Sept-Îles',
      addressRegion: 'QC',
      postalCode: 'G4R 3B3',
      addressCountry: 'CA'
    },
    telephone: '+1-418-962-2581',
    email: 'spa@hotel-sept-iles.com',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Massages thérapeutiques',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Soins du visage',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Pédicure',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Manucure',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sauna',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Hammam',
        value: true
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
