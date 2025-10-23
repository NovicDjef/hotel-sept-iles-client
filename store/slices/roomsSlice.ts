import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Room, transformApiRoomToRoom } from '@/types/room'

// État initial
interface RoomsState {
  rooms: Room[]
  filteredRooms: Room[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    capacity: number
    available: boolean | null
  }
}

const initialState: RoomsState = {
  rooms: [],
  filteredRooms: [],
  loading: false,
  error: null,
  filters: {
    category: 'Toutes',
    minPrice: 0,
    maxPrice: 500,
    capacity: 1,
    available: null,
  }
}

// Thunk asynchrone pour récupérer les chambres depuis l'API avec Axios
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllChambres } = await import('@/services/api/routeApi')
      const response = await getAllChambres()
      console.log('Réponse API complète:', response.data)

      // L'API retourne { success, message, data, meta }
      // Extraire le tableau de chambres depuis data
      const apiRooms = (response.data as any).data || response.data
      console.log('Chambres API récupérées:', apiRooms)

      // Transform API data to UI format
      const transformedRooms = apiRooms.map(transformApiRoomToRoom)
      console.log('Chambres transformées:', transformedRooms)

      return transformedRooms
    } catch (error: any) {
      console.error('❌ Erreur fetchRooms:', error)

      // Détecter les erreurs réseau (serveur injoignable)
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue('MAINTENANCE')
      }

      const message = error.response?.data?.message || error.message || 'Erreur inconnue'
      return rejectWithValue(message)
    }
  }
)

// Thunk pour vérifier la disponibilité d'une chambre avec Axios
export const checkRoomAvailability = createAsyncThunk(
  'rooms/checkAvailability',
  async ({ roomId, checkIn, checkOut }: { roomId: number; checkIn: string; checkOut: string }, { rejectWithValue }) => {
    try {
      const { checkChambreAvailability } = await import('@/services/api/routeApi')
      const response = await checkChambreAvailability({
        chambreId: roomId,
        dateDebut: checkIn,
        dateFin: checkOut,
      })
      return { roomId, available: response.data.available }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur inconnue'
      return rejectWithValue(message)
    }
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Définir les chambres manuellement (pour les données locales)
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
      state.filteredRooms = action.payload
    },

    // Filtrer par catégorie
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
      applyFilters(state)
    },

    // Filtrer par prix
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.minPrice = action.payload.min
      state.filters.maxPrice = action.payload.max
      applyFilters(state)
    },

    // Filtrer par capacité
    setCapacity: (state, action: PayloadAction<number>) => {
      state.filters.capacity = action.payload
      applyFilters(state)
    },

    // Filtrer par disponibilité
    setAvailability: (state, action: PayloadAction<boolean | null>) => {
      state.filters.available = action.payload
      applyFilters(state)
    },

    // Réinitialiser les filtres
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.filteredRooms = state.rooms
    },

    // Mettre à jour la disponibilité d'une chambre
    updateRoomAvailability: (state, action: PayloadAction<{ roomId: string | number; available: boolean }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId.toString())
      if (room) {
        room.disponible = action.payload.available
      }
      applyFilters(state)
    },
  },
  extraReducers: (builder) => {
    // fetchRooms
    builder.addCase(fetchRooms.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.loading = false
      state.rooms = action.payload
      applyFilters(state)
    })
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // checkRoomAvailability
    builder.addCase(checkRoomAvailability.fulfilled, (state, action) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId.toString())
      if (room) {
        room.disponible = action.payload.available
      }
      applyFilters(state)
    })
  },
})

// Fonction helper pour appliquer tous les filtres
function applyFilters(state: RoomsState) {
  let filtered = state.rooms

  // Filtrer par catégorie
  if (state.filters.category !== 'Toutes') {
    filtered = filtered.filter(room => room.categorie === state.filters.category)
  }

  // Filtrer par prix
  filtered = filtered.filter(
    room => room.prix >= state.filters.minPrice && room.prix <= state.filters.maxPrice
  )

  // Filtrer par capacité
  filtered = filtered.filter(room => room.capacite >= state.filters.capacity)

  // Filtrer par disponibilité
  if (state.filters.available !== null) {
    filtered = filtered.filter(room => room.disponible === state.filters.available)
  }

  state.filteredRooms = filtered
}

export const {
  setRooms,
  setCategory,
  setPriceRange,
  setCapacity,
  setAvailability,
  resetFilters,
  updateRoomAvailability,
} = roomsSlice.actions

export default roomsSlice.reducer
