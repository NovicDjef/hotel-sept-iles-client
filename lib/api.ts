import axios from 'axios'

// Configuration de base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Types
export interface Chambre {
  id: number
  nom: string
  categorie: string
  description: string
  prix: number
  capacite: number
  superficie: number
  images: string[]
  equipements: string[]
  disponible: boolean
  note?: number
  avisTotal?: number
}

export interface Service {
  id: number
  nom: string
  description: string
  duree: number
  prix: number
  categorie: string
  image?: string
  disponible: boolean
}

export interface Reservation {
  id: number
  chambreId: number
  clientId: number
  dateArrivee: string
  dateDepart: string
  nombrePersonnes: number
  prixTotal: number
  statut: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE' | 'TERMINEE'
  services?: ServiceReservation[]
}

export interface ServiceReservation {
  serviceId: number
  date: string
  heure: string
  prix: number
}

export interface Client {
  id: number
  email: string
  nom: string
  prenom: string
  telephone: string
}

// API Chambres
export const chambresApi = {
  // Récupérer toutes les chambres
  getAll: async (params?: {
    categorie?: string
    prixMin?: number
    prixMax?: number
    capacite?: number
    disponible?: boolean
  }) => {
    const response = await apiClient.get<Chambre[]>('/chambres', { params })
    return response.data
  },

  // Récupérer une chambre par ID
  getById: async (id: string | number) => {
    const response = await apiClient.get<Chambre>(`/chambres/${id}`)
    return response.data
  },

  // Vérifier la disponibilité
  checkDisponibilite: async (
    chambreId: number,
    dateArrivee: string,
    dateDepart: string
  ) => {
    const response = await apiClient.post<{ disponible: boolean }>(
      `/chambres/${chambreId}/disponibilite`,
      { dateArrivee, dateDepart }
    )
    return response.data
  },
}

// API Services
export const servicesApi = {
  // Récupérer tous les services
  getAll: async (categorie?: string) => {
    const response = await apiClient.get<Service[]>('/services', {
      params: { categorie },
    })
    return response.data
  },

  // Récupérer un service par ID
  getById: async (id: number) => {
    const response = await apiClient.get<Service>(`/services/${id}`)
    return response.data
  },

  // Vérifier disponibilité d'un créneau
  checkCreneauDisponible: async (
    serviceId: number,
    date: string,
    heure: string
  ) => {
    const response = await apiClient.post<{ disponible: boolean }>(
      `/services/${serviceId}/disponibilite`,
      { date, heure }
    )
    return response.data
  },
}

// API Réservations
export const reservationsApi = {
  // Créer une réservation
  create: async (data: {
    chambreId: number
    dateArrivee: string
    dateDepart: string
    nombrePersonnes: number
    services?: ServiceReservation[]
    client: {
      email: string
      nom: string
      prenom: string
      telephone: string
    }
  }) => {
    const response = await apiClient.post<Reservation>('/reservations', data)
    return response.data
  },

  // Récupérer les réservations du client
  getMesReservations: async () => {
    const response = await apiClient.get<Reservation[]>('/reservations/mes-reservations')
    return response.data
  },

  // Récupérer une réservation par ID
  getById: async (id: number) => {
    const response = await apiClient.get<Reservation>(`/reservations/${id}`)
    return response.data
  },

  // Annuler une réservation
  annuler: async (id: number) => {
    const response = await apiClient.put<Reservation>(`/reservations/${id}/annuler`)
    return response.data
  },

  // Calculer le prix total
  calculerPrix: async (data: {
    chambreId: number
    dateArrivee: string
    dateDepart: string
    services?: { serviceId: number; quantite?: number }[]
  }) => {
    const response = await apiClient.post<{
      chambre: number
      services: number
      taxes: number
      total: number
    }>('/reservations/calculer-prix', data)
    return response.data
  },
}

// API Avis
export const avisApi = {
  // Récupérer les avis d'une chambre
  getByChambre: async (chambreId: number, page = 1, limit = 10) => {
    const response = await apiClient.get(`/avis/chambre/${chambreId}`, {
      params: { page, limit },
    })
    return response.data
  },

  // Créer un avis
  create: async (data: {
    reservationId: number
    note: number
    commentaire: string
  }) => {
    const response = await apiClient.post('/avis', data)
    return response.data
  },
}

// API Authentification
export const authApi = {
  // Connexion
  login: async (email: string, motDePasse: string) => {
    const response = await apiClient.post<{
      token: string
      client: Client
    }>('/auth/login', { email, motDePasse })
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    return response.data
  },

  // Inscription
  register: async (data: {
    email: string
    motDePasse: string
    nom: string
    prenom: string
    telephone: string
  }) => {
    const response = await apiClient.post<{
      token: string
      client: Client
    }>('/auth/register', data)
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    return response.data
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('authToken')
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  },

  // Récupérer le profil
  getProfile: async () => {
    const response = await apiClient.get<Client>('/auth/profile')
    return response.data
  },

  // Mettre à jour le profil
  updateProfile: async (data: Partial<Client>) => {
    const response = await apiClient.put<Client>('/auth/profile', data)
    return response.data
  },
}

// API Paiement
export const paiementApi = {
  // Créer une intention de paiement Stripe
  createPaymentIntent: async (reservationId: number) => {
    const response = await apiClient.post<{
      clientSecret: string
      amount: number
    }>(`/paiements/create-intent/${reservationId}`)
    return response.data
  },

  // Confirmer le paiement
  confirmPayment: async (reservationId: number, paymentIntentId: string) => {
    const response = await apiClient.post(`/paiements/confirm/${reservationId}`, {
      paymentIntentId,
    })
    return response.data
  },
}

export default apiClient