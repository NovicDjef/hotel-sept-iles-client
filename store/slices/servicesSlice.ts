import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  Service,
  Forfait,
  CertificatCadeau,
  transformApiServiceToService,
  transformApiForfaitToForfait,
  transformApiCertificatToCertificat
} from '@/types/service'

// État initial
interface ServicesState {
  services: Service[]
  forfaits: Forfait[]
  certificats: CertificatCadeau[]
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
  filteredServices: [],
  loading: false,
  error: null,
  filters: {
    category: 'Tous',
  }
}

// Thunk asynchrone pour récupérer les services depuis l'API
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllServices } = await import('@/services/api/routeApi')
      const response = await getAllServices()
      console.log('Réponse API services:', response.data)

      // L'API retourne { success, message, data }
      const apiServices = response.data.data || response.data
      console.log('Services API récupérés:', apiServices)

      // Transform API data to UI format
      const transformedServices = apiServices.map(transformApiServiceToService)
      console.log('Services transformés:', transformedServices)

      return transformedServices
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des services'
      console.error('Erreur fetchServices:', error)
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
      const response = await getAllForfaits()
      console.log('Réponse API forfaits:', response.data)

      const apiForfaits = response.data.data || response.data
      console.log('Forfaits API récupérés:', apiForfaits)

      const transformedForfaits = apiForfaits.map(transformApiForfaitToForfait)
      console.log('Forfaits transformés:', transformedForfaits)

      return transformedForfaits
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des forfaits'
      console.error('Erreur fetchForfaits:', error)
      return rejectWithValue(message)
    }
  }
)

// Thunk asynchrone pour récupérer les certificats cadeaux depuis l'API
export const fetchCertificats = createAsyncThunk(
  'services/fetchCertificats',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllCertificats } = await import('@/services/api/routeApi')
      const response = await getAllCertificats()
      console.log('Réponse API certificats:', response.data)

      const apiCertificats = response.data.data || response.data
      console.log('Certificats API récupérés:', apiCertificats)

      const transformedCertificats = apiCertificats.map(transformApiCertificatToCertificat)
      console.log('Certificats transformés:', transformedCertificats)

      return transformedCertificats
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des certificats'
      console.error('Erreur fetchCertificats:', error)
      return rejectWithValue(message)
    }
  }
)

// Thunk pour récupérer toutes les données spa en une fois
export const fetchAllSpaData = createAsyncThunk(
  'services/fetchAllSpaData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Exécuter les 3 requêtes en parallèle
      const results = await Promise.allSettled([
        dispatch(fetchServices()).unwrap(),
        dispatch(fetchForfaits()).unwrap(),
        dispatch(fetchCertificats()).unwrap(),
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
      console.error('Erreur certificats:', action.payload)
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

  // Filtrer par catégorie
  if (state.filters.category !== 'Tous') {
    filtered = filtered.filter(service => service.categorie === state.filters.category)
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
