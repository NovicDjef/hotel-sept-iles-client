// Room Type Inventory (Système d'inventaire par type)
export interface RoomTypeInventory {
  id: string
  hotelId: string
  roomType: string  // SIMPLE, DOUBLE, SUITE, CONDO, etc. (nom du champ dans l'API)
  type?: string  // Fallback pour compatibilité
  totalRooms: number  // Nombre total de chambres de ce type
  name: string
  category: string | null
  description: string
  basePrice: number
  weekendPrice: number
  capacity: number
  size: number | null
  bedType: string | null
  amenities: Record<string, boolean> | null
  images: string[]
  createdAt: string
  updatedAt: string
}

// API Response Type (from backend - anciennes routes)
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
  type: string  // Type de chambre backend: SIMPLE, DOUBLE, SUITE, etc.
  categorie: 'Premium' | 'Standard' | 'Famille' | 'Business'
  description: string
  prix: number  // Prix de base (semaine)
  prixWeekend: number  // Prix pour le weekend
  capacite: number
  superficie: number
  images: string[]
  equipements: string[]
  note: number
  avis: number
  disponible: boolean
}

// Transformer: RoomTypeInventory -> UI
export function transformRoomTypeToRoom(roomType: RoomTypeInventory): Room {
  // Map room type to category
  const categoryMap: { [key: string]: Room['categorie'] } = {
    'DELUXE': 'Premium',
    'SUITE': 'Premium',
    'PRESIDENTIAL': 'Premium',
    'EXECUTIVE': 'Business',
    'STANDARD': 'Standard',
    'DOUBLE': 'Standard',
    'SIMPLE': 'Standard',
    'FAMILY': 'Famille',
    'CONDO': 'Famille',
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

  // Extraire les équipements
  const equipements = roomType.amenities && typeof roomType.amenities === 'object'
    ? Object.entries(roomType.amenities)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => amenitiesMap[key] || key.charAt(0).toUpperCase() + key.slice(1))
    : []

  // Extraire le roomType (priorité à roomType, puis fallback sur type)
  const roomTypeStr = roomType.roomType || roomType.type || 'STANDARD'

  // Catégorie
  const categorie = roomType.category
    ? (roomType.category.includes('Premium') ? 'Premium' :
       roomType.category.includes('Business') ? 'Business' :
       roomType.category.includes('Famille') ? 'Famille' : 'Standard')
    : (categoryMap[roomTypeStr.toUpperCase()] || 'Standard')

  return {
    id: roomType.id,
    nom: roomType.name || `Chambre ${roomTypeStr}`,
    type: roomTypeStr,  // On garde 'type' pour l'interface Room UI
    categorie,
    description: roomType.description || 'Chambre confortable et bien équipée',
    prix: roomType.basePrice || 0,
    prixWeekend: roomType.weekendPrice || roomType.basePrice || 0,
    capacite: roomType.capacity || 1,
    superficie: roomType.size || 25,
    images: roomType.images && roomType.images.length > 0
      ? roomType.images
      : ['/images/chambres/0.webp'],
    equipements,
    note: 4.5,
    avis: 0,
    disponible: true,  // Sera calculé via l'API de disponibilité
  }
}

// Transformer: API -> UI (Ancienne fonction - pour compatibilité)
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
    type: apiRoom.type, // Type de chambre backend (SIMPLE, DOUBLE, SUITE, etc.)
    categorie,
    description: apiRoom.description || 'Chambre confortable et bien équipée',
    prix: apiRoom.basePrice,
    prixWeekend: apiRoom.weekendPrice,
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
