# Guide d'Intégration des Paramètres Admin

Ce guide explique comment utiliser les paramètres admin dans votre application React/Next.js.

## 📦 Fichiers Créés

- `types/settings.ts` - Types TypeScript pour tous les paramètres
- `services/api/settingsApi.ts` - Service API pour récupérer/modifier les paramètres
- `contexts/SettingsContext.tsx` - Context React et hooks pour accéder aux paramètres
- `app/providers.tsx` - SettingsProvider intégré

## 🚀 Utilisation de Base

### 1. Accéder aux Paramètres Complets

```tsx
'use client'

import { useSettings } from '@/contexts/SettingsContext'

export default function MyComponent() {
  const { settings, loading, error, refreshSettings } = useSettings()

  if (loading) return <div>Chargement des paramètres...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div>
      <h1>{settings.appearance.siteName}</h1>
      <p>{settings.appearance.siteDescription}</p>
    </div>
  )
}
```

### 2. Accéder à une Section Spécifique

```tsx
import { useReservationPolicy } from '@/contexts/SettingsContext'

export default function ReservationInfo() {
  const policy = useReservationPolicy()

  return (
    <div>
      <p>Séjour minimum: {policy.minimumStay} nuits</p>
      <p>Check-in: {policy.checkInTime}</p>
      <p>Check-out: {policy.checkOutTime}</p>
      <p>Acompte requis: {policy.depositPercentage}%</p>
    </div>
  )
}
```

## 📋 Hooks Disponibles

### Hooks par Section

```tsx
import {
  useReservationPolicy,   // Politiques de réservation
  usePaymentSettings,      // Configuration paiement
  useNotificationSettings, // Emails & SMS
  useSecuritySettings,     // Sécurité
  useAppearanceSettings,   // Apparence
  useIntegrationsSettings, // Intégrations API
} from '@/contexts/SettingsContext'
```

## 💡 Exemples d'Intégration

### 1. Politique de Réservation

**Fichier: `components/reservation/ReservationForm.tsx`**

```tsx
'use client'

import { useReservationPolicy } from '@/contexts/SettingsContext'

export const ReservationForm = () => {
  const policy = useReservationPolicy()

  const validateDates = (checkIn: Date, checkOut: Date) => {
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    if (nights < policy.minimumStay) {
      return `Séjour minimum de ${policy.minimumStay} nuits requis`
    }

    if (nights > policy.maximumStay) {
      return `Séjour maximum de ${policy.maximumStay} nuits`
    }

    return null
  }

  return (
    <div>
      <h2>Réservation</h2>
      <p>Check-in: {policy.checkInTime}</p>
      <p>Check-out: {policy.checkOutTime}</p>
      <p>Séjour minimum: {policy.minimumStay} nuits</p>

      {policy.allowPartialPayment && (
        <p>Acompte de {policy.depositPercentage}% requis</p>
      )}

      <p>
        Annulation gratuite jusqu'à {policy.cancellationDeadlineHours}h avant l'arrivée
      </p>
    </div>
  )
}
```

### 2. Configuration de Paiement

**Fichier: `components/payment/CheckoutForm.tsx`**

```tsx
'use client'

import { usePaymentSettings } from '@/contexts/SettingsContext'
import { loadStripe } from '@stripe/stripe-js'

export const CheckoutForm = ({ total }: { total: number }) => {
  const paymentSettings = usePaymentSettings()

  // Initialiser Stripe avec la clé publique des paramètres
  const stripePromise = loadStripe(paymentSettings.stripePublicKey)

  // Calculer le total avec taxes et frais
  const calculateTotal = (baseAmount: number) => {
    const taxAmount = baseAmount * (paymentSettings.taxRate / 100)
    const serviceFee = baseAmount * (paymentSettings.serviceFeePercentage / 100)
    return baseAmount + taxAmount + serviceFee
  }

  // Calculer l'acompte
  const calculateDeposit = (total: number) => {
    if (!paymentSettings.requireDepositForReservation) return 0

    if (paymentSettings.depositType === 'percentage') {
      return total * (paymentSettings.depositAmount / 100)
    }
    return paymentSettings.depositAmount
  }

  const finalTotal = calculateTotal(total)
  const depositAmount = calculateDeposit(finalTotal)

  return (
    <div>
      <h3>Récapitulatif</h3>
      <p>Sous-total: {total.toFixed(2)} {paymentSettings.acceptedCurrencies[0]}</p>
      <p>Taxes ({paymentSettings.taxRate}%): {(total * paymentSettings.taxRate / 100).toFixed(2)}</p>

      {paymentSettings.serviceFeePercentage > 0 && (
        <p>Frais de service ({paymentSettings.serviceFeePercentage}%):
          {(total * paymentSettings.serviceFeePercentage / 100).toFixed(2)}
        </p>
      )}

      <p><strong>Total: {finalTotal.toFixed(2)} {paymentSettings.acceptedCurrencies[0]}</strong></p>

      {paymentSettings.requireDepositForReservation && (
        <p>Acompte requis: {depositAmount.toFixed(2)} {paymentSettings.acceptedCurrencies[0]}</p>
      )}

      {/* Afficher les méthodes de paiement acceptées */}
      <div>
        <h4>Moyens de paiement acceptés:</h4>
        <ul>
          {paymentSettings.acceptedPaymentMethods.map(method => (
            <li key={method}>{method}</li>
          ))}
          {paymentSettings.allowCashPayment && <li>Espèces</li>}
          {paymentSettings.allowBankTransfer && <li>Virement bancaire</li>}
        </ul>
      </div>
    </div>
  )
}
```

### 3. Personnalisation de l'Apparence

**Fichier: `components/layout/Header.tsx`**

```tsx
'use client'

import { useAppearanceSettings } from '@/contexts/SettingsContext'
import Image from 'next/image'

export const Header = () => {
  const appearance = useAppearanceSettings()

  return (
    <header style={{ backgroundColor: appearance.primaryColor }}>
      <div className="container">
        {appearance.logoUrl && (
          <Image
            src={appearance.logoUrl}
            alt={appearance.siteName}
            width={150}
            height={50}
          />
        )}
        <h1>{appearance.siteName}</h1>
        <p>{appearance.siteDescription}</p>

        {appearance.showSocialLinks && (
          <div className="social-links">
            {appearance.facebookUrl && (
              <a href={appearance.facebookUrl} target="_blank" rel="noopener">Facebook</a>
            )}
            {appearance.instagramUrl && (
              <a href={appearance.instagramUrl} target="_blank" rel="noopener">Instagram</a>
            )}
            {appearance.twitterUrl && (
              <a href={appearance.twitterUrl} target="_blank" rel="noopener">Twitter</a>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
```

### 4. Format de Devise et Date

**Fichier: `utils/formatting.ts`**

```tsx
import { useAppearanceSettings } from '@/contexts/SettingsContext'

export const useFormatCurrency = () => {
  const appearance = useAppearanceSettings()

  const formatCurrency = (amount: number): string => {
    const formatted = amount.toFixed(2)

    if (appearance.currencyPosition === 'before') {
      return `${appearance.currencySymbol}${formatted}`
    }
    return `${formatted}${appearance.currencySymbol}`
  }

  return formatCurrency
}

// Utilisation dans un composant
export const PriceDisplay = ({ amount }: { amount: number }) => {
  const formatCurrency = useFormatCurrency()

  return <span>{formatCurrency(amount)}</span>
}
```

### 5. Intégrations Google Analytics

**Fichier: `components/analytics/GoogleAnalytics.tsx`**

```tsx
'use client'

import { useIntegrationsSettings } from '@/contexts/SettingsContext'
import Script from 'next/script'

export const GoogleAnalytics = () => {
  const integrations = useIntegrationsSettings()

  if (!integrations.googleAnalyticsId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${integrations.googleAnalyticsId}');
        `}
      </Script>
    </>
  )
}
```

### 6. Sécurité et Validation de Mot de Passe

**Fichier: `utils/passwordValidation.ts`**

```tsx
import { useSecuritySettings } from '@/contexts/SettingsContext'

export const usePasswordValidation = () => {
  const security = useSecuritySettings()

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []

    if (password.length < security.passwordMinLength) {
      errors.push(`Le mot de passe doit contenir au moins ${security.passwordMinLength} caractères`)
    }

    if (security.passwordRequireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule')
    }

    if (security.passwordRequireNumbers && !/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre')
    }

    if (security.passwordRequireSpecialChars && !/[!@#$%^&*]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial')
    }

    return errors
  }

  return validatePassword
}
```

### 7. Rafraîchir les Paramètres

```tsx
'use client'

import { useSettings } from '@/contexts/SettingsContext'

export const AdminSettingsPanel = () => {
  const { settings, refreshSettings, loading } = useSettings()

  const handleSaveSettings = async () => {
    // Sauvegarder les paramètres via l'API
    // ...

    // Rafraîchir les paramètres après la sauvegarde
    await refreshSettings()
  }

  return (
    <div>
      <button onClick={handleSaveSettings} disabled={loading}>
        {loading ? 'Chargement...' : 'Sauvegarder'}
      </button>
      <button onClick={refreshSettings}>
        Rafraîchir les paramètres
      </button>
    </div>
  )
}
```

## 🔧 Modification des Paramètres (Admin)

### Mettre à jour tous les paramètres

```tsx
import { settingsApi } from '@/services/api/settingsApi'

const updateAllSettings = async () => {
  try {
    const response = await settingsApi.updateSettings({
      reservationPolicy: {
        minimumStay: 2,
        checkInTime: '14:00',
      },
      payment: {
        taxRate: 15,
      }
    })

    console.log('Paramètres mis à jour:', response)
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

### Mettre à jour une section spécifique

```tsx
import { settingsApi } from '@/services/api/settingsApi'

// Mettre à jour seulement les politiques de réservation
const updateReservationPolicy = async () => {
  await settingsApi.updateReservationPolicy({
    minimumStay: 3,
    cancellationDeadlineHours: 48,
  })
}

// Mettre à jour seulement les paramètres de paiement
const updatePayment = async () => {
  await settingsApi.updatePaymentSettings({
    taxRate: 15.5,
    serviceFeePercentage: 5,
  })
}

// Mettre à jour l'apparence
const updateAppearance = async () => {
  await settingsApi.updateAppearanceSettings({
    siteName: 'Nouveau Nom',
    primaryColor: '#FF0000',
  })
}
```

## ⚡ Optimisations

### 1. Éviter les Re-renders Inutiles

```tsx
import { useMemo } from 'react'
import { usePaymentSettings } from '@/contexts/SettingsContext'

export const PriceCalculator = ({ basePrice }: { basePrice: number }) => {
  const paymentSettings = usePaymentSettings()

  const finalPrice = useMemo(() => {
    const tax = basePrice * (paymentSettings.taxRate / 100)
    return basePrice + tax
  }, [basePrice, paymentSettings.taxRate])

  return <div>Prix final: {finalPrice}</div>
}
```

### 2. Valeurs par Défaut

Les paramètres par défaut sont définis dans `SettingsContext.tsx`. Si l'API échoue, ces valeurs seront utilisées automatiquement.

## 📝 Routes API Disponibles

```
GET    /api/v1/settings                    - Tous les paramètres
PUT    /api/v1/settings                    - Mettre à jour tous
POST   /api/v1/settings/reset              - Réinitialiser

PUT    /api/v1/settings/reservation-policy - Politiques réservation
GET    /api/v1/settings/payment            - Config paiement
PUT    /api/v1/settings/payment            - Mettre à jour paiement
GET    /api/v1/settings/notifications      - Config notifications
PUT    /api/v1/settings/notifications      - Mettre à jour notifications
GET    /api/v1/settings/security           - Config sécurité
PUT    /api/v1/settings/security           - Mettre à jour sécurité
PUT    /api/v1/settings/appearance         - Mettre à jour apparence
PUT    /api/v1/settings/integrations       - Mettre à jour intégrations
```

## ✅ Checklist d'Intégration

- [x] Types TypeScript créés
- [x] Service API implémenté
- [x] Context et Provider créés
- [x] Provider intégré dans l'application
- [x] Hooks personnalisés disponibles
- [ ] Intégrer dans composants de réservation
- [ ] Intégrer dans composants de paiement
- [ ] Intégrer dans layout/header
- [ ] Ajouter Google Analytics
- [ ] Ajouter validation de mot de passe
- [ ] Tester le rafraîchissement des paramètres

## 🎯 Prochaines Étapes

1. **Appliquer les paramètres de réservation** dans les composants de réservation existants
2. **Appliquer les paramètres de paiement** dans Stripe et le checkout
3. **Personnaliser l'apparence** du site selon les paramètres admin
4. **Ajouter Google Analytics** si configuré
5. **Implémenter la validation de sécurité** selon les paramètres

---

**Tout est maintenant en place !** Les paramètres admin sont chargés automatiquement au démarrage de l'application et accessibles partout via les hooks.
