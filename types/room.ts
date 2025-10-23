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
  size: number | null
  bedType: string | null
  description: string
  basePrice: number
  weekendPrice: number
  // amenities est un objet avec des clés booléennes (ex: { "ac": true, "tv": true })
  amenities: Record<string, boolean> | null
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

  // Map pour traduire les clés d'équipements en français
  const amenitiesMap: Record<string, string> = {
    'ac': 'Climatisation',
    'tv': 'Télévision',
    'wifi': 'Wi-Fi',
    'minibar': 'Minibar',
    'balcony': 'Balcon',
    'jacuzzi': 'Jacuzzi',
    'dining': 'Salle à manger',
    'kitchen': 'Cuisine',
    'safe': 'Coffre-fort',
    'phone': 'Téléphone',
    'hairdryer': 'Sèche-cheveux',
    'bathtub': 'Baignoire',
    'shower': 'Douche',
    'desk': 'Bureau',
    'sofa': 'Canapé',
  }

  // Extraire les équipements depuis amenities (format objet avec clés booléennes)
  const equipements = apiRoom.amenities && typeof apiRoom.amenities === 'object'
    ? Object.entries(apiRoom.amenities)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => amenitiesMap[key] || key.charAt(0).toUpperCase() + key.slice(1))
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
    superficie: apiRoom.size || 25, // Valeur par défaut si null
    images: apiRoom.images && apiRoom.images.length > 0
      ? apiRoom.images
      : ['/images/chambres/0.webp'],
    equipements,
    note: 4.5, // Default rating (can be calculated from reviews later)
    avis: 0, // Will be updated when reviews are available
    disponible: apiRoom.status === 'AVAILABLE',
  }
}
