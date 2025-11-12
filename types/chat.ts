/**
 * Types pour le système de chat client-staff
 */

/**
 * Type de l'expéditeur du message
 */
export type SenderType = 'GUEST' | 'STAFF'

/**
 * Statut de la conversation
 */
export type ConversationStatus = 'OPEN' | 'CLOSED' | 'PENDING'

/**
 * Structure d'un message
 */
export interface ChatMessage {
  id: string
  conversationId: string
  message: string
  senderType: SenderType
  senderName: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Structure d'une conversation
 */
export interface ChatConversation {
  id: string
  hotelId: string
  guestId?: string
  guestName: string
  guestEmail?: string
  guestPhone?: string
  status: ConversationStatus
  assignedToId?: string
  createdAt: string
  updatedAt: string
  messages?: ChatMessage[]
}

/**
 * Données pour démarrer une conversation
 */
export interface StartChatData {
  hotelId: string
  guestName: string
  guestEmail?: string
  guestPhone?: string
  initialMessage: string
}

/**
 * Données pour envoyer un message
 */
export interface SendMessageData {
  message: string
  senderType: SenderType
  senderName: string
}

/**
 * Réponse API pour le démarrage de conversation
 */
export interface StartChatResponse {
  success: boolean
  data: {
    conversation: ChatConversation
    messages: ChatMessage[]
  }
  message?: string
}

/**
 * Réponse API pour les messages
 */
export interface MessagesResponse {
  success: boolean
  data: {
    messages: ChatMessage[]
    conversation: ChatConversation
  }
  message?: string
}

/**
 * Réponse API générique
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
