/**
 * Types pour les paramètres admin du site
 */

/**
 * Politiques de réservation
 */
export interface ReservationPolicySettings {
  minimumStay: number // Séjour minimum en nuits
  maximumStay: number // Séjour maximum en nuits
  advanceBookingDays: number // Nombre de jours à l'avance pour réserver
  cancellationDeadlineHours: number // Délai d'annulation en heures
  modificationDeadlineHours: number // Délai de modification en heures
  checkInTime: string // Heure de check-in (format HH:mm)
  checkOutTime: string // Heure de check-out (format HH:mm)
  lateCheckOutFee: number // Frais de check-out tardif
  earlyCheckInFee: number // Frais de check-in anticipé
  depositPercentage: number // Pourcentage d'acompte requis
  allowPartialPayment: boolean // Autoriser le paiement partiel
  refundableDeposit: boolean // Acompte remboursable
}

/**
 * Configuration des paiements
 */
export interface PaymentSettings {
  stripeEnabled: boolean
  stripePublicKey: string
  acceptedCurrencies: string[] // ['CAD', 'USD', 'EUR']
  acceptedPaymentMethods: string[] // ['card', 'paypal', 'interac']
  requireDepositForReservation: boolean
  depositAmount: number
  depositType: 'percentage' | 'fixed' // pourcentage ou montant fixe
  taxRate: number // Taux de taxe (%)
  serviceFeePercentage: number // Frais de service (%)
  allowCashPayment: boolean
  allowBankTransfer: boolean
}

/**
 * Configuration des notifications
 */
export interface NotificationSettings {
  emailEnabled: boolean
  smsEnabled: boolean
  // Notifications client
  sendBookingConfirmation: boolean
  sendPaymentConfirmation: boolean
  sendCancellationConfirmation: boolean
  sendReminder24h: boolean
  sendReminder1h: boolean
  sendThankYouEmail: boolean
  // Notifications admin
  notifyAdminOnBooking: boolean
  notifyAdminOnCancellation: boolean
  notifyAdminOnPayment: boolean
  adminEmail: string
  adminPhone: string
  // Templates
  emailFromName: string
  emailFromAddress: string
  emailReplyTo: string
}

/**
 * Paramètres de sécurité
 */
export interface SecuritySettings {
  enableCaptcha: boolean
  captchaSiteKey: string
  maxLoginAttempts: number
  loginTimeoutMinutes: number
  sessionTimeoutMinutes: number
  requireEmailVerification: boolean
  requirePhoneVerification: boolean
  enableTwoFactorAuth: boolean
  passwordMinLength: number
  passwordRequireUppercase: boolean
  passwordRequireNumbers: boolean
  passwordRequireSpecialChars: boolean
  enableRateLimiting: boolean
  maxRequestsPerMinute: number
}

/**
 * Personnalisation de l'apparence
 */
export interface AppearanceSettings {
  siteName: string
  siteDescription: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoUrl: string
  faviconUrl: string
  bannerImageUrl: string
  footerText: string
  showSocialLinks: boolean
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  language: 'fr' | 'en' | 'es'
  timezone: string
  dateFormat: string
  currencySymbol: string
  currencyPosition: 'before' | 'after'
}

/**
 * Intégrations API externes
 */
export interface IntegrationsSettings {
  // Google
  googleAnalyticsId?: string
  googleMapsApiKey?: string
  // Stripe
  stripePublicKey?: string
  stripeWebhookSecret?: string
  // Mailchimp
  mailchimpApiKey?: string
  mailchimpListId?: string
  // SMS (Twilio)
  twilioAccountSid?: string
  twilioAuthToken?: string
  twilioPhoneNumber?: string
  // Calendar sync
  googleCalendarEnabled: boolean
  outlookCalendarEnabled: boolean
  // Autres
  facebookPixelId?: string
  hotjarId?: string
}

/**
 * Paramètres complets du site
 */
export interface SiteSettings {
  id: string
  hotelId: string
  reservationPolicy: ReservationPolicySettings
  payment: PaymentSettings
  notifications: NotificationSettings
  security: SecuritySettings
  appearance: AppearanceSettings
  integrations: IntegrationsSettings
  createdAt: string
  updatedAt: string
}

/**
 * Réponse API pour les paramètres
 */
export interface SettingsResponse {
  success: boolean
  data: SiteSettings
  message?: string
}

/**
 * Données pour mettre à jour les paramètres
 */
export type UpdateSettingsData = Partial<Omit<SiteSettings, 'id' | 'hotelId' | 'createdAt' | 'updatedAt'>>

/**
 * Données pour mettre à jour une section spécifique
 */
export type UpdateReservationPolicyData = Partial<ReservationPolicySettings>
export type UpdatePaymentData = Partial<PaymentSettings>
export type UpdateNotificationData = Partial<NotificationSettings>
export type UpdateSecurityData = Partial<SecuritySettings>
export type UpdateAppearanceData = Partial<AppearanceSettings>
export type UpdateIntegrationsData = Partial<IntegrationsSettings>
