# Système de Disponibilité des Chambres avec Numérotation

## 🎯 Vue d'Ensemble

Ce système gère la disponibilité des chambres en temps réel avec :
- ✅ Numérotation chronologique des chambres (101, 102, 228, 229, etc.)
- ✅ Décompte en temps réel par type de chambre
- ✅ Blocage automatique des réservations quand complet
- ✅ Vérification avant chaque réservation
- ✅ Assignation automatique d'un numéro de chambre

---

## 📦 Fichiers Créés

### Types et API

| Fichier | Description |
|---------|-------------|
| `types/availability.ts` | Types pour disponibilité avancée |
| `services/api/availabilityApi.ts` | Service API complet (ancien format) |
| `services/api/roomAvailabilityApi.ts` | **Service API adapté au backend réel** ⭐ |

### Hooks

| Fichier | Description |
|---------|-------------|
| `hooks/useAvailability.ts` | Hook générique (ancien format) |
| `hooks/useRoomAvailability.ts` | **Hook adapté au backend réel** ⭐ |

### Composants

| Fichier | Description |
|---------|-------------|
| `components/reservation/AvailabilityDisplay.tsx` | Affichage de la disponibilité par type |
| `components/reservation/EnhancedReservationForm.tsx` | Formulaire complet avec 3 étapes |
| `components/reservation/index.ts` | Exports |

---

## 🔌 Routes API Backend Utilisées

### 1. Vérifier la Disponibilité

**Endpoint:** `GET /api/v1/rooms/availability/by-date`

**Paramètres:**
```typescript
{
  hotelId: string
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string // YYYY-MM-DD
}
```

**Réponse:**
```typescript
{
  success: boolean
  data: {
    hotelId: string
    checkInDate: string
    checkOutDate: string
    totalRooms: number
    availableRooms: number
    reservedRooms: number
    occupancyRate: number
    byRoomType: [
      {
        roomType: "DOUBLE"
        total: 10
        available: 3
        reserved: 7
        percentage: 70
      },
      // ... autres types
    ]
  }
}
```

### 2. Créer une Réservation

**Endpoint:** `POST /api/v1/reservations/guest`

**Body:**
```typescript
{
  hotelId: string
  roomType: string // SIMPLE, DOUBLE, SUITE, STUDIO
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string // YYYY-MM-DD
  numberOfGuests: number
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  specialRequests?: string
}
```

**Réponse en cas de succès:**
```typescript
{
  success: true
  data: {
    id: string
    reservationNumber: string
    roomId: string
    roomNumber: string  // Ex: "101", "228"
    roomType: string
    checkInDate: string
    checkOutDate: string
    totalPrice: number
    status: string
    guest: {...}
  }
}
```

**Erreur si aucune chambre disponible:**
```typescript
{
  success: false
  error: {
    code: "ROOM_TYPE_NOT_AVAILABLE"
    message: "Aucune chambre disponible pour ce type"
  }
}
```

---

## 🚀 Utilisation

### 1. Hook `useRoomAvailability`

```tsx
import { useRoomAvailability } from '@/hooks/useRoomAvailability'

function MyComponent() {
  const {
    roomTypes,
    loading,
    error,
    isFullyBooked,
    totalAvailableRooms,
    totalRooms,
    occupancyRate,
    hasAvailableRooms,
    getTypeAvailability
  } = useRoomAvailability('2025-12-20', '2025-12-25')

  // Vérifier si un type est disponible
  if (hasAvailableRooms('DOUBLE')) {
    console.log('Des chambres doubles sont disponibles!')
  }

  // Obtenir les détails d'un type
  const doubleAvailability = getTypeAvailability('DOUBLE')
  console.log(`${doubleAvailability.available}/${doubleAvailability.total}`)

  return (
    <div>
      {roomTypes.map(type => (
        <div key={type.roomType}>
          {type.roomType}: {type.available}/{type.total} disponibles
          {type.available === 0 && <span>COMPLET</span>}
        </div>
      ))}
    </div>
  )
}
```

### 2. Hook `useCreateReservation`

```tsx
import { useCreateReservation } from '@/hooks/useRoomAvailability'

function BookingForm() {
  const { createReservation, reservation, loading, error } = useCreateReservation()

  const handleBook = async () => {
    try {
      const result = await createReservation(
        'DOUBLE',                    // Type de chambre
        '2025-12-20',                // Check-in
        '2025-12-25',                // Check-out
        2,                           // Nombre de guests
        {
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean@example.com',
          phone: '+15145551234'
        },
        'Vue sur mer si possible'    // Demandes spéciales (optionnel)
      )

      console.log('Chambre assignée:', result.roomNumber)
      console.log('Prix total:', result.totalPrice)

    } catch (err) {
      if (err.message === 'Aucune chambre disponible pour ces dates') {
        alert('Désolé, ce type de chambre est complet')
      }
    }
  }

  return (
    <button onClick={handleBook} disabled={loading}>
      {loading ? 'Réservation...' : 'Réserver'}
    </button>
  )
}
```

### 3. Composant `AvailabilityDisplay`

```tsx
import { AvailabilityDisplay } from '@/components/reservation'

function RoomSelection() {
  const [selectedType, setSelectedType] = useState('')

  return (
    <AvailabilityDisplay
      checkInDate="2025-12-20"
      checkOutDate="2025-12-25"
      onRoomTypeSelect={(type) => setSelectedType(type)}
      selectedRoomType={selectedType}
    />
  )
}
```

Affiche :
- Résumé global (X/Y chambres disponibles)
- Taux d'occupation de l'hôtel
- Carte pour chaque type de chambre avec :
  - Nombre disponible / total
  - Barre de progression
  - Badge "COMPLET" si aucune dispo
  - Alerte "Dernières chambres" si critique
  - Sélection par clic

### 4. Formulaire Complet `EnhancedReservationForm`

```tsx
import { EnhancedReservationForm } from '@/components/reservation'

function ReservationPage() {
  return <EnhancedReservationForm />
}
```

Fonctionnalités :
- ✅ 3 étapes (Dates → Chambre → Informations)
- ✅ Vérification automatique de disponibilité
- ✅ Affichage visuel des chambres disponibles
- ✅ Blocage si aucune chambre dispo
- ✅ Validation des champs
- ✅ Confirmation avec numéro de chambre assignée
- ✅ Gestion des erreurs

---

## 🎨 Fonctionnalités Visuelles

### Affichage de Disponibilité

**Résumé global :**
```
┌─────────────────────────────────────┐
│ Disponibilité de l'hôtel            │
│ 2025-12-20 - 2025-12-25             │
│                                      │
│ 45/100 chambres disponibles          │
│                                      │
│ ████████████░░░░░░░░ 55%            │
│ Occupation: 55% | Disponible: 45%   │
└─────────────────────────────────────┘
```

**Par type de chambre :**
```
┌──────────────────────────┐  ┌──────────────────────────┐
│ Chambre Double       ✓   │  │ Suite                ✗   │
│ Disponible               │  │ Complet                  │
│                          │  │                          │
│      8 sur 10            │  │      0 sur 5             │
│                          │  │                          │
│ ████████░░ 80%           │  │ ██████████ 100%          │
│                          │  │                          │
│ 👥 2 réservées | 80%     │  │ 👥 5 réservées | 100%    │
└──────────────────────────┘  └──────────────────────────┘
```

**Alerte dernières chambres :**
```
┌──────────────────────────┐
│ Studio               ✓   │
│ Disponible               │
│                          │
│      2 sur 12            │
│                          │
│ ⚠️ Plus que 2 chambres ! │
└──────────────────────────┘
```

### Confirmation de Réservation

```
┌────────────────────────────────────┐
│         ✓                          │
│   Réservation Confirmée !          │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ N° réservation: RSV-2025-001   │ │
│ │ Chambre assignée: N° 228       │ │
│ │ Type: Studio                   │ │
│ │ Montant: 599.99$               │ │
│ │ Arrivée: 2025-12-20            │ │
│ │ Départ: 2025-12-25             │ │
│ └────────────────────────────────┘ │
│                                    │
│ Email envoyé à: jean@example.com   │
└────────────────────────────────────┘
```

---

## 🔒 Sécurité et Validation

### Vérifications Automatiques

1. **Avant l'affichage :**
   - Vérification de la disponibilité en temps réel
   - Mise à jour dynamique si changement

2. **Avant la réservation :**
   - Validation des dates
   - Validation du nombre de guests
   - Validation des informations client
   - **Vérification finale de disponibilité**

3. **Lors de la création :**
   - Le backend vérifie une dernière fois
   - Erreur `ROOM_TYPE_NOT_AVAILABLE` si complet
   - **Assignation automatique d'un numéro de chambre**

### Gestion des Erreurs

```tsx
try {
  await createReservation(...)
} catch (error) {
  if (error.message === 'Aucune chambre disponible pour ces dates') {
    // Afficher message "Complet"
  }
  // Autres erreurs...
}
```

---

## 📊 Cas d'Usage

### 1. Weekend Complet

```
Scénario: Toutes les chambres sont réservées
Résultat:
- isFullyBooked = true
- Affichage message "Hôtel Complet"
- Bouton de réservation désactivé
- Suggestion d'autres dates
```

### 2. Dernières Chambres Disponibles

```
Scénario: Plus que 2 chambres doubles disponibles
Résultat:
- Affichage "⚠️ Plus que 2 chambres disponibles!"
- Badge orange
- Urgence visuelle pour encourager la réservation
```

### 3. Type Complet, Autres Disponibles

```
Scénario: Suites complètes, mais chambres doubles OK
Résultat:
- Suite : Badge "COMPLET", désactivée
- Double : Sélectionnable
- Client peut choisir un autre type
```

### 4. Réservation Réussie

```
Scénario: Client réserve une chambre double
Résultat:
- Chambre assignée : N° 105
- Numéro de réservation généré
- Email de confirmation envoyé
- Affichage récapitulatif
```

---

## 🎯 Avantages du Système

### Pour le Client

✅ **Transparence totale**
- Voir exactement combien de chambres restent
- Savoir immédiatement si complet

✅ **Pas de fausses promesses**
- Impossible de réserver si complet
- Vérification en temps réel

✅ **Numéro de chambre assigné**
- Sait exactement quelle chambre il aura
- Numérotation chronologique claire

✅ **Process fluide**
- 3 étapes simples
- Validation à chaque étape
- Retour en arrière possible

### Pour l'Hôtel

✅ **Aucune surréservation**
- Vérification automatique
- Blocage si complet

✅ **Gestion du stock en temps réel**
- Décompte automatique
- Synchronisation avec le backend

✅ **Numérotation ordonnée**
- Chambres 101-200 par exemple
- Facile à gérer pour le staff

✅ **Statistiques précises**
- Taux d'occupation
- Disponibilité par type
- Tendances de réservation

---

## 🔧 Configuration

### Variables Requises

```typescript
// services/api/Api.ts
export const hotelId = 'cmiajn0ck0000r37cliherz4z'
```

### Routes Backend Requises

1. `GET /api/v1/rooms/availability/by-date`
2. `POST /api/v1/reservations/guest`

### Format de Dates

- Toujours `YYYY-MM-DD`
- Validation côté client et serveur

---

## 📝 Exemple Complet

```tsx
import { EnhancedReservationForm } from '@/components/reservation'

// Page de réservation
export default function ReservationPage() {
  return (
    <div className="container mx-auto py-8">
      <EnhancedReservationForm />
    </div>
  )
}
```

C'est tout ! Le composant gère :
- Sélection des dates
- Vérification de disponibilité
- Affichage des chambres disponibles
- Formulaire client
- Création de réservation
- Confirmation avec numéro de chambre

---

## ✅ Checklist d'Intégration

- [x] Types TypeScript créés
- [x] Service API backend adapté
- [x] Hooks personnalisés créés
- [x] Composant d'affichage créé
- [x] Formulaire complet créé
- [x] Documentation complète
- [ ] Tester avec backend réel
- [ ] Intégrer dans les pages de réservation
- [ ] Tests avec différents scénarios
- [ ] Optimiser les performances

---

**Le système est prêt à l'emploi !** 🎉

Les clients peuvent maintenant :
- Voir la disponibilité en temps réel
- Réserver uniquement si des chambres sont disponibles
- Recevoir un numéro de chambre assigné automatiquement

Le backend gère :
- La numérotation chronologique (101, 102, etc.)
- Le décompte automatique
- Le blocage des surréservations
