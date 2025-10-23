'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface MaintenanceMessageProps {
  onRetry?: () => void
  title?: string
  message?: string
  submessage?: string
  phone?: string
  email?: string
}

export function MaintenanceMessage({
  onRetry,
  title = 'Site en maintenance',
  message = 'Nous effectuons actuellement des améliorations pour vous offrir une meilleure expérience.',
  submessage = 'Nos services seront de nouveau disponibles très bientôt.',
  phone = '+1 418 962-2581',
  email = 'info@hotel-sept-iles.com',
}: MaintenanceMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 text-center shadow-lg border border-primary-200">
        {/* Icône de maintenance */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full"></div>
          <div className="relative bg-white rounded-full p-6 shadow-md">
            <Sparkles className="h-16 w-16 text-primary-600" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-lg text-neutral-600 mb-2">
          {message}
        </p>
        <p className="text-neutral-500 mb-8">
          {submessage}
        </p>

        {/* Informations de contact */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-8 border border-white/50">
          <p className="text-sm font-semibold text-neutral-700 mb-3">
            En attendant, vous pouvez nous contacter :
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </a>
          </div>
        </div>

        {/* Bouton réessayer */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réessayer
          </button>
        )}

        {/* Animation subtile */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </motion.div>
  )
}
