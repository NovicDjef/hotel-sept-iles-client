/**
 * Types pour le système de disponibilité des chambres
 */

/**
 * Statut d'une chambre
 */
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED'

/**
 * Information d'une chambre individuelle
 */
export interface RoomDetail {
  id: string
  roomNumber: string // Numéro de chambre (ex: "101", "228")
  floor: number // Étage
  type: string // SIMPLE, DOUBLE, SUITE, STUDIO
  status: RoomStatus
  basePrice: number
  weekendPrice: number
  isAvailable: boolean // Disponible pour les dates sélectionnées
}

/**
 * Disponibilité par type de chambre
 */
export interface RoomTypeAvailability {
  type: string // SIMPLE, DOUBLE, SUITE, STUDIO
  typeName: string // Nom affiché (ex: "Suite", "Studio")
  totalRooms: number // Nombre total de chambres de ce type
  availableRooms: number // Nombre de chambres disponibles
  occupiedRooms: number // Nombre de chambres occupées
  basePrice: number
  weekendPrice: number
  roomNumbers: string[] // Liste des numéros de chambres disponibles
  rooms: RoomDetail[] // Détails de toutes les chambres de ce type
}

/**
 * Disponibilité globale de l'hôtel
 */
export interface HotelAvailability {
  hotelId: string
  checkIn: string // Date ISO
  checkOut: string // Date ISO
  totalRooms: number // Total de chambres dans l'hôtel
  availableRooms: number // Total de chambres disponibles
  occupiedRooms: number // Total de chambres occupées
  roomTypes: RoomTypeAvailability[] // Disponibilité par type
  isFullyBooked: boolean // Toutes les chambres sont réservées
}

/**
 * Requête pour vérifier la disponibilité
 */
export interface AvailabilityCheckRequest {
  hotelId: string
  checkIn: string // Format YYYY-MM-DD
  checkOut: string // Format YYYY-MM-DD
  roomType?: string // Optionnel - filtrer par type
}

/**
 * Réponse API pour la disponibilité
 */
export interface AvailabilityResponse {
  success: boolean
  data: HotelAvailability
  message?: string
}

/**
 * Sélection de chambre pour réservation
 */
export interface RoomSelection {
  roomId: string
  roomNumber: string
  roomType: string
  floor: number
  basePrice: number
  weekendPrice: number
}

/**
 * Réservation avec chambre assignée
 */
export interface RoomReservation {
  roomId: string
  roomNumber: string
  roomType: string
  checkIn: string
  checkOut: string
  guestName: string
  guestEmail: string
  guestPhone?: string
  numberOfGuests: number
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}

/**
 * Statistiques de disponibilité
 */
export interface AvailabilityStats {
  date: string
  totalRooms: number
  availableRooms: number
  occupancyRate: number // Pourcentage d'occupation (0-100)
  byType: {
    [key: string]: {
      total: number
      available: number
      occupancyRate: number
    }
  }
}
