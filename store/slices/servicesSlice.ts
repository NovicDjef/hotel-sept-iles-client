import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  Service,
  Forfait,
  CertificatCadeau,
  SpaCategory,
  transformApiServiceToService,
  transformApiForfaitToForfait,
  transformApiCertificatToCertificat,
  transformCertificatAmountToCertificat
} from '@/types/service'
import { apiCache } from '@/lib/apiCache'

// État initial
interface ServicesState {
  services: Service[]
  forfaits: Forfait[]
  certificats: CertificatCadeau[]
  categories: SpaCategory[]
  filteredServices: Service[]
  loading: boolean
  error: string | null
  filters: {
    category: string
  }
}

const initialState: ServicesState = {
  services: [],
  forfaits: [],
  certificats: [],
  categories: [],
  filteredServices: [],
  loading: false,
  error: null,
  filters: {
    category: 'tous',
  }
}

// Thunk asynchrone pour récupérer les services depuis l'API
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllServices } = await import('@/services/api/routeApi')

      // Utiliser le cache (TTL: 3 minutes)
      const response = await apiCache.get('spa-services', () => getAllServices(), 3 * 60 * 1000)
      console.log('Réponse API services:', response.data)

      // L'API retourne { success, message, data }
      const apiServices = response.data.data || response.data
      console.log('Services API récupérés:', apiServices)

      // Transform API data to UI format
      const transformedServices = apiServices.map(transformApiServiceToService)
      console.log('Services transformés:', transformedServices)

      return transformedServices
    } catch (error: any) {
      console.error('Erreur fetchServices:', error)

      // Détecter les erreurs réseau (serveur injoignable)
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue('MAINTENANCE')
      }

      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des services'
      return rejectWithValue(message)
    }
  }
)

// Thunk asynchrone pour récupérer les forfaits depuis l'API
export const fetchForfaits = createAsyncThunk(
  'services/fetchForfaits',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllForfaits } = await import('@/services/api/routeApi')

      // Utiliser le cache (TTL: 3 minutes)
      const response = await apiCache.get('spa-forfaits', () => getAllForfaits(), 3 * 60 * 1000)
      console.log('Réponse API forfaits:', response.data)

      const apiForfaits = response.data.data || response.data
      console.log('Forfaits API récupérés:', apiForfaits)

      const transformedForfaits = apiForfaits.map(transformApiForfaitToForfait)
      console.log('Forfaits transformés:', transformedForfaits)

      return transformedForfaits
    } catch (error: any) {
      console.error('Erreur fetchForfaits:', error)

      // Détecter les erreurs réseau (serveur injoignable)
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue('MAINTENANCE')
      }

      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des forfaits'
      return rejectWithValue(message)
    }
  }
)

// Thunk asynchrone pour récupérer les certificats cadeaux depuis l'API
export const fetchCertificats = createAsyncThunk(
  'services/fetchCertificats',
  async (_, { rejectWithValue }) => {
    try {
      // Utiliser le nouvel endpoint /amounts pour récupérer les montants disponibles
      const { getCertificatsAmounts } = await import('@/services/api/routeApi')

      // Utiliser le cache (TTL: 5 minutes - données rarement changeantes)
      const response = await apiCache.get('spa-certificats', () => getCertificatsAmounts(), 5 * 60 * 1000)
      console.log('Réponse API certificats amounts:', response.data)

      const apiCertificatsAmounts = response.data.data || response.data
      console.log('Certificats amounts API récupérés:', apiCertificatsAmounts)

      // Utiliser le nouveau transformer pour les amounts
      const transformedCertificats = apiCertificatsAmounts.map(transformCertificatAmountToCertificat)
      console.log('Certificats transformés:', transformedCertificats)

      return transformedCertificats
    } catch (error: any) {
      console.error('Erreur fetchCertificats:', error)

      // Détecter les erreurs réseau (serveur injoignable)
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue('MAINTENANCE')
      }

      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des certificats'
      return rejectWithValue(message)
    }
  }
)

// Thunk asynchrone pour récupérer les catégories spa depuis l'API
export const fetchSpaCategories = createAsyncThunk(
  'services/fetchSpaCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { getSpaCategories } = await import('@/services/api/routeApi')

      // Utiliser le cache (TTL: 10 minutes - données très rarement changeantes)
      const response = await apiCache.get('spa-categories', () => getSpaCategories(), 10 * 60 * 1000)
      console.log('Réponse API catégories:', response.data)

      // L'API retourne { success, message, data }
      const apiCategories = response.data.data || response.data
      console.log('Catégories API récupérées:', apiCategories)

      return apiCategories as SpaCategory[]
    } catch (error: any) {
      console.error('Erreur fetchSpaCategories:', error)

      // Détecter les erreurs réseau (serveur injoignable)
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue('MAINTENANCE')
      }

      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des catégories'
      return rejectWithValue(message)
    }
  }
)

// Thunk pour récupérer toutes les données spa en une fois
export const fetchAllSpaData = createAsyncThunk(
  'services/fetchAllSpaData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Exécuter les 4 requêtes en parallèle
      const results = await Promise.allSettled([
        dispatch(fetchServices()).unwrap(),
        dispatch(fetchForfaits()).unwrap(),
        dispatch(fetchCertificats()).unwrap(),
        dispatch(fetchSpaCategories()).unwrap(),
      ])

      // Vérifier si toutes les requêtes ont réussi
      const errors = results
        .filter((result) => result.status === 'rejected')
        .map((result: any) => result.reason)

      if (errors.length > 0) {
        console.warn('Certaines requêtes ont échoué:', errors)
        // On ne rejette pas complètement, on continue avec les données disponibles
      }

      return { success: true }
    } catch (error: any) {
      const message = error.message || 'Erreur lors de la récupération des données spa'
      console.error('Erreur fetchAllSpaData:', error)
      return rejectWithValue(message)
    }
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    // Définir les services manuellement (pour les données locales)
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload
      state.filteredServices = action.payload
    },

    // Définir les forfaits manuellement
    setForfaits: (state, action: PayloadAction<Forfait[]>) => {
      state.forfaits = action.payload
    },

    // Définir les certificats manuellement
    setCertificats: (state, action: PayloadAction<CertificatCadeau[]>) => {
      state.certificats = action.payload
    },

    // Filtrer par catégorie
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
      applyFilters(state)
    },

    // Réinitialiser les filtres
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.filteredServices = state.services
    },
  },
  extraReducers: (builder) => {
    // fetchServices
    builder.addCase(fetchServices.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false
      state.services = action.payload
      applyFilters(state)
    })
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // fetchForfaits
    builder.addCase(fetchForfaits.fulfilled, (state, action) => {
      state.forfaits = action.payload
    })
    builder.addCase(fetchForfaits.rejected, (state, action) => {
      console.error('Erreur forfaits:', action.payload)
    })

    // fetchCertificats
    builder.addCase(fetchCertificats.fulfilled, (state, action) => {
      state.certificats = action.payload
    })
    builder.addCase(fetchCertificats.rejected, (state, action) => {
      // Erreur silencieuse - pas besoin de logger
    })

    // fetchSpaCategories
    builder.addCase(fetchSpaCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(fetchSpaCategories.rejected, (state, action) => {
      // Erreur silencieuse - pas besoin de logger
    })

    // fetchAllSpaData
    builder.addCase(fetchAllSpaData.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchAllSpaData.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(fetchAllSpaData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

// Fonction helper pour appliquer tous les filtres
function applyFilters(state: ServicesState) {
  let filtered = state.services

  // Filtrer par catégorie (utilise le slug: 'tous', 'massage', 'spa', 'soins')
  if (state.filters.category !== 'tous') {
    // Convertir le slug en format de catégorie (massage -> Massage, spa -> Spa, soins -> Soins)
    const categoryMapping: { [key: string]: string } = {
      'massage': 'Massage',
      'spa': 'Spa',
      'soins': 'Soins'
    }

    const categoryValue = categoryMapping[state.filters.category.toLowerCase()]
    if (categoryValue) {
      filtered = filtered.filter(service => service.categorie === categoryValue)
    }
  }

  state.filteredServices = filtered
}

export const {
  setServices,
  setForfaits,
  setCertificats,
  setCategory,
  resetFilters,
} = servicesSlice.actions

export default servicesSlice.reducer
