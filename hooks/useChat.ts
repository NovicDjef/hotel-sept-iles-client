import { useState, useEffect, useCallback, useRef } from 'react'
import { chatApi } from '@/services/api/chatApi'
import type {
  ChatMessage,
  ChatConversation,
  StartChatData,
  SendMessageData,
} from '@/types/chat'

/**
 * Hook personnalisé pour gérer l'état et la logique du chat
 */
export const useChat = () => {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [conversation, setConversation] = useState<ChatConversation | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Démarre une nouvelle conversation
   */
  const startConversation = useCallback(async (data: StartChatData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await chatApi.startConversation(data)

      if (response.success) {
        setConversationId(response.data.conversation.id)
        setConversation(response.data.conversation)
        setMessages(response.data.messages)

        // Sauvegarder l'ID de conversation dans localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('chatConversationId', response.data.conversation.id)
          localStorage.setItem('chatGuestName', data.guestName)
        }

        return response.data.conversation
      } else {
        throw new Error(response.message || 'Erreur lors du démarrage de la conversation')
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Erreur de connexion'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Envoie un message
   */
  const sendMessage = useCallback(
    async (messageText: string, guestName: string) => {
      if (!conversationId) {
        setError('Aucune conversation active')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const messageData: SendMessageData = {
          message: messageText,
          senderType: 'GUEST',
          senderName: guestName,
        }

        const response = await chatApi.sendMessage(conversationId, messageData)

        if (response.success) {
          setMessages(response.data.messages)
          return response.data.messages
        } else {
          throw new Error(response.message || 'Erreur lors de l\'envoi du message')
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || err.message || 'Erreur de connexion'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [conversationId]
  )

  /**
   * Récupère les messages (polling)
   */
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return

    try {
      const response = await chatApi.getMessages(conversationId)

      if (response.success) {
        setMessages(response.data.messages)
        setConversation(response.data.conversation)
      }
    } catch (err: any) {
      console.error('Erreur lors de la récupération des messages:', err)
      // Ne pas afficher d'erreur pour le polling silencieux
    }
  }, [conversationId])

  /**
   * Démarre le polling des messages
   */
  const startPolling = useCallback(() => {
    if (isPolling || !conversationId) return

    setIsPolling(true)

    // Premier fetch immédiat
    fetchMessages()

    // Polling toutes les 3 secondes
    pollingIntervalRef.current = setInterval(() => {
      fetchMessages()
    }, 3000)
  }, [conversationId, fetchMessages, isPolling])

  /**
   * Arrête le polling
   */
  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  /**
   * Restaure une conversation depuis localStorage
   */
  const restoreConversation = useCallback(async () => {
    if (typeof window === 'undefined') return

    const savedConversationId = localStorage.getItem('chatConversationId')

    if (savedConversationId) {
      setConversationId(savedConversationId)
      setIsLoading(true)

      try {
        const response = await chatApi.getMessages(savedConversationId)

        if (response.success) {
          setConversation(response.data.conversation)
          setMessages(response.data.messages)
        }
      } catch (err) {
        console.error('Erreur lors de la restauration de la conversation:', err)
        // Si l'erreur est 404, nettoyer le localStorage
        if ((err as any)?.response?.status === 404) {
          localStorage.removeItem('chatConversationId')
          localStorage.removeItem('chatGuestName')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  /**
   * Ferme la conversation et nettoie l'état
   */
  const closeConversation = useCallback(() => {
    stopPolling()
    setConversationId(null)
    setConversation(null)
    setMessages([])

    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatConversationId')
      localStorage.removeItem('chatGuestName')
    }
  }, [stopPolling])

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      stopPolling()
    }
  }, [stopPolling])

  return {
    conversationId,
    conversation,
    messages,
    isLoading,
    error,
    isPolling,
    startConversation,
    sendMessage,
    fetchMessages,
    startPolling,
    stopPolling,
    restoreConversation,
    closeConversation,
  }
}
