import apiService from './Api'
import type {
  AvailabilityCheckRequest,
  AvailabilityResponse,
  HotelAvailability,
  RoomDetail,
} from '@/types/availability'

/**
 * Service API pour la gestion de la disponibilité des chambres
 */
class AvailabilityApiService {
  private baseUrl = '/api/v1/availability'

  /**
   * Vérifier la disponibilité globale de l'hôtel pour des dates données
   * GET /api/v1/availability/check
   */
  async checkAvailability(
    request: AvailabilityCheckRequest
  ): Promise<AvailabilityResponse> {
    try {
      const params = new URLSearchParams({
        hotelId: request.hotelId,
        checkIn: request.checkIn,
        checkOut: request.checkOut,
      })

      if (request.roomType) {
        params.append('roomType', request.roomType)
      }

      const response = await apiService.get<AvailabilityResponse>(
        `${this.baseUrl}/check?${params.toString()}`
      )

      return response.data
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error)
      throw error
    }
  }

  /**
   * Obtenir la disponibilité pour un type de chambre spécifique
   * GET /api/v1/availability/room-type/:type
   */
  async getAvailabilityByType(
    hotelId: string,
    roomType: string,
    checkIn: string,
    checkOut: string
  ): Promise<AvailabilityResponse> {
    try {
      const params = new URLSearchParams({
        hotelId,
        checkIn,
        checkOut,
      })

      const response = await apiService.get<AvailabilityResponse>(
        `${this.baseUrl}/room-type/${roomType}?${params.toString()}`
      )

      return response.data
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la disponibilité pour ${roomType}:`,
        error
      )
      throw error
    }
  }

  /**
   * Obtenir les chambres disponibles (avec numéros)
   * GET /api/v1/availability/rooms
   */
  async getAvailableRooms(
    hotelId: string,
    checkIn: string,
    checkOut: string,
    roomType?: string
  ): Promise<{ success: boolean; data: RoomDetail[] }> {
    try {
      const params = new URLSearchParams({
        hotelId,
        checkIn,
        checkOut,
      })

      if (roomType) {
        params.append('roomType', roomType)
      }

      const response = await apiService.get<{
        success: boolean
        data: RoomDetail[]
      }>(`${this.baseUrl}/rooms?${params.toString()}`)

      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des chambres disponibles:', error)
      throw error
    }
  }

  /**
   * Vérifier si une chambre spécifique est disponible
   * GET /api/v1/availability/room/:roomId
   */
  async checkRoomAvailability(
    roomId: string,
    checkIn: string,
    checkOut: string
  ): Promise<{ success: boolean; data: { available: boolean; room: RoomDetail } }> {
    try {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
      })

      const response = await apiService.get<{
        success: boolean
        data: { available: boolean; room: RoomDetail }
      }>(`${this.baseUrl}/room/${roomId}?${params.toString()}`)

      return response.data
    } catch (error) {
      console.error('Erreur lors de la vérification de la chambre:', error)
      throw error
    }
  }

  /**
   * Obtenir le calendrier de disponibilité pour un mois
   * GET /api/v1/availability/calendar
   */
  async getAvailabilityCalendar(
    hotelId: string,
    year: number,
    month: number
  ): Promise<{
    success: boolean
    data: {
      [date: string]: {
        totalRooms: number
        availableRooms: number
        occupancyRate: number
      }
    }
  }> {
    try {
      const params = new URLSearchParams({
        hotelId,
        year: year.toString(),
        month: month.toString(),
      })

      const response = await apiService.get<{
        success: boolean
        data: {
          [date: string]: {
            totalRooms: number
            availableRooms: number
            occupancyRate: number
          }
        }
      }>(`${this.baseUrl}/calendar?${params.toString()}`)

      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du calendrier:', error)
      throw error
    }
  }

  /**
   * Obtenir les statistiques de disponibilité
   * GET /api/v1/availability/stats
   */
  async getAvailabilityStats(
    hotelId: string,
    startDate: string,
    endDate: string
  ): Promise<{
    success: boolean
    data: {
      averageOccupancy: number
      peakOccupancyDate: string
      lowestOccupancyDate: string
      totalReservations: number
    }
  }> {
    try {
      const params = new URLSearchParams({
        hotelId,
        startDate,
        endDate,
      })

      const response = await apiService.get<{
        success: boolean
        data: {
          averageOccupancy: number
          peakOccupancyDate: string
          lowestOccupancyDate: string
          totalReservations: number
        }
      }>(`${this.baseUrl}/stats?${params.toString()}`)

      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      throw error
    }
  }
}

// Export d'une instance unique du service
export const availabilityApi = new AvailabilityApiService()
