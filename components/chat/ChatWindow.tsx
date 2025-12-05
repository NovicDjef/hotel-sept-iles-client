'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import { Send, Loader2 } from 'lucide-react'

interface ChatWindowProps {
  messages: ChatMessageType[]
  guestName: string
  onSendMessage: (message: string) => Promise<void>
  isLoading: boolean
  isPolling: boolean
}

/**
 * Fenêtre de chat avec liste de messages et input
 * Optimisé pour éviter les re-renders inutiles
 */
export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages = [],
  guestName,
  onSendMessage,
  isLoading,
  isPolling,
}) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousMessageCountRef = useRef(messages.length)

  // Auto-scroll vers le bas seulement quand de NOUVEAUX messages arrivent
  useEffect(() => {
    const currentCount = messages.length
    const previousCount = previousMessageCountRef.current

    // Scroll uniquement si le nombre de messages a augmenté
    if (currentCount > previousCount) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Mettre à jour la référence
    previousMessageCountRef.current = currentCount
  }, [messages.length]) // Dépend uniquement de la longueur, pas de tout le tableau

  // Focus sur l'input au chargement
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim() || isLoading) return

    const messageToSend = inputMessage.trim()
    setInputMessage('') // Vider l'input immédiatement

    try {
      await onSendMessage(messageToSend)
    } catch (err) {
      // En cas d'erreur, restaurer le message
      setInputMessage(messageToSend)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 md:rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base md:text-lg">Chat avec l'hôtel</h3>
            <p className="text-xs text-blue-100">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                En ligne
              </span>
            </p>
          </div>
          <p className="text-sm text-blue-100 truncate max-w-[120px] md:max-w-none">{guestName}</p>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        {(!messages || messages.length === 0) ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Aucun message pour le moment
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <div className="border-t bg-white p-3 md:p-4 safe-bottom">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            disabled={isLoading}
            className="flex-1 px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 text-white px-3 md:px-4 py-2.5 md:py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
            aria-label="Envoyer le message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
