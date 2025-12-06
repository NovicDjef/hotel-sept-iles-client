import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'

// Types
export interface CreateTableReservationData {
  tableId?: string
  firstName: string
  lastName: string
  guestPhone: string
  guestEmail: string
  date: string
  time: string
  timePeriod: 'MORNING' | 'AFTERNOON' | 'EVENING'
  numberOfGuests: number
  occasion?: 'BUSINESS' | 'ROMANTIC' | 'FAMILY' | 'BIRTHDAY' | 'ANNIVERSARY' | 'CELEBRATION' | 'CASUAL' | 'OTHER'
  message?: string
  specialRequests?: string
  paymentMethodId: string
}

export interface TableReservation {
  id: string
  tableId: string | null
  firstName: string
  lastName: string
  guestPhone: string
  guestEmail: string
  date: string
  time: string
  timePeriod: string
  numberOfGuests: number
  occasion: string | null
  message: string | null
  specialRequests: string | null
  status: string
  depositAmount: number
  isPaid: boolean
  paymentMethod: string | null
  stripePaymentId: string | null
  transactionId: string | null
  createdAt: string
  updatedAt: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string | null
  isAvailable: boolean
  allergens: string[]
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
}

// Helper function to get auth token
const getAuthToken = async () => {
  // Si vous avez un système d'auth guest, récupérez le token ici
  const { ensureGuestAuth } = await import('@/services/auth/guestAuth')
  await ensureGuestAuth()
  const token = localStorage.getItem('guestToken')
  return token
}

// Helper function to determine time period
export const getTimePeriod = (time: string): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const hour = parseInt(time.split(':')[0])

  if (hour >= 6 && hour < 12) {
    return 'MORNING'
  } else if (hour >= 12 && hour < 18) {
    return 'AFTERNOON'
  } else {
    return 'EVENING'
  }
}

// API Functions

/**
 * Créer une réservation de table avec paiement
 */
export const createTableReservation = async (data: CreateTableReservationData): Promise<TableReservation> => {
  try {
    const token = await getAuthToken()

    const response = await axios.post(
      `${API_BASE_URL}/restaurant/reservations`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error creating table reservation:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erreur lors de la création de la réservation')
  }
}

/**
 * Récupérer toutes les réservations (pour l'admin)
 */
export const getTableReservations = async (): Promise<TableReservation[]> => {
  try {
    const token = await getAuthToken()

    const response = await axios.get(
      `${API_BASE_URL}/restaurant/reservations`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error fetching reservations:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des réservations')
  }
}

/**
 * Récupérer le menu du restaurant
 */
export const getRestaurantMenu = async (): Promise<MenuItem[]> => {
  try {
    const token = await getAuthToken()

    const response = await axios.get(
      `${API_BASE_URL}/restaurant/menu`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error fetching menu:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du menu')
  }
}

/**
 * Récupérer le menu par catégorie
 */
export const getMenuByCategory = async (category: string): Promise<MenuItem[]> => {
  try {
    const token = await getAuthToken()

    const response = await axios.get(
      `${API_BASE_URL}/restaurant/menu/category/${category}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error fetching menu by category:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du menu')
  }
}

/**
 * Annuler une réservation
 */
export const cancelTableReservation = async (reservationId: string): Promise<void> => {
  try {
    const token = await getAuthToken()

    await axios.delete(
      `${API_BASE_URL}/restaurant/reservations/${reservationId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
  } catch (error: any) {
    console.error('Error canceling reservation:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erreur lors de l\'annulation de la réservation')
  }
}
