import apiService from './Api'
import type {
  StartChatData,
  SendMessageData,
  StartChatResponse,
  MessagesResponse,
  ApiResponse,
  ChatConversation,
} from '@/types/chat'

/**
 * Service API pour le système de chat
 * Routes publiques - ne nécessitent pas d'authentification
 */
class ChatApiService {
  private baseUrl = '/api/v1/chat'

  /**
   * Démarre une nouvelle conversation
   * POST /api/v1/chat/start
   */
  async startConversation(data: StartChatData): Promise<StartChatResponse> {
    try {
      const response = await apiService.post<StartChatResponse>(
        `${this.baseUrl}/start`,
        data
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors du démarrage de la conversation:', error)
      throw error
    }
  }

  /**
   * Envoie un message dans une conversation
   * POST /api/v1/chat/:id/messages
   */
  async sendMessage(
    conversationId: string,
    data: SendMessageData
  ): Promise<MessagesResponse> {
    try {
      const response = await apiService.post<MessagesResponse>(
        `${this.baseUrl}/${conversationId}/messages`,
        data
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      throw error
    }
  }

  /**
   * Récupère tous les messages d'une conversation
   * GET /api/v1/chat/:id/messages
   */
  async getMessages(conversationId: string): Promise<MessagesResponse> {
    try {
      const response = await apiService.get<MessagesResponse>(
        `${this.baseUrl}/${conversationId}/messages`
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error)
      throw error
    }
  }

  /**
   * Récupère les détails d'une conversation
   * GET /api/v1/chat/conversations/:id
   */
  async getConversation(
    conversationId: string
  ): Promise<ApiResponse<ChatConversation>> {
    try {
      const response = await apiService.get<ApiResponse<ChatConversation>>(
        `${this.baseUrl}/conversations/${conversationId}`
      )
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation:', error)
      throw error
    }
  }
}

// Export d'une instance unique du service
export const chatApi = new ChatApiService()
