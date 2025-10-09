import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  isVIP: boolean
  loyaltyPoints: number
  hotel: {
    id: string
    name: string
  }
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Charger les données d'auth depuis le localStorage au démarrage
const loadAuthFromStorage = (): Partial<AuthState> => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (user && accessToken) {
      return {
        user: JSON.parse(user),
        accessToken,
        refreshToken: refreshToken || null,
        isAuthenticated: true,
      }
    }
  }
  return {}
}

// Async thunk pour enregistrer un invité
export const registerGuest = createAsyncThunk(
  'auth/registerGuest',
  async (
    data: {
      firstName: string
      lastName: string
      email: string
      phone: string
      address?: string
    },
    { rejectWithValue }
  ) => {
    try {
      const { registerGuest: registerGuestAPI } = await import('@/services/api/routeApi')
      const response = await registerGuestAPI(data)

      // Sauvegarder dans le localStorage
      if (response.data?.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        localStorage.setItem('accessToken', response.data.data.accessToken)
        if (response.data.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
        }
      }

      return response.data.data
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement'
      return rejectWithValue(message)
    }
  }
)

// Async thunk pour récupérer l'utilisateur actuel
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { getCurrentUser: getCurrentUserAPI } = await import('@/services/api/routeApi')
      const response = await getCurrentUserAPI()
      return response.data.data
    } catch (error: any) {
      const message = error.response?.data?.message || error.message
      return rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...loadAuthFromStorage(),
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null

      // Nettoyer le localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken?: string }>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken || null
      state.isAuthenticated = true
      state.error = null

      // Sauvegarder dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('accessToken', action.payload.accessToken)
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken)
        }
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Register Guest
    builder
      .addCase(registerGuest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerGuest.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
      })
      .addCase(registerGuest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        // Si l'utilisateur n'est pas authentifié, nettoyer le state
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      })
  },
})

export const { logout, loginSuccess, setUser, clearError } = authSlice.actions
export default authSlice.reducer
