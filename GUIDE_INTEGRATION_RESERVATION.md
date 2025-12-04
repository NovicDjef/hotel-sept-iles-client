# Guide d'intégration - Système de réservation en 3 étapes

## Vue d'ensemble

Le système de réservation a été implémenté en 3 étapes distinctes qui communiquent avec l'API backend :

### ÉTAPE 1 : Calcul du prix et vérification de disponibilité
- **Route API** : `POST /api/v1/reservations/calculate`
- **Fonction** : `calculateReservationPrice()`
- **But** : Vérifie que la chambre est disponible et calcule le prix total

### ÉTAPE 2 : Création compte client + réservation PENDING
- **Route API** : `POST /api/v1/reservations/guest`
- **Fonction** : `createGuestReservation()`
- **But** : Crée le compte client sans mot de passe et une réservation avec statut PENDING

### ÉTAPE 3 : Confirmation paiement Stripe
- **Route API** : `POST /api/v1/reservations/:id/confirm-payment`
- **Fonction** : `confirmReservationPayment()`
- **But** : Traite le paiement via Stripe et change le statut de la réservation à CONFIRMED

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_stripe
```

### 2. Obtenir la clé Stripe

1. Créez un compte sur [Stripe](https://stripe.com/)
2. Accédez au [Dashboard Stripe](https://dashboard.stripe.com/)
3. Allez dans **Développeurs > Clés API**
4. Copiez la **clé publique de test** (commence par `pk_test_`)
5. Ajoutez-la dans `.env.local`

## Architecture

### Composants créés

1. **`StripePaymentForm.tsx`** - Formulaire de paiement Stripe réutilisable
2. **`OTPLoginModal.tsx`** - Modal de connexion par code OTP
3. **`lib/stripe.ts`** - Configuration Stripe

### API Services (`services/api/routeApi.ts`)

```typescript
// ÉTAPE 1
calculateReservationPrice({ roomId, checkInDate, checkOutDate, numberOfGuests })

// ÉTAPE 2
createGuestReservation({
  roomId, checkInDate, checkOutDate, numberOfGuests,
  firstName, lastName, email, phone, address, specialRequests
})

// ÉTAPE 3
confirmReservationPayment(reservationId, { paymentMethodId })

// Bonus: OTP
requestGuestOTP({ email })
verifyGuestOTP({ email, otp })
```

### Redux Store (`store/slices/authSlice.ts`)

Nouvelles actions :
- `loginSuccess` - Connexion réussie avec tokens
- `registerGuest` - Enregistrement d'un invité (existant, amélioré)

## Flux de réservation

### Page de réservation (`app/(client)/reservation/[chambreId]/page.tsx`)

```typescript
// 1. Quitter l'écran de dates → Calcul du prix
if (currentStep === 0) {
  const response = await calculateReservationPrice(...)
  setCalculatedPrice(response.data.data)
}

// 2. Quitter l'écran d'infos client → Créer réservation PENDING
if (currentStep === 2) {
  const response = await createGuestReservation(...)
  setReservationId(response.data.data.reservation.id)
}

// 3. Sur l'écran de paiement → Confirmer avec Stripe
const handlePaymentSuccess = async (paymentMethodId: string) => {
  const response = await confirmReservationPayment(reservationId, { paymentMethodId })
  // Générer le reçu PDF
  generateReceiptPDF(...)
  // Rediriger vers la confirmation
  router.push(`/reservation/confirmation/${confirmedReservation.id}`)
}
```

## Utilisation du composant OTP

```tsx
import { OTPLoginModal } from '@/components/auth/OTPLoginModal'

function MyComponent() {
  const [showOTPModal, setShowOTPModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowOTPModal(true)}>
        Connexion rapide
      </button>

      <OTPLoginModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
      />
    </>
  )
}
```

## Cartes de test Stripe

Pour tester les paiements en mode test :

- **Succès** : `4242 4242 4242 4242`
- **Refusée** : `4000 0000 0000 0002`
- **Authentification requise** : `4000 0025 0000 3155`

**Date d'expiration** : N'importe quelle date future (ex: 12/25)
**CVC** : N'importe quel 3 chiffres (ex: 123)

## Sécurité

### Tokens JWT
- Les tokens sont stockés dans `localStorage`
- Ils sont automatiquement ajoutés aux requêtes via l'intercepteur Axios
- Ils sont chargés au démarrage de l'app depuis le store Redux

### Paiement Stripe
- Stripe Elements gère la sécurité des données de carte
- Les informations de carte ne transitent jamais par notre serveur
- Le serveur reçoit uniquement un `paymentMethodId` de Stripe

## Dépannage

### Erreur : "Stripe publishable key not defined"
→ Vérifiez que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` est défini dans `.env.local`

### Erreur : "CORS policy"
→ Vérifiez que le backend autorise les requêtes depuis `http://localhost:3001`

### Le paiement échoue
→ Vérifiez que vous utilisez une carte de test Stripe
→ Vérifiez les logs du serveur backend

### L'OTP n'arrive pas
→ Vérifiez la configuration email du backend
→ Vérifiez les logs du serveur pour voir si l'email est envoyé

## Prochaines étapes recommandées

1. **Page de confirmation** : Créer `/app/(client)/reservation/confirmation/[id]/page.tsx`
2. **Historique des réservations** : Afficher les réservations dans le compte client
3. **Annulation** : Permettre d'annuler une réservation
4. **Webhooks Stripe** : Gérer les événements Stripe (paiement échoué, remboursement, etc.)
5. **Notifications email** : Envoyer des emails de confirmation automatiques

## Support

Pour toute question ou problème :
1. Vérifiez les logs de la console navigateur
2. Vérifiez les logs du serveur backend
3. Consultez la documentation Stripe : https://stripe.com/docs
