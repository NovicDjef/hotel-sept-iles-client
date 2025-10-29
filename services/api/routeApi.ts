import apiService from './Api'
import { Room, ApiRoom } from '@/types/room'

// ==================== ROOM TYPES (INVENTAIRE) ====================

const hotelId = `cmh3iygew00009crzsls6rlzy`

/**
 * Récupère tous les types de chambres d'un hôtel
 * Retourne l'inventaire par type (DOUBLE, SUITE, etc.) avec totalRooms
 */
export const getAllRoomTypes = (hotelIdParam?: string) => {
  const id = hotelIdParam || hotelId
  return apiService.get(`/api/v1/room-types/hotels/${id}`)
}

/**
 * Récupère les statistiques des types de chambres
 */
export const getRoomTypesStats = (hotelIdParam?: string) => {
  const id = hotelIdParam || hotelId
  return apiService.get(`/api/v1/room-types/hotels/${id}/stats`)
}

/**
 * Récupère un type de chambre spécifique
 */
export const getRoomType = (roomType: string, hotelIdParam?: string) => {
  const id = hotelIdParam || hotelId
  return apiService.get(`/api/v1/room-types/hotels/${id}/${roomType}`)
}

// ==================== CHAMBRES (Anciennes routes - à garder pour compatibilité) ====================

/**
 * Récupère toutes les chambres (retourne le format API)
 * @deprecated Utiliser getAllRoomTypes() à la place
 */
export const getAllChambres = () => {
  return apiService.get(`/api/v1/rooms/?hotelId=${hotelId}`)
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
 * Vérifier la disponibilité des chambres par type pour une période donnée
 */
export const checkRoomsAvailability = (data: {
  checkInDate: string  // Format: YYYY-MM-DD
  checkOutDate: string  // Format: YYYY-MM-DD
  hotelId?: string
}) => {
  const params = {
    hotelId: data.hotelId || hotelId,
    checkInDate: data.checkInDate,
    checkOutDate: data.checkOutDate
  }
  return apiService.get('/api/v1/reservations/availability', { params })
}

/**
 * ÉTAPE 1 : Calcul du prix et vérification de disponibilité
 * NOUVEAU: Utilise roomType au lieu de roomId (système d'inventaire)
 */
export const calculateReservationPrice = (data: {
  roomType: string  // Type de chambre: SIMPLE, DOUBLE, SUITE, etc.
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  hotelId?: string
}) => {
  // Ajouter l'hotelId par défaut si non fourni
  const requestData = {
    ...data,
    hotelId: data.hotelId || hotelId
  }
  return apiService.post('/api/v1/reservations/calculate', requestData)
}

/**
 * ÉTAPE 2 : Création compte client + réservation PENDING
 * NOUVEAU: Utilise roomType au lieu de roomId (système d'inventaire)
 */
export const createGuestReservation = (data: {
  // Informations chambre et dates
  roomType: string  // Type de chambre: SIMPLE, DOUBLE, SUITE, etc.
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number

  // Informations client (dans un objet guest)
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: string
  }

  // Options
  specialRequests?: string
  hotelId?: string
}) => {
  // Ajouter l'hotelId par défaut si non fourni
  const requestData = {
    ...data,
    hotelId: data.hotelId || hotelId
  }
  return apiService.post('/api/v1/reservations/guest', requestData)
}

/**
 * Ajouter un service spa à une réservation existante
 */
export const addSpaServiceToReservation = (reservationId: string, data: {
  spaServiceId: string
  duree: number
  nombrePersonnes: number
  date: string  // Format: YYYY-MM-DD
  heure: string  // Format: HH:mm
  notes?: string
}) => {
  return apiService.post(`/api/v1/reservations/${reservationId}/spa-services`, data)
}

/**
 * ÉTAPE 3 : Confirmation du paiement Stripe
 */
export const confirmReservationPayment = (reservationId: string, data: {
  paymentMethodId: string
  amount?: number  // Montant total avec taxes (optionnel selon le backend)
}) => {
  return apiService.post(`/api/v1/reservations/${reservationId}/confirm-payment`, data)
}

/**
 * Récupère les réservations d'un utilisateur
 */
export const getUserReservations = () => {
  return apiService.get('/reservations/user')
}

/**
 * AVIS / REVIEWS
 */

/**
 * Récupère tous les avis d'un hôtel (PUBLIC)
 */
export const getHotelReviews = (hotelId: string) => {
  return apiService.get(`/api/v1/reviews/hotel/${hotelId}`)
}

/**
 * Récupère les statistiques des avis d'un hôtel (PUBLIC)
 */
export const getHotelReviewsStats = (hotelId: string) => {
  return apiService.get(`/api/v1/reviews/hotel/${hotelId}/stats`)
}

/**
 * Créer un avis (AUTHENTIFIÉ)
 */
export const createReview = (data: {
  hotelId: string
  roomName?: string
  stayDate?: string
  overallRating: number
  cleanlinessRating?: number
  serviceRating?: number
  locationRating?: number
  valueRating?: number
  title: string
  comment: string
  photos?: string[]
}) => {
  return apiService.post('/api/v1/reviews', data)
}

/**
 * Marquer un avis comme utile (AUTHENTIFIÉ)
 */
export const markReviewAsHelpful = (reviewId: string) => {
  return apiService.post(`/api/v1/reviews/${reviewId}/helpful`)
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

// ==================== SERVICES SPA ====================

/**
 * Récupère tous les services spa (massages, soins, etc.)
 */
export const getAllServices = () => {
  return apiService.get(`/api/v1/spa/services?hotelId=${hotelId}`)
}

/**
 * Récupère un service spa par son ID
 */
export const getServiceById = (id: string) => {
  return apiService.get(`/api/v1/spa/services/${id}?hotelId=${hotelId}`)
}

/**
 * Récupère tous les forfaits spa
 */
export const getAllForfaits = () => {
  return apiService.get(`/api/v1/spa/forfaits?hotelId=${hotelId}`)
}

/**
 * Récupère un forfait spa par son ID
 */
export const getForfaitById = (id: string) => {
  return apiService.get(`/api/v1/spa/forfaits/${id}?hotelId=${hotelId}`)
}

/**
 * Récupère tous les certificats cadeaux
 */
export const getAllCertificats = () => {
  return apiService.get(`/api/v1/spa/certificats?hotelId=${hotelId}`)
}

/**
 * Récupère un certificat cadeau par son ID
 */
export const getCertificatById = (id: string) => {
  return apiService.get(`/api/v1/spa/certificats/${id}?hotelId=${hotelId}`)
}

/**
 * Crée une réservation de service spa
 */
export const createSpaReservation = (data: {
  guestId: string
  type: 'SERVICE' | 'FORFAIT'
  serviceId?: string
  forfaitId?: string
  date: string
  heure: string
  duree?: number
  nombrePersonnes: number
  notes?: string
}) => {
  const requestData = {
    ...data,
    hotelId: hotelId
  }
  return apiService.post('/api/v1/spa/reservations', requestData)
}

/**
 * Récupère les réservations spa
 */
export const getSpaReservations = (params?: {
  guestId?: string
  serviceId?: string
  date?: string
  status?: string
}) => {
  return apiService.get(`/api/v1/spa/reservations?hotelId=${hotelId}`, { params })
}

/**
 * Récupère les statistiques spa
 */
export const getSpaStatistics = (params?: {
  startDate?: string
  endDate?: string
  groupBy?: 'day' | 'week' | 'month'
}) => {
  return apiService.get(`/api/v1/spa/statistics?hotelId=${hotelId}`, { params })
}

/**
 * Récupère les catégories de services spa
 */
export const getSpaCategories = () => {
  return apiService.get('/api/v1/reservations/spa-categories')
}

/**
 * Crée un certificat cadeau
 */
export const createCertificatCadeau = (data: {
  montant: number
  acheteurNom: string
  acheteurEmail: string
  acheteurPhone: string
  beneficiaireNom?: string
  beneficiaireEmail?: string
  message?: string
  dateExpiration?: string
}) => {
  const requestData = {
    ...data,
    hotelId: hotelId
  }
  return apiService.post('/api/v1/spa/certificats', requestData)
}

/**
 * Valide un certificat cadeau par son code
 */
export const validateCertificatCadeau = (code: string) => {
  return apiService.post(`/api/v1/spa/certificats/validate`, { code, hotelId })
}

/**
 * Utilise un certificat cadeau
 */
export const useCertificatCadeau = (code: string, utiliseParId: string) => {
  return apiService.post(`/api/v1/spa/certificats/use`, { code, utiliseParId, hotelId })
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
 * Enregistrement d'un invité (guest) lors de la réservation
 */
export const registerGuest = (data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
}) => {
  return apiService.post('/api/v1/auth/guest/register', data)
}

/**
 * Demande un code OTP pour connexion sans mot de passe
 */
export const requestGuestOTP = (data: { email: string }) => {
  return apiService.post('/api/v1/auth/guest/request-otp', data)
}

/**
 * Vérifie le code OTP et connecte l'utilisateur
 */
export const verifyGuestOTP = (data: { email: string; otp: string }) => {
  return apiService.post('/api/v1/auth/guest/verify-otp', data)
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
