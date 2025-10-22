import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './slices/roomsSlice'
import authReducer from './slices/authSlice'
import servicesReducer from './slices/servicesSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    auth: authReducer,
    services: servicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
