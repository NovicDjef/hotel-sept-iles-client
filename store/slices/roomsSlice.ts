import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Room, transformRoomTypeToRoom } from '@/types/room'
import { apiCache } from '@/lib/apiCache'

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
    checkIn: string
    checkOut: string
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
    maxPrice: 10000, // Augmenté pour inclure toutes les chambres par défaut
    capacity: 1,
    available: null,
    checkIn: '',
    checkOut: '',
  }
}

// Thunk asynchrone pour récupérer les types de chambres (inventaire) depuis l'API
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const { getAllRoomTypes } = await import('@/services/api/routeApi')

      // Utiliser le cache pour éviter les requêtes répétées (TTL: 3 minutes)
      const response = await apiCache.get('room-types', () => getAllRoomTypes(), 3 * 60 * 1000)
      console.log('✅ Réponse API room-types:', response.data)

      // L'API retourne { success, message, data: { hotel, roomTypes } }
      const apiData = (response.data as any).data
      const roomTypes = apiData.roomTypes || apiData || []
      console.log('📦 Types de chambres (inventaire):', roomTypes)

      // Debug: afficher le premier élément pour vérifier la structure
      if (roomTypes.length > 0) {
        console.log('🔍 Structure du premier roomType:', roomTypes[0])
        console.log('🔍 Clés disponibles:', Object.keys(roomTypes[0]))
      }

      // Vérifier que roomTypes est bien un tableau
      if (!Array.isArray(roomTypes)) {
        console.error('❌ roomTypes n\'est pas un tableau:', roomTypes)
        throw new Error('Format de données invalide: roomTypes doit être un tableau')
      }

      // Transform RoomTypeInventory data to UI format
      const transformedRooms = roomTypes.map((rt: any, index: number) => {
        console.log(`🔄 Transformation roomType ${index + 1}:`, rt)
        try {
          const transformed = transformRoomTypeToRoom(rt)
          console.log(`✅ Transformé ${index + 1}:`, transformed)
          return transformed
        } catch (err) {
          console.error(`❌ Erreur transformation ${index + 1}:`, err, rt)
          return null
        }
      }).filter((room): room is Room => room !== null) // Enlever les null avec type guard

      console.log('✅ Chambres transformées (total):', transformedRooms.length, transformedRooms)

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

    // Définir les dates de réservation
    setDates: (state, action: PayloadAction<{ checkIn: string; checkOut: string }>) => {
      state.filters.checkIn = action.payload.checkIn
      state.filters.checkOut = action.payload.checkOut
      // Ne pas appliquer les filtres ici car les dates sont juste pour l'API de disponibilité
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
  console.log('🔧 Début applyFilters - Total chambres:', state.rooms.length)
  console.log('🔧 Filtres actifs:', state.filters)

  let filtered = state.rooms

  // Filtrer par catégorie
  if (state.filters.category !== 'Toutes') {
    const beforeCount = filtered.length
    filtered = filtered.filter(room => room.categorie === state.filters.category)
    console.log(`📁 Filtre catégorie "${state.filters.category}": ${beforeCount} -> ${filtered.length}`)
  }

  // Filtrer par prix
  const beforePriceCount = filtered.length
  const filteredByPrice = filtered.filter(
    room => room.prix >= state.filters.minPrice && room.prix <= state.filters.maxPrice
  )
  if (filteredByPrice.length < filtered.length) {
    const excluded = filtered.filter(room => room.prix < state.filters.minPrice || room.prix > state.filters.maxPrice)
    console.log(`💰 Filtre prix (${state.filters.minPrice}$ - ${state.filters.maxPrice}$): ${beforePriceCount} -> ${filteredByPrice.length}`)
    console.log('❌ Chambres exclues par prix:', excluded.map(r => ({ nom: r.nom, prix: r.prix })))
  }
  filtered = filteredByPrice

  // Filtrer par capacité
  const beforeCapacityCount = filtered.length
  filtered = filtered.filter(room => room.capacite >= state.filters.capacity)
  if (filtered.length < beforeCapacityCount) {
    console.log(`👥 Filtre capacité (>= ${state.filters.capacity}): ${beforeCapacityCount} -> ${filtered.length}`)
  }

  // Filtrer par disponibilité
  if (state.filters.available !== null) {
    const beforeAvailCount = filtered.length
    filtered = filtered.filter(room => room.disponible === state.filters.available)
    if (filtered.length < beforeAvailCount) {
      console.log(`✅ Filtre disponibilité (${state.filters.available}): ${beforeAvailCount} -> ${filtered.length}`)
    }
  }

  console.log('✅ Fin applyFilters - Chambres filtrées:', filtered.length)
  state.filteredRooms = filtered
}

export const {
  setRooms,
  setCategory,
  setPriceRange,
  setCapacity,
  setAvailability,
  setDates,
  resetFilters,
  updateRoomAvailability,
} = roomsSlice.actions

export default roomsSlice.reducer
