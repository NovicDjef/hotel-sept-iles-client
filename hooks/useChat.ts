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
          // hotelId n'est pas nécessaire car déjà dans la conversation
        }

        console.log('📤 Envoi du message avec les données:', messageData)

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
        // Ne mettre à jour que si les messages ont changé pour éviter les re-renders inutiles
        setMessages(prevMessages => {
          // S'assurer que prevMessages est un tableau
          const prev = prevMessages || []
          const newMessages = response.data.messages || []

          // Vérification rapide par longueur
          if (prev.length !== newMessages.length) {
            return newMessages
          }

          // Si même longueur, vérifier si le dernier message est différent
          if (newMessages.length > 0 && prev.length > 0) {
            const prevLastId = prev[prev.length - 1]?.id
            const newLastId = newMessages[newMessages.length - 1]?.id

            if (prevLastId !== newLastId) {
              return newMessages
            }
          }

          // Aucun changement détecté, garder les messages précédents
          return prev
        })

        // Mise à jour silencieuse de la conversation sans causer de re-render
        setConversation(prev => {
          if (!prev || prev.id !== response.data.conversation.id) {
            return response.data.conversation
          }
          return prev
        })
      }
    } catch (err: any) {
      // Ne pas afficher d'erreur pour le polling silencieux
      // Cela évite les logs d'erreur inutiles lors du polling en arrière-plan
    }
  }, [conversationId])

  /**
   * Démarre le polling des messages
   */
  const startPolling = useCallback(() => {
    // Vérifier si le polling est déjà actif via la ref
    if (pollingIntervalRef.current) return
    if (!conversationId) return

    setIsPolling(true)

    // Premier fetch immédiat
    fetchMessages()

    // Polling toutes les 10 secondes (réduit pour éviter les saccades visibles)
    pollingIntervalRef.current = setInterval(() => {
      fetchMessages()
    }, 10000)
  }, [conversationId, fetchMessages])

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
      // Cleanup direct sans dépendre de stopPolling
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [])

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
