'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { settingsApi } from '@/services/api/settingsApi'
import type { SiteSettings } from '@/types/settings'

/**
 * Valeurs par défaut des paramètres (fallback si API échoue)
 */
const defaultSettings: SiteSettings = {
  id: '',
  hotelId: '',
  reservationPolicy: {
    minimumStay: 1,
    maximumStay: 30,
    advanceBookingDays: 365,
    cancellationDeadlineHours: 24,
    modificationDeadlineHours: 12,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    lateCheckOutFee: 50,
    earlyCheckInFee: 50,
    depositPercentage: 20,
    allowPartialPayment: true,
    refundableDeposit: true,
  },
  payment: {
    stripeEnabled: true,
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    acceptedCurrencies: ['CAD', 'USD'],
    acceptedPaymentMethods: ['card'],
    requireDepositForReservation: true,
    depositAmount: 20,
    depositType: 'percentage',
    taxRate: 14.975,
    serviceFeePercentage: 0,
    allowCashPayment: false,
    allowBankTransfer: false,
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    sendBookingConfirmation: true,
    sendPaymentConfirmation: true,
    sendCancellationConfirmation: true,
    sendReminder24h: true,
    sendReminder1h: false,
    sendThankYouEmail: true,
    notifyAdminOnBooking: true,
    notifyAdminOnCancellation: true,
    notifyAdminOnPayment: true,
    adminEmail: 'admin@hotel-sept-iles.com',
    adminPhone: '',
    emailFromName: 'Hôtel Sept-Îles',
    emailFromAddress: 'noreply@hotel-sept-iles.com',
    emailReplyTo: 'contact@hotel-sept-iles.com',
  },
  security: {
    enableCaptcha: false,
    captchaSiteKey: '',
    maxLoginAttempts: 5,
    loginTimeoutMinutes: 15,
    sessionTimeoutMinutes: 60,
    requireEmailVerification: false,
    requirePhoneVerification: false,
    enableTwoFactorAuth: false,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: false,
    enableRateLimiting: true,
    maxRequestsPerMinute: 60,
  },
  appearance: {
    siteName: 'Hôtel Sept-Îles',
    siteDescription: 'Votre oasis de luxe sur la Côte-Nord',
    primaryColor: '#1E40AF',
    secondaryColor: '#0A1628',
    accentColor: '#d4af37',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    bannerImageUrl: '/images/banner.jpg',
    footerText: '© 2024 Hôtel Sept-Îles. Tous droits réservés.',
    showSocialLinks: true,
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    language: 'fr',
    timezone: 'America/Montreal',
    dateFormat: 'DD/MM/YYYY',
    currencySymbol: '$',
    currencyPosition: 'before',
  },
  integrations: {
    googleAnalyticsId: '',
    googleMapsApiKey: '',
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripeWebhookSecret: '',
    mailchimpApiKey: '',
    mailchimpListId: '',
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: '',
    googleCalendarEnabled: false,
    outlookCalendarEnabled: false,
    facebookPixelId: '',
    hotjarId: '',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

interface SettingsContextType {
  settings: SiteSettings
  loading: boolean
  error: string | null
  refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

/**
 * Provider pour les paramètres du site
 */
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Récupérer les paramètres depuis l'API
   */
  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await settingsApi.getSettings()

      if (response.success && response.data) {
        setSettings(response.data)
        console.log('✅ Paramètres du site chargés:', response.data)
      } else {
        console.warn('⚠️ Réponse API invalide, utilisation des paramètres par défaut')
        setSettings(defaultSettings)
      }
    } catch (err: any) {
      console.error('❌ Erreur lors de la récupération des paramètres:', err)
      setError(err.message || 'Erreur de chargement des paramètres')
      // Utiliser les paramètres par défaut en cas d'erreur
      setSettings(defaultSettings)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Rafraîchir les paramètres
   */
  const refreshSettings = async () => {
    await fetchSettings()
  }

  // Charger les paramètres au montage
  useEffect(() => {
    fetchSettings()
  }, [])

  const value: SettingsContextType = {
    settings,
    loading,
    error,
    refreshSettings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

/**
 * Hook pour accéder aux paramètres du site
 */
export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings doit être utilisé dans un SettingsProvider')
  }

  return context
}

// Exports individuels pour faciliter l'accès aux sections spécifiques
export const useReservationPolicy = () => {
  const { settings } = useSettings()
  return settings.reservationPolicy
}

export const usePaymentSettings = () => {
  const { settings } = useSettings()
  return settings.payment
}

export const useNotificationSettings = () => {
  const { settings } = useSettings()
  return settings.notifications
}

export const useSecuritySettings = () => {
  const { settings } = useSettings()
  return settings.security
}

export const useAppearanceSettings = () => {
  const { settings } = useSettings()
  return settings.appearance
}

export const useIntegrationsSettings = () => {
  const { settings } = useSettings()
  return settings.integrations
}
