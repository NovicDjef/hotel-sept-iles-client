import apiService from './Api'
import { Room, ApiRoom } from '@/types/room'

// ==================== CHAMBRES ====================

/**
 * Récupère toutes les chambres (retourne le format API)
 */

const hotelId = `cmggqdtba0000xxqtph1k8505`
export const getAllChambres = () => {
  return apiService.get<ApiRoom[]>(`/api/v1/rooms/?hotelId=${hotelId}`)
}

/**
 * Récupère une chambre par son ID
 */
export const getChambreById = (id: number) => {
  return apiService.get<Room>(`/chambres/${id}`)
}

/**
 * Vérifie la disponibilité d'une chambre
 */
export const checkChambreAvailability = (data: {
  chambreId: number
  dateDebut: string
  dateFin: string
}) => {
  return apiService.post('/chambres/availability', data)
}

/**
 * Filtre les chambres selon des critères
 */
export const filterChambres = (params: {
  categorie?: string
  prixMin?: number
  prixMax?: number
  capacite?: number
  disponible?: boolean
}) => {
  return apiService.get<Room[]>('/chambres', { params })
}

// ==================== RÉSERVATIONS ====================

/**
 * Crée une nouvelle réservation
 */
export const createReservation = (data: {
  chambreId: number
  dateDebut: string
  dateFin: string
  nombrePersonnes: number
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse?: string
  demandesSpeciales?: string
}) => {
  return apiService.post('/reservations', data)
}

/**
 * Récupère les réservations d'un utilisateur
 */
export const getUserReservations = () => {
  return apiService.get('/reservations/user')
}

/**
 * Annule une réservation
 */
export const cancelReservation = (id: number) => {
  return apiService.delete(`/reservations/${id}`)
}

// ==================== AVIS ====================

/**
 * Récupère tous les avis
 */
export const getAllAvis = () => {
  return apiService.get('/avis')
}

/**
 * Récupère les avis d'une chambre
 */
export const getAvisByChambre = (chambreId: number) => {
  return apiService.get(`/avis/chambre/${chambreId}`)
}

/**
 * Crée un nouvel avis
 */
export const createAvis = (data: {
  chambreId: number
  note: number
  titre: string
  commentaire: string
  photos?: string[]
}) => {
  return apiService.post('/avis', data)
}

/**
 * Marque un avis comme utile
 */
export const markAvisAsHelpful = (avisId: number) => {
  return apiService.post(`/avis/${avisId}/utile`)
}

// ==================== SERVICES ====================

/**
 * Récupère tous les services (spa, hammam, etc.)
 */
export const getAllServices = () => {
  return apiService.get('/services')
}

/**
 * Réserve un service
 */
export const reserveService = (data: {
  serviceId: number
  date: string
  heure: string
}) => {
  return apiService.post('/services/reserve', data)
}

// ==================== AUTHENTIFICATION ====================

/**
 * Connexion utilisateur
 */
export const login = (data: { email: string; password: string }) => {
  return apiService.post('/auth/login', data)
}

/**
 * Inscription utilisateur
 */
export const register = (data: {
  nom: string
  prenom: string
  email: string
  password: string
  telephone?: string
}) => {
  return apiService.post('/auth/register', data)
}

/**
 * Déconnexion utilisateur
 */
export const logout = () => {
  return apiService.post('/auth/logout')
}

/**
 * Récupère les informations de l'utilisateur connecté
 */
export const getCurrentUser = () => {
  return apiService.get('/auth/me')
}

/**
 * Réinitialise le mot de passe
 */
export const resetPassword = (data: { email: string }) => {
  return apiService.post('/auth/reset-password', data)
}

// ==================== UTILITAIRES ====================

/**
 * Upload d'une image
 */
export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiService.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * Envoie un message de contact
 */
export const sendContactMessage = (data: {
  nom: string
  email: string
  sujet: string
  message: string
}) => {
  return apiService.post('/contact', data)
}
