// API Response Type (from backend)
export interface ApiRoom {
  id: string
  hotelId: string
  name: string | null
  category: string | null
  roomNumber: string
  floor: number
  type: string
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED'
  capacity: number
  size: number
  bedType: string
  description: string
  basePrice: number
  weekendPrice: number
  amenities: Array<{ nom: string; disponible: boolean }> | null
  caracteristiques: Array<{ label: string; valeur: string }> | null
  images: string[]
  createdAt: string
  updatedAt: string
  _count: {
    reservations: number
  }
}

// UI Type (used throughout the application)
export interface Room {
  id: string
  nom: string
  categorie: 'Premium' | 'Standard' | 'Famille' | 'Business'
  description: string
  prix: number
  capacite: number
  superficie: number
  images: string[]
  equipements: string[]
  note: number
  avis: number
  disponible: boolean
}

// Transformer: API -> UI
export function transformApiRoomToRoom(apiRoom: ApiRoom): Room {
  // Map room type to category
  const categoryMap: { [key: string]: Room['categorie'] } = {
    'DELUXE': 'Premium',
    'SUITE': 'Premium',
    'PRESIDENTIAL': 'Premium',
    'EXECUTIVE': 'Business',
    'STANDARD': 'Standard',
    'DOUBLE': 'Standard',
    'FAMILY': 'Famille',
    'TWIN': 'Standard',
  }

  // Extraire les équipements depuis amenities
  const equipements = apiRoom.amenities
    ? apiRoom.amenities
        .filter(a => a.disponible)
        .map(a => a.nom)
    : []

  // Nom de la chambre
  const nom = apiRoom.name || `Chambre ${apiRoom.roomNumber} - ${apiRoom.type}`

  // Catégorie
  const categorie = apiRoom.category
    ? (apiRoom.category.includes('Premium') ? 'Premium' :
       apiRoom.category.includes('Business') ? 'Business' :
       apiRoom.category.includes('Famille') ? 'Famille' : 'Standard')
    : (categoryMap[apiRoom.type.toUpperCase()] || 'Standard')

  return {
    id: apiRoom.id, // Garder l'ID original de l'API
    nom,
    categorie,
    description: apiRoom.description || 'Chambre confortable et bien équipée',
    prix: apiRoom.basePrice,
    capacite: apiRoom.capacity,
    superficie: apiRoom.size,
    images: apiRoom.images && apiRoom.images.length > 0
      ? apiRoom.images
      : ['/images/chambres/0.webp'],
    equipements,
    note: 4.5, // Default rating (can be calculated from reviews later)
    avis: 0, // Will be updated when reviews are available
    disponible: apiRoom.status === 'AVAILABLE',
  }
}
