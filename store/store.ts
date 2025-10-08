import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './slices/roomsSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
