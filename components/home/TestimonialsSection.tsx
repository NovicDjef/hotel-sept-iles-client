'use client'

import { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { getHotelReviews, getHotelReviewsStats } from '@/services/api/routeApi'
import { hotelId } from '@/services/api/Api'
import { apiCache } from '@/lib/apiCache'

// Type pour les avis
interface Avis {
  id: string | number
  auteur: string
  avatar: string
  note: number
  date: string
  commentaire: string
  chambre: string
  hotelResponse?: string | null
  hotelResponseDate?: string | null
}

// Fonction pour formater la date relative
function formatRelativeDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Aujourd\'hui'
    if (diffInDays === 1) return 'Hier'
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaine${Math.floor(diffInDays / 7) > 1 ? 's' : ''}`
    if (diffInDays < 365) return `Il y a ${Math.floor(diffInDays / 30)} mois`
    return `Il y a ${Math.floor(diffInDays / 365)} an${Math.floor(diffInDays / 365) > 1 ? 's' : ''}`
  } catch (e) {
    return dateString
  }
}

export const TestimonialsSection = memo(function TestimonialsSection() {
  const [avis, setAvis] = useState<Avis[]>([])
  const [notesMoyenne, setNotesMoyenne] = useState(0)
  const [totalAvis, setTotalAvis] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        console.log('🏠 Chargement des avis pour la page d\'accueil')

        // Charger les avis et les stats en parallèle avec cache (2 minutes de TTL)
        const [reviewsResponse, statsResponse] = await Promise.all([
          apiCache.get(`reviews-${hotelId}`, () => getHotelReviews(hotelId), 2 * 60 * 1000),
          apiCache.get(`reviews-stats-${hotelId}`, () => getHotelReviewsStats(hotelId), 2 * 60 * 1000)
        ])

        // Transformer les avis
        const reviewsData = reviewsResponse.data?.data || reviewsResponse.data || []
        const transformedReviews = Array.isArray(reviewsData)
          ? reviewsData
              .slice(0, 3) // Limiter à 3 avis
              .map((review: any) => ({
                id: review.id || Date.now(),
                auteur: `${review.guest?.firstName || 'Anonyme'} ${review.guest?.lastName || ''}`.trim(),
                avatar: review.guest?.avatar || '/images/avatars/default.svg',
                note: typeof review.overallRating === 'number' ? review.overallRating : 5,
                date: review.createdAt || new Date().toISOString(),
                commentaire: review.comment || '',
                chambre: review.roomName || 'Chambre',
                hotelResponse: review.hotelResponse || null,
                hotelResponseDate: review.hotelResponseDate || null
              }))
          : []
        setAvis(transformedReviews)

        // Mettre à jour les stats
        const stats = statsResponse.data?.data || statsResponse.data || {}

        // Gérer averageRating qui peut être un nombre OU un objet
        let avgRating = 0
        if (typeof stats.averageRating === 'number') {
          avgRating = stats.averageRating
        } else if (typeof stats.averageRating === 'object' && stats.averageRating !== null) {
          avgRating = stats.averageRating.overallRating || 0
        }
        setNotesMoyenne(avgRating)

        // Gérer totalReviews
        const totalFromApi = stats.totalReviews || stats.total || stats.published || 0
        setTotalAvis(typeof totalFromApi === 'number' ? totalFromApi : 0)

        console.log('✅ Avis chargés pour la page d\'accueil:', transformedReviews.length)
      } catch (error) {
        console.error('❌ Erreur chargement avis page d\'accueil:', error)
        // En cas d'erreur, ne rien afficher (la section sera vide)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Si en chargement
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-neutral-600">Chargement des avis...</p>
          </div>
        </div>
      </section>
    )
  }

  // Si pas d'avis, ne pas afficher la section
  if (!loading && avis.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-primary mb-4">Témoignages</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Plus de 2000 clients satisfaits nous font confiance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-8 w-8 text-accent-gold fill-accent-gold"
              />
            ))}
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-neutral-900">
              {typeof notesMoyenne === 'number' ? notesMoyenne.toFixed(1) : '5.0'}/5
            </div>
            <p className="text-neutral-600">
              Basé sur {totalAvis} avis vérifiés
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {avis.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-strong transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-neutral-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.auteur}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {testimonial.auteur}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {formatRelativeDate(testimonial.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(Math.round(testimonial.note))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-accent-gold fill-accent-gold"
                  />
                ))}
                <span className="text-xs text-neutral-500 ml-2">
                  {testimonial.note.toFixed(1)}/5
                </span>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {testimonial.commentaire}
              </p>

              {/* Réponse de l'hôtel (si elle existe) */}
              {testimonial.hotelResponse && (
                <div className="mt-4 p-4 bg-primary-50 border-l-4 border-primary-600 rounded-r">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">H</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-900">Réponse de l'hôtel</p>
                      <p className="text-xs text-neutral-500">
                        {testimonial.hotelResponseDate && formatRelativeDate(testimonial.hotelResponseDate)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {testimonial.hotelResponse}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-500">
                  Chambre :
                </span>
                <p className="text-sm font-medium text-primary-600 mt-1">
                  {testimonial.chambre}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/avis"
            className="btn-secondary"
          >
            Voir tous les avis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
})