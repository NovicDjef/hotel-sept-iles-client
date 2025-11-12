import { useState, useEffect, useCallback } from 'react'
import { availabilityApi } from '@/services/api/availabilityApi'
import { hotelId } from '@/services/api/Api'
import type {
  HotelAvailability,
  RoomDetail,
  RoomTypeAvailability,
} from '@/types/availability'

/**
 * Hook pour gérer la disponibilité des chambres
 */
export const useAvailability = (
  checkIn?: string,
  checkOut?: string,
  roomType?: string
) => {
  const [availability, setAvailability] = useState<HotelAvailability | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Vérifier la disponibilité
   */
  const checkAvailability = useCallback(
    async (customCheckIn?: string, customCheckOut?: string, customRoomType?: string) => {
      const startDate = customCheckIn || checkIn
      const endDate = customCheckOut || checkOut

      if (!startDate || !endDate) {
        setError('Veuillez sélectionner des dates')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await availabilityApi.checkAvailability({
          hotelId,
          checkIn: startDate,
          checkOut: endDate,
          roomType: customRoomType || roomType,
        })

        if (response.success) {
          setAvailability(response.data)
        } else {
          setError(response.message || 'Erreur lors de la vérification')
        }
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err.message || 'Erreur de connexion'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [checkIn, checkOut, roomType]
  )

  /**
   * Vérifier automatiquement quand les dates changent
   */
  useEffect(() => {
    if (checkIn && checkOut) {
      checkAvailability()
    }
  }, [checkIn, checkOut, roomType, checkAvailability])

  return {
    availability,
    loading,
    error,
    checkAvailability,
    isFullyBooked: availability?.isFullyBooked ?? false,
    totalAvailableRooms: availability?.availableRooms ?? 0,
  }
}

/**
 * Hook pour obtenir les chambres disponibles avec numéros
 */
export const useAvailableRooms = (
  checkIn?: string,
  checkOut?: string,
  roomType?: string
) => {
  const [rooms, setRooms] = useState<RoomDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAvailableRooms = useCallback(async () => {
    if (!checkIn || !checkOut) return

    setLoading(true)
    setError(null)

    try {
      const response = await availabilityApi.getAvailableRooms(
        hotelId,
        checkIn,
        checkOut,
        roomType
      )

      if (response.success) {
        setRooms(response.data)
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err.message || 'Erreur de connexion'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [checkIn, checkOut, roomType])

  useEffect(() => {
    fetchAvailableRooms()
  }, [fetchAvailableRooms])

  return {
    rooms,
    loading,
    error,
    refreshRooms: fetchAvailableRooms,
  }
}

/**
 * Hook pour vérifier si une chambre spécifique est disponible
 */
export const useRoomAvailability = (
  roomId: string,
  checkIn?: string,
  checkOut?: string
) => {
  const [available, setAvailable] = useState<boolean>(false)
  const [room, setRoom] = useState<RoomDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkRoom = useCallback(async () => {
    if (!checkIn || !checkOut || !roomId) return

    setLoading(true)
    setError(null)

    try {
      const response = await availabilityApi.checkRoomAvailability(
        roomId,
        checkIn,
        checkOut
      )

      if (response.success) {
        setAvailable(response.data.available)
        setRoom(response.data.room)
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err.message || 'Erreur de connexion'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [roomId, checkIn, checkOut])

  useEffect(() => {
    checkRoom()
  }, [checkRoom])

  return {
    available,
    room,
    loading,
    error,
    recheckAvailability: checkRoom,
  }
}

/**
 * Hook pour obtenir la disponibilité par type de chambre
 */
export const useRoomTypeAvailability = (
  checkIn?: string,
  checkOut?: string
) => {
  const { availability, loading, error, checkAvailability } = useAvailability(
    checkIn,
    checkOut
  )

  /**
   * Obtenir la disponibilité pour un type spécifique
   */
  const getTypeAvailability = useCallback(
    (type: string): RoomTypeAvailability | undefined => {
      return availability?.roomTypes.find((rt) => rt.type === type)
    },
    [availability]
  )

  /**
   * Vérifier si un type a des chambres disponibles
   */
  const hasAvailableRooms = useCallback(
    (type: string): boolean => {
      const typeAvail = getTypeAvailability(type)
      return (typeAvail?.availableRooms ?? 0) > 0
    },
    [getTypeAvailability]
  )

  return {
    roomTypes: availability?.roomTypes ?? [],
    loading,
    error,
    checkAvailability,
    getTypeAvailability,
    hasAvailableRooms,
  }
}
