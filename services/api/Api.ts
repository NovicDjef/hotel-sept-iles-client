import axios from 'axios'

// const BASE_URL = 'https://api.novic.dev'
const BASE_URL = `http://localhost:5001`
const hotelId = `cmggqdtba0000xxqtph1k8505`

// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = [
  '/api/v1/spa/services',      // Liste des services spa (GET tous + GET par ID)
  '/api/v1/spa/forfaits',      // Liste des forfaits spa (GET tous + GET par ID)
  '/api/v1/spa/certificats',   // Liste des certificats cadeaux (GET tous + GET par ID)
  '/api/v1/spa/statistics',    // Statistiques spa (publiques)
  '/api/v1/reservations/spa-categories', // Catégories spa (publiques)
  '/api/v1/rooms',             // Liste des chambres
  '/api/v1/auth/guest',        // Enregistrement invité
  '/api/v1/reservations/calculate', // Calcul prix réservation
]

/**
 * Vérifie si une route est publique (ne nécessite pas de token)
 */
const isPublicRoute = (url?: string): boolean => {
  if (!url) return false
  return PUBLIC_ROUTES.some(route => url.includes(route))
}

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  // withCredentials désactivé par défaut pour les routes publiques
  // Sera activé uniquement pour les routes qui nécessitent l'authentification
  withCredentials: false,
})

// Intercepteur de requête pour ajouter le token
apiService.interceptors.request.use(
  async (config) => {
    const routeIsPublic = isPublicRoute(config.url)

    console.log('🔵 API Request:', {
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      isPublic: routeIsPublic,
      requiresAuth: !routeIsPublic
    })

    // Ajouter le token et withCredentials uniquement pour les routes privées
    if (!routeIsPublic) {
      // Activer withCredentials pour les routes authentifiées
      config.withCredentials = true

      try {
        // Pour Next.js, on utilise localStorage au lieu d'AsyncStorage
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('userToken')

          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error)
      }
    } else {
      // Routes publiques : pas de credentials
      config.withCredentials = false
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur de réponse pour gérer les erreurs
apiService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Erreur avec réponse du serveur
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Non autorisé - supprimer le token et rediriger vers login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('userToken')
            // window.location.href = '/login'
          }
          break
        case 403:
          console.error('Accès interdit')
          break
        case 404:
          console.error('Ressource non trouvée')
          break
        case 500:
          console.error('Erreur serveur')
          break
        default:
          console.error('Erreur API:', data?.message || error.message)
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      console.error('Pas de réponse du serveur')
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiService
export { BASE_URL, hotelId }
