'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  Users,
  Maximize2,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  Check,
  X as XIcon,
  MapPin,
  Clock,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { ImageGallery } from '@/components/chambres/ImageGallery'
import { BookingCard } from '@/components/chambres/BookingCard'
import { ReviewsSection } from '@/components/chambres/ReviewsSection'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms } from '@/store/slices/roomsSlice'
import { Room } from '@/types/room'
import { MaintenanceMessage } from '@/components/common/MaintenanceMessage'

export default function ChambreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [roomId, setRoomId] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const { rooms, loading, error } = useAppSelector((state) => state.rooms)

  // Unwrap params Promise
  useEffect(() => {
    params.then((p) => setRoomId(p.id))
  }, [params])

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms())
    }
  }, [dispatch, rooms.length])

  // Trouver la chambre par ID
  const chambre = roomId ? rooms.find(r => r.id === roomId) : null

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
          <p className="text-neutral-600">Chargement de la chambre...</p>
        </div>
      </div>
    )
  }

  // État d'erreur - Maintenance
  if (error && error === 'MAINTENANCE') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <MaintenanceMessage
          onRetry={() => dispatch(fetchRooms())}
          submessage="Nos chambres seront de nouveau disponibles très bientôt."
          email="reservations@hotel-sept-iles.com"
        />
      </div>
    )
  }

  // État d'erreur - Autre erreur
  if (error && error !== 'MAINTENANCE') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchRooms())}
            className="btn-primary"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  // Chambre non trouvée
  if (!chambre) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
            <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
            Chambre introuvable
          </h3>
          <p className="text-neutral-600 mb-6">
            La chambre que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link href="/chambres" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Retour aux chambres
          </Link>
        </div>
      </div>
    )
  }

  // Convertir les équipements string[] en objets pour l'affichage
  const equipementsFormatted = chambre.equipements.map(eq => ({
    nom: eq,
    disponible: true
  }))

  // Politiques par défaut
  const politiques = {
    checkin: '15h00',
    checkout: '11h00',
    annulation: 'Gratuite jusqu\'à 48h avant l\'arrivée',
    animaux: false,
    fumeur: false,
  }

  // Caractéristiques basées sur les données de la chambre
  const caracteristiques = [
    { label: 'Superficie', valeur: `${chambre.superficie} m²` },
    { label: 'Capacité', valeur: `${chambre.capacite} personne${chambre.capacite > 1 ? 's' : ''}` },
    { label: 'Catégorie', valeur: chambre.categorie },
    { label: 'Prix', valeur: `${chambre.prix}$ CAD / nuit` },
  ]

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Navigation */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/chambres"
              className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Retour aux chambres</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">Partager</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  isFavorite
                    ? 'bg-red-50 text-red-600'
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-600' : ''}`} />
                <span className="hidden sm:inline text-sm font-medium">
                  {isFavorite ? 'Enregistré' : 'Enregistrer'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Galerie d'images */}
      <section className="container-custom py-6">
        <div className="grid grid-cols-4 gap-2 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
          {/* Image principale */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="col-span-4 lg:col-span-2 lg:row-span-2 relative group overflow-hidden"
          >
            <Image
              src={chambre.images[0]}
              alt={chambre.nom}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </button>

          {/* Images secondaires */}
          {chambre.images.slice(1, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => setIsGalleryOpen(true)}
              className="relative group overflow-hidden col-span-2 lg:col-span-1"
            >
              <Image
                src={image}
                alt={`${chambre.nom} - ${index + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              
              {/* Badge "Voir toutes" sur dernière image */}
              {index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-xl font-semibold text-sm">
                    + {chambre.images.length - 5} photos
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Contenu principal */}
      <section className="container-custom pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge-gold">{chambre.categorie}</span>
                    {chambre.disponible && (
                      <span className="badge-success">Disponible</span>
                    )}
                  </div>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                    {chambre.nom}
                  </h1>
                  <div className="flex items-center gap-4 text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-accent-gold fill-accent-gold" />
                      <span className="font-semibold text-neutral-900">{chambre.note}</span>
                      <span className="text-sm">({chambre.avis} avis)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Sept-Îles, Côte-Nord</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos rapides */}
              <div className="flex flex-wrap gap-6 p-6 bg-white rounded-2xl shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Capacité</div>
                    <div className="font-semibold text-neutral-900">{chambre.capacite} personnes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Maximize2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Superficie</div>
                    <div className="font-semibold text-neutral-900">{chambre.superficie} m²</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Check-in</div>
                    <div className="font-semibold text-neutral-900">{politiques.checkin}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                À propos de cette chambre
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {chambre.description}
              </p>
            </motion.div>

            {/* Caractéristiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                Caractéristiques
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {caracteristiques.map((carac, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50">
                    <Check className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-neutral-600">{carac.label}</div>
                      <div className="font-semibold text-neutral-900">{carac.valeur}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Équipements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                Équipements & Services
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {equipementsFormatted.map((equipement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50"
                  >
                    {equipement.disponible ? (
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className={equipement.disponible ? 'text-neutral-700' : 'text-neutral-400 line-through'}>
                      {equipement.nom}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Politiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                Politiques de la chambre
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-900 mb-1">Annulation flexible</div>
                    <div className="text-sm text-green-700">{politiques.annulation}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50">
                    <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-neutral-600">Check-in</div>
                      <div className="font-semibold text-neutral-900">À partir de {politiques.checkin}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50">
                    <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-neutral-600">Check-out</div>
                      <div className="font-semibold text-neutral-900">Avant {politiques.checkout}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50">
                    {politiques.animaux ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <XIcon className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-neutral-700">Animaux de compagnie</span>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50">
                    {politiques.fumeur ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <XIcon className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-neutral-700">Chambre fumeur</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Avis */}
            <ReviewsSection chambreId={chambre.id} note={chambre.note} total={chambre.avis} />
          </div>

          {/* Sidebar - Carte de réservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingCard chambre={chambre} />
            </div>
          </div>
        </div>
      </section>

      {/* Galerie modale */}
      {isGalleryOpen && (
        <ImageGallery
          images={chambre.images}
          onClose={() => setIsGalleryOpen(false)}
          title={chambre.nom}
        />
      )}
    </div>
  )
}