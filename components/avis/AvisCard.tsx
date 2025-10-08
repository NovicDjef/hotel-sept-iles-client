'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, ThumbsUp, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export interface AvisData {
  id: number
  auteur: string
  avatar: string
  note: number
  date: string
  sejour: string
  chambre: string
  titre: string
  commentaire: string
  photos: string[]
  utile: number
  reponseHotel?: string | null
}

interface AvisCardProps {
  avis: AvisData
  index: number
}

export function AvisCard({ avis, index }: AvisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(avis.utile)

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1)
      setHasLiked(true)
    }
  }

  const isLongText = avis.commentaire.length > 300

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Effet de lueur */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-gold to-primary-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />

      {/* Card */}
      <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-neutral-100">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative h-14 w-14 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex-shrink-0 ring-2 ring-white shadow-md"
          >
            <Image
              src={avis.avatar}
              alt={avis.auteur}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-neutral-900 mb-1">
                  {avis.auteur}
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span>Séjour en {avis.sejour}</span>
                  <span>•</span>
                  <span className="text-primary-600 font-medium">{avis.chambre}</span>
                </div>
              </div>
              <span className="text-sm text-neutral-400 whitespace-nowrap">
                {new Date(avis.date).toLocaleDateString('fr-CA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Note avec étoiles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 transition-all ${
                      i < avis.note
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
                <span className="ml-1.5 text-sm font-bold text-neutral-900">
                  {avis.note}.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Titre */}
        <h4 className="font-display text-xl font-bold text-neutral-900 mb-4 leading-tight">
          {avis.titre}
        </h4>

        {/* Commentaire */}
        <div className="mb-6">
          <p className={`text-neutral-700 leading-relaxed ${!isExpanded && isLongText ? 'line-clamp-4' : ''}`}>
            {avis.commentaire}
          </p>
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 flex items-center gap-1"
            >
              {isExpanded ? 'Voir moins' : 'Lire la suite'}
            </button>
          )}
        </div>

        {/* Photos */}
        {avis.photos.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {avis.photos.map((photo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <Image
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              hasLiked
                ? 'bg-primary-50 text-primary-600'
                : 'bg-neutral-50 text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>Utile ({likesCount})</span>
          </motion.button>
        </div>

        {/* Réponse de l'hôtel */}
        {avis.reponseHotel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 ml-0 lg:ml-12 p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 shadow-md">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-primary-900 block">
                  Hôtel Sept-Îles
                </span>
                <span className="text-xs text-primary-600">
                  Réponse officielle
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {avis.reponseHotel}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
