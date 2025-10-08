import axios from 'axios'

// const BASE_URL = 'https://api.novic.dev'
const BASE_URL = `http://192.168.1.86:3000/`
const HotelId = "cmggqdtba0000xxqtph1k8505"

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  withCredentials: true,
})

// Intercepteur de requête pour ajouter le token
apiService.interceptors.request.use(
  async (config) => {
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
export { BASE_URL }
