import apiService from './Api'

/**
 * Types basés sur l'API backend réelle
 */
export interface RoomTypeAvailabilityBackend {
  roomType: string // SIMPLE, DOUBLE, SUITE, STUDIO
  total: number // Nombre total de chambres de ce type
  available: number // Nombre de chambres disponibles
  reserved: number // Nombre de chambres réservées
  percentage: number // Pourcentage d'occupation
}

export interface AvailabilityByDateResponse {
  success: boolean
  data: {
    hotelId: string
    checkInDate: string
    checkOutDate: string
    totalRooms: number
    availableRooms: number
    reservedRooms: number
    occupancyRate: number
    byRoomType: RoomTypeAvailabilityBackend[]
  }
}

export interface CreateReservationRequest {
  hotelId: string
  roomType: string // SIMPLE, DOUBLE, SUITE, STUDIO
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string // YYYY-MM-DD
  numberOfGuests: number
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  specialRequests?: string
}

export interface ReservationResponse {
  success: boolean
  data: {
    id: string
    reservationNumber: string
    roomId: string
    roomNumber: string
    roomType: string
    checkInDate: string
    checkOutDate: string
    totalPrice: number
    status: string
    guest: {
      firstName: string
      lastName: string
      email: string
      phone: string
    }
  }
  message?: string
}

/**
 * Service API pour la disponibilité des chambres
 * Utilise les routes backend réelles
 */
class RoomAvailabilityApiService {
  /**
   * Vérifier la disponibilité par date
   * GET /api/v1/rooms/availability/by-date
   */
  async checkAvailabilityByDate(
    hotelId: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<AvailabilityByDateResponse> {
    try {
      const response = await apiService.get<AvailabilityByDateResponse>(
        '/api/v1/rooms/availability/by-date',
        {
          params: {
            hotelId,
            checkInDate,
            checkOutDate,
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error)
      throw error
    }
  }

  /**
   * Créer une réservation guest
   * POST /api/v1/reservations/guest
   */
  async createGuestReservation(
    data: CreateReservationRequest
  ): Promise<ReservationResponse> {
    try {
      const response = await apiService.post<ReservationResponse>(
        '/api/v1/reservations/guest',
        data
      )

      return response.data
    } catch (error: any) {
      console.error('Erreur lors de la création de la réservation:', error)

      // Gérer les erreurs spécifiques
      if (error?.response?.data?.error?.code === 'ROOM_TYPE_NOT_AVAILABLE') {
        throw new Error('Aucune chambre disponible pour ces dates')
      }

      if (error?.response?.data?.error?.code === 'INVALID_DATES') {
        throw new Error('Dates invalides')
      }

      throw error
    }
  }

  /**
   * Vérifier si un type de chambre est disponible
   */
  async isRoomTypeAvailable(
    hotelId: string,
    roomType: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<boolean> {
    try {
      const response = await this.checkAvailabilityByDate(
        hotelId,
        checkInDate,
        checkOutDate
      )

      const typeAvailability = response.data.byRoomType.find(
        (rt) => rt.roomType === roomType
      )

      return (typeAvailability?.available ?? 0) > 0
    } catch (error) {
      console.error('Erreur lors de la vérification du type de chambre:', error)
      return false
    }
  }

  /**
   * Obtenir le nombre de chambres disponibles par type
   */
  async getAvailableRoomsByType(
    hotelId: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<Map<string, number>> {
    try {
      const response = await this.checkAvailabilityByDate(
        hotelId,
        checkInDate,
        checkOutDate
      )

      const availabilityMap = new Map<string, number>()

      response.data.byRoomType.forEach((type) => {
        availabilityMap.set(type.roomType, type.available)
      })

      return availabilityMap
    } catch (error) {
      console.error('Erreur lors de la récupération des disponibilités:', error)
      return new Map()
    }
  }
}

// Export d'une instance unique
export const roomAvailabilityApi = new RoomAvailabilityApiService()
