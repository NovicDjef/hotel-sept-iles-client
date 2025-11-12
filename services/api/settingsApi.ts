import apiService from './Api'
import type {
  SiteSettings,
  SettingsResponse,
  UpdateSettingsData,
  UpdateReservationPolicyData,
  UpdatePaymentData,
  UpdateNotificationData,
  UpdateSecurityData,
  UpdateAppearanceData,
  UpdateIntegrationsData,
} from '@/types/settings'

/**
 * Service API pour les paramètres admin du site
 */
class SettingsApiService {
  private baseUrl = '/api/v1/settings'

  /**
   * Récupérer tous les paramètres du site
   * GET /api/v1/settings
   */
  async getSettings(): Promise<SettingsResponse> {
    try {
      const response = await apiService.get<SettingsResponse>(this.baseUrl)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error)
      throw error
    }
  }

  /**
   * Mettre à jour tous les paramètres
   * PUT /api/v1/settings
   */
  async updateSettings(data: UpdateSettingsData): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(this.baseUrl, data)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error)
      throw error
    }
  }

  /**
   * Réinitialiser aux valeurs par défaut
   * POST /api/v1/settings/reset
   */
  async resetSettings(): Promise<SettingsResponse> {
    try {
      const response = await apiService.post<SettingsResponse>(
        `${this.baseUrl}/reset`
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des paramètres:', error)
      throw error
    }
  }

  /**
   * Mettre à jour les politiques de réservation
   * PUT /api/v1/settings/reservation-policy
   */
  async updateReservationPolicy(
    data: UpdateReservationPolicyData
  ): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/reservation-policy`,
        data
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des politiques de réservation:',
        error
      )
      throw error
    }
  }

  /**
   * Récupérer la configuration de paiement
   * GET /api/v1/settings/payment
   */
  async getPaymentSettings(): Promise<SettingsResponse> {
    try {
      const response = await apiService.get<SettingsResponse>(
        `${this.baseUrl}/payment`
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des paramètres de paiement:',
        error
      )
      throw error
    }
  }

  /**
   * Mettre à jour la configuration de paiement
   * PUT /api/v1/settings/payment
   */
  async updatePaymentSettings(data: UpdatePaymentData): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/payment`,
        data
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres de paiement:', error)
      throw error
    }
  }

  /**
   * Récupérer la configuration des notifications
   * GET /api/v1/settings/notifications
   */
  async getNotificationSettings(): Promise<SettingsResponse> {
    try {
      const response = await apiService.get<SettingsResponse>(
        `${this.baseUrl}/notifications`
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des paramètres de notification:',
        error
      )
      throw error
    }
  }

  /**
   * Mettre à jour la configuration des notifications
   * PUT /api/v1/settings/notifications
   */
  async updateNotificationSettings(
    data: UpdateNotificationData
  ): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/notifications`,
        data
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des paramètres de notification:',
        error
      )
      throw error
    }
  }

  /**
   * Récupérer les paramètres de sécurité
   * GET /api/v1/settings/security
   */
  async getSecuritySettings(): Promise<SettingsResponse> {
    try {
      const response = await apiService.get<SettingsResponse>(
        `${this.baseUrl}/security`
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des paramètres de sécurité:',
        error
      )
      throw error
    }
  }

  /**
   * Mettre à jour les paramètres de sécurité
   * PUT /api/v1/settings/security
   */
  async updateSecuritySettings(
    data: UpdateSecurityData
  ): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/security`,
        data
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des paramètres de sécurité:',
        error
      )
      throw error
    }
  }

  /**
   * Mettre à jour la personnalisation de l'interface
   * PUT /api/v1/settings/appearance
   */
  async updateAppearanceSettings(
    data: UpdateAppearanceData
  ): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/appearance`,
        data
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des paramètres d\'apparence:',
        error
      )
      throw error
    }
  }

  /**
   * Mettre à jour les intégrations API
   * PUT /api/v1/settings/integrations
   */
  async updateIntegrationsSettings(
    data: UpdateIntegrationsData
  ): Promise<SettingsResponse> {
    try {
      const response = await apiService.put<SettingsResponse>(
        `${this.baseUrl}/integrations`,
        data
      )
      return response.data
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des paramètres d\'intégration:',
        error
      )
      throw error
    }
  }
}

// Export d'une instance unique du service
export const settingsApi = new SettingsApiService()
