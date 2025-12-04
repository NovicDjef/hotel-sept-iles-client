/**
 * Données structurées FAQ pour améliorer le SEO
 * Affiche les questions fréquentes dans les résultats de recherche Google
 */

export function FAQStructuredData() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Où se situe l\'Hôtel Sept-Îles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'Hôtel Sept-Îles est situé au 451, avenue Arnaud à Sept-Îles, région de la Côte-Nord au Québec, Canada (G4R 3B3).'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels services sont offerts à l\'Hôtel Sept-Îles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'Hôtel Sept-Îles offre des chambres luxueuses, un spa premium avec massages et soins de beauté, un restaurant gastronomique, un bar, une salle de sport, un sauna, un hammam, des services de pédicure et manucure, ainsi qu\'une salle de jeux.'
        }
      },
      {
        '@type': 'Question',
        name: 'Le spa de l\'hôtel offre-t-il des massages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, notre spa premium offre une gamme complète de massages thérapeutiques et relaxants, incluant massage suédois, massage aux pierres chaudes, massage sportif et massages personnalisés.'
        }
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il un restaurant à l\'hôtel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, l\'Hôtel Sept-Îles dispose d\'un restaurant gastronomique servant une cuisine raffinée avec des produits locaux de la Côte-Nord, ainsi qu\'un bar pour vos moments de détente.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels sont les équipements de bien-être disponibles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous offrons un spa complet avec sauna, hammam, salle de sport équipée, soins de beauté, pédicure, manucure, et une variété de massages et traitements spa.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment réserver une chambre à l\'Hôtel Sept-Îles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vous pouvez réserver directement en ligne sur notre site web hotel-sept-iles.com ou nous contacter par téléphone au +1 418 962-2581. Nos réservations sont disponibles 24h/24.'
        }
      },
      {
        '@type': 'Question',
        name: 'L\'hôtel dispose-t-il d\'un stationnement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, l\'Hôtel Sept-Îles offre un stationnement gratuit pour tous nos clients.'
        }
      },
      {
        '@type': 'Question',
        name: 'Le Wi-Fi est-il gratuit à l\'hôtel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, nous offrons une connexion Wi-Fi haut débit gratuite dans toutes les chambres et espaces communs de l\'hôtel.'
        }
      },
      {
        '@type': 'Question',
        name: 'Peut-on réserver des soins spa sans être client de l\'hôtel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, notre spa est ouvert aux clients externes. Vous pouvez réserver vos soins spa, massages, pédicure ou manucure même si vous ne séjournez pas à l\'hôtel.'
        }
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il des forfaits spa disponibles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, nous proposons plusieurs forfaits spa incluant massages, soins du visage, accès au sauna et hammam. Consultez notre page services pour voir tous nos forfaits détente.'
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}
