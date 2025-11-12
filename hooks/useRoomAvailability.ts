import { useState, useEffect, useCallback } from 'react'
import { roomAvailabilityApi } from '@/services/api/roomAvailabilityApi'
import type {
  RoomTypeAvailabilityBackend,
  AvailabilityByDateResponse,
} from '@/services/api/roomAvailabilityApi'
import { hotelId } from '@/services/api/Api'

/**
 * Hook pour vérifier la disponibilité des chambres (format backend réel)
 */
export const useRoomAvailability = (checkInDate?: string, checkOutDate?: string) => {
  const [availability, setAvailability] =
    useState<AvailabilityByDateResponse['data'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Vérifier la disponibilité
   */
  const checkAvailability = useCallback(
    async (customCheckIn?: string, customCheckOut?: string) => {
      const checkIn = customCheckIn || checkInDate
      const checkOut = customCheckOut || checkOutDate

      if (!checkIn || !checkOut) {
        setError('Veuillez sélectionner des dates')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await roomAvailabilityApi.checkAvailabilityByDate(
          hotelId,
          checkIn,
          checkOut
        )

        if (response.success) {
          setAvailability(response.data)
          console.log('📊 Disponibilité des chambres:', response.data)
        } else {
          setError('Erreur lors de la vérification de la disponibilité')
        }
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err.message || 'Erreur de connexion'
        setError(errorMessage)
        console.error('❌ Erreur disponibilité:', err)
      } finally {
        setLoading(false)
      }
    },
    [checkInDate, checkOutDate]
  )

  /**
   * Vérifier automatiquement quand les dates changent
   */
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      checkAvailability()
    }
  }, [checkInDate, checkOutDate, checkAvailability])

  /**
   * Obtenir la disponibilité pour un type spécifique
   */
  const getTypeAvailability = useCallback(
    (roomType: string): RoomTypeAvailabilityBackend | undefined => {
      return availability?.byRoomType.find((rt) => rt.roomType === roomType)
    },
    [availability]
  )

  /**
   * Vérifier si un type a des chambres disponibles
   */
  const hasAvailableRooms = useCallback(
    (roomType: string): boolean => {
      const typeAvail = getTypeAvailability(roomType)
      return (typeAvail?.available ?? 0) > 0
    },
    [getTypeAvailability]
  )

  /**
   * Vérifier si l'hôtel est complet
   */
  const isFullyBooked = availability?.availableRooms === 0

  /**
   * Obtenir le taux d'occupation
   */
  const occupancyRate = availability?.occupancyRate ?? 0

  return {
    availability,
    loading,
    error,
    checkAvailability,
    getTypeAvailability,
    hasAvailableRooms,
    isFullyBooked,
    occupancyRate,
    totalAvailableRooms: availability?.availableRooms ?? 0,
    totalRooms: availability?.totalRooms ?? 0,
    roomTypes: availability?.byRoomType ?? [],
  }
}

/**
 * Hook pour créer une réservation guest
 */
export const useCreateReservation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservation, setReservation] = useState<any | null>(null)

  const createReservation = useCallback(
    async (
      roomType: string,
      checkInDate: string,
      checkOutDate: string,
      numberOfGuests: number,
      guest: {
        firstName: string
        lastName: string
        email: string
        phone: string
      },
      specialRequests?: string
    ) => {
      setLoading(true)
      setError(null)
      setReservation(null)

      try {
        const response = await roomAvailabilityApi.createGuestReservation({
          hotelId,
          roomType,
          checkInDate,
          checkOutDate,
          numberOfGuests,
          guest,
          specialRequests,
        })

        if (response.success) {
          setReservation(response.data)
          console.log('✅ Réservation créée:', response.data)
          return response.data
        } else {
          throw new Error(response.message || 'Erreur lors de la réservation')
        }
      } catch (err: any) {
        const errorMessage = err.message || 'Erreur lors de la réservation'
        setError(errorMessage)
        console.error('❌ Erreur réservation:', err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const resetReservation = useCallback(() => {
    setReservation(null)
    setError(null)
  }, [])

  return {
    createReservation,
    resetReservation,
    reservation,
    loading,
    error,
  }
}

/**
 * Hook pour vérifier si un type de chambre est disponible
 */
export const useCheckRoomType = (
  roomType: string,
  checkInDate?: string,
  checkOutDate?: string
) => {
  const { getTypeAvailability, hasAvailableRooms, loading, error } =
    useRoomAvailability(checkInDate, checkOutDate)

  const typeAvailability = getTypeAvailability(roomType)
  const isAvailable = hasAvailableRooms(roomType)

  return {
    isAvailable,
    availableCount: typeAvailability?.available ?? 0,
    totalCount: typeAvailability?.total ?? 0,
    reservedCount: typeAvailability?.reserved ?? 0,
    percentage: typeAvailability?.percentage ?? 0,
    loading,
    error,
  }
}
