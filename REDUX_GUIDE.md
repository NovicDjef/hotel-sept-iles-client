# Guide Redux - Gestion des Chambres

## 📁 Structure Redux

```
store/
├── store.ts              # Configuration du store Redux
├── hooks.ts              # Hooks typés (useAppDispatch, useAppSelector)
├── ReduxProvider.tsx     # Provider Redux pour l'application
└── slices/
    └── roomsSlice.ts     # Slice pour la gestion des chambres
```

## 🚀 Utilisation dans les composants

### 1. Importer les hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms, setCategory, setCapacity } from '@/store/slices/roomsSlice'
```

### 2. Utiliser le state Redux

```typescript
function MonComposant() {
  const dispatch = useAppDispatch()
  const { filteredRooms, loading, error, filters } = useAppSelector((state) => state.rooms)

  // Charger les chambres depuis l'API
  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  // Filtrer par catégorie
  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category))
  }

  return (
    // Votre JSX
  )
}
```

## 📡 Actions disponibles

### Actions synchrones

```typescript
// Définir les chambres manuellement
dispatch(setRooms(chambresArray))

// Filtrer par catégorie
dispatch(setCategory('Premium'))

// Filtrer par prix
dispatch(setPriceRange({ min: 100, max: 300 }))

// Filtrer par capacité
dispatch(setCapacity(2))

// Filtrer par disponibilité
dispatch(setAvailability(true))

// Réinitialiser tous les filtres
dispatch(resetFilters())

// Mettre à jour la disponibilité d'une chambre
dispatch(updateRoomAvailability({ roomId: 1, available: false }))
```

### Actions asynchrones (API)

```typescript
// Récupérer toutes les chambres depuis l'API
dispatch(fetchRooms())

// Vérifier la disponibilité d'une chambre
dispatch(checkRoomAvailability({
  roomId: 1,
  checkIn: '2025-01-15',
  checkOut: '2025-01-20'
}))
```

## 🎯 État Redux

```typescript
{
  rooms: Room[],              // Toutes les chambres
  filteredRooms: Room[],      // Chambres filtrées
  loading: boolean,           // État de chargement
  error: string | null,       // Erreur éventuelle
  filters: {
    category: string,         // 'Toutes', 'Premium', etc.
    minPrice: number,
    maxPrice: number,
    capacity: number,
    available: boolean | null
  }
}
```

## 🔌 API Routes

### GET /api/chambres
Récupère toutes les chambres

```typescript
const response = await fetch('/api/chambres')
const rooms = await response.json()
```

### POST /api/chambres/availability
Vérifie la disponibilité d'une chambre

```typescript
const response = await fetch('/api/chambres/availability', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    roomId: 1,
    checkIn: '2025-01-15',
    checkOut: '2025-01-20'
  })
})
const { available } = await response.json()
```

## 📝 Exemple complet

Voir le composant `components/chambres/RoomsListRedux.tsx` pour un exemple complet d'utilisation.

## 🔄 Migration vers une vraie API

Pour connecter à une vraie API backend:

1. Modifiez `store/slices/roomsSlice.ts`:
   ```typescript
   const response = await fetch('https://votre-api.com/chambres')
   ```

2. Modifiez `app/api/chambres/route.ts` pour faire un proxy vers votre API

3. Ajoutez les variables d'environnement dans `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://votre-api.com
   ```

## ⚡ Avantages de cette architecture

- ✅ **État centralisé**: Une seule source de vérité
- ✅ **Filtrage côté client**: Performances optimales
- ✅ **TypeScript**: Type-safety complet
- ✅ **Async handling**: Gestion automatique du loading/error
- ✅ **Réutilisable**: Utilisez les mêmes données partout
- ✅ **Testable**: Facilite les tests unitaires
