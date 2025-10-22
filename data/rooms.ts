import { Room } from '@/types/room'

export const rooms: Room[] = [
  {
    id: '1',
    nom: 'Suite Royale',
    categorie: 'Premium',
    description: 'Notre suite la plus luxueuse avec vue panoramique sur le fleuve Saint-Laurent',
    prix: 299,
    capacite: 2,
    superficie: 45,
    images: [
      '/images/chambres/0.webp',
      '/images/chambres/1.avif',
      '/images/chambres/2.jpg',
      '/images/chambres/3.jpg',
    ],
    equipements: ['Vue fleuve', 'Jacuzzi', 'Balcon privé', 'King size', 'Mini-bar', 'Coffre-fort'],
    note: 4.9,
    avis: 127,
    disponible: true
  },
  {
    id: '2',
    nom: 'Chambre Deluxe',
    categorie: 'Standard',
    description: 'Confort moderne avec tout l\'équipement nécessaire pour un séjour agréable',
    prix: 189,
    capacite: 2,
    superficie: 32,
    images: [
      '/images/chambres/4.jpg',
      '/images/chambres/5.avif',
      '/images/chambres/6.avif',
      '/images/chambres/7.JPG',
    ],
    equipements: ['King size', 'Bureau', 'Mini-bar', 'Wi-Fi', 'TV 55"', 'Climatisation'],
    note: 4.7,
    avis: 89,
    disponible: true
  },
  {
    id: '3',
    nom: 'Suite Familiale',
    categorie: 'Famille',
    description: 'Espace généreux parfait pour toute la famille avec deux chambres séparées',
    prix: 249,
    capacite: 4,
    superficie: 55,
    images: [
      '/images/chambres/8.avif',
      '/images/chambres/9.webp',
      '/images/chambres/10.webp',
      '/images/chambres/11.jpg',
    ],
    equipements: ['2 chambres', 'Cuisine', 'Salon', 'Balcon', '2 salles de bain', 'Wi-Fi'],
    note: 4.8,
    avis: 156,
    disponible: true
  },
  {
    id: '4',
    nom: 'Chambre Confort',
    categorie: 'Standard',
    description: 'Parfaite pour un séjour court, offrant tout le confort essentiel',
    prix: 149,
    capacite: 2,
    superficie: 28,
    images: [
      '/images/chambres/12.jpg',
      '/images/chambres/13.jpg',
    ],
    equipements: ['Queen size', 'Bureau', 'Wi-Fi', 'TV', 'Climatisation'],
    note: 4.6,
    avis: 73,
    disponible: true
  },
  {
    id: '5',
    nom: 'Suite Exécutive',
    categorie: 'Business',
    description: 'Idéale pour les voyageurs d\'affaires avec espace de travail dédié',
    prix: 269,
    capacite: 2,
    superficie: 40,
    images: [
      '/images/chambres/14.jpg',
      '/images/chambres/15.jpg',
    ],
    equipements: ['Bureau ergonomique', 'Fauteuil', 'Mini-bar', 'Coffre-fort', 'Vue ville'],
    note: 4.8,
    avis: 94,
    disponible: true
  },
  {
    id: '6',
    nom: 'Suite Panoramique',
    categorie: 'Premium',
    description: 'Vue spectaculaire à 180° sur le fleuve et les montagnes',
    prix: 329,
    capacite: 2,
    superficie: 50,
    images: [
      '/images/chambres/0.webp',
      '/images/chambres/10.webp',
      '/images/chambres/14.jpg',
      '/images/chambres/7.JPG',
    ],
    equipements: ['Vue panoramique', 'Balcon', 'Baignoire spa', 'King size', 'Bar', 'Terrasse'],
    note: 5.0,
    avis: 203,
    disponible: false
  },
]

export const getRoomById = (id: string | number): Room | undefined => {
  return rooms.find(room => room.id === id.toString())
}
