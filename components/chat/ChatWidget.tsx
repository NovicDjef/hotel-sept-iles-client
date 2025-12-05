'use client'

import React, { useState, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import { ChatForm } from './ChatForm'
import { ChatWindow } from './ChatWindow'
import { MessageCircle, X, Minimize2 } from 'lucide-react'
import type { StartChatData } from '@/types/chat'

/**
 * Widget de chat flottant pour les clients
 * Permet de démarrer une conversation et d'interagir avec le staff
 */
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [guestName, setGuestName] = useState('')

  const {
    conversationId,
    messages,
    isLoading,
    error,
    isPolling,
    startConversation,
    sendMessage,
    startPolling,
    stopPolling,
    restoreConversation,
    closeConversation,
  } = useChat()

  // Restaurer la conversation au chargement si elle existe
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGuestName = localStorage.getItem('chatGuestName')
      if (savedGuestName) {
        setGuestName(savedGuestName)
      }
      restoreConversation()
    }
  }, [restoreConversation])

  // Écouter l'événement d'ouverture du chat depuis d'autres composants
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true)
    }

    window.addEventListener('openChat', handleOpenChat)

    return () => {
      window.removeEventListener('openChat', handleOpenChat)
    }
  }, [])

  // Démarrer le polling quand une conversation est active
  useEffect(() => {
    if (conversationId && isOpen && !isPolling) {
      startPolling()
    } else if (!isOpen && isPolling) {
      stopPolling()
    }
  }, [conversationId, isOpen]) // Retirer isPolling, startPolling, stopPolling des dépendances pour éviter la boucle

  // Cleanup au démontage du composant
  useEffect(() => {
    return () => {
      if (isPolling) {
        stopPolling()
      }
    }
  }, []) // Cleanup une seule fois au démontage

  const handleStartChat = async (data: StartChatData) => {
    try {
      await startConversation(data)
      setGuestName(data.guestName)
    } catch (err) {
      console.error('Erreur lors du démarrage du chat:', err)
    }
  }

  const handleSendMessage = async (messageText: string) => {
    try {
      await sendMessage(messageText, guestName)
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsMinimized(false)
    }, 300)
  }

  const handleNewConversation = () => {
    closeConversation()
    setGuestName('')
  }

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50 flex items-center gap-2"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-6 h-6" />
          {conversationId && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              !
            </span>
          )}
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div
          className={`fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[600px] w-full h-full bg-white md:rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Header avec boutons de contrôle */}
          {conversationId && (
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button
                onClick={handleMinimize}
                className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full transition"
                aria-label="Minimiser"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full transition"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 overflow-hidden">
            {!conversationId ? (
              // Formulaire de démarrage
              <div className="h-full overflow-y-auto">
                <ChatForm onSubmit={handleStartChat} isLoading={isLoading} />
                {!conversationId && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={handleClose}
                      className="w-full text-gray-600 text-sm hover:text-gray-800 transition"
                    >
                      Fermer
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Fenêtre de conversation
              <div className="h-full flex flex-col">
                <ChatWindow
                  messages={messages || []}
                  guestName={guestName}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  isPolling={isPolling}
                />
                <div className="border-t bg-gray-50 px-4 py-2 flex justify-between items-center text-xs">
                  <button
                    onClick={handleNewConversation}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Nouvelle conversation
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-gray-600 hover:text-gray-800 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="absolute bottom-20 left-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
              {error}
            </div>
          )}
        </div>
      )}
    </>
  )
}
