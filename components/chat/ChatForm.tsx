'use client'

import React, { useState } from 'react'
import { hotelId } from '@/services/api/Api'
import type { StartChatData } from '@/types/chat'

interface ChatFormProps {
  onSubmit: (data: StartChatData) => Promise<void>
  isLoading: boolean
}

/**
 * Formulaire pour démarrer une conversation
 */
export const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    initialMessage: '',
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.guestName.trim()) {
      setError('Veuillez entrer votre nom')
      return
    }

    if (!formData.guestEmail.trim() && !formData.guestPhone.trim()) {
      setError('Veuillez fournir au moins un email ou un numéro de téléphone')
      return
    }

    if (!formData.initialMessage.trim()) {
      setError('Veuillez entrer un message')
      return
    }

    // Validation email si fourni
    if (formData.guestEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.guestEmail)) {
        setError('Veuillez entrer une adresse email valide')
        return
      }
    }

    // Validation téléphone si fourni (format simple)
    if (formData.guestPhone.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
      if (!phoneRegex.test(formData.guestPhone.replace(/\s/g, ''))) {
        setError('Veuillez entrer un numéro de téléphone valide')
        return
      }
    }

    const chatData: StartChatData = {
      hotelId,
      guestName: formData.guestName.trim(),
      guestEmail: formData.guestEmail.trim() || undefined,
      guestPhone: formData.guestPhone.trim() || undefined,
      initialMessage: formData.initialMessage.trim(),
    }

    try {
      await onSubmit(chatData)
    } catch (err) {
      // L'erreur est gérée par le parent
      console.error('Erreur lors de la soumission:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6 max-h-full overflow-y-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Contactez-nous
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Nous sommes là pour vous aider
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          placeholder="Votre nom"
          className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="guestEmail"
          name="guestEmail"
          value={formData.guestEmail}
          onChange={handleChange}
          placeholder="votre@email.com"
          className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700 mb-1.5">
          Téléphone
        </label>
        <input
          type="tel"
          id="guestPhone"
          name="guestPhone"
          value={formData.guestPhone}
          onChange={handleChange}
          placeholder="+1 (514) 555-1234"
          className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="initialMessage" className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="initialMessage"
          name="initialMessage"
          value={formData.initialMessage}
          onChange={handleChange}
          placeholder="Comment pouvons-nous vous aider ?"
          rows={4}
          className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          disabled={isLoading}
        />
      </div>

      <p className="text-xs text-gray-500">
        <span className="text-red-500">*</span> Champs obligatoires.
        Au moins un email ou téléphone requis.
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Envoi en cours...' : 'Démarrer la conversation'}
      </button>
    </form>
  )
}
