'use client'

import React from 'react'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ChatMessageProps {
  message: ChatMessageType
}

/**
 * Composant pour afficher un message de chat
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isGuest = message.senderType === 'GUEST'

  return (
    <div
      className={`flex ${isGuest ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isGuest
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex flex-col">
          <p className="text-sm font-medium mb-1">{message.senderName}</p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.message}
          </p>
          <span
            className={`text-xs mt-1 ${
              isGuest ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            {format(new Date(message.createdAt), 'HH:mm', { locale: fr })}
          </span>
        </div>
      </div>
    </div>
  )
}
